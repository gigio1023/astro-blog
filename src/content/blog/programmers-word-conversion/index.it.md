---
title: "[Programmers] Conversione di parole"
description: "Soluzione del problema di conversione di parole di Programmers tramite BFS con rilevamento di differenze di un singolo carattere."
date: "2021-09-02T20:28:41.333Z"
tags: ["algorithm", "python"]
lang: it
translationOf: "programmers-word-conversion"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43163

# Soluzione
ref: https://moseory20.tistory.com/31
Inizialmente l'ho risolto con BFS ma non riuscivo a superare il 4o test case, quindi alla fine ho consultato la soluzione di qualcun altro.

I punti chiave erano gli stessi del mio approccio:
- Rilevare quando cambia un solo carattere
- Se cambia un solo carattere, eseguire il controllo
- Memorizzare il risultato del controllo

La differenza era che io l'ho risolto in modo piu' complesso con la ricorsione, mentre questa persona l'ha risolto in modo pulito con i cicli.

Quando si implementa BFS/DFS con la ricorsione, si definiscono nuovi sottoproblemi tramite i parametri della funzione. La stessa configurazione si puo' fare con le variabili in un ciclo.

Una cosa che inizialmente mi confondeva era come questa BFS basata su cicli funziona senza confronti di incremento/decremento su answer. Pensavo che ordini di attraversamento diversi potessero produrre valori di answer diversi.

Guardando il codice qui sotto, confronta tutto in una volta piuttosto che sequenzialmente, quindi questo approccio funziona. Dato che tutte le parole vengono accumulate in `diff_word` in una volta e confrontate, la risposta ottenuta e' sempre minimizzata.

# Codice
ref: https://moseory20.tistory.com/31
```python
def solution(begin, target, words):
    if target not in words:
        return 0

    answer = 0
    word_len = len(begin)
    word_list = [begin]
    diff_word = list()

    while(1):
        for wl in word_list:
            diff_word.clear()
            for word in words:
                diff = 0
                for idx in range (0, word_len):
                    if wl[idx] != word[idx]: diff += 1
                    if diff > 1: break
                if diff==1: # differenza di 1 carattere
                    diff_word.append(word)
                    words.remove(word)

        answer += 1
        if target in diff_word: return answer
        else: word_list = diff_word

    return answer

```
