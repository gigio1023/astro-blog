---
title: "Ensemble"
description: "Ensemble methods for AI competitions: hard voting, soft voting, and weighted voting to improve model performance."
date: "2021-08-31T18:22:32.656Z"
tags: ["dl", "pytorch"]
draft: false
lang: en
translationOf: "ensemble"
---

In production, the effort that would go into ensemble is usually spent on optimizing the model and training pipeline. But in competitions, where the fight is over fractions of a decimal point, using ensemble to push up the score matters.

# Ensemble
![](/assets/images/Ensemble/af07b5b8-693c-449a-8dfb-d13b76507c35-image.png)

When training most models, overfitting occurs frequently. Of course, underfitting can happen if the data is too small and biased, but that is less common.

The figure below might help understand this.
![](/assets/images/Ensemble/25919656-bfa8-4101-8ca4-8d521559d861-image.png)
ref: https://bywords.tistory.com/entry/%EB%B2%88%EC%97%AD-%EC%9C%A0%EC%B9%98%EC%9B%90%EC%83%9D%EB%8F%84-%EC%9D%B4%ED%95%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-biasvariance-tradeoff


## Voting
ref: https://devkor.tistory.com/entry/Soft-Voting-%EA%B3%BC-Hard-Voting

- Hard voting: selects the majority class
- Soft voting: outputs the average across classes
- Weight voting: multiplies each model's output by its weight and divides by the sum of weights
