---
title: "Airflow and Kubernetes"
description: "Comparison of two approaches for running Airflow on Kubernetes: deploying Airflow components as pods vs. using KubernetesExecutor with KubernetesPodOperator."
date: "2022-04-08T00:00:00.000Z"
tags: ["mlops"]
lang: en
translationOf: "airflow-and-kubernetes"
draft: false
---

ref: [Line Engineering Blog - Airflow Kubernetes - 1](https://engineering.linecorp.com/ko/blog/data-engineering-with-airflow-k8s-1/), [Line Engineering Blog - Airflow Kubernetes - 2](https://engineering.linecorp.com/ko/blog/data-engineering-with-airflow-k8s-2/)

There are two ways to use Airflow with Kubernetes. Each has pros and cons; pick whichever suits your service and resources.

# Airflow on Kubernetes
Running Airflow on top of Kubernetes. Airflow components like the scheduler and workers, which would normally be processes or hardware units, are configured as PODs here.
![](/assets/images/Airflow-and-Kubernetes/airflow-k8s-01.jpg)

## Advantages of Airflow on Kubernetes
Since everything is on Kubernetes, templating is easy. This makes it good for developing managed Airflow services.
e.g., GCP's Cloud Composer.

You can also take advantage of Kubernetes orchestration.

## Disadvantages of Airflow on Kubernetes
Since only PODs are used, if you use the Celery Executor, the master, message broker, worker, etc. all need to persist continuously in the Kubernetes environment.

There's also a scalability issue. When multiple extensions happen inside the Airflow container, the Docker image grows larger and maintenance becomes harder.

e.g., If the Airflow container had 1 Hadoop client that grows to n, you need to configure and test all n environments.

# KubernetesExecutor & KubernetesPodOperator
KubernetesExecutor lets Airflow use the Kubernetes environment only when needed. KubernetesPodOperator lets you pick specific Docker containers and run them as PODs.

These are independent features — neither depends on the other.

## Kubernetes Executor
The Kubernetes Executor operates differently for regular Operators and KubernetesPodOperator.

### Regular Operators
PythonOperator, BashOperator, ExternalTaskSensor, etc.
![](/assets/images/Airflow-and-Kubernetes/airflow-k8s-02.png)
1. The scheduler finds a task to execute.
2. The Executor dynamically launches an Airflow worker as a POD.
3. The developer-defined task runs in that Worker POD.

### Pod Operator
The execution sequence for KubernetesPodOperator is as follows.
![](/assets/images/Airflow-and-Kubernetes/airflow-k8s-03.png)
1. The scheduler finds a task to execute.
2. The Executor dynamically launches an Airflow worker as a POD.
3. The Worker POD launches another POD using the developer-defined container image.
-> A single Airflow environment can access multiple clouds.

### Advantages
- Lightweight
    - Can run with lightweight images that have no library dependencies
    - Previously, the Airflow machine or container needed Hadoop client, Spark client, Hive client, Sqoop client, Kerberos config, and so on. With KubernetesExecutor and KubernetesPodOperator, that's unnecessary.
- Reduced maintenance cost
    - No need for inter-library dependency checks
    - Access multiple data platform environments at once -> a single Airflow environment suffices.
- Efficient resource management
    - With the existing Celery Executor on Kubernetes, master and worker continuously occupy resources.
    - With KubernetesExecutor, workers are created only when tasks run, and resources are released afterward.
- Development efficiency
    - If DAGs use KubernetesPodOperator, workflow DAG code can be templated

### Disadvantages
- Limited references
    - When the LINE data engineering team worked on this in 2019, references were scarce. They still seem limited today.
- Complex setup
    - Logging: Since Worker PODs are ephemeral, a separate logging system must be built. The LINE data engineering team stored logs in GCS and S3.
    - Kubernetes itself has a steep learning curve.
