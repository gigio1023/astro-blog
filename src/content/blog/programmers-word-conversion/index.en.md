---
title: "[Programmers] Word Conversion"
description: "Solution for the Programmers word conversion problem using BFS with single-character diff detection."
date: "2021-09-02T20:28:41.333Z"
tags: ["algorithm", "python"]
lang: en
translationOf: "programmers-word-conversion"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43163

# Solution
ref: https://moseory20.tistory.com/31
I initially solved it with BFS but couldn't pass the 4th test case, so I ended up looking at someone else's solution.

The key points were the same as my approach:
- Detect when only one character differs
- If only one character differs, run the check
- Store the check result

The difference was that I solved it more complexly with recursion, while this person solved it cleanly with loops.

When implementing BFS/DFS with recursion, you define new subproblems through the function parameters. The same setup can be done with variables in a loop.

One thing that confused me at first was how this loop-based BFS works without increment/decrement comparisons on answer. I thought there should be cases where different traversal orders produce different answer values.

Looking at the code below, it compares everything at once rather than sequentially, so this approach works. Since all words are stacked into `diff_word` at once and compared, the answer obtained is always minimized.

# Code
ref: https://moseory20.tistory.com/31
```python
def solution(begin, target, words):
    if target not in words:
        return 0

    answer = 0
    word_len = len(begin)
    word_list = [begin]
    diff_word = list()

    while(1):
        for wl in word_list:
            diff_word.clear()
            for word in words:
                diff = 0
                for idx in range (0, word_len):
                    if wl[idx] != word[idx]: diff += 1
                    if diff > 1: break
                if diff==1: # 1 character difference
                    diff_word.append(word)
                    words.remove(word)

        answer += 1
        if target in diff_word: return answer
        else: word_list = diff_word

    return answer

```
