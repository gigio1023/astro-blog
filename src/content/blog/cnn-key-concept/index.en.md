---
title: "CNN Key Concepts"
description: "Key CNN architectures from ILSVRC: AlexNet, VGGNet, GoogLeNet, and ResNet, with analysis of receptive fields and 1x1 convolutions."
date: "2021-08-11T06:50:47.059Z"
tags: ["computer-vision", "dl"]
draft: false
lang: en
translationOf: "cnn-key-concept"
---

# CNN
## ILSVRC
- ImageNet Large-Scale Visual Recognition Challenge
- Classification, Detection, Localization, Segmentation
- 1000 different categories

![](/assets/images/CNN key concept/4cf1564c-fafb-425d-8e60-9030768a67e7-image.png)

From 2015 onward, the error rate dropped below human-level. Apparently that "human" was a Tesla developer who tried it himself.

The CNN models described below were validated in this competition.
## AlexNet
![](/assets/images/CNN key concept/c1b7c1ab-eecb-4719-8faf-81c3b1f3ef35-image.png)

AlexNet split the network into two because GPU resources were limited at the time, training on two separate GPUs.

An 11x11 filter was applied to the input. This was not a great choice -- the receptive field gets wider, but the number of parameters increases proportionally.

Key point
- ReLU
  - Various interpretations exist, but it is an effective activation function that does not break the network even when it gets deep.
- 2 GPU
- LRN (Local response normalization)
  - Suppresses strongly activated regions.
  - Rarely used nowadays.
  - But data augmentation is always used. Not sure if the terminology is right..
- Overlapping pooling
- Data augmentation
- Dropout

In 2021, these are standard techniques, but in 2012 they were novel benchmarks for deep learning.

### ReLU
![](/assets/images/CNN key concept/26a5bd12-59ad-447b-8279-6e0ec479230f-image.png)
- Has good properties of linear models.
  - Even when gradient values get very large, it can maintain them.
- Gradient descent works well.
- Good generalization.
- Solves gradient vanishing.
  - Previous activation functions had gradients approaching 0 when inputs got very large, causing vanishing.


## VGGNet
![](/assets/images/CNN key concept/8e9be04a-4c98-4956-a2ca-a68bc40bef27-image.png)
ICLR 2015 winner
- Uses only 3x3 convolution filters (with stride 1)
- 1x1 convolution for fully connected layers
  - Not used to reduce parameters like the modern use of 1x1 filters.
- Dropout (p=0.5)

![](/assets/images/CNN key concept/d167cf16-1508-418c-8c7e-84f6914ecccc-image.png)

Receptive field: the size of the region received through the filter.

Passing through a 3x3 filter twice gives the same 5x5 receptive field as using a 5x5 filter once.

But the parameter count differs by almost 1.5x. The calculation is shown above.

Therefore, most CNN papers after this use 3x3 or 5x5 filters, and 7x7 at most. It shows how inefficient AlexNet's 11x11 was.

In summary, to increase the receptive field, stacking multiple smaller filters is much more advantageous.

## GoogLeNet
I looked for papers with a lowercase l -- turns out they write L uppercase.
![](/assets/images/CNN key concept/4e30c6bc-670c-4f2f-a9e1-8ae66fe2e556-image.png)

- ILSVRC 2014 winner
- NIN (Network in Network) -- a similar-shaped network exists within the network.
- Uses Inception blocks

### Inception block

![](/assets/images/CNN key concept/ad954212-d5c2-4e03-afbe-c071dce347b2-image.png)

- Concatenates convolution results from multiple paths
- 1x1 convolution reduces the number of parameters
  - 1x1 has the effect of reducing dimension in the channel direction

### 1x1 convolution
![](/assets/images/CNN key concept/41e65537-9b53-4a42-b592-cb7879b0b5f4-image.png)
Standard convolution:
3x3 filters with 128 channels. Since the output has 128 channels, 128 filters are needed.

So 3x3x128x128 = 147,456 parameters are needed.

1x1 convolution:
The intermediate output has 32 channels. That is, there are 32 1x1x128 filters.
After the 3x3 convolution, the result has 128 channels. That is, there are 128 3x3x32 filters.
Expressed as the formula above. Combined, 40,960 parameters are needed.

Effect of mixing in 1x1 convolution:
Reduced the number of parameters while maintaining input, output, and receptive field size.

## CNN model intermediate comparison
Number of parameters:
- AlexNet (8 layers): 60M
- VGGNet (19 layers): 110M
- GoogLeNet (22 layers): 4M

## ResNet
Written by the famous Kaiming He, apparently. I didn't know who that was..

### Background
![](/assets/images/CNN key concept/5d3f16d1-0eff-4c11-92c9-88759de3ba40-image.png)

- Overfitting occurs with an excessive number of parameters.
- A 56-layer network cannot learn better than a 20-layer network no matter how much you train it.

### Skip connection
![](/assets/images/CNN key concept/7ee3c4dc-34ed-45dd-bb2c-99302668dddb-image.png)
Let's learn only the residuals.

--

![](/assets/images/CNN key concept/131dc1c9-66e5-4b8a-909a-5105a000110b-image.png)

Adding skip connections means more layers lead to better learning.

---
![](/assets/images/CNN key concept/1086f419-273a-4fda-9517-eed6532425cf-image.png)
- Simple shortcut
  - Simply adds the input and convolution result
  - Commonly used
- Projected shortcut
  - Adds a 1x1 convolution and convolution result
  - Rarely used
- Batch normalization
  - In the ResNet paper, placed after convolution and before the activation function.
  - Controversial. Some say conv->relu->bn performs better, others say it is better not to use bn at all.

### Bottleneck architecture
![](/assets/images/CNN key concept/d7cd47b1-05de-440f-9d88-c0641f32eb34-image.png)

Left is the original network, right is the bottleneck architecture.

By freely adding 1x1 filters before and after convolution, it matches input and output dimensions while reducing parameter count.

## CNN model comparison
![](/assets/images/CNN key concept/53dd7dd9-0d6f-4312-9073-90c7e997b659-image.png)

Performance increased, and parameters decreased!

## DenseNet
![](/assets/images/CNN key concept/57cc94ce-8ddc-4dd6-b4c1-018cbeb8f48d-image.png)
In ResNet's skip connection, adding results would mix the values. So let's concatenate instead. Since the dimensions are the same, there should be no issue.

Very useful for simple classification!

**Problem**
Dimensions will double each time.

### Dense Block, Transition Block
![](/assets/images/CNN key concept/2aaac941-df7b-4ebe-9c05-645b673705f7-image.png)
To solve this problem, dimensions are reduced while constructing the network.

That is, when dimensions grow through a Dense block, they are reduced through a Transition block.

Transition block = bn -> 1x1 conv -> 2x2 AvgPooling
