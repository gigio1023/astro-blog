---
title: "NLP trends"
description: "."
date: "2021-10-29T09:55:54.188Z"
tags: ["NLP"]
draft: false
---

# NLP + RL
## A Deep Reinforced Model for Abstractive Suumarization

ROGUE score를 올리는 행위를 reward로 설정해서 RL을 수행하는 NLP.

## DCN+
mixed objective and deep residual coattention for question answering.

기존의 QA model이 Answer를 잘못 추출하는 경우가 있는데, 이를 RL로 해결.

RL loss, NLP model의 loss(cross-entropy)를 모두 적절히 사용한다.

1) Mixed objective function 적용 : cross entropy loss + self-critical policy learning --> evaluation 방법과 loss function 과의 괴리를 줄임
2) Residual co-attention encoder 적용 : deep self-attention + residual network

## Dialogue generation
https://github.com/lvwerra/trl
- 공감도를 reward로 설정해서 RL 학습. 
- 생성 모델(GPT-2), 공감도를 평가하는 모델(bert, roberta), 공감도에 대한 RL model로 3개의 모델을 구성. 

# NLP + CV
## Description generation
- Descriptions of Images in Isolation(DII)
  - 이미지를 개별적으로 설명
- Descriptions of Images in Sequence(DIS)
  - 여러 장의 이미지에 대해 설명
- Stories of Images in Sequence(SIS)
  - 여러 장의 이미지를 통해 스토리 생성
  
![](/assets/images/NLP trends/04787c83-fb7c-4f60-8cbb-4396ae35c4c7-image.png)

### Show and Tell
https://arxiv.org/pdf/1411.4555.pdf

CNN을 통해 이미지에 대한 Embedding을 생성하고 RNN을 통해 문장을 generate하는 모델. 이 논문을 기점으로 Img-to-Text를 딥러닝으로 해결하고자 하는 시도들이 활발해졌다.

### GLAC Net
https://arxiv.org/pdf/1805.10973.pdf

여러 이미지들을 통해 하나의 스토리를 생성하는 서울대 논문이라고 한다. 
- 두 개의 attention을 결합해 하나의 attention group(여기서는 GLocal attention이라고 명명)을 만든다.
  - local attention: 개별 이미지들에 대한 embedding
  - global attention: 여러 이미지들에 대한 embedding