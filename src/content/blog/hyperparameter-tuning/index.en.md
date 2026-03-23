---
title: "Hyperparameter Tuning"
description: "Overview of hyperparameter tuning methods including grid search, random search, and Bayesian optimization, with an introduction to Ray for parallel tuning."
date: "2021-08-22T19:43:58.594Z"
tags: ["pytorch", "dl"]
lang: en
translationOf: "hyperparameter-tuning"
draft: false
---

# Hyperparameter Tuning

## Hyperparameter
Values that the developer has to set manually:
- learning rate
- size of model
- optimizer type
- epoch
- etc...

## Overview
- Among model, data, and hyperparameters, hyperparameter values are the least important.
  - The model matters most, but good models are usually well-known.
  - So data tends to be the priority.
  - Don't spend too much effort on hyperparameters.
- That said, if you're chasing the last 0.01 of performance, it's a must.
- Recently, AutoML-based NAS models can handle hyperparameter tuning automatically.
- Recipe: when the model itself prescribes how to tune its hyperparameters.

## Methods
- Grid: search at fixed intervals
- Random: search randomly
- Recently, Bayesian methods are also used (BOHB)

# Ray
- Multi-node, multi-processing module.
- Originally designed for ML/DL, but has become a general-purpose parallelization module for Python.
- During hyperparameter tuning, it prunes unpromising configurations early.
