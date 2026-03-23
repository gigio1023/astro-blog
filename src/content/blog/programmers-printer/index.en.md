---
title: "[Programmers] Printer"
description: "Solution for the Programmers printer queue problem using priority-based simulation."
date: "2022-01-20T09:56:01.000Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-printer"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/42587
# Solution

You need to clearly understand when printing happens and increment a count for each print event.

# Code 1
My approach. The branching conditions are a straightforward translation of the problem into code. One thing to watch out for: the very last line of solution must return `count + 1`. If execution reaches that line, it means all items in `priorities` have been popped, so the count hasn't been incremented for the last one yet.
```python
def solution(priorities, location):
    count = 0
    while priorities:
        front = priorities.pop(0)

        if priorities:
            if front < max(priorities):
                priorities.append(front)
                if location == 0:
                    location = len(priorities) - 1
                else:
                    location -= 1
            else:
                count += 1
                if location == 0:
                    return count
                else:
                    location -= 1

    return count + 1
 ```
# Code 2
ref: https://programmers.co.kr/learn/courses/30/lessons/42587/solution_groups?language=python3
> any: returns True if any element in the iterable is True, False otherwise.

I tracked the location's position, but this solution pre-stores the original position using tuples. That makes the code much cleaner.

It also uses `any` for the priority comparison. Using `max` might look cleaner, but when you need more complex conditions rather than simple max/min, `any` can make the code much more concise.
```python
def solution(priorities, location):
    queue =  [(i,p) for i,p in enumerate(priorities)]
    answer = 0
    while True:
        cur = queue.pop(0)
        if any(cur[1] < q[1] for q in queue):
            queue.append(cur)
        else:
            answer += 1
            if cur[0] == location:
                return answer
```
