---
title: "부스트캠프 AI Tech 2기 1주차 학습정리"
description: "."
date: "2021-08-06T05:37:46.336Z"
tags: ["Naver-Boostcamp"]
draft: false
---

# 1주차 학습정리
## 강의 복습 내용
### ai math (1~11번 포스팅)
https://velog.io/@naem1023/series/ai-math

### python (1~2번 포스팅)
https://velog.io/@naem1023/series/python

## 과제 수행 과정 / 결과물 정리
선택과제 1이 관건이었다. gradient descent를 직접 구현할 때, 벡터 연산을 통한 구현은 수업에서 다뤄서 할만했다.
하지만 y = mx + c와 같은 일차함수의 gradient descent를 예시에 맞춰서 진행하는 부분에서 의외로 막막했다.

https://towardsdatascience.com/linear-regression-using-gradient-descent-97a6c8700931

이전에도 gradient descent를 notion에 정리하면서 익혔던 내용인데, 자주 까먹어서 위 링크의 내용을 참고했다. 앞으로도 자주 참고해야겠다.

관건은 위 링크에서 서술하듯, loss function을 정의하고 m과 c에 대해서 미분한 것을 gradient vector처럼 사용하면 되는 것이다.

![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/9b9e6416-22d6-4f53-aa73-f908b373f364-image.png)
![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/ee96d9af-354c-4004-b2c7-8fb64d8f879a-image.png)
loss function을 m과 c에 대해 각각 미분하고, m과 c는 아래와 같이 익숙한 수식 형태를 통해 업데이트한다.
![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/d1271fde-207e-4577-9dc4-e5503f64c58e-image.png)

해당 과정을 numpy를 활용해 그대로 코드화하여 해결했다.

## 피어세션 정리
피어세션에서 자주 언급되고 상의했던 내용들을 임성빈교수님께서 정말 좋게 정리해주셨다.
모호하거나 정보 자체를 몰라서 피어세션에서 서로 해맸던 내용들이니 피어세션 정리란에 정리하겠다.

https://naem1023.notion.site/4b3c83b157ca43a8b6d1ef706084a1fb

이는 노션을 통해서 정리해봤다.

## 학습 회고
https://naem1023.notion.site/ML-68740e6ac0db42e9a01b17c9ab093606
그 동안 대학생활 하면서 차근차근 위 링크에 정리했던 내용들을 부캠에서 다시 배웠던 첫 주였다. 그럼에도 모두 새로웠다.
그만큼 기초조차도 탄탄하지 못한 뜻으로 이해했다.

velog에 공부 내용들을 모두 정리하면서 공부했던 것들이 잘 쌓여져가면 좋겠다.