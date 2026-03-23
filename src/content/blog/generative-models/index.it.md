---
title: "Modelli generativi"
description: "Introduzione ai modelli generativi: distribuzioni di probabilità, assunzioni di indipendenza, regola della catena e modelli auto-regressivi."
date: "2021-08-13T15:08:09.373Z"
tags: ["dl", "naver-boostcamp", "computer-vision"]
lang: it
translationOf: "generative-models"
draft: false
---

https://deepgenerativemodels.github.io/
Un corso di Stanford a cui la lezione faceva riferimento.

# Modello generativo
Non si tratta solo di generare immagini e testo.

![](/assets/images/Generative Models/0f8e765f-c03c-4ef0-a45b-2717e4b2bf37-image.png)

Supponiamo di ricevere un insieme di immagini di cani.

Ci si aspetta che un modello generativo impari una distribuzione di probabilità $$p(x)$$.
- Generazione: campionando $$x_{new} \sim p(x)$$, $$x_{new}$$ dovrebbe sembrare un cane.
- Density estimation: usare $$p(x)$$ per determinare se un input arbitrario $$x$$ è un cane, non un cane, un gatto, ecc. (anomaly detection)
  - In senso stretto, un modello generativo include un modello discriminativo.
  - Un modello che può fornire valori di probabilità è chiamato _**modello esplicito**_.
- Unsupervised representation learning (feature learning): apprendere feature in modo non supervisionato
  - Il professore trovava questo discutibile, ma la lezione di Stanford sostiene che anche questo è un obiettivo dei modelli generativi.

## Distribuzioni discrete di base
Prerequisiti matematici di base. Argomento già trattato dal Professor Im Sung-bin, ma vale la pena rivedere.

### Distribuzione di Bernoulli
Bernoulli richiede solo 1 parametro.

- D = {Heads, Tail}
- P(X=Heads) = p, allora P(X=Tails) = 1 - p
- Si scrive: X ~ Ber(p)

### Distribuzione categoriale
La categoriale richiede m-1 parametri. Se si conoscono m-1 elementi, il rimanente è determinato automaticamente.
- D = {1, ..., m}
- P(Y=i) = $$p_i$$, tale che $\sum_{i=1}^m p_i$ = 1
- Si scrive: Y ~ Cat(p1, ..., pm)

### RGB
![](/assets/images/Generative Models/63e385e6-f325-4ec2-afcf-9b9fcd77925e-image.png)

- $(r, g, b) \sim p(R, G, B)$
- numero di casi = 256 x 256 x 256
- numero di parametri = 256 x 256 x 256 - 1
  - Il numero di parametri per rappresentare un singolo pixel RGB è enorme. Ovvio, ma comunque.

### Immagine binaria
![](/assets/images/Generative Models/1daa072d-8af6-407d-a896-ae7f1968ea23-image.png)
- Si assuma un'immagine binaria con n pixel.
- Servono $2^n$ stati.
- Campionare da $p(x_1, ..., x_n)$ genera un'immagine.
  - Campionare $p(x_1, ..., x_n)$ richiede $2^n - 1$ parametri.

---

Il numero di parametri è troppo grande. Si può ridurre?

### Struttura tramite indipendenza
Supponiamo che $X_1, ..., X_n$ in un'immagine binaria siano indipendenti.
In realtà non ha senso -- se tutti i pixel fossero indipendenti, l'unica immagine rappresentabile sarebbe rumore bianco. Ma assumiamolo comunque.
>
$p(x_1, ..., x_n) = p(x_1)p(x_2)...p(x_n)$

Il numero di stati possibili rimane $2^n$.

Ma il numero di parametri per $p(x_1, ..., x_n)$ è solo n. Perché ogni pixel richiede solo 1 parametro, e dato che sono tutti indipendenti, il totale è n.

### Regola della catena
![](/assets/images/Generative Models/b07552e7-d5e4-4cd6-988e-2f1d85cd0c99-image.png)

Nessuna assunzione necessaria -- è un teorema. Si pensi al modello completamente dipendente come punto di partenza.

