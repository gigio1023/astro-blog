---
title: "[Baekjoon] Creazione password"
description: "Soluzione per Baekjoon 1759 (Creazione password) usando combinazioni con vincoli su vocali e consonanti."
date: "2021-11-08T08:12:58.864Z"
tags: ["algorithm"]
lang: it
translationOf: "baekjoon-password-creation"
draft: false
---

https://www.acmicpc.net/problem/1759

# Soluzione

Risolvibile con combinazioni e controllo delle condizioni.
- La password deve essere estratta in ordine da un alfabeto ordinato.
  - Usare combinazioni
- Almeno una vocale, almeno due consonanti
  - Costruire una lista di vocali e controllare le condizioni

# Codice
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
