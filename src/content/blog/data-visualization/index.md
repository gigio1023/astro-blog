---
title: "데이터 시각화"
description: "."
date: "2021-08-09T13:06:49.641Z"
tags: ["ML", "data viz"]
draft: false
---

# Data viz
## 데이터
시각화를 진행할 데이터
- 데이터셋 관점(global)
- 개별 데이터의 관점(local)

### 정형 데이터
CSV 파일.
![](/assets/images/데이터 시각화/1484c59d-c573-4c81-9589-73f236ab76e7-image.png)

item = row 1개
attribute(feature) = column

### 시계열데이터
![](/assets/images/데이터 시각화/e48008d8-1e3e-4129-8973-8dbc01291416-image.png)
- 시간의 흐름에 따른 Time-Serires 형태.
- 음성, 비디오
- 시간 흐름에 따른 추세(trend), 계절성(SEasonality), 주기성(cycle)을 살핀다.

### 지리/지도 데이터
![](/assets/images/데이터 시각화/fe86e094-5886-4ab7-afb1-c7131245d584-image.png)

- 거리, 경로, 분포 등을 사용

### 관계 데이터
![](/assets/images/데이터 시각화/3929c3f1-8c33-4731-9c2d-fede261217d2-image.png)

- 객체 간의 관계를 시각화
- 객체는 Node
- 관계는 Link

### 계층적 데이터
![](/assets/images/데이터 시각화/75e8e44a-586d-4da1-8c8d-f4776af7e2d7-image.png)

- 포함관계가 분명한 데이터
- Tree, Treemap, Sunburst 등..

## 데이터의 종류
- 수치형(numerical)
  - 연속형(continuous) : 길이, 무게, 온도..
  - 이산형(discrete) : 주사위 눈금, 사람 수 ...
- 범주형(categorical)
  - 명목형(nominal) : 혈액형, 종교 ...
  - 순서형(ordinal) : 학년, 별점, 등급 ...
  
이산형과 순서형이 혼용될 수 있다.
- 이산형 : 수치적으로 비례해서 사용 가능하다.
- 순서형 : 이산형이 아니고 순서 같은 것들이 존재하는 것?

## mark, channel
Mark
- 점, 선, 면으로 이루어진 시각화 데이터

Channel
- 각 마크를 변경할 수 있는 요소들
![](/assets/images/데이터 시각화/5486582e-4644-44a4-96fb-a0d097d0f8e7-image.png)

## Pre-attentive Attribute(전주의적 속성)
특별히 관심을 가지지 않아도 사람이 자연스럽게 인지하게 되는 요소들을 의미한다.
![](/assets/images/데이터 시각화/15c051bd-5598-496c-8194-443cc576886f-image.png)

가령 위 그림에서 Orientation은 가운데 요소만 기울기만 다른 것을 한번에 알 수 있다. 

_**동시에 사용하면 인지하기 어렵다!**_
적절하게 사용해, 시각적 분리(visual pop-out) 유도하자.