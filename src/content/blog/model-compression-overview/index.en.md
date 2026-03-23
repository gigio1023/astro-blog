---
title: "Model Compression Overview"
description: "Overview of model compression techniques: NAS, network pruning, knowledge distillation, tensor decomposition, and quantization."
date: "2021-11-28T13:07:01.511Z"
tags: ["dl"]
lang: en
translationOf: "model-compression-overview"
draft: false
---

# Goal
## On device AI
- Overcome the constraints of models deployed on personal devices
  - power usage
  - RAM
  - Storage
  - Computing power
## AI on cloud
- Latency and throughput matter because many users need to use it
  - e.g., time per request, number of requests processable per unit time
- Need to achieve lower latency and higher throughput with the same resources

## Computation
![](/assets/images/경량화 overview/cbb682dc-946e-40d1-848a-97f392602caa-image.png)
- The number of operations performed by the model itself needs to be reduced.
- Since 2012, the computation required for model training has doubled every 3-4 months.


# Efficient Architecture Design
![](/assets/images/경량화 overview/29953b37-5063-42ad-aabd-88d69139ab02-image.png)
A chart showing parameter counts and performance of released CNN models. The models in the chart tried to efficiently reduce parameter counts while improving performance. These are representative examples of Efficient Architecture Design -- designing the model itself to be efficient.

## AutoML; Neural Architecture Search (NAS)
**A useful technique worth knowing -- it has many applications.**
Instead of humans, use algorithms to design or find efficient models.
![](/assets/images/경량화 overview/f2092147-94ed-4f74-a111-f7f7f5adac13-image.png)

The controller is a model that proposes model architectures. The accuracy is computed with the proposed model, and this metric is used to retrain the controller. Repeating this process should help find efficient models.

![](/assets/images/경량화 overview/f22cbdf0-df1c-44d2-9b86-7a17e44f8f85-image.png)

Models obtained through AutoML/NAS are likely to be architectures that don't match human intuition. Still, such models can outperform existing ones.


# Network Pruning

- Remove model parameters with low importance
- Topic: defining and finding good importance measures
  - e.g., compute the L2 norm or loss gradient of a given parameter to measure importance
- Divided into structured/unstructured pruning

## Structured pruning
- A collective term for techniques that prune parameters in groups
  - Groups: channel, filter, layer, etc.
- Suitable for SW/HW optimized for dense computation since pruning happens in bulk
![](/assets/images/경량화 overview/08644e1d-2c18-4a68-9d84-3428b4349fb8-image.png)
Groups are formed by channel for the original network, and a factor is computed per layer. Removing layers with low importance produces a compressed model.


## Unstructured pruning
- Prunes each parameter independently
- Since it's applied individually, the internal matrices of the network become increasingly sparse as more pruning is performed
- Suitable for SW/HW optimized for sparse computation

# Knowledge Distillation
Use a pre-trained large model to assist training of a smaller network.
![](/assets/images/경량화 overview/6625704e-7465-4577-a5e4-e1bd03202a18-image.png)
The student loss part is the same as regular network training. Loss is computed using ground truth and prediction results.
The distillation loss part is where knowledge distillation happens. Instead of ground truth, soft labels from the teacher model are used to compute loss against predictions.

![](/assets/images/경량화 overview/bf88e088-4e28-42f6-94af-23570be67091-image.png)
Soft targets (soft outputs) contain more information than ground truth. The figure above represents the probability as color when displaying predicted labels per row. Unlike ground truth, instead of using only one predicted label for classification, **all label probabilities can be used**.
This allows training the smaller network with more information.

## Formula
![](/assets/images/경량화 overview/ac84ee51-83e6-496a-a155-a70ad5a9ee2e-image.png)
- Left term: cross-entropy between student network and ground truth
- Right term: KLD loss between teacher network and student network
- $T$: temperature hyperparameter. Makes small softmax outputs larger and large ones smaller. [ref](https://light-tree.tistory.com/196)
- $\alpha$: weight for the two losses




# Matrix/Tensor Decomposition
**Mathematically involved, but even simple applications can yield effective results.**
- Express a single tensor as a sum/product of smaller tensors
## CP decomposition
Approximate a tensor as the sum of outer products of rank-1 vectors.




# Network Quantization
Map fp32 to fp16 or int8.
![](/assets/images/경량화 overview/0b944f17-cfba-48b3-a945-c051fd5ab4b3-image.png)

After applying quantization, dequantizing the computation results will produce errors compared to fp32 results. However, empirically, models are known to be robust to such errors.

- model size: decreases
- accuracy: slight decrease
- time: depends on HW. Generally improving regardless of HW
  - e.g., on certain HW, int8 quantization might actually be slower


# Network compiling
- When the target system is fixed, compile the network itself for efficient computation.
- The technique with the biggest impact on speed.
- TensorRT (NVIDIA), TFLite (Tensorflow), TVM (Apache)
- Performance varies by combination of compile library, HW system, and model.
![](/assets/images/경량화 overview/38f1e42c-a732-4458-b684-016e12199162-image.png)

With rule-based compiling, the graph is simplified according to defined rules as shown above. The simplified result is called a fusion.

![](/assets/images/경량화 overview/b9c15471-01c3-4392-b670-6e8f8c1b30be-image.png)

There are also attempts to find good fusions via AutoML. Considering all combinations of framework, HW, and system produces a large search space. So AutoML is used to find optimized fusions for the target system. Apache's AutoTVM is said to serve that purpose.
