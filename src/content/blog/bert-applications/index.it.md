---
title: "Applicazioni di BERT"
description: "Applicazioni pratiche di BERT per analisi del sentiment, estrazione di relazioni, similarita semantica, NER e comprensione della lettura automatica."
date: "2021-09-27T16:09:51.308Z"
tags: ["nlp"]
lang: it
translationOf: "bert-applications"
draft: false
---

Questi sono argomenti trattati a lungo dal Professor Joo nelle sue lezioni. Riassumiamo il modello BERT insieme alla lezione dell'istruttore Kim Sunghyun presso SMAGE.

# Introduzione
![](/assets/images/BERT 응용/c3c6d777-d94f-4750-b8d6-c0a23993c127-image.png)

I language model si sono evoluti nell'ordine mostrato sopra. Inizialmente, encoder e decoder erano separati e sviluppati individualmente come RNN. L'attention e stata introdotta nel Seq2Seq per migliorare le prestazioni del decoder, e il transformer li ha unificati.

**Image AutoEncoder**
![](/assets/images/BERT 응용/5dc975bc-a5e6-41ec-9fd3-ee2b599848ac-image.png)
L'obiettivo di un AutoEncoder e riprodurre e ripristinare l'immagine originale. La rete comprime e memorizza le informazioni necessarie per riprodurre l'originale.

**BERT**
![](/assets/images/BERT 응용/43454042-079c-4bc8-a830-a5f3c57d4dc2-image.png)
Come l'AutoEncoder, l'obiettivo di BERT e riprodurre e ripristinare l'originale. Ma per aumentare la difficolta, viene applicato il masking prima della riproduzione. Dato che l'originale e il linguaggio naturale stesso, la rete e costretta ad apprendere il linguaggio naturale.

**BERT, GPT**
![](/assets/images/BERT 응용/4c3f4be7-eef3-4a54-8d5f-35c721c944c1-image.png)
A quanto pare GPT-1 e arrivato prima di BERT.
- GPT-1: usa solo il Transformer decoder per l'apprendimento del linguaggio naturale
- BERT: usa solo il Transformer encoder per apprendere il linguaggio naturale mascherato
- GPT-2: usa solo il Transformer decoder.
  - Rimuove il contenuto dopo un punto specifico nella sequenza e impara a inferire il resto

# BERT
Il processo di addestramento di BERT e il seguente. Questo produce un BERT pre-trained.
![](/assets/images/BERT 응용/78580aee-2eab-4188-8d4a-634fbd5d00cf-image.png)

- Le frasi 1 e 2 vengono inserite insieme, unite da un token [SEP].
- Il token [CLS] contiene informazioni su se le frasi 1 e 2 sono in una relazione di successione.
  - Il vettore del token [CLS] ha tutte le informazioni delle frasi di input fuse nel suo embedding.
  - Un classificatore e attaccato al token [CLS] per l'addestramento della classificazione della relazione next-sentence.

# Elaborazione dei dati
- Word Tokenizing
  - BERT usa WordPiece tokenizing.
  - Tokenizing basato sulla frequenza.
- Frase
  - La seconda frase e la frase successiva effettiva o una frase scelta casualmente.
- Masking
  - I token diventano candidati al masking con probabilita del 15%.
  - Tra i candidati, masking, sostituzione casuale e mantenimento invariato vengono scelti con rapporto 8:1:1.

# Applicazioni di BERT
Proviamo i benchmark tramite GLUE, KLUE e altri.

I benchmark rappresentativi sono i seguenti.
![](/assets/images/BERT 응용/2353a73e-49ae-49b5-8253-65542b5ba94c-image.png)
- Classificazione di frase singola
   - Classificazione da un singolo input di frase
- Classificazione della relazione tra due frasi
  - Classificare similarita, relazione, relazione next-sentence tra due frasi
- Classificazione dei token della frase
  - Attaccare un classificatore a ogni token per la classificazione dei token
  - NER (Named entity recognition)
- Comprensione della lettura automatica
  - Data una domanda e un documento contenente la risposta
  - Identificare la posizione della risposta nel documento

Esempi per ogni benchmark sono i seguenti.

## Analisi del sentiment
![](/assets/images/BERT 응용/e6d28e3d-e774-423e-ba79-032574bcc259-image.png)

Un task che giudica se la frase di input e positiva o negativa. Prima dell'arrivo di BERT nel 2018, questi task tipicamente mostravano circa l'85% di accuratezza. Dopo BERT, il 91% di accuratezza e diventato la baseline attesa.

## Estrazione di relazioni
![](/assets/images/BERT 응용/5fade764-73d5-4e3e-a275-bf090bdf2069-image.png)
Definire entity come target per l'estrazione di relazioni, poi estrarre le relazioni tra entity. Per esempio, se il soggetto e 'Yi Sun-sin' e l'oggetto e 'ufficiale militare', la relazione sarebbe 'occupazione'.
Task che precedentemente mostravano scarse prestazioni sui dati coreani sono stati gestiti bene da BERT.

