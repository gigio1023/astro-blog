---
title: "헷갈리는 numpy"
description: "."
date: "2021-09-01T20:33:06.787Z"
tags: ["PyTorch", "numpy"]
draft: false
---

# dtype=object, when compelx list

list를 numpy로 변환하는 과정에서 str과 numerical 데이터를 혼용하면 numpy의 dtype이 obejct로 고정된다. 이 때는 해당 numpy를 index slicing해도 dtype이 바뀌지 않고, astype으로 바꾸려하면 오류가 뜬다.

```python
a = {somthing compelx Nd list}
b = np.array(a)
only_numerical = b[ {some slicing selecting only numerical data} ]

only_numerical.astype(np.float16) -> error!!

```

이 때 np.stack을 쓰니 한방에 해결됐다.. 

```python
np.stack(only_numercial)
```

# np.mean
soft voting을 구현하던 중에 np.mean을 사용해야하는 상황이 있었다. 

```python
>>> pred.shape
(10, 12800, 3)
```

10은 augmentation의 수, 12800은 데이터의 수, 3은 class의 수이다. 원하는 것은 각각의 augmentation 결과들이 가진 class 예측결과들의 평균을 구하는 것이다. 마지막 행의 평균을 구하는 것이니 다음과 같이 예측했었다.

```python
np.mean(pred, axis=-1)
```

하지만 생각해보니 axis=0을 주는 것이 의도한 것이었다. 포인트는 다음과 같다.
- np.mean의 axis는 사라진다. 가령 axis=2면 2번째 axis가 사라진다.
- 행과 열로 생각하면 Nd에서 사고 자체가 안되니, 편하게 axis 번째의 데이터에 대한 연산을 한다고 생각하자.
  - 가령 [[1,1,1,],[2,2,2,]]에서 axis=1의 평균을 구하는 것은 1, 1, 1의 평균을 구하는 것이다.
  
즉 이러한 포인트를 감안하면 axis=-1이 아니라 axis=0을 줘야한다. agumentation을 기준으로 평균을 구해야하기 때문이다.

```python
>>> pred.shape
(10, 12800, 3)
>>> np.mean(pred, axis=0).shape
(12800, 3)