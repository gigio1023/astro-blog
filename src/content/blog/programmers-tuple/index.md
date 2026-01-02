---
title: "[프로그래머스] 튜플"
description: "."
date: "2022-02-24T10:54:54.817Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/64065
ref: https://hazung.tistory.com/103

# 풀이
```py
import re

def solution(s):
    answer = []
    s = s.split('},{')
    s = [re.sub('[{}]', '', c) for c in s]
    s = [list(map(int, c.split(','))) for c in s]
    s = list(sorted(s, key = len))

    for i in range(len(s)):
        target = s[i][0]
        answer.append(target)
        for j in range(i, len(s)):
            del s[j][s[j].index(target)]
    return answer
    
```
내가 푼 방식. 머릿 속에 떠오른 방법을 그대로 구현한거라 비효율적이다. 

# 풀이 2
```py
def solution(s):
    answer = []
    s = s[2:-2]
    s = s.split("},{")
    s.sort(key = len)
    for i in s:
        ii = i.split(',')
        for j in ii:
            if int(j) not in answer:
                answer.append(int(j))
    return answer
```
- 앞뒤로 규칙적이지 않았던 문자들을 제거해주면 split 결과 자체를 그대로 사용할 수 있다.
- 굳이 숫자로 변환할 필요가 없으니 문자를 그대로 사용. 나중에만 숫자로 변환
- 길이가 작은 s의 요소들 부터 가져온다. 따라서 s의 첫번째 요소부터 가져와서 answer에 없다면 추가해주는 것만으로도 문제에서 정의한 '튜플'의 정의를 충족시킬 수 있다.

# 풀이 3
```py
import re
 
def solution(s):
    answer = []
    a = s.split(',{')
    a.sort(key = len)
    for j in a:
        numbers = re.findall("\d+", j)
        for k in numbers:
            if int(k) not in answer:
                answer.append(int(k))
    return answer
```
알고리즘은 풀이 2와 같다. 다른 점은 정규표현식을 사용해서 s의 요소별로 리스트를 만드는 것이다.
해당 정규식을 사용하면 하나 이상의 숫자를 찾을 때마다 리스트에 넣어준 후 반환해준다.