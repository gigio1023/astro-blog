---
title: "[Programmers] Farthest Node"
description: "Solution for the Programmers farthest node problem using BFS on an undirected graph."
date: "2021-11-12T08:07:04.858Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-farthest-node"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/49189

# Solution
ref: [Blog](https://donis-note.medium.com/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B0%80%EC%9E%A5-%EB%A8%BC-%EB%85%B8%EB%93%9C-level-3-python-%ED%92%80%EC%9D%B4-248455cfa49d)
This is a graph traversal problem, so you can pick whichever of DFS or BFS you prefer. I went with BFS.

1. Since only edge relationships are given, build a new graph dictionary that stores adjacent nodes for each node.
2. Starting from node 1, run BFS on the graph dictionary.
3. It's an undirected graph with no edge weights. So by updating distance values the first time each node is visited during BFS, we get the shortest distance from node 1.

# Code
https://github.com/naem1023/codingTest/blob/master/graph/pg-49189.py
