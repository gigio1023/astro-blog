---
title: "numpy.matmul, numpy.dot"
description: "."
date: "2021-01-01"
tags: ["numpy", "python"]
draft: false
---

ref: https://blog.naver.com/cjh226/221356884894

고등학교 때 배운 2차원 행렬곱 이상은 그림으로 그리기 어렵거나 불가능하다.
100차원 x 100차원을 어떻게 그림으로 표현하겠는가.

그래서 아래와 같이 수식으로 정의를 하고, 이 정의에 따라서 두가지로 나뉜다.

# np.dot
A x B라고 하면 A의 마지막 차원과 B의 마지막에서 두번째 차원이 일치해야 곱한다.
>
np.dot(A,B)[i,j,k,m] == np.sum(A[i,j,:] * B[k,:,m])


# np.matmul
A x B라고 하면 A와 B의 마지막 두 개의 차원이 일치해야 곱한다.
즉, 마지막 두 개의 차원에 대해서 나머지 차원만큼 stack처럼 쌓은거라고 간주한다.
e.g., (2,3,4)면 (3,4)를 2개 쌓았다.

>
np.matmul(A,B)[i,j,k] == np.sum(A[i,j,:] * B[i,:,k])


# 결론
정의는 이해했는데, 사용법이 어떻게 다른지는.. 모르겠다.