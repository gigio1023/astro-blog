---
title: "m1 gpu acceleration"
description: "."
date: "2022-05-20T00:00:00.000Z"
tags: ["mac", "gpu"]
draft: false
---

Apple silicon에서도 pytorch에서의 gpu acceleartion이 적용됐다. 이참에 사용하는 프레임워크에서 gpu acceleartion을 사용하는 방법들을 정리하고자 한다.

# Pytorch

2022-05-20 기준.

Pytorch 1.12를 설치하면 된다. Nightly build에서만 작동한다. 

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
pip, conda로 설치가 안되므로 직접 빌드해야 한다. rust tokenizer를 사용했다. 

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