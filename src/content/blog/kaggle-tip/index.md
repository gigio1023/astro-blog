---
title: "Kaggle tip"
description: "."
date: "2021-09-23T06:35:03.433Z"
tags: ["boostcamp", "kaggle"]
draft: false
---

# 경진대회 플랫폼
- Kaggle
- 카카오 아레나: 계열사 전용이라고 한다.
- 데이콘: public 대회. Kaggle 스타일이 적용되는 중이라고 한다.

# Ranking
- Ranking system: competition 내의 point로 정해지는 순위
  - 팀을 이뤄 출전하면 $\sqrt{N}$빵한다.
- Tier system: competition medal 수에 따라 결정

# Competition
## Purpose
- Featured
  - 상업적 대회
  - 우승한 모델을 기업에서 쓰는 경우도 있다.
- Research
  - 연구 목적 대회
  - 재밌는 주제는 많은데 상금이 낮다고 한다.
- Getting started & Playground
  - Titanic survivor같이 초심자를 위한 대회
  - 포인트, 메달용 아님
- Analytics
  - 데이터 분석 목적 대회
  - 데이터 탐색, 시각화 노트북을 제출
- Recruiment
  - 채용 목적
## Submit
- General competition
  - 리소스 제약 없음
  - submission.csv만 제출
- Code competition
  - kaggle notebook을 실행시켜 submission.csv 생성해야 한다.
  - 리소스 제한 있음
  - 쓸모 있는 모델을 만들도록 유도
  
# Processing Competition
![](/assets/images/Kaggle tip/a6770f33-28bd-4a3e-a95a-30f9e76912e4-image.png)

익히 봐왔던 도식도이다! 다른점은 다음과 같다.
- Kaggle notebook 사용
- 다른 사람이 생성한 Kaggle notebook 조회 가능
  - notebook마다 용도가 다르다. e.g., train, inference, preprocessing...
  
# For Winning
## 빠르고 효율적인 pipeline 반복
  - GPU 장비 투자
    - 한국 캐글 그마분은 Ryzen3700, RAM 64GB, RTX 2080ti 2개를 쓰신다고 한다.
    - 2개 이상의 GPU라면 비블로워(GPU wrapper) 타입을 추천하셨다. 
    - 연구자분들은 병렬 GPU가 필수일줄 알았는데 의외로 RTX 3090, 3080 1대도 좋다고 하시더라. 물론 3090 2개가 더 좋다. 
    - RTX 3070을 72만원에 사게 해준 CDPR이 있는 폴란드를 향해 오늘도 절을 한다.
  - 본인의 시간 투자
    - 1~2달 동안 평일 하루 평균 4시간 이상, 주말 하루 평균 8시간 이상 투자하신다고 한다.
  - 템플릿처럼 사용할 수 있는 본인만의 baseline
    - 개발 속도 뿐만 아니라 실수도 줄어든다.
    - [링크](https://github.com/lime-robot/categories-prediction)를 통해 최근 3개월 동안 3개의 금메달을 따셨다고 한다. 
    
## Score improvement
- Competition 내의 Notebook tab, Discussion에서 좋은 아이디어를 찾아보자
  - Augmentation, deep learing architecture
  - 참고할만한 논문
- 마지막까지 방심하지말 것을 꼭 명심하라고 하셨다.

## Validation strategy
Training set과 Test set에서 얻은 score차이를 좁히기 위한 방법론.

최종 순위 하락을 막기 위해 필수적이다. Public LB(Leader board)와 Private LB는 다르기 때문에 Public LB에 overfitting되지 않도록 하자.

- 최근에는 Test set을 공개하지 않는 추세라고 한다.
- Train set에서 Validation set 추출
  - K-fold validation
  - Startified k-fold
    - Class별로 validation set를 생성
## Ensemble
대부분의 경우 single model보다 더 좋은 성능을 얻을 수 있다. 최근 Kaggle은 아래처럼 정리되는 추세다.
서로 다른 아키텍쳐끼리 ensemble할수록 잘 나온다고 한다. e.g., LSTM, BERT

- Startified k-fold ensemble
  - validation check만 하지말고 해당 model들을 ensemble
- 정형 데이터
  - LightGBM, CatBoost, XGBoost, NNs
- 이미지 데이터
  - Resnet, efficientnet, resnext
- 텍스트 데이터
  - LSTM, BERT, GPT-2, RoBert
  
## Single model improvement
Ensemble을 처음부터 할 수는 없다. 어느 정도 single model을 개선한 후에 Ensemble을 시도해야하는데 개선의 한도선을 정해야 한다.

- 상위 랭커들이 discussion에 언급한 single model 점수
- 대회 종료 1~2주 전에 single model로만 50등 내에

# 잡다 팁
- 팀이 좋다. 혼자 하기엔 2달 이상의 여정은 너무 길다.
- 팀은 해체가 안되기 때문에 신중하자.
- 동료 후보의 현재 대회 순위를 확인하자. 생각 외로 게으른 사람이 많다고 한다.
- 폴더별로 v1, v2와 같은 version 관리.
  - Ensemble할 때 폴더 별로 정리한 version끼리 할 가능성을 열어두기 위해서 이렇게 하신다고 하더라.
  - VCS는 최종 업로드 시에만 사용한다고 하신다. ??? Version control을 아예 안하신다고 하셨다.