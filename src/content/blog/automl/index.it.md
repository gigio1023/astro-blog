---
title: "AutoML"
description: "Introduzione ad AutoML e ottimizzazione degli iperparametri tramite Bayesian Optimization con Gaussian Process Regression."
tags: ["ml", "dl", "naver-boostcamp"]
date: "2021-11-28T14:04:07.541Z"
lang: it
translationOf: "automl"
draft: false
---

# Data Engineering
- Data Cleansing, Preprocessing
- Feature Engineering
- Selezione dell'algoritmo ML
  - DL: Selezione del Backbone Model
- Impostazione degli iperparametri
  - DL: Loss, Optimizer, Learning rate, batch size

La selezione dell'architettura del modello e degli iperparametri viene normalmente fatta da persone, incorporando il feedback dai cicli train/evaluate. **L'obiettivo di AutoML è rimuovere le persone da questo processo e automatizzarlo.**

# Definizione
![](/assets/images/AutoML/c709429f-c82a-46cc-aca3-172048a97b06-image.png)

Questo formalizza quanto descritto spiegando l'obiettivo di AutoML. Dati iperparametri, algoritmi ML e dati, HPO (Hyperparameter Optimization = AutoML) mira a trovare la configurazione degli iperparametri che minimizza la loss.

# Una prospettiva diversa sui modelli leggeri
- Alleggerire modelli esistenti
  - Pruning, Tensor decomposition
- Trovare modelli leggeri tramite ricerca
  - NAS (Neural Architecture Search), AutoML

AutoML è una tecnica per trovare modelli leggeri.

# Configurazione del modello DL
## Tipo
- Categorico
  - Optimizer: Adam, SGD, AdamW ...
  - Modulo: Conv, BottleNeck, InvertedResidual
- Continuo
  - learning rate, parametro di regolarizzazione, ...
- Intero
  - Batch size, epoch

## Configurazione condizionale
Lo spazio di ricerca cambia in base alla configurazione.
- Tipi e spazio di ricerca dei parametri dell'optimizer cambiano a seconda dell'optimizer.
- Il sample del modulo (Vanilla conv, BottleNeck, InvertedResidual) determina parametri e spazio di ricerca specifici del modulo.

# Pipeline AutoML
![](/assets/images/AutoML/4e0effce-99dd-413c-b474-31e9f6f77669-image.png)

Simile alla definizione di HPO descritta prima. L'aggiunta è la funzione obiettivo $f$. La definizione di $f$ può variare. Si potrebbe voler solo ridurre la dimensione del modello, solo migliorarne le prestazioni, o una combinazione di obiettivi.

Si esegue un'ottimizzazione blackbox per massimizzare questi obiettivi e trovare una nuova configurazione $\lambda$.

## Bayesian Optimization (BO)
![](/assets/images/AutoML/e6044436-2a99-4974-9cbf-d7d021e98a03-image.png)
Struttura l'ottimizzazione blackbox come mostrato sopra.
- Surrogate function: un modello di regressione che predice $f(\lambda)$. Se riesce a predire con accuratezza, può determinare meglio quale $\lambda$ provare dopo.
- Acquisition function: determina il prossimo $\lambda$ da provare.

![](/assets/images/AutoML/7466b990-ae50-47da-bf3a-61e8b29d4f07-image.png)

Il processo dal diagramma, in ordine:
1. Campionare $\lambda$ (x) (osservazione)
2. Addestrare il modello DL con quella configurazione
3. Calcolare l'obiettivo. Corrisponde all'osservazione (x) nel diagramma.
4. Aggiornare il surrogate model. Rappresentato dalla linea continua e dalla regione viola nel diagramma.
Es.: modello GP (Gaussian Process), media posteriore, varianza posteriore (incertezza)
5. Aggiornare l'acquisition function. Rappresentata dalla regione verde nel diagramma. Osserva il trend del surrogate model e predice il miglior $\lambda$ successivo.

## BO con GPR
### Gaussian Process Regression
Un metodo per modellare l'incertezza.
Nel grafico BO, solo due punti del surrogate model sono noti; tutto il resto è incerto. Usando GP, si possono ottenere intervalli per i valori oltre quei due punti noti.

**Task di regressione standard**
Set di dati di addestramento: $(X,Y)$
Set di dati di test: $(X_*,Y_*)$
$Y\approx f(X) + e$

