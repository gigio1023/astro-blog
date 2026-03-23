---
title: "Weight Initialization"
description: "Why weight initialization matters in deep learning and why zero initialization should be avoided."
date: "2021-08-11T06:35:45.694Z"
tags: ["dl", "ml", "pytorch"]
draft: false
lang: en
translationOf: "weight-init"
---

A fellow bootcamp member wrote a good summary on this — sharing the link:
https://velog.io/@hanlyang0522/weight-init%EC%9D%84-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0

The gist: as long as you don't initialize weights to 0, there's no problem. Most frameworks handle it automatically, and when using PyTorch's built-in initialization functions (as the instructor did in the lab), it matches the default initialization anyway.

The caveat: initializing to 0 can prevent learning entirely.
