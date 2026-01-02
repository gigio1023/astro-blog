---
title: "color"
description: "."
date: "2021-08-22T20:58:50.619Z"
tags: ["data viz"]
draft: false
---

실습에 사용된 코드가 너무 많아, 코드 관련된 내용은 쥬피터 노트북에만 정리해놨다.

# 연속형(sequential)
![](/assets/images/color/1664f5cb-f531-4880-8a67-6ff4ab15a674-image.png)
- sequential data에 적합
- 연속적 색상으로 표현

# 발산형(divere)
![](/assets/images/color/10cc8235-025a-4a1c-bbf1-5af971a84260-image.png)
- 중앙을 기준으로 발산
  - 상반된 값(기온), 서로 다른 2개(지지율) 데이터에 적합
- 보통 양 끝으로 갈수록 짙은 색
- 중앙의 색은 양쪽의 점에 편향되지 않은 색

## 예시
![](/assets/images/color/d218b671-672d-42dd-bd58-24e6073660a8-image.png)
대한민국 평균 기온 데이터

# HSI
matplotlib의 color api는 hsi를 사용한다고 한다. 대학교 컴퓨터 비전 시간에 배웠던 '그 색공간'이다..

- Hue(색조): 색상, 보색이 존재한다. 보색끼리 더하면 흰색이다. 보통 색조의 차이가 가장 알기 쉽다.
- Saturation(채도): 흰색과 순수색의 혼합 비율. '연하다', '진하다' 등으로 표현.
- Lightness(광도): 명암. 밝기.

# color palette
모듈에서 기본적으로 제공해주는 palette도 있지만, github에 다양한 color palette가 있다. 전문적으로는 adobe color를 사용한다고 한다.
https://color.adobe.com/create/color-wheel

## RColorBrewer palettes
https://www.datanovia.com/en/blog/top-r-color-palettes-to-know-for-great-data-visualization/

이게 구분이 잘되고 이쁘다고 하셨다.