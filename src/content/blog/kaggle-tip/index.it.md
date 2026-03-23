---
title: "Consigli per Kaggle"
description: "Consigli pratici per le competition Kaggle: sistemi di ranking, tipi di competition, strategie di validazione, metodi di ensemble e raccomandazioni hardware."
date: "2021-09-23T06:35:03.433Z"
tags: ["naver-boostcamp", "ai-competition"]
lang: it
translationOf: "kaggle-tip"
draft: false
---

# Piattaforme di competition
- Kaggle
- Kakao Arena: a quanto pare limitata alle loro sussidiarie.
- Dacon: competition pubbliche. Sta gradualmente adottando le pratiche di Kaggle.

# Ranking
- Sistema di ranking: classifiche determinate dai punti competition
  - Gareggiando in team, i punti vengono divisi per $\sqrt{N}$.
- Sistema di tier: determinato dal numero di medaglie nelle competition

# Competition
## Scopo
- Featured
  - Competition commerciali
  - I modelli vincenti vengono talvolta usati dalle aziende.
- Research
  - Competition orientate alla ricerca
  - Temi interessanti ma montepremi più bassi, a quanto pare.
- Getting Started & Playground
  - Competition per principianti come la predizione dei sopravvissuti del Titanic
  - Non per punti o medaglie
- Analytics
  - Competition di analisi dati
  - Si inviano notebook di esplorazione e visualizzazione dati
- Recruitment
  - Scopo assunzione

## Invio
- General competition
  - Nessun vincolo di risorse
  - Basta inviare submission.csv
- Code competition
  - Bisogna eseguire un notebook Kaggle per generare submission.csv
  - Limiti di risorse applicati
  - Progettato per incentivare la costruzione di modelli pratici

# Processo della competition
![](/assets/images/Kaggle tip/a6770f33-28bd-4a3e-a95a-30f9e76912e4-image.png)

Un diagramma di workflow già visto. Le differenze:
- Si usano notebook Kaggle
- Si possono consultare i notebook di altri
  - Ogni notebook ha uno scopo diverso: es., train, inference, preprocessing...

# Per vincere
## Iterazione veloce ed efficiente della pipeline
  - Investire in hardware GPU
    - Un grandmaster Kaggle coreano usa Ryzen 3700, 64GB RAM e 2x RTX 2080 Ti.
    - Con 2+ GPU, consigliava GPU con raffreddamento blower.
    - Pensavo che i ricercatori avessero bisogno di setup multi-GPU, ma sorprendentemente una singola RTX 3090 o 3080 funziona bene. Anche se 2x 3090 è meglio.
    - Sempre grato alla Polonia e CDPR per avermi permesso di comprare una RTX 3070 a 720.000 won.
  - Investire il proprio tempo
    - Dicono di dedicare 4+ ore nei giorni feriali e 8+ ore nei weekend per 1-2 mesi.
  - Una propria baseline che funzioni come template
    - Velocizza lo sviluppo e riduce gli errori.
    - Hanno vinto 3 medaglie d'oro in 3 mesi usando [questo setup](https://github.com/lime-robot/categories-prediction).

## Miglioramento del punteggio
- Cercare buone idee nella tab Notebook e Discussion della competition.
  - Augmentation, architetture deep learning
  - Paper rilevanti
- Hanno sottolineato fortemente di non abbassare la guardia fino alla fine.

## Strategia di validazione
Una metodologia per ridurre il divario tra i punteggi del training set e del test set.

Essenziale per prevenire cali nella classifica finale. La Public LB (Leaderboard) e la Private LB sono diverse, quindi evitare l'overfitting alla Public LB.

- Recentemente, la tendenza è non rivelare il test set.
- Estrarre il validation set dal training set
  - K-fold validation
  - Stratified k-fold
    - Generare validation set per classe

## Ensemble
Nella maggior parte dei casi, gli ensemble superano i modelli singoli. Tendenze recenti su Kaggle:
Fare ensemble di architetture diverse tende a funzionare meglio. Es., LSTM + BERT

- Stratified k-fold ensemble
  - Non usarlo solo per la validazione -- fare ensemble di quei modelli
- Dati tabulari
  - LightGBM, CatBoost, XGBoost, NN
- Dati immagine
  - ResNet, EfficientNet, ResNeXt
- Dati testuali
  - LSTM, BERT, GPT-2, RoBERTa

## Miglioramento del modello singolo
Non si può fare ensemble dall'inizio. Prima bisogna migliorare i modelli singoli fino a un certo punto, poi tentare l'ensemble. Stabilire una soglia di arresto è importante:

- Punteggi del modello singolo menzionati dai top ranker nella discussion
- Essere nei primi 50 con un modello singolo 1-2 settimane prima della fine

# Consigli vari
- Il team è meglio. Due mesi o più da soli sono troppi.
- I team non possono essere sciolti, quindi scegliere con cura.
- Controllare la classifica attuale dei potenziali compagni di team. A quanto pare alcune persone sono sorprendentemente pigre.
- Gestione delle versioni in cartelle tipo v1, v2.
  - Si fa per lasciare aperta la possibilità di fare ensemble tra versioni organizzate per cartella.
  - Dicono di usare il VCS solo per gli upload finali. Nessun version control per il resto. Approccio interessante.
