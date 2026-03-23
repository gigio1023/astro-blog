---
title: "[Programmers] English Word Chain"
description: "Solution for the Programmers word chain game problem using stack-based simulation and modular arithmetic."
date: "2021-10-29T22:50:29.761Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-english-word-chain"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/12981

# Solution
One of the problem's constraints says:
> words is an array containing the words used in the word chain game, in order.

From this, we can see that extracting elements from `words` in order lets us replay the word chain.

This leads to the following algorithm:
1. Iterate through `words` in order, checking whether the chain continues.
2. If the chain breaks, compute the answer.

Since simply iterating through `words` in order is enough to simulate the game, the answer can be derived from the index `$i$` and the number of players `$n$`:

- Which player's turn it is:
  - $i \mod n$
  - Add +1 since counting starts from 1
- Which round it is:
  - $[ i \div n ]$
  - Add +1 since the first round counts as 1

You can compute the quotient and remainder as shown above, or use Python's built-in `divmod`:

```py
q, r = divmod(a, b)
```



# Code
```py
def solution(n, words):
    answer = [0,0]
    stack = [words[0]]
    for i in range(1, len(words)):
        # If the last character of the top word in the stack matches the first character of the i-th word
        # and the i-th word is not already in the stack
        if stack[-1][-1] == words[i][0] \
            and words[i] not in stack:
            stack.append(words[i])
        # If it can't be added to the stack, update the answer
        else:
            answer[0] = (i % n) + 1
            answer[1] = i // n + 1
            break
    return answer
```
