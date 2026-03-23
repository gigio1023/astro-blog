---
title: "AutoML"
description: "Introduction to AutoML and hyperparameter optimization using Bayesian Optimization with Gaussian Process Regression."
tags: ["ml", "dl", "naver-boostcamp"]
date: "2021-11-28T14:04:07.541Z"
lang: en
translationOf: "automl"
draft: false
---

# Data Engineering
- Data Cleansing, Preprocessing
- Feature Engineering
- Select ML Algorithm
  - DL: Select Backbone Model
- Set Hyperparameters
  - DL: Loss, Optimizer, Learning rate, batch size

Model architecture and hyperparameter selection is typically done by humans, incorporating feedback from train/evaluate cycles. **AutoML's goal is to remove humans from this process and automate it.**

# Definition
![](/assets/images/AutoML/c709429f-c82a-46cc-aca3-172048a97b06-image.png)

This formalizes what was described when explaining AutoML's goal. Given hyperparameters, ML algorithms, and data, HPO (Hyperparameter Optimization = AutoML) aims to find the hyperparameter configuration that minimizes loss.

# A Different Angle on Lightweight Models
- Lightweight existing models
  - Pruning, Tensor decomposition
- Find lightweight models through searching
  - NAS (Neural Architecture Search), AutoML

AutoML is a technique for finding lightweight models.

# DL Model Configuration
## Type
- Categorical
  - Optimizer: Adam, SGD, AdamW ...
  - Module: Conv, BottleNeck, InvertedResidual
- Continuous
  - learning rate, regularizer param, ...
- Integer
  - Batch size, epochs

## Conditional Configuration
The search space changes depending on the configuration.
- The types and search space of optimizer parameters change depending on the optimizer.
- Module sample (Vanilla conv, BottleNeck, InvertedResidual) determines module-specific parameters and search space.

# AutoML Pipeline
![](/assets/images/AutoML/4e0effce-99dd-413c-b474-31e9f6f77669-image.png)

Similar to the HPO definition described earlier. The addition is the objective function $f$. The definition of $f$ can vary. You might only want to reduce model size, or only improve model performance, or some mix of objectives.

Blackbox optimization is performed to maximize these objectives and find a new configuration $\lambda$.

## Bayesian Optimization (BO)
![](/assets/images/AutoML/e6044436-2a99-4974-9cbf-d7d021e98a03-image.png)
This structures the blackbox optimization as shown above.
- Surrogate function: A regression model that predicts $f(\lambda)$. If it can predict accurately, it can better determine which $\lambda$ to try next.
- Acquisition function: Determines the next $\lambda$ to try.

![](/assets/images/AutoML/7466b990-ae50-47da-bf3a-61e8b29d4f07-image.png)

The process from the diagram, listed in order:
1. Sample $\lambda$ (x) (observation)
2. Train the DL model with that configuration
3. Compute the objective. This corresponds to the observation (x) in the diagram.
4. Update the surrogate model. Represented by the solid line and purple region in the diagram.
e.g., GP (Gaussian Process) model, posterior mean, posterior variance (uncertainty)
5. Update the acquisition function. Represented by the green region in the diagram. It looks at the surrogate model's trend and predicts the best next $\lambda$.

## BO with GPR
### Gaussian Process Regression
A method for modeling uncertainty.
In the BO graph, only two points of the surrogate model are known; everything else is uncertain. Using GP, we can obtain ranges for values beyond those two known points.

**Standard Regression Task**
Set of train data: $(X,Y)$
Set of test data: $(X_*,Y_*)$
$Y\approx f(X) + e$

**GP's Idea**
- Might the $Y_*$ value at a specific position be related to the already known $X, Y, X_*$?
  - Regardless of positive or negative relationship
- Let's express the estimation of $Y_*$ from $X, Y, X_*$ through a kernel function $K$.

**Informal Definition of GP**
- $f(x)$: Defined as a random variable for input x = distribution of possible functions for input x
  - Distribution of random variables: Multivariate Gaussian distribution

Expanding the definition of $f(x)$ in GP terms:
- Define a distribution of functions. Assume this distribution follows a Multivariate Gaussian distribution.
  - = function $f$ follows a Gaussian process.

![](/assets/images/AutoML/06004562-7d84-4f7c-b8bb-2f71f41f3bc9-image.png)

The formula above formalizes what was just explained.

Gaussian Identities apply here: the marginal and conditional of a Gaussian also follow a Gaussian.

![](/assets/images/AutoML/c288cc86-12a9-4728-aa33-dcb2f1c33baa-image.png)

This can be visualized as shown above. Viewing the original Gaussian from any conditional side, that conditional also follows a Gaussian.

![](/assets/images/AutoML/792192ff-9b10-499c-a8e3-50b981d75613-image.png)

What GP tells us is that given $X_*, X, f$, we can know the mean and distribution of $f_*$.

### Surrogate Model
Using the concepts organized above, let's look at the surrogate model in more detail.
- def: A model that predicts the objective $f(\lambda)$
  - Uses observed $f(\lambda)$ to predict the objective $f(\lambda_*)$ for a new $\lambda_*$
- Train the surrogate model and use it as a criterion for selecting the next good $\lambda$
- Representative surrogate models
  - GPR (Gaussian Process Regression) model
    - mean: predicted $f$ value, var: uncertainty
![](/assets/images/AutoML/4e494f00-3a4c-49a2-877e-03ace678afc9-image.png)

As observation data increases, uncertainty decreases and predictions fit the true function.

### Acquisition Function
- def: A function that uses the surrogate model's output to determine which $\lambda$ to try next
- The formula is constructed to appropriately balance exploration and exploitation. The balance between them is determined heuristically.
  - Exploration: Explore uncertain regions
  - Exploitation: Explore the known best regions
- The max point of the updated acquisition function is tried at the next iteration

![](/assets/images/AutoML/bace74cd-fdbc-458a-a980-88d6a422adb0-image.png)

The top graph is the surrogate model; the bottom graph is the acquisition function. The acquisition function values become very small at certain points and large near those values. From an exploitation perspective, already known points don't need exploring, and the vicinity of known values offers the best exploration points.
This is how the acquisition function is constructed.

e.g., Upper Confidence Bound (UCB)
![](/assets/images/AutoML/84760fe8-e4ee-4368-9342-30c9fead5d4c-image.png)
- $\mu$: posterior mean (= Exploitation)
- $\sigma$: posterior variance (= Exploration)
- $\kappa$: balancing parameter

## BO with TPE
GP's problems:
- Complexity: $O(N^3)$
- Difficult to apply when conditional, continuous/discrete parameters are mixed
The second issue causes the most difficulty in practice, and TPE is widely used nowadays.

TPE (Tree-structured Parzen Estimator) vs GPR difference:
- GPR: Computes $p(f|\lambda)$ (posterior distribution)
- TPE: Computes $p(\lambda|f)$ (likelihood), $p(\lambda)$ (prior)
