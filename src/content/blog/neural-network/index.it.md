---
title: "Rete neurale"
description: "Introduzione alle reti neurali: regressione lineare, classificazione softmax, funzioni di attivazione e perche si preferiscono layer profondi."
date: "2021-01-01"
tags: ["dl", "ml"]
lang: it
translationOf: "neural-network"
draft: false
---

# Neural network

## NN nella regressione lineare
![](/assets/images/Neural network/a6465dd5-9e84-4b33-926b-28b292517916-image.png)

Un esempio classico che sfrutta bene le operazioni tra matrici e la NN.

La matrice X raccoglie i dati. W ha il ruolo di proiettare i dati di X in un'altra dimensione.

La matrice b aggiunge l'intercetta y a tutti i vettori colonna in una volta sola.

La matrice X, originariamente di dimensione (X, d), viene trasformata in dimensione (n, p).

### Interpretazione
![](/assets/images/Neural network/8f274dcc-7500-48bd-a9fd-c5e17920319e-image.png)

X, che era d-dimensionale, viene collegata a p dimensioni.

Ogni freccia rappresenta una variabile del vettore W. Poiche xd punta a p output, le frecce sono d x p, che corrisponde alle dimensioni di W.

## NN nella classificazione

### Softmax
![](/assets/images/Neural network/feb29979-6787-45e1-9cab-37e2d7653619-image.png)
![](/assets/images/Neural network/0f1bfd63-8055-498f-88de-15a12d0905ee-image.png)

Nella classificazione, softmax viene combinato con un vettore per produrre un vettore di probabilita.
In pratica, combinando softmax con un modello lineare si puo interpretare il risultato nel formato desiderato.

### Implementazione di Softmax
```python
def softmax(vec):
	denumerator = np.exp(vec - np.max(vec, axis=-1, keepdims=True))
	numerator = np.sum(denumerator, axis=-1, keppdims=True)
	val = denumerator / numerator
	return val
```
Si aggiunge np.max per prevenire l'overflow. Il risultato originale del calcolo softmax resta garantito.

### Prediction
Per la prediction non si usa softmax, si usano solo metodi come one-hot encoding. Credo sia perche le probabilita escono gia dall'output della NN.
```python
def one_hot(val, dim):
	return [np.eye(dim)[_] for _ in val]

def one_hot_encoding(vec):
	vec_dim = vec.shape[1]
 	vec_argmax = np.argmax(vec, axis=-1)
	return one_hot(vec_argmax, vec_dim)
```


# Funzione di attivazione
- Le funzioni di attivazione trasformano l'output lineare in non lineare.
- Il vettore trasformato dalla funzione di attivazione = hidden vector, vettore latente, neurone
- Rete neurale (NN) = modello composto da neuroni
- Perceptron = modello tradizionale composto solo da neuroni
![](/assets/images/Neural network/37b7ce96-3cdb-4ecf-8f69-e4f5ebd1906c-image.png)

La differenza rispetto a softmax e che softmax considera tutti i valori delle variabili, mentre le funzioni di attivazione si applicano ai singoli numeri reali. ??
Pensavo che softmax fosse una funzione di attivazione, ma mi sbagliavo.

## Definizione
Una funzione non lineare definita sui numeri reali.
**Una NN senza funzioni di attivazione non e diversa da un modello lineare!**

## Tipologie
![](/assets/images/Neural network/dd670b29-c6d3-44d1-9be2-3325d9c2bc39-image.png)

Tradizionalmente si usavano sigmoid e tanh.
Recentemente si usano ReLU e le sue varianti.

# NN (Neural Network)
## Definizione
Una funzione che compone modelli lineari con funzioni di attivazione.
![](/assets/images/Neural network/d1932628-aeb5-4062-bc29-9b03ab49e7ff-image.png)

I layer si impilano ripetendo la trasformazione dell'input z nel vettore latente h all'interno della rete.
La figura sopra mostra una NN a due layer. Generalizzando si ottiene:

![](/assets/images/Neural network/d98c927d-f6b5-4cd4-a12f-57c1d45aef04-image.png)


Come accennato, quando si applicano le funzioni di attivazione, queste operano individualmente su ogni numero reale all'interno del vettore.
## Perche usare piu di 2 layer
Universal approximation theorem
- Anche una rete a 2 layer puo approssimare qualsiasi funzione continua
- Ma nella pratica e difficile da realizzare

Piu i layer sono profondi, meno neuroni servono per approssimare la funzione obiettivo.

Percio di solito si usano NN con molti layer. Ma l'ottimizzazione diventa piu difficile.

## Forward propagation (propagazione in avanti)
Si segue il processo di impilamento dei layer della NN cosi com'e per regolare i pesi.

## Back propagation (retropropagazione)
lol
..
### Aggiornamento dei parametri nei modelli lineari
Un modello lineare si puo pensare come un singolo layer. Cioe tutti i parametri vengono aggiornati contemporaneamente.
### Aggiornamento dei parametri nella NN
La NN invece e composta da piu layer. Quindi non si possono aggiornare tutti i parametri in una volta. Bisogna procedere in modo sequenziale.

### Principio
![](/assets/images/Neural network/0f6f5ef9-5c0a-4f2b-ace9-e1e420235db0-image.png)
Obiettivo finale: aggiornare tutti i parametri usati in tutti gli L layer.

![](/assets/images/Neural network/cb01ea48-d602-4bbd-8082-c3c949585094-image.png)

Usando la chain rule della differenziazione, i parametri vengono aggiornati procedendo a ritroso dall'output all'input.

### Auto-differenziazione basata sulla chain rule
La chain rule e lo stesso concetto studiato al liceo.
![](/assets/images/Neural network/c0783dd2-a4d4-4540-98f1-8bb9e3dd8eaf-image.png)

Per poter calcolare tramite chain rule, il computer deve conoscere i tensori di ogni nodo.

La forward propagation, d'altra parte, calcola semplicemente in modo sequenziale, quindi e piu efficiente in termini di memoria rispetto alla back propagation.

---
![](/assets/images/Neural network/f3efca3c-9652-432b-b539-237129bcb9ab-image.png)

Nella figura, le frecce blu rappresentano la forward propagation e quelle rosse la back propagation. Mostra il processo di utilizzo della chain rule per calcolare il gradient vector di W1.

![](/assets/images/Neural network/9c2e9174-87e2-44cf-bef6-eafabdbcc9d9-image.png)