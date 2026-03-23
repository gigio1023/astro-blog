---
title: "Training Process"
description: "How gradient accumulation works in PyTorch for effective large-batch training on limited GPU memory."
date: "2021-08-30T18:02:28.948Z"
tags: ["dl", "pytorch"]
draft: false
lang: en
translationOf: "training-proecss"
---

# Gradient Accumulation
A useful technique when GPU resources are limited.

```python
num_accum = 2
optimizer.zero_grad()
for epoch in range(10):
    running_loss = 0.0
    for i, data in enumerate(train_loader, 0):
        inputs, labels = data
        outputs = net(inputs)

        loss = criterion(outputs, labels) / num_accum
        loss.backward()

        if i % num_accum == 0:
            optimizer.step()
            optimizer.zero_grad()
 ```

- Model parameters are only updated after num_accum iterations.
- The criterion output is divided by num_accum for normalization.
  - My guess: since the accumulated loss over num_accum steps is applied in a single step, dividing by num_accum gives each individual loss an equal weight, producing a normalizing effect.
