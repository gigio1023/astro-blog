---
title: "[HackerRank] Climbing the Leaderboard"
description: "Soluzione del problema Climbing the Leaderboard di HackerRank usando attraversamento ordinato invece di ricerca ripetuta."
date: "2021-11-18T08:48:12.142Z"
tags: ["algorithm"]
lang: it
translationOf: "hackerrank-climbing-the-leaderboard"
draft: false
---

https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem

# Soluzione
ref: https://inspirit941.tistory.com/199
Provando a risolvere con il sort delle liste Python si superava il time limit. Neanche la binary search aiutava.

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

Per risolvere il time limit, non si può cercare da zero per ogni p. L'intuizione chiave è che player è in ordine crescente e ranked in ordine decrescente, quindi si possono saltare le regioni che non necessitano di ricerca.

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
Per via degli ordinamenti di player e ranked, i valori più bassi in player corrispondono alle posizioni più arretrate in ranked. Quindi iterando su player, controlliamo ranked dalla fine. Una volta superato un indice nella coda, non serve rivisitarlo.
In questo modo, indipendentemente dalla dimensione di ranked, lo si attraversa una sola volta.

## Indice negativo
idx può diventare negativo. Succede quando tutti gli elementi di ranked sono stati attraversati. In quel caso, p è al 1° posto, quindi aggiungiamo 1 al risultato.

# Codice
https://github.com/naem1023/codingTest/blob/master/implementation/hackerrank-climbing-the-leaderboard.py
