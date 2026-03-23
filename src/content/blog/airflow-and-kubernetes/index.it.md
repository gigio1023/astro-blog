---
title: "Airflow e Kubernetes"
description: "Confronto tra due approcci per eseguire Airflow su Kubernetes: deployment dei componenti Airflow come pod vs. uso di KubernetesExecutor con KubernetesPodOperator."
date: "2022-04-08T00:00:00.000Z"
tags: ["mlops"]
lang: it
translationOf: "airflow-and-kubernetes"
draft: false
---

ref: [Line Engineering Blog - Airflow Kubernetes - 1](https://engineering.linecorp.com/ko/blog/data-engineering-with-airflow-k8s-1/), [Line Engineering Blog - Airflow Kubernetes - 2](https://engineering.linecorp.com/ko/blog/data-engineering-with-airflow-k8s-2/)

Ci sono due modi per usare Airflow con Kubernetes. Ognuno ha pro e contro; si sceglie quello più adatto al proprio servizio e alle risorse disponibili.

# Airflow on Kubernetes
Eseguire Airflow sopra Kubernetes. I componenti di Airflow come lo scheduler e i worker, che normalmente sarebbero processi o unità hardware, vengono configurati come POD.
![](/assets/images/Airflow-and-Kubernetes/airflow-k8s-01.jpg)

## Vantaggi di Airflow on Kubernetes
Dato che tutto è su Kubernetes, la creazione di template è semplice. Questo lo rende adatto allo sviluppo di servizi Airflow gestiti.
es., Cloud Composer di GCP.

Si può anche sfruttare l'orchestration di Kubernetes.

## Svantaggi di Airflow on Kubernetes
Dato che si usano solo POD, se si usa il Celery Executor, master, message broker, worker ecc. devono tutti persistere continuamente nell'ambiente Kubernetes.

C'è anche un problema di scalabilità. Quando si verificano più estensioni all'interno del container Airflow, l'immagine Docker diventa più grande e la manutenzione si complica.

es., Se il container Airflow aveva 1 client Hadoop che diventa n, bisogna configurare e testare tutti gli n ambienti.

# KubernetesExecutor e KubernetesPodOperator
KubernetesExecutor permette ad Airflow di usare l'ambiente Kubernetes solo quando necessario. KubernetesPodOperator permette di selezionare container Docker specifici e di eseguirli come POD.

Sono funzionalità indipendenti: nessuna delle due dipende dall'altra.

## Kubernetes Executor
Il Kubernetes Executor opera diversamente per gli Operator normali e per il KubernetesPodOperator.

### Operator normali
PythonOperator, BashOperator, ExternalTaskSensor, ecc.
![](/assets/images/Airflow-and-Kubernetes/airflow-k8s-02.png)
1. Lo scheduler trova un task da eseguire.
2. L'Executor lancia dinamicamente un worker Airflow come POD.
3. Il task definito dallo sviluppatore viene eseguito nel Worker POD.

### Pod Operator
La sequenza di esecuzione per KubernetesPodOperator è la seguente.
![](/assets/images/Airflow-and-Kubernetes/airflow-k8s-03.png)
1. Lo scheduler trova un task da eseguire.
2. L'Executor lancia dinamicamente un worker Airflow come POD.
3. Il Worker POD lancia un ulteriore POD usando l'immagine container definita dallo sviluppatore.
-> Un singolo ambiente Airflow può accedere a più cloud.

### Vantaggi
- Leggero
    - Può funzionare con immagini leggere senza dipendenze di librerie
    - In precedenza, la macchina o il container Airflow necessitava di Hadoop client, Spark client, Hive client, Sqoop client, configurazione Kerberos e altro. Con KubernetesExecutor e KubernetesPodOperator, non è più necessario.
- Costi di manutenzione ridotti
    - Nessun bisogno di verifiche di dipendenze tra librerie
    - Accesso a più ambienti di piattaforme dati contemporaneamente -> basta un singolo ambiente Airflow.
- Gestione efficiente delle risorse
    - Con il Celery Executor su Kubernetes, master e worker occupano risorse continuamente.
    - Con KubernetesExecutor, i worker vengono creati solo quando i task vengono eseguiti e le risorse vengono rilasciate dopo.
- Efficienza di sviluppo
    - Se i DAG usano KubernetesPodOperator, il codice dei DAG del workflow può essere templatizzato

### Svantaggi
- Riferimenti limitati
    - Quando il team di data engineering di LINE ci ha lavorato nel 2019, i riferimenti erano scarsi. Anche oggi sembrano limitati.
- Configurazione complessa
    - Logging: dato che i Worker POD sono effimeri, bisogna costruire un sistema di logging separato. Il team di data engineering di LINE ha salvato i log su GCS e S3.
    - Kubernetes di per sé ha una curva di apprendimento ripida.
