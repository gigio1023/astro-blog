---
title: "[백준] 소풍"
description: "."
date: "2021-11-10T11:35:47.937Z"
tags: ["algorithm"]
draft: false
---

https://www.acmicpc.net/problem/2026

# 풀이
ref: https://westmino.tistory.com/84

dfs, bfs로 친구 관계 그래프를 탐색한다고 생각했다. 실제로 그래프는 아니지만 입력으로 주어진 친구 관계를 활용해서 dfs, bfs를 그래프에서 적용하는 것과 같이 구현할 수 있다고 한다.

- adj_mat: Adjacency matirx로 친구 관계 여부를 저장한다.
- adj_list: i번째 배열에 i의 친구들이 담기도록 배열을 준비한다.

## DFS
친구 관계인 사람들의 정의는 '모두 각자의 친구이어야한다.'이다. 건너건너 친구이면 친구로 성립되지 않는다.
- 임의의 지점을 시작점으로 설정
- path: 함께 갈 수 있는 사람들이 저장될 배열
1. 시작점과 친구인 사람들을 adj_list에서 가져온다.
2. adj_mat을 사용해 2번 사람들이 path에 들어갈 수 있는 체크한다.
3. path의 길이가 K가 되면 path를 반환
4. 모든 탐색을 끝내도 path의 길이가 K가 안되면 None을 반환

## DFS 결과 처리
DFS를 통해 None 혹은 path를 얻을 수 있다.
- None: 다른 사람을 DFS의 시작점으로 설정해서 DFS 재수행
- path: path 정렬 후 반환

# 코드
https://github.com/naem1023/codingTest/blob/master/graph/acmicpc-2026.py