---
title: "MRC basato sull'estrazione"
description: "Machine reading comprehension basato sull'estrazione: predizione di span con BERT, preprocessing, fine-tuning e post-processing."
date: "2021-10-13T04:09:10.578Z"
tags: ["naver-boostcamp"]
draft: false
lang: it
translationOf: "extraction-based-mrc"
---

# Extraction-Based MRC
La risposta esiste sempre come span all'interno del contesto dato.
Invece di generare la risposta, il problema si restringe a trovare la risposta nel contesto.
es., SQuAD, KorQuAD, NewsQA, Natural Questions
![](/assets/images/Extraction-Based MRC/722a0e0b-0d30-4a1b-9385-39bff9ad45ab-image.png)

Scaricare questi dataset da HuggingFace Datasets è il modo più semplice.

## Metriche
### Exact Match (EM) Score
Dà 1 punto solo se il valore predetto e la risposta corrispondono esattamente a livello di carattere. 0 punti se anche un solo carattere è diverso.

### F1 score
Calcolato come rapporto di sovrapposizione tra predizione e risposta, quindi il range del punteggio è [0, 1].
![](/assets/images/Extraction-Based MRC/312d9333-731d-4210-91e8-c34a0cdc3522-image.png)


## Panoramica
![](/assets/images/Extraction-Based MRC/e320aa87-c2e7-4e26-bb65-a541bdbce9f5-image.png)

## Pre-processing
**Tokenization**
- Recentemente, il Byte Pair Encoding (BPE) è molto usato.
  - Risolve i problemi di Out-of-vocabulary (OOV)
  - Vantaggi informatici (?)
- Si userà il WordPiece Tokenizer tra le varianti BPE
  - Segmenta in base ai token più frequenti

**Attention mask**
- Si verifica nel Positional Embedding
- Di solito 0 significa ignorare, 1 significa includere nel calcolo

**Token type IDs**
- La Question riceve 0, il Context riceve 1 come mask, indirizzando il modello a cercare la risposta solo nella zona dove appare 1
- Quindi anche i token PAD ricevono 0

**Posizione della risposta**
Dopo la tokenizzazione, l'indice della risposta cambia. Serve preprocessing per questo.
Di solito servono solo gli indici di inizio e fine, quindi basta trovare lo span che contiene la risposta.

## Fine-tuning
![](/assets/images/Extraction-Based MRC/88682340-7783-48f2-bdf1-12f6ef10e851-image.png)

Si modifica il layer di output di BERT in modo che ogni token nel Context produca due valori:
- Probabilità che questo token sia il token di inizio della risposta
- Probabilità che questo token sia il token di fine della risposta

Una volta calcolati tutti i valori di probabilità, si può calcolare la cross-entropy loss rispetto al ground truth. Il resto procede come al solito: si applica softmax e si calcola la negative log likelihood per il training. [ref](https://airsbigdata.tistory.com/202)

## Post-processing
**Rimuovere risposte impossibili**
- La posizione finale è prima della posizione iniziale
- La posizione predetta è fuori dal range del contesto
- Più lunga di max_answer_length


**Trovare la risposta ottimale**
1. Trovare i top N ciascuno dalle predizioni di posizione start/end per score (logits).
2. Rimuovere le combinazioni start/end impossibili.
3. Ordinare le combinazioni possibili per somma degli score in ordine decrescente.
4. Selezionare la combinazione con lo score più alto come predizione finale.
5. Se serve il top-k, restituirle in ordine.
