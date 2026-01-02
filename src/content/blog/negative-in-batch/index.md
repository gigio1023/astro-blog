---
title: "Negative in-batch"
description: "."
date: "2021-10-18T17:53:53.788Z"
tags: ["MRC"]
draft: false
---

# 기존의 negative sampling

query batch는 기존대로 유지한다. 

passage batch가 달라진다.
1개의 positive passage와 batch_size개의 negative passage로 총 batch_szie + 1 개의 데이터로 하나의 batch를 구성한다.

# Negative in-batch

passage batch는 batch_size개만큼 구성한다. 기존 방식과는 다르게 따로 negative sampling을 하지 않는다. positive 관계인 query와 passage들을 한 쌍으로 같이 넣어주기만한다.

1. random하게 batch의 요소들을 구성한다.
2. n개의 batch 요소들 중 i번째 query와 나머지 i-1개들은 negative passage 관계이다.
3. 해당 batch를 학습할 때, batch 간의 상관관계들이 함께 학습된다.
4. loss를 구할 때는 batch 내의 index들에 해당하는 positive passage를 target으로 설정한다. 여기서는 torch.arange 같은 함수로 등차수열을 만들면 된다.
5. 학습은 전체 batch에 대해서 이루어지고, loss는 positive sample들에 대해서만 이루어진다.
e.g., batch_size = 4
```py
sim_scores = tensor([[-1.0768e+01, -3.7684e+01, -1.3255e-04, -9.1018e+00],
        [-2.1763e+01, -6.3134e+01,  0.0000e+00, -1.6743e+01],
        [-1.6615e+01, -4.5871e+01, -1.0729e-06, -1.3856e+01],
        [-1.3989e+01, -5.5973e+01, -1.1598e-04, -9.0696e+00]],

targets =  [0,1,2,3]
```
sim_scores 내의 item들은 target에 해당하는 index를 답으로 가지도록 확률이 출력된다. sim_scores의 0번째 item의 i번재 요소들은 i번째를 target에 대한 확률을 의미한다.

따라서 target은 0, 1, 2, 3가 된다.