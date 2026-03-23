---
title: "Statistics"
description: "Foundations of statistical modeling: parametric vs. nonparametric methods, probability distributions, MLE, and log-likelihood."
date: "2021-01-01"
tags: ["ml"]
draft: false
lang: en
translationOf: "statistics"
---

# Statistics
## Parameters
Statistical modeling = estimating probability distributions through appropriate assumptions. This is a goal shared by both machine learning and statistics.

It's impossible to predict the exact distribution of a population from finite observations.
=> We approximate the probability distribution instead.

### Parametric methods
1. Assume a priori that the data follows a specific probability distribution.
2. Estimate the parameters that determine that distribution.

### Nonparametric methods
1. Don't assume a probability distribution in advance.
2. Let the model structure and number of parameters adapt to the data.

Typically used when parameters are infinite or need to keep changing.

**It's a misconception that nonparametric methods don't use parameters at all.**

## How to assume a probability distribution
Refer to the table below, but don't pick distributions mechanically — consider the underlying process that generates the data.
- Data takes only 2 values (0, 1) => Bernoulli distribution
- Data takes n discrete values => Categorical distribution
- Data falls in [0, 1] => Beta distribution
- Data is non-negative => Gamma distribution, Log-normal distribution, etc.
- Data spans all of R => Normal distribution, Laplace distribution, etc.

## Parameter estimation
Once a probability distribution is assumed, you can estimate its parameters.

For example, the parameters of a normal distribution are the mean and variance. The statistics used to estimate them are:

![](/assets/images/통계론/c7691f85-fd47-4ec2-b765-d5241993fab6-image.png)

Ideally, the sample mean matches the population mean.

I learned in college why we divide by N-1 when computing variance, but I've forgotten. I need to look it up later.

In the bootcamp lecture, they just said it's to obtain an unbiased estimator and moved on.

### Sampling distribution
Sampling distribution = the probability distribution of statistics (sample mean, sample variance).
Sample distribution = the distribution of the population.

_**The sampling distribution and the sample distribution are different.**_

#### Central limit theorem
The sampling distribution of the sample mean approaches a normal distribution as N (number of data points) increases.

This holds even if the population distribution is not normal.
![](/assets/images/통계론/60b093bc-ca0a-410e-8b3a-75309b47966d-image.png)

The population in the figure above follows a Bernoulli (binomial) distribution. No matter how much data you collect from the population, it won't be normal.

But the probability distribution of the population's statistics converges toward a normal distribution as N grows, with variance approaching 0.

## Maximum Likelihood Estimation (MLE)
MLE (Maximum Likelihood Estimation)

A method for estimating the most theoretically likely parameters.

### Likelihood function
Likelihood function = L(Theta; x)
It has the same formula as the probability mass/density function, but from a different perspective.

Probability density function = a function of x given fixed parameter Theta.
_**Likelihood function = a function of parameter Theta given fixed variable x.**_

In other words, the likelihood function varies with respect to parameter Theta when the variable is already given.

It represents the likelihood of observing data x under a distribution governed by parameter Theta.

It's not a probability that integrates or sums to 1 over the entire range. It's just a comparable measure of observational plausibility.

### Log-likelihood
When the dataset X is independently drawn, the likelihood function can be defined as:
![](/assets/images/통계론/51c49d13-e401-466a-97ee-06b93593650e-image.png)
By taking the log of this product-based likelihood, we convert it into a sum. _**This is the log-likelihood, and it's what we typically optimize.**_

#### Why use log-likelihood
- Computational feasibility
  - With very large datasets, defining likelihood as a product can exceed computer precision limits.
  - Log-likelihood turns it into a sum, making computation feasible and precise.
- Algorithmic efficiency of differentiation in gradient descent
  - Product-based likelihood has O(n^2) computational cost for differentiation.
  - Sum-based log-likelihood has O(n) cost.

When using gradient descent, we use negative log-likelihood.

### MLE example: Normal distribution
Suppose we have independent samples {x1, ..., xn} from a normally distributed random variable X.

