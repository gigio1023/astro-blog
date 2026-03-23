---
title: "Last-Minute Score Boosting"
description: "Last-minute competition score boosting: test-time augmentation (TTA) with soft voting and half-precision training."
date: "2021-09-02T01:27:24.523Z"
tags: ["computer-vision", "pytorch", "ai-competition"]
draft: false
lang: en
translationOf: "final-score-improvement"
---

Techniques I used to push the score up toward the end of the competition. Not dramatic performance improvements -- more like solidifying the score.

# TTA (Test time augmentation)
ref: https://chacha95.github.io/2021-06-26-data-augmentation2/

A method usable when a finalized model exists.

Feed images with various augmentations individually into the finalized model and ensemble the outputs.
![](/assets/images/마지막 점수 올리기/4738e4db-bdab-4b73-9942-f3efd86cc2f3-image.png)

The method for ensembling multiple outputs is up to you. Soft voting is commonly used. There are various methods available, but there is no reason not to use soft voting. Soft voting is better than hard voting for preventing overfitting while targeting performance improvements.

But soft voting is not a silver bullet.

ref: https://devkor.tistory.com/entry/Soft-Voting-%EA%B3%BC-Hard-Voting

> Gather only models whose probability for a certain class exceeds a threshold, then perform Hard Voting on those alone.

The above is said to be a typical case for using hard voting.

## Soft voting implementation
There are various ways to implement this. The two examples I saw:

- During the validation step, apply n augmentations to a batch of images and let each output be $Output_n$. Then simply add the n tensors and divide by n.
- Suppose the pipeline of choosing a transformation, building a model/dataset/dataloader, and running validation is packaged as one unit. Give transformation as a dynamic factor to this pipeline, get outputs from multiple pipelines, and average over the class indices.

I went with the second approach, but in terms of implementation convenience and simplicity, the first is far easier. I chose the second due to structural constraints.

# Half precision
Not sure if this actually took effect. Batch size should roughly double, but it only went from 40 to 50, or sometimes stayed the same. Speed seemed unchanged.. I applied it as the docs instructed, but nothing seemed to work. I tried installing nightly thinking it might only work there, but that didn't help either.

If properly applied, this technique would be good to use from the start of training. Using 16-bit floating point is said to give 2x or more gains in training speed and batch size.

I learned about it too late in the competition, which is why it is in this post.
