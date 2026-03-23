---
title: "CutMix"
description: "CutMix data augmentation in PyTorch: loss computation, accuracy, and F1 score calculation."
date: "2021-08-27T23:02:28.794Z"
tags: ["computer-vision", "pytorch", "ai-competition"]
draft: false
lang: en
translationOf: "cutmix"
---

# CutMix
https://hongl.tistory.com/223
I decided to use CutMix, which is said to be more effective than random crop.
![](/assets/images/CutMix/d52b3e66-10b8-43c2-af9b-eac1649383a7-image.png)

For example, cutout just removes the dog's face entirely. CutMix pastes a cat onto the dog's face region and trains with that.

- Goal: combine $(x_A, y_A)$ with $(x_B, y_B)$ to create a robust, high-performing model.
- Combination method: uses a combination ratio of $\lambda$. The ratio is used as follows:
![](/assets/images/CutMix/2f9cd52d-08f4-449c-9bce-2af81849e5a1-image.png)
  - $M \in \{0,1\}^{W\times H}$, because it is normalized.

## Implementation
Official repo: https://github.com/clovaai/CutMix-PyTorch
PyTorch implementation repo: https://github.com/hysts/pytorch_cutmix

Looking at cutmix.py and train.py in the implementation repo gives a good sense of it.

### Loss
When CutMix is used as collate_fn in the dataloader, the dataloader's label output consists of two tensors. The first is the original label, and the second is the label of the randomly shuffled image patched onto the original.

Compute the loss for the CutMix-processed image tensor against each of the two label tensors, then apply lambda and 1-lambda as weights respectively.

---
The PyTorch implementation uses cross entropy. It is set up to freely change the criterion, so swap it as needed. I was using focal loss because of severe class imbalance in my data.


## Evaluation metrics
### Accuracy, loss
Accuracy is computed the same way as y-hat using lambda in the formula above. Because that ratio was actually used.

Loss is similarly computed by applying the same formula to values passed through cross entropy. Same reasoning as accuracy.

### F1 score
Usually computed by passing y and predicted_y together to sklearn. predicted_y is already prepared, but y is the problem.

CutMix is implemented as the Dataloader's collate function, set up to receive one original y and one shuffled y. That is, y received through the dataloader consists of 2 y sets, and other metrics (accuracy, loss) multiply lambda and (1-lambda) to the two results respectively and add them to get a single scalar metric.

For F1 score, use the lambda computed per batch:
> (origin f1 score) * lambda + (random shuffle f1 score) * (1 - lambda)

Compute per batch and use the average of batch F1 scores for one epoch.
