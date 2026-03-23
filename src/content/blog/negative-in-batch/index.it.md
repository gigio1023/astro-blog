---
title: "Negative In-batch"
description: "Un approccio che permette l'apprendimento contrastivo con grandi batch sotto vincoli di memoria, usando negativi in-batch invece del campionamento negativo esplicito."
date: "2021-10-18T17:53:53.788Z"
tags: ["nlp"]
lang: it
translationOf: "negative-in-batch"
draft: false
---

# Negative sampling tradizionale

Il batch delle query resta invariato.

Il batch dei passage cambia.
Un singolo batch e composto da 1 passage positivo e batch_size passage negativi, per un totale di batch_size + 1 dati per batch.

# Negative in-batch

Il batch dei passage e composto da batch_size elementi. A differenza dell'approccio tradizionale, non viene fatto nessun campionamento negativo separato. Le coppie positive query-passage vengono semplicemente inserite insieme.

1. Comporre gli elementi del batch in modo casuale.
2. Tra n elementi del batch, la i-esima query e i rimanenti i-1 elementi sono in relazione di passage negativo.
3. Quando si addestra su questo batch, le correlazioni all'interno del batch vengono apprese insieme.
4. Quando si calcola la loss, i passage positivi agli indici corrispondenti del batch vengono impostati come target. Qui si puo usare qualcosa come torch.arange per creare una sequenza aritmetica.
5. Il training viene fatto sull'intero batch, ma la loss viene calcolata solo sui campioni positivi.
es., batch_size = 4
```py
sim_scores = tensor([[-1.0768e+01, -3.7684e+01, -1.3255e-04, -9.1018e+00],
        [-2.1763e+01, -6.3134e+01,  0.0000e+00, -1.6743e+01],
        [-1.6615e+01, -4.5871e+01, -1.0729e-06, -1.3856e+01],
        [-1.3989e+01, -5.5973e+01, -1.1598e-04, -9.0696e+00]],

targets =  [0,1,2,3]
```
Gli elementi in sim_scores producono probabilita tali che l'indice target sia la risposta corretta. L'i-esimo elemento del 0-esimo item in sim_scores rappresenta la probabilita per l'i-esimo target.

Quindi i target sono 0, 1, 2, 3.
