---
title: "[프로그래머스] 문자열 압축"
description: "."
date: "2021-11-17T17:09:49.169Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/60057

# 풀이
N-gram Language Model처럼 문자열에 접근하면 된다.

```py
def get_len(n):
  for i in range(cut, length of string, cut):
    문자열 체크, 카운팅
  마지막 카운팅 처리
  
for i in range(0, len(s) // 2 + 1):
  get_len(i)
```

문자열 체크, 카운팅
- s[i : i + cut]이 기존 임시 저장소와 비교
  - 같다면 카운팅
  - 다르면 출력 결과 갱신

pseudo code대로 처리하면 마지막 문자 조합에 대해서는 for문에서 처리 못한다. for 문 밖에서 임의의로 마지막 문자열 조합에 대한 카운팅 처리를 해주자.

# 코드
https://github.com/naem1023/codingTest/blob/master/implementation/pg-60057.py