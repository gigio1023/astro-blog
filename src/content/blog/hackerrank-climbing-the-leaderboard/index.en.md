---
title: "[HackerRank] Climbing the Leaderboard"
description: "Solving HackerRank's Climbing the Leaderboard problem efficiently using sorted traversal instead of repeated search."
date: "2021-11-18T08:48:12.142Z"
tags: ["algorithm"]
lang: en
translationOf: "hackerrank-climbing-the-leaderboard"
draft: false
---

https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem

# Solution
ref: https://inspirit941.tistory.com/199
Trying to solve it with Python list sort hit the time limit. Binary search didn't help either.

```py

def climbingLeaderboard(ranked, player):
    # Write your code here
    result = []
    from collections import defaultdict
    rank_dict = defaultdict(int)
    for r in ranked:
        rank_dict[r] += 1

    for p in player:
        score = list(rank_dict.keys())
        score.append(p)
        score.sort(reverse=True)
        for idx, s in enumerate(score):
            if s == p:
                break
        result.append(idx + 1)

    return result
```

To fix the time limit, you can't search from scratch for every p. The key insight is that player is in ascending order and ranked is in descending order, so you can skip regions that don't need searching.

```py
def climbingLeaderboard(ranked, player):
    queue = sorted(set(ranked), reverse=True)

    idx = len(queue) - 1
    result = []

    for p in player:
        while queue[idx] <= p and idx >= 0:
            idx -= 1
        if idx < 0:
            result.append(1)
            continue
        result.append(idx + 2)
    return result
```
Because of the sort orders of player and ranked, earlier values in player correspond to later positions in ranked. So when iterating over player, we check ranked from the end. Once an index in the queue has been passed, there's no need to revisit it.
This way, no matter how large ranked is, we only traverse it once.

## Negative Index
idx can become negative. This happens when all elements of ranked have been traversed. In that case, p is in 1st place, so we append 1 to the result.

# Code
https://github.com/naem1023/codingTest/blob/master/implementation/hackerrank-climbing-the-leaderboard.py
