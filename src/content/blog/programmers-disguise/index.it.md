---
title: "[Programmers] Travestimento"
description: "Soluzione del problema hash 'Travestimento' di Programmers, con combinatoria per contare le combinazioni di abbigliamento."
date: "2021-10-21T17:35:00.076Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-disguise"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42578

# Soluzione

Si tratta di un problema in cui bisogna calcolare il numero di combinazioni per i tipi di abbigliamento. Il tipo di indumento è memorizzato nel secondo elemento di ciascun item della lista `clothes`, quindi creo le chiavi in base a quei valori.

```py
from collections import defaultdict
def solution(clothes):
    answer = defaultdict(int)

    for cloth in clothes:
        answer[cloth[1]] += 1
    cnt = 1
    for key in answer:
        cnt *= answer[key] + 1

    return cnt - 1
```

In `answer` viene memorizzato quanti capi esistono per ogni tipo. Quando si calcolano le combinazioni, si aggiunge 1 a ogni `answer[key]` perché esiste anche il caso in cui non si indossa quel tipo.

Dato che tra i casi contati c'è anche quello in cui non si indossa nulla, sottraendo 1 da `cnt` si ottiene il numero di outfit validi.

# Codice
https://github.com/naem1023/codingTest/blob/master/hash/pg-30-42578.py
