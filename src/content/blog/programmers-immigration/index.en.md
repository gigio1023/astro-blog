---
title: "[Programmers] Immigration"
description: "Solution for the Programmers immigration problem using binary search on time cost."
date: "2021-10-20T02:11:09.313Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-immigration"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43238

# Solution
Approaching this as a pure implementation problem doesn't work because n is too large. The problem asks for the minimum time cost, so the key insight is defining how many people can be processed given a certain time cost.

Set the time cost to an arbitrary integer. During that time, all inspectors work. Dividing the time cost by each element in the `times` array tells us how many people each inspector can process within that time.

Once we can determine how many people the inspectors can handle at a given time cost, we can judge whether that time cost is too high or too low. For example, "given 60 minutes, the inspectors' processing speed was enough to handle more people than needed." Or we might find they could only handle fewer.

Since n is very large, we can't find the right time cost by brute force -- binary search is needed. Where a typical binary search uses left/right as array indices, here we search over the minimum and maximum possible time costs.

![](/assets/images/[프로그래머스] 입국심사/71dd7b37-9f4b-48a0-9885-01d4d8500b3c-image.png)

In the binary search, the `mid` variable represents the time cost itself. It changes depending on how many people are processed at that time cost. If more people were processed than needed, mid should decrease -- since we're looking for the minimum time. If fewer people were processed, mid needs to increase to meet the requirement.

# Code
https://github.com/naem1023/codingTest/blob/master/bs/pg-30-43238.py
