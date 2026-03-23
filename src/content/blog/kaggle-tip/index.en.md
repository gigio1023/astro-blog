---
title: "Kaggle Tips"
description: "Practical tips for Kaggle competitions covering ranking systems, competition types, validation strategies, ensemble methods, and hardware recommendations."
date: "2021-09-23T06:35:03.433Z"
tags: ["naver-boostcamp", "ai-competition"]
lang: en
translationOf: "kaggle-tip"
draft: false
---

# Competition Platforms
- Kaggle
- Kakao Arena: reportedly limited to their subsidiaries.
- Dacon: public competitions. Gradually adopting Kaggle-style practices.

# Ranking
- Ranking system: rankings determined by competition points
  - If you compete as a team, points are divided by $\sqrt{N}$.
- Tier system: determined by competition medal count

# Competition
## Purpose
- Featured
  - Commercial competitions
  - Winning models sometimes get used by companies.
- Research
  - Research-oriented competitions
  - Fun topics but lower prize money, apparently.
- Getting Started & Playground
  - Beginner competitions like Titanic survivor prediction
  - Not for points or medals
- Analytics
  - Data analysis competitions
  - Submit data exploration and visualization notebooks
- Recruitment
  - Hiring purpose

## Submission
- General competition
  - No resource constraints
  - Just submit submission.csv
- Code competition
  - Must run a Kaggle notebook to generate submission.csv
  - Resource limits apply
  - Designed to encourage building practical models

# Processing Competition
![](/assets/images/Kaggle tip/a6770f33-28bd-4a3e-a95a-30f9e76912e4-image.png)

A familiar-looking workflow diagram. The differences:
- Uses Kaggle notebooks
- Can browse other people's Kaggle notebooks
  - Each notebook serves a different purpose: e.g., train, inference, preprocessing...

# For Winning
## Fast and Efficient Pipeline Iteration
  - Invest in GPU hardware
    - A Korean Kaggle grandmaster uses Ryzen 3700, 64GB RAM, and 2x RTX 2080 Ti.
    - With 2+ GPUs, they recommended blower-type GPU coolers.
    - I expected researchers would need multi-GPU setups, but surprisingly a single RTX 3090 or 3080 works well too. Though 2x 3090 is better.
    - Still grateful to CDPR's Poland for letting me buy an RTX 3070 for 720,000 won.
  - Invest your own time
    - They reportedly spend 4+ hours per weekday and 8+ hours per weekend day over 1-2 months.
  - Your own baseline that works like a template
    - Speeds up development and reduces mistakes.
    - They won 3 gold medals in 3 months using [this setup](https://github.com/lime-robot/categories-prediction).

## Score Improvement
- Look for good ideas in the Notebook tab and Discussion within the competition.
  - Augmentation, deep learning architecture
  - Relevant papers
- They strongly emphasized not letting your guard down until the very end.

## Validation Strategy
A methodology to narrow the gap between training set and test set scores.

Essential for preventing final ranking drops. Public LB (Leaderboard) and Private LB differ, so avoid overfitting to the Public LB.

- Recently, the trend is to not reveal the test set.
- Extract validation set from training set
  - K-fold validation
  - Stratified k-fold
    - Generate validation sets per class

## Ensemble
In most cases, ensembles outperform single models. Recent Kaggle trends:
Ensembling different architectures tends to work better. e.g., LSTM + BERT

- Stratified k-fold ensemble
  - Don't just use for validation checking -- ensemble those models
- Tabular data
  - LightGBM, CatBoost, XGBoost, NNs
- Image data
  - ResNet, EfficientNet, ResNeXt
- Text data
  - LSTM, BERT, GPT-2, RoBERTa

## Single Model Improvement
You can't ensemble from the start. You need to improve single models to some extent first, then attempt ensembling. Setting a threshold for when to stop is important:

- Single model scores mentioned by top rankers in discussion
- Being within top 50 with a single model 1-2 weeks before competition end

# Miscellaneous Tips
- Teams are better. Solo for 2+ months is too long.
- Teams can't be disbanded, so choose carefully.
- Check potential teammates' current competition rankings. Apparently some people are surprisingly lazy.
- Version management in folders like v1, v2.
  - This is done to keep the option open for ensembling across folder-organized versions.
  - They reportedly only use VCS for final uploads. No version control at all otherwise. Interesting approach.
