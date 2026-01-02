---
title: "경량화 대회"
description: "."
date: "2021-11-28T13:26:00.481Z"
tags: ["ligthweight"]
draft: false
---

# 경량화의 관점
- 모델 크기(=파라미터 수)를 줄이자
- 속도를 빠르게만 해보자
- 연산횟수를 작게 바꿔보자

# FLOPs
- 연산횟수를 나타내는 factor
- 연산속도를 결정하는 간접적인 factor

ShuffleNetv2라는 논문에서 FLOPs외에 속도에 영향을 끼치는 요소를 고려하여 가이드라인을 다음과 같이 제시했다.
- 입출력의 크기가 동일할 때 memory access cost
- 큰 Group convolution은 memory cost를 증가
- 여러 분기의 path가 나오는 구조. 즉, 모델이 병렬적으로 구성되면 속도 저하 발생.
- Element-wise operation은 무시하지 못할 비중을 가지고 있으니 주의하자.