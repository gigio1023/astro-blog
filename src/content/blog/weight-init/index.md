---
title: "weight init"
description: "."
date: "2021-08-11T06:35:45.694Z"
tags: ["DL", "ML", "PyTorch"]
draft: false
---

다른 캠퍼분이 정리해주신 내용이 있는데 공유한다.
https://velog.io/@hanlyang0522/weight-init%EC%9D%84-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0

정리하면, weight init을 0으로 하지 않는 이상 문제는 없다. 자동으로 해주기도 하고, 실습에서 강사님께서 하신것처럼 pytorch 빌트인 함수를 통해 init을 하는 경우 기본 init과 동일하기 때문이다.
다만, 0으로 하면 학습이 안될 수도 있다.