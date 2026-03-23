---
title: "[Baekjoon] 2048 (Easy)"
description: "Soluzione per Baekjoon 12100 (2048 Easy) usando simulazione brute-force con fusione dei blocchi e movimento nelle quattro direzioni."
date: "2021-10-13T14:59:23.302Z"
tags: ["algorithm", "python"]
lang: it
translationOf: "baekjoon-2048-easy"
draft: false
---

[ref blog](https://chldkato.tistory.com/163)
# Problema
E il gioco 2048 che tutti conoscono. Ma con vincoli aggiuntivi:
- Un blocco che si e gia fuso in un movimento non puo fondersi di nuovo
- Se 3 o piu blocchi possono fondersi, la fusione parte da quelli piu vicini alla direzione del movimento
  - es., Se si muove verso l'alto, fondere prima quelli in alto

# Soluzione
L'idea della fusione in se e semplice da trovare. Se vuoto, sposta il valore; se i valori sono uguali, raddoppia; altrimenti, posiziona nella cella sopra.

La parte difficile da capire, anche leggendo le spiegazioni di altri, era come impedire ai blocchi gia fusi di fondersi di nuovo. Mi aspettavo una qualche flag, ma l'approccio incrementa continuamente l'indice di riga o colonna per il target della fusione.

La seconda difficolta era gestire le quattro direzioni. Richiede una solida comprensione di cosa elaborare prima tra righe e colonne.

Per esempio, muovendosi a sinistra o destra, si itera per colonna e si sposta una riga alla volta. Per su o giu, si itera per riga e si sposta una colonna alla volta.

```py
if direction == 0:
        # Guardare tutte le colonne di arr, quindi iterare n volte
        for j in range(n):
            idx = 0
            # Guardare tutte le righe tranne la 0-esima
            for i in range(1, n):
                # Se l'elemento non è 0 == non è vuoto
                if arr[i][j]:
                    # Salvare cosa stiamo per spostare
                    temp = arr[i][j]
                    # Svuotare la posizione originale
                    arr[i][j] = 0
                    # Se la destinazione è 0
                    if arr[idx][j] == 0:
                        # È vuota, quindi basta spostare
                        arr[idx][j] = temp
                    # Se ciò che spostiamo è uguale alla destinazione
                    elif arr[idx][j] == temp:
                        # Fondere
                        arr[idx][j] = temp * 2
                        # Incrementare idx per non fondere di nuovo
                        idx += 1
                    # Se ciò che spostiamo è diverso dalla destinazione
                    else:
                        idx += 1 # Bloccare
                        arr[idx][j] = temp # Ripristinare
```
[0, 3] sono mappati su, giu, sinistra, destra in ordine. direction = 0 significa che il codice sopra sposta i blocchi verso l'alto.

Spostare verso l'alto e semplice. Sinistra e destra sono piu complicati. Ecco lo spostamento a sinistra:

```py
elif direction == 2:
        for i in range(n):
            idx = 0
            for j in range(1, n):
                if arr[i][j]:
                    # Salvare cosa stiamo per spostare
                    temp = arr[i][j]
                    # Svuotare la posizione originale
                    arr[i][j] = 0
                    # Se la destinazione è 0
                    if arr[i][idx] == 0:
                        # È vuota, quindi basta spostare
                        arr[i][idx] = temp
                    # Se ciò che spostiamo è uguale alla destinazione
                    elif arr[i][idx] == temp:
                        # Fondere
                        arr[i][idx] = temp * 2
                        # Incrementare idx per non fondere di nuovo
                        idx += 1
                    # Se ciò che spostiamo è diverso dalla destinazione
                    else:
                        idx += 1 # Bloccare
                        arr[i][idx] = temp # Ripristinare
```

Uso sempre i per la variabile riga e j per la variabile colonna. Per lo spostamento a sinistra, bisogna iterare per colonna e spostare una riga alla volta. Quindi l'ordine dei cicli va invertito per iterare prima i, poi j.

Il resto segue lo stesso pattern dello spostamento verso l'alto.

Per spostare verso il basso, si inverte il range per i; per spostare a destra, si inverte il range per j. Cioe, iterare da n-2 fino a 1.

# Codice
https://github.com/naem1023/codingTest/blob/master/implementation/acmipic-12100.py
