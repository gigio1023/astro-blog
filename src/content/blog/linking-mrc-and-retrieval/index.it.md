---
title: "Collegare MRC e Retrieval"
description: "Approfondimento sull'Open Domain Question Answering, coprendo l'approccio Retriever-Reader, distant supervision e strategie di granularità dei passaggi."
date: "2021-10-17T08:45:26.446Z"
tags: ["nlp"]
lang: it
translationOf: "linking-mrc-and-retrieval"
draft: false
---

# Open Domain Question Answering (ODQA)

A differenza dell'MRC discusso in precedenza, l'ODQA richiede il passage retrieval da domini ampi come l'intero web o tutta Wikipedia. Il formato input/output resta lo stesso.

![](/assets/images/Linking MRC and Retrieval/93ec9529-7aa0-414d-b8d4-ae4678b4a60a-image.png)

![](/assets/images/Linking MRC and Retrieval/f2a1963a-29fb-44b8-a928-f56b8d24f681-image.png)

- Non viene fornito un contesto separato.
- QA basato sulla conoscenza del mondo
  - I motori di ricerca moderni rientrano in questa categoria.
  - Forniscono non solo documenti rilevanti ma anche risposte rilevanti.

## Storia dell'ODQA
![](/assets/images/Linking MRC and Retrieval/156edb4a-ae2f-4273-b2c5-995b74906aa4-image.png)

I QA Track (1997-2007) alla Text Retrieval Conference (TREC) hanno studiato task in stile ODQA.

La struttura di Question Processing, Passage Retrieval e Answer Processing è molto simile all'architettura attuale. L'obiettivo non era un semplice Information Retrieval (IR) ma risposte brevi con supporto -- dove "supporto" indica il documento contenente la risposta. Il task richiedeva sia la risposta che il documento di supporto.

### Question Processing
Dato che i modelli DL/ML non erano ancora avanzati, l'approccio consisteva nel selezionare parole chiave dalle domande e fare answer type selection su di esse.

### Passage Retrieval
Molto simile all'ODQA attuale.
1. Usare l'IR esistente per estrarre documenti rilevanti
2. Dividere i documenti in passaggi e selezionare quelli rilevanti
3. Usare feature hand-crafted come entità nominate e conteggio delle parole in comune con la domanda per la selezione. Es., TF-IDF, BM25

### Answer Processing
Un classifier con feature hand-crafted e euristiche determinava quale documento usare per una data domanda.

L'MRC attuale deriva le risposte a livello di span nei passaggi, quindi ci sono differenze rispetto a questo approccio più vecchio nell'answer processing.

## Ricerca recente sull'ODQA
![](/assets/images/Linking MRC and Retrieval/3d2fb8a1-7627-4bb8-98c0-e524311b29c4-image.png)

# Approccio Retriever-Reader
L'ODQA può essere risolto usando il Retriever e il Reader (modello MRC) dal lavoro MRC precedente.
- Retriever: cerca documenti rilevanti da un DB
  - Input: corpus di documenti, query
  - Output: documento
  - Training
    - TF-IDF, BM25: self-supervised learning senza dati etichettati
    - Dense: trainato usando dataset QA
- Reader: estrae risposte dai documenti recuperati
  - Input: documento recuperato, query
  - Output: risposta
  - Training
    - Trainato su dataset MRC come SQuAD
    - Dati di training aggiuntivi possibili tramite distant supervision

## Distant Supervision
I dataset che hanno solo coppie domanda-risposta non indicano quale documento contiene la risposta.
Es., CuratedTREC, WebQuestions, WikiMovies

Ma il Reader ha bisogno di un documento oltre alla domanda e alla risposta per il training. Quindi quando serve un documento di supporto, bisogna trovare da soli dove si trova la risposta. Questo processo si chiama distant supervision.

1. Usare il Retriever per cercare documenti altamente rilevanti
2. Filtrare:
   - Rimuovere documenti troppo corti o troppo lunghi
   - Rimuovere documenti che non contengono le entità nominate della domanda
   - Rimuovere documenti dove la risposta non appare come corrispondenza esatta
3. Dai documenti rimanenti, selezionare il paragrafo più rilevante in base all'uso delle parole come evidenza di supporto

## Inference
- Retriever
  - Restituisce i 5 documenti più rilevanti per la domanda
- Reader
  - Legge 5 documenti e predice le risposte
  - La risposta predetta dal reader con il punteggio più alto viene usata come risposta finale

# Problemi e approcci recenti
## Diverse granularità del testo al momento dell'indicizzazione
Usando dati Wikipedia, la granularità dell'indicizzazione deve essere definita in anticipo. Le scelte comuni sono articolo, paragrafo e frase.

![](/assets/images/Linking MRC and Retrieval/2b5da2bb-92f3-45de-bf99-3d5952eaf7ef-image.png)

Il top-k del Retriever varia in base alla granularità. La tabella sopra mostra i valori tipici di k. Anche i punteggi variano leggermente con la granularità.

**Aumentare k di solito migliora le prestazioni, ma non sempre.** Tunare k è importante anche nelle competition MRC.

## Single passage training & Multi-passage training

**Single-passage training**
L'approccio discusso finora. Il Retriever restituisce k documenti e il Reader calcola risposte e punteggi per ciascuno, selezionando il migliore. Si esaminano più documenti, ma dal punto di vista del Reader ogni passaggio viene elaborato individualmente -- da qui "single passage training." Non considera le correlazioni tra i documenti forniti dal Retriever.

**Multi-passage training**
Tratta tutti i passaggi recuperati come un singolo passaggio. A differenza del single-passage, addestra il Reader considerando le relazioni tra tutti i passaggi.
I documenti di training diventano molto lunghi, quindi il costo GPU aumenta.

## Importanza di ciascun passaggio
![](/assets/images/Linking MRC and Retrieval/97556851-9de6-42e9-97b2-a8c4ec1fa922-image.png)
Un approccio che mantiene i punteggi dei passaggi del Retriever e li usa nel calcolo del punteggio finale.
