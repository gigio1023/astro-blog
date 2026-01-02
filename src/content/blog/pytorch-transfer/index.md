---
title: "pytorch transfer"
description: "."
date: "2021-08-20T04:11:55.216Z"
tags: ["PyTorch"]
draft: false
---

model 자체 코딩보다는 모델을 어떻게 다룰 것인지.

# Transfer learning
- 다른 데이터셋으로 만든 모델(pre-trained model)을 현재 데이터에 적용
  - 텅 빈 모델로부터 개발하지 않아서 효율적
  - 대용량 데이터셋으로 만들어진 모델을 사용시, 성능은 더 좋다.
- 가장 일반적인 학습 방법
- 일부분만 변경하여 학습 수행
- CNN: torchvision
- NLP: HuggingFace가 사실상 표준

e.g., vgg로 binary classification을 하고 싶다면, torchvision에서 pre-trained vgg를 load하고 vgg 끝에 linaer layer를 추가한다.

## source task, target task

![](/assets/images/pytorch transfer/b0288c4b-3ec2-42f4-81f0-43f4151b2e00-image.png)

선택과제에서 제시된 과제였다. transfer learning의 대표적인 예시였다.
즉, source task에서 학습된 지식을 target task로 전이하는 것이 목적이다.

- 목적: fashion-mnist 데이터를 학습, 분류
- 해결방법: 
  - source task로 imagenet, mnist_resnet을 설정한다. 
  - source task의 모델이 pretrained 돼있다면 target task의 모델로 바로 쓰자.
  - source task의 모델에 변경이 필요하다면, 일부 레이어를 추가, 변경한다. 변경된 레이어들만  weight, bias를 초기화하고 재학습을 한다.
  - target task에서는 이러한 모델을 받아서 다시 레이어를 변경, 추가해야된다면 source task에서 했던 방식대로 변경, weight&bias init, 재학습을 한다.

## Frozen
parameter update, backpropagation을 전체에 대해서 적용하지 않고, pre-trained model의 일부 레이어에서만 적용한다.
즉, pre-trained된 parameters 일부를 유지하면서 나의 데이터셋에 맞게 튜닝하는 것이 목적.

![](/assets/images/pytorch transfer/fe30774b-f113-4b19-bc16-4909c3dd0e30-image.png)

### Stepping frozen
학습 step별로 frozen하는 layer를 바꿔준다.


# pth, pt
pytorch 모델의 확장며들이다. 둘 다 사용 가능하지만, pth는 이미 python에서 사용중인 확장자라고 한다. 따라서 pt를 권장한다.
## nn.BCEWithLogitsLoss()
Binary Classification을 할 때, Loss를 계산해주는 criterion으로 사용한다. 이러면 모델의 마지막에 sigmoid가 없어도 sigmoid를 달아준다.