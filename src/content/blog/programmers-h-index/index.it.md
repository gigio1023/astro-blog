---
title: "[Programmers] H-Index"
description: "Soluzione del problema H-Index di Programmers tramite ordinamento e scansione lineare."
date: "2021-10-22T02:44:44.279Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-h-index"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42747

# Soluzione
La parte difficile era capire come tradurre l'enunciato del problema in codice.

È un problema di implementazione: basta codificare "h articoli sono citati almeno h volte e i restanti articoli sono citati non più di h volte." Si parte ordinando `citations` in ordine crescente.

Riformulando il problema in termini adatti al codice:
>
Trovare il massimo h tale che, all'h-esimo elemento di citations, citations[h] sia stato citato abbastanza volte da avere almeno h elementi dall'indice h+1 in poi.

Sia `length` la lunghezza di `citations`. Se `citations` è ordinato in ordine crescente, `citations[i]` deve semplicemente essere maggiore o uguale a `length - i`. In tal caso, `length - i` diventa il massimo h.

Funziona perché, con l'ordinamento, se il valore all'indice i è >= `length - i`, allora tutti i valori da i+1 a length-1 sono anch'essi >= `length - i`. Quindi basta iterare da i = 0 e verificare.


# Codice
```py
def solution(citations):
    answer = 0
    citations.sort()

    length = len(citations)

    for i in range(length):
        if citations[i]  >= length - i:
            return length - i


    return answer
```
https://github.com/naem1023/codingTest/blob/master/sort/pg-30-42747.py
