---
title: "[Baekjoon] Z"
description: "Solution for Baekjoon 1074 (Z) using recursive quadrant division and cumulative counting."
date: "2021-11-11T03:15:39.453Z"
tags: ["algorithm"]
lang: en
translationOf: "baekjoon-z"
draft: false
---

https://www.acmicpc.net/problem/1074


# Solution 1
I tried creating a minimal unit array, but it was too hard. Approaching this as an implementation problem doesn't work. It needs to be solved with recursion, using the idea of summing up elements considered as previously visited all at once.


|  1  |  2  |
|  3  |  4  |

Divide the array regions in the order shown above.
- Reference coordinate for dividing regions: top-left corner
- size: length of one side of the current search area
- Count of elements considered previously visited: size*size
  - Since array elements are sorted sequentially, accumulate the counts as you go

Whether to accumulate the count:
- In the current search area:
  - If (r, c) is present: divide the area into 4 and search again
  - If (r, c) is absent: count the elements in the area and accumulate

I implemented the counting decision with recursion.

```py
import sys
input = sys.stdin.readline

n, r, c = list(map(int, input().split()))
ans = 0

def Z(y, x, size):
    """
    Unit function that divides the area into 4.
    The reference point of the area is its top-left corner.
    y: r
    x: c
    """
    global ans

    # If the search area exactly matches (r, c), return
    if y == r and x == c:
        print(ans)
        return

    # If (r, c) is in the current quadrant
    if r < y + size and r >= y and c < x + size and c >= x:
        # Search quadrant 1
        Z(y, x, size // 2)
        # Search quadrant 2
        Z(y, x + size // 2, size // 2)
        # Search quadrant 3
        Z(y + size // 2, x, size // 2)
        # Search quadrant 4
        Z(y + size // 2, x + size // 2, size // 2)
    # Accumulate all elements in the current area as visited
    else:
        ans += size * size

# Start from (0, 0), size=N^2 and narrow down the search area
Z(0, 0, (1 << n))
```

# Solution 2
The idea of accumulating element counts is the same. The difference is that it decreases n while searching for (r, c), making it slightly faster than recursion.
```py
import sys
input = sys.stdin.readline

n, r, c = map(int, input().split())
cnt = 0
while n > 0:
    n -= 1
    # First quadrant
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
