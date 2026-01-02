---
title: "[프로그래머스] 영어 끝말잇기"
description: "."
date: "2021-10-29T22:50:29.761Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/12981

# 풀이
문제의 제안사항 중에 다음과 같은 항목이 있다.
> words는 끝말잇기에 사용한 단어들이 순서대로 들어있는 배열

제안사항을 통해 words에서 순서대로 원소를 추출한다면 끝말잇기를 재현할 수 있음을 알 수 있다.

이를 통해 다음과 같은 알고리즘을 고안할 수 있다.
1. words를 순서대로 추출하면서 끝말잇기가 이어지는지 확인
2. 끝말잇기가 끝났다면 문제의 답을 계산


words를 순서대로 순환하는 것만으로도 끝말잇기를 재현할 수 있었기 때문에, words의 index인 $i$와 끝말잇기에 참여한 사람의 수인 $n$을 통해 문제의 답을 구할 수 있다.

- 몇번째 사람의 순서인지
  - $i \mod n$
  - 1번째부터 세기 때문에 나머지에 +1
- 단어들의 반복이 몇번째 이뤄졌는지
  - $[ i \div n ]$
  - 최초 iteration도 1로 취급하기 때문에 +1

몫과 나머지를 위처럼 구해도 되고 python built-in function인 divmod를 통해 구해도 된다.

```py
q, r = divmod(a, b)
```



# 코드
```py
def solution(n, words):
    answer = [0,0]
    stack = [words[0]]
    for i in range(1, len(words)):
        # stack의 가장 윗 단어의 마지막 글자와 i번째 단어의 시작이 같고
        # i번째 단어가 스택에 없다면
        if stack[-1][-1] == words[i][0] \
            and words[i] not in stack:
            stack.append(words[i])
        # stack에 추가가 안된다면 answer 갱신
        else:
            answer[0] = (i % n) + 1
            answer[1] = i // n + 1
            break
    return answer
```