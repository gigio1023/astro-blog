---
title: "[Programmers] Pietre miliari"
description: "Soluzione del problema delle pietre miliari di Programmers tramite ricerca binaria sulla distanza minima."
date: "2021-10-22T17:34:24.867Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-stepping-stones"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43236?language=python3


# overview
Capire il problema stesso era difficile. Le azioni e le decisioni possibili sono:

- Rimuovere n pietre dall'array rocks
- Trovare la distanza minima tra le pietre rimanenti
  - Trovare il massimo tra quei minimi

Calcolare tutte le possibilita' con la forza bruta non e' praticabile dato che la distanza puo' arrivare a 1.000.000.000. Quando la forza bruta non funziona, si puo' provare la ricerca binaria o il pruning BFS/DFS. BFS/DFS non sembra applicabile qui, quindi proviamo la ricerca binaria con la distanza minima o n come flag.

# Soluzione
ref1: https://taesan94.tistory.com/154
ref2: https://deok2kim.tistory.com/122

Ci sono vari approcci. Il punto e' impostare la distanza minima o n come `mid`, poi contare n calcolando le distanze tra le pietre.
ref2 e il mio approccio impostano n come mid. ref1 imposta la distanza minima come mid.

```py
def solution(distance, rocks, n):
    answer = 0
    rocks.sort()

    # obiettivo della ricerca binaria = distanza minima tra le pietre
    left, right = 0, distance

    while left <= right:
        removeRockCnt = 0
        mid = int((left + right) / 2)
        minDistance = float('inf')

        # tracciare su quale pietra ci troviamo
        current = 0

        for rock in rocks:
            diff = rock - current
            # invece di modificare effettivamente l'array rocks,
            # cambiamo current per simulare la selezione delle pietre da rimuovere
            if diff < mid:
                # saltare senza salvare current, "rimuovendo" di fatto la pietra
                removeRockCnt += 1
            else:
                current = rock
                # questa pietra non viene rimossa, quindi calcolare la distanza minima
                minDistance = min(minDistance, diff)

        # se ne abbiamo rimosse piu' di n, dobbiamo rimuoverne di meno
        # cioe' la distanza minima tra le pietre deve essere piu' piccola, quindi diminuire right
        if removeRockCnt > n:
            right = mid - 1
        # se ne abbiamo rimosse n o meno, salvare la risposta per ora
        # entrambi i casi potrebbero contenere la risposta al problema
        else:
            answer = minDistance
            # abbiamo rimosso n o meno pietre,
            # quindi aumentare la distanza minima per rimuovere piu' pietre
            left = mid + 1

    return answer
```
https://github.com/naem1023/codingTest/blob/master/bs/pg-30-43236.py
