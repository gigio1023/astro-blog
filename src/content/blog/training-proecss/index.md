---
title: "Training proecss"
description: "."
date: "2021-08-30T18:02:28.948Z"
tags: ["DL", "PyTorch"]
draft: false
---

# Gradient Accumulation
gpu가 좋은 상황이 아닐 경우 사용할만한 방법이다. 

```python
num_accum = 2
optimizer.zero_grad()
for epoch in range(10):
    running_loss = 0.0
    for i, data in enumerate(train_loader, 0):
        inputs, labels = data
        outputs = net(inputs)
        
        loss = criterion(outputs, labels) / num_accum
        loss.backward()
        
        if i % num_accum == 0:
            optimizer.step()
            optimizer.zero_grad()
 ```
 
- num_accum만큼의 epoch을 돌아야지 model의 parameters를 업데이트.
- critertion의 결과물에 num_accum을 나눠주는 이유는 일반화때문이라고 한다.
  - 뇌피셜: num_accum동안의 loss를 한번의 step만에 반영해줘야하기 때문에 개별적인 loss값에 일정한 가중치를 두어 균등화하는 효과를 가지는 것 같다.