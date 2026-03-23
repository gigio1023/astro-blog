---
title: "[Programmers] Numero target (Python)"
description: "Soluzione del problema del numero target di Programmers con approcci DFS, BFS e itertools.product."
date: "2021-08-15T15:52:19.688Z"
tags: ["algorithm", "python"]
lang: it
translationOf: "programmers-target-number-python"
draft: false
---

# Problema
Si hanno n interi non negativi. Si vuole ottenere un numero target sommandoli o sottraendoli opportunamente. Ad esempio, per ottenere 3 da [1, 1, 1, 1, 1]:
>
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

Dato un array `numbers` di numeri disponibili e un numero `target`, scrivere una funzione solution che restituisca il numero di modi per raggiungere il target sommando e sottraendo.

Vincoli:
- Il numero di cifre fornite e' compreso tra 2 e 20.
- Ogni numero e' un naturale compreso tra 1 e 50.
- Il numero target e' un naturale compreso tra 1 e 1000.

# Soluzione

A quanto pare si puo' risolvere con BFS o DFS. Non lo sapevo e alla fine ho consultato le soluzioni dopo averci sbattuto la testa.
Con n caselle da riempire e solo +/- come segni disponibili, l'approccio naive e' $2^n$. Serve un algoritmo efficiente.


## dfs
```python
answer = 0
def DFS(idx, numbers, target, value):
    global answer
    N = len(numbers)
    if(idx== N and target == value):
        answer += 1
        return
    if(idx == N):
        return

    DFS(idx+1,numbers,target,value+numbers[idx])
    DFS(idx+1,numbers,target,value-numbers[idx])

def solution(numbers, target):
    global answer
    DFS(0,numbers,target,0)
    return answer
```

La soluzione piu' facile da capire.

Implementa il processo di risoluzione dell'equazione tramite ricorsione. Le decisioni +/- vengono accumulate in `value` attraverso le chiamate ricorsive.

La risposta si trova quando tutte le caselle sono state riempite in `value` e `value` e' uguale a `target`. Se tutte le caselle sono state riempite ma `idx` e' uguale a N senza corrispondenza, e' un vicolo cieco.

A me sembra piu' BFS che DFS... ma comunque e' stata la piu' facile da seguire.

## product
```python
from itertools import product
def solution(numbers, target):
    l = [(x, -x) for x in numbers]
    s = list(map(sum, product(*l)))
    return s.count(target)
```

`product` esegue tra liste la stessa operazione di join usata nei database. La lista deve essere spacchettata quando viene passata, da qui l'asterisco su `l`.
https://mingrammer.com/understanding-the-asterisk-of-python/


1. Creare una lista di tuple con segni +/- per ogni elemento di numbers.
2. Usare product per ottenere tutte le combinazioni tra gli elementi di l.
3. Applicare sum a ogni combinazione tramite map.
4. Restituire il conteggio delle combinazioni la cui somma e' uguale a target.

Il codice piu' pulito. Non sono sicuro delle garanzie di performance, ma dati i vincoli del problema, le funzioni built-in di Python sembrano sufficienti.

## bfs
```python
import collections

def solution(numbers, target):
    answer = 0
    stack = collections.deque([(0, 0)])
    while stack:
        current_sum, num_idx = stack.popleft()

        if num_idx == len(numbers):
            if current_sum == target:
                answer += 1
        else:
            number = numbers[num_idx]
            stack.append((current_sum+number, num_idx + 1))
            stack.append((current_sum-number, num_idx + 1))

    return answer
```

Simile all'approccio DFS visto sopra. Aggiorna ripetutamente `current_sum`, lo passa alla funzione ricorsiva e verifica.
