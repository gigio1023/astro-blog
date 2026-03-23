---
title: "Generative Models"
description: "Introduction to generative models: probability distributions, independence assumptions, chain rule, and auto-regressive models."
date: "2021-08-13T15:08:09.373Z"
tags: ["dl", "naver-boostcamp", "computer-vision"]
lang: en
translationOf: "generative-models"
draft: false
---

https://deepgenerativemodels.github.io/
A Stanford course that the lecture referenced.

# Generative Model
It's not just about generating images and text.

![](/assets/images/Generative Models/0f8e765f-c03c-4ef0-a45b-2717e4b2bf37-image.png)

Say we receive a set of dog images.

We can expect a generative model to learn a probability distribution $$p(x)$$.
- Generation: when sampling $$x_{new} \sim p(x)$$, $$x_{new}$$ should look like a dog.
- Density estimation: using $$p(x)$$ to determine whether an arbitrary input $$x$$ is a dog, not a dog, a cat, etc. (anomaly detection)
  - In a strict sense, a generative model subsumes a discriminative model.
  - A model that can yield probability values is called an _**explicit model**_.
- Unsupervised representation learning (feature learning): learning features in an unsupervised manner
  - The professor found this debatable, but the Stanford lecture claims this is also something generative models aim for.

## Basic Discrete Distributions
Some basic math prerequisites. This was also covered in Professor Im Sung-bin's class, but worth reviewing.

### Bernoulli Distribution
Bernoulli needs just 1 parameter.

- D = {Heads, Tail}
- P(X=Heads) = p, then P(X=Tails) = 1 - p
- Write: X ~ Ber(p)

### Categorical Distribution
Categorical needs m-1 parameters. If you know m-1 elements, the remaining one is determined automatically.
- D = {1, ..., m}
- P(Y=i) = $$p_i$$, such that $\sum_{i=1}^m p_i$ = 1
- Write: Y ~ Cat(p1, ..., pm)

### RGB
![](/assets/images/Generative Models/63e385e6-f325-4ec2-afcf-9b9fcd77925e-image.png)

- $(r, g, b) \sim p(R, G, B)$
- number of cases = 256 x 256 x 256
- number of parameters = 256 x 256 x 256 - 1
  - The number of parameters to represent a single RGB pixel is enormous. Obvious, but still.

### Binary Image
![](/assets/images/Generative Models/1daa072d-8af6-407d-a896-ae7f1968ea23-image.png)
- Assume a binary image with n pixels.
- $2^n$ states are needed.
- Sampling from $p(x_1, ..., x_n)$ generates an image.
  - Sampling $p(x_1, ..., x_n)$ requires $2^n - 1$ parameters.

---

The number of parameters is too large. Can we reduce it?

### Structure Through Independence
Suppose $X_1, ..., X_n$ in a binary image are independent.
This doesn't really make sense -- if all pixels were independent, the only representable image would be white noise. But let's assume it anyway.
>
$p(x_1, ..., x_n) = p(x_1)p(x_2)...p(x_n)$

The number of possible states remains $2^n$.

But the number of parameters for $p(x_1, ..., x_n)$ is just n. Because each pixel needs only 1 parameter, and since they're all independent, the total is n.

### Chain Rule
![](/assets/images/Generative Models/b07552e7-d5e4-4cd6-988e-2f1d85cd0c99-image.png)

No assumptions needed -- it's a theorem. Think of it as starting from the fully dependent model.

Total number of parameters: $2^n - 1$. Exponential reduction achieved.

### Bayes' Rule
![](/assets/images/Generative Models/7a57ce2b-cbd0-4d91-9b25-2d41da442046-image.png)

### Conditional Independence

![](/assets/images/Generative Models/ee99d572-1499-4f76-9c52-cb92e8965eee-image.png)
x and y are conditionally independent given z; p of x given y and z equals p of x given z.

If z is given and x and y are independent, then when looking at a random x, y is irrelevant.

This theorem lets you drop independent variables from the conditional in the chain rule or other formulas.
Using this, we'll build a good model between the fully dependent and fully independent extremes.

### Markov Assumption
Apply the Markov assumption to the chain rule. Similar to the assumption in RNNs -- the current state depends only on the immediately previous state.
In the chain rule, terms that used all previous information now only reference n-1 at time n.
![](/assets/images/Generative Models/da0176cf-190b-48bb-bd3b-493be8dfcc58-image.png)

Total number of parameters: $2n-1$.

Compared to n from the fully independent case it's larger, but compared to $2^n-1$ from the chain rule it's exponential reduction.

Finding this kind of sweet spot in between is what an _**auto-regressive model**_ does.

# Auto-regressive Model
![](/assets/images/Generative Models/62f2297a-0040-4490-b2d0-a82b1b6c6f84-image.png)
- Assume we use 28x28 binary images.
- Learning $p(x) = p(x_1, ..., x_{784})$ over $x\in\{0,1\}^{784}$.
- How to parametrize $p(x)$?
   - Use the chain rule to decompose the joint distribution.
   - ![](/images/b82a6be1-0c73-4c7b-9b06-6bee248ee47a-image.png)
   - This is called an _**autoregressive model**_.
   - Using only the immediately previous information (like the Markov assumption) is also autoregressive.
- All random variables must be ordered.
  - Performance can vary depending on the ordering.

A model considering only 1 previous step = AR(1) model
A model considering n previous steps = AR(N) model

## NADE
Neural Autoregressive Density Estimator
![](/assets/images/Generative Models/a97f82ee-7046-49e2-85d4-391c5a12f469-image.png)

![](/assets/images/Generative Models/a3890504-a4f3-4ee2-b285-a9150e347893-image.png)

The i-th pixel is dependent on pixels 1 through i-1.
- The first pixel's distribution depends on nothing.
- The second pixel's distribution depends only on the first.
- The fifth pixel's distribution depends on pixels 1 through 4.
- The i-th pixel depends on i-1 pixels.
- Input dimensions change, so the weights keep growing.
  - The i-th input needs weights that can accept i-1 inputs.
- Using a mixture of Gaussians at the last layer can produce continuous random variables.

_**NADE is an explicit model.**_
Since probabilities are computed like the chain rule, probability values can be obtained one way or another.

Implicit models can only do generation.

## Pixel RNN
Making an RNN auto-regressive.

The formula for an n x n RGB image:
![](/assets/images/Generative Models/6b6072b9-6fe8-4dc3-a816-9589dbaac990-image.png)

Two variants based on ordering:
![](/assets/images/Generative Models/66d30707-badf-4fa0-ad24-4d6bdea3e71a-image.png)
- Row LSTM
  - Uses information from above
- Diagonal BiLSTM
  - Uses all previous information
