---
title: "Statistica"
description: "Fondamenti di modellazione statistica: metodi parametrici e non parametrici, distribuzioni di probabilità, MLE e log-likelihood."
date: "2021-01-01"
tags: ["ml"]
draft: false
lang: it
translationOf: "statistics"
---

# Statistica
## Parametri
La modellazione statistica consiste nello stimare distribuzioni di probabilità attraverso assunzioni appropriate. È un obiettivo condiviso da machine learning e statistica.

È impossibile prevedere la distribuzione esatta di una popolazione da osservazioni finite.
=> Si approssima la distribuzione di probabilità.

### Metodi parametrici
1. Si assume a priori che i dati seguano una distribuzione di probabilità specifica.
2. Si stimano i parametri che la determinano.

### Metodi non parametrici
1. Non si assume una distribuzione a priori.
2. La struttura del modello e il numero di parametri si adattano ai dati.

Di solito si usano quando i parametri sono infiniti o devono cambiare continuamente.

**È un malinteso pensare che i metodi non parametrici non usino parametri.**

## Come assumere una distribuzione di probabilità
Si può fare riferimento alla tabella seguente, ma non bisogna scegliere meccanicamente: va considerato il processo che genera i dati.
- Dati con solo 2 valori (0, 1) => distribuzione di Bernoulli
- Dati con n valori discreti => distribuzione categoriale
- Dati nell'intervallo [0, 1] => distribuzione Beta
- Dati non negativi => distribuzione Gamma, Log-normale, ecc.
- Dati su tutto R => distribuzione Normale, distribuzione di Laplace, ecc.

## Stima dei parametri
Una volta assunta una distribuzione, si possono stimare i parametri.

Per esempio, i parametri di una distribuzione normale sono media e varianza. Le statistiche usate per stimarli sono:

![](/assets/images/통계론/c7691f85-fd47-4ec2-b765-d5241993fab6-image.png)

Idealmente, la media campionaria coincide con la media della popolazione.

All'università ho imparato perché si divide per N-1 nel calcolo della varianza, ma me lo sono dimenticato. Devo rivederlo.

Nel corso del bootcamp, hanno solo detto che serve per ottenere uno stimatore non distorto (unbiased) e sono andati avanti.

### Distribuzione campionaria (Sampling distribution)
Distribuzione campionaria = la distribuzione di probabilità delle statistiche (media campionaria, varianza campionaria).
Distribuzione del campione = la distribuzione della popolazione.

_**La distribuzione campionaria (sampling distribution) e la distribuzione del campione (sample distribution) sono diverse.**_

#### Teorema del limite centrale
La distribuzione campionaria della media campionaria si avvicina a una distribuzione normale al crescere di N (numero di dati).

Questo vale anche se la distribuzione della popolazione non è normale.
![](/assets/images/통계론/60b093bc-ca0a-410e-8b3a-75309b47966d-image.png)

La popolazione nella figura segue una distribuzione di Bernoulli (binomiale). Per quanti dati si raccolgano, non sarà mai normale.

Ma la distribuzione di probabilità delle statistiche della popolazione converge verso una normale al crescere di N, con la varianza che tende a 0.

## Stima di massima verosimiglianza (MLE)
MLE (Maximum Likelihood Estimation)

Un metodo per stimare i parametri teoricamente più probabili.

### Funzione di verosimiglianza
Funzione di verosimiglianza = L(Theta; x)
Ha la stessa formula della funzione di massa/densità di probabilità, ma con una prospettiva diversa.

Funzione di densità di probabilità = funzione di x dato il parametro Theta fisso.
_**Funzione di verosimiglianza = funzione del parametro Theta dato x fisso.**_

In altre parole, la funzione di verosimiglianza varia rispetto al parametro Theta quando la variabile è già data.

Rappresenta la verosimiglianza di osservare i dati x sotto una distribuzione governata dal parametro Theta.

Non è una probabilità che si integra o somma a 1. È solo una misura comparabile di plausibilità osservazionale.

### Log-verosimiglianza (Log-likelihood)
Quando il dataset X è estratto in modo indipendente, la funzione di verosimiglianza si definisce come:
![](/assets/images/통계론/51c49d13-e401-466a-97ee-06b93593650e-image.png)
Prendendo il logaritmo di questa verosimiglianza definita come prodotto, si converte in una somma. _**Questa è la log-verosimiglianza, e di solito è ciò che si ottimizza.**_

#### Perché usare la log-verosimiglianza
- Fattibilità computazionale
  - Con dataset molto grandi, definire la verosimiglianza come prodotto può superare i limiti di precisione del computer.
  - La log-verosimiglianza la converte in una somma, rendendo il calcolo fattibile e preciso.
- Efficienza algoritmica della derivazione nel gradient descent
  - La verosimiglianza basata su prodotto ha costo computazionale O(n²) per la derivazione.
  - La log-verosimiglianza basata su somma ha costo O(n).

Quando si usa il gradient descent, si usa la negative log-likelihood.

