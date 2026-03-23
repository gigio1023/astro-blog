---
title: "NVTabular"
description: "Introduzione a NVTabular, la libreria NVIDIA accelerata su GPU per feature engineering e preprocessing di dati tabulari."
date: "2022-04-12T00:00:00.000Z"
tags: ["ml", "mlops"]
lang: it
translationOf: "nv-tabular"
draft: false
---

# NVTabular
https://nvidia-merlin.github.io/NVTabular/v0.6.1/Introduction.html

Una libreria di feature engineering e preprocessing per dati tabulari fornita da NVIDIA. L'ho documentata perche Transformers4Rec usa questa libreria.

Supporta anche il calcolo su GPU.

## Installazione
Meglio usare l'immagine Docker di NVIDIA. pip aveva problemi di dipendenze, e conda aveva problemi di dipendenze con le librerie di sistema (su Ubuntu 18.04).
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
Una specie di pipeline. Si definiscono le operazioni da eseguire tramite NVT in un workflow, poi si lancia `workflow.fit` per eseguire la pipeline. Dato che calcola su GPU, la VRAM della GPU continuava a esaurirsi...

## Categorify
Converte i dati categorici testuali nei dati tabulari in valori interi unici.

```py
# Define pipeline
cat_features = CATEGORICAL_COLUMNS >> nvt.ops.Categorify(freq_threshold=10)

# Initialize the workflow and execute it
proc = nvt.Workflow(cat_features)
proc.fit(dataset)
proc.transform(dataset).to_parquet('./test/')
```