---
title: "Grad Cache"
description: "An approach that enables large-batch contrastive learning under memory constraints, similar to gradient accumulation."
date: "2022-04-12T00:00:00.000Z"
tags: ["ml", "ml-engineering", "dl", "paper-review"]
draft: false
lang: en
translationOf: "grad-cache"
---

To be continued...

# Grad Cache

## Overview
Grad Cache is a technique that allows in-batch negative contrastive learning to use large batches, much like gradient accumulation.

In conventional training setups, loss computation is not batch-wise, so there is no issue with accumulating loss updates across steps. However, when using in-batch negatives for contrastive learning -- as in DPR or MRC models -- the loss is computed batch-wise, which introduces dependencies among samples within a batch. This means standard gradient accumulation simply cannot be used in contrastive learning.

Grad Cache implements an approach analogous to gradient accumulation for contrastive learning, making it possible to achieve large effective batch sizes even on a single GPU.

![](/assets/images/Grad-Cache/used_batch_size.png)

In [Text and Code Embeddings by Contrastive Pre-Training](https://arxiv.org/abs/2201.10005), the batch size is scaled up to 12,288. Since this is nearly impossible to handle with hardware alone, Grad Cache is used to secure large batch sizes for contrastive learning.

## Method


## Reference

- Arxiv: [Scaling Deep Contrastive Learning Batch Size under Memory Limited Setup](https://arxiv.org/abs/2101.06983)
- https://seopbo.github.io/gradCache/
- https://github.com/luyug/GradCache
