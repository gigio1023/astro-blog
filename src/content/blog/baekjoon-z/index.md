---
title: "[백준] Z"
description: "."
date: "2021-11-11T03:15:39.453Z"
tags: ["algorithm"]
draft: false
---

https://www.acmicpc.net/problem/1074


# 풀이1
최소 단위 배열을 만들어서 풀려고 했는데 너무 어려웠다. 구현 문제로 접근하면 안된다. 이전에 방문됐다고 간주되는 요소들을 한꺼번에 더하는 아이디어를 활용해 재귀로 풀어야 한다.


|  1  |  2  |
|  3  |  4  |

배열 영역을 위와 같은 순서로 분리해서 본다. 
- 영역을 구분하는 기준 좌표: 좌측 상단
- size: 현재 탐색하고자 하는 영역의 한변의 길이
- 이전에 방문됐다고 간주되는 요소들의 개수: size*size
  - 배열의 요소들이 순서대로 정렬됐기 때문에 개수들을 누적시켜주면서 counting한다.

누적 요소 개수 counting 여부
- 현재 탐색하고자 하는 영역에
  - r, c가 있다면 영역을 4분할해서 다시 탐색
  - r, c가 없다면 영역 내에 존재하는 요소들의 개수를 counting해서 누적

counting 여부를 재귀로 구현해서 풀었다.

```py
import sys
input = sys.stdin.readline

n, r, c = list(map(int, input().split()))
ans = 0

def Z(y, x, size):
    """
    영역을 4분할하는 단위 함수.
    영역의 기준점은 해당 영역의 가장 왼쪽 위 구석.
    y: r
    x: c
    """
    global ans

    # 검색 영역이 정확하게 (r, c)와 일치한다면 반환
    if y == r and x == c:
        print(ans)
        return

    #  r, c가 현재 사분면에 존재한다면
    if r < y + size and r >= y and c < x + size and c >= x:
        # 1사분면 탐색
        Z(y, x, size // 2)
        # 2사분면 탐색
        Z(y, x + size // 2, size // 2)
        # 3사분면 탐색
        Z(y + size // 2, x, size // 2)
        # 4사분면 탐색
        Z(y + size // 2, x + size // 2, size // 2)
    # 지나왔다고 간주되는 현재 영역들을 모두 ans에 누적시킨다.
    else:
        ans += size * size

# (0, 0), size=N^2부터 시작해서 검색 영역을 좁혀간다.
Z(0, 0, (1 << n))
```

# 풀이2
누적되는 요소들의 개수를 누적시킨다는 아이디어는 같다. 다른 점은 n을 감소시켜면서 (r, c)를 찾기 때문에 재귀보다 좀 더 빠르다. 
```py
import sys
input = sys.stdin.readline

n, r, c = map(int, input().split())
cnt = 0
while n > 0:
    n -= 1
    # 첫번째
    if r < 2**n and c < 2**n:
        continue
    elif r < 2**n and c >= 2**n:
        cnt += (2**n)*(2**n)*1
        c -= 2**n
    elif r >= 2**n and c < 2**n:
        cnt += (2**n)*(2**n)*2
        r -= 2**n
    else:
        cnt += (2**n)*(2**n)*3
        r -= 2**n
        c -= 2**n

print(cnt)
```