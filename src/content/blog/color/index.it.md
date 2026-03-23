---
title: "Colore"
description: "Uso del colore nella visualizzazione dati: colormap sequenziali e divergenti, spazio colore HSI e palette."
date: "2021-08-22T20:58:50.619Z"
tags: ["data-viz"]
draft: false
lang: it
translationOf: "color"
---

C'era troppo codice usato nella pratica, quindi i contenuti relativi al codice sono solo nel notebook Jupyter.

# Sequenziale
![](/assets/images/color/1664f5cb-f531-4880-8a67-6ff4ab15a674-image.png)
- Adatto per dati sequenziali
- Rappresentato con colori continui

# Divergente
![](/assets/images/color/10cc8235-025a-4a1c-bbf1-5af971a84260-image.png)
- Diverge dal centro
  - Adatto per valori opposti (temperatura), due dataset diversi (tassi di approvazione)
- Di solito colori più scuri verso gli estremi
- Il colore centrale è neutro, non sbilanciato verso nessun lato

## Esempio
![](/assets/images/color/d218b671-672d-42dd-bd58-24e6073660a8-image.png)
Dati sulla temperatura media della Corea del Sud

# HSI
L'API dei colori di matplotlib usa HSI, a quanto pare. Lo "spazio colore" che avevo studiato al corso di computer vision all'università..

- Hue (tonalità): il colore stesso. Esistono colori complementari -- mescolarli produce bianco. Le differenze di tonalità sono di solito le più facili da notare.
- Saturation (saturazione): il rapporto di miscelazione tra bianco e un colore puro. Descritto come "chiaro" o "vivace."
- Lightness (luminosità): brillantezza. Scuro o chiaro.

# Color palette
I moduli offrono palette predefinite, ma su GitHub ci sono diverse color palette. Per uso professionale, si consiglia Adobe Color.
https://color.adobe.com/create/color-wheel

## RColorBrewer palettes
https://www.datanovia.com/en/blog/top-r-color-palettes-to-know-for-great-data-visualization/

L'istruttore ha detto che queste sono ben differenziate e hanno un bell'aspetto.
