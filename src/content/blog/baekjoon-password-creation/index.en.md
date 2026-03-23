---
title: "[Baekjoon] Password Creation"
description: "Solution for Baekjoon 1759 (Password Creation) using combinations with vowel and consonant constraints."
date: "2021-11-08T08:12:58.864Z"
tags: ["algorithm"]
lang: en
translationOf: "baekjoon-password-creation"
draft: false
---

https://www.acmicpc.net/problem/1759

# Solution

Solvable with combinations and condition checking.
- The password must be extracted in order from a sorted alphabet.
  - Use combinations
- At least one vowel, at least two consonants
  - Build a vowel list and check conditions

# Code
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
