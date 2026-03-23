---
title: "[Programmers] H-Index"
description: "Solution for the Programmers H-Index problem using sorting and linear scan."
date: "2021-10-22T02:44:44.279Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-h-index"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42747

# Solution
The tricky part was figuring out how to translate the problem statement into code.

It's an implementation problem: just code up "h papers are cited at least h times, and the remaining papers are cited no more than h times." Start by sorting `citations` in ascending order.

Rephrasing the problem in code-friendly terms:
>
Find the maximum h such that, at the h-th element of citations, citations[h] has been cited enough times that there are at least h elements from index h+1 onward.

Let `length` be the length of `citations`. If `citations` is sorted in ascending order, then `citations[i]` just needs to be greater than or equal to `length - i`. In that case, `length - i` becomes the maximum h.

This works because, with sorting, if the i-th value is >= `length - i`, then all values from i+1 to length-1 are also >= `length - i`. So we just iterate from i = 0 and check.


# Code
```py
def solution(citations):
    answer = 0
    citations.sort()

    length = len(citations)

    for i in range(length):
        if citations[i]  >= length - i:
            return length - i


    return answer
```
https://github.com/naem1023/codingTest/blob/master/sort/pg-30-42747.py
