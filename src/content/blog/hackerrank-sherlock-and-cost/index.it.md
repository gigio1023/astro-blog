---
title: "[HackerRank] Sherlock and Cost"
description: "Soluzione con programmazione dinamica per il problema Sherlock and Cost di HackerRank, massimizzando la somma delle differenze assolute in una sequenza."
date: "2021-11-19T09:34:40.268Z"
tags: ["algorithm"]
lang: it
translationOf: "hackerrank-sherlock-and-cost"
draft: false
---

https://www.hackerrank.com/challenges/sherlock-and-cost/problem

# Soluzione
ref: [Blog](http://mrkimkim.com/study/coding_interview/%EC%BD%94%EB%94%A9-%EC%9D%B8%ED%84%B0%EB%B7%B0hackerrank-sherlock-and-cost/)

![](/assets/images/[HackerRank] Sherlock and Cost/49a6baec-e8f0-4f53-b8a1-7318512ddec5-image.png)

Bisogna trovare $$A$$ che massimizza la formula sopra. Per massimizzare le differenze, A[i] dovrebbe essere o B[i] o 1, dato che $1 <= A[i] <= B[i]$.

Si potrebbe fare brute-force di tutte le possibilità per A[i] usando BFS o DFS, ma con $n = 10^5$ si supera il time limit. Si usa la programmazione dinamica per aggiornare continuamente S[i] e trovare il massimo S[i].

La funzione cost restituisce l'elemento più grande di S.

## Aggiornamento di S
A[i] può assumere uno di due valori:
- 1
- B[i]

Lo stesso vale per A[i - 1].

Generalizzando S[i]:
$S[i] = S[i - 1] + A[i]$

Dato che A[i] ha 2 scelte e A[i - 1] ha anch'esso 2 scelte, per un A[i] fissato ci sono 2 valori possibili di S[i].
I casi per S[i] sono:

- $A[i] = 1$, $S[i][0]$
  - $A[i - 1] = 1, S[i - 1][0] + (1 - 1)$
  - $A[i - 1] = B[i - 1], S[i - 1][1] + abs(B[i - 1] - 1)$
- $A[i] = B[i]$, $S[i][1]$
  - $A[i - 1] = 1, S[i - 1][0] + abs(B[i] - 1)$
  - $A[i - 1] = B[i - 1], S[i - 1][1] + abs(B[i] - B[i - 1])$

Con questa ricorrenza, S[i] accumula sequenzialmente le informazioni precedenti per produrre l'S[i] aggiornato.

# Codice
https://github.com/naem1023/codingTest/blob/master/dp/hackerrank-sherlock-and-cost.py
