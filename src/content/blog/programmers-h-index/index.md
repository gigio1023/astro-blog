---
title: "[프로그래머스] H-index"
description: "."
date: "2021-10-22T02:44:44.279Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42747

# 풀이
문제에서 서술한 바를 코딩으로 옮기는 발상이 어려웠다.

"h번 이상 인용된 논문이 h편 이상이고, 나머지 논문이 h번 이하 인용"을 코드로 옮기면 되는 구현 문제이다. citations를 오름차순 정렬 후, 문제를 시작해보자.

문제를 코드로 정리할 수 있게 풀어쓰면
>
citations의 h번째 요소가 citations[h]번만큼 인용될 때, h + 1이후의 citations 요소들이 h개 이상 존재하게 해주는 h의 최대값을 찾자.

이다.

citations의 길이를 length라고 할 때 citations가 오름차순 정렬됐다면, citations[i]의 값이 length - i보다 크거나 같으면 된다. 이 때 length - i가 최대 h가 될 것이다. 

왜냐하면 정렬이 됐기 때문에 i번째 값이 length - i보다 크거나 같다면 i + 1 ~ length - 1까지의 모든 citations 값들은 length - i보다 크거나 같을 것이다. 따라서, 0부터 i를 시작해서 체크하면 될 것이다.


# 코드
```py
def solution(citations):
    answer = 0
    citations.sort()
    
    length = len(citations)
    
    for i in range(length):
        if citations[i]  >= length - i:
            return length - i

            
    return answer
```
https://github.com/naem1023/codingTest/blob/master/sort/pg-30-42747.py