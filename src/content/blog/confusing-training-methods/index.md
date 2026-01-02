---
title: "헷갈렸던 training 방법"
description: "."
date: "2021-08-29T01:31:27.009Z"
tags: ["DL", "PyTorch"]
draft: false
---

그 동안 헷갈리고 모호하게 알고 있던 내용들을 정리했다.

# Training, validation 순서
```python
def train():
    for epoch in range(epcoh):
    	training()
        validate()
```

이 순서가 맞다. 아래처럼 해도 모델이 input data에 대해서 학습을 하긴한다.
```python
def train():
    for epoch in range(epcohs):
    	training()
    for epoch in range(epcohs):
        validate()
```
문제는 validate 시점이 모든 trainig이 끝난 시점이라는 것이다. 즉, 최종적으로 학습이 끝난 모델을 다시 epoch만큼 validation하는 것이다. 자원만 잡아먹는 쓸모없는 작업이다.

제대로된 순서로 진행해야 한번의 step에 대한 학습 결과를 validate해서 평가에 반영할 수 있다.

# K fold cross validation
말 그대로 validation 기법이다. 따라서 아래처럼 학습에 사용하면 안된다.
```python
def train():
    for epoch in range(epcohs):
    	training()
    for epoch in range(epcohs):
        validate()
def kfoldvalidate()
    # do something...

train()
kfoldvalidatie()
```

내 생각에는 학습에 사용해도 무방하지만 사용한다면 다음처럼 앙상블 러닝과 같이 사용할 것 같다.(뇌피셜...)
```python
def train():
    model_list = MakeManyModel()
    for idx, train_set, validate_set in enumerate(kfold(dataset)):
      for epoch in range(epcohs):
          training(mode_list[idx])
      for epoch in range(epcohs):
          validate(model_list[idx])
    return model_list
def kfoldvalidate(model_list)
    SelectBestModel(model_list)

train()
for i in range(k):
     kfoldvalidatie()
```
하나의 fold에 대해서 하나의 모델이 존재하고 k개의 모델 중에서 가장 좋은 모델을 사용하는 것이다. 굳이 제일 좋은 모델을 선택하지 않고 실제 앙상블러닝처럼 Voting을 활용해도 되겠다. 자원이 너무 많이 소모될 것 같아 시도하진 않았다..