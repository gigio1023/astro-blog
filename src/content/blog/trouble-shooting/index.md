---
title: "Trouble shooting"
description: "."
date: "2021-08-22T20:10:07.453Z"
tags: ["PyTorch"]
draft: false
---

# GPUUtil
- nvidia-smi같은 모듈
- gpu, mem 통계를 지속적으로 콘솔에 찍어준다.

```python
!pipi install GPUtil
import GPUtil
GPUtil.showUtilization()
```

# tensor의 누적
gpu 메모리를 사용하는 tensor 변수들이 있다. (대부분)

이런 변수들의 값이 지속적으로 누적되는 loop문이 있다면 gpu의 메모리가 금방 고갈될 것이다.

e.g.,
```python
total_loss = 0
for i in range(10):
	optim.zero_grad()
    output = model(input)
    loss = criterion(output)
    loss.backward()
    optim.step()
    total_loss += loss ## here!!!    
```

이렇게 누적되거나, 한번만 사용하거나, 간단한 tensor의 경우는 되도록 python 기본 객체로 변환해서 처리하자.


# Out of memory(OOM)
- batch size = 1로 해보고 이것저것 실험해보며 메모리를 확인해보자.

# torch.no_grad()
inference(추론) 시점에서는 반드시 사용하자. 당연한건데, 사용하지 않으면 학습 과정과 동일하게 backward pass가 쌓인다.

# model의 사이즈
가령 LSTM은 메모리를 꽤 많이 잡아먹으니, 모델 자체의 사이즈도 고려하자.

# tensor dtype
float precision을 16bit로도 사용 가능.