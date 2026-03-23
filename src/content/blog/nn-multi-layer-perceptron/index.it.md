---
title: "NN e Multi Layer Perceptron"
description: "Reti neurali come approssimatori di funzioni: modelli lineari, funzioni di attivazione, multi-layer perceptron, teorema di approssimazione universale e loss function."
date: "2021-01-01"
tags: ["dl"]
lang: it
translationOf: "nn-multi-layer-perceptron"
draft: false
---

# Neural Networks
Si dice che le reti neurali funzionano bene perche imitano le reti neurali del cervello umano.
![](/assets/images/NN & Multi layer perceptron/bec49730-5ab0-475b-9da8-3c21210874a5-image.png)
C'e del vero. L'implementazione dei nodi delle NN somiglia effettivamente alla struttura dei neuroni reali.

Ma e un po' forzato dire che imitano il cervello, dato che processi come la back propagation sono essenziali per le NN.

![](/assets/images/NN & Multi layer perceptron/163090cf-0a5c-43ab-a4a4-651564b282ae-image.png)

I primi aeroplani erano modellati su pipistrelli e uccelli. L'aereo dei fratelli Wright aveva in qualche modo quella forma. Ma non si puo dire che gli aerei moderni imitino pipistrelli o uccelli.

Lo stesso vale per le NN. Sono partite dall'imitazione del cervello umano per replicare l'intelligenza umana, ma la ricerca recente nel DL si discosta molto dal funzionamento umano.

Il punto e: non dare per scontato che le NN funzionino perche imitano gli umani. Bisogna analizzare matematicamente perche funzionano.

## Definizione
Le neural network sono _**approssimatori di funzioni**_ che impilano trasformazioni affini seguite da trasformazioni non lineari.

- Approssimano funzioni.
- Implementate in modo non lineare tramite funzioni di attivazione.

## Linear Neural Network
### Dati semplici
![](/assets/images/NN & Multi layer perceptron/1ca7f55c-4f9d-41cc-99d4-a3d33d1c8fea-image.png)

Definiamo dati, modello e loss come sopra.
Ora troviamo w e b ottimali, i parametri del modello.

![](/assets/images/NN & Multi layer perceptron/07c46c4e-0f0f-4c37-9f36-6b875157b1c8-image.png)
![](/assets/images/NN & Multi layer perceptron/8bff603b-ec9b-4cfb-9408-aeb4e9beca63-image.png)

E un problema di regressione lineare con funzione convessa e pochi dati di training, quindi esistono sicuramente metodi per trovare w e b ottimali in un colpo solo. Ma nel DL si usa la back propagation come mostrato sopra.

Obiettivo della back propagation: aggiornare i parametri nella direzione che minimizza la loss.
Ho spiegato la back propagation in dettaglio in un altro post, quindi non approfondisco qui.

![](/assets/images/NN & Multi layer perceptron/ff1ceb8c-7a52-407f-b478-520282df6956-image.png)

### Dati piu grandi
![](/assets/images/NN & Multi layer perceptron/9264a0b0-a60f-4569-a695-92eecd9a942d-image.png)
I pesi vengono rappresentati con matrici. L'obiettivo e inviare x a y tramite W e b.

### Impilamento di piu layer
![](/assets/images/NN & Multi layer perceptron/84ff7973-780d-4703-8547-2beb5225d078-image.png)

Per impilare piu layer, si puo esprimere il tutto come prodotto di pesi. La forma sopra e una composizione della formula base vista prima (il bias e omesso).

L'intenzione era creare un multi-layer con hidden layer, ma il risultato e di fatto un singolo layer. Perche W2 e W1 collassano in un unico peso tramite il prodotto matriciale.

![](/assets/images/NN & Multi layer perceptron/bffeb80b-7d38-4cb8-8009-ca32340fc60a-image.png)
Quindi bisogna prima applicare una trasformazione non lineare, poi combinarla con una trasformazione lineare, per ottenere l'effetto di impilamento dei layer.

### Funzioni di attivazione
![](/assets/images/NN & Multi layer perceptron/38244fff-f134-4a27-b7d9-ba9d99eda595-image.png)
Quale sia la migliore dipende dal problema.

## Oltre le Neural Network lineari
![](/assets/images/NN & Multi layer perceptron/a53406e4-8bcb-4a0b-bb80-318de84b70be-image.png)
Su qualsiasi insieme compatto K, qualsiasi funzione continua puo essere approssimata con precisione arbitraria con un solo hidden layer.
=> Questo implica solo l'esistenza. Non garantisce che la NN che addestro approssimera la funzione che voglio.

Dimostra solo il potere espressivo delle NN.

## Loss Function

![](/assets/images/NN & Multi layer perceptron/6b1295f4-f730-4a80-ab47-57273668294d-image.png)

La cross entropy si usa nei problemi di classificazione.

Le label nella classificazione sono tipicamente rappresentate come vettori one-hot. Solo la dimensione da classificare ha un valore; il resto e tutto 0. Il valore in se non importa -- puo essere 1 o 1000000. L'importante e che sia distinto dagli altri valori.

La cross entropy si usa per esprimere questa proprieta matematicamente.


In alternativa, supponiamo di voler costruire un modello per stimare la fascia d'eta da foto di volti. In quel caso, l'output viene solitamente espresso come probabilita, implementato usando la log likelihood tramite MSE.