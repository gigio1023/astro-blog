---
title: "Facet"
description: "Uso dei facet di matplotlib con GridSpec e subplot per visualizzare dataset da prospettive multiple."
date: "2021-08-22T21:04:31.712Z"
tags: ["data-viz"]
draft: false
lang: it
translationOf: "facet"
---

# Facet
Suddivisione. Cioè, visualizzare un singolo dataset in modi diversi.
- Insight diversi attraverso encoding diversi
- Visualizzare più feature contemporaneamente con lo stesso metodo
- Prospettiva a grande scala, a piccola scala, ecc...

In matplotlib, i facet possono essere espressi tramite figure e assi multipli.

## Grid spec
![](/assets/images/facet/0fc1a677-5eaa-4ed8-8913-9297326cda59-image.png)
Letteralmente trattare gli assi come una griglia. Ci sono due modi per usarli come griglia:
- Slicing tipo numpy
- Usare x, y, dx, dy

## Aggiungere subplot all'interno di un ax
![](/assets/images/facet/1a173eaa-693a-4a9c-9c8e-1d9f61eae65e-image.png)
Aggiunto in forma simile a una minimappa.
