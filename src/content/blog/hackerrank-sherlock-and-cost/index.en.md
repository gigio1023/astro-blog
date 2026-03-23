---
title: "[HackerRank] Sherlock and Cost"
description: "Dynamic programming solution for the HackerRank Sherlock and Cost problem, maximizing the sum of absolute differences in a sequence."
date: "2021-11-19T09:34:40.268Z"
tags: ["algorithm"]
lang: en
translationOf: "hackerrank-sherlock-and-cost"
draft: false
---

https://www.hackerrank.com/challenges/sherlock-and-cost/problem

# Solution
ref: [Blog](http://mrkimkim.com/study/coding_interview/%EC%BD%94%EB%94%A9-%EC%9D%B8%ED%84%B0%EB%B7%B0hackerrank-sherlock-and-cost/)

![](/assets/images/[HackerRank] Sherlock and Cost/49a6baec-e8f0-4f53-b8a1-7318512ddec5-image.png)

We need to find $$A$$ that maximizes the formula above. To maximize the differences, A[i] should be either B[i] or 1, since $1 <= A[i] <= B[i]$.

You could brute-force all possibilities for A[i] using BFS or DFS, but with $n = 10^5$ that hits the time limit. Dynamic programming is used to continuously update S[i] and find the maximum S[i].

The cost function returns the largest element of S.

## Updating S
A[i] can take one of two values:
- 1
- B[i]

The same goes for A[i - 1].

Generalizing S[i]:
$S[i] = S[i - 1] + A[i]$

Since A[i] has 2 choices and A[i - 1] also has 2 choices, for a fixed A[i] there are 2 possible values of S[i].
The cases for S[i] are:

- $A[i] = 1$, $S[i][0]$
  - $A[i - 1] = 1, S[i - 1][0] + (1 - 1)$
  - $A[i - 1] = B[i - 1], S[i - 1][1] + abs(B[i - 1] - 1)$
- $A[i] = B[i]$, $S[i][1]$
  - $A[i - 1] = 1, S[i - 1][0] + abs(B[i] - 1)$
  - $A[i - 1] = B[i - 1], S[i - 1][1] + abs(B[i] - B[i - 1])$

With this recurrence, S[i] accumulates prior information sequentially to produce the updated S[i].

# Code
https://github.com/naem1023/codingTest/blob/master/dp/hackerrank-sherlock-and-cost.py
