---
title: "Preprocessing"
description: "Image preprocessing and data augmentation techniques for deep learning competitions, including resizing, bounding box cropping, and torchvision transforms."
date: "2021-08-24T02:04:59.305Z"
tags: ["pytorch", "ai-competition"]
lang: en
translationOf: "preprocessing"
draft: false
---

# Preprocessing
## Bounding Box
Filter out unnecessary information. The problem is that usually you're just given raw images. The developer has to figure out an appropriate approach.
Could use YOLO as taught in class, or since most mask photos are centered, a center crop might suffice... Need to try various things.

## Resize
It'd be nice to compute at original size, but considering image width, height, and channels, the amount of information is huge. You need to find a balance between information loss and computational efficiency. Sometimes reducing computation slightly to train more iterations is more efficient.

## Using Domain Knowledge
![](/assets/images/Preprocessing/785c872e-2ec4-4746-8c3a-779c6f9aa42f-image.png)
I pulled an eye-related data image from Kaggle. The original image wasn't used as-is; some preprocessing was applied. Seems like brightness was increased and saturation slightly reduced. If it seems appropriate for the domain, use it right away.

# Data Augmentation
## Bias, Variance
![](/assets/images/Preprocessing/2c2574df-3404-483c-8ade-e2eefaf9fe79-image.png)

This is the fourth time I've learned this in two years. But the perspective is slightly different. Previously, I studied this to understand models that generalize well.

Now I can think about it from the noise perspective. Perfectly ideal data doesn't exist in the real world, and real problems have a lot of noise. So to train a model that handles this noise well, preprocessing and augmentation for noise are needed.

## Train, Validation
![](/assets/images/Preprocessing/1933d51d-0cd7-4c71-898a-3ea48707ca39-image.png)

When I first saw PyTorch last year, I was curious about this. I thought the validation set results would feed back into training to adjust weights. But looking at the PyTorch code, it just looks at the validation results and ends training, which confused me.

The reason we bother splitting out a validation set is that we need a data distribution not used in training. Without it, there's no way to know if training went well until we run the model on the test set. My code would just be a model fitted to the training set, which is obvious in hindsight.

So we deliberately create a validation set from the training set. It lets humans check whether training is going well, and it can also be used as a metric for hyper parameter tuning.

_**Never touch the test set!!**_ Looking at it is just cheating, and it hurts generalization too.

## Data Augmentation
_**The process of generalizing data.**_
Varying the cases and states that the given data can have to generalize it.

![](/assets/images/Preprocessing/a71c2c28-f0ed-4a80-beb5-29d72708c41d-image.png)
For example, say there's a car photo. We could train with just this photo, but the states and cases of images are very diverse. We might assume it's not as bright as the photo, or that it's raining.

And in reality, the model needs to work in these diverse situations. So by adding noise to the data to increase variance, we can build a more robust model.

## torchvision.transforms
![](/assets/images/Preprocessing/6ea904db-1a4a-4d88-b07b-24ef71c74ef6-image.png)
https://www.cse.iitb.ac.in/~vkaushal/talk/auto-augment/

As shown, images are transformed in various ways to increase variance. The important thing is to consider variance that could plausibly exist in the real world.

For example, this image competition is about mask photo detection. The goal is detecting photos taken of customers in front of stores. Unless customers are hanging from the ceiling, we wouldn't expect vertically flipped photos. No need to include vertical flip in transforms.

Use domain knowledge proactively.

## Albumentations
![](/assets/images/Preprocessing/38cdf08d-308b-4bad-8841-2f03d5f46784-image.png)
Said to be faster and more diverse than PyTorch's transforms. Worth trying.

# Summary
There's no method that you absolutely must use, and no method that's universally good. Validate through hypotheses and experiments.