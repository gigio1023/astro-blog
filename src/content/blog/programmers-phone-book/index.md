---
title: "[프로그래머스] 전화번호부"
description: "."
date: "2021-10-21T14:57:35.954Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42577

# 풀이
https://somjang.tistory.com/entry/Programmers-%EC%A0%95%EB%A0%AC-%EC%A0%84%ED%99%94%EB%B2%88%ED%98%B8-%EB%AA%A9%EB%A1%9D-Python

해쉬문제였는데 정렬, 인덱스 비교로 해결이 됐다. n이 작은 편이 아니라서 brute-force로 모두 비교할 수는 없다.

1. phonebook 리스트를 정렬
2. i, i + 1번째 전화번호를 비교한다. i가 head라는 가정하에 i+1의 앞 부분을 본다.
3. 같다면 anwer=False


2번째 방법에서 사용할 수 있는 방법은 두가지가 있다.

```py
# 1. indexing으로 직접 head 비교
if phone_book[i + 1][:len(phone_book[i])] == phone_book[i]
 
# 2. startswith로 비교
if phone_book[i + 1].startswith(phone_book[i])

```


# 풀이
https://github.com/naem1023/codingTest/blob/master/pg-30-42577.py