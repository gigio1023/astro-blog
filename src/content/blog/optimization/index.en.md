---
title: "Optimization"
description: "Deep learning optimization fundamentals: generalization, overfitting, cross-validation, bias-variance tradeoff, bootstrapping, bagging, and boosting."
date: "2021-08-10T01:35:15.676Z"
tags: ["dl"]
lang: en
translationOf: "optimization"
draft: false
---

![](/assets/images/Optimization/eb1d4749-f4b0-4545-a5a8-e2b72b35b6e4-image.png)

The BoostCamp instructor stressed the importance of knowing the terminology.

Yesterday (2021.08.09) while looking into the AAE from optional assignment 2, I was overwhelmed. It was faster to count the words I *knew* in a single sentence than the ones I didn't. Written in English, but it felt like alien language...

I think that's the downside of self-teaching and accumulating scattered knowledge through internships and graduation projects. Let me at least nail down the terms used in ML.

With that in mind, I've documented even the terms I already knew, as long as they were covered in class.


# Introduction
## Gradient Descent
undefined

First-order iterative optimization algorithm for finding a _**local minimum**_ of a differentiable function.

# Hyper Parameter
Parameter: weights, bias, convolution weights, etc. -- things that get updated during training.
Hyper parameter: learning rate, network size, loss function type, etc. -- things the developer sets manually.

# Generalization
![](/assets/images/Optimization/8103a09e-337e-491f-b114-41fb50a6509d-image.png)
Typically, test error increases as training goes on.
The performance gap between train and test is called the generalization gap.

Good generalization performance = the model's performance with training data is similar to its performance in general.

But good generalization performance doesn't guarantee the model performs well. Because a model that hasn't properly learned the training data could still have good generalization performance.

# Underfitting, Overfitting
![](/assets/images/Optimization/f4e80d54-ae70-4a91-ad57-13e820a06b90-image.png)
Overfitting: the model works well on training data but performs poorly in practice.
Underfitting: training didn't go well enough; the model hasn't even learned properly.

Of course, the figure above only illustrates the concept. The overfitting example might actually be the desired result in some cases. Judge based on problem definition, domain knowledge, and other factors.

# Cross-validation
K-fold validation.
![](/assets/images/Optimization/17d78872-bc7f-4489-9fef-4fbfd39ce8ad-image.png)
ref: https://blog.quantinsti.com/cross-validation-machine-learning-trading-models/

1. Split training data into k parts.
2. Use k-1 parts for training.
3. Use the remaining 1 part for validation.
---

There's usually no clue for hyper parameters! So cross validation is used to find the optimal hyper parameter combination.

Once optimal hyper parameters are found, fix them and train on all available training data.

Obviously, test data should never be used in training in any way. It's essentially cheating. And cheating doesn't even guarantee a good model.

# Bias, Variance
![](/assets/images/Optimization/16924af4-30e6-4ea1-b216-34fb72413392-image.png)
ref: https://work.caltech.edu/telecourse

Think of it like shot groupings on a target.
**Variance**
- How consistent the output is for a given input.
- Lower = more consistent.
- Higher = less consistent.

**Bias**
- How far the output is from the desired value.

## Bias and Variance Tradeoff
![](/assets/images/Optimization/c50f856f-580f-4562-b70d-ac7dc0d2137d-image.png)
Assume noise is present in the training data.
We can derive that what we are minimizing (cost) can be decomposed into three different parts: $$bias^2$$, $$variance$$, and $$noise$$.

The value I'm minimizing is a single number, but it consists of three components. And these three components have a trade-off relationship -- when something decreases, something else increases.

![](/assets/images/Optimization/f5938e91-b533-4b4b-ae4d-210b8257c844-image.png)

So cost can be decomposed into these three terms.
Bias and variance are typically said to have a trade-off.

# Bootstrapping
A term from statistics.
Bootstrapping is any test or metric that uses random sampling with replacement.

