---
title: "Visualizzazione dei dati"
description: "Concetti di visualizzazione dati: tipi di dati, mark, canali e attributi pre-attentivi."
date: "2021-08-09T13:06:49.641Z"
tags: ["ml", "data-viz"]
draft: false
lang: it
translationOf: "data-visualization"
---

# Data viz
## Dati
Dati usati per la visualizzazione
- Prospettiva del dataset (globale)
- Prospettiva del singolo dato (locale)

### Dati strutturati
File CSV.
![](/assets/images/데이터 시각화/1484c59d-c573-4c81-9589-73f236ab76e7-image.png)

item = 1 riga
attributo (feature) = colonna

### Dati di serie temporali
![](/assets/images/데이터 시각화/e48008d8-1e3e-4129-8973-8dbc01291416-image.png)
- Forma di serie temporale che segue il flusso del tempo.
- Audio, video
- Si esaminano trend, stagionalità e ciclo nel tempo.

### Dati geografici / mappe
![](/assets/images/데이터 시각화/fe86e094-5886-4ab7-afb1-c7131245d584-image.png)

- Usa distanze, percorsi, distribuzioni, ecc.

### Dati relazionali
![](/assets/images/데이터 시각화/3929c3f1-8c33-4731-9c2d-fede261217d2-image.png)

- Visualizza le relazioni tra oggetti
- Gli oggetti sono nodi
- Le relazioni sono link

### Dati gerarchici
![](/assets/images/데이터 시각화/75e8e44a-586d-4da1-8c8d-f4776af7e2d7-image.png)

- Dati con chiare relazioni di contenimento
- Tree, Treemap, Sunburst, ecc..

## Tipi di dati
- Numerici
  - Continui: lunghezza, peso, temperatura..
  - Discreti: valori dei dadi, numero di persone...
- Categorici
  - Nominali: gruppo sanguigno, religione...
  - Ordinali: voto, stelle, grado...

Discreti e ordinali possono sovrapporsi.
- Discreti: possono essere usati proporzionalmente come valori numerici.
- Ordinali: cose che non sono discrete ma hanno un ordinamento?

## Mark, canale
Mark
- Dati di visualizzazione composti da punti, linee e aree

Canale
- Elementi che possono modificare ogni mark
![](/assets/images/데이터 시각화/5486582e-4644-44a4-96fb-a0d097d0f8e7-image.png)

## Attributo pre-attentivo
Elementi che le persone percepiscono naturalmente senza prestare attenzione speciale.
![](/assets/images/데이터 시각화/15c051bd-5598-496c-8194-443cc576886f-image.png)

Ad esempio, nella figura sopra, Orientation -- si nota subito che solo l'elemento centrale ha un'inclinazione diversa.

_**Usarli contemporaneamente li rende difficili da percepire!**_
Usarli in modo appropriato per indurre il visual pop-out.
