---
title: "Hyperparameter tuning"
description: "."
date: "2021-08-22T19:43:58.594Z"
tags: ["PyTorch", "hyperparameter tuning"]
draft: false
---

# Hyperparameter tuning

## Hyperparameter
개발자가 수동으로 정해야하는 값들
- learning rate
- size of model
- optimizer의 종류
- epoch
- etc...

## 개요
- 모델, 데이터, hyper paramter 중에서 hyper parameter의 수치는 중요도가 가장 떨어진다.
  - 모델이 가장 중요하지만 보통 좋은 모델들은 널리 알려져있다.
  - 따라서 데이터를 가장 중요시한다.
  - hyperparameter에 너무 힘쓰진 말자.
- 그럼에도 마지막 0.01 단위의 성능 향상을 위한다면 반드시 수행해야될 것!
- 최근에는 AutoML 계열의 NAS model의 경우, 자동으로 hyperparameter tuning도 수행해준다고 한다.
- recipe: hyperparameter를 어떻게 튜닝할지 미리 모델에서 결정해주는 것

## 방법
- grid: 일정한 간격을 두고 수치 탐색
- random: 랜덤하게 수치 탐색
- 최근에는 베이진안 기법들도 사용(BOHB)

# Ray
- multi node, multi processing module
- 기본적으로 ml/dl을 위한 모듈이지만, 최근에는 python에서 기본적으로 사용하게 되는 병렬처리 모듈이라고 한다.
- hyperparameter tuning시에 가능성이 없는 수치들에 대해서는 미리 가지치기해준다.