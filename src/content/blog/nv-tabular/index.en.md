---
title: "NVTabular"
description: "Introduction to NVTabular, NVIDIA's GPU-accelerated library for tabular data feature engineering and preprocessing."
date: "2022-04-12T00:00:00.000Z"
tags: ["ml", "mlops"]
lang: en
translationOf: "nv-tabular"
draft: false
---

# NVTabular
https://nvidia-merlin.github.io/NVTabular/v0.6.1/Introduction.html

A feature engineering and preprocessing library for tabular data provided by NVIDIA. I wrote this up because Transformers4Rec uses this library.

It also supports GPU computation.

## Installation
Use the NVIDIA Docker image if possible. pip had dependency issues, and conda had system library dependency issues (on Ubuntu 18.04).
```sh
# 1. Run Nvidia Merlin container
docker run --gpus all --rm -it -p 8888:8888 -p 8797:8787 -p 8796:8786 --ipc=host \
    -v /$(pwd)/data:/workspace/data \
    nvcr.io/nvidia/merlin/merlin-pytorch-training:22.03 /bin/bash

# 2. Run Jupyter Lab
cd /transformers4rec/examples
jupyter-lab --allow-root --ip='0.0.0.0' --port 8888
```

## Workflow
A kind of pipeline. You define the operations to perform via NVT in a workflow, then run `workflow.fit` to execute the pipeline. Since it computes on GPU, the GPU VRAM kept running out...

## Categorify
Converts text-based categorical data in tabular data into unique integer values.

```py
# Define pipeline
cat_features = CATEGORICAL_COLUMNS >> nvt.ops.Categorify(freq_threshold=10)

# Initialize the workflow and execute it
proc = nvt.Workflow(cat_features)
proc.fit(dataset)
proc.transform(dataset).to_parquet('./test/')
```