---
title: "부스트캠프 AI Tech 2기 8주차 학습정리"
description: "."
date: "2021-09-24T09:24:46.070Z"
tags: ["boostcamp"]
draft: false
---

# 8주차 학습정리
## 강의 복습 내용
https://velog.io/@naem1023/NLP-%ED%97%B7%EA%B0%88%EB%A0%B8%EB%8D%98-%EC%A0%90%EB%93%A4
https://velog.io/@naem1023/Kaggle-tip
https://velog.io/@naem1023/AI-model-as-Service%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%96%A5-AI-%EB%AA%A8%EB%8D%B8
https://velog.io/@naem1023/MLOps-%EC%A0%95%EB%A6%AC


## 과제 수행 과정 / 결과물 정리
대회 준비를 위해 MLOps 관련된 사항들을 미리 조사해보고 테스트해볼 내용들을 미리 수행했다.

Github actions
- Wandb action을 많이 사용할줄 알았지만, 결과를 정리해주는 csv generator였다. Wandb가 더 좋기 때문에 안 쓰기로 했다.


## 피어세션 정리
- Validation set의 class 분포를 항상 균등하게 주는 것이 모델을 robust하게 만들어주지 않을까? 라는 논의를 했다.
  - 내 생각과 결과는 '아니다'이다.
  - 모델의 학습 행위는 모집단 추정이다. 모집단의 성질을 알기 위해서 모집단의 성질을 미리 예측하는 것은 학습에서 위험할수 있다. 왜냐하면 validation set의 score가 잘 나오도록 학습할 것이기 때문에 validation set에 적합한 model이 생성될 것이기 때문입니다. 또한 validation set에 대한 가설이 언제나 모집단을 대표해준다는 보장은 없다. **즉, validation set의 분포를 미리 결정하는 것은 모집단 추정에 도움되는지 모르기 때문에 불필요한 행위라고 생각한다.**
  - validation set의 class 분포는 train set과 맞춰주는 것이 좋다고 생각한다. **train set과 validation set의 class 분포를 맞춰주는 것은 train, validation data의 통일성을 유지시켜줘서 학습에 불필요한 노이즈를 발생시켜주지 않고, 다른 학습 방법론들이 imbalanced class 분포를 조정해줄 여지를 남겨준다.** 만약 validation set과 train set의 분포가 다르다면 불필요한 노이즈가 발생해서 학습 방법론의 결과에 대한 신뢰성이 사라질 것이다. 
  - 하지만 validation set 조작 자체가 무의미한 것은 아니다. 정확히는 validation set이 아니라 **dataset의 조작이 필요한 경우는 분명 존재할 것이다.**
  - 가령 학습 데이터의 class 분포가 99대1이라면 학습이 전혀 안 될 가능성이 매우 크다. 이러한 경우는 dataset의 분포를 어느정도 조정해서 99대1보다는 balanced하게 만들어주고 이에 대해서 train, validation set을 만들면 되겠다.
  - **_결론_**
    - **train, validation set의 분포가 다르다면 학습 과정에 노이즈가 발생해 학습 방법론의 신뢰성이 사라진다.** 따라서 통상적으로 정확한 validate가 아니라 할 수 있지만, 극단적 dataet에 대해서는 dataset의 분포 조작이 필요할 것 같다.

## 학습 회고

21/09/09: 특강 4개 수강.
21/09/10: 특강 4개 수강.