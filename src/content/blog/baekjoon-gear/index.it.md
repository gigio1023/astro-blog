---
title: "[Baekjoon] Ingranaggio"
description: "Soluzione per Baekjoon 14891 (Ingranaggio) usando controllo ricorsivo dello stato e rotazione basata su deque."
date: "2021-10-26T20:12:15.305Z"
tags: ["algorithm"]
lang: it
translationOf: "baekjoon-gear"
draft: false
---

https://www.acmicpc.net/problem/14891

# Soluzione 1
[ref blog](https://wisdom-990629.tistory.com/entry/C-%EB%B0%B1%EC%A4%80-14891%EB%B2%88-%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4)
Era un problema di implementazione in cui bisognava capire come implementare rotazione e controllo dello stato con la ricorsione.

1. Input della query di rotazione
2. Ruotare l'ingranaggio specificato nella query
3. Dividere in sinistra e destra per calcolare se ogni ingranaggio deve ruotare
4. Ruotare in base ai valori di rotazione sinistra/destra

Il passo 3 si risolve con la ricorsione. Si potrebbero calcolare gli indici direttamente, ma dato che n e piccolo, la ricorsione produce codice piu semplice.

Per il passo 4, ho provato a implementare la rotazione tramite cancellazione di elementi per indice, ma non funzionava bene. Dato che n non e grande, ho spostato ogni elemento uno per uno per implementare la rotazione.

Mi sono bloccato su problemi di indici al passo 3 e non sono riuscito a risolverlo nel tempo limite. Ho finito per guardare la soluzione dopo.

# Soluzione 2
[ref github](https://github.com/keemdy/algorithm-test/blob/main/BOJ/1026/%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4.py)

Il processo e lo stesso della Soluzione 1.
1. Input della query di rotazione
2. Ruotare l'ingranaggio specificato nella query
3. Dividere in sinistra e destra per calcolare se ogni ingranaggio deve ruotare
4. Ruotare in base ai valori di rotazione sinistra/destra

La differenza e che i passi 2 e 4 usano deque invece di list, e il passo 3 usa il calcolo degli indici invece della ricorsione.

Il passo 3 si puo implementare in entrambi i modi, ma per i passi 2 e 4 deque sembra migliore. Dato che usa l'implementazione linked list di C, deque.rotate e conciso e dovrebbe essere piu veloce. Usare deque.

# Codice

[Codice soluzione 1](https://github.com/naem1023/codingTest/blob/master/implementation/acmicpc-14891.py)
[Codice soluzione 2](https://github.com/keemdy/algorithm-test/blob/main/BOJ/1026/%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4.py)