**Idea dei GP**
- Il valore $Y_*$ in una posizione specifica potrebbe essere correlato ai già noti $X, Y, X_*$?
  - Indipendentemente dalla relazione positiva o negativa
- Esprimiamo la stima di $Y_*$ da $X, Y, X_*$ tramite una funzione kernel $K$.

**Definizione informale di GP**
- $f(x)$: definita come variabile casuale per l'input x = distribuzione delle funzioni possibili per l'input x
  - Distribuzione delle variabili casuali: distribuzione Gaussiana multivariata

Espandendo la definizione di $f(x)$ in termini GP:
- Si definisce una distribuzione di funzioni. Si assume che questa distribuzione segua una distribuzione Gaussiana multivariata.
  - = la funzione $f$ segue un processo Gaussiano.

![](/assets/images/AutoML/06004562-7d84-4f7c-b8bb-2f71f41f3bc9-image.png)

La formula sopra formalizza quanto appena spiegato.

Qui si applicano le Gaussian Identities: la marginale e la condizionale di una Gaussiana seguono anch'esse una Gaussiana.

![](/assets/images/AutoML/c288cc86-12a9-4728-aa33-dcb2f1c33baa-image.png)

Questo si può visualizzare come mostrato sopra. Guardando la Gaussiana originale da qualsiasi lato condizionale, quella condizionale segue anch'essa una Gaussiana.

![](/assets/images/AutoML/792192ff-9b10-499c-a8e3-50b981d75613-image.png)

Quello che il GP ci dice è che dati $X_*, X, f$, possiamo conoscere media e distribuzione di $f_*$.

### Surrogate Model
Usando i concetti organizzati sopra, guardiamo il surrogate model in maggior dettaglio.
- def: un modello che predice l'obiettivo $f(\lambda)$
  - Usa gli $f(\lambda)$ osservati per predire l'obiettivo $f(\lambda_*)$ per un nuovo $\lambda_*$
- Si addestra il surrogate model e lo si usa come criterio per selezionare il prossimo buon $\lambda$
- Surrogate model rappresentativi
  - Modello GPR (Gaussian Process Regression)
    - media: valore $f$ predetto, varianza: incertezza
![](/assets/images/AutoML/4e494f00-3a4c-49a2-877e-03ace678afc9-image.png)

All'aumentare dei dati osservati, l'incertezza diminuisce e le predizioni si adattano alla funzione vera.

### Acquisition Function
- def: una funzione che usa l'output del surrogate model per determinare quale $\lambda$ provare dopo
- La formula è costruita per bilanciare appropriatamente exploration e exploitation. Il bilanciamento tra i due viene determinato euristicamente.
  - Exploration: esplorare regioni incerte
  - Exploitation: esplorare le regioni migliori note
- Il punto massimo dell'acquisition function aggiornata viene provato all'iterazione successiva

![](/assets/images/AutoML/bace74cd-fdbc-458a-a980-88d6a422adb0-image.png)

Il grafico superiore è il surrogate model; quello inferiore è l'acquisition function. I valori dell'acquisition function diventano molto piccoli in certi punti e grandi nelle vicinanze di quei valori. Dalla prospettiva dell'exploitation, i punti già noti non necessitano di esplorazione, e le vicinanze dei valori noti offrono i migliori punti di esplorazione.
Così viene costruita l'acquisition function.

Es.: Upper Confidence Bound (UCB)
![](/assets/images/AutoML/84760fe8-e4ee-4368-9342-30c9fead5d4c-image.png)
- $\mu$: media posteriore (= Exploitation)
- $\sigma$: varianza posteriore (= Exploration)
- $\kappa$: parametro di bilanciamento

## BO con TPE
Problemi dei GP:
- Complessità: $O(N^3)$
- Difficile da applicare quando parametri condizionali, continui/discreti sono mescolati
Il secondo problema causa la maggior parte delle difficoltà nella pratica, e TPE è ampiamente usato al giorno d'oggi.

Differenza tra TPE (Tree-structured Parzen Estimator) e GPR:
- GPR: calcola $p(f|\lambda)$ (distribuzione posteriore)
- TPE: calcola $p(\lambda|f)$ (likelihood), $p(\lambda)$ (prior)
