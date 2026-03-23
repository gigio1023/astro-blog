---
title: "Boostcamp AI Tech 2nd - Week 6 Study Summary"
description: "Week 6 study summary of Naver Boostcamp AI Tech covering NLP lectures, bucketing for data batching, and peer session discussions."
date: "2021-09-10T10:21:43.642Z"
tags: ["naver-boostcamp"]
draft: false
lang: en
translationOf: "boostcamp-ai-tech-2nd-week6-study-summary"
---

# Week 6 Study Summary
## Lecture Review
### NLP (Posts 1-9)
https://velog.io/@naem1023/series/NLP

## Assignment Process / Results
### bucketing
![](/assets/images/부스트캠프 AI Tech 2기 6주차 학습정리/89d8a5d1-3a51-4a52-8c89-fd8cfa8a7fcb-image.png)
A technique that reorganizes batches based on the length of data.
It came up in Assignment 4. The concept itself was easy to understand, but the code was very hard to follow.

I resolved it during the peer session. What the code was trying to do:

- View data lengths in units of max_pad_len.
  - For example, set max_pad_len=5 and use the quotient. Then data with lengths 5-9 should be reorganized into a single batch.
- Instead of moving data around to reorganize, store data indices separately and reorganize batches by index.
- Reorganize batches by index so that data with similar lengths are placed adjacently in the list.
  - e.g., data with lengths 5-9 are positioned adjacently in the list.
- Once the above process is done, simply reading the index list in order gives you the reorganized batches.

This is what the bucketing code in Assignment 4 contained.


## Peer Session Summary
We had extensive discussions about the bucketing problem mentioned above.

We also shared experiences about team formation. Unlike CV, everyone in NLP was very enthusiastic about team formation, so the recruiting process was very fast.


## Study Retrospective
21/09/06: Studied Word2Vec, solved Assignment 1
21/09/07: Studied RNN, LSTM, solved Assignments 2, 3
21/09/08: Studied attention, solved Assignment 4
21/09/09: Spent a lot of energy on team formation...
21/09/10: Reviewed Assignment 4
