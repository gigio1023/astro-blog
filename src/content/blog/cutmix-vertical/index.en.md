---
title: "CutMix Vertical"
description: "Applying vertical CutMix augmentation for face mask classification to focus patches on facial regions."
date: "2021-08-28T14:48:06.653Z"
tags: ["computer-vision", "ai-competition"]
draft: false
lang: en
translationOf: "cutmix-vertical"
---

# CutMix
Originally, CutMix samples image patches randomly. This approach might not be very effective for mask images.
To determine mask wearing, gender, and age, it would be most effective to detect only the face and patch that. So if patching randomly, it should be within the facial region.

But face detection requires extra effort... Felt stuck. Looking around, others had seen performance improvements by applying CutMix vertically.

# Implementation
https://github.com/naem1023/boostcamp-pstage-image/blob/main/loss_set/cut_mix.py
This combines the PyTorch implementation code from the previous post with vertical CutMix code shared by someone else.

CutMix itself is not so hard to implement -- the difficult part was figuring out how to incorporate it into training and compute evaluation metrics.
