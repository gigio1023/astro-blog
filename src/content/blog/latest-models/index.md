---
title: "최신 모델"
description: "."
date: "2021-10-13T01:49:14.563Z"
tags: ["NLP"]
draft: false
---

# XLNet
기존의 모델들의 문제점
- BERT 
  - [MASK] 토큰을 독립적으로 예측하기 때문에 Token 사이의 관계 학습이 불가능
  - Embedding length의 한계로 Segment간 관계 학습 불가능
- GPT
  - 단일 방향성으로만 학습
  
이러한 한계를 극복하고자 XLNet이 등장한다.

## Relative positional encoding
512 token으로만 학습하는 한계를 벗어나기 위해 도입. 기존의 positional encoding([Ref](https://skyjwoo.tistory.com/entry/positional-encoding%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80))을 relative하게 한다고 한다.

![](/assets/images/최신 모델/894a3f8c-280e-46dc-afc3-da6e55068235-image.png)

- 기존 Positional encoding은 0, 1, 2, 3 ... 과 같이 절대적인 위치를 활용
- Relative positional encoding은 0번째, 1번째, 2번째, ... 와 같이 상대적인 거리 표현법을 사용.

-> Sequenec 길이 제한이 없어졌다.

## Permutaion language modeling
[MASK]를 없앴다. 대신 순열(Permutation)을 활용해 순서를 섞은 데이터로 학습을 진행해서 순서에 종속되지 않도록 학습을 유도했다.
![](/assets/images/최신 모델/69701f1d-1b5b-44b8-b848-359d80d9d070-image.png)

## Performance
![](/assets/images/최신 모델/2102ee3c-4d28-42ad-9caa-0970e790bbc8-image.png)

GLUE에서 이전 모델들보다 더 좋은 성능을 냈다.


# RoBERTa
BERT와 동일한 구조지만 학습 방법에서 변화점을 찾음.
- Model 학습 시간 증가 + Batch size 증가 + Train data 증가
- Next sentence prediction 제거
  - Fine-tuning과 관련없는 task
  - 너무 쉬운 task이기 때문에 오히려 모델의 성능이 하락한다고 논문에서 밝힘
- Longer sentence 추가
- Dynamic masking
  - 동일 데이터에 대해서 masking을 10번 다르게 적용하여 학습


# BART 
BERT와 GPT의 학습 방법을 함께 적용해서 학습하자.
![](/assets/images/최신 모델/4d3287c1-654e-4bcf-b813-43feaf37d360-image.png)
![](/assets/images/최신 모델/13d2157f-66c7-4fdd-b91c-8050d5c77219-image.png)
BERT, RoBERTa보다 좋았다고 한다.

# T5
![](/assets/images/최신 모델/1bcdfcf3-5185-48d0-9f11-17f6b956c6eb-image.png)

Transformer Encoder-Decoder 통합 LM으로 현재 가장 좋은 LM.
여러 어절에 대해 Masking을 하고 한꺼번에 복원한다.

![](/assets/images/최신 모델/5a0180ab-e3d7-436a-9f54-e948514bc204-image.png)

![](/assets/images/최신 모델/f577a4da-6d1e-48c7-9f2e-7162ecacb72e-image.png)

GLUE에서 제일 좋은 성능의 모델이다.

# Meena
대화만을 위한 LM.
![](/assets/images/최신 모델/8e407b53-6ec5-47f8-9be0-67e0cb7217a8-image.png)

Transformer encoder 1개와 Transformer decoder 여러개로 구성된다.

- 341GB의 소셜 미디어 데이터로 학습 , 26억개의 parameters.
- 챗봇 평가 metric인 SSA(Sensibleness and Specificity Average)를 제시
  - 구체적이고 명확한 답변을 하면 SSA 점수가 높다.
  - 애매모호한 답변만으로도 챗봇을 만들 수 있는 허점을 매꾸기 위한 점수.
  
![](/assets/images/최신 모델/f87c8902-9836-48c8-8618-50092c9c29e8-image.png)

# Controllable LM
윤리성과 같이 인간의 가치판단적인 면이 제어 가능한 LM.

## PPLM(Plug and Play Language Model)
![](/assets/images/최신 모델/f4265dd7-4e65-40f2-a6b4-184cf5438438-image.png)
- 일반적 LM
  - 확률 분포에 기반해 다음 단어 예측
- PPLM
  - 다음 단어의 예측을 개발자가 원하는대로 조정
  - 다음에 나올 단어들을 Bag of word에 저장
  
"The chicken tastes delicious"라는 문장을 원한다고 가정해보자.
그런데 모델의 결과는 마지막 어절로 ok를 준다. PPLM에서는 backpropagation을 통해서 chicken의 vector를 수정해서 마지막 어절로 delicous가 나오도록 유도를 한다.

**장점: gradient update가 발생하지 않고 단순히 출력 vector를 수정해 원하는 출력 유도.**

### 활용
- Bag of word에 여러 카테고리의 단어들을 저장한다면 해당 카테고리가 중첨된 결과물을 만들 수도 있다.
  - e.g., 기쁨 + 놀람 + 게임
- 특정 카테고리에 대한 감정을 다른 언어로 생성
  - e.g., 종교적, 정치적, 인종적 키워드를 중성적 단어로 생성
- 확률분포조절로 인터넷 밈인 그라데이션 분노 생성 가능
  - e.g., 단계적으로 분노에 대한 확률을 높여준다.
### 필요성
bias가 제거된 데이터만으로 학습된 LM은 반드시 bias가 제거된 출력을 하지 않는다. 따라서 PPLM과 같은 방법으로 현재 LM의 한계성을 극복한다.

# Mulit-modal LM
## LXMERT
Cross-modal reasoning language model
Learning Cross-Modality Encoder Representations from Transformers.
![](/assets/images/최신 모델/ae49ffc2-4884-464b-9445-5267fa4e41c3-image.png)

Image와 Language 정보를 각각 Embedding하여 해당 정보를 이미지와 자연어에 대한 정보를 생성하는 Cross-modality Encoder에 각각 모두 준다.

![](/assets/images/최신 모델/6f9ccfa5-8cf6-445d-b85c-4097188eb254-image.png)

위 예시처럼 자연어에 대한 Question에 이미지, 자연어적 대답을 모두 할 수 있었다고 한다.

## BERT for vision-and-language
BERT와 구조는 동일하다. 단지, 이미지와 자연어를 [SEP]를 기준으로 묶어서 학습했을 뿐이다. 이전과 동일하게 CLS token에 classifier를 부착해서 자연어와 이미지가 합쳐진 정보에 대한 분류가 가능하도록 설계됐다.

![](/assets/images/최신 모델/9b72842e-e625-45de-a456-823fe475a816-image.png)

## Dall-e
부스트캠프에서 벌써 3번째로 맞이하는 그 모델이다. 
![](/assets/images/최신 모델/66f3549d-2b77-4907-b5fb-63bf3048cddb-image.png)
이미지를 생성하기 위해서는 이미지 토큰을 학습해야 한다. (256, 256, 3)의 이미지만 하더라도 매우 큰 사이즈이기 때문에 위와 같은 VQ-VAE를 통해서 차원 축소를 진행한다. VQ-VAE를 매우 간략화한 도식도이다.

이렇게 이미지를 latent vector화 할 수 있게 되면 나머지는 GPT와 동일하다. 
![](/assets/images/최신 모델/2278744b-5c9f-4e93-ba02-f5702923c539-image.png)
GPT가 다음 문장을 예측하듯이 Dall-E도 256 token의 Text Embedding 뒤에 올 Image Embedding을 예측하도록 Autoregressive하게 학습한다.