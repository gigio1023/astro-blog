---
title: "[프로그래머스] 타겟 넘버(python)"
description: "."
date: "2021-08-15T15:52:19.688Z"
tags: ["algorithm", "python"]
draft: false
---

# 문제
n개의 음이 아닌 정수가 있습니다. 이 수를 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.
>
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

제한사항
주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
각 숫자는 1 이상 50 이하인 자연수입니다.
타겟 넘버는 1 이상 1000 이하인 자연수입니다.

# 풀이

bfs, dfs로 풀 수 있는 문제라고 한다. 물론 난 몰라서 고민하다가 답지 찾아봤다.
n개의 빈칸을 맞춰야되는 문제고, 사용 가능한 부호는 +,-니까 단순하게 풀면 $2^n$이다. 무조건 효율적인 알고리즘을 찾아야 하는 문제다.


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

가장 이해가 가는 풀이였다.

등식을 풀어나가는 과정을 재귀함수를 통해 구현했다. 등식에서 +, -를 결정하는 것을 재귀함수를 만들면서 value에 쌓았다.

답을 찾는 조건은 모든 빈 칸을 value에 쌓았을 때, 그리고 value의 값이 target이 되어야 하는 순간이다. 또한 모든 빈 칸을 value에 누적했음에도 idx가 N과 같다면 답을 못 찾은 경우의 수다.

dfs가 아니라 bfs같지만... 암튼 이해가 젤 쉬었다.

## product
```python
from itertools import product
def solution(numbers, target):
    l = [(x, -x) for x in numbers]
    s = list(map(sum, product(*l)))
    return s.count(target)
```

product는 DB에서 사용되던 join과 같은 작업을 리스트 사이에서 수행해준다. 이 때, list를 unpacking해서 줘야된다고 한다. 따라서 asterisk로 l을 넘겨준다. 
https://mingrammer.com/understanding-the-asterisk-of-python/


1. numbers의 각각의 요소를 +, - 부호를 붙여준 tuple을 가진 리스트를 생성한다. 
2. product로 l간의 모든 조합을 구한다.
3. map을 통해 모든 조합들에 개별적으로 sum을 적용시킨다.
4. 3번의 결과 중 target과 동일한 합을 가지는 것들의 숫자를 반환한다.

가장 깔끔한 코드다. 성능 보장이 어떻게 되는지는 모르겠지만, 문제의 제약을 감안하면 python 빌트인함수만으로도 성능이 보장되나보다.

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

앞서 언급한 dfs 풀이와 비슷하다. current_sum을 업데이트해주고 재귀함수에 넘겨주고 체크하는 것을 반복한다.