---
title: "Condenser, coCondenser"
description: "Revisione del paper su Condenser e coCondenser per migliorare l'aggregazione del token CLS nel pre-training per dense retrieval."
date: "2022-05-16T00:00:00.000Z"
tags: ["nlp", "paper-review"]
draft: false
lang: it
translationOf: "condenser-cocondenser"
---

Appunti dalla presentazione di revisione del paper fatta nel gruppo di studio.
https://github.com/luyug/Condenser

# Condenser
## Abstract
I PLM hanno mostrato buone prestazioni nel text comparison e retrieval. Tuttavia, addestrare un dense encoder richiede molti dati e tecniche complesse. Questo paper individua perché la struttura interna di un LM standard non è sufficiente per l'uso come dense encoder. Inoltre dimostra che Condenser supera gli LM standard nel text retrieval e task simili.

## Problemi con il Transformer Encoder
Nei Transformer, tutti i token incluso il CLS ricevono informazioni dagli altri token della sequenza attraverso una singola attention. Un [paper](https://arxiv.org/abs/1906.04341) di analisi del token CLS indica quanto segue:
1. Nella maggior parte dei middle layer, il token CLS ha pattern di attention simili agli altri token di testo e non riceve attention dagli altri token.
2. Nell'ultimo layer, il CLS ha una broad attention unica per il task NSP.

Combinando queste analisi, si può pensare che il token CLS non sia attivo in molti middle layer e si attivi solo nell'ultimo round di attention. Il paper sostiene che un bi-encoder efficace dovrebbe poter aggregare informazioni di diversi livelli attraverso tutti i layer. Da questa prospettiva, i PLM standard non sono pronti per il fine-tuning.

## Metodo
### Pre-training
Il paper propone il seguente design del modello per risolvere il problema.

![](/assets/Condenser,coCondenser/20220516170729.png)

Invece di fare pre-training con una sola attention, propone di usare early encoder, late encoder e condenser header. In forma di equazione:

$$[h^{0}_{cls};h^{0}] = Embed([CLS;x])$$


$$[h^{early}_{cls};h^{early}] = Encoder_{early}([h^{0}_{cls};h^{0}])$$


$$[h^{late}_{cls};h^{late}] = Encoder_{late}([h^{early}_{cls};h^{early}])$$

L'hidden state dell'early encoder entra nel condenser head tramite skip connection (il paper lo chiama short circuit). Il CLS del late encoder viene inserito nel condenser head, inducendo una rappresentazione late-early nel condenser head.

La MLM Loss si calcola come:

$$\mathcal{L}_\text{mlm} = \sum_{i \in \text{masked}} \text{CrossEntropy}(W h^{cd}_i, x_i)$$

In questa struttura, il late encoder può affinare le rappresentazioni dei token, ma le nuove informazioni passano solo attraverso $h^{late}_{cls}$. Quindi il late encoder si sforza di aggregare le informazioni generate nella rappresentazione CLS, e gli head dipendono dal CLS tardo per le predizioni.

Collegando tramite skip connection l'hidden state dell'early layer, si rimuovono le informazioni locali e la struttura grammaticale del testo di input dal risultato dell'encoding. Il paper sostiene che questo permette al CLS di concentrarsi sul significato globale del testo.

### Fine-tuning
Nel fine-tuning di Condenser, l'head viene scartato. Si addestra $CLS\ h^{late}_{cls}$ tramite fine-tuning e si aggiornano i gradienti del backbone con backpropagation. Dato che l'head serve solo come guida per il pre-training, Condenser può ridurre la dimensione del backbone encoder ed essere più efficiente. In pratica, Condenser può essere un sostituto leggero di BERT.

### Inizializzazione dei pesi
L'head di Condenser è inizializzato casualmente, mentre early e late encoder usano i pesi del PLM esistente. Personalmente, mi sembra che questo renda la ricerca un po' troppo facile...

Per evitare che i pesi del backbone interferiscano con la backpropagation dei gradienti dell'head, si aggiunge al Loss una MLM sull'output tardo come vincolo contestuale:

$$\mathcal{L}_\text{mlm}^c = \sum_{i \in \text{masked}} \text{CrossEntropy}(W h^{late}_i, x_i)$$

$$\mathcal{L} = \mathcal{L}_\text{mlm} + \mathcal{L}_\text{mlm}^c$$

## Risultati
### Similarità tra frasi

![](/assets/images/Condenser,coCondenser/20220516174926.png)

### Retrieval per Open QA
Sembra riferirsi alle prestazioni di retrieval su open-domain.
![](/assets/images/Condenser,coCondenser/20220516175155.png)

### Retrieval per Web Search
Metriche per open-domain ma specifiche per web search.

![](/assets/images/Condenser,coCondenser/20220516175321.png)


# coCondenser
Questo paper identifica due problemi del dense retrieval esistente:
1. Rumore nei dati di addestramento
2. Necessità di large batch size

Il paper usa Condenser come architettura di pre-training. Propone inoltre coCondenser, che apprende con una unsupervised corpus-level contrastive loss per apprendere lo spazio di embedding dei passaggi.

coCondenser elimina la necessità non solo del large batch training, ma anche di heavy data engineering come augmentation, synthesis e filtering.
