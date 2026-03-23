---
title: "MRC basato sulla generazione"
description: "MRC basato sulla generazione con modelli seq2seq come BART: confronto con l'approccio estrattivo, preprocessing e strategie di decodifica."
date: "2021-10-13T04:58:10.269Z"
tags: ["nlp"]
lang: it
translationOf: "generation-based-mrc"
draft: false
---

# Generation-based MRC
Un task in cui il modello legge un contesto e una domanda, poi genera una risposta.
Mentre l'extraction-based MRC estrae le probabilità di risposta per ogni token dal contesto, il generation-based MRC è, come suggerisce il nome, un task di generazione.

In altre parole, l'extraction-based MRC può essere convertito in un task generation-based, ma non il contrario.

## Valutazione
Si possono usare EM e F1 score come nell'extraction-based, ma BLEU e ROUGE sono più comuni.

## Panoramica
![](/assets/images/Generation-based MRC/32a731fb-0dc3-4d28-b252-8be2e304e21f-image.png)
A differenza dell'extraction-based, i modelli generation-based producono la risposta direttamente. È essenzialmente Seq2Seq. Dato che BERT ha solo un encoder, non può essere usato in modalità Seq2Seq.

## Differenze dall'extraction-based
- Extraction-based
  - PLM (Pre-trained Language Model) + Classifier
  - Calcola la loss per trovare la posizione della risposta nel contesto
  - Richiede un processo per convertire l'output del modello in una risposta
- Generation-based
  - Seq2Seq PLM
  - Generazione di testo in forma libera

## Pre-processing
Più semplice dell'extraction dato che non serve individuare la posizione della risposta. Basta passare domanda e risposta così come sono.

**Tokenization**
- WordPiece Tokenizer

**Token speciali**
![](/assets/images/Generation-based MRC/1e3354fe-1249-43d6-a755-04703431eb46-image.png)

Come nei LM standard, si possono usare CLS, SEP, PAD, ma alcuni modelli usano token come "question" e "context" per separare le frasi (come mostrato a destra). Varia da modello a modello, quindi bisogna controllare il formato richiesto.

**Attention mask**
Gestita come nei LM standard, uguale all'extraction-based.

**Token type IDs**
A differenza di BERT, BART non distingue tra le sequenze, quindi non ci sono token type IDs.

**Rappresentazione dell'output**
![](/assets/images/Generation-based MRC/7d2da16f-64d5-4977-9319-74b830ba8d07-image.png)

Essendo Seq2Seq, non serve un'elaborazione speciale per la forma di output del decoder.

## Modello
![](/assets/images/Generation-based MRC/0cc99423-340d-4156-b459-1f0c551e9353-image.png)
L'MRC richiede Seq2Seq, quindi serve un modello con sia encoder che decoder -- non solo un encoder (BERT) o solo un decoder (GPT).

BART è chiamato denoising autoencoder. Prende frasi mascherate in input (come BERT) e genera frasi (come GPT). Assomiglia a un autoencoder per frasi rumorose, da cui il nome.

![](/assets/images/Generation-based MRC/e4de4ada-097a-4cb5-9c7b-bb80ed0d76e0-image.png)

BART
- Encoder: bidirezionale come BERT
- Decoder: unidirezionale (autoregressive) come GPT

### Pre-training di BART
![](/assets/images/Generation-based MRC/5e37832b-03d0-4635-8094-8cf90ba60ea3-image.png)

BART maschera le frasi e ricostruisce gli originali. Questa capacità di ricostruzione viene poi applicata ai task di generazione.

## Post-processing
Sono disponibili diverse strategie di decodifica:
- Greedy search
- Exhaustive search: esaminare tutte le possibilità
- Beam search: exhaustive search ma mantenendo solo i top-k
