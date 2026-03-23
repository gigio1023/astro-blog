---
title: "NumPy che confonde"
description: "Insidie comuni di NumPy: problemi di dtype=object con liste a tipi misti e comportamento dell'asse in np.mean."
date: "2021-09-01T20:33:06.787Z"
tags: ["pytorch", "python"]
draft: false
lang: it
translationOf: "confusing-numpy"
---

# dtype=object, when complex list

Quando si converte una lista in NumPy che mescola dati str e numerici, il dtype si blocca su object. In questo caso, neanche l'index slicing cambia il dtype, e chiamare astype genera un errore.

```python
a = {somthing compelx Nd list}
b = np.array(a)
only_numerical = b[ {some slicing selecting only numerical data} ]

only_numerical.astype(np.float16) -> error!!

```

Usare np.stack ha risolto tutto al volo..

```python
np.stack(only_numercial)
```

# np.mean
Mi serviva np.mean durante l'implementazione del soft voting.

```python
>>> pred.shape
(10, 12800, 3)
```

10 è il numero di augmentation, 12800 il numero di dati, 3 il numero di classi. Volevo la media delle predizioni delle classi tra i risultati delle augmentation. Dato che volevo la media lungo l'ultimo asse, inizialmente ho fatto così:

```python
np.mean(pred, axis=-1)
```

Ma pensandoci, axis=0 era quello giusto. I punti chiave:
- L'asse dato a np.mean scompare. Ad esempio, axis=2 fa scomparire il 2o asse.
- Ragionare in termini di righe e colonne non funziona in N-d, quindi basta pensare che si calcola sui dati nella posizione dell'asse-esimo.
  - Ad esempio, per [[1,1,1],[2,2,2]], calcolare la media con axis=1 significa fare la media di 1, 1, 1.

Considerando questi punti, dovrebbe essere axis=0, non axis=-1. Perché bisogna fare la media sulle augmentation.

```python
>>> pred.shape
(10, 12800, 3)
>>> np.mean(pred, axis=0).shape
(12800, 3)
```
