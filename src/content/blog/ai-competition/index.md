---
title: "ai competition"
description: "."
date: "2021-08-23T04:42:14.134Z"
tags: ["competition"]
draft: false
---

# 접근방법
- 대회 시작하자마자 데이터 열어보지말고 overview check.
# EDA(Exploratory Data Analysis)
![](/assets/images/ai competition/26691a6c-56b0-43d9-9f13-bebacd91e628-image.png)
탐색적 데이터 탐색. 
- input이 될 X에 대한 분석
- target이 될 y에 대한 분석
- X, y관계를 확인할 수 있는 분석

## EDA in image classification
- input이 될 X에 대한 분석
  - X는 Image가 됩니다. X에 대한 특성(feature)은 어떤 것이 있을까요??
- 이미지 사이즈
- 분석 대상이 되는 객체의 위치
- RGB 채널별 통계 값
	- 이미지에서 r,g,b 중 어떤 것이 유독 강한가?
- target이 될 y에 대한 분석
	- y는 저희가 맞추고자 하는 값이며 y값에 대한 특성은 어떤 것이 있을까요?? 
- y값에 독립적 분포 확인
	- class의 개수를 확인해보자.
	- ex) y_1의 분포는?
- y값 들간의 관계 분포 확인
	- class 간의 개수가 확연하게 차이가 나는가?
	- ex) y_1, y_2 정보를 섞은 분포는?
- X, y 관계를 확인할 수 있는 분석
	- X특성과 y의 특성 간의 분포 차이는 어떻게 있을까요??
- 이미지 사이즈와 y 특성의 관계
	- 이미지를 키웠을 때 학습이 잘 되는 경우도 있다.
    - 이미지의 사이즈를 바꿨을 때 학습이 잘 되는 경우를 찾아보자.
- RGB 통계값과 y 특성의 관계
	- rgb channel shift: r,g,b의 순서를 섞어서 채널에 종속되게 학습하지 않도록.
- 객체의 위치와 y 특성의 관계
- 데이터의 노이즈 확인
	- ex) y 값이 잘못 부여된것이 있을까??