---
title: "PyTorch Transfer Learning"
description: "Transfer learning in PyTorch: freezing layers, stepping frozen strategies, and model file formats."
lang: en
translationOf: "pytorch-transfer"
date: "2021-08-20T04:11:55.216Z"
tags: ["pytorch"]
draft: false
---

Less about coding models, more about how to handle them.

# Transfer learning
- Applying a model trained on a different dataset (pre-trained model) to your current data.
  - More efficient since you don't start from scratch.
  - Using a model trained on a large dataset tends to give better performance.
- The most common training approach.
- Only parts of the model are modified for training.
- CNN: torchvision
- NLP: HuggingFace is the de facto standard.

e.g., if you want binary classification with VGG, load a pre-trained VGG from torchvision and add a linear layer at the end.

## source task, target task

![](/assets/images/pytorch transfer/b0288c4b-3ec2-42f4-81f0-43f4151b2e00-image.png)

This was an assignment from an optional exercise. A classic example of transfer learning. The goal is to transfer knowledge learned from the source task to the target task.

- Objective: train and classify fashion-mnist data.
- Approach:
  - Set imagenet and mnist_resnet as source tasks.
  - If the source task model is already pre-trained, use it directly as the target task model.
  - If changes are needed, add or modify some layers. Initialize weights and biases only for the modified layers and retrain.
  - In the target task, if further layer changes are needed, follow the same process: modify, initialize weights & biases, retrain.

## Frozen
Parameter updates and backpropagation are applied not to the entire network but only to specific layers of the pre-trained model. The goal is to keep some pre-trained parameters while tuning the model for your own dataset.

![](/assets/images/pytorch transfer/fe30774b-f113-4b19-bc16-4909c3dd0e30-image.png)

### Stepping frozen
The frozen layers change at each training step.

# pth, pt
File extensions for PyTorch models. Both work, but pth is already used by Python itself, so pt is recommended.

## nn.BCEWithLogitsLoss()
A criterion for computing loss in binary classification. It adds a sigmoid at the end of the model even if you don't include one yourself.
