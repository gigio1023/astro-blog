---
title: "Probability Theory"
description: "Probability theory foundations for machine learning: probability distributions, joint and conditional distributions, Bayes' rule, and expectation."
date: "2021-01-01"
tags: ["ml"]
lang: en
translationOf: "probability-theroy"
draft: false
---

These are topics I struggled with even when writing notes about likelihood last year. I've reorganized them here based on BoostCamp content.

# Probability Theory
Deep learning is built on probability-based machine learning theory.

## Probability Distributions
![](/assets/images/확률론/632ccac5-8350-4221-86f6-292e72937eee-image.png)

In data space (X x y), probability distribution D is the distribution from which data is sampled in the data space.

Since y is assumed, this explanation is based on supervised learning with ground truth labels.

### Random Variables
![](/assets/images/확률론/b24b39b1-fa0d-4ec5-8788-1936e236d728-image.png)
Random variable = observable data in the data space.

- Random variables are used when extracting data.
- A probability distribution refers to the distribution from which random variables are drawn.

### Types of Random Variables
Random variables are classified as discrete or continuous depending on the distribution D.

_**Not classified by the data space.**_
For example, random variables in integer space are necessarily discrete. But a random variable in real-number space is also discrete if only -0.5 and 0.5 are selectable.

#### Discrete Random Variables
![](/assets/images/확률론/71e08125-84fc-4a9c-90ae-6c363f9432f9-image.png)
Modeled as the sum of probabilities considering all possible cases.
Called a probability mass function.


#### Continuous Random Variables
![](/assets/images/확률론/bb4330b1-5074-49e9-a042-7bf202c16ab1-image.png)
Modeled by integrating the density of random variables defined in the data space.

The density is as follows:

![](/assets/images/확률론/66415699-5c4f-4797-a1d6-0ea000aa5f75-image.png)

_**Density is the rate of change of the cumulative distribution function -- it is not a probability!**_

## Joint Distribution
![](/assets/images/확률론/652e4961-a733-4952-b74c-f1c0b1d76ebf-image.png)
Given the full data X and y, we can posit a distribution, called the joint distribution.
The joint distribution models probability distribution D.

![](/assets/images/확률론/632ccac5-8350-4221-86f6-292e72937eee-image.png)

In the figure above, the actual data points are blue dots. They look like continuous random variables, but if we posit the joint distribution as the red boxes, they can be treated as if they were discrete.

The type of the actual data distribution and the type of the joint distribution are unrelated. It depends on how you model it.

Because we're dealing with data computationally, we just need to set the joint distribution P(X, y) appropriately to approximate the true distribution D.

## Marginal Probability Distribution

![](/assets/images/확률론/45b5498a-9d5d-41d8-8892-f877a935458c-image.png)

P(x) = marginal probability distribution for input x; no information about y.
As shown, you can count occurrences along x or provide integrated information.

The marginal distribution for y can also be defined.
That is, counting or integrating along y to define P(y).


## Conditional Probability Distribution
![](/assets/images/확률론/ab9290ca-170b-4432-8726-da3e91df6aa5-image.png)
P(x|y) = models the relationship between input x and output y.
As shown, the conditional distribution can model x's information when y=1.

### Conditional Probability and Machine Learning
P(y|x) = the probability that the answer is y for input variable x.

In logistic regression, the combination of a linear model and softmax is used to interpret patterns extracted from data as probabilities.

How to compute conditional probability P(y|x):
- In classification, softmax(W*phi + b) is computed using feature pattern phi(x) extracted from data x and weight matrix W.
- It's fine to write P(y|phi(x)) instead of P(y|x).

Deep learning:
- NNs extract feature patterns phi from data.

## Expectation
When analyzing data given a probability distribution, various statistical functionals can be computed.

Expectation is the representative statistic of data. It's the mean.
It's also used to compute other statistical functionals from the probability distribution.

![](/assets/images/확률론/dfec800e-116f-4e56-9d59-e6bde9a5a7c3-image.png)

For continuous distributions, computed by integration; for discrete distributions, by summation.

### Usage
![](/assets/images/확률론/7d9dcf7f-5fbb-4acb-8816-6793ae516416-image.png)
Used to compute variance, kurtosis, covariance, etc.

### Estimating Conditional Expectation in Regression
![](/assets/images/확률론/5f9cc4a4-7ff9-4f3c-acd4-46a22cc46fde-image.png)
Conditional expectation coincides with the function that minimizes the L2 norm.

For robust estimation in regression, the median is used instead of conditional expectation.

## Monte Carlo Sampling
Most machine learning problems start without knowing the probability distribution.

That is, we need to compute the expectation using only data, and that's where Monte Carlo sampling comes in.
![](/assets/images/확률론/903c5c4f-c73e-455b-907a-8309c1614a62-image.png)

Formula explanation:
1. Substitute sampled data x into f.
2. Compute the arithmetic mean of the sampled data.
3. This value approximates the expectation.

Monte Carlo works for both discrete and continuous cases.

Monte Carlo sampling requires independent draws.
- Convergence is guaranteed by the law of large numbers.

### Monte Carlo Sampling Example

![](/assets/images/확률론/8c42ae08-02d1-4555-b276-f2d5c4911de4-image.png)

Integrating the function above on [-1, 1] is analytically impossible. That's when Monte Carlo sampling is used.

1. To structure the integral formula like Monte Carlo sampling, divide the integral expression by 2.
Because in integration there's no concept of "number of elements," the length of the x range being integrated is used as if it were the number of elements.
2. Draw N data points uniformly from [-1, 1] and compute the arithmetic mean.

```python
def mc_int(fun, low, high, sample_size=100, repeate=10):
    int_len = np.abs(high - low)
    stat = []
    for _ in range(repeat):
    	x = np.random.uniform(low=low, high=high, size=sample_size)
        fun_x = fun(x)
        int_val = int_len * np.mean(fun_x)
        stat.append(int_val)
    return np.mean(stat), np.std(stat)
def f_x(x):
    return np.exp(-x**2)

print(mc_int(f_x, low=-1, high=1, sample_size=10000, repeat=100))

```