---
title: "[Programmers] Get Report Results"
description: "C++ solution for the Programmers report results problem using unordered_map, set, and stringstream."
date: "2022-01-30T17:51:20.099Z"
tags: ["algorithm"]
lang: en
translationOf: "programmers-get-report-results"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/92334?language=cpp
ref: https://wadekang.tistory.com/6
# C++ refresher
- unordered_map<T, T>
  - Same usage as map
  - map triggers sorting on insert/erase; unordered_map does not, so it's faster.
  - map lookup: O(log n)
  - unordered_map: O(1), worst case O(n)
  - ref: [Blog1](https://math-coding.tistory.com/31), [Blog2](https://jjeongil.tistory.com/1045)
- stringstream
  - str(): extracts data of the appropriate type from the buffer, excluding spaces and '\n'
  - ref: [Blog1](https://deukyu.tistory.com/48), [HowToUse](https://life-with-coding.tistory.com/403)
- Ranged-based for loops, auto
  - ref: [Auto type inference](https://boycoding.tistory.com/210), [Ranged-based for](https://blockdmask.tistory.com/319)
```c
  for (auto it: v)
	cout << it;

  for (auto& it: v)
  	it *= 2; // can use pointers

  for (const auto& it: v)
  	// if copy cost is high, use const pointer
  ```


# Solution
1. Map each user to an index so they can be identified.
2. Build a mapping of "key: reported user, value: set of users who reported them".
3. Using the info from step 2, if k or more people reported someone, update the banned user info based on the indices from step 1.

# Code
```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
#include <sstream>

using namespace std;

vector<int> solution(vector<string> id_list, vector<string> report, int k) {
    vector<int> answer(id_list.size(), 0);
    unordered_map<string, int> idx_map; // assign index to each user
    for (int i = 0; i < id_list.size(); i++)
        idx_map[id_list[i]] = i;

    unordered_map<string, set<string>> report_map; // store the set of reporters per reported user
    stringstream ss;

    for (auto rep: report) {
        ss.str(rep);
        string first, second;
        ss >> first >> second; // split by space using stringstream output

        report_map[second].insert(first); // store first (the reporter) in second's set
        ss.clear();
    }

    for (auto it: report_map) {
        if (it.second.size() >= k) { // for users reported by k or more people
            for (auto set_it: it.second) { // find each reporter by index and notify them
                int idx = idx_map[set_it];
                answer[idx]++;
            }
        }
    }
    return answer;
}
```
