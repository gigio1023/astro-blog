---
title: "[Programmers] String Compression"
description: "Solution for the Programmers string compression problem using n-gram style chunking."
date: "2021-11-17T17:09:49.169Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-string-compression"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/60057

# Solution
You can approach the string like an N-gram Language Model.

```py
def get_len(n):
  for i in range(cut, length of string, cut):
    check string, counting
  handle last count

for i in range(0, len(s) // 2 + 1):
  get_len(i)
```

String check and counting:
- Compare `s[i : i + cut]` with the current temporary storage
  - If they match, increment the count
  - If they differ, update the output result

Following the pseudo code as-is, the last chunk of characters won't be handled inside the for loop. Handle the counting for the last string chunk outside the loop.

# Code
https://github.com/naem1023/codingTest/blob/master/implementation/pg-60057.py
