---
title: "Competizione di compressione modelli"
description: "Considerazioni chiave per le competizioni di compressione modelli: FLOPs, costo di accesso alla memoria e linee guida per l'ottimizzazione della velocita da ShuffleNet v2."
date: "2021-11-28T13:26:00.481Z"
tags: ["dl"]
lang: it
translationOf: "model-compression-competition"
draft: false
---

# Prospettive sulla compressione
- Ridurre la dimensione del modello (= numero di parametri)
- Renderlo semplicemente piu veloce
- Ridurre il numero di operazioni

# FLOPs
- Un fattore che rappresenta il numero di operazioni
- Un fattore indiretto che determina la velocita di calcolo

Il paper ShuffleNetv2 ha proposto le seguenti linee guida, considerando fattori oltre ai FLOPs che influenzano la velocita:
- Il costo di accesso alla memoria e minimo quando le dimensioni di input e output sono uguali
- Le group convolution grandi aumentano il costo di memoria
- Strutture con percorsi a piu rami -- cioe modelli configurati in parallelo -- causano degradazione della velocita
- Le operazioni element-wise hanno un impatto non trascurabile, quindi bisogna fare attenzione
