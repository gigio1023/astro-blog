---
title: "[Baekjoon] Messi Gimossi"
description: "Solution for Baekjoon 17297 (Messi Gimossi) using Fibonacci-based string search with a binary search-like approach."
date: "2021-09-02T20:17:18.103Z"
tags: ["python", "algorithm"]
lang: en
translationOf: "baekjoon-messi-gimossi"
draft: false
---

https://www.acmicpc.net/problem/17297

# Solution
ref: https://mountrivers.github.io/boj17297/

F(m) is a string expressible as a Fibonacci sequence for the m-th character, as shown below.

> F(m) = F(m - 1) + F(m - 2)

Fortunately, since the strings consist only of Messi and Gimossi, predicting the string lengths themselves is easy. The key insight is realizing you can search F(m) in a manner similar to binary search.

Ignoring spaces, and using hypothetical values rather than actual ones, consider this scenario:
- N = 100
- F(51) = 130
- F(50) = 80
- F(49) = 50
- F(48) = 30

Then we can predict that the string corresponding to F(51) contains at least the N-th character, since F(50) is 80 characters.

F(51) = F(50) + F(49) — the order of string composition matters here. Because depending on F(50)'s character count, the 100th character is either in F(50) or in F(49).

Here F(50) = 80, so the 100th character can't be in F(50).

So we need to repeat the search for the 100th character in F(49). That is, finding the 100 - 80 = 20th character in F(49).

If F(50) were larger than 100, the problem would change to finding the 100th character in F(50).

When considering spaces, you can detect them immediately. If the index between F(50) and F(49) is 100, then the 100th character is a space — detectable in O(1).

# Code
The blogger who explained this problem wrote it in C++. Converted to Python:

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
