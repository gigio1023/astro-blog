---
title: "[Programmers] Ordinamento nomi file"
description: "Soluzione del problema di ordinamento dei nomi file di Programmers, con split basato su regex e chiavi di ordinamento personalizzate."
date: "2021-11-02T02:51:54.726Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-filename-sort"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/17686

# Approccio 1
Bisogna dividere i nomi dei file in base ai caratteri numerici. Un modo è implementarlo manualmente:

```py
number_list = [str(i) for i in range(10)]

for idx in range(len(files)):
    head, number, tail = "", "", ""
    number_idx, tail_idx = -1, -1
    # Trovare l'indice di inizio della parte numerica
    for j in range(len(files[idx])):
        if files[idx][j] in number_list:
            head = files[idx][:j]
            # print(head)
            number_idx = j
            break
    # Trovare l'indice di inizio della parte tail
    for j in range(number_idx, len(files[idx])):
        if files[idx][j] not in number_list:
            number = int(files[idx][number_idx:j])
            break
    tail = files[idx][j:]
    files[idx] = [head, number, tail]
```

A metà dell'implementazione mi sono ricordato delle regex. Dato che `\d` distingue le cifre, si può fare:
```py
re.compile(r'(\d+)')
```
Dato che serve solo lo split, ho usato `re.split`.

Per l'ordinamento, basta passare la priorità alla funzione sort. Dato che si ordina solo per head e number, passo questa lambda come chiave di ordinamento:

```py
lambda x: (x[0].lower(), int(x[1]))
```


# Approccio 2
A quanto pare si potrebbe anche usare l'interfaccia Comparable di Java. In Python si implementerebbe `__cmp__`, anche se per questo problema non c'è un vero motivo. Potrebbe tornare utile se la logica di ordinamento fosse più complessa.

- [python \_\_cmp\_\_](https://portingguide.readthedocs.io/en/latest/comparisons.html)
- [Codice approccio 2](https://velog.io/@pica_pica/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-3%EC%B0%A8-%ED%8C%8C%EC%9D%BC%EB%AA%85-%EC%A0%95%EB%A0%AC)


# Codice
https://github.com/naem1023/codingTest/blob/master/sort/pg-30-17686.py
