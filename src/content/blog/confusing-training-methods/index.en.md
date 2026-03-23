---
title: "Confusing Training Methods"
description: "Clarifying common mistakes in PyTorch training loops, validation ordering, and K-fold cross validation usage."
date: "2021-08-29T01:31:27.009Z"
tags: ["dl", "pytorch"]
draft: false
lang: en
translationOf: "confusing-training-methods"
---

I organized things I had been confused about or only vaguely understood.

# Training, validation ordering
```python
def train():
    for epoch in range(epcoh):
    	training()
        validate()
```

This ordering is correct. The version below also trains the model on input data:
```python
def train():
    for epoch in range(epcohs):
    	training()
    for epoch in range(epcohs):
        validate()
```
The problem is that validation happens only after all training is complete. It just validates the final trained model repeatedly for each epoch. A waste of resources.

With the proper ordering, you can validate the learning result of each step and reflect it in the evaluation.

# K fold cross validation
As the name says, it is a validation technique. So it should not be used for training like this:
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

I think it could be used in training, but if so, it would probably look something like this with ensemble learning (just my speculation...):
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
One model exists per fold, and the best model among k models is selected. You could also use voting like actual ensemble learning instead of picking the single best model. I did not try it because it would consume too many resources..
