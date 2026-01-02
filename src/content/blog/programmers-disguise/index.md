---
title: "[프로그래머스] 위장"
description: "."
date: "2021-10-21T17:35:00.076Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42578

# 풀이

cloth 종류에 대한 경우의 수를 계산해야하는 문제이다. cloth의 종류는 clothes 리스트 요소들의 1번째 인자에 저장돼있기 때문에 해당 인자들을 기준으로 key를 만들어준다. 

```py
from collections import defaultdict
def solution(clothes):
    answer = defaultdict(int)
    
    for cloth in clothes:
        answer[cloth[1]] += 1
    cnt = 1
    for key in answer:
        cnt *= answer[key] + 1
    
    return cnt - 1
```

answer에는 cloth 종류별로 몇 개의 옷들이 존재하는지 저장된다. 이들에 대한 조합을 구할 때는 answer[key]에 1씩 더해준다. 왜냐하면 해당 옷을 입지 않는 경우의 수도 존재하기 때문이다. 

옷을 아예 입지 않는 경우의 수가 있기 때문에 cnt에서 1을 빼준다면 옷을 입는 경우의 수가 완성된다.

# 코드
https://github.com/naem1023/codingTest/blob/master/hash/pg-30-42578.py