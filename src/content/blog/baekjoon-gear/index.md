---
title: "[백준] 톱니바퀴"
description: "."
date: "2021-10-26T20:12:15.305Z"
tags: ["algorithm"]
draft: false
---

https://www.acmicpc.net/problem/14891

# 풀이1
[ref blog](https://wisdom-990629.tistory.com/entry/C-%EB%B0%B1%EC%A4%80-14891%EB%B2%88-%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4)
구현 문제였고 재귀로 회전과 상태 체크를 어떻게 구현할지 떠올려야 했다.

1. 회전 쿼리 입력
2. 회전 쿼리에 해당하는 톱니바퀴 회전
3. 왼쪽과 오른쪽으로 구분지어서 톱니바퀴 회전 유무를 계산
4. 왼쪽과 오른쪽으로 구별된 회전유무 값에 따라서 rotate

3번을 재귀로 풀면된다. index를 직접 계산해도 되지만 n이 작고 좀 더 간단한 코드가 나온다.

4번은 index요소 삭제로 간단하게 구현하려고 했는데 생각보다 잘 안됐다. 이것도 n이 크지 않아서 하나하나 다 옮겨서 rotate를 구현했다.

3번에서 인덱스 문제로 해매서 시간 내에 못 풀고 나중에 답을 봤다..

# 풀이2
[ref github](https://github.com/keemdy/algorithm-test/blob/main/BOJ/1026/%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4.py)

프로세스는 풀이1과 동일하다.
1. 회전 쿼리 입력
2. 회전 쿼리에 해당하는 톱니바퀴 회전
3. 왼쪽과 오른쪽으로 구분지어서 톱니바퀴 회전 유무를 계산
4. 왼쪽과 오른쪽으로 구별된 회전유무 값에 따라서 rotate

2, 4번을 list가 아닌 deque로 구현하고, 3번을 재귀가 아닌 인덱스 계산으로 풀이한 점이 다르다. 

3번은 어떻게 구현하든 상관없는데 2, 4번의 경우 deque 사용이 더 좋아보인다. c의 linked list로 구현된 deque를 쓰기 때문에 deque.rotate가 간결하고 더 빠를 것이다. deque를 쓰자.

# 코드

[풀이 1 코드](https://github.com/naem1023/codingTest/blob/master/implementation/acmicpc-14891.py)
[풀이 2 코드](https://github.com/keemdy/algorithm-test/blob/main/BOJ/1026/%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4.py)