---
title: "[Programmers] Disguise"
description: "Solution to the Programmers 'Disguise' hash problem using combinatorics to count clothing outfit combinations."
date: "2021-10-21T17:35:00.076Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-disguise"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42578

# Solution

This is a problem where you need to calculate the number of combinations for clothing types. Since the clothing type is stored in the second element of each item in the `clothes` list, I create keys based on those values.

```py
from collections import defaultdict
def solution(clothes):
    answer = defaultdict(int)

    for cloth in clothes:
        answer[cloth[1]] += 1
    cnt = 1
    for key in answer:
        cnt *= answer[key] + 1

    return cnt - 1
```

`answer` stores how many items exist per clothing type. When computing the combinations, I add 1 to each `answer[key]` because there's also the case of not wearing that type at all.

Since wearing nothing at all is one of the counted cases, subtracting 1 from `cnt` gives the number of valid outfits.

# Code
https://github.com/naem1023/codingTest/blob/master/hash/pg-30-42578.py
