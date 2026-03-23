---
title: "Grad Cache"
description: "Un approccio che permette il contrastive learning con batch grandi sotto vincoli di memoria, tramite il caching dei gradienti."
date: "2022-04-12T00:00:00.000Z"
tags: ["ml", "ml-engineering", "dl", "paper-review"]
draft: false
lang: it
translationOf: "grad-cache"
---

Da completare...

# Grad Cache

## Panoramica
Un metodo che, nel contrastive learning con in-batch negative, permette di usare batch grandi in modo simile alla gradient accumulation.

Nei metodi di addestramento normali, la loss non viene calcolata batch-wise, quindi non ci sono problemi ad accumulare gli aggiornamenti della loss. Tuttavia, nei modelli come DPR e MRC che usano in-batch negative per il contrastive learning, la loss viene calcolata batch-wise, creando dipendenze tra i dati all'interno del batch. Quindi nel contrastive learning la gradient accumulation non è utilizzabile.

Grad Cache implementa un metodo simile alla gradient accumulation per il contrastive learning, permettendo di ottenere batch size grandi anche con una singola GPU.

![](/assets/images/Grad-Cache/used_batch_size.png)

In [Text and Code Embeddings by Contrastive Pre-Training](https://arxiv.org/abs/2201.10005) il batch size arriva fino a 12288. È un territorio quasi impossibile da raggiungere a livello hardware, quindi per ottenere batch size grandi nel contrastive learning si usa Grad Cache.

## Metodo


## Riferimenti

- Arxiv: [Scaling Deep Contrastive Learning Batch Size under Memory Limited Setup](https://arxiv.org/abs/2101.06983)
- https://seopbo.github.io/gradCache/
- https://github.com/luyug/GradCache