Numero totale di parametri: $2^n - 1$. Riduzione esponenziale ottenuta.

### Teorema di Bayes
![](/assets/images/Generative Models/7a57ce2b-cbd0-4d91-9b25-2d41da442046-image.png)

### Indipendenza condizionale

![](/assets/images/Generative Models/ee99d572-1499-4f76-9c52-cb92e8965eee-image.png)
x e y sono condizionalmente indipendenti dato z; p di x dato y e z è uguale a p di x dato z.

Se z è dato e x e y sono indipendenti, guardando un x casuale y è irrilevante.

Questo teorema permette di eliminare variabili indipendenti dalla condizionale nella regola della catena o in altre formule.
Usando questo, costruiremo un buon modello tra gli estremi completamente dipendente e completamente indipendente.

### Assunzione di Markov
Applichiamo l'assunzione di Markov alla regola della catena. Simile all'assunzione nelle RNN -- lo stato corrente dipende solo dallo stato immediatamente precedente.
Nella regola della catena, i termini che usavano tutte le informazioni precedenti ora si riferiscono solo a n-1 al tempo n.
![](/assets/images/Generative Models/da0176cf-190b-48bb-bd3b-493be8dfcc58-image.png)

Numero totale di parametri: $2n-1$.

Rispetto a n del caso completamente indipendente è maggiore, ma rispetto a $2^n-1$ della regola della catena è una riduzione esponenziale.

Trovare questo tipo di sweet spot nel mezzo è ciò che fa un _**modello auto-regressivo**_.

# Modello auto-regressivo
![](/assets/images/Generative Models/62f2297a-0040-4490-b2d0-a82b1b6c6f84-image.png)
- Si assuma di usare immagini binarie 28x28.
- Apprendere $p(x) = p(x_1, ..., x_{784})$ su $x\in\{0,1\}^{784}$.
- Come parametrizzare $p(x)$?
   - Usare la regola della catena per decomporre la distribuzione congiunta.
   - ![](/images/b82a6be1-0c73-4c7b-9b06-6bee248ee47a-image.png)
   - Questo si chiama _**modello autoregressivo**_.
   - Usare solo l'informazione immediatamente precedente (come l'assunzione di Markov) è anch'esso autoregressivo.
- Tutte le variabili casuali devono essere ordinate.
  - Le prestazioni possono variare in base all'ordinamento.

Un modello che considera solo 1 passo precedente = modello AR(1)
Un modello che considera n passi precedenti = modello AR(N)

## NADE
Neural Autoregressive Density Estimator
![](/assets/images/Generative Models/a97f82ee-7046-49e2-85d4-391c5a12f469-image.png)

![](/assets/images/Generative Models/a3890504-a4f3-4ee2-b285-a9150e347893-image.png)

L'i-esimo pixel dipende dai pixel da 1 a i-1.
- La distribuzione del primo pixel non dipende da nulla.
- La distribuzione del secondo pixel dipende solo dal primo.
- La distribuzione del quinto pixel dipende dai pixel da 1 a 4.
- L'i-esimo pixel dipende da i-1 pixel.
- Le dimensioni dell'input cambiano, quindi i pesi continuano a crescere.
  - L'i-esimo input richiede pesi che possano accettare i-1 input.
- Usando una mixture of Gaussians nell'ultimo layer si possono produrre variabili casuali continue.

_**NADE è un modello esplicito.**_
Poiché le probabilità vengono calcolate come nella regola della catena, i valori di probabilità possono essere ottenuti in un modo o nell'altro.

I modelli impliciti possono solo generare.

## Pixel RNN
Rendere una RNN auto-regressiva.

La formula per un'immagine RGB n x n:
![](/assets/images/Generative Models/6b6072b9-6fe8-4dc3-a816-9589dbaac990-image.png)

Due varianti basate sull'ordinamento:
![](/assets/images/Generative Models/66d30707-badf-4fa0-ad24-4d6bdea3e71a-image.png)
- Row LSTM
  - Usa le informazioni dall'alto
- Diagonal BiLSTM
  - Usa tutte le informazioni precedenti
