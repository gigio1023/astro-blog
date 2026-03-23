---
title: "[HackerRank] Roads and Libraries"
description: "Soluzione del problema Roads and Libraries di HackerRank usando DFS per minimizzare il costo di costruzione di strade e biblioteche tra gruppi di città connesse."
date: "2021-11-19T12:04:28.529Z"
tags: ["algorithm"]
lang: it
translationOf: "hackerrank-roads-and-libraries"
draft: false
---

https://www.hackerrank.com/challenges/torque-and-development/problem

# Soluzione
L'obiettivo è minimizzare il costo assicurando che i cittadini di ogni città possano accedere a una biblioteca. Un cittadino può accedere a una biblioteca se la sua città ne ha una o se la sua città è connessa a una città che ne ha una.

Il costo è definito come:
$c\_lib=costo\ della\ biblioteca$
$c\_road=costo\ della\ strada$

Ci sono due approcci per costruire biblioteche e strade:
1. Costruire una biblioteca in ogni città.
2. Costruire strade in modo che tutte le città siano connesse.

## Approccio 1
Se c_lib è minore di c_road, l'approccio 1 è ottimale.

## Approccio 2
Il caso più intuitivo dove c_lib è maggiore di c_road.
In questo problema, non si possono connettere le città arbitrariamente -- si possono usare solo le relazioni fornite dal problema per costruire strade.

Quindi si usa l'approccio 2, ma i gruppi di città che non possono essere connessi hanno bisogno della propria biblioteca.

1. Trattare le relazioni date come un grafo esistente e lanciare una DFS. Contare gli archi attraversati durante la DFS.
2. Chiamare il conteggio degli archi del passo 1 $total\_path$.
3. Calcolare il numero di gruppi di città tramite $total\_path - num\_of\_city$.

Il costo finale è:
$total\_path \times c\_road+(total\_path - num\_of\_city)\times c\_city$

# Codice
https://github.com/naem1023/codingTest/blob/master/graph/hackerrank-roads-and-libraries.py
