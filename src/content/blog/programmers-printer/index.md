---
title: "[프로그래머스] 프린터"
description: "."
date: "2022-01-20T09:56:01.000Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42587
# 풀이

몇 번째에 인쇄가 발생하고 발생하는 인쇄 건수마다 count를 증가시켜야 함을 명확히 이해해야지 풀 수 있다. 

# 코드1
내가 푼 방법이다. 조건분기점은 문제를 코드 형태로 바꾸기만 했다. 주의할 점은 solution의 가장 마지막 줄에서는 count + 1을 return해야 하는 것이다. 마지막 줄까지 간 것은 priorities의 모든 item들이 pop됐기 때문에 count가 아직 증가되지 않은 상태이기 때문이다.
```python
def solution(priorities, location):
    count = 0
    while priorities:
        front = priorities.pop(0)
        
        if priorities:
            if front < max(priorities):    
                priorities.append(front)
                if location == 0:
                    location = len(priorities) - 1    
                else:
                    location -= 1
            else:
                count += 1
                if location == 0:
                    return count
                else:
                    location -= 1
        
    return count + 1
 ```
# 코드2
ref: https://programmers.co.kr/learn/courses/30/lessons/42587/solution_groups?language=python3 
> any: iteration 내에 하나라도 True가 있다면 True. 아니라면 False.

나는 location의 위치를 추적해줬지만, 이 답안은 미리 원본일 때의 위치를 기억하기 위해 튜플을 활용했다. 덕분에 코드가 매우 간결해졌다.

또한 any를 사용해서 중요도를 비교했다. any를 쓰는것보다 max를 쓰는 것이 더 깔끔해보인다. 다만단순 max, min 값이 아니라 복잡한 조건문을 사용해야 할 때는 any가 코드를 매우 간결하게 해준다.
```python
def solution(priorities, location):
    queue =  [(i,p) for i,p in enumerate(priorities)]
    answer = 0
    while True:
        cur = queue.pop(0)
        if any(cur[1] < q[1] for q in queue):
            queue.append(cur)
        else:
            answer += 1
            if cur[0] == location:
                return answer
```