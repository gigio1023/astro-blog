---
title: "Naver Boostcamp AI Tech 2nd - Week 8 Report"
description: "Week 8 retrospective of Naver Boostcamp AI Tech covering NLP lectures, MLOps tooling research, and validation set distribution discussions."
date: "2021-09-24T09:24:46.070Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "naver-boost-camp-ai-tech-2nd-report-eighth-week"
draft: false
---

# Week 8 Report
## Lecture review
https://velog.io/@naem1023/NLP-%ED%97%B7%EA%B0%88%EB%A0%B8%EB%8D%98-%EC%A0%90%EB%93%A4
https://velog.io/@naem1023/Kaggle-tip
https://velog.io/@naem1023/AI-model-as-Service%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%96%A5-AI-%EB%AA%A8%EB%8D%B8
https://velog.io/@naem1023/MLOps-%EC%A0%95%EB%A6%AC


## Assignment process / deliverables
I researched MLOps-related topics in advance and tested things in preparation for the competition.

Github actions
- I expected to use Wandb action a lot, but it turned out to be just a CSV generator for summarizing results. Wandb itself is better, so I decided not to use it.


## Peer session summary
- We discussed whether always giving the validation set a uniform class distribution would make the model more robust.
  - My opinion and conclusion: no.
  - Model training is population estimation. Pre-predicting the population's properties to build the validation set can be risky for training, because the model will train to score well on that validation set, producing a model fitted to the validation set. There's also no guarantee that assumptions about the validation set always represent the population. **In other words, pre-determining the validation set distribution is an unnecessary act since we don't know if it helps with population estimation.**
  - I think the validation set's class distribution should match the train set. **Matching the class distribution between train and validation sets maintains consistency, avoids introducing unnecessary noise into training, and leaves room for other training methods to adjust imbalanced class distributions.** If the validation set and train set distributions differ, unnecessary noise would occur, destroying the reliability of training methodology results.
  - That said, manipulating the validation set itself isn't meaningless. More precisely, there are clearly cases where **dataset manipulation is necessary.**
  - For example, if the training data's class distribution is 99:1, there's a very high chance training won't work at all. In such cases, adjusting the dataset distribution to something more balanced than 99:1, then creating train and validation sets from that, would be appropriate.
  - **_Conclusion_**
    - **If the train and validation set distributions differ, noise occurs in the training process, destroying the reliability of training methods.** So conventionally it might not be precise validation, but for extreme datasets, dataset distribution manipulation seems necessary.

## Study retrospective

21/09/09: Attended 4 special lectures.
21/09/10: Attended 4 special lectures.
