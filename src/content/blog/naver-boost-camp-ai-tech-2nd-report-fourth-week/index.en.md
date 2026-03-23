---
title: "Naver Boostcamp AI Tech 2nd - Week 4 Report"
description: "Week 4 retrospective of Naver Boostcamp AI Tech covering image classification competition, CNN model comparisons, and CutMix augmentation."
date: "2021-08-27T08:55:22.918Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "naver-boost-camp-ai-tech-2nd-report-fourth-week"
draft: false
---

# Week 4 Report
## Lecture review
### ai competition (posts 1~6)
https://velog.io/@naem1023/series/Ai-competition

## Assignment process / deliverables

Training plan: https://velog.io/@naem1023/TIL-train-%EA%B3%84%ED%9A%8D-%EC%A0%95%EB%A6%AC-2021.08.24


Assignment process notes: https://velog.io/@naem1023/TIL-%EC%BD%94%EB%94%A9-%EC%A0%95%EB%A6%AC-2021.08.2527


## Peer session summary
Since there was a competition, we shared methods for training. For example, how to set hyperparameters. Whether using a particular model even makes sense.

The internal conclusion was that the choice of CNN model didn't make much difference. Whether mobilenet, resnet, or efficientnet, there were meaningful differences below the decimal point, but nothing decisive.

We agreed that trying various approaches is better. We'd learned a lot, and we needed to actually apply what we'd learned.


## Study retrospective
21/08/23: Experimented with various methods via jupyter notebook and submitted to the competition
21/08/24: Converted notebook experiments into a pipeline and structured the project
21/08/25: Tried efficientnet-b7, VOLO, BiT, CaiT
21/08/26: Simple testing with efficientnet-b4, resnet18 while improving the project
21/08/27: Implemented CutMix
