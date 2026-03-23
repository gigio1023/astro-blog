---
title: "[Programmers] Compressione di stringhe"
description: "Soluzione del problema di compressione di stringhe di Programmers con chunking in stile n-gram."
date: "2021-11-17T17:09:49.169Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-string-compression"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/60057

# Soluzione
Si puo' approcciare la stringa come un N-gram Language Model.

```py
def get_len(n):
  for i in range(cut, length of string, cut):
    controllare stringa, conteggio
  gestire ultimo conteggio

for i in range(0, len(s) // 2 + 1):
  get_len(i)
```

Controllo e conteggio della stringa:
- Confrontare `s[i : i + cut]` con il valore temporaneo corrente
  - Se corrispondono, incrementare il contatore
  - Se differiscono, aggiornare il risultato in output

Seguendo lo pseudo code cosi' com'e', l'ultimo blocco di caratteri non viene gestito all'interno del ciclo for. Gestire il conteggio dell'ultimo blocco fuori dal ciclo.

# Codice
https://github.com/naem1023/codingTest/blob/master/implementation/pg-60057.py
