---
title: "[Programmers] Lifeboat"
description: "Solution for the Programmers lifeboat problem using a greedy two-pointer approach."
date: "2021-10-22T03:45:53.478Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-lifeboat"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42885

# Solution

Read the constraints carefully. I wasted a lot of time by missing the condition that only 2 people can ride a boat at once.

When each boat holds at most 2 people, the most efficient strategy is to pair the heaviest person with the lightest. Sort the `people` array, then shrink indices from both ends.
As long as you properly handle the case where a heavy person rides alone, ascending or descending sort both work.

# Code
https://github.com/naem1023/codingTest/blob/master/greedy/pg-30-42885.py
```py
def solution(people, limit):
    cnt  = 0
    people.sort()

    start, end = 0, len(people) - 1

    while start <= end:
        cnt += 1
        if people[start] + people[end] <= limit:
            start += 1
        end -= 1

    return cnt
```
