---
title: "CutMix vertical"
description: "."
date: "2021-08-28T14:48:06.653Z"
tags: ["CNN", "ai competition", "cutmix"]
draft: false
---

# CutMix
본래 cutmix는 랜덤하게 이미지 패치를 샘플링한다. 해당 방식이 마스크 이미지에선느 썩 효과적이지 못할 수도 있다. 
마스크를 착용여부, 성별, 나이를 알기 위해서는 얼굴만 detection해서 patch를 하는것이 가장 효과적일 것이다. 따라서 랜덤하게 패치하고자한다면, 얼굴 영역 내에서 해야한다.

하지만 얼굴 detection을 하기 위해서는 또다른 수고가 들어간다... 막막하다. 찾아보니 다른 분들은 cutmix를 vertical하게 줘서 성능향상이 있었다고 한다.

# 구현
https://github.com/naem1023/boostcamp-pstage-image/blob/main/loss_set/cut_mix.py
이전 포스팅에 있던 pytorch implementation 코드와 다른 분이 공유해주신 vertical cutmix 코드를 합친 구현물이다.

cutmix는 구현 자체가 어렵다기보다는, 이를 학습에서 어떻게 반영하고 평가지표를 산출할지가 너무 어려웠다.