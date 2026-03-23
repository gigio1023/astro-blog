---
title: "[Programmers] Tuple"
description: "Solution for the Programmers tuple problem using string parsing, regex, and length-based sorting."
date: "2022-02-24T10:54:54.817Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-tuple"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/64065
ref: https://hazung.tistory.com/103

# Solution 1
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
My approach. I just implemented what came to mind, so it's not efficient.

# Solution 2
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
- Removing the irregular characters at the front and back lets us use the split result directly.
- No need to convert to numbers early -- just work with strings and convert later.
- Elements of s are processed shortest first. So simply taking elements from the first one onward and adding them to answer if they're not already there satisfies the problem's definition of "tuple."

# Solution 3
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
Same algorithm as solution 2. The difference is using regex to build a list from each element of s.
This regex finds one or more digits and adds each match to a list before returning it.
