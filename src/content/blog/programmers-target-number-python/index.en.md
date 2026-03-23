---
title: "[Programmers] Target Number (Python)"
description: "Solution for the Programmers target number problem with DFS, BFS, and itertools.product approaches."
date: "2021-08-15T15:52:19.688Z"
tags: ["algorithm", "python"]
lang: en
translationOf: "programmers-target-number-python"
draft: false
---

# Problem
You have n non-negative integers. You want to make a target number by adding or subtracting them appropriately. For example, to make 3 from [1, 1, 1, 1, 1]:
>
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

Given an array `numbers` of available digits and a `target` number, write a solution function that returns the number of ways to reach the target by adding and subtracting.

Constraints:
- The count of given numbers is between 2 and 20.
- Each number is a natural number between 1 and 50.
- The target number is a natural number between 1 and 1000.

# Solution

Apparently this can be solved with BFS or DFS. I didn't know that and ended up looking at solutions after struggling.
With n blanks to fill and only +/- as available signs, the naive approach is $2^n$. An efficient algorithm is a must.


## dfs
```python
answer = 0
def DFS(idx, numbers, target, value):
    global answer
    N = len(numbers)
    if(idx== N and target == value):
        answer += 1
        return
    if(idx == N):
        return

    DFS(idx+1,numbers,target,value+numbers[idx])
    DFS(idx+1,numbers,target,value-numbers[idx])

def solution(numbers, target):
    global answer
    DFS(0,numbers,target,0)
    return answer
```

This was the easiest to understand.

It implements the process of working through the equation using recursion. The +/- decisions are accumulated into `value` through recursive calls.

The answer is found when all blanks have been filled in `value` and `value` equals `target`. If all blanks are filled but `idx` equals N without matching, that's a dead end.

It seems more like BFS than DFS to me... but anyway, it was the easiest to follow.

## product
```python
from itertools import product
def solution(numbers, target):
    l = [(x, -x) for x in numbers]
    s = list(map(sum, product(*l)))
    return s.count(target)
```

`product` performs the same kind of join operation between lists as in databases. The list needs to be unpacked when passed, hence the asterisk on `l`.
https://mingrammer.com/understanding-the-asterisk-of-python/


1. Create a list of tuples with +/- signs for each element of numbers.
2. Use product to get all combinations across l.
3. Apply sum to each combination via map.
4. Return the count of combinations whose sum equals target.

The cleanest code. Not sure about performance guarantees, but given the problem's constraints, Python built-in functions seem to be enough.

## bfs
```python
import collections

def solution(numbers, target):
    answer = 0
    stack = collections.deque([(0, 0)])
    while stack:
        current_sum, num_idx = stack.popleft()

        if num_idx == len(numbers):
            if current_sum == target:
                answer += 1
        else:
            number = numbers[num_idx]
            stack.append((current_sum+number, num_idx + 1))
            stack.append((current_sum-number, num_idx + 1))

    return answer
```

Similar to the DFS approach above. It repeatedly updates `current_sum`, passes it to the recursive function, and checks.
