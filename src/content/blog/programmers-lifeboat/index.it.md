---
title: "[Programmers] Scialuppa di salvataggio"
description: "Soluzione del problema della scialuppa di Programmers con approccio greedy a due puntatori."
date: "2021-10-22T03:45:53.478Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-lifeboat"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42885

# Soluzione

Leggere bene i vincoli. Ho perso molto tempo non avendo notato la condizione per cui solo 2 persone possono salire su una barca alla volta.

Quando ogni barca può portare al massimo 2 persone, la strategia più efficiente è abbinare la persona più pesante con quella più leggera. Si ordina l'array `people`, poi si riducono gli indici da entrambe le estremità.
A patto di gestire correttamente il caso in cui una persona pesante viaggia da sola, sia l'ordinamento crescente che decrescente funzionano.

# Codice
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
