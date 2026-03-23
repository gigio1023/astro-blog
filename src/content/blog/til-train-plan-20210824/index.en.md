---
title: "TIL Training Plan 2021.08.24"
description: "Day 2 competition log covering ensemble strategies (bagging vs. boosting) and CNN model selection for image classification."
date: "2021-08-24T15:53:05.920Z"
tags: ["pytorch", "naver-boostcamp", "ai-competition"]
draft: false
lang: en
translationOf: "til-train-plan-20210824"
---

# Summary

The training plan is the same as the previous TIL. I couldn't figure out how to implement ensemble learning, so I went with simple if-statements for now.

The 18 classes are determined by 3 feature conditions. I could have hardcoded 18 if-statements, but I used Python itertools' product instead.

```python
mask = [0, 1, 2]
gender = [0, 1]
age = [0, 1, 2]

label_number = list(product(mask, gender, age))
```

The prerequisite is that the 3 features and class numbers must be in ascending order. Fortunately, they were. I match the outputs from 3 models against label_number to get the final class.

As a diagram:

undefined

# Ensemble learning
ref: https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-11-%EC%95%99%EC%83%81%EB%B8%94-%ED%95%99%EC%8A%B5-Ensemble-Learning-%EB%B0%B0%EA%B9%85Bagging%EA%B3%BC-%EB%B6%80%EC%8A%A4%ED%8C%85Boosting
- Bagging (parallel): Suppose you have models with the same output. Multiple models with the same structure repeatedly sample from the same dataset and train (Bootstrap Aggregation). Apparently, sampling multiple times from the same dataset improves learning effectiveness.
- Boosting (sequential): Uses different models. The results of the previous model are reused by weighting the data during the next model's training.

There's no silver bullet for choosing between them. Pick what fits the domain and problem.

- Boosting tends to have lower error than bagging.
- Boosting is slower to train and more prone to overfitting.
- Low model performance is the issue -> Try boosting.
- Overfitting is the issue -> Try bagging.

# Model change
https://paperswithcode.com/sota/image-classification-on-imagenet
CNN ranking I referenced.

- Previous: resnet18, very fast training, good for testing.
- efficientnetb7: Hit rank 9 with just epoch=5 and kfoldsplit=2. But very slow. I consider this the safe minimum baseline.
- volo: Supposedly very good performance, but the model output came out wrong, so I couldn't use it. A shame given its high rank.
- CaiT: Said to be a type of ViT, but no pretrained model was available, so accuracy was 38%..
  - https://github.com/facebookresearch/deit
  - https://github.com/facebookresearch/deit/blob/main/README_cait.md
  - https://paperswithcode.com/paper/going-deeper-with-image-transformers#code
- BiT: Google's transformer-based image classification. Also ranked well, so I'm trying it.
  - https://rwightman.github.io/pytorch-image-models/models/big-transfer/

# Plan
For now, let me train efficientnet with more epochs and kfoldsplits... 8 hours gone.
