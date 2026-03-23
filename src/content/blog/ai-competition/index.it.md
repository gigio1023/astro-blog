---
title: "Competizioni AI"
description: "Guida all'approccio alle competizioni AI con strategie EDA per task di classificazione di immagini."
date: "2021-08-23T04:42:14.134Z"
tags: ["ai-competition"]
lang: it
translationOf: "ai-competition"
draft: false
---

# Approccio
- Non buttarsi subito sui dati all'inizio della competizione — prima controllare l'overview.

# EDA (Exploratory Data Analysis)
![](/assets/images/ai competition/26691a6c-56b0-43d9-9f13-bebacd91e628-image.png)
Analisi esplorativa dei dati.
- Analisi di X (input)
- Analisi di y (target)
- Analisi per verificare la relazione X-y

## EDA nella classificazione di immagini
- Analisi di X (input)
  - X è l'immagine. Quali feature di X potrebbero essere rilevanti?
- Dimensione dell'immagine
- Posizione dell'oggetto target
- Statistiche RGB per canale
	- C'è un canale R, G o B notevolmente dominante nell'immagine?
- Analisi di y (target)
	- y è il valore che vogliamo predire. Quali caratteristiche ha y?
- Controllare la distribuzione indipendente dei valori y
	- Controllare il numero di classi.
	- es., Qual è la distribuzione di y_1?
- Controllare la distribuzione delle relazioni tra i valori y
	- C'è una differenza significativa nel conteggio tra le classi?
	- es., Come appare la distribuzione combinata di y_1 e y_2?
- Analisi della relazione X-y
	- Quali differenze esistono tra le feature di X e le caratteristiche di y?
- Relazione tra dimensione dell'immagine e caratteristiche di y
	- A volte l'addestramento migliora ridimensionando le immagini.
    - Cercare casi in cui cambiare la dimensione dell'immagine aiuta l'addestramento.
- Relazione tra statistiche RGB e caratteristiche di y
	- RGB channel shift: mescolare l'ordine R, G, B per evitare un apprendimento dipendente dal canale.
- Relazione tra posizione dell'oggetto e caratteristiche di y
- Controllare il rumore nei dati
	- es., Ci sono label y assegnate erroneamente?
