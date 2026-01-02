---
title: "추가적인 학습 기법들"
description: "."
date: "2021-08-30T15:13:38.273Z"
tags: ["CNN", "PyTorch"]
draft: false
---

# amp
nvidia에서 torch에 넣어준 그 'amp'다. FP16으로 계산하게 해준다 해서 사용할 계획.

https://pytorch.org/docs/stable/notes/amp_examples.html

autocast에서 자동으로 해주는 첫번째 방법 사용.
다만 극적으로 성능이 향상되지는 않는다. nvidia benchamark에서도 일의자리 한자릿수 정도에서 성능향상이 이루어지더라.

# label smoothing (loss)
model의 결과에 softmax를 거쳐서 생긴 결과를 사용해왔다. 그러지말고 model의 결과를 그대로 사용하면서 라벨을 실수로 표현하기 위해 사용한다. 

가령
> [0,1,0,0]

이러한 모델의 출력을
> [0.025, 0.925,0.025,0.025]

이렇게 바꿔서 loss를 구한다. 실수로 바꿀 때 방법마다의 차이가 있겠지만 그냥 비율을 계산해서 구하는 것으로 알고 있다. 


# ArcFaceLoss
개념: https://aimaster.tistory.com/93
구현: https://www.kaggle.com/underwearfitting/pytorch-densenet-arcface-validation-training

좀 더 알아봐야겠다..


# Class pivot 변경
현재 class의 age feature는 30세, 60세를 기준으로 3개의 그룹을 형성한다. class의 분포를 살펴보면 유독 30세 부근과 60세 이상에 사람의 수가 적다. 클래스 불균형이 있어서 임의로 데이터의 class를 조작해서 학습해보니 성능이 좀 더 잘 나왔다.

## 분석
gender, mask 착용 여부와 같은 feature들처럼 이산적으로 명확하게 구별되는 feature들에 비해 age는 애매한 면이 많다. 사회 경험이 많은 사람도 30세와 29세를 구분하지 못하는 경우가 분명 많을 것이다.

따라서 class간의 pivot에 조작을 가하더라도, age를 제대로 학습하고자하는 의도에서 멀어지지 않을 것이라고 생각했다.

## 결과
30세와 60세인 기준점을 29세와 59세로 바꾸니 f1 score 기준으로 0.05 정도의 성능향상이 꾸준히 발생했다. 다만 29세와 58세로 기준점을 변경하면 되려 성능이 하락했다.

# wandb
trainer가 한번의 step당 다음의 정보들을 업데이트하도록 변경했다.
> acc, loss, val_acc, val_loss, f1_score, val_f1_score, learning_rate

하나의 workspace가 여러 tag를 가지고 있도록 구성해서 나중에 필터링하기 편하도록 구성했다. augmentation중 핵심적인 기법들 같이 학습에 구별되서 사용된 기법들을 tag에 더 넣기로 했다.