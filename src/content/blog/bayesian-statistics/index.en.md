---
title: "Bayesian Statistics"
description: "Fundamentals of Bayesian statistics covering Bayes' theorem, conditional probability, posterior updating, and causality interpretation."
date: "2021-01-01"
tags: ["ml", "algorithm"]
lang: en
translationOf: "bayesian-statistics"
draft: false
---

A lot of this was covered in high school, but I'd forgotten quite a bit...

![](/assets/images/베이즈 통계학/2e826435-b849-4675-9750-62901080ee56-image.png)

The conditional probability above means the probability of event A occurring given that event B has occurred.

## Bayes' Theorem

![](/assets/images/베이즈 통계학/48b3e05e-ca66-454f-b912-df5f88f6ca68-image.png)

The formula above provides a way to compute conditional probability from P(B) when new information A is given.

---

## Bayes' Theorem Example
![](/assets/images/베이즈 통계학/159fb872-5842-4795-bbd3-d324de7a3a5d-image.png)

- D: Newly observed data
- Theta: Hypothesis, the event being modeled, the parameter to be computed
- Posterior distribution: The probability that Theta holds given D was observed. Called "posterior" because it comes after observing the data.
- Prior distribution: The probability of Theta before D is observed. A pre-assumed parameter or probability distribution.
- Numerator of Bayes' theorem: likelihood
- Denominator of Bayes' theorem: Evidence, the distribution of the data itself

## Bayes' Theorem Example (COVID-99)
COVID-99 has an incidence rate of 10%.
When actually infected with COVID-99, the detection probability is 99%.
When not actually infected with COVID-99, the false detection probability is 1%.
Given a positive test result, what is the probability of actually being infected with COVID-99?

![](/assets/images/베이즈 통계학/a8988dbd-8938-4d45-9e56-dbb42bf5ec43-image.png)

Define Theta as the COVID-99 infection event (not directly observable).
Define D as the test result.

Event probabilities for Theta and not-Theta can be defined as shown above.

---
![](/assets/images/베이즈 통계학/79dc6738-c032-4b09-8704-5a4cfcccdee5-image.png)

To compute the evidence using Bayes' theorem, we set up the formula as above. Multiply the likelihood by Theta's probability and sum.

## Visualizing Conditional Probability
![](/assets/images/베이즈 통계학/aea0848c-2f0e-4ad4-8cab-0a38ff933aed-image.png)

True Positive: **Recall.** The probability of actually being positive when classified as positive.
True Negative: The probability of actually being negative when classified as negative.
False Positive: **False alarm (Type I error).** The probability of not being positive when classified as positive.
False Negative: **(Type II error).** The probability of not being negative when classified as negative.

- Recall is determined by the prior probability P(Theta).
- Bayesian statistics can't be applied without a prior probability.
  - If the prior is unknown, it can be set arbitrarily, but credibility drops significantly.

![](/assets/images/베이즈 통계학/fc6f15c1-93de-43a9-aa73-6cbbedce00bc-image.png)

Precision is computed as shown above.

### Application of Conditional Probability
For example, consider a cancer detection problem.
In this case, **reducing Type II errors is critical.** A Type II error is when a cancer patient is classified as not having cancer.

So when balancing Type I and Type II errors, Type II errors require more attention.

## Updating Information Through Bayes' Theorem
![](/assets/images/베이즈 통계학/c38ae7c8-20b5-4be3-b86f-172fc8bb4cb1-image.png)

The posterior probability from the previous step can be used as the prior probability for the next step.

### Usage Example
![](/assets/images/베이즈 통계학/518f641f-896b-4bb3-a053-d983990542dd-image.png)

In COVID-99 testing, the first test's detection probability was 52.4%. Testing the same person a second time in succession raises it to 91.7%.

This is an example of using the posterior probability from the previous step (52.4%) as the prior probability for the next step.

## Interpreting Causality
Conditional probability alone shouldn't be carelessly used to fully explain causal relationships.

Moreover, no matter how much data accumulates, causal relationships can't be explained through conditional probability alone.

There may be cases where it can, but there's never a guarantee.
Causal relationships only emerge through very extensive data analysis.

### Robust Models Using Causality

Typical model results look like this:

- Conditional probability-based prediction model (99% accuracy)
  - Existing scenario (95% accuracy)
  - Changed scenario (72% accuracy)
- Causality-based prediction model (85% accuracy)
  - Existing scenario (83% accuracy)
  - Changed scenario (82% accuracy)

Models using only conditional probability typically guarantee high accuracy for expected scenarios. But when data distributions change significantly, accuracy drops sharply.

Models considering only causality don't guarantee high accuracy. But they're robust to changes.

# Causality
Used when building prediction models robust to changes in data distribution.
![](/assets/images/베이즈 통계학/17f2b608-6ff6-42c1-9a86-43ce1baa8081-image.png)

To understand causality, the confounding factor Z — which affects both T and R — must be removed.
If Z isn't removed, spurious correlation results.

## Causality Inference Example
![](/assets/images/베이즈 통계학/421972e1-499f-44d3-964c-c795a80a8920-image.png)

For example, consider analyzing kidney stone treatment results for treatments a and b.
Treatment a has a higher individual cure rate, but treatment b has a higher overall cure rate.
This is **Simpson's paradox**.

This can't be resolved through conditional probability alone. The confounding factor caused by kidney stone size must be removed to properly analyze the actual cure rate.

### Removing Z's Influence
The intervention do(T=a) removes Z's influence.
![](/assets/images/베이즈 통계학/faddb899-2c71-406b-aeee-766923a02ab7-image.png)
![](/assets/images/베이즈 통계학/7657d656-b448-49cc-8553-57f4d38a7fdf-image.png)
