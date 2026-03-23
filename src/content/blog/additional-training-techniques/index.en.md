---
title: "Additional Training Techniques"
description: "Practical training techniques including AMP, label smoothing, ArcFace loss, class pivot adjustment, and Wandb logging for image classification."
date: "2021-08-30T15:13:38.273Z"
tags: ["computer-vision", "pytorch"]
lang: en
translationOf: "additional-training-techniques"
draft: false
---

# AMP
This is the 'amp' that NVIDIA contributed to PyTorch. It allows computation in FP16, so I planned to use it.

https://pytorch.org/docs/stable/notes/amp_examples.html

I used the first approach where autocast handles things automatically.
That said, the performance gains aren't dramatic. Even in NVIDIA's benchmarks, improvements were only in the single digits.

# Label Smoothing (Loss)
Traditionally, we've been applying softmax to the model's output and using the result. Instead, the idea is to use the model's raw output while representing labels as real numbers.

For example:
> [0,1,0,0]

This model output becomes:
> [0.025, 0.925, 0.025, 0.025]

The loss is computed with these transformed labels. The exact method for converting to real values may vary, but as far as I know it's basically a ratio calculation.

# ArcFaceLoss
Concept: https://aimaster.tistory.com/93
Implementation: https://www.kaggle.com/underwearfitting/pytorch-densenet-arcface-validation-training

I need to look into this more..

# Class Pivot Adjustment
The current age feature for classes forms 3 groups based on cutoffs at 30 and 60 years old. Looking at the class distribution, there are notably few people around age 30 and above age 60. Due to this class imbalance, I tried manipulating the class boundaries and training, which yielded better performance.

## Analysis
Compared to features like gender or mask-wearing status that are discretely and clearly distinguishable, age is ambiguous in many ways. Even experienced people would often fail to distinguish between someone who is 29 versus 30.

So I figured that adjusting the class pivot points wouldn't stray far from the intent of properly learning age.

## Results
Changing the cutoff points from 30 and 60 to 29 and 59 consistently improved the f1 score by about 0.05. However, changing the cutoffs to 29 and 58 actually degraded performance.

# Wandb
I modified the trainer to update the following metrics per step:
> acc, loss, val_acc, val_loss, f1_score, val_f1_score, learning_rate

I organized workspaces to hold multiple tags so they'd be easy to filter later. I decided to add tags for key augmentation techniques and other distinguishing methods used during training.
