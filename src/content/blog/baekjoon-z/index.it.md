---
title: "[Baekjoon] Z"
description: "Soluzione per Baekjoon 1074 (Z) usando divisione ricorsiva in quadranti e conteggio cumulativo."
date: "2021-11-11T03:15:39.453Z"
tags: ["algorithm"]
lang: it
translationOf: "baekjoon-z"
draft: false
---

https://www.acmicpc.net/problem/1074


# Soluzione 1
Ho provato a creare un array di unita minime, ma era troppo difficile. Affrontarlo come problema di implementazione non funziona. Va risolto con la ricorsione, usando l'idea di sommare in blocco gli elementi considerati come gia visitati.


|  1  |  2  |
|  3  |  4  |

Dividere le regioni dell'array nell'ordine mostrato sopra.
- Coordinata di riferimento per dividere le regioni: angolo in alto a sinistra
- size: lunghezza di un lato dell'area di ricerca corrente
- Conteggio degli elementi considerati visitati: size*size
  - Dato che gli elementi dell'array sono ordinati sequenzialmente, si accumulano i conteggi man mano

Se accumulare il conteggio:
- Nell'area di ricerca corrente:
  - Se (r, c) e presente: dividere l'area in 4 e cercare di nuovo
  - Se (r, c) e assente: contare gli elementi nell'area e accumulare

Ho implementato la decisione di conteggio con la ricorsione.

```py
import sys
input = sys.stdin.readline

n, r, c = list(map(int, input().split()))
ans = 0

def Z(y, x, size):
    """
    Funzione unità che divide l'area in 4.
    Il punto di riferimento dell'area è l'angolo in alto a sinistra.
    y: r
    x: c
    """
    global ans

    # Se l'area di ricerca corrisponde esattamente a (r, c), restituire
    if y == r and x == c:
        print(ans)
        return

    # Se (r, c) è nel quadrante corrente
    if r < y + size and r >= y and c < x + size and c >= x:
        # Cercare nel quadrante 1
        Z(y, x, size // 2)
        # Cercare nel quadrante 2
        Z(y, x + size // 2, size // 2)
        # Cercare nel quadrante 3
        Z(y + size // 2, x, size // 2)
        # Cercare nel quadrante 4
        Z(y + size // 2, x + size // 2, size // 2)
    # Accumulare tutti gli elementi nell'area corrente come visitati
    else:
        ans += size * size

# Partire da (0, 0), size=N^2 e restringere l'area di ricerca
Z(0, 0, (1 << n))
```

# Soluzione 2
L'idea di accumulare i conteggi degli elementi e la stessa. La differenza e che diminuisce n mentre cerca (r, c), rendendolo leggermente piu veloce della ricorsione.
```py
import sys
input = sys.stdin.readline

n, r, c = map(int, input().split())
cnt = 0
while n > 0:
    n -= 1
    # Primo quadrante
    if r < 2**n and c < 2**n:
        continue
    elif r < 2**n and c >= 2**n:
        cnt += (2**n)*(2**n)*1
        c -= 2**n
    elif r >= 2**n and c < 2**n:
        cnt += (2**n)*(2**n)*2
        r -= 2**n
    else:
        cnt += (2**n)*(2**n)*3
        r -= 2**n
        c -= 2**n

print(cnt)
```
