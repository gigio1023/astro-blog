---
title: "Naver Boostcamp AI Tech 2nd - Week 2 Report"
description: "Week 2 of Naver Boostcamp AI Tech covering deep learning basics, data visualization, and sample variance with degrees of freedom."
date: "2021-08-13T11:33:19.047Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "naver-boost-camp-ai-tech-2nd-report-second-week"
draft: false
---

# Week 2 Report
## Lecture review
### DL Basic (posts 1~17)
https://velog.io/@naem1023/series/DL-Basic

### Data Viz (posts 1~2)
https://velog.io/@naem1023/series/Data-Viz

## Assignment process / deliverables
I should mention last week's optional assignment. A question came up in the peer session team about the difference between dividing by n vs n-1 for population variance vs sample variance. I definitely learned this in probability and statistics class in college, but...

It turned out to be about degrees of freedom.
https://brunch.co.kr/@zhoyp/174

The purpose of sample estimation is to estimate population parameters. In other words, sample variance is computed to estimate population variance. When n-1 data points of the sample have been observed, the last data point must be adjusted to match the population parameter.

In other words, sample variance loses one degree of freedom.

The same logic can be applied to compute degrees of freedom for other statistics. I've only seen cases where one degree of freedom is lost so far, so I'm not sure about the general case.

## Peer session summary
A team member proposed paper reviews. Even if we can't implement everything, we'd read papers together, share content, and review existing implementations. Before each review, we'd each just read the abstract. Otherwise, people might drop out apparently.

We decided to select papers from the following list and with the mentor's help:
https://www.notion.so/c3b3474d18ef4304b23ea360367a5137?v=5d763ad5773f44eb950f49de7d7671bd


## Study retrospective
It was a week of battling formulas. Counting parameters, using likelihoods from previous sections -- those were particularly difficult. Seems like the issue stems from lacking mathematical foundations despite being a CS major. Reading formulas themselves is fine, but applying them is where the difficulty lies.

Between the paper reviews planned for next week and preparing for transformer content, I need to do a lot of review.