## Similarita semantica
![](/assets/images/BERT 응용/ff6a2d90-04a4-4614-810d-38218acc8771-image.png)
Giudicare la similarita semantica tra due frasi. Un task che trova frasi con significati simili.

I dati di addestramento dovrebbero consistere di frasi con alta similarita. Se i dati di addestramento contengono solo frasi molto dissimili, l'unica cosa che il modello potrebbe apprendere sarebbero le 'differenze nel vocabolario'. Ma esistono chiaramente frasi che usano parole simili ma hanno significati diversi.
Quindi i dati di addestramento dovrebbero consistere di frasi con alta similarita.

**Usare solo dati di addestramento ad alta similarita e una questione di preprocessing e progettazione dei dati.**

## Named Entity Recognition
![](/assets/images/BERT 응용/fe16fe87-ba56-44e7-ae2a-9d854c177845-image.png)

In precedenza, il NER veniva eseguito con ML tradizionale come SVM. Le prestazioni di BERT per il NER superano significativamente SVM.

## Comprensione della lettura automatica

![](/assets/images/BERT 응용/66f5f38a-22f0-4523-be66-a0c3ee0f6431-image.png)

In precedenza, il task MRC veniva valutato quasi esclusivamente tramite KorQuAD, uno dei pochi benchmark con leaderboard. Nel 2021 e stato rilasciato KLUE, quindi si puo usare quello.

Il tokenizing a livello di parola ha avuto prestazioni significativamente peggiori rispetto al tokenizing a livello di carattere. Perche nel tokenizing a livello di parola, parole semanticamente identiche finiscono come token diversi.
es., 'Yi Sun-sin' e 'Yi Sun-sin-eun' (con una particella attaccata)

# BERT coreano
## ETRI KoBERT
![](/assets/images/BERT 응용/6bf71531-8402-48f7-8190-8b9683609d37-image.png)

KoBERT non applica WordPiece direttamente — prima esegue l'analisi morfologica, poi applica WordPiece. L'intento era tokenizzare alla minima unita significativa. Le prestazioni erano molto buone; al rilascio, ha immediatamente conquistato il primo posto su KorQuAD per oltre un mese. Ha ottenuto 10+ punti in piu rispetto al modello di Google.

## SKT KoBERT
https://github.com/SKTBrain/KoBERT
Anche SKT ha rilasciato un BERT coreano chiamato KoBERT. Questo applica WordPiece direttamente senza segmentazione morfologica.

## Differenze
ETRI KoBERT supera SKT KoBERT su KorQuAD. Quindi dal punto di vista delle prestazioni, il modello ETRI e migliore. Ma usarlo richiede lo sforzo aggiuntivo di preelaborare i dati in un formato adatto al modello ETRI.
Il modello SKT e piu comodo per l'uso diretto.

## Differenze di prestazioni per tokenizing
![](/assets/images/BERT 응용/0fbfdaec-4a34-4d1a-8805-7f46a124d215-image.png)
ref: https://arxiv.org/abs/2010.02534
Un paper co-autore di Kakao e Scatter Lab (l'azienda che ha creato Lee Luda). Il paper ha confrontato le prestazioni tra diversi metodi di tokenizing coreano.

Il paper ha concluso che il metodo con le migliori prestazioni era il Morpheme-aware Subword, che esegue la segmentazione morfologica seguita da WordPiece.

## BERT avanzato
_L'istruttore Kim Sunghyun ha condiviso questo dalla sua esperienza personale._
In KorQuAD, la feature che BERT usa per trovare le risposte sembra essere le entity. Ma fondamentalmente, BERT manca di una struttura per rappresentare esplicitamente le entity.

Quindi:
1. Estrarre le entity chiave tramite entity linking.
2. Attaccare tag entity dal passo 1.
3. Aggiungere un entity embedding layer.
4. Eseguire chunking masking dando priorita a NNP ed entity tramite analisi morfologica.

![](/assets/images/BERT 응용/90e6b330-8aa4-499b-b028-1d32b8d7bcce-image.png)

In pratica, oltre ai Token Embedding, Segment Embedding e Position Embedding esistenti, e stato aggiunto un concetto di Entity Embedding all'embedding layer.

Questo ha migliorato i punteggi su KorQuAD.
![](/assets/images/BERT 응용/78c5c2d9-0915-493c-9574-ac0150e9a4e8-image.png)

Questo approccio e stato presentato nel mondo anglofono come ERNIE, che e riportato come l'attuale modello SOTA.
[Blog](https://omicro03.medium.com/ernie-paper-%EC%A0%95%EB%A6%AC-7244fe74c31b)
