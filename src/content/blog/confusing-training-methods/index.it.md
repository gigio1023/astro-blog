---
title: "Metodi di training che confondono"
description: "Chiarimenti su errori comuni nei loop di training in PyTorch, ordine della validazione e uso della K-fold cross validation."
date: "2021-08-29T01:31:27.009Z"
tags: ["dl", "pytorch"]
draft: false
lang: it
translationOf: "confusing-training-methods"
---

Ho organizzato cose su cui ero confuso o che capivo solo vagamente.

# Ordine di training e validation
```python
def train():
    for epoch in range(epcoh):
    	training()
        validate()
```

Questo ordine è corretto. La versione sotto allena comunque il modello sui dati di input:
```python
def train():
    for epoch in range(epcohs):
    	training()
    for epoch in range(epcohs):
        validate()
```
Il problema è che la validation avviene solo dopo che tutto il training è completato. Si valida ripetutamente il modello finale già allenato per ogni epoch. Uno spreco di risorse.

Con l'ordine corretto, si può validare il risultato dell'apprendimento di ogni step e rifletterlo nella valutazione.

# K fold cross validation
Come dice il nome, è una tecnica di validation. Quindi non andrebbe usata per il training in questo modo:
```python
def train():
    for epoch in range(epcohs):
    	training()
    for epoch in range(epcohs):
        validate()
def kfoldvalidate()
    # do something...

train()
kfoldvalidatie()
```

Penso che potrebbe essere usata nel training, ma in tal caso probabilmente sarebbe qualcosa del genere con l'ensemble learning (pura speculazione...):
```python
def train():
    model_list = MakeManyModel()
    for idx, train_set, validate_set in enumerate(kfold(dataset)):
      for epoch in range(epcohs):
          training(mode_list[idx])
      for epoch in range(epcohs):
          validate(model_list[idx])
    return model_list
def kfoldvalidate(model_list)
    SelectBestModel(model_list)

train()
for i in range(k):
     kfoldvalidatie()
```
Un modello per ogni fold, e si seleziona il migliore tra i k modelli. Si potrebbe anche usare il voting come nell'ensemble learning vero e proprio invece di scegliere il singolo modello migliore. Non l'ho provato perché consumerebbe troppe risorse..
