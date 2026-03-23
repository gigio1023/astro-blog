---
title: "Naver Boostcamp AI Tech 2nd - Week 3 Report"
description: "Week 3 of Naver Boostcamp AI Tech covering PyTorch custom models, datasets, dataloaders, and data visualization."
date: "2021-08-20T08:16:21.329Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "naver-boost-camp-ai-tech-2nd-report-thrid-week"
draft: false
---

# Week 3 Report
## Lecture review
### pytorch (posts 1~11)
https://velog.io/@naem1023/series/pytorch
### data viz (posts 3~4)
https://velog.io/@naem1023/series/Data-Viz
## Assignment process / deliverables
### Custom model
The custom model assignment had verification code similar to unit tests (not quite assert, but close), which made it easy to check completion. For example, whether the result was tensor([1]) or tensor([1.0], dtype=float64).

The assignment was large so it took time, but progress was proportional to effort invested. Parts that were briefly mentioned in lectures were covered in detail through the assignments. That made organizing lecture content on velog easier.

It wasn't my first time working with PyTorch models, but dimension-related problems felt as daunting as learning a new language. Things like torch.gather or matching dimensions to get the right answer were like that.

### Custom dataset/dataloader
Unlike the previous assignment, the problem descriptions were vague in many places. There was a lot of content I hadn't dealt with before, and I spent a really long time. I think I spent 4 hours on the last NLP dataset problem alone.

I struggled a lot with torchtext's vocab and creating an encoding dictionary through vocab. It took way too long to generate, but it turned out vocab had dedicated methods for that. The vocab docs were so brief on vocab creation that I'd set the docs aside while working on the assignment. Should read docs more carefully going forward.


## Peer session summary
The algorithm study I ran to help during peer sessions was the main activity this week. Everyone was exhausted from completing mandatory assignments by Friday, so there was empty time for discussion on remaining days. Since everyone was reluctant about grad school, they were all supportive of the algorithm study.

We started from basics -- search and sorting algorithms. Others used C++ so they had no speed issues, but I used Python and had some problems that wouldn't pass even with pypy3.
Sorting problems were particularly bad -- I/O caused severe speed degradation. I solved it by searching, but I'm considering switching to C++ for Baekjoon problems.


## Study retrospective
21/08/17: Solved last week's optional ViT assignment, organized PyTorch methods, blog
21/08/18: Solved mandatory assignment 1, studied PyTorch methods, blog
21/08/19: Solved mandatory assignment 2, blog
21/08/20: Searched for MLOps info, blog
