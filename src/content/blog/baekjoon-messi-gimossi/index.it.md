---
title: "[Baekjoon] Messi Gimossi"
description: "Soluzione per Baekjoon 17297 (Messi Gimossi) usando ricerca su stringhe basata su Fibonacci con approccio simile alla ricerca binaria."
date: "2021-09-02T20:17:18.103Z"
tags: ["python", "algorithm"]
lang: it
translationOf: "baekjoon-messi-gimossi"
draft: false
---

https://www.acmicpc.net/problem/17297

# Soluzione
ref: https://mountrivers.github.io/boj17297/

F(m) e una stringa esprimibile come sequenza di Fibonacci per l'm-esimo carattere, come mostrato sotto.

> F(m) = F(m - 1) + F(m - 2)

Fortunatamente, dato che le stringhe sono composte solo da Messi e Gimossi, prevedere le lunghezze delle stringhe e semplice. Il punto chiave e rendersi conto che si puo cercare in F(m) in modo simile alla ricerca binaria.

Ignorando gli spazi, e usando valori ipotetici invece di quelli reali, consideriamo questa situazione:
- N = 100
- F(51) = 130
- F(50) = 80
- F(49) = 50
- F(48) = 30

Allora possiamo prevedere che la stringa corrispondente a F(51) contiene almeno l'N-esimo carattere, dato che F(50) ha 80 caratteri.

F(51) = F(50) + F(49) — l'ordine di composizione della stringa e importante qui. Perche in base al conteggio dei caratteri di F(50), il 100-esimo carattere si trova in F(50) o in F(49).

Qui F(50) = 80, quindi il 100-esimo carattere non puo essere in F(50).

Quindi bisogna ripetere la ricerca del 100-esimo carattere in F(49). Cioe, trovare il 100 - 80 = 20-esimo carattere in F(49).

Se F(50) fosse stato maggiore di 100, il problema sarebbe diventato trovare il 100-esimo carattere in F(50).

Considerando gli spazi, si possono rilevare immediatamente. Se l'indice tra F(50) e F(49) e 100, allora il 100-esimo carattere e uno spazio — rilevabile in O(1).

# Codice
Il blogger che ha spiegato questo problema l'ha scritto in C++. Convertito in Python:

```python
import sys
N = int(sys.stdin.readline())

pibo = []
b = 'Messi Gimossi'
q = 5
w = 13
pibo.append(q)
pibo.append(w)

while w < 1073741824:
    e = w
    w = w + q + 1
    q = e
    pibo.append(w)

i = 0
while pibo[i] < N:
    i += 1

'''
String Order
F(M) = F(M-1) + F(M-2)
'''
while i >= 2:
    # Detect space, exit immediately
    if N == pibo[i - 1] + 1:
        N = -1
        break
    # If target is located on F(M - 2)
    elif N > pibo[i - 1]:
        # Decrease counter
        i -= 2
        # Decrease N with F(M - 1)
        N -= pibo[i + 1] + 1
    # If target is located on F(M - 1)
    else:
        i -= 1

if N == -1 or N == 6:
    print('Messi Messi Gimossi')
else:
    print(b[N - 1])

```
