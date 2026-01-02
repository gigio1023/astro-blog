---
title: "[HakerRank] Roads and Libraries"
description: "."
date: "2021-11-19T12:04:28.529Z"
tags: ["algorithm"]
draft: false
---

https://www.hackerrank.com/challenges/torque-and-development/problem

# 풀이
cost를 최소화하면서 모든 도시의 시민들이 도서관을 이용할 수 있게 하는 문제이다. 도서관이 있는 도시에 거주하거나 도서관이 있는 도시와 연결되어 있다면 해당 도시의 시민들이 도서관을 이용할 수 있다.

cost의 정의는 아래와 같다.
$c\_lib=cost\ of\ libarary$
$c\_road=cost\ of\ road$

도서관과 도로를 짓는 방법은 두 가지로 나눌 수 있다.
1. 모든 도시에 도서관을 짓는다.
2. 모든 도시가 연결될 수 있도록 도로를 만든다.

## 1번 방법
c_lib가 c_road보다 작다면 1번 방법이 최선의 방법이다. 
## 2번 방법
c_lib가 c_road보다 큰 상식적인 상황이다.
이 문제는 도시와 도시 사이의 도로를 맘대로 연결할 수 없다. 문제에서 주어진 relation만을 활용해서 도로를 지을 수 있다.

따라서 2번 방법을 수행하되 연결할 수 없는 도시 그룹들은 해당 도시 그룹만의 도서관이 필요하다. 

1. 문제에서 주어진 relation을 이미 존재하는 그래프라고 간주하고 dfs를 수행한다. dfs를 수행하면서 통과하는 edge의 수를 센다.
2. 1번에서 얻은 edge의 수를 $total\_path$라고 하자.
3. $total\_path - num\_of\_city$를 통해 도시 그룹의 수를 구한다.

최종적인 cost는 아래와 같이 구할 수 있다.
$total\_path \times c\_road+(total\_path - num\_of\_city)\times c\_city$
# 코드
https://github.com/naem1023/codingTest/blob/master/graph/hackerrank-roads-and-libraries.py