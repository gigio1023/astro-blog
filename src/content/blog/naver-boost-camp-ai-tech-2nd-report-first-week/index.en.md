---
title: "Naver Boostcamp AI Tech 2nd - Week 1 Report"
description: "Week 1 retrospective of Naver Boostcamp AI Tech covering AI math fundamentals, Python basics, and gradient descent implementation."
date: "2021-08-06T05:37:46.336Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "naver-boost-camp-ai-tech-2nd-report-first-week"
draft: false
---

# Week 1 Report
## Lecture review
### ai math (posts 1~11)
https://velog.io/@naem1023/series/ai-math

### python (posts 1~2)
https://velog.io/@naem1023/series/python

## Assignment process / deliverables
Optional assignment 1 was the key challenge. Implementing gradient descent through vector operations was manageable since it was covered in class.
But I unexpectedly got stuck implementing gradient descent for a linear function like y = mx + c according to the example.

https://towardsdatascience.com/linear-regression-using-gradient-descent-97a6c8700931

I had previously studied and organized gradient descent in Notion, but I keep forgetting, so I referenced the link above. I'll probably need to reference it again in the future.

The key point, as the link describes, is to define the loss function and use its derivatives with respect to m and c as the gradient vector.

![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/9b9e6416-22d6-4f53-aa73-f908b373f364-image.png)
![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/ee96d9af-354c-4004-b2c7-8fb64d8f879a-image.png)
After differentiating the loss function with respect to m and c separately, m and c are updated via the familiar formula below.
![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/d1271fde-207e-4577-9dc4-e5503f64c58e-image.png)

I solved it by directly translating this process into code using numpy.

## Peer session summary
Professor Im Sung-bin organized the content that was frequently discussed during peer sessions really well.
Since these were topics where we struggled due to ambiguity or lack of information, I'll summarize them in the peer session section.

https://naem1023.notion.site/4b3c83b157ca43a8b6d1ef706084a1fb

I organized this via Notion.

## Study retrospective
https://naem1023.notion.site/ML-68740e6ac0db42e9a01b17c9ab093606
The first week revisited content I had gradually organized in the link above throughout my university years. Still, everything felt new.
I took that as a sign that even my fundamentals weren't solid enough.

I hope the study content I organize on velog will accumulate well.
