---
title: "[Programmers] Rubrica telefonica"
description: "Soluzione del problema della rubrica telefonica di Programmers tramite ordinamento e confronto dei prefissi."
date: "2021-10-21T14:57:35.954Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-phone-book"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42577

# Soluzione
https://somjang.tistory.com/entry/Programmers-%EC%A0%95%EB%A0%AC-%EC%A0%84%ED%99%94%EB%B2%88%ED%98%B8-%EB%AA%A9%EB%A1%9D-Python

Era classificato come problema hash, ma l'ho risolto con ordinamento e confronto degli indici. Dato che n non e' particolarmente piccolo, un confronto brute-force di tutte le coppie non e' praticabile.

1. Ordinare la lista della rubrica.
2. Confrontare il numero di telefono i-esimo e (i+1)-esimo. Assumendo che i sia il potenziale prefisso, verificare la parte iniziale di i+1.
3. Se corrispondono, impostare answer=False.


Due approcci per il punto 2:

```py
# 1. Confronto diretto del prefisso tramite indicizzazione
if phone_book[i + 1][:len(phone_book[i])] == phone_book[i]

# 2. Usando startswith
if phone_book[i + 1].startswith(phone_book[i])

```


# Codice
https://github.com/naem1023/codingTest/blob/master/pg-30-42577.py