### Esempio di MLE: distribuzione normale
Supponiamo di avere campioni indipendenti {x1, ..., xn} da una variabile casuale X normalmente distribuita.

![](/assets/images/통계론/ad7c2cca-a390-4187-8537-37d09f633b33-image.png)

Obiettivo: trovare Theta che ottimizza la funzione di verosimiglianza.

Dato che i dati seguono una distribuzione normale, poniamo Theta = (media(mu), varianza(sigma²)).

![](/assets/images/통계론/364070b0-8b0b-4e42-8b2f-6fded6f3a89d-image.png)

Prendendo il logaritmo della funzione di verosimiglianza, il prodotto delle espressioni della distribuzione normale si decompone in una somma.

Derivando rispetto alla media e alla varianza:

![](/assets/images/통계론/a86f397b-f313-4aa8-94bc-17d926227df9-image.png)

Trovando mu e sigma che annullano entrambe le derivate si massimizza la verosimiglianza. Le espressioni MLE che soddisfano questo sono:

![](/assets/images/통계론/e8410d10-8a5e-4111-b61b-cb9dc8ce5e77-image.png)

La MLE non garantisce uno stimatore non distorto, quindi si divide semplicemente per n.

### Esempio di MLE: distribuzione categoriale

Supponiamo di avere campioni indipendenti {x1, ..., xn} da una distribuzione categoriale Multinoulli(x; p1, ..., pd).

È simile al one-hot encoding: xn è un vettore d-dimensionale con un solo valore 1 e il resto 0.

Stimiamo i parametri (p1, ..., pd) della distribuzione categoriale.

### Parametri della distribuzione categoriale
I parametri della distribuzione normale sono statistiche come media e varianza.

I parametri della distribuzione categoriale rappresentano probabilità. (p1, ..., pd) contiene la probabilità che ogni dimensione sia 0 o 1. Quindi p1 fino a pd sommano a 1.

#### Definizione
![](/assets/images/통계론/adc74803-fcda-43b4-b5e4-dd74bc73952c-image.png)

Questa espressione dice: prendere il valore della k-esima dimensione dell'i-esimo x e usarlo come esponente del k-esimo parametro p. Questo viene usato nella MLE della distribuzione categoriale come segue:

![](/assets/images/통계론/831ea41d-16e0-4651-98a3-b472d22e19b4-image.png)

Come menzionato nella definizione dei parametri, tutti i pk sommano a 1.

---
![](/assets/images/통계론/de828058-4e7a-4b7b-9865-b2fc538234d0-image.png)

I contenuti che erano esponenti di pk passano davanti grazie al logaritmo.
Questo viene abbreviato come nk.

nk è semplicemente il conteggio dei dati xi il cui valore nella k-esima dimensione è 1.

---

![](/assets/images/통계론/d2905cc3-a719-401c-8c8d-d3cf9b86b71c-image.png)

Dato che c'è un vincolo, si usano i moltiplicatori di Lagrange per ottimizzare l'obiettivo.

---

Derivando rispetto a pk e lambda:
![](/assets/images/통계론/6a5227a1-8245-4a8b-bfa0-71dc2a5847cc-image.png)

Entrambe le espressioni derivate devono essere uguali a 0.
Ovvero, entrambe le espressioni si possono consolidare in un'unica espressione in termini di pk.

### MLE nel deep learning

Definiamo i pesi Theta in una rete neurale come segue:
![](/assets/images/통계론/bfa0dd4a-573b-446b-b619-ba4e49659fb9-image.png)
Il vettore softmax modella i parametri (p1, ..., pk) di una distribuzione categoriale. In un post precedente, ho menzionato che la softmax nell'output della rete neurale implementa la probabilità condizionale — quelle probabilità vengono usate come parametri della distribuzione categoriale.

Usando l'etichetta ground truth one-hot y = (y1, ..., yk) come dato osservato, si può ottimizzare la log-verosimiglianza della distribuzione di probabilità softmax.

Ovvero, si può addestrare Theta nella direzione che ottimizza la seguente log-verosimiglianza:

![](/assets/images/통계론/3efbf54d-36c8-422c-a3d1-89eb0d3d32c1-image.png)

## Distanza tra distribuzioni di probabilità
Le funzioni di loss usate nel machine learning derivano dalla distanza tra la distribuzione di probabilità appresa dal modello e quella osservata nei dati.

Le funzioni usate includono:
- Total Variation distance (TV)
- Divergenza di Kullback-Leibler (KL)
- Distanza di Wasserstein

### Divergenza di Kullback-Leibler
![](/assets/images/통계론/9a9b60e6-4e63-435a-88c5-777071e5e701-image.png)

La divergenza KL si può decomporre come segue:
![](/assets/images/통계론/34ae27ad-f127-476c-8fdc-974087d38799-image.png)

Nella classificazione:
- P: etichette ground truth
- Q: predizioni del modello

La MLE nella classificazione equivale a minimizzare la divergenza KL.
