---
title: "Negative In-batch"
description: "An approach that enables large-batch contrastive learning under memory constraints by using in-batch negatives instead of explicit negative sampling."
date: "2021-10-18T17:53:53.788Z"
tags: ["nlp"]
lang: en
translationOf: "negative-in-batch"
draft: false
---

# Traditional negative sampling

The query batch stays the same as before.

The passage batch changes.
A single batch consists of 1 positive passage and batch_size negative passages, for a total of batch_size + 1 data points per batch.

# Negative in-batch

The passage batch is composed of batch_size items. Unlike the traditional approach, no separate negative sampling is done. Positive query-passage pairs are simply placed together.

1. Compose batch elements randomly.
2. Among n batch elements, the i-th query and the remaining i-1 elements are in a negative passage relationship.
3. When training on this batch, the correlations within the batch are learned together.
4. When computing the loss, the positive passages at the corresponding batch indices are set as targets. Here, you can use something like torch.arange to create an arithmetic sequence.
5. Training is done over the entire batch, but the loss is computed only on the positive samples.
e.g., batch_size = 4
```py
sim_scores = tensor([[-1.0768e+01, -3.7684e+01, -1.3255e-04, -9.1018e+00],
        [-2.1763e+01, -6.3134e+01,  0.0000e+00, -1.6743e+01],
        [-1.6615e+01, -4.5871e+01, -1.0729e-06, -1.3856e+01],
        [-1.3989e+01, -5.5973e+01, -1.1598e-04, -9.0696e+00]],

targets =  [0,1,2,3]
```
The items in sim_scores output probabilities such that the target index is the correct answer. The i-th element of the 0th item in sim_scores represents the probability for the i-th target.

Therefore the targets are 0, 1, 2, 3.
