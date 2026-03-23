---
title: "Punti confusi nell'NLP"
description: "Chiarimenti su concetti NLP spesso confusi: argmax vs. campionamento multinomiale, beam search vs. sampling, e Pre-LN vs. Post-LN in GPT e Transformer."
date: "2021-09-20T05:49:40.684Z"
tags: ["nlp"]
lang: it
translationOf: "nlp-confusing-points"
draft: false
---

# argmax, multinomial
Il motivo per cui i modelli NLP non usano argmax sull'output e ovvio. argmax forza il modello a convergere su una singola risposta, come nella classificazione.

Per esempio, supponiamo che l'output del modello dopo softmax per l'input $X_n$ sia [0.2, 0.5, 0.3]. Applicando argmax, l'indice 1 verrebbe considerato la risposta e il resto ignorato. Questo processo rinforza il modello a produrre solo l'indice 1 per $X_n$.

Quindi legare argmax al layer di output lo rende perfetto per la classificazione.

**La mia opinione sul perche si usa multinomial**
Ho capito che usare una distribuzione multinomiale nel layer di output di un modello NLP serve a evitare di rinforzare l'output in una sola direzione, a differenza di argmax.

Supponiamo che l'output del modello dopo softmax per l'input $X_n$ sia [0.2, 0.5, 0.3]. Nel campionamento multinomiale, la probabilita di estrarre ogni indice corrisponde al suo valore. Cosi, invece di rinforzare il modello verso un output specifico, si lascia spazio per accettare risultati diversi.

Il mio mentore ha detto che oltre al multinomiale, si usano vari altri metodi per campionare i risultati dal layer di output del modello. Basta scegliere un metodo che lasci spazio a molteplici possibilita di output, come il multinomiale. I pointer network ne sono un esempio.

# Beam search e sampling sono diversi?
All'inizio mi aveva confuso molto. Sono approcci fondamentalmente diversi.

Post precedente su beam search: https://velog.io/@naem1023/Beam-search
Il beam search genera probabilita congiunte sulle ipotesi per il decoding. E un metodo di decoding.

Il sampling e l'atto di estrarre campioni da una popolazione. L'estrazione dei dati puo usare distribuzioni random, multinomiali, uniformi, ecc.--qualsiasi metodo probabilistico adatto allo scopo. Meglio se riflette bene le proprieta della popolazione.

Quindi il beam search non estrae campioni da una popolazione. E il sampling non calcola probabilita congiunte per produrre risultati di decoding ottimali.

# Perche GPT scala inversamente con $\sqrt{n}$
Stessa idea del transformer, dove si scala per la dimensione per ripristinare la varianza originale. La differenza e che GPT usa Pre-LN (Layer Normalization prima del sublayer), mentre il transformer originale usa Post-LN, dove lo scaling avviene dopo ogni blocco residuale.

Nel GPT Pre-LN, la LN viene applicata prima, poi la connessione residuale.

## Pre-LN, Post-LN
Esistono anche prove sperimentali e paper su Pre-LN vs. Post-LN.

[On Layer Normalization in the Transformer Architecture](https://arxiv.org/pdf/2002.04745.pdf)

Riassumendo la spiegazione del mio mentore:
>
Il punto principale del paper:
Passando dal Post-LN Transformer al Pre-LN Transformer si puo eliminare la fase di warm-up. Il paper presenta vari risultati sperimentali. Per Post-LN, la presenza o assenza di warm-up aveva un impatto enorme sui risultati.

La domanda naturale "perche non usare semplicemente il warm-up?" e stata sollevata, e il problema e che influisce sulle prestazioni finali e richiede piu tempo per l'ottimizzazione. (Vedi "On the Variance of the Adaptive Learning Rate and Beyond"--il paper di RAdam, che sostiene che con questo optimizer si puo eliminare il warm-up.)

Il risultato e stato che con Pre-LN, la norma del gradient resta stabile indipendentemente dalla profondita del layer.
Post-LN ha mostrato che i gradienti vicino all'output sono troppo grandi e si riducono andando verso i layer iniziali. La matematica rigorosa e nel paper, ma puo essere utile anche consultare:

Paper che confronta post-norm e pre-norm: [Learning Deep Transformer Models for Machine Translation](https://arxiv.org/abs/1908.03265)

---
Il mio mentore ha accennato al fatto che feature ad alta dimensionalita compaiono verso i layer finali del modello, e che lo scaling aiuta a ridurne l'influenza, ma non sono sicuro su quale sia il fondamento. Ho chiesto chiarimenti.