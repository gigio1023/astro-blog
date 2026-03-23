---
title: "Accelerazione GPU su M1"
description: "Guida alla configurazione dell'accelerazione GPU su Apple Silicon M1 con il backend MPS di PyTorch e HuggingFace Transformers."
date: "2022-05-20T00:00:00.000Z"
tags: ["dev-tools", "dl"]
lang: it
translationOf: "m1-gpu-acceleration"
draft: false
---

L'accelerazione GPU per PyTorch è ora disponibile su Apple Silicon. Ho voluto documentare come usare l'accelerazione GPU nei framework che utilizzo.

# Pytorch

Alla data del 2022-05-20.

Installare PyTorch 1.12. Funziona solo con la nightly build.

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
Non si installa tramite pip o conda, quindi bisogna compilare dai sorgenti. Ho usato il tokenizer in rust.

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
