---
title: "[프로그래머스] 입국심사"
description: "."
date: "2021-10-20T02:11:09.313Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43238

# 풀이
구현 문제로 접근하면 n이 너무 커서 풀 수 없다. 문제의 답은 최소한의 time cost를 묻고 있으므로 time cost를 기반으로 수용 가능한 인원을 정의할 줄 알아야 풀 수 있었던 문제였다.

time cost는 임의의 정수로 설정한다. time cost 동안 모든 심사관들을 일을 수행한다. 따라서 time cost를 심사관들의 처리 속도가 정의된 times 배열의 모든 요소에 대해서 나눠주면 각각의 접수원들이 time cost동안 몇 명을 심사했는지 알 수 있다.

time cost에 심사원들이 처리 가능한 인원을 알 수 있다면, 해당 time cost가 너무 많은지 적은지 판단할 수 있다. 즉, "60분의 시간이 주어졌을 때는 심사관들의 처리속도가 충분해서 처리하고자 하는 인원보다 더 많은 인원을 처리했다"라는 식으로 생각할 수 있다. 혹은 더 적은 인원밖에 처리못한 사실도 알 수 있다.

n이 매우 크기 때문에 brute force로는 적절한 time cost를 찾을 수 없고, binary search를 통해서 구해야 한다. 일반적인 binary search의 left, right index가 배열의 index를 의미했다면 이 문제에서는 time cost의 최소값, 최대값에 대해서 탐색한다고 생각하면 된다.

![](/assets/images/[프로그래머스] 입국심사/71dd7b37-9f4b-48a0-9885-01d4d8500b3c-image.png)

bs에서 mid 변수는 time cost당 몇명을 처리했는지에 따라서 변화시켜준다. mid 변수는 time cost 자체를 의미한다. 만약 주어진 time cost에서 더 많은 인원을 처리했다면 mid는 줄여야 할 것이다. 최소의 시간값을 찾기 위한 문제이기 때문이다. 만약 더 적은 인원을 처리했다면 문제의 요구사항에 맞추기 위해 mid를 늘려야 한다. 

# 코드
https://github.com/naem1023/codingTest/blob/master/bs/pg-30-43238.py