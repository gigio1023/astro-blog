---
title: "[Programmers] Stepping Stones"
description: "Solution for the Programmers stepping stones problem using binary search on minimum distance."
date: "2021-10-22T17:34:24.867Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-stepping-stones"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43236?language=python3


# overview
Understanding the problem itself was hard. The available actions and decisions are:

- Remove n rocks from the rocks array
- Find the minimum distance between remaining rocks
  - Find the maximum among those minimums

Computing all possibilities by brute force isn't feasible since distance can be up to 1,000,000,000. When brute force won't work, we can try binary search or BFS/DFS pruning. BFS/DFS doesn't seem applicable here, so let's try binary search with the minimum distance or n as the flag.

# Solution
ref1: https://taesan94.tistory.com/154
ref2: https://deok2kim.tistory.com/122

There are various approaches. The point is to set either the minimum distance or n as `mid`, then count n while calculating distances between rocks.
ref2 and my approach set n as mid. ref1 sets the minimum distance as mid.

```py
def solution(distance, rocks, n):
    answer = 0
    rocks.sort()

    # binary search target = minimum distance between rocks
    left, right = 0, distance

    while left <= right:
        removeRockCnt = 0
        mid = int((left + right) / 2)
        minDistance = float('inf')

        # track which rock we're currently on
        current = 0

        for rock in rocks:
            diff = rock - current
            # instead of actually modifying the rocks array,
            # we change current to simulate selecting rocks to remove
            if diff < mid:
                # skip without saving current, effectively "removing" the rock
                removeRockCnt += 1
            else:
                current = rock
                # this rock isn't removed, so compute minimum distance
                minDistance = min(minDistance, diff)

        # if we removed more than n, we need to remove fewer
        # i.e., the minimum distance between rocks should be smaller, so decrease right
        if removeRockCnt > n:
            right = mid - 1
        # if we removed n or fewer, save the answer for now
        # both cases might contain the problem's answer
        else:
            answer = minDistance
            # we removed n or fewer rocks,
            # so increase the minimum distance to remove more rocks
            left = mid + 1

    return answer
```
https://github.com/naem1023/codingTest/blob/master/bs/pg-30-43236.py
