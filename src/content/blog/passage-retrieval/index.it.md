---
title: "Passage Retrieval"
description: "Fondamenti del passage retrieval per QA a dominio aperto: sparse embedding, TF-IDF e ricerca di similarita nello spazio vettoriale."
date: "2021-10-13T15:00:36.624Z"
tags: ["nlp"]
lang: it
translationOf: "passage-retrieval"
draft: false
---

# Passage Retrieval
Recuperare documenti (passage) che corrispondono a una query.
![](/assets/images/Passage Retrieval/b5526456-14fc-409d-83c4-ac2894f973f8-image.png)

Database
- In pratica si potrebbe usare un DBMS.
- Qui usiamo dati di Wikipedia.

## Passage Retrieval con MRC
Open-domain Question Answering: trovare risposte a domande da un grande insieme di documenti.

![](/assets/images/Passage Retrieval/540e7cbd-b9dd-49e6-8a8f-617385ab55b6-image.png)

Combinando passage retrieval con MRC si ottiene l'open-domain question answering.
- Passage Retrieval
  - Fornisce al modello MRC i contesti in cui probabilmente si trova la risposta.
- MRC
  - Ricava la risposta dal contesto dato.

## Panoramica
![](/assets/images/Passage Retrieval/fba64164-0725-4dd1-a80a-ffccca06482a-image.png)
Il passage retrieval cerca basandosi sull'embedding space.

- Si fanno l'embedding di query e passage nell'embedding space.
  - I passage vengono pre-embedded in batch per efficienza.
- Si calcolano i punteggi di similarita tra embedding di query e passage.
  - Calcolo della distanza vettoriale; distanza minore = piu simile.
  - Calcolo del prodotto interno; valore maggiore = piu simile.
- Si restituiscono i passage ordinati per similarita con la query.


## Passage Embedding
Come il word embedding, i passage vengono embedded per vettorizzarli.
![](/assets/images/Passage Retrieval/dcad009f-066d-4cbb-9305-6b451cdbec23-image.png)
La similarita viene calcolata tramite prodotto interno o distanza tra vettori nell'embedding space, come in qualsiasi embedding space tipico.

## Sparse Embedding
Sparse: l'opposto di dense. Pochissimi numeri non-zero presenti.

Un esempio rappresentativo e BoW (Bag of Words).
Ogni parola costituisce una dimensione, quindi quando si fa l'embedding di un documento servono tante dimensioni quante il vocabolario. La maggior parte dei valori sara inevitabilmente 0, con pochissime voci non-zero.

In BoW, aumentando n nell'n-gram le combinazioni possibili crescono esponenzialmente. Percio di solito si usano solo bigram (2-gram), occasionalmente trigram.

**Term Value**
- Binario: solo se un termine appare nel documento o no.
- Term frequency: quante volte un termine appare.
  - es. TF-IDF


**Caratteristiche dello Sparse Embedding**
- Dimensione del vettore di embedding = numero di termini
  - Cresce all'aumentare di n nell'n-gram.
- Utile quando serve rilevare con precisione la sovrapposizione di termini.
  - es. determinare se un termine e contenuto in un documento durante la ricerca.
- Non puo confrontare parole semanticamente simili ma diverse.
  - Per niente!

# TF-IDF
Term Frequency - Inverse Document Frequency

- TF (Term Frequency): quante volte una parola appare.
  - Si calcola raw count / num words e si normalizza.
  - Si usa anche la log normalization.
- IDF (Inverse Document Frequency): la quantita di informazione fornita da una parola.
- Parole che appaiono spesso: si giudica che forniscano poca informazione.
- Parole che appaiono raramente: si giudica che forniscano molta informazione.

**IDF**
![](/assets/images/Passage Retrieval/2fe016b3-3cc6-4ebd-8e60-a8f2ad0ff9c6-image.png)
$$DF(t)$$: il numero di documenti in cui appare il termine t.
- A differenza di TF, dipende solo dal termine.
- Meno documenti contengono il termine t, piu alto diventa IDF(t).

**TF-IDF**
$$TF-IDF = TF(t,d) \times IDF(t)$$
- Gli articoli avranno TF-IDF basso.
  - TF potrebbe essere alto, ma IDF converge a 0.
- I nomi propri rari avranno TF-IDF alto.
  - Anche se TF e basso, IDF e molto piu alto.

## Calcolo del TF-IDF
Si puo calcolare per ogni termine singolarmente, oppure moltiplicare le tabelle tra loro.
![](/assets/images/Passage Retrieval/5e75ae76-a297-45e7-b3b1-5066bd213300-image.png)

Le righe rappresentano singoli documenti. Le colonne rappresentano il vocabolario. In questo esempio, ogni documento contiene un solo elemento del vocabolario, quindi tutti i valori sono 0 o 1. I valori della tabella sono direttamente i valori TF.

![](/assets/images/Passage Retrieval/8fd60152-c21d-46c5-9325-919129b69437-image.png)

Valori IDF calcolati per ogni termine. Dato che IDF dipende solo dal termine, i valori sono uguali indipendentemente dal documento.

TF-IDF e semplicemente TF per IDF, quindi la moltiplicazione element-wise delle due tabelle da il TF-IDF completo.

![](/assets/images/Passage Retrieval/777f7b23-43cf-48e7-9c53-9707fac353e3-image.png)

## Utilizzo del TF-IDF
Puo essere usato per ottenere la similarita tra query e passage nel passage retrieval.

1. Tokenizzare la query.
2. Escludere i token non presenti nel vocabolario.
3. Trattare la query come un documento e calcolare il TF-IDF.
4. Calcolare i punteggi di similarita con i TF-IDF dei passage pre-calcolati.
5. Selezionare il passage con il punteggio piu alto.

![](/assets/images/Passage Retrieval/02dbcb40-5880-4361-bbb1-5b35dd7c33f8-image.png)

# BM25
Basato su TF-IDF. Considera anche la lunghezza del documento.
- Limita il valore TF.
- Da piu peso ai documenti piu corti della media quando un termine corrisponde.
- Un algoritmo ancora molto usato nei motori di ricerca, sistemi di raccomandazione, ecc.
![](/assets/images/Passage Retrieval/9d7e3b01-2b05-4954-9c90-b38278c77f1d-image.png)