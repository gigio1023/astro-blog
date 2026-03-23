---
title: "Convolution"
description: "Convolution fundamentals: stride, padding, parameter counting, and 1x1 convolutions."
date: "2021-08-11T02:38:17.395Z"
tags: ["computer-vision", "dl"]
draft: false
lang: en
translationOf: "convolution"
---

# Convolution
## In formulas
![](/assets/images/Convolution/16f95e55-0d06-4a25-8612-e9a2c24b3391-image.png)


## Role
![](/assets/images/Convolution/a2f9a130-941f-40ca-b403-7f470c47227c-image.png)

It can extract desired features.

For example, suppose you use a (3,3) kernel where all values are 1/9. That becomes an averaging convolution operation.


## Tensor
![](/assets/images/Convolution/97633dcb-6c37-4aeb-b0aa-510479566d02-image.png)
Consider an RGB image with 3 channels. To apply a (5,5) filter to this image, think of it as applying a filter with 3 channels.

---
![](/assets/images/Convolution/a03d1561-9ab1-445d-8d2f-0885ed464fd2-image.png)
For example, applying 4 (5,5,3) filters to an RGB image as above produces 4 (28,28) features each with 1 channel.

## Stack of convolution
![](/assets/images/Convolution/46095895-ee37-4209-b73e-22e11585427a-image.png)
Like MLP, layers are stacked by passing through a non-linear function.

## Convolution and Neural networks
![](/assets/images/Convolution/4c8b200f-4e9a-4564-b507-1dfc06dc1085-image.png)

The figure above shows the most classic CNN.

Convolution and pooling layers: feature extraction
Fully connected layers: decision making (e.g., classification, regression)

The trend nowadays is to reduce fully connected layers.
Because reducing the number of parameters makes training easier and improves generalization performance.


## Stride
The kernel moves by stride amount while performing convolution.
![](/assets/images/Convolution/4c218f92-54e5-452e-b82b-aa6a57263122-image.png)
Since it is 1D, the stride value is also 1D.

## Padding
Convolution cannot be performed at the edges. So we fill in arbitrary values and perform convolution on the image edges.
e.g., zero padding = fill the padded area with 0.

![](/assets/images/Convolution/fb631b17-d4ed-4a22-9abe-c283be6819a5-image.png)

With padding, the spatial dimensions of input and output can be matched.

undefined


## Counting parameters
_**Parameters of a convolution operation = parameters of the kernel**_

![](/assets/images/Convolution/c06d473c-8998-4c5e-a6d0-98fb68716177-image.png)
Padding(1), Stride(1), 3x3 kernel

1. We say 3x3 kernel, but as mentioned earlier, the kernel's channel matches the input's channel.
2. So we use a (3,3,128) kernel.
3. Convolving the channel-matched kernel with the input always produces 1 channel.
4. The output has 64 channels.
5. Therefore, 64 (3,3,128) kernels must exist.

**_Getting an approximate sense of the parameter count through this process is important!_**


### Alexnet
![](/assets/images/Convolution/256bdb1a-f78b-4c3b-8b33-3f7e51c8264c-image.png)

The parameter counts between convolution layers and dense layers are vastly different!
The reasons:
- Convolution shares the same weights through the kernel.
  - The same kernel is used regardless of where the element is in the input image.
- Dense layers have different weights for every node, as we know.

## 1x1 convolution
![](/assets/images/Convolution/3ec4885a-0cb6-4f6b-b6fc-93b2fd68161b-image.png)

1x1 convolution cannot see a region. Obviously -- it is a kernel that only repeats convolution over a 1x1 area.

But it can serve the following purposes:
- Channel (dimension) reduction
- Expected parameter reduction as depth increases
- e.g., bottleneck architecture
