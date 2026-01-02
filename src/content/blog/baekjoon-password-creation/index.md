---
title: "[백준] 암호 만들기"
description: "."
date: "2021-11-08T08:12:58.864Z"
tags: ["algorithm"]
draft: false
---

https://www.acmicpc.net/problem/1759

# 풀이

combination과 조건 체크로 풀 수 있다.
- 암호는 정렬된 알파벳에서 순서대로 추출해야한다.
  - combination 사용
- 최소 한 개의 모음, 최소 두 개의 자음
  - 모음 리스트 구성 후 조건 체크
  
# 코드
```py
import sys


L, C = list(map(int, sys.stdin.readline().split()))

char_list = sys.stdin.readline().split()

from itertools import combinations

char_list.sort()

answer = list(combinations(char_list, L))
answer = list(map(lambda x: ''.join(x), answer))

m = ['a', 'e', 'i', 'o', 'u']
for a in answer:
    m_count = 0
    j_count = 0
    
    for c in a:
        if c in m:
            m_count += 1
        else:
            j_count += 1
    
    if m_count >= 1 and j_count >= 2:
        print(a)
```