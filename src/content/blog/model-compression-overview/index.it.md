---
title: "Panoramica sulla compressione dei modelli"
description: "Panoramica delle tecniche di compressione modelli: NAS, network pruning, knowledge distillation, decomposizione tensoriale e quantizzazione."
date: "2021-11-28T13:07:01.511Z"
tags: ["dl"]
lang: it
translationOf: "model-compression-overview"
draft: false
---

# Goal
## On device AI
- Superare i vincoli dei modelli distribuiti su dispositivi personali
  - power usage
  - RAM
  - Storage
  - Computing power
## AI on cloud
- Latency e throughput sono importanti perche molti utenti devono usarlo
  - es., tempo per richiesta, numero di richieste gestibili per unita di tempo
- Bisogna ottenere minore latency e maggiore throughput con le stesse risorse

## Computation
![](/assets/images/경량화 overview/cbb682dc-946e-40d1-848a-97f392602caa-image.png)
- Il numero di operazioni eseguite dal modello deve essere ridotto.
- Dal 2012, il calcolo richiesto per l'addestramento dei modelli e raddoppiato ogni 3-4 mesi.


# Efficient Architecture Design
![](/assets/images/경량화 overview/29953b37-5063-42ad-aabd-88d69139ab02-image.png)
Un grafico che mostra il numero di parametri e le prestazioni dei modelli CNN pubblicati. I modelli nel grafico hanno cercato di ridurre efficientemente il numero di parametri migliorando le prestazioni. Questi sono esempi rappresentativi di Efficient Architecture Design -- progettare il modello stesso per essere efficiente.

## AutoML; Neural Architecture Search (NAS)
**Una tecnica utile da conoscere -- ha molte applicazioni.**
Invece degli umani, usare algoritmi per progettare o trovare modelli efficienti.
![](/assets/images/경량화 overview/f2092147-94ed-4f74-a111-f7f7f5adac13-image.png)

Il controller e un modello che propone architetture di modelli. L'accuracy viene calcolata con il modello proposto, e questa metrica viene usata per riadddestrare il controller. Ripetendo questo processo si dovrebbero trovare modelli efficienti.

![](/assets/images/경량화 overview/f22cbdf0-df1c-44d2-9b86-7a17e44f8f85-image.png)

I modelli ottenuti tramite AutoML/NAS sono probabilmente architetture che non corrispondono all'intuizione umana. Ciononostante, tali modelli possono superare quelli esistenti.


# Network Pruning

- Rimuovere i parametri del modello con bassa importanza
- Tema: definire e trovare buone misure di importanza
  - es., calcolare la norma L2 o il gradiente della loss di un dato parametro per misurarne l'importanza
- Si divide in structured/unstructured pruning

## Structured pruning
- Termine collettivo per tecniche che fanno pruning dei parametri in gruppi
  - Gruppi: channel, filter, layer, ecc.
- Adatto a SW/HW ottimizzato per la computazione densa dato che il pruning avviene in blocco
![](/assets/images/경량화 overview/08644e1d-2c18-4a68-9d84-3428b4349fb8-image.png)
Si formano gruppi per channel nella rete originale e si calcola un fattore per layer. Rimuovendo i layer con bassa importanza si ottiene un modello compresso.


## Unstructured pruning
- Fa pruning di ogni parametro indipendentemente
- Dato che viene applicato individualmente, le matrici interne della rete diventano sempre piu sparse man mano che si fa piu pruning
- Adatto a SW/HW ottimizzato per la computazione sparsa

# Knowledge Distillation
Usare un modello grande pre-addestrato per assistere l'addestramento di una rete piu piccola.
![](/assets/images/경량화 overview/6625704e-7465-4577-a5e4-e1bd03202a18-image.png)
La parte student loss e identica all'addestramento classico. La loss viene calcolata usando ground truth e risultati di predizione.
La parte distillation loss e dove avviene la knowledge distillation. Invece della ground truth, si usano le soft label del modello teacher per calcolare la loss rispetto alle predizioni.

![](/assets/images/경량화 overview/bf88e088-4e28-42f6-94af-23570be67091-image.png)
I soft target (soft output) contengono piu informazioni della ground truth. La figura sopra rappresenta la probabilita come colore quando si mostrano le label predette per riga. A differenza della ground truth, invece di usare solo una label predetta per la classificazione, **si possono usare tutte le probabilita delle label**.
Questo permette di addestrare la rete piu piccola con piu informazioni.

## Formula
![](/assets/images/경량화 overview/ac84ee51-83e6-496a-a155-a70ad5a9ee2e-image.png)
- Termine sinistro: cross-entropy tra student network e ground truth
- Termine destro: loss KLD tra teacher network e student network
- $T$: hyperparameter di temperatura. Rende i piccoli output del softmax piu grandi e quelli grandi piu piccoli. [ref](https://light-tree.tistory.com/196)
- $\alpha$: peso per le due loss




# Matrix/Tensor Decomposition
**Matematicamente complesso, ma anche applicazioni semplici possono dare risultati efficaci.**
- Esprimere un singolo tensore come somma/prodotto di tensori piu piccoli
## CP decomposition
Approssimare un tensore come somma di prodotti esterni di vettori di rango 1.




# Network Quantization
Mappare fp32 a fp16 o int8.
![](/assets/images/경량화 overview/0b944f17-cfba-48b3-a945-c051fd5ab4b3-image.png)

Dopo aver applicato la quantizzazione, dequantizzare i risultati delle operazioni produrra errori rispetto ai risultati fp32. Tuttavia, empiricamente, i modelli risultano robusti a tali errori.

- dimensione modello: diminuisce
- accuracy: leggera diminuzione
- tempo: dipende dall'HW. In generale migliora indipendentemente dall'HW
  - es., su certi HW, la quantizzazione int8 potrebbe essere piu lenta


# Network compiling
- Quando il sistema target e fisso, compilare la rete stessa per una computazione efficiente.
- La tecnica con il maggiore impatto sulla velocita.
- TensorRT (NVIDIA), TFLite (Tensorflow), TVM (Apache)
- Le prestazioni variano in base alla combinazione di libreria di compilazione, sistema HW e modello.
![](/assets/images/경량화 overview/38f1e42c-a732-4458-b684-016e12199162-image.png)

Con la compilazione rule-based, il grafo viene semplificato secondo le regole definite come mostrato sopra. Il risultato semplificato si chiama fusion.

![](/assets/images/경량화 overview/b9c15471-01c3-4392-b670-6e8f8c1b30be-image.png)

Ci sono anche tentativi di trovare buone fusion tramite AutoML. Considerando tutte le combinazioni di framework, HW e sistema si genera uno spazio di ricerca enorme. Quindi si usa AutoML per trovare fusion ottimizzate per il sistema target. AutoTVM di Apache svolge questo ruolo.
