---
title: "NVTabular"
description: "."
date: "2022-04-12T00:00:00.000Z"
tags: ["ml", "nvt", "preprocessing"]
draft: false
---

# NVTabular
https://nvidia-merlin.github.io/NVTabular/v0.6.1/Introduction.html

Nvidia에서 제공해주는 tabular data에 대한 Feature Engineering, Preprocessing 라이브러리이다. Transformers4Rec에서 해당 라이브러리를 사용하기에 정리했다.

GPU 연산도 지원한다고 한다.

## Installation
되도록 nvidia docker를 사용하자. pip는 의존성 문제가, conda는 system library에 대한 의존성 문제가 발생했었다. (Ubuntu 18.04 기준)
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
일조으이 pipeline이다. NVT를 통해 수행할 작업을 workflow에 정의한 후, workflow.fit을 통해 pipeline을 실행한다. GPU를 통해 연산하기 때문에 GPU VRAM이 자꾸 터졌다..

## Categorify
Tabular data에서 text 형태의 categorical data를 unique integer value로 변환해준다.

```py
# Define pipeline
cat_features = CATEGORICAL_COLUMNS >> nvt.ops.Categorify(freq_threshold=10)

# Initialize the workflow and execute it
proc = nvt.Workflow(cat_features)
proc.fit(dataset)
proc.transform(dataset).to_parquet('./test/')
```