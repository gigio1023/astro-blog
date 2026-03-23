---
title: "Troubleshooting"
description: "Suggerimenti comuni di troubleshooting per PyTorch: problemi di memoria GPU, errori OOM, accumulo di tensor e best practice per l'inference."
date: "2021-08-22T20:10:07.453Z"
tags: ["pytorch"]
draft: false
lang: it
translationOf: "trouble-shooting"
---

# GPUtil
- Simile a nvidia-smi.
- Stampa continuamente le statistiche di GPU e memoria nella console.

```python
!pip install GPUtil
import GPUtil
GPUtil.showUtilization()
```

# Accumulo di tensor
La maggior parte delle variabili tensor usa memoria GPU.

Se queste variabili si accumulano in un loop, la memoria GPU si esaurisce velocemente.

Es.,
```python
total_loss = 0
for i in range(10):
	optim.zero_grad()
    output = model(input)
    loss = criterion(output)
    loss.backward()
    optim.step()
    total_loss += loss ## qui!!!
```

Per i tensor che si accumulano, vengono usati una sola volta o sono semplici, conviene convertirli in oggetti nativi Python quando possibile.


# Out of Memory (OOM)
- Provare prima con batch size = 1 e sperimentare monitorando la memoria.

# torch.no_grad()
Usarlo sempre durante l'inference. Ovviamente, senza di esso, i calcoli del backward pass si accumulano come durante il training.

# Dimensione del modello
Per esempio, le LSTM consumano parecchia memoria, quindi bisogna considerare anche la dimensione del modello stesso.

# Dtype dei tensor
La precisione in virgola mobile può essere impostata a 16-bit.
