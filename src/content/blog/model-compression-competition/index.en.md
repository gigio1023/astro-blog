---
title: "Model Compression Competition"
description: "Key considerations for model compression competitions, covering FLOPs, memory access cost, and speed optimization guidelines from ShuffleNet v2."
date: "2021-11-28T13:26:00.481Z"
tags: ["dl"]
lang: en
translationOf: "model-compression-competition"
draft: false
---

# Perspectives on compression
- Reduce model size (= number of parameters)
- Just make it faster
- Reduce the number of operations

# FLOPs
- A factor representing the number of operations
- An indirect factor determining computation speed

The ShuffleNetv2 paper proposed the following guidelines, considering factors beyond FLOPs that affect speed:
- Memory access cost is lowest when input and output sizes are equal
- Large group convolutions increase memory cost
- Structures with multiple branching paths -- that is, models configured in parallel -- cause speed degradation
- Element-wise operations have a non-negligible impact, so be careful with them
