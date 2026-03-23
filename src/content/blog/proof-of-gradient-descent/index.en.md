---
title: "Proof of Gradient Descent"
description: "Mathematical derivation of gradient descent for linear regression, from L2 norm cost functions to SGD."
date: "2021-08-04T06:19:39.104Z"
tags: ["ml", "algorithm"]
lang: en
translationOf: "proof-of-gradient-descent"
draft: false
---

I've organized this in Notion several times before. Here I'm re-organizing based only on what I learned at BoostCamp.

Previous notes on gradient descent are at the links below.
https://naem1023.notion.site/Gradient-descent-429308fbd0184aaab90c0ac50e90b526
https://naem1023.notion.site/ML-68740e6ac0db42e9a01b17c9ab093606


# Gradient descent
## Purpose
In the previous post I only built an algorithmic structure for linear regression using gradient descent. This time I'll look at how it's used mathematically.

## Use in linear regression
![](/assets/images/Gradient descent 증명/5a0c0d90-cb90-4b5c-b72c-b52eee765fbc-image.png)

The goal of linear regression is to minimize the L2 norm between the actual data values y and the predictions yhat.

This could in theory be computed via the Moore-Penrose pseudoinverse, but that's almost never practical. Let's find yhat through gradient descent instead.

## Cost function for linear regression
Most blog posts explain what the cost function is and then walk through gradient descent, which made this part hard to understand. For instance, the Notion notes linked above work through differentiation of J(theta_0, theta_1).

BoostCamp's approach via the L2 norm made it much clearer.

![](/assets/images/Gradient descent 증명/445f962f-2928-4899-a956-df4bbded9bfe-image.png)

Since the ultimate goal is finding an ideal yhat, using the squared L2 norm as the cost function instead of the L2 norm itself is fine.

What we want is to find the beta that minimizes the cost function. Gradient descent is the method we've chosen for that.

In other words, we need to compute the gradient vector of the cost function, to feed into the algorithm from the previous post.

### Partial derivative of the cost function w.r.t. the k-th element of beta
The partial derivative w.r.t. the k-th element of beta is:
![](/assets/images/Gradient descent 증명/43b3c8a5-24f2-4cc8-8681-07c0281a401c-image.png)

Note that unlike a plain L2 norm, computing the mean here matters.

In the formula, this symbol:
![](/assets/images/Gradient descent 증명/e4b0b06a-b2c3-46dd-8716-3309d38bc0a9-image.png)
means the transpose of the k-th column vector of matrix X.


### Gradient vector of the cost function
The gradient vector w.r.t. beta looks like the partial derivatives for each k-th element of beta laid out in a gradient vector:
![](/assets/images/Gradient descent 증명/2124cda7-fbcd-4322-a1be-7a44d8fbb93a-image.png)


Simplifying gives:
![](/assets/images/Gradient descent 증명/6e3989ef-8dde-47d7-bf17-3df15753854c-image.png)
After all the complexity, the result is just X-transpose multiplied -- the derivative of X*beta w.r.t. beta.

### Gradient descent algorithm that minimizes the cost function
At step t, updating beta for step t+1 works like this:

![](/assets/images/Gradient descent 증명/45118802-286f-4592-a3b2-d639646316ca-image.png)

As intended by gradient descent, we subtract the gradient vector from the t-th beta in the direction that minimizes the cost function.

Substituting the gradient vector computed above flips the sign:
![](/assets/images/Gradient descent 증명/af3dc779-3c25-4ca4-8c67-c7cf4cec7e9d-image.png)

## Cost function using the squared L2 norm
Computing with just the L2 norm gave a messy gradient vector. Squaring it removes the root, so it should be cleaner.

![](/assets/images/Gradient descent 증명/49a8ccd7-4f21-4c63-82fd-b0eba4d9c60e-image.png)

## Final gradient descent algorithm
```python
# norm: function that computes l2 norm
# lr: learning rate
# T: number of training steps

for t in range(T):
	error = y - X @ beta
	grad = - transpose(X) @ error
	beta = beta - lr * grad
```

## Convergence guarantees of gradient descent
With an appropriate number of steps and learning rate, convergence is always guaranteed for differentiable convex functions.

The cost function of linear regression is convex w.r.t. beta, so convergence is guaranteed.

However, nonlinear regression is not guaranteed to have a convex cost function w.r.t. beta, so convergence is not guaranteed.

![](/assets/images/Gradient descent 증명/28bc1210-5e3e-4dc9-8097-6f357e489a6b-image.png)

# SGD (Stochastic Gradient Descent)
SGD uses only a subset of the data instead of all of it for updates.

It's not a silver bullet, but in deep learning where cost functions are usually non-convex, SGD has been empirically shown to outperform standard gradient descent.

The professor mentioned that SGD, which uses only a portion of the data, has been empirically shown to produce results probabilistically similar to full gradient descent.

![](/assets/images/Gradient descent 증명/bdea073e-957e-4b80-bcd2-7c72ec129a50-image.png)

The subset of data used is called a mini batch.
By convention, using a single data point is called SGD, while using a subset is called mini batch SGD.

## Efficiency
![](/assets/images/Gradient descent 증명/21d5bdbd-f88e-4862-b128-344fc711f856-image.png)

Since we use a mini batch (Xb, yb) instead of the full data (X, y), computation is reduced by a factor of b/n.

Additionally, splitting the data means GPU memory can be used more efficiently.

## How it works
Standard gradient descent uses all data to compute nabla theta L, as shown below:

![](/assets/images/Gradient descent 증명/8f7aa27a-e537-4a45-a3b6-dc0ae58e2a88-image.png)


SGD uses a mini batch D(b) to compute the gradient vector:

![](/assets/images/Gradient descent 증명/338084a7-0b3d-4f13-af7d-c3ef15f67215-image.png)

This provides a direction similar to standard gradient descent.

---

![](/assets/images/Gradient descent 증명/d0a7658b-4fb8-487f-a7cf-32f1ac90aded-image.png)

Also, since D(b) changes at every step, the objective function also changes at every step.
So even if we reach a local minimum, the objective function changes, meaning there's a probabilistic chance of escaping local minima.

## Comparison with gradient descent
![](/assets/images/Gradient descent 증명/c7f7ab44-27b4-44fe-bed7-e9bc68c7d5e8-image.png)
SGD might be less efficient than gradient descent on convex problems. But for typical machine learning objective functions, it's more efficient.
