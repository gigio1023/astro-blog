---
title: "PyTorch Dataset e DataLoader"
description: "Guida a Dataset e DataLoader di PyTorch: flusso dati, conversione in tensor, sampler, collate_fn e transforms."
lang: it
translationOf: "pytorch-dataset-dataloader"
date: "2021-08-19T01:53:16.064Z"
tags: ["pytorch"]
draft: false
---

Avevo implementato dataset e dataloader personalizzati per il progetto di laurea, ma ero sotto pressione con i tempi e il risultato è rimasto un ricordo confuso. Ho colto l'occasione per riordinare le parti che non mi erano chiare o che non conoscevo.

# Flusso dei dati
![](/assets/images/pytorch dataset, dataloader/a659d452-c938-4671-a516-55c059003eec-image.png)

La cosa importante è che anche la conversione dei dati in tensor richiede una considerazione separata. Io prima li piazzavo ovunque alla rinfusa...

# torch.utils.Data.Dataset
\_\_len\_\_, \_\_getitem\_\_, ecc. -- basta implementarli in base ai propri dati.

## Conversione in tensor
Non si fa in \_\_getitem\_\_!
I dati non vengono convertiti in tensor al momento del caricamento. Invece, una funzione come un transformer li converte tutti in blocco quando inizia il training.

Per fortuna CPU e GPU gestiscono queste operazioni in parallelo, quindi è veloce.

Di recente si usano anche librerie standardizzate come HuggingFace.

# torch.utils.Data.DataLoader
- Una classe che genera batch di dati.
- Gestisce la conversione dei dati appena prima del training (prima di passarli alla GPU).
  - Conversione in tensor.
- Va considerata la preelaborazione parallela dei dati.

Blog di riferimento:
https://subinium.github.io/pytorch-dataloader/

## sampler
Definisce come controllare l'idx passato a getitem. batch_sampler funziona allo stesso modo.

## collate_fn
Definisce come trasformare un batch raccolto tramite getitem da [[data, label], [data, label], [data, label] ...] in [[data, data, data ...], [label, label, label, ...]].

# torchvision.transforms

```python
data_transform = transforms.Compose([
        transforms.RandomSizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])
```

Bisogna comporre una pipeline di transform separata per la conversione dei dati. Basta con la conversione elemento per elemento dentro il dataset come facevo nel progetto di laurea.
