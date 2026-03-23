---
title: "[Programmers] Tupla"
description: "Soluzione del problema della tupla di Programmers tramite parsing di stringhe, regex e ordinamento per lunghezza."
date: "2022-02-24T10:54:54.817Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-tuple"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/64065
ref: https://hazung.tistory.com/103

# Soluzione 1
```py
import re

def solution(s):
    answer = []
    s = s.split('},{')
    s = [re.sub('[{}]', '', c) for c in s]
    s = [list(map(int, c.split(','))) for c in s]
    s = list(sorted(s, key = len))

    for i in range(len(s)):
        target = s[i][0]
        answer.append(target)
        for j in range(i, len(s)):
            del s[j][s[j].index(target)]
    return answer

```
Il mio approccio. Ho semplicemente implementato quello che mi veniva in mente, quindi non e' efficiente.

# Soluzione 2
```py
def solution(s):
    answer = []
    s = s[2:-2]
    s = s.split("},{")
    s.sort(key = len)
    for i in s:
        ii = i.split(',')
        for j in ii:
            if int(j) not in answer:
                answer.append(int(j))
    return answer
```
- Rimuovendo i caratteri irregolari all'inizio e alla fine si puo' usare direttamente il risultato dello split.
- Non serve convertire subito in numeri -- si lavora con le stringhe e si converte dopo.
- Gli elementi di s vengono processati dal piu' corto. Quindi basta prendere gli elementi a partire dal primo e aggiungerli ad answer se non sono gia' presenti per soddisfare la definizione di "tupla" del problema.

# Soluzione 3
```py
import re

def solution(s):
    answer = []
    a = s.split(',{')
    a.sort(key = len)
    for j in a:
        numbers = re.findall("\d+", j)
        for k in numbers:
            if int(k) not in answer:
                answer.append(int(k))
    return answer
```
Stesso algoritmo della soluzione 2. La differenza e' l'uso delle regex per costruire una lista da ogni elemento di s.
Questa regex trova una o piu' cifre e aggiunge ogni corrispondenza a una lista prima di restituirla.
