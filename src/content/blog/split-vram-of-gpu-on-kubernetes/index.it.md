---
title: "Dividere la VRAM della GPU su Kubernetes"
description: "Opzioni per suddividere la VRAM delle GPU tra pod in Kubernetes: repliche, risorse estese e virtualizzazione GPU."
date: "2022-04-08T00:00:00.000Z"
tags: ["mlops"]
draft: false
lang: it
translationOf: "split-vram-of-gpu-on-kubernetes"
---

# Panoramica
La VRAM inutilizzata può essere allocata solo a livello di GPU in Kubernetes? Ho cercato di capire come assegnare le risorse in eccesso ad altri carichi di lavoro.

# Esempi
- Spec GPU: 32GB
- Spec workstation: 2 GPU
- Spec inference persistente: 1 GPU, 12GB VRAM
- Questo lascia GPU con 32GB e 20GB di VRAM disponibile.
Volevo allocare questo surplus ad altri task per sfruttare al massimo le GPU.

# HOWTO
## Replica
Se si può limitare il numero di pod e calcolare in anticipo le risorse necessarie, le repliche permettono di limitare l'allocazione complessiva. Ad esempio: min CPU 1, RAM 2GB; max CPU 2, RAM 4GB; massimo 5 pod.

Però funziona solo per CPU e RAM, non per la GPU.

## Extended Resources
ref: [Apply Extended Resources](https://blog.ggaman.com/1025)
Le Extended Resources di Kubernetes permettono di controllare quanta VRAM viene assegnata a ciascun pod, regolando le risorse per pod di training e serving.

Il problema è che se un container consuma tutta la VRAM a runtime, non c'è modo di accorgersene. Si potrebbe creare un container di monitoraggio, ma questo aggiunge occupazione di risorse non necessaria.

## GPU Virtualization
La virtualizzazione GPU si realizza tradizionalmente con VMware, che permette l'allocazione granulare delle risorse su una singola GPU. Però il supporto è limitato alle GPU di classe data center, e VMware è a pagamento.

# Conclusione
Kubernetes non supporta nativamente lo splitting della VRAM. Le Extended Resources possono allocare VRAM al momento della creazione del pod, ma questo non limita effettivamente l'uso di VRAM a runtime.