For example, randomly drawing 80 samples from 100 training data points to create multiple model configurations for comparison.

# Bagging, Boosting
**Bagging (Bootstrapping aggregating)**
- e.g., Use bootstrapping to subsample training data into multiple sets. Different models produce different outputs from each set, and you use these outputs (extract statistics, do ensemble learning, etc.)

This typically outperforms training a single model on the entire training set once for a single result.
A classic technique used in competitions like Kaggle.

**Boosting**
Say 80 data points classify well but the remaining 20 don't. Create a separate model for those 20. Call these models weak learners.

Chain these weak learners sequentially to build **one strong learner**. In boosting, the weights of weak learners are trained sequentially.

---

![](/assets/images/Optimization/cf306c62-c333-47c2-a8b5-fa543644371f-image.png)

# Practical Gradient Descent Method
- Stochastic gradient descent
  - Update parameters using one data point at a time.
- Mini-batch gradient descent
  - Update parameters using a subset of data at a time.
- Batch gradient descent
  - Use all data at once.

## Batch Size Matters
>
We .. present numerical evidence that supports the view that large batch methods tend to converge to _**sharp minimizers**_ of the training and testing functions.
In contrast, small-batch methods consistently converge to _**flat minimizers**_... this is due to the inherent noise in the gradient estimation.


The paper states that large batch methods yield sharp minimizers, while small-batch methods yield flat minimizers. The explanation follows the graph below.

![](/assets/images/Optimization/7fb85c2e-6ad7-47f1-a1f4-6b591a789586-image.png)
ref: https://arxiv.org/pdf/1609.04836.pdf (ON LARGE-BATCH TRAINING FOR DEEP LEARNING:
GENERALIZATION GAP AND SHARP MINIMA)


Flat minimum: even if test function and training function are far apart, learning still works to some extent. _**High generalization performance!**_
Sharp minimum: low generalization performance.

## Gradient Descent Methods
### (Stochastic) Gradient Descent
![](/assets/images/Optimization/ad76fb47-36fb-40e0-bf9b-48875a2b8b44-image.png)
The familiar basic gradient descent parameter update formula.

Problem: setting the learning rate is hard. Too small and training doesn't progress; too large and training doesn't work properly.

### Momentum
![](/assets/images/Optimization/4a286162-7a9a-405a-94eb-0a9a13a41fac-image.png)

Parameters are updated while maintaining momentum (inertia).
beta (momentum) is a hyper parameter. A new accumulation is computed from beta, the gradient, and the previous step's accumulation.
This retains some information from the previous step instead of discarding everything like SGD, while updating W.

### Nesterov Accelerated Gradient (NAG)
![](/assets/images/Optimization/89fade6f-4c7b-495e-b249-28259512df4d-image.png)

The overall formula structure is the same as momentum. The difference is that it pre-computes the gradient at the next step and uses this lookahead gradient to update the accumulation.

![](/assets/images/Optimization/6c02f42a-d117-412d-bbcb-d288e3560adb-image.png)

ref: https://golden.com/wiki/Nesterov_momentum

The difference between momentum and Nesterov momentum is illustrated above. Intuitively, momentum might not converge to the convergence point directly, swinging back and forth like a pendulum.

Nesterov uses the next step's gradient, which has the effect of moving in only one direction. So NAG typically converges faster.

### Adagrad
![](/assets/images/Optimization/4257e2a2-df6a-483b-a1f0-49551601497f-image.png)

Reflects how much each parameter has changed so far in the update.
$$G_t$$ is the sum of gradient squares. If a parameter has changed a lot, $$G_t$$ is large, so the parameter changes less. If a parameter has changed little, $$G_t$$ is small, so the parameter changes more.

$$\epsilon$$ is there to prevent zero division.

Problem:
$$G_t$$ can grow indefinitely. If the denominator approaches infinity, the term converges to 0. The parameter stops updating.


### Adadelta
![](/assets/images/Optimization/f751a440-d120-440c-a6ab-de5e67be655a-image.png)

