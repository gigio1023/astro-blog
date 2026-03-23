---
title: "[Programmers] Rete (Python)"
description: "Soluzione del problema della rete di Programmers tramite DFS per contare le componenti connesse."
date: "2021-08-15T19:49:33.274Z"
tags: ["algorithm", "python"]
lang: it
translationOf: "programmers-network-python"
draft: false
---

# Problema

Una rete e' una forma di connessione in cui i computer possono scambiare informazioni tra loro. Ad esempio, se il computer A e' direttamente connesso al computer B, e il computer B e' direttamente connesso al computer C, allora anche il computer A e il computer C possono scambiare informazioni indirettamente. Quindi i computer A, B e C sono tutti sulla stessa rete.

Dato il numero di computer n e un array 2D `computers` contenente le informazioni sulle connessioni, scrivere una funzione solution che restituisca il numero di reti.

Vincoli:
- n e' un numero naturale tra 1 e 200.
- Ogni computer e' rappresentato da un intero da 0 a n-1.
- Se il computer i e il computer j sono connessi, computers[i][j] vale 1.
- computer[i][i] e' sempre 1.

# Soluzione
```python
def dfs(computers, v, visited):
    visited[v] = True

    for node in range(len(computers)):
        if visited[node] == False and computers[v][node] == 1:
            dfs(computers, node, visited)


def solution(n, computers):
    answer = 0
    visited = [False] * n

    for v in range(n):
        if not visited[v]:
            dfs(computers, v, visited)
            answer += 1
    return answer
```
Si tratta di DFS dato che e' una funzione ricorsiva che continua a esplorare l'array computers in profondita'. Inizialmente avevo provato a risolverlo modificando direttamente i valori di computers, ma non ci sono riuscito.

Il punto chiave e' che anche se `computers` e' un array 2D, si stanno comunque attraversando n vertici. Non bisogna farsi confondere dall'array 2D -- basta cercare attraverso gli n vertici.

Si usano gli n vertici come righe e si attraversa `computers` di conseguenza.
