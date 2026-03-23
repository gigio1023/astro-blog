---
title: "KLUE: Analisi delle dipendenze e classificazione di frasi singole"
description: "Panoramica dei task di dependency parsing e classificazione di frasi singole in KLUE, inclusa l'architettura del modello basata su BERT e la pipeline di training."
date: "2021-09-28T08:46:25.075Z"
tags: ["nlp"]
lang: it
translationOf: "klue-dependency-parsing-single-sentence-classification"
draft: false
---

# Analisi delle dipendenze (Dependency Parsing)
![](/assets/images/KLUE 의존 구문 분석, 단일문장 분류/2f3d6ea6-828b-4bdc-ad3e-4aafd0f00625-image.png)

- Testa (Head): il centro semantico
- Dipendente: complementa (modifica) il significato della testa
- Studiato principalmente in lingue come il coreano dove l'ordine delle parole è flessibile e l'omissione è comune

## Regole
- Le teste sono posposizionali
  - La testa appare sempre dopo il dipendente
- Ogni dipendente ha esattamente una testa, e viceversa.
- Non ci sono strutture di dipendenza incrociate.
  - L'annidamento è permesso però. Se A è testa di una parola, può simultaneamente essere dipendente di un'altra.

## Metodo di classificazione
Classificazione tramite sequence labeling.

## Applicazioni
- Le forme complesse del linguaggio naturale possono essere strutturate come grafi.
- Si possono estrarre informazioni su ciascuna entità.

# Task di classificazione di frasi singole
Determina a quale classe appartiene una frase data.
- Analisi del sentimento (Sentiment Analysis)
  - Classificare una frase come positiva/negativa/neutra, ecc.
  - Classificazione dei discorsi d'odio
  - Monitoraggio aziendale
- Etichettatura per argomento (Topic Labeling)
  - Classificare frasi in categorie
  - Classificazione di documenti su larga scala
  - VoC (Voice of Customer): classificare i feedback dei clienti
- Rilevamento della lingua (Language Detection)
  - Identificare in quale lingua è una frase
  - Traduzione
  - Filtraggio dei dati
- Classificazione dell'intento (Intent Classification)
  - Classificare l'intento di una frase
  - Chatbot: comprendere l'intento per generare risposte appropriate

## Dataset per la classificazione di frasi coreane
- Kor_hate
  - Dati sui discorsi d'odio
  - Espressioni di bias, non solo insulti
- Kor_sarcasm
  - Dati sulle espressioni sarcastiche
- Kor_sae
  - Dati sui tipi di domanda
  - Es.,
    - Domande sì/no
    - Domande su scelte alternative
    - Divieti, richieste, comandi
- Kor_3i4k
  - Dati relativi all'intento

## Architettura del modello di classificazione frasi
![](/assets/images/KLUE 의존 구문 분석, 단일문장 분류/9ad8aee3-cc16-4e21-9fe9-ca11aefd0de7-image.png)

Basato su BERT, con un classifier attaccato al CLS token per la classificazione delle frasi.

I parametri utilizzati sono i valori di configurazione standard di BERT:

- input_ids: token della sequenza in input
- attention_mask: maschera di [0,1] per distinguere i token di padding
- token_type_ids: [0,1] per distinguere la prima e la seconda frase
- position_ids: indici di embedding per ogni posizione della sequenza di input
- inputs_embeds: assegnare direttamente le rappresentazioni di embedding invece di input_ids
- labels: label per il calcolo della loss
- Next_sentence_label: label per la loss di predizione della frase successiva

## Processo di training
1. Preparare il dataset
2. Preprocessare e tokenizzare il dataset
3. Progettare il dataloader
4. Preparare i dataset di train e test
5. Configurare i TrainingArguments
6. Importare il modello pretrained
7. Configurare il Trainer
8. Trainare il modello
9. Implementare predizione e valutazione
