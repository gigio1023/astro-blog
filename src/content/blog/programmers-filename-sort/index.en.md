---
title: "[Programmers] Filename Sort"
description: "Solution for the Programmers filename sort problem using regex-based splitting and custom sort keys."
date: "2021-11-02T02:51:54.726Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-filename-sort"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/17686

# Approach 1
We need to split filenames based on numeric characters. One way is to implement it manually:

```py
number_list = [str(i) for i in range(10)]

for idx in range(len(files)):
    head, number, tail = "", "", ""
    number_idx, tail_idx = -1, -1
    # Find the start index of the number part
    for j in range(len(files[idx])):
        if files[idx][j] in number_list:
            head = files[idx][:j]
            # print(head)
            number_idx = j
            break
    # Find the start index of the tail part
    for j in range(number_idx, len(files[idx])):
        if files[idx][j] not in number_list:
            number = int(files[idx][number_idx:j])
            break
    tail = files[idx][j:]
    files[idx] = [head, number, tail]
```

Midway through implementing this, I remembered regex. Since `\d` can distinguish digits, we can do:
```py
re.compile(r'(\d+)')
```
Since we only need to split, I used `re.split`.

For sorting, passing the priority to the sort function handles everything. Since we only need to sort by head and number, I pass this lambda as the sort key:

```py
lambda x: (x[0].lower(), int(x[1]))
```


# Approach 2
Apparently you could also use Java's Comparable interface for this. In Python, you'd implement `__cmp__`, though there's no real reason to use it for this problem. It might be useful if the sorting logic were more complex.

- [python \_\_cmp\_\_](https://portingguide.readthedocs.io/en/latest/comparisons.html)
- [Approach 2 code](https://velog.io/@pica_pica/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-3%EC%B0%A8-%ED%8C%8C%EC%9D%BC%EB%AA%85-%EC%A0%95%EB%A0%AC)


# Code
https://github.com/naem1023/codingTest/blob/master/sort/pg-30-17686.py
