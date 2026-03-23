---
title: "CNN"
description: "CNN fundamentals: convolution operations, kernel mechanics, multi-dimensional convolutions, and backpropagation."
date: "2021-01-01"
tags: ["computer-vision", "ml", "algorithm"]
draft: false
lang: en
translationOf: "cnn"
---

# CNN

The fully connected layer in MLP has a very large weight matrix.
![](/assets/images/CNN/db07a015-2c05-4f67-abf1-2a1b424243be-image.png)

CNN, on the other hand, uses a fixed input vector called a kernel.

![](/assets/images/CNN/dac9cc61-94e2-4fc2-afd7-f808c3e69683-image.png)

- Kernel V is applied for all i.
- It moves across x by the kernel size and is applied.
- The convolution operation excluding the activation function is also a linear transformation.


## Formulas
The formulas for continuous and discrete cases are as follows.

![](/assets/images/CNN/5d4278b4-b3ad-4a7e-b1a7-c366f353ca83-image.png)

Convolution locally amplifies or attenuates a signal to extract or filter information.

### Cross-correlation
Cross-correlation is the convolution operation joined with +. In practice, cross-correlation is used when implementing CNN. Traditionally cross-correlation was called convolution, but they are actually different operations.

![](/assets/images/CNN/cac572e4-50de-4e96-b121-cd002a79f97e-image.png)

## Convolution operation
Translation invariant: the kernel does not change as it moves within the domain.
Also, the kernel is applied only locally to the signal.
undefined
undefined

## Convolution example in images
Interactive demo: https://setosa.io/ev/image-kernels/

## Multi-dimensional convolution formulas
![](/assets/images/CNN/4e85d7a4-d0e5-48e7-9499-dcb922f48906-image.png)

## Applying convolution
![](/assets/images/CNN/b6a87966-6702-4afa-aed9-1e69713e7359-image.png)
- f is the kernel, g is the input.
- The coordinates for the input are (i, j).
- In the example, the ranges of p and q are 0-1 and 0-1 respectively. That is, the ranges of p and q serve to pair each element of the kernel with an element of the input matrix.
- Each pair is multiplied element-wise and summed.
- This is repeated without exceeding the input boundaries.

## Estimating convolution output size

![](/assets/images/CNN/4fbbe67b-beca-4be2-a6cd-0b4f7bff8ff8-image.png)
- Input size = (H, W)
- Kernel size = (KH, KW)
- Output size = (OH, OW)

## 2D convolution
From 3 dimensions onward, it is called a tensor, not a matrix.

![](/assets/images/CNN/3264d057-ee6f-4f83-8f31-a366f28a6f31-image.png)

When a 2D input comes in with 3 channels, convolution is performed as shown above.
A kernel is created for each channel, and convolution is performed between each channel's kernel and 2D input. Then all results are summed.

This is illustrated as follows.

![](/assets/images/CNN/7e7f2718-dafb-40a6-b2a7-cd9c97739c96-image.png)

A 3D kernel and 3D input are prepared. Of course, it became 3D because we assumed channels for a 2D input.

When performing convolution between 3D and 3D, it produces a 2D output with 1 channel. This is because kernels for all channels have been prepared.

---

If you want the 2D output to have multiple channels instead of 1, just create multiple 3D kernel tensors and apply them!

![](/assets/images/CNN/6453c204-1769-43d6-a8ff-a4c00c28c484-image.png)

## CNN backpropagation
When computing backpropagation, convolution operations appear as well. It sounds complicated, but the formula is as follows.
![](/assets/images/CNN/a8a024e3-1a5a-4ec0-aaca-9050be6394d3-image.png)

- f: kernel
- g: signal (input)
- Goal: differentiate the convolution of f and g

To differentiate with respect to x, only g contains the x term, so the derivative applies only to g.
In other words, as shown in the second line of the formula, _**it becomes a convolution of f and the derivative of g!**_

This applies equally in the discrete case.

### Example
![](/assets/images/CNN/df5ffcfb-ac63-410a-bf1e-3ee814bc3a47-image.png)
Suppose we perform convolution with input and kernel as vectors. The results are stored in the output vector.

---

![](/assets/images/CNN/be6d426a-0397-47d6-ae17-9d816e3f43e9-image.png)

Assume the error is computed from the loss function and its derivative has reached the output vector through backpropagation.

This might be confusing, but looking at the figure above: X3 and W3 are multiplied to produce O1. Similarly, X3 and W2 are multiplied for O2, and X3 and W1 for O3.

In the same way, the derivatives are multiplied with W3, W2, W1 of the kernel and delivered to X3.

---
![](/assets/images/CNN/c8b6e862-5500-43de-b456-5645f26c1e10-image.png)

The kernel is updated in the same way, apparently. I don't fully understand this part, honestly...

---

![](/assets/images/CNN/4537f8cd-49f1-43f3-8ec1-d7f418761b78-image.png)
Putting it all together, even backpropagation proceeds identically to a convolution operation!
