---
title: "[백준] Messi Gimossi"
description: "."
date: "2021-09-02T20:17:18.103Z"
tags: ["Pyton", "algorithm"]
draft: false
---

https://www.acmicpc.net/problem/17297

# 풀이
ref: https://mountrivers.github.io/boj17297/

F(m) 아래와 같이 m번째 문자에 대해서 피보나치 수열로 표현할 수 있는 문자열이다.

> F(m) = F(m - 1) + F(m - 2)

다행히도 문자열은 Messi와 Gimossi만 존재해서 문자열의 수를 예측하는 것 자체는 쉽다. 관건은 F(m)에서 마치 binary search를 하는 것 마냥 F(m)을 탐색할 수 있는지를 떠올려야 한다.

공백을 무시하고, 문제를 재현한 값들은 아니지만 다음의 상황을 가정해보자.
- N = 100
- F(51) = 130
- F(50) = 80
- F(49) = 50
- F(48) = 30


그럼 F(51)에 해당하는 문자열에는 최소한 N번째 문자가 있음을 예상할 수 있다. F(50)이 80글자이기 때문이다.

F(51) = F(50) + F(49)의 순서로 문자열이 구성된다. 이 순서가 매우 중요하다. 왜냐하면 F(50)의 글자 수에 따라서 100번재 문자가 F(50에 있는지, 혹은 F(49)에 있는지 결정되기 때문이다.

여기서는 F(50) = 80이므로 F(50)에는 100번째 문자열이 올 수가 없다.

따라서 F(49)에서 100번째 문자열을 찾는 과정을 반복해야한다. 즉, 100 - 80 = 20번재 문자열을 F(49)에서 찾는 문제로 바뀐 것이다.

만약 F(50)이 100보다 컷다면 F(50)에서 100번째 문자열을 찾는 문제로 문제를 바꾸면 된다.

공백을 고려하면 공백을 즉시 탐색할 수도 있다. F(50)과 F(49) 사이의 인덱스가 100이라면 100번째 문자열은 공백인 것을 O(1)에 알 수 있다.


# 코드
이 문제를 해설해주신 블로거께서는 C++로 짜셨고, 해당 코드를 python으로 옮기면 아래와 같다.

```python
import sys
N = int(sys.stdin.readline())

pibo = []
b = 'Messi Gimossi'
q = 5
w = 13
pibo.append(q)
pibo.append(w)

while w < 1073741824:
    e = w
    w = w + q + 1
    q = e
    pibo.append(w)

i = 0
while pibo[i] < N:
    i += 1

'''
String Order
F(M) = F(M-1) + F(M-2)
'''
while i >= 2:
    # Detect space, exit immediately
    if N == pibo[i - 1] + 1:
        N = -1
        break
    # If target is located on F(M - 2)
    elif N > pibo[i - 1]:
        # Decrease counter
        i -= 2
        # Decrease N with F(M - 1)
        N -= pibo[i + 1] + 1
    # If target is located on F(M - 1)
    else:
        i -= 1

if N == -1 or N == 6:
    print('Messi Messi Gimossi')
else:
    print(b[N - 1])

```