---
title: "MRC"
description: "Introduzione alla Machine Reading Comprehension: tipi di dataset, sfide chiave come la coreference resolution e il ragionamento multi-hop, e metriche di valutazione."
date: "2021-10-12T01:31:41.828Z"
tags: ["nlp"]
lang: it
translationOf: "mrc"
draft: false
---

# MRC
Machine Reading Comprehension.
Il task di comprendere un contesto dato e inferire risposte a query/domande.

L'obiettivo finale e rispondere a coppie QA che non esistono nel dataset MRC di training, utilizzando dati esterni.


## Extractive Answer Datasets
La risposta a una domanda esiste sempre come segmento (o span) all'interno del contesto dato.

### Cloze Tests
es., CNN/Daily Mail, CBT
![](/assets/images/MRC/695e12f4-531e-4065-8862-e9b5686405e4-image.png)
Anche se segue il formato Question-Answering, le domande non sono nella forma completa che si desidera per MRC.

### Span Extraction
es., SQuAD, KorQuAD, NewsQA, Natural Questions
![](/assets/images/MRC/faeb59eb-be0f-4f4f-a8ec-88ca8ddc1710-image.png)

## Descriptive Narrative Answer Datasets
Invece di estrarre una risposta come span nel contesto, la risposta e determinata come frase generata (o free-form) basata sulla domanda.

es., MS MARCO, Narrative QA
![](/assets/images/MRC/7362e732-73ef-4df1-b60b-0710b6d5c3b9-image.png)

## Multiple-choice Datasets
Un task dove la risposta a una domanda viene selezionata tra i candidati. Si dice che non sia ideale per costruire modelli MRC QA.
es., MCTest (ritenuto il primo dataset MRC pubblico, rilasciato nel 2013), RACE, ARC

# Sfide nella MRC
## Paraphrased paragraph
![](/assets/images/MRC/09a179cc-8a14-4813-bcd5-7e9c12647b20-image.png)
P1 e P2 sono frasi con lo stesso significato. Sono frasi parafrasate.

P1 contiene parole chiave della domanda come 'selected' e 'mission', e la struttura della frase e semplice. Quindi se il modello riesce a trovare P1 nel contesto, dovrebbe essere facile rispondere alla domanda.

Ma P2 non contiene affatto le parole della domanda, e la struttura della frase e piu difficile.

Un modello MRC deve essere in grado di trovare risposte sia in P1 che in P2.

## Coreference resolution
![](/assets/images/MRC/5734c92e-d1ff-4a38-a816-d59aac0083b8-image.png)
La coreference si riferisce a entita che si riferiscono reciprocamente alla stessa cosa. La coreference resolution e il riconoscimento di queste entita come la stessa entita.
ref: [Blog](https://jjdeeplearning.tistory.com/26)


## Domande senza risposta
Ci sono chiaramente casi in cui la risposta non puo essere determinata solo dal contesto. Ma un modello immaturo potrebbe forzare una risposta comunque.

Quindi per le domande senza risposta, il modello dovrebbe rispondere che non puo fornire una risposta.

## Multi-hop reasoning
Un task dove bisogna trovare fatti di supporto da piu documenti per rispondere alla domanda.

es., HotpotQA, QAngaroo
![](/assets/images/MRC/fb6e8b56-1c99-4f3d-b901-b3d0f08b3010-image.png)


# Metodi di valutazione
## Exact Match, F1 score
Metodi di valutazione usati quando la risposta esiste nel passaggio (extractive answer) e per dataset a scelta multipla.

- Exact Match (EM) o Accuracy
  - Il rapporto di predizioni che corrispondono **esattamente** alla ground truth
  - (Numero di campioni corretti) / (Numero totale di campioni)
- F1 score
  - Calcola il punteggio F1 basato sulla sovrapposizione di token tra risposta predetta e ground truth

## ROUGE-L, BLEU
Metodi di valutazione per risposte descrittive.
- ROUGE-L Score
  - Recall di sovrapposizione tra predizione e ground truth
- BLEU
  - Precision tra risposta predetta e ground truth
