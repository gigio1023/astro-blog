---
title: "Tuning degli hyperparameter"
description: "Panoramica dei metodi di tuning degli hyperparameter tra cui grid search, random search e ottimizzazione bayesiana, con introduzione a Ray per il tuning parallelo."
date: "2021-08-22T19:43:58.594Z"
tags: ["pytorch", "dl"]
lang: it
translationOf: "hyperparameter-tuning"
draft: false
---

# Tuning degli hyperparameter

## Hyperparameter
Valori che lo sviluppatore deve impostare manualmente:
- learning rate
- dimensione del modello
- tipo di optimizer
- epoch
- ecc...

## Panoramica
- Tra modello, dati e hyperparameter, i valori degli hyperparameter sono i meno importanti.
  - Il modello è il più importante, ma i buoni modelli sono generalmente ben noti.
  - Quindi i dati tendono a essere la priorità.
  - Non investire troppo sforzo negli hyperparameter.
- Detto questo, se si insegue l'ultimo 0.01 di prestazione, è indispensabile.
- Recentemente, i modelli NAS basati su AutoML gestiscono il tuning degli hyperparameter automaticamente.
- Recipe: quando il modello stesso prescrive come tunare i propri hyperparameter.

## Metodi
- Grid: ricerca a intervalli fissi
- Random: ricerca casuale
- Recentemente si usano anche metodi bayesiani (BOHB)

# Ray
- Modulo multi-nodo e multi-processing.
- Originariamente progettato per ML/DL, ma è diventato un modulo di parallelizzazione generico per Python.
- Durante il tuning degli hyperparameter, fa pruning anticipato delle configurazioni poco promettenti.
