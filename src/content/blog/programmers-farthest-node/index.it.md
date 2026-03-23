---
title: "[Programmers] Nodo più lontano"
description: "Soluzione del problema del nodo più lontano di Programmers tramite BFS su un grafo non orientato."
date: "2021-11-12T08:07:04.858Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-farthest-node"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/49189

# Soluzione
ref: [Blog](https://donis-note.medium.com/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B0%80%EC%9E%A5-%EB%A8%BC-%EB%85%B8%EB%93%9C-level-3-python-%ED%92%80%EC%9D%B4-248455cfa49d)
Si tratta di un problema di attraversamento di grafi, quindi si può scegliere tra DFS e BFS. Ho usato BFS.

1. Dato che vengono fornite solo le relazioni tra archi, si costruisce un nuovo dizionario del grafo che memorizza i nodi adiacenti per ogni nodo.
2. Partendo dal nodo 1, si esegue BFS sul dizionario del grafo.
3. È un grafo non orientato senza pesi sugli archi. Quindi, aggiornando i valori di distanza la prima volta che si visita ogni nodo durante la BFS, si ottiene la distanza minima dal nodo 1.

# Codice
https://github.com/naem1023/codingTest/blob/master/graph/pg-49189.py
