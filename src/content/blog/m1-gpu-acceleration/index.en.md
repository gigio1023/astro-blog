---
title: "M1 GPU Acceleration"
description: "Setup guide for GPU acceleration on Apple Silicon M1 with PyTorch MPS backend and HuggingFace Transformers."
date: "2022-05-20T00:00:00.000Z"
tags: ["dev-tools", "dl"]
lang: en
translationOf: "m1-gpu-acceleration"
draft: false
---

GPU acceleration for PyTorch is now available on Apple Silicon. I wanted to document how to use GPU acceleration across the frameworks I use.

# Pytorch

As of 2022-05-20.

Install PyTorch 1.12. Only works with the nightly build.

```py
import torch
import torchvision.models as models
from torchsummary import summary

print(torch.__version__)
mps_device = torch.device("mps")

print(mps_device)

# Create a Tensor directly on the mps device
x = torch.ones((1, 3, 224, 224), device=mps_device)
print(x.shape)

# Move your model to mps just like any other device
model = models.resnet18()
summary(model, (3, 244, 244))
model.to(mps_device)

# Now every call runs on the GPU
pred = model(x)

print(pred, pred.shape)
```

# HuggingFace
It can't be installed via pip or conda, so you need to build from source. I used the rust tokenizer.

```sh
# install rust on arm terminal
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


# intsall tokenizer
git clone https://github.com/huggingface/tokenizers
cd tokenizers/bindings/python
pip install setuptools_rust
python setup.py install

# install transformers
pip install git+https://github.com/huggingface/transformers

# install datasets
pip install git+https://github.com/huggingface/datasets
```

```py
from transformers import AutoTokenizer, BertModel

device = "mps"
sentence  = 'Hello World!'
tokenizer = AutoTokenizer.from_pretrained('bert-large-uncased', use_fast=True)
model     = BertModel.from_pretrained('bert-large-uncased')

inputs    = tokenizer(sentence, return_tensors="pt").to(device)
model     = model.to(device)
outputs   = model(**inputs)
print(outputs)
```

# Ref
- https://discuss.pytorch.kr/t/apple-m1-pytorch-gpu/276?fbclid=IwAR2noGGOMnCVSqfKF2WQ9fHajerTkBWdB4TPkwwMCt16CJrAwi9sCHmInoc
- https://towardsdatascience.com/hugging-face-transformers-on-apple-m1-26f0705874d7
- https://discuss.huggingface.co/t/is-transformers-using-gpu-by-default/8500
