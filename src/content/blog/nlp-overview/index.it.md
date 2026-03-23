---
title: "Panoramica NLP"
description: "Panoramica sui fondamenti dell'NLP: tokenizzazione, NER, sentiment analysis, traduzione automatica e l'impatto del Transformer."
date: "2021-09-06T04:45:14.931Z"
tags: ["nlp"]
lang: it
translationOf: "nlp-overview"
draft: false
---

# NLP (Natural Language Processing)
Si divide in NLU e NLG.
- NLU (Natural Language Understanding): comprendere l'intento del linguaggio
- NLG (Natural Language Generation): insegnare alle macchine come generare linguaggio naturale

- Conferenze principali: ACL, EMNLP, NAACL

## Low-level Parsing
Task di basso livello per l'estrazione del significato:
### Tokenization
ref: https://bkshin.tistory.com/entry/NLP-2-%ED%85%8D%EC%8A%A4%ED%8A%B8-%ED%86%A0%ED%81%B0%ED%99%94Text-Tokenization
- Token: la piu piccola unita linguistica grammaticalmente indivisibile
- Corpus: un insieme di testi; un campione testuale
- Tokenization: separare un corpus in token

In altre parole, una frase viene intesa come una sequenza di token.

### Stemming
- Stem: la radice di una parola
- Stemming: estrazione della radice

Sia in inglese che in coreano, le parole possono avere varie forme flessionali attaccate alla radice o al suffisso. Lo stemming rimuove queste flessioni per estrarre solo il significato originale.

## Livello di parola e frase
### NER (Named Entity Recognition)
Il processo di riconoscimento di entita con nome (nomi propri, ecc.) composte da piu parole. Riconoscere nomi di persone, orari, aziende, ecc.

### POS (Part of Speech) Tagging
Determinare la classe grammaticale delle parole.

## Livello di frase
### Sentiment Analysis
Analisi del sentimento delle frasi. Valutare se positivo/negativo, ecc.

### Machine Translation
Traduzione automatica. Eseguita tenendo conto della grammatica e dell'ordine delle parole della lingua di destinazione.

## Livello multi-frase e paragrafo
### Entailment Prediction
Previsione delle relazioni di contraddizione logica tra due frasi.

### Question Answering
Comprendere il significato delle frasi e fornire la risposta desiderata dall'utente.

### Dialog System
Un task per gestire conversazioni, come i chatbot.

### Summarization
Un task per riassumere documenti.

# Text Mining
- Conferenze principali: KDD, The WebConf (ex WWW), WSDM, CIKM, ICWSM

- Estrarre informazioni utili e insight da dati testuali e documentali
  - es. analizzare l'immagine pubblica di una persona nel tempo, analizzare la frequenza delle keyword per capire le reazioni del pubblico
- Document clustering (topic modeling)
  - Raggruppare termini con significati diversi nello stesso gruppo
  - es. usare keyword come rapporto qualita-prezzo, durabilita, assistenza per esplorare le reazioni a un prodotto
- Strettamente legato alla computational social science
  - es. scoprire insight sociali analizzando dati dei social media

# Information Retrieval
Tecnologie legate alla ricerca.
- Le tecnologie di ricerca usate da Google, Naver, ecc. sono cosi avanzate che i progressi hanno rallentato.
- L'area di ricerca piu attiva sono i sistemi di raccomandazione.
  - es. un motore di ricerca suggerisce proattivamente contenuti che l'utente potrebbe cercare

# Trend dell'NLP
Sviluppo della CV di 2-3 anni fa:
- Progresso rapido grazie a nuovi metodi di impilamento di layer convoluzionali e uso delle GAN

NLP:
- Si e sviluppato relativamente lentamente rispetto alla CV prima del Transformer.
- Modelli basati su RNN come LSTM e GRU erano predominanti.
- Dopo il paper del 2017 "Attention is All You Need", quasi tutti i modelli NLP usano transformer basati su self-attention.

## Transformer
Originariamente progettato per la traduzione automatica.
Prima del deep learning, la traduzione automatica richiedeva esperti per definire e mappare manualmente tutte le regole linguistiche.

Con il deep learning, input e output delle RNN venivano addestrati con lingue diverse aventi lo stesso significato. Grazie a molte tecniche, le prestazioni della traduzione automatica basata su RNN avevano raggiunto il loro massimo.

Il transformer ha mostrato prestazioni ancora migliori delle RNN per la traduzione. Dopo la sua introduzione, e stato applicato anche all'elaborazione di immagini, previsioni di serie temporali, scoperta di farmaci, scoperta di nuovi materiali, ecc.

Normalmente si sviluppano modelli specializzati per ogni dominio e situazione. Ma dopo il transformer, grandi modelli costruiti impilando self-attention sono stati addestrati con self-supervised learning per gestire task generici. Questi modelli, applicati a domini specifici tramite transfer learning con modifiche strutturali minime, si sono dimostrati superiori ai modelli specializzati.

### Supervised learning nell'NLP
E simile al riempimento di spazi vuoti. Per esempio, in "I study math," si cancella "study" e si addestra il modello a inferire quale parola va li. In questo esempio, lo spazio per "study" e dove va un verbo, e i verbi che possono avere "math" come oggetto sarebbero i candidati.

Modelli addestrati cosi includono BERT, GPT, ecc.

Si puo vedere la tecnologia progredire dall'IA che gestisce solo task specifici verso un'IA piu generale.

Ma questo self-supervised learning richiede enormi quantita di dati e risorse GPU. Anche Tesla avrebbe speso miliardi solo in elettricita per l'addestramento dei modelli...

### Word Embedding
Rappresentare le frasi come vettori nello spazio vettoriale sotto forma di sequenze.