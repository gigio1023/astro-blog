---
title: "[Baekjoon] Gita"
description: "Soluzione per Baekjoon 2026 (Gita) usando DFS su un grafo di amicizia con matrice di adiacenza e lista di adiacenza."
date: "2021-11-10T11:35:47.937Z"
tags: ["algorithm"]
lang: it
translationOf: "baekjoon-picnic"
draft: false
---

https://www.acmicpc.net/problem/2026

# Soluzione
ref: https://westmino.tistory.com/84

Ho pensato di attraversare il grafo di amicizia con DFS o BFS. Non e realmente un grafo, ma le relazioni di amicizia fornite come input possono essere usate per implementare qualcosa di simile a DFS/BFS su un grafo.

- adj_mat: matrice di adiacenza che memorizza le relazioni di amicizia.
- adj_list: un array in cui l'i-esimo elemento contiene gli amici di i.

## DFS
La definizione di "amici" qui e che tutti devono essere amici reciproci tra loro. Gli amici di amici non contano.
- Impostare un punto arbitrario come punto di partenza
- path: array che memorizza le persone che possono andare insieme
1. Ottenere dalla adj_list le persone amiche del punto di partenza.
2. Usare adj_mat per verificare se le persone del passo 2 possono essere aggiunte al path.
3. Se la lunghezza del path raggiunge K, restituire il path
4. Se dopo tutta l'esplorazione la lunghezza del path non raggiunge K, restituire None

## Gestione del risultato DFS
DFS produce None o un path.
- None: impostare un'altra persona come punto di partenza DFS e rieseguire
- path: ordinare il path e restituirlo

# Codice
https://github.com/naem1023/codingTest/blob/master/graph/acmicpc-2026.py
