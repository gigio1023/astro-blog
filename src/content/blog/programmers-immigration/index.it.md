---
title: "[Programmers] Controllo passaporti"
description: "Soluzione del problema del controllo passaporti di Programmers tramite ricerca binaria sul costo temporale."
date: "2021-10-20T02:11:09.313Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-immigration"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43238

# Soluzione
Affrontare il problema come pura implementazione non funziona perché n è troppo grande. Il problema chiede il costo temporale minimo, quindi l'intuizione chiave è definire quante persone possono essere processate dato un certo costo temporale.

Si imposta il costo temporale a un intero arbitrario. Durante quel tempo, tutti gli ispettori lavorano. Dividendo il costo temporale per ogni elemento dell'array `times` si ottiene quante persone ogni ispettore può processare in quel tempo.

Una volta determinato quante persone gli ispettori possono gestire a un dato costo temporale, si può giudicare se quel costo è troppo alto o troppo basso. Ad esempio, "dati 60 minuti, la velocità di processamento degli ispettori era sufficiente a gestire più persone del necessario." Oppure si potrebbe scoprire che ne hanno gestite di meno.

Dato che n è molto grande, non si può trovare il costo temporale giusto con la forza bruta -- serve la ricerca binaria. Dove una tipica ricerca binaria usa left/right come indici dell'array, qui si cerca tra il costo temporale minimo e massimo possibile.

![](/assets/images/[프로그래머스] 입국심사/71dd7b37-9f4b-48a0-9885-01d4d8500b3c-image.png)

Nella ricerca binaria, la variabile `mid` rappresenta il costo temporale stesso. Cambia in base a quante persone vengono processate a quel costo. Se sono state processate più persone del necessario, mid deve diminuire -- dato che cerchiamo il tempo minimo. Se ne sono state processate di meno, mid deve aumentare per soddisfare il requisito.

# Codice
https://github.com/naem1023/codingTest/blob/master/bs/pg-30-43238.py
