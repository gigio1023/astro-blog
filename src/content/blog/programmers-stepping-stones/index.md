---
title: "[프로그래머스] 징검다리"
description: "."
date: "2021-10-22T17:34:24.867Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43236?language=python3


# overview
문제 이해부터 어려웠다.. 문제에서 선택 가능한 행동들과 판단들은 다음과 같다.

- rocks 배열에서 n개의 돌들을 제거
- rocks 요소들 간의 거리의 최소값을 구하기
  - 최소값들의 최대값 구하기

모든 경우의 수를 계산하기에는 distance가 1,000,000,000이다. brute-force가 안될 때는 bs, bfs/dfs 가지치기 등으로 해결하면 되는데 bfs/dfs를 적용할 경우의 수는 보이지 않는다. 거리의 최소값이나 n을 flag로 설정해서 bs를 적용해보자.

# 풀이
ref1: https://taesan94.tistory.com/154
ref2: https://deok2kim.tistory.com/122

푸는 방법들은 다양했다. 요점은 거리의 최소값이나 n을 mid로 설정하고 돌들간의 거리를 계산하면서 n을 counting하는 것이다.
ref2와 내가 푼 방식이 n을 mid로 설정하는 방식이다. ref1은 거리의 최소값을 mid로 두고 푸는 방법이다.

```py
def solution(distance, rocks, n):
    answer = 0
    rocks.sort()

    # bs의 탐색 대상 = rock 거리 간의 최소값    
    left, right = 0, distance
    
    while left <= right:
        removeRockCnt = 0
        mid = int((left + right) / 2)
        minDistance = float('inf')

        # 현재 어느 돌에 있는지 저장
        current = 0
        
        for rock in rocks:
            diff = rock - current
            # 실제로 rocks 배열을 조작하지 않고 
            # current를 변경해주는 것으로 삭제할 돌을 선택한다.
            if diff < mid:
                # current를 저장하지 않고 건너뛰어서 마치 돌을 삭제한 효과를 기대
                removeRockCnt += 1
            else:
                current = rock
                # 삭제하지 않을 돌이기 때문에 거리의 최소값 계산
                minDistance = min(minDistance, diff)
        
        # n보다 더 많이 지웠다면 더 적게 지워야한다.
        # 즉, 돌들간의 거리의 최소값이 더 작아져야하므로 right를 감소
        if removeRockCnt > n:
            right = mid - 1
        # n보다 더 적게 지우거나 같다면 answer를 일단 저장한다. 
        # 두 경우는 문제의 답을 내포한 경우이기 때문이다.
        else:
            answer = minDistance
            # n보다 더 적거나 같게 돌을 지웠으므로
            # 거리의 최소값을 늘려서 지울 돌의 개수를 늘려야한다.
            left = mid + 1
            
    return answer
```
https://github.com/naem1023/codingTest/blob/master/bs/pg-30-43236.py