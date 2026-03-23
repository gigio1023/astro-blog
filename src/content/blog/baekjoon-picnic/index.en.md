---
title: "[Baekjoon] Picnic"
description: "Solution for Baekjoon 2026 (Picnic) using DFS on a friendship graph with adjacency matrix and adjacency list."
date: "2021-11-10T11:35:47.937Z"
tags: ["algorithm"]
lang: en
translationOf: "baekjoon-picnic"
draft: false
---

https://www.acmicpc.net/problem/2026

# Solution
ref: https://westmino.tistory.com/84

I thought of traversing the friendship graph with DFS or BFS. It's not actually a graph, but the friendship relationships given as input can be used to implement something like DFS/BFS on a graph.

- adj_mat: Adjacency matrix storing friendship relationships.
- adj_list: An array where the i-th element contains i's friends.

## DFS
The definition of "friends" here is that everyone must be mutual friends with each other. Friends of friends don't count.
- Set an arbitrary point as the starting point
- path: array storing people who can go together
1. Get people who are friends with the starting point from adj_list.
2. Use adj_mat to check if step-2 people can be added to path.
3. If path length reaches K, return path
4. If path length doesn't reach K after all exploration, return None

## DFS Result Handling
DFS yields either None or a path.
- None: Set a different person as the DFS starting point and re-run DFS
- path: Sort the path and return it

# Code
https://github.com/naem1023/codingTest/blob/master/graph/acmicpc-2026.py
