---
title: "Ensemble"
description: "Metodi di ensemble per competizioni AI: hard voting, soft voting e weighted voting per migliorare le performance del modello."
date: "2021-08-31T18:22:32.656Z"
tags: ["dl", "pytorch"]
draft: false
lang: it
translationOf: "ensemble"
---

In produzione, lo sforzo che andrebbe nell'ensemble viene solitamente speso per ottimizzare il modello e la pipeline di training. Ma nelle competizioni, dove si combatte per frazioni di punto decimale, usare l'ensemble per alzare il punteggio conta.

# Ensemble
![](/assets/images/Ensemble/af07b5b8-693c-449a-8dfb-d13b76507c35-image.png)

Allenando la maggior parte dei modelli, l'overfitting si verifica frequentemente. Certo, l'underfitting può verificarsi se i dati sono troppo pochi e sbilanciati, ma è meno comune.

La figura sotto potrebbe aiutare a capire.
![](/assets/images/Ensemble/25919656-bfa8-4101-8ca4-8d521559d861-image.png)
ref: https://bywords.tistory.com/entry/%EB%B2%88%EC%97%AD-%EC%9C%A0%EC%B9%98%EC%9B%90%EC%83%9D%EB%8F%84-%EC%9D%B4%ED%95%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-biasvariance-tradeoff


## Voting
ref: https://devkor.tistory.com/entry/Soft-Voting-%EA%B3%BC-Hard-Voting

- Hard voting: seleziona la classe di maggioranza
- Soft voting: restituisce la media tra le classi
- Weight voting: moltiplica l'output di ogni modello per il suo peso e divide per la somma dei pesi
