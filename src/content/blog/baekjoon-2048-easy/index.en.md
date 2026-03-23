---
title: "[Baekjoon] 2048 (Easy)"
description: "Solution for Baekjoon 12100 (2048 Easy) using brute-force simulation with block merging and four-directional movement."
date: "2021-10-13T14:59:23.302Z"
tags: ["algorithm", "python"]
lang: en
translationOf: "baekjoon-2048-easy"
draft: false
---

[ref blog](https://chldkato.tistory.com/163)
# Problem
It's the 2048 game we all know. But with added constraints:
- A block that has already merged in one move can't merge again
- If 3 or more blocks could merge, merge starting from the ones closest to the direction of movement
  - e.g., If moving upward, merge from the top first

# Solution
The merging idea itself is easy to come up with. If empty, move the value; if values are equal, double them; otherwise, place it in the cell above.

The part that was hard to understand even after reading others' explanations was how to prevent already-merged blocks from merging again. I expected some kind of flag, but instead the approach keeps incrementing the row or column index for the merge target.

The second challenge was handling the four directions. This requires a solid understanding of which to process first between rows and columns.

For example, when moving left or right, you iterate by column and move one row at a time. For up or down, you iterate by row and move one column at a time.

```py
if direction == 0:
        # Look at all columns of arr, so iterate n times
        for j in range(n):
            idx = 0
            # Need to look at all rows except the 0th
            for i in range(1, n):
                # If the element is not 0 == not empty
                if arr[i][j]:
                    # Store what we're going to move
                    temp = arr[i][j]
                    # Clear the original position
                    arr[i][j] = 0
                    # If the destination is 0
                    if arr[idx][j] == 0:
                        # It's empty, so just move it
                        arr[idx][j] = temp
                    # If what we're moving equals the destination
                    elif arr[idx][j] == temp:
                        # Merge
                        arr[idx][j] = temp * 2
                        # Increment idx so it can't merge again
                        idx += 1
                    # If what we're moving differs from the destination
                    else:
                        idx += 1 # Block it
                        arr[idx][j] = temp # Restore
```
[0, 3] are mapped to up, down, left, right in order. direction = 0 means the code above moves blocks upward.

Moving up is straightforward. Left and right are trickier. Here's left:

```py
elif direction == 2:
        for i in range(n):
            idx = 0
            for j in range(1, n):
                if arr[i][j]:
                    # Store what we're going to move
                    temp = arr[i][j]
                    # Clear the original position
                    arr[i][j] = 0
                    # If the destination is 0
                    if arr[i][idx] == 0:
                        # It's empty, so just move it
                        arr[i][idx] = temp
                    # If what we're moving equals the destination
                    elif arr[i][idx] == temp:
                        # Merge
                        arr[i][idx] = temp * 2
                        # Increment idx so it can't merge again
                        idx += 1
                    # If what we're moving differs from the destination
                    else:
                        idx += 1 # Block it
                        arr[i][idx] = temp # Restore
```

I always use i for the row variable and j for the column variable. For the left-movement task, you need to iterate by column and move one row at a time. So the loop order must be swapped to iterate i, then j.

The rest follows the same pattern as moving upward.

For moving down, reverse the range for i; for moving right, reverse the range for j. That is, iterate from n-2 down to 1.

# Code
https://github.com/naem1023/codingTest/blob/master/implementation/acmipic-12100.py
