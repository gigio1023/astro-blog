---
title: "[프로그래머스] 네트워크(python)"
description: "."
date: "2021-08-15T19:49:33.274Z"
tags: ["algorithm", "programmers", "python"]
draft: false
---

# 문제

네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

제한사항
컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
computer[i][i]는 항상 1입니다.

# 풀이
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
재귀함수로 computers array를 계속 파고드는 형태이므로 dfs이다. 원래는 computers의 값을 바꿔가면서 찾는걸 구상했었는데, 도저히 생각이 안났다..

관건은 2차원으로 구성된 computers array라고 할지라도, 결국 n개의 vertex에 대한 탐색을 진행하는 것이다. 즉, 2차원 array에 현혹되지말고 n개의 vertex에 대해서만 탐색하자.

n개의 vertext를 row로 삼아서 computers를 탐색한다.