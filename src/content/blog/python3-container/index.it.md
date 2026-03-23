---
title: "Container di Python 3"
description: "Panoramica sui container del modulo collections di Python: UserDict, OrderedDict e deque con note pratiche."
lang: it
translationOf: "python3-container"
date: "2021-10-27T00:53:46.790Z"
tags: ["python"]
draft: false
---

Ho raccolto alcuni container built-in di Python che si incontrano spesso in HuggingFace e nei test di programmazione.

# collections
## UserDict
[Docs](https://docs.python.org/3/library/collections.html#collections.UserDict)
Identico a un normale dizionario Python. Si tratta di un semplice wrapper pensato per essere più facile da ereditare o gestire come oggetto.

[HuggingFace BatchEncoding Github](https://github.com/huggingface/transformers/blob/8ddbfe975264a94f124684a138a2a5ca89a2bd0d/src/transformers/tokenization_utils_base.py#L163)
Quando si chiama il tokenizer di HuggingFace, il tipo restituito è BatchEncoding. Mi ero imbattuto in codice che faceva pop su BatchEncoding come nell'esempio qui sotto, senza capirne il motivo. Cercando, ho scoperto che BatchEncoding è una sottoclasse di UserDict, quindi usa semplicemente lo stesso comportamento di pop dei dizionari Python.

```py
sample_mapping = tokenized_examples.pop("overflow_to_sample_mapping")
```

## OrderedDict
[ref blog](https://www.daleseo.com/python-collections-ordered-dict/)
Prima di Python 3.6, l'ordine del dizionario non era garantito, per cui serviva OrderedDict. Dalla 3.6 in poi, anche il dizionario standard mantiene l'ordine di inserimento durante l'iterazione.

La differenza resta nel confronto: un dizionario normale non considera l'ordine, OrderedDict sì.

## deque
Coda a doppia estremità (double-ended queue).
Il [ref blog](https://leonkong.cc/posts/python-deque.html) ha un riassunto migliore della documentazione ufficiale.
- deque.append(item): Inserisce item all'estremità destra.
- deque.appendleft(item): Inserisce item all'estremità sinistra.
- deque.pop(): Rimuove e restituisce l'elemento più a destra.
- deque.popleft(): Rimuove e restituisce l'elemento più a sinistra.
- deque.extend(array): Itera sull'array e aggiunge ogni elemento a destra.
- deque.extendleft(array): Itera sull'array e aggiunge ogni elemento a sinistra.
- deque.remove(item): Trova e rimuove item dalla deque.
- deque.rotate(num): Ruota la deque di num posizioni (positivo = destra, negativo = sinistra).
