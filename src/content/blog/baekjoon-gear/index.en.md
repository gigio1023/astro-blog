---
title: "[Baekjoon] Gear"
description: "Solution for Baekjoon 14891 (Gear/Cogwheel) using recursive state checking and deque-based rotation."
date: "2021-10-26T20:12:15.305Z"
tags: ["algorithm"]
lang: en
translationOf: "baekjoon-gear"
draft: false
---

https://www.acmicpc.net/problem/14891

# Solution 1
[ref blog](https://wisdom-990629.tistory.com/entry/C-%EB%B0%B1%EC%A4%80-14891%EB%B2%88-%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4)
It was an implementation problem where I needed to figure out how to implement rotation and state checking with recursion.

1. Input rotation query
2. Rotate the gear specified in the rotation query
3. Split into left and right to calculate whether each gear should rotate
4. Rotate based on the left/right rotation values

Step 3 can be solved with recursion. You could compute the indices directly, but since n is small, recursion produces simpler code.

For step 4, I tried implementing rotation through simple index element deletion, but it didn't work well. Since n isn't large, I moved each element one by one to implement rotation.

I got stuck on index issues in step 3 and couldn't solve it within the time limit. I ended up looking at the answer later.

# Solution 2
[ref github](https://github.com/keemdy/algorithm-test/blob/main/BOJ/1026/%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4.py)

The process is the same as Solution 1.
1. Input rotation query
2. Rotate the gear specified in the rotation query
3. Split into left and right to calculate whether each gear should rotate
4. Rotate based on the left/right rotation values

The difference is that steps 2 and 4 use deque instead of list, and step 3 uses index calculation instead of recursion.

Step 3 can be implemented either way, but for steps 2 and 4 deque seems better. Since it uses C's linked list implementation, deque.rotate is concise and should be faster. Use deque.

# Code

[Solution 1 code](https://github.com/naem1023/codingTest/blob/master/implementation/acmicpc-14891.py)
[Solution 2 code](https://github.com/keemdy/algorithm-test/blob/main/BOJ/1026/%ED%86%B1%EB%8B%88%EB%B0%94%ED%80%B4.py)
