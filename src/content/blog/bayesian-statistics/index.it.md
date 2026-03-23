---
title: "Statistica bayesiana"
description: "Fondamenti di statistica bayesiana: teorema di Bayes, probabilita condizionata, aggiornamento della posteriore e interpretazione della causalita."
date: "2021-01-01"
tags: ["ml", "algorithm"]
lang: it
translationOf: "bayesian-statistics"
draft: false
---

Molto di questo lo si studia al liceo, ma ne avevo dimenticato parecchio...

![](/assets/images/베이즈 통계학/2e826435-b849-4675-9750-62901080ee56-image.png)

La probabilita condizionata sopra indica la probabilita che l'evento A si verifichi dato che l'evento B si e verificato.

## Teorema di Bayes

![](/assets/images/베이즈 통계학/48b3e05e-ca66-454f-b912-df5f88f6ca68-image.png)

La formula sopra fornisce un modo per calcolare la probabilita condizionata a partire da P(B) quando si riceve la nuova informazione A.

---

## Esempio del teorema di Bayes
![](/assets/images/베이즈 통계학/159fb872-5842-4795-bbd3-d324de7a3a5d-image.png)

- D: dati appena osservati
- Theta: ipotesi, l'evento modellato, il parametro da calcolare
- Distribuzione posteriore (posterior): la probabilita che Theta sia valido dato che D e stato osservato. Si chiama "posteriore" perche arriva dopo l'osservazione dei dati.
- Distribuzione a priori (prior): la probabilita di Theta prima che D sia osservato. Un parametro o distribuzione di probabilita assunto in anticipo.
- Numeratore del teorema di Bayes: likelihood
- Denominatore del teorema di Bayes: Evidence, la distribuzione dei dati stessi

## Esempio del teorema di Bayes (COVID-99)
COVID-99 ha un tasso di incidenza del 10%.
Quando si e effettivamente infetti da COVID-99, la probabilita di rilevamento e del 99%.
Quando non si e effettivamente infetti da COVID-99, la probabilita di falso rilevamento e dell'1%.
Dato un risultato positivo del test, qual e la probabilita di essere effettivamente infetti da COVID-99?

![](/assets/images/베이즈 통계학/a8988dbd-8938-4d45-9e56-dbb42bf5ec43-image.png)

Definiamo Theta come l'evento di infezione da COVID-99 (non direttamente osservabile).
Definiamo D come il risultato del test.

Le probabilita degli eventi per Theta e non-Theta possono essere definite come mostrato sopra.

---
![](/assets/images/베이즈 통계학/79dc6738-c032-4b09-8704-5a4cfcccdee5-image.png)

Per calcolare l'evidence usando il teorema di Bayes, impostiamo la formula come sopra. Moltiplicare la likelihood per la probabilita di Theta e sommare.

## Visualizzazione della probabilita condizionata
![](/assets/images/베이즈 통계학/aea0848c-2f0e-4ad4-8cab-0a38ff933aed-image.png)

True Positive: **Recall.** La probabilita di essere effettivamente positivi quando classificati come positivi.
True Negative: la probabilita di essere effettivamente negativi quando classificati come negativi.
False Positive: **Falso allarme (errore di tipo I).** La probabilita di non essere positivi quando classificati come positivi.
False Negative: **(Errore di tipo II).** La probabilita di non essere negativi quando classificati come negativi.

- Il Recall e determinato dalla probabilita a priori P(Theta).
- La statistica bayesiana non puo essere applicata senza una probabilita a priori.
  - Se la priore e sconosciuta, puo essere impostata arbitrariamente, ma la credibilita cala significativamente.

![](/assets/images/베이즈 통계학/fc6f15c1-93de-43a9-aa73-6cbbedce00bc-image.png)

La Precision si calcola come mostrato sopra.

### Applicazione della probabilita condizionata
Per esempio, consideriamo un problema di rilevamento del cancro.
In questo caso, **ridurre gli errori di tipo II e fondamentale.** Un errore di tipo II si verifica quando un paziente con il cancro viene classificato come sano.

Quindi nel bilanciare errori di tipo I e tipo II, gli errori di tipo II richiedono piu attenzione.

## Aggiornamento delle informazioni tramite il teorema di Bayes
![](/assets/images/베이즈 통계학/c38ae7c8-20b5-4be3-b86f-172fc8bb4cb1-image.png)

La probabilita posteriore del passo precedente puo essere usata come probabilita a priori per il passo successivo.

### Esempio di utilizzo
![](/assets/images/베이즈 통계학/518f641f-896b-4bb3-a053-d983990542dd-image.png)

Nel test COVID-99, la probabilita di rilevamento al primo test era del 52.4%. Testando la stessa persona una seconda volta consecutiva, sale al 91.7%.

Questo e un esempio di utilizzo della probabilita posteriore del passo precedente (52.4%) come probabilita a priori per il passo successivo.

## Interpretazione della causalita
La sola probabilita condizionata non dovrebbe essere usata con leggerezza per spiegare completamente le relazioni causali.

Inoltre, per quanti dati si accumulino, le relazioni causali non possono essere spiegate solo attraverso la probabilita condizionata.

Potrebbero esserci casi in cui e possibile, ma non c'e mai una garanzia.
Le relazioni causali emergono solo attraverso un'analisi dei dati molto estesa.

### Modelli robusti usando la causalita

I risultati tipici dei modelli sono cosi:

- Modello predittivo basato su probabilita condizionata (99% di accuratezza)
  - Scenario esistente (95% di accuratezza)
  - Scenario modificato (72% di accuratezza)
- Modello predittivo basato sulla causalita (85% di accuratezza)
  - Scenario esistente (83% di accuratezza)
  - Scenario modificato (82% di accuratezza)

I modelli che usano solo la probabilita condizionata tipicamente garantiscono alta accuratezza per scenari previsti. Ma quando le distribuzioni dei dati cambiano significativamente, l'accuratezza crolla.

I modelli che considerano solo la causalita non garantiscono alta accuratezza. Ma sono robusti ai cambiamenti.

# Causalita
Usata per costruire modelli predittivi robusti ai cambiamenti nella distribuzione dei dati.
![](/assets/images/베이즈 통계학/17f2b608-6ff6-42c1-9a86-43ce1baa8081-image.png)

Per comprendere la causalita, il fattore confondente Z — che influenza sia T che R — deve essere rimosso.
Se Z non viene rimosso, si ottiene una correlazione spuria.

## Esempio di inferenza causale
![](/assets/images/베이즈 통계학/421972e1-499f-44d3-964c-c795a80a8920-image.png)

Per esempio, consideriamo l'analisi dei risultati del trattamento dei calcoli renali per i trattamenti a e b.
Il trattamento a ha un tasso di guarigione individuale piu alto, ma il trattamento b ha un tasso di guarigione complessivo piu alto.
Questo e il **paradosso di Simpson**.

Non si puo risolvere solo con la probabilita condizionata. Il fattore confondente causato dalla dimensione dei calcoli renali deve essere rimosso per analizzare correttamente il tasso di guarigione effettivo.

### Rimozione dell'influenza di Z
L'intervento do(T=a) rimuove l'influenza di Z.
![](/assets/images/베이즈 통계학/faddb899-2c71-406b-aeee-766923a02ab7-image.png)
![](/assets/images/베이즈 통계학/7657d656-b448-49cc-8553-57f4d38a7fdf-image.png)
