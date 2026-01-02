---
title: "facet"
description: "."
date: "2021-08-22T21:04:31.712Z"
tags: ["data viz"]
draft: false
---

# Facet
분할. 즉, 하나의 데이터 셋에 대해서 서로 다른 방법으로 시각화를 하는 것.
- 서로 다른 인코딩을 통한 다른 인사이트
- 같은 방법으로 동시에 여러 feature 보기
- 큰 관점, 작은 관점 등...

matplotlib에서의 facet은 여러개의 figure, ax를 통해 표현할 수 있다.

## Grid spec
![](/assets/images/facet/0fc1a677-5eaa-4ed8-8913-9297326cda59-image.png)
말 그대로 ax를 마치 grid처럼 보는 것이다. grid처럼 사용하는 방법은 두가지가 있다.
- numpy와 같은 slicing
- x, y, dx, dy 사용
## ax 내부에 subplot 추가
![](/assets/images/facet/1a173eaa-693a-4a9c-9c8e-1d9f61eae65e-image.png)
미니맵과 같은 형태로 추가된다.