---
title: "Inizializzazione dei pesi"
description: "Perché l'inizializzazione dei pesi è importante nel deep learning e perché evitare l'inizializzazione a zero."
date: "2021-08-11T06:35:45.694Z"
tags: ["dl", "ml", "pytorch"]
draft: false
lang: it
translationOf: "weight-init"
---

Un compagno di bootcamp ha scritto un buon riassunto su questo argomento — condivido il link:
https://velog.io/@hanlyang0522/weight-init%EC%9D%84-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0

In sintesi: finché non si inizializzano i pesi a 0, non ci sono problemi. La maggior parte dei framework lo gestisce automaticamente, e quando si usano le funzioni di inizializzazione integrate di PyTorch (come ha fatto l'istruttore nel laboratorio), il risultato corrisponde comunque all'inizializzazione predefinita.

L'avvertenza: inizializzare a 0 può impedire completamente l'apprendimento.
