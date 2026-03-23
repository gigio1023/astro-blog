---
title: "[HackerRank] Roads and Libraries"
description: "Solution for the HackerRank Roads and Libraries problem using DFS to minimize the cost of building roads and libraries across connected city groups."
date: "2021-11-19T12:04:28.529Z"
tags: ["algorithm"]
lang: en
translationOf: "hackerrank-roads-and-libraries"
draft: false
---

https://www.hackerrank.com/challenges/torque-and-development/problem

# Solution
The goal is to minimize cost while ensuring every city's citizens can access a library. A citizen can access a library if their city has one or if their city is connected to a city that has one.

Cost is defined as:
$c\_lib=cost\ of\ library$
$c\_road=cost\ of\ road$

There are two approaches to building libraries and roads:
1. Build a library in every city.
2. Build roads so that all cities are connected.

## Approach 1
If c_lib is less than c_road, approach 1 is optimal.

## Approach 2
The more intuitive case where c_lib is greater than c_road.
In this problem, you can't arbitrarily connect cities -- only the relations given in the problem can be used to build roads.

So we use approach 2, but city groups that can't be connected need their own library.

1. Treat the given relations as an existing graph and run DFS. Count the edges traversed during DFS.
2. Call the edge count from step 1 $total\_path$.
3. Compute the number of city groups via $total\_path - num\_of\_city$.

The final cost is:
$total\_path \times c\_road+(total\_path - num\_of\_city)\times c\_city$

# Code
https://github.com/naem1023/codingTest/blob/master/graph/hackerrank-roads-and-libraries.py
