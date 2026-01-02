---
title: "[프로그래머스] 구명보트"
description: "."
date: "2021-10-22T03:45:53.478Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42885

# 풀이

문제의 제한 조건을 잘 읽자. 한 번에 2명밖에 타지 못하는 조건을 못 읽고 시간 낭비를 많이 했다. 

하나의 보트에에 2명만 탈 수 있을 때 가장 효율적인 방법은 무거운 사람과 가벼운 사람을 짝지어서 태우는 방법이다. people 배열을 정렬 한 후, 배열의 양 끝단의 index들을 줄여나가는 방식으로 보트를 태운다. 
무거운 사람 혼자서만 보트를 타는 경우의 수를 잘 고려한다면 오름차순, 내림차순 정렬 모두 상관없다. 

# 코드
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