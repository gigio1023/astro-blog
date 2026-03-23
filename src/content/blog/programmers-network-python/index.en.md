---
title: "[Programmers] Network (Python)"
description: "Solution for the Programmers network problem using DFS to count connected components."
date: "2021-08-15T19:49:33.274Z"
tags: ["algorithm", "python"]
lang: en
translationOf: "programmers-network-python"
draft: false
---

# Problem

A network is a form of connection where computers can exchange information with each other. For example, if computer A is directly connected to computer B, and computer B is directly connected to computer C, then computer A and computer C can also indirectly exchange information. So computers A, B, and C are all on the same network.

Given the number of computers n and a 2D array `computers` containing connection information, write a solution function that returns the number of networks.

Constraints:
- n is a natural number between 1 and 200.
- Each computer is represented by an integer from 0 to n-1.
- If computer i and computer j are connected, computers[i][j] is 1.
- computer[i][i] is always 1.

# Solution
```python
def dfs(computers, v, visited):
    visited[v] = True

    for node in range(len(computers)):
        if visited[node] == False and computers[v][node] == 1:
            dfs(computers, node, visited)


def solution(n, computers):
    answer = 0
    visited = [False] * n

    for v in range(n):
        if not visited[v]:
            dfs(computers, v, visited)
            answer += 1
    return answer
```
It's DFS since it's a recursive function that keeps drilling into the computers array. I originally tried to solve it by modifying the computers values directly, but couldn't figure that out.

The key is that even though `computers` is a 2D array, we're still just traversing n vertices. Don't get distracted by the 2D array -- just search across the n vertices.

We use the n vertices as rows and traverse `computers` accordingly.
