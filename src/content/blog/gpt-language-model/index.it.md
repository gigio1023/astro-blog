---
title: "Modelli linguistici GPT"
description: "Evoluzione dei modelli linguistici GPT da GPT-1 a GPT-3: modifiche architetturali, zero/few-shot learning ed effetti dello scaling."
date: "2021-10-12T05:01:34.907Z"
tags: ["nlp"]
lang: it
translationOf: "gpt-language-model"
draft: false
---

- BERT: un modello di embedding
  - Usa il Transformer encoder
- GPT: un modello generativo
  - Usa il Transformer decoder

# Panoramica di GPT
![](/assets/images/GPT 언어 모델/2460ab0e-0bd1-426d-a664-61210c94f9f3-image.png)

Il processo di generazione del linguaggio è lo stesso che si studia normalmente per i language model. Predice sequenzialmente le parole successive più probabili in modo probabilistico.

![](/assets/images/GPT 언어 모델/e9d75507-faa0-4245-adaa-10d7239d739f-image.png)

GPT-1 era progettato per poter attaccare un classifier alla fine (come BERT) e fare fine-tuning per task specifici. Cronologicamente, GPT-1 è precedente a BERT.

GPT-1:
- Un decoder molto utile per la classificazione di frasi in linguaggio naturale.
- Prestazioni di classificazione elevate anche con pochi dati.
- Ha raggiunto la SOTA su vari task NLP immediatamente.
- Ha aperto la strada ai language model pre-trained e ha gettato le basi per BERT.
- Richiedeva apprendimento supervisionato, quindi servivano molti dati etichettati.
- Un modello fine-tunato per un task specifico non poteva essere usato per altri task.

La nuova ipotesi dei ricercatori GPT:
> Per la natura del linguaggio, la funzione obiettivo dell'apprendimento supervisionato è la stessa di quello non supervisionato. In altre parole, il fine-tuning non è necessario.

Questo perché le label nei dati etichettati sono anch'esse linguaggio.

Detto altrimenti: un language model addestrato su un dataset sufficientemente grande può eseguire tutti i task NLP.

# Zero-shot, one-shot, few-shot
![](/assets/images/GPT 언어 모델/d8863c8a-706a-45a6-bc3c-fb552188cb23-image.png)

Il fine-tuning per creare un modello dedicato a un solo task è stato ritenuto non necessario.
Come gli esseri umani non hanno bisogno di molti dati per imparare un nuovo task, lo stesso approccio è stato applicato ai language model -- inference tramite zero, one o few-shot.

Cioè, eseguire task senza alcun gradient update. Per rendere questo possibile, è stato sviluppato un modello addestrato su dataset enormi -- GPT-2.

# GPT-2
![](/assets/images/GPT 언어 모델/b59b94a8-92a9-412f-bed9-7ac1a0cf90b0-image.png)
Modifiche minori all'architettura del decoder rispetto a GPT-1.

I dati di training sono cresciuti da 11GB a 40GB.

![](/assets/images/GPT 언어 모델/9fb5cd35-efa5-4193-8b92-46c112fdae40-image.png)

- Nei task NLP come MRC, summarization e translation, le prestazioni erano al livello dei modelli neurali tipici.
- SOTA nella predizione della parola successiva.
- Ha aperto nuovi orizzonti per lo zero, one e few-shot learning.

# GPT-3
![](/assets/images/GPT 언어 모델/8fbc30df-8739-4bdd-b7f3-f6b92e8bdcb1-image.png)

- Dati di training: 570GB raffinati da 45TB.
- I parametri sono aumentati da 1.500M a 175.000M.

![](/assets/images/GPT 언어 모델/a207ac5b-5f92-480d-8a6a-6a6b4c5025cb-image.png)

- Inizializzazione modificata.
- Usato Sparse Transformer.

## Task di GPT-3
- Scrittura di articoli
  - Il 52% degli articoli di GPT-3 sono stati giudicati dai valutatori come scritti da un essere umano.
- Aritmetica
  - L'addizione di numeri a 2-3 cifre eseguita quasi perfettamente.
- Nelle QA ha superato alcuni modelli esistenti.
- Parsing dei dati
  - Ha automaticamente estratto dati da documenti organizzandoli in tabelle.

## Limitazioni
Anche GPT è un modello pre-trained tramite NSP (Next Sentence Prediction).
- Nessun weight update.
  - Non può apprendere nuove conoscenze.
- Aumentare solo la dimensione del modello è la soluzione?
  - Nessuno lo sa, ma probabilmente no.
- Non può usare informazioni multi-modali.
