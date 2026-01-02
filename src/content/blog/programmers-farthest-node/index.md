---
title: "[프로그래머스] 가장 먼 노드"
description: "."
date: "2021-11-12T08:07:04.858Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/49189

# 풀이
ref: [Blog](https://donis-note.medium.com/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B0%80%EC%9E%A5-%EB%A8%BC-%EB%85%B8%EB%93%9C-level-3-python-%ED%92%80%EC%9D%B4-248455cfa49d)
그래프 탐색 문제이기 때문에 dfs, bfs에서 편한걸 선택하면 된다. bfs를 사용해서 풀었다.

1. edge 관계만이 주어졌기 때문에 임의의 node와 인접한 node들을 저장하는 새로운 graph dictionary를 만든다.
2. graph dictionary에서 1번 node를 시작점으로 하여 bfs 수행.
3. Undirected graph이고 edge들의 distance가 없다. 따라서 bfs를 수행하면서 최초로 만난 node들의 거리값을 갱신해주면 1번 노드로부터의 최소 거리를 알 수 있다. 

# 코드
https://github.com/naem1023/codingTest/blob/master/graph/pg-49189.py