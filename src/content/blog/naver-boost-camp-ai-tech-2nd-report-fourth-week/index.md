---
title: "부스트캠프 AI Tech 2기 4주차 학습정리"
description: "."
date: "2021-08-27T08:55:22.918Z"
tags: ["boostcamp"]
draft: false
---

# 4주차 학습정리
## 강의 복습 내용
### ai competition (1~6번 포스팅)
https://velog.io/@naem1023/series/Ai-competition

## 과제 수행 과정 / 결과물 정리

학습 계획 수립: https://velog.io/@naem1023/TIL-train-%EA%B3%84%ED%9A%8D-%EC%A0%95%EB%A6%AC-2021.08.24


과제 수행 과정 정리: https://velog.io/@naem1023/TIL-%EC%BD%94%EB%94%A9-%EC%A0%95%EB%A6%AC-2021.08.2527


## 피어세션 정리
대회가 있다보니 학습을 위한 방법들을 공유했다. 가령, hyper parameter는 어떻게 줄 것인지. 어떤 모델을 쓰는 것이 과연 의미가 있는지.

내부적인 결론은 어떤 cnn 모델을 쓰든 크게 결과는 달라지지 않은 것 같다라고 결정지었다. mobilenet, resnet, efficientnet이든 소수점 아래에서 유의미한 차이가 있긴하지만 결정적인 차이를 보여주진 않았다.

일단 다양한 방법을 시도하는 것이 좋다고 의견이 모였다. 배운 것도 많을뿐더러 배운 것들을 실제로 적용해봐야하기 때문이다.
 

## 학습 회고
21/08/23: jupyter 노트북으로 여러 방법들 실험해 대회에 제출
21/08/24: jupyter 노트북으로 실험한 내용들을 pipeline으로 만들어서 프로젝트 구성.
21/08/25: efficientnet-b7, VOLO, BiT, CaiT를 시도
21/08/26: efficientnet-b4, resnet18로 간단하게 테스팅하면서 프로젝트 개선
21/08/27: cut mix 구현