---
title: "Trend dell'NLP"
description: "Panoramica sui trend dell'NLP: reinforcement learning per summarization e QA, e approcci multimodali NLP+CV come Show and Tell e GLAC Net."
date: "2021-10-29T09:55:54.188Z"
tags: ["nlp"]
lang: it
translationOf: "nlp-trends"
draft: false
---

# NLP + RL
## A Deep Reinforced Model for Abstractive Summarization

NLP con RL, dove migliorare il punteggio ROUGE e impostato come reward.

## DCN+
Mixed objective and deep residual coattention for question answering.

I modelli QA esistenti a volte estraggono risposte errate, e l'RL viene usato per risolvere questo problema.

Vengono usati sia la loss RL sia la loss del modello NLP (cross-entropy).

1) Mixed objective function: cross entropy loss + self-critical policy learning --> riduce il divario tra il metodo di valutazione e la loss function
2) Residual co-attention encoder: deep self-attention + residual network

## Dialogue Generation
https://github.com/lvwerra/trl
- Training RL con l'empatia come reward.
- Si usano tre modelli: un modello generativo (GPT-2), un modello di valutazione dell'empatia (BERT, RoBERTa) e un modello RL per l'empatia.

# NLP + CV
## Description Generation
- Descriptions of Images in Isolation (DII)
  - Descrivere le immagini singolarmente
- Descriptions of Images in Sequence (DIS)
  - Descrivere piu immagini
- Stories of Images in Sequence (SIS)
  - Generare una storia da piu immagini

### Show and Tell
https://arxiv.org/pdf/1411.4555.pdf

Un modello che genera embedding delle immagini tramite CNN e genera frasi tramite RNN. Questo paper ha dato il via ai tentativi di risolvere image-to-text con il deep learning.

### GLAC Net
https://arxiv.org/pdf/1805.10973.pdf

Un paper della Seoul National University che genera una singola storia da piu immagini.
- Due meccanismi di attention vengono combinati in un unico gruppo di attention (qui chiamato GLocal attention).
  - Local attention: embedding per le singole immagini
  - Global attention: embedding per le immagini multiple