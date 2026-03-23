---
title: "CutMix verticale"
description: "Applicazione della data augmentation CutMix verticale per la classificazione di mascherine facciali, focalizzando le patch sulle regioni del viso."
date: "2021-08-28T14:48:06.653Z"
tags: ["computer-vision", "ai-competition"]
draft: false
lang: it
translationOf: "cutmix-vertical"
---

# CutMix
Originariamente, CutMix campiona le patch delle immagini casualmente. Questo approccio potrebbe non essere molto efficace per le immagini con mascherine.
Per determinare l'uso della mascherina, il genere e l'età, sarebbe più efficace rilevare solo il viso e fare la patch su quello. Quindi se si fa il patch casualmente, dovrebbe essere all'interno della regione facciale.

Ma il rilevamento del viso richiede lavoro aggiuntivo... Mi sentivo bloccato. Cercando in giro, altri avevano ottenuto miglioramenti delle performance applicando CutMix verticalmente.

# Implementazione
https://github.com/naem1023/boostcamp-pstage-image/blob/main/loss_set/cut_mix.py
Questo combina il codice dell'implementazione PyTorch del post precedente con il codice CutMix verticale condiviso da qualcun altro.

CutMix in sé non è così difficile da implementare -- la parte difficile era capire come incorporarlo nel training e calcolare le metriche di valutazione.
