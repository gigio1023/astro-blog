---
title: "[Programmers] Phone Book"
description: "Solution for the Programmers phone book problem using sorting and prefix comparison."
date: "2021-10-21T14:57:35.954Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-phone-book"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42577

# Solution
https://somjang.tistory.com/entry/Programmers-%EC%A0%95%EB%A0%AC-%EC%A0%84%ED%99%94%EB%B2%88%ED%98%B8-%EB%AA%A9%EB%A1%9D-Python

This was categorized as a hash problem, but I solved it with sorting and index comparison. Since n isn't particularly small, brute-force comparison of all pairs isn't feasible.

1. Sort the phonebook list.
2. Compare the i-th and (i+1)-th phone numbers. Assuming i is the potential prefix, check the front portion of i+1.
3. If they match, set answer=False.


Two approaches for step 2:

```py
# 1. Direct prefix comparison using indexing
if phone_book[i + 1][:len(phone_book[i])] == phone_book[i]

# 2. Using startswith
if phone_book[i + 1].startswith(phone_book[i])

```


# Code
https://github.com/naem1023/codingTest/blob/master/pg-30-42577.py
