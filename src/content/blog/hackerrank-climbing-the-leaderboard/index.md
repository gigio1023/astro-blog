---
title: "[HackerRank] Climbing the Leaderboard"
description: "."
date: "2021-11-18T08:48:12.142Z"
tags: ["algorithm"]
draft: false
---

https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem

# 풀이
ref: https://inspirit941.tistory.com/199
python list의 sort로 해결하려하니까 time limit에 결렸다. bs로 검색해도 마찬가지였다.

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

time limit 해결을 위해서 p를 찾을 때마다 검색을 시도하면 안됐다. player는 descending order이고 ranked는 ascending order인 점을 활용해서 검색하지 않아도 되는 영역을 지나쳐야 하는 것이 핵심이다.

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
plyaer와 ranked의 정렬순서 때문에 player의 앞쪽에 위치한 값들은 ranked의 뒤쪽에 나올 것이다. 따라서, player에 대한 iteration을 돌 때 ranked의 뒤쪽부터 체크한다. 또한 한번 지나친 queue의 index에 대해서는 다시 검색할 필요가 없어진다.
이 방법을 사용하면 ranked의 길이가 아무리 커져도 ranked를 한번만 순회하면 된다.

## 음수 index
idx가 음수가 되는 경우가 존재할 수 있다. 이러한 경우는 ranked의 모든 요소들에 대해서 순회했을 때 발생할 것이다. 따라서 p는 1등일 것이므로 result에 1을 append 해준다.


# 코드
https://github.com/naem1023/codingTest/blob/master/implementation/hackerrank-climbing-the-leaderboard.py