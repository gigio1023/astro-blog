---
title: "Dense Embedding"
description: "Dense embedding per il passage retrieval: training di bi-encoder con contrastive learning e strategie di negative sampling."
date: "2021-10-14T06:43:17.095Z"
tags: ["nlp"]
draft: false
lang: it
translationOf: "dense-embedding"
---

# Problemi dello Sparse Embedding
![](/assets/images/Dense Embedding/759edf0c-3b21-4ea7-9af2-bcd7a210a0c1-image.png)
- Nel Passage Embedding, lo Sparse Embedding ha di solito oltre il 90% dei valori del vettore a 0.
- Il numero di dimensioni è molto grande.
  - Superabile con formato compresso.
- Non riesce a considerare la similarità.
  - Anche parole molto simili vengono embeddate in dimensioni completamente diverse se i caratteri differiscono. Non c'è modo di rappresentare che parole simili hanno dimensioni simili.

# Dense Embedding
![](/assets/images/Dense Embedding/5861876f-3fec-4150-95a5-c6a95d4a6f4d-image.png)
- Vocabolario e dimensioni sono mappati ad alta densità.
  - Di solito 50-1000 dimensioni.
- La posizione di un termine deriva dalla combinazione di informazioni di tutte le dimensioni.
  - A differenza di BoW, una singola dimensione non rappresenta un singolo termine.
- La maggior parte degli elementi è diversa da zero -- porta significato.
- La dimensione è molto più piccola di BoW, quindi si possono applicare più tipi di algoritmi.

## Differenze dallo Sparse Embedding
- Sparse Embedding
  - Performance eccellente nella ricerca di corrispondenze esatte di termini
  - Non può essere ulteriormente allenato una volta costruito l'embedding
- Dense Embedding
  - Eccellente nel catturare la similarità e il contesto delle parole
  - L'embedding viene creato tramite training, ulteriore training possibile

Di solito lo sparse embedding da solo si usa raramente. Si usa o il dense embedding da solo o entrambi combinati per il retrieval.

## Panoramica del Passage Retrieval con Dense Embedding
![](/assets/images/Dense Embedding/17abd514-45b0-4b13-b4ea-0b615b6ca892-image.png)
Si estrae l'hidden state (valore CLS) per la query. Lo stesso per ogni passage. Supponendo che le dimensioni dei due hidden state corrispondano, si calcola la similarità tramite prodotto interno.

- $$BERT_Q, BERT_B$$ possono usare lo stesso modello o modelli pre-allenati separatamente. Configurare in base al task.


# Training del Dense Encoder
L'esempio è BERT, ma qualsiasi modello va bene. Basta che sia un PLM (Pre-trained language model).

- Modello MRC: inserisce query e answer insieme in un singolo PLM.
- Dense Encoder: prepara PLM separati per query e passage e inserisce ciascuno rispettivamente.
  - Per usare l'output finale di token CLS diversi!

![](/assets/images/Dense Embedding/c782ea0b-bb5b-42d4-b13e-7e415995db20-image.png)

Come menzionato, il Question encoder e il Passage encoder possono essere gli stessi o fine-tuned separatamente prima dell'uso.

## Obiettivo del training
Ridurre la distanza tra il dense embedding della question e del passage.
= aumentare il valore del prodotto interno
= trovare maggiore similarità.

![](/assets/images/Dense Embedding/4d4ceaa4-5cde-4bc2-8f9d-1c70efbb0866-image.png)

**Come allenare?**
- Si usano context e answer da dataset MRC esistenti.
  - es., SQuAD
- Per coppie question-passage correlate, si riduce la distanza del dense embedding.
  - alta similarità, positivo
  - Si usano context e answer reali dal dataset MRC così come sono.
- Per coppie question-passage non correlate, si aumenta la distanza del dense embedding.
  - Si usa un context arbitrario per l'answer dal dataset MRC.
![](/assets/images/Dense Embedding/55ba80a5-198f-4d7f-b657-f61f52967ba4-image.png)

**Scelta dei negative sample**
- Estrazione casuale dal corpus
- Estrazione progettata per confondere il modello
  - Sample con alto valore TF-IDF ma che non contengono la risposta

### Funzione obiettivo
Si usa la negative log likelihood (NLL) loss sul positive passage.
![](/assets/images/Dense Embedding/f74f181e-4973-4308-a835-8fe97fc4a198-image.png)

Obiettivo: convertire lo score del positive passage in una probabilità.
- Score di similarità tra positive passage e question
- Score per i negative sample
Si prendono entrambi gli score, si applica softmax, poi si calcola la negative log likelihood per il training.

La formula sopra esprime la negative log likelihood. È un negative log, quindi si aggiunge -log, e il softmax viene messo dentro il log. Il numeratore del softmax contiene l'elemento positivo, e il denominatore include anche gli elementi negativi -- perché il softmax è definito come (target / totale).

## Metrica di valutazione
- Verificare se il ground truth passage è incluso tra i passage recuperati
- Verificare il rapporto di passage recuperati che contengono la risposta
  - Per MRC extraction-based, se il passage non contiene la risposta, non si può produrre una risposta.
  - Quindi in forma di upper bound.

## Passage Retrieval con Dense Encoder
![](/assets/images/Dense Embedding/f00885ca-6af8-438c-99fa-ff2d676e3ddd-image.png)

Come mostrato nella panoramica. Si confrontano gli embedding pre-calcolati dei passage con l'embedding della query per distanza e si sceglie il passage più vicino.

![](/assets/images/Dense Embedding/9f7f3336-9f17-4167-85bd-a0e5405a05c0-image.png)

Si inseriscono il passage selezionato e la query nel modello MRC per ottenere la risposta.

## Migliorare il Dense Encoder
- Migliorare i metodi di training
  - es., DPR
- Migliorare il modello encoder
  - Modelli migliori di BERT
- Migliorare i dati
  - Più dati
  - Migliore preprocessing
