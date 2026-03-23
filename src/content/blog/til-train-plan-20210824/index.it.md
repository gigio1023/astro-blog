---
title: "TIL Piano di addestramento 2021.08.24"
description: "Secondo giorno di competizione: strategie di ensemble (bagging vs boosting) e selezione dei modelli CNN per la classificazione di immagini."
date: "2021-08-24T15:53:05.920Z"
tags: ["pytorch", "naver-boostcamp", "ai-competition"]
draft: false
lang: it
translationOf: "til-train-plan-20210824"
---

# Sintesi

Il piano di addestramento è lo stesso del TIL precedente. Non sono riuscito a capire come implementare l'ensemble learning, quindi ho usato semplici if per ora.

Le 18 classi sono determinate da 3 condizioni di feature. Avrei potuto scrivere 18 if a mano, ma ho usato il product di Python itertools.

```python
mask = [0, 1, 2]
gender = [0, 1]
age = [0, 1, 2]

label_number = list(product(mask, gender, age))
```

Il prerequisito è che le 3 feature e i numeri delle classi siano in ordine crescente. Per fortuna lo erano. Abbino gli output dei 3 modelli con label_number per ottenere la classe finale.

Come diagramma:

undefined

# Ensemble learning
ref: https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-11-%EC%95%99%EC%83%81%EB%B8%94-%ED%95%99%EC%8A%B5-Ensemble-Learning-%EB%B0%B0%EA%B9%85Bagging%EA%B3%BC-%EB%B6%80%EC%8A%A4%ED%8C%85Boosting
- Bagging (parallelo): si hanno modelli con lo stesso output. Più modelli con la stessa struttura campionano ripetutamente dallo stesso dataset e addestrano (Bootstrap Aggregation). A quanto pare, campionare più volte dallo stesso dataset migliora l'efficacia dell'apprendimento.
- Boosting (sequenziale): usa modelli diversi. I risultati del modello precedente vengono riutilizzati pesando i dati durante l'addestramento del modello successivo.

Non esiste una regola universale per scegliere. Bisogna usare quello più adatto al dominio e al problema.

- Il boosting tende ad avere errore inferiore rispetto al bagging.
- Il boosting è più lento nell'addestramento e più soggetto a overfitting.
- Il problema è la bassa performance del modello -> Provare boosting.
- Il problema è l'overfitting -> Provare bagging.

# Cambio modello
https://paperswithcode.com/sota/image-classification-on-imagenet
Classifica CNN di riferimento.

- Precedente: resnet18, addestramento molto veloce, buono per i test.
- efficientnetb7: Raggiunto il 9° posto con solo epoch=5 e kfoldsplit=2. Ma molto lento. Lo considero il minimo sicuro come baseline.
- volo: Prestazioni ottime sulla carta, ma l'output del modello usciva sbagliato, quindi non l'ho potuto usare. Peccato, visto il suo alto ranking.
- CaiT: Dovrebbe essere un tipo di ViT, ma senza modello pre-addestrato l'accuracy era del 38%..
  - https://github.com/facebookresearch/deit
  - https://github.com/facebookresearch/deit/blob/main/README_cait.md
  - https://paperswithcode.com/paper/going-deeper-with-image-transformers#code
- BiT: Image classification basata su transformer di Google. Anche questa ben posizionata, la sto provando.
  - https://rwightman.github.io/pytorch-image-models/models/big-transfer/

# Piano
Per ora, provo ad addestrare efficientnet con più epoch e kfoldsplit... 8 ore perse.
