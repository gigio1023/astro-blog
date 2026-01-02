---
title: "[프로그래머스] 파일명 정렬"
description: "."
date: "2021-11-02T02:51:54.726Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/17686

# 풀이1
숫자를 기준으로 파일명을 split해야 한다. 이 때 다음과 같이 직접 구현해도 무방하다.

```py
number_list = [str(i) for i in range(10)]
    
for idx in range(len(files)):
    head, number, tail = "", "", ""
    number_idx, tail_idx = -1, -1
    # number start index 찾기
    for j in range(len(files[idx])):
        if files[idx][j] in number_list:
            head = files[idx][:j]
            # print(head)
            number_idx = j
            break
    # tail start index 찾기
    for j in range(number_idx, len(files[idx])):
        if files[idx][j] not in number_list:
            number = int(files[idx][number_idx:j])
            break
    tail = files[idx][j:]
    files[idx] = [head, number, tail]
```

구현하다가 regex가 떠올랐다. \d로 숫자만 구분할 수 있어서 다음과 같이 구상해볼 수 있다.
```py
re.compile(r'(\d+)')
```
코드에서는 split만 하면 되기 때문에 re.split을 사용했다.

정렬은 우선순위를 sort 함수에 넘겨주면 알아서 계산해준다. head와 tail에 대해서만 정렬을 수행하면 되기 때문에 sort 함수의 key에 다음의 람다 함수를 넘겨준다.

```py
lambda x: (x[0].lower(), int(x[1]))
```


# 풀이2
java의 Comparable inreface를 사용해서 비교할 수도 있다고 한다. python에서는 \__cmp__를 통해서 구현할 수 있는데 이 문제에서는 사용할 이유가 없을 것 같다. 좀 더 복잡한 형식의 정렬 알고리즘이 요구된다면 사용할 법하다.

- [python \__cmp__](https://portingguide.readthedocs.io/en/latest/comparisons.html)
- [풀이2 코드](https://velog.io/@pica_pica/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-3%EC%B0%A8-%ED%8C%8C%EC%9D%BC%EB%AA%85-%EC%A0%95%EB%A0%AC)


# 코드
https://github.com/naem1023/codingTest/blob/master/sort/pg-30-17686.py