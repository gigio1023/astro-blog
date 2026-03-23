---
title: "Processo di addestramento"
description: "Come funziona la gradient accumulation in PyTorch per l'addestramento con batch grandi su GPU con memoria limitata."
date: "2021-08-30T18:02:28.948Z"
tags: ["dl", "pytorch"]
draft: false
lang: it
translationOf: "training-proecss"
---

# Gradient Accumulation
Una tecnica utile quando le risorse GPU sono limitate.

```python
num_accum = 2
optimizer.zero_grad()
for epoch in range(10):
    running_loss = 0.0
    for i, data in enumerate(train_loader, 0):
        inputs, labels = data
        outputs = net(inputs)

        loss = criterion(outputs, labels) / num_accum
        loss.backward()

        if i % num_accum == 0:
            optimizer.step()
            optimizer.zero_grad()
 ```

- I parametri del modello vengono aggiornati solo dopo num_accum iterazioni.
- L'output del criterio viene diviso per num_accum per la normalizzazione.
  - La mia ipotesi: dato che la loss accumulata su num_accum step viene applicata in un singolo step, dividere per num_accum dà a ogni singola loss un peso uguale, producendo un effetto di normalizzazione.
