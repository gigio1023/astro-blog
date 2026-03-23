---
title: "Tecniche di addestramento aggiuntive"
description: "Tecniche pratiche di addestramento tra cui AMP, label smoothing, ArcFace loss, regolazione del pivot di classe e logging con Wandb per la classificazione di immagini."
date: "2021-08-30T15:13:38.273Z"
tags: ["computer-vision", "pytorch"]
lang: it
translationOf: "additional-training-techniques"
draft: false
---

# AMP
Si tratta dell'`amp` che NVIDIA ha integrato in PyTorch. Permette di calcolare in FP16, quindi ho pensato di usarlo.

https://pytorch.org/docs/stable/notes/amp_examples.html

Ho usato il primo metodo, quello in cui autocast gestisce tutto automaticamente.
Detto questo, i miglioramenti di prestazioni non sono eclatanti. Anche nei benchmark NVIDIA, i guadagni erano nell'ordine delle unità.

# Label Smoothing (Loss)
Finora si è sempre applicato softmax all'output del modello per ottenere il risultato. L'idea qui è di usare l'output grezzo del modello rappresentando le label come numeri reali.

Per esempio:
> [0,1,0,0]

Questo output del modello diventa:
> [0.025, 0.925, 0.025, 0.025]

La loss viene calcolata con queste label trasformate. Il metodo esatto per la conversione in valori reali può variare, ma per quanto ne so si tratta essenzialmente di un calcolo di rapporti.

# ArcFaceLoss
Concetto: https://aimaster.tistory.com/93
Implementazione: https://www.kaggle.com/underwearfitting/pytorch-densenet-arcface-validation-training

Devo approfondire ancora..

# Regolazione del pivot di classe
La feature age delle classi attuali forma 3 gruppi con soglie a 30 e 60 anni. Osservando la distribuzione delle classi, ci sono pochissime persone intorno ai 30 anni e sopra i 60. A causa di questo sbilanciamento, ho provato a manipolare i confini delle classi durante l'addestramento, ottenendo prestazioni migliori.

## Analisi
Rispetto a feature come il genere o l'uso della mascherina, che sono discretamente e chiaramente distinguibili, l'età è ambigua sotto molti aspetti. Anche persone con molta esperienza spesso non riuscirebbero a distinguere tra un 29enne e un 30enne.

Ho quindi pensato che modificare i pivot point delle classi non si sarebbe allontanato troppo dall'intento di apprendere correttamente l'età.

## Risultati
Spostando le soglie da 30 e 60 a 29 e 59 si è ottenuto un miglioramento costante del f1 score di circa 0.05. Tuttavia, cambiando le soglie a 29 e 58 le prestazioni sono peggiorate.

# Wandb
Ho modificato il trainer per aggiornare le seguenti metriche ad ogni step:
> acc, loss, val_acc, val_loss, f1_score, val_f1_score, learning_rate

Ho organizzato i workspace con tag multipli per facilitare il filtraggio successivo. Ho deciso di aggiungere tag per le tecniche di augmentation principali e per gli altri metodi distintivi usati durante l'addestramento.
