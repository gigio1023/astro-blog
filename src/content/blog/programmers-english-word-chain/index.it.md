---
title: "[Programmers] Catena di parole in inglese"
description: "Soluzione del problema del gioco a catena di parole di Programmers, con simulazione basata su stack e aritmetica modulare."
date: "2021-10-29T22:50:29.761Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-english-word-chain"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/12981

# Soluzione
Tra i vincoli del problema c'è il seguente:
> words è un array contenente le parole usate nel gioco a catena, in ordine.

Da qui si capisce che estraendo gli elementi da `words` in ordine si può riprodurre il gioco.

Questo porta al seguente algoritmo:
1. Scorrere `words` in ordine, verificando se la catena continua.
2. Se la catena si interrompe, calcolare la risposta.

Dato che basta scorrere `words` in ordine per simulare il gioco, la risposta si ricava dall'indice `$i$` e dal numero di giocatori `$n$`:

- Di quale giocatore è il turno:
  - $i \mod n$
  - Si aggiunge +1 perché si conta a partire da 1
- A quale giro si è:
  - $[ i \div n ]$
  - Si aggiunge +1 perché il primo giro conta come 1

Quoziente e resto si possono calcolare come sopra, oppure usando la funzione built-in `divmod` di Python:

```py
q, r = divmod(a, b)
```



# Codice
```py
def solution(n, words):
    answer = [0,0]
    stack = [words[0]]
    for i in range(1, len(words)):
        # Se l'ultimo carattere della parola in cima allo stack coincide con il primo carattere della parola i-esima
        # e la parola i-esima non è già nello stack
        if stack[-1][-1] == words[i][0] \
            and words[i] not in stack:
            stack.append(words[i])
        # Se non si può aggiungere allo stack, aggiornare la risposta
        else:
            answer[0] = (i % n) + 1
            answer[1] = i // n + 1
            break
    return answer
```
