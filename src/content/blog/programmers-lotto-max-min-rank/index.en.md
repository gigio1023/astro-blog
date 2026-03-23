---
title: "[Programmers] Lotto Best and Worst Rank"
description: "C++ solution for the Programmers lotto best/worst rank problem with notes on find and vector methods."
date: "2022-01-31T08:04:48.906Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-lotto-max-min-rank"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/77484?language=cpp

# C++ refresher
- find()
  - Searches using the first and last iterators as parameters.
  - Returns the last iterator if not found; returns the value if found.

```c++
#include <algorithm>
#include <vector>
#include <iostream>
vector<int> target;
int i = 0;

auto res = find(target.begind(), target.end(), i);
if (res != target.end()) cout << "find" << endl;
```
- vector methods
```c++
// copy
dest.assign(source.begin(), source.end());

// delete
dest.erase(idx);
```
# Solution
1. Compare `lottos` and `win_nums` to count the number of matches.
2. Count the number of zeros.
3. Step 1 gives the worst rank; adding steps 1 and 2 gives the best rank.

# Code
```c++
#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int get_rank(int correct) {
    int rank;
    if (correct >= 2) {
        rank = 7 - correct;
    }
    else {
        rank = 6;
    }

    return rank;
}

void print_vector(vector<int> target) {
    for (auto i: target) {
        cout << i << ' ';
    }
    cout << endl;
}
vector<int> solution(vector<int> lottos, vector<int> win_nums) {
    vector<int> answer;

    // worst: compare lottos and win_nums
    // best: worst + number of zeros

    int zero_cnt = 0, cnt = 0;

    for (auto& i: lottos) {
        // count zero
        if (i == 0) {
            zero_cnt++;
            continue;
        }

        // check
        auto res = find(win_nums.begin(), win_nums.end(), i);
        if (res != win_nums.end()) {
            cnt++;
        }
    }

    int best = get_rank(cnt + zero_cnt), worst = get_rank(cnt);
    answer.push_back(best);
    answer.push_back(worst);
    return answer;
}
```
