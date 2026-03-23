---
title: "[Programmers] Stampante"
description: "Soluzione del problema della coda di stampa di Programmers tramite simulazione basata sulla priorita'."
date: "2022-01-20T09:56:01.000Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-printer"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42587
# Soluzione

Bisogna capire chiaramente quando avviene la stampa e incrementare un contatore per ogni evento di stampa.

# Codice 1
Il mio approccio. Le condizioni di ramificazione sono una traduzione diretta del problema in codice. Un punto a cui fare attenzione: l'ultima riga di solution deve restituire `count + 1`. Se l'esecuzione arriva a quella riga, significa che tutti gli elementi di `priorities` sono stati estratti, quindi il contatore non e' ancora stato incrementato per l'ultimo.
```python
def solution(priorities, location):
    count = 0
    while priorities:
        front = priorities.pop(0)

        if priorities:
            if front < max(priorities):
                priorities.append(front)
                if location == 0:
                    location = len(priorities) - 1
                else:
                    location -= 1
            else:
                count += 1
                if location == 0:
                    return count
                else:
                    location -= 1

    return count + 1
 ```
# Codice 2
ref: https://programmers.co.kr/learn/courses/30/lessons/42587/solution_groups?language=python3
> any: restituisce True se un qualsiasi elemento nell'iterabile e' True, altrimenti False.

Io ho tracciato la posizione di location, ma questa soluzione memorizza in anticipo la posizione originale usando tuple. Questo rende il codice molto piu' pulito.

Usa anche `any` per il confronto delle priorita'. Usare `max` potrebbe sembrare piu' pulito, ma quando servono condizioni piu' complesse rispetto a un semplice max/min, `any` puo' rendere il codice molto piu' conciso.
```python
def solution(priorities, location):
    queue =  [(i,p) for i,p in enumerate(priorities)]
    answer = 0
    while True:
        cur = queue.pop(0)
        if any(cur[1] < q[1] for q in queue):
            queue.append(cur)
        else:
            answer += 1
            if cur[0] == location:
                return answer
```
