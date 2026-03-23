---
title: "Transfer learning con PyTorch"
description: "Transfer learning in PyTorch: congelare i layer, strategia stepping frozen e formati di file dei modelli."
lang: it
translationOf: "pytorch-transfer"
date: "2021-08-20T04:11:55.216Z"
tags: ["pytorch"]
draft: false
---

Meno sul codice dei modelli, più su come gestirli.

# Transfer learning
- Applicare un modello addestrato su un dataset diverso (pre-trained model) ai propri dati attuali.
  - Più efficiente perché non si parte da zero.
  - Usare un modello addestrato su un dataset grande tende a dare prestazioni migliori.
- L'approccio di training più comune.
- Solo alcune parti del modello vengono modificate per l'addestramento.
- CNN: torchvision
- NLP: HuggingFace è lo standard di fatto.

Es. se si vuole fare binary classification con VGG, si carica un VGG pre-addestrato da torchvision e si aggiunge un layer lineare alla fine.

## source task, target task

![](/assets/images/pytorch transfer/b0288c4b-3ec2-42f4-81f0-43f4151b2e00-image.png)

Questo era un esercizio opzionale proposto come compito. Un esempio classico di transfer learning. L'obiettivo è trasferire la conoscenza appresa nel source task al target task.

- Obiettivo: addestrare e classificare dati fashion-mnist.
- Approccio:
  - Impostare imagenet e mnist_resnet come source task.
  - Se il modello del source task è già pre-addestrato, usarlo direttamente come modello del target task.
  - Se servono modifiche, aggiungere o cambiare alcuni layer. Inizializzare pesi e bias solo per i layer modificati e riaddestrare.
  - Nel target task, se servono ulteriori modifiche ai layer, seguire lo stesso processo: modificare, inizializzare pesi e bias, riaddestrare.

## Frozen
L'aggiornamento dei parametri e la backpropagation non si applicano all'intera rete ma solo a layer specifici del modello pre-addestrato. L'obiettivo è mantenere parte dei parametri pre-addestrati mentre si adatta il modello al proprio dataset.

![](/assets/images/pytorch transfer/fe30774b-f113-4b19-bc16-4909c3dd0e30-image.png)

### Stepping frozen
I layer congelati cambiano a ogni step di addestramento.

# pth, pt
Estensioni dei file dei modelli PyTorch. Entrambe funzionano, ma pth è già usato da Python stesso, quindi si raccomanda pt.

## nn.BCEWithLogitsLoss()
Un criterio per calcolare la loss nella binary classification. Aggiunge un sigmoid alla fine del modello anche se non ne è stato incluso uno.