Looks at gradient changes only within a window of a given size.

The problem is that $$g_t$$ must have as many parameters as the model. Since each model parameter has its own gradient, a model like GPT-3 with 100 billion parameters would need $$g_t$$ to store gradient info for 100 billion parameters across the window size.

This is solved using exponential moving average (EMA). Seems like that's what the $$\gamma$$ in the formula does...

_**No learning rate!**_
= No room to adjust hyper parameters. So it's not practically useful.


### RMSprop
Not published as a paper. Geoff Hinton revealed it during a lecture. Papers that use RMSprop actually cite Geoff Hinton's lecture link.

![](/assets/images/Optimization/57e8d39b-5fe2-4175-966b-ad329e4b5863-image.png)

### Adam (Adaptive Moment Estimation)
Combines past gradients (momentum) and squared gradients (Adagrad, RMSprop...).
That is, it mixes momentum information with adaptive learning rate methods.
![](/assets/images/Optimization/b1919bc5-0605-4143-9766-9b7fb568fc5f-image.png)

Tuning the 4 hyper parameters is also very important.
- $$\epsilon$$: a very small value
- $$\beta_1$$: momentum
- $$\beta_2$$: gradient squares
- $$\eta$$: learning rate

# Regularization
The goal is to regularize and impede training so the model works well not just on training data but also on test data.

## Early Stopping
![](/assets/images/Optimization/40d7d36e-b662-4271-99b8-e08ddbb8717f-image.png)
Using validation data (not test data), determine the right point to stop.

## Parameter Norm Penalty
Preventing parameters from growing too large.
![](/assets/images/Optimization/77786af1-ff49-457e-b5da-5c96dfcad47f-image.png)

Train in the direction that minimizes total cost.

The instructor said something about making functions smoother within the function space (?). I didn't quite get it...

Parameter norm penalty is also called weight decay.

## Data Augmentation
![](/assets/images/Optimization/db61a2e2-a892-45e0-aafb-47966822162f-image.png)
Unlike traditional ML, DL and NNs benefit from more data. So generate as much data as possible.

![](/assets/images/Optimization/fb429d9f-2c90-4788-b5c1-b59d0b9fa551-image.png)

Increase data by varying image size, rotation, cropping, etc. Labels must stay fixed though.

## Noise Robustness
Adding noise to input data and weights during training improves performance at test time.
Not fully proven, but experimentally demonstrated.
![](/assets/images/Optimization/3b107bac-9e6b-47ac-b6b4-f2e14cf846df-image.png)

## Label Smoothing
During training, extract two training data points, mix them, and create new training data.
Said to have the effect of smoothing the decision boundary.

_**A method that can improve model performance significantly!**_

![](/assets/images/Optimization/3cda6bbf-463c-4b3c-b07f-6fb7a9f87f56-image.png)

ref: https://arxiv.org/pdf/1905.04899.pdf (CutMix: Regularization Strategy to Train Strong Classifiers
with Localizable Features)

Mixup: mix two images and their labels.
Cutout: remove a portion of an image.
CutMix: unlike Mixup, cut and paste.

## Dropout
Randomly set some neurons to 0.
![](/assets/images/Optimization/24be1ed4-61c5-4cc7-8dd5-253b56c5398e-image.png)
Interpreted as neurons acquiring more robust features. This is also unproven.

## Batch Normalization
![](/assets/images/Optimization/8517c386-b451-4779-af90-2171c3e89dce-image.png)

Normalize weights per layer using the mean and variance of the weights. As shown in the formula, subtract the mean and divide by the variance to get new weights.

The paper interpreted this as reducing internal covariate shift, which improves performance, but there are several rebuttal papers...

What's certain is that using BN significantly improves performance as the network gets deeper.

---

![](/assets/images/Optimization/5124757b-893f-4e43-868d-d0189b23ecb6-image.png)

There are methods similar to BN. Use them as appropriate.