![](/assets/images/통계론/ad7c2cca-a390-4187-8537-37d09f633b33-image.png)

Goal: find Theta that optimizes the likelihood function.

Since the data follows a normal distribution, let Theta = (mean(mu), variance(sigma^2)).

![](/assets/images/통계론/364070b0-8b0b-4e42-8b2f-6fded6f3a89d-image.png)

Taking the log of the likelihood function decomposes the product of normal distribution expressions into a sum.

Differentiating with respect to mean and variance respectively:

![](/assets/images/통계론/a86f397b-f313-4aa8-94bc-17d926227df9-image.png)

Finding mu and sigma that make both derivatives zero maximizes the likelihood. The MLE expressions satisfying this are:

![](/assets/images/통계론/e8410d10-8a5e-4111-b61b-cb9dc8ce5e77-image.png)

MLE doesn't guarantee an unbiased estimator, so we just divide by n.

### MLE example: Categorical distribution

Suppose we have independent samples {x1, ..., xn} from a categorical distribution Multinoulli(x; p1, ..., pd).

This is similar to one-hot encoding: xn is a d-dimensional vector where one value is 1 and the rest are 0.

Let's estimate the parameters (p1, ..., pd) of the categorical distribution.

### Parameters of the categorical distribution
Normal distribution parameters are statistics like mean and variance.

Categorical distribution parameters represent probabilities. (p1, ..., pd) holds the probability of each dimension being 0 or 1. Therefore p1 through pd sum to 1.

#### Definition
![](/assets/images/통계론/adc74803-fcda-43b4-b5e4-dd74bc73952c-image.png)

This expression says: take the k-th dimension value of the i-th x and use it as an exponent for the k-th parameter p. This is used in the categorical distribution MLE as follows:

![](/assets/images/통계론/831ea41d-16e0-4651-98a3-b472d22e19b4-image.png)

As mentioned when defining categorical distribution parameters, all parameters pk sum to 1.

---
![](/assets/images/통계론/de828058-4e7a-4b7b-9865-b2fc538234d0-image.png)

The contents that were exponents of pk come in front thanks to the log.
This is abbreviated as nk.

nk is simply counting the number of data points xi where the k-th dimension value is 1.

---

![](/assets/images/통계론/d2905cc3-a719-401c-8c8d-d3cf9b86b71c-image.png)

Since there's a constraint, we use Lagrange multipliers to optimize the objective.

---

Differentiating with respect to pk and lambda:
![](/assets/images/통계론/6a5227a1-8245-4a8b-bfa0-71dc2a5847cc-image.png)

Both differentiated expressions must equal 0.
That is, both expressions can be consolidated into a single expression in terms of pk.

### MLE in deep learning

Let's define weights Theta in a neural network as follows:
![](/assets/images/통계론/bfa0dd4a-573b-446b-b619-ba4e49659fb9-image.png)
The softmax vector models the parameters (p1, ..., pk) of a categorical distribution. In a previous post, I mentioned that softmax at the NN output implements conditional probability — those probabilities are used as categorical distribution parameters.

Using the one-hot encoded ground-truth label y = (y1, ..., yk) as observed data, we can optimize the log-likelihood of the softmax probability distribution.

That is, we can train Theta in the direction that optimizes the following log-likelihood:

![](/assets/images/통계론/3efbf54d-36c8-422c-a3d1-89eb0d3d32c1-image.png)

## Distance between probability distributions
Loss functions used in machine learning are derived from the distance between the probability distribution learned by the model and the one observed from data.

The functions used for this include:
- Total Variation distance (TV)
- Kullback-Leibler divergence (KL)
- Wasserstein Distance

### Kullback-Leibler divergence
![](/assets/images/통계론/9a9b60e6-4e63-435a-88c5-777071e5e701-image.png)

KL divergence can be decomposed as follows:
![](/assets/images/통계론/34ae27ad-f127-476c-8fdc-974087d38799-image.png)

In classification:
- P: ground truth labels
- Q: model predictions

MLE in classification is equivalent to minimizing KL divergence.
