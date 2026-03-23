---
title: "Deep Learning"
description: "Deep learning fundamentals: key components (data, model, loss, optimizer) and a brief history from AlexNet to GPT-3."
date: "2021-01-01"
tags: ["dl", "ml"]
draft: false
lang: en
translationOf: "dl"
---

# DL
The Boostcamp lectures clearly articulated things I had vaguely understood.
Lots of obvious stuff here too, but I wrote everything down anyway.

## Required abilities
- Implementation skills
- Math skills (Linear algebra, probability)
- Knowing many papers on the latest trends

## Definition
![](/assets/images/DL /ca2391dc-7082-4d0c-9318-adaf8ae8d212-image.png)

AI = aims to mimic human intelligence
ML = data-driven approach to problem solving
DL = when mimicking human intelligence with a data-driven approach, the subfield that uses NNs

## Key components
- Data: the model can learn from
- Model: How to transform the data
- Loss function: that quantifies the badness of the model
- Algorithm: Adjust the parameters to minimize the loss

### Data
![](/assets/images/DL /e0b03f19-eeb4-4af7-b923-11162a010c1d-image.png)
Varies by problem definition.
- Classification: labeled data
- Semantic segmentation: segmentation data
- Detection: bounding box data
- Pose estimation: skeleton data
- Visual QnA: Color data, etc...

### Model
A model appropriate for the problem definition is needed.

### Loss function
When data and model are fixed, defines how to train according to the problem definition.
![](/assets/images/DL /0dcd9b7d-2e4e-407b-958f-8a98c1a9ffdc-image.png)

Even if the loss function works correctly, there is no guarantee it will produce the desired results.

For example, say it is a regression problem using very noisy data.
Outliers will be greatly amplified by MSE's squaring.

To prevent this, consider using absolute value instead of squaring in MSE, or using a different loss function entirely.

So define it appropriately according to the problem and data.

### Optimization algorithm
undefined

Methods that optimize the loss function.

Usually first-order derivative information of NN parameters with respect to the loss function is used. Using it directly is SGD.
In practice, SGD is rarely used; the others are.

Other techniques also used:
- Dropout
- Early stopping
- k-fold validation
- weight decay
- batch normalization
- MixUp
- Ensemble
- Bayesian Optimization

# History of DL
## AlexNet (2012)
![](/assets/images/DL /75f40b7a-4e4c-427e-8803-94e890afca9f-image.png)
- CNN
- First to win ILSVRC (ImageNet Large Scale Visual Recognition Challenge) using DL
- All subsequent ILSVRC editions were won by DL
- This was the turning point

## DQN (2013)
![](/assets/images/DL /7cf33bb9-514c-46b8-b380-536c31444421-image.png)
- DL that solved Atari games with reinforcement learning
- Developed by DeepMind
- Algorithm used in AlphaGo

## Encoder/Decoder (2014)
![](/assets/images/DL /d46ac9c4-767b-42ce-ada9-79160c6042dd-image.png)
- Developed for NMT (Neural machine translation)
- Sequence to sequence model
- NMT changed from this point

## Adam Optimizer (2014)
![](/assets/images/DL /8f051186-ea7d-4bd6-884e-79e5514d9523-image.png)
Papers are usually implemented with various learning schedules.
Changing learning rate per epoch, using SGD, and so on...

These methodologies typically require very large computing resources.
For example, if a large company has 1000 TPUs, they can run 1000 configurations at once. Students usually have 1-2 GPUs at most, so replicating corporate-level papers could take over a year.

Adam works very well across most methodologies. It somewhat relieves the obligation to experiment with many configurations.

## GAN (Generative Adversarial Network, 2015)
![](/assets/images/DL /c7b5d85b-4897-424e-82c9-c6757ddb5c90-image.png)
DL that generates realistic images using existing images.
The researcher apparently came up with the idea while drinking at a bar...

## Residual Networks (ResNet, 2015)
The research that made DL deserve the name "deep." A paper with very deep NN stacking.

Previously, deep layers were not constructed. Because even if training data was learned well, performance on test data was poor.

After ResNet, deep layers started being stacked. Of course, 1000-layer configurations still do not work and are inefficient. But it enabled going from 20 layers to 100 layers.

## Transformer (2017)
A paper titled "Attention is All You Need."

At the time, it was thought to work only in its specific domain, but now it has replaced RNNs in nearly all fields. Even encroaching on CV.

## BERT (fine-tuned NLP models, 2018)
Bidirectional Encoder Representations from Transformers.

- Fine-tuned NLP models
  - Pre-training with large, general training data.
  - Fine-tuning on the desired category.

## BIG Language Models (GPT-X, 2019)
- Desired data composition through slight fine-tuning.
- Very large number of parameters (175 billion)

## Self Supervised Learning (2020)
![](/assets/images/DL /f7da3d8d-72c3-40dd-8505-d2e575726bcf-image.png)
- Representative papers like SimCLR
  - Use data without labels.
  - Use unsupervised learning to get good representations even outside training data.
- Self supervised data sampling
  - When you have deep domain knowledge of the defined problem, a methodology to create training data yourself.
