---
title: "[프로그래머스] 로또의 최고 순위와 최저 순위"
description: "."
date: "2022-01-31T08:04:48.906Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/77484?language=cpp

# C++ 재활
- find()
  - iterator의 첫번째와 마지막을 parameter로 하여 검색.
  - 못 찾으면 iterator의 마지막을, 찾았으면 값을 반환.
    
```c++
#include <algorithm>
#include <vector>
#include <iostream>
vector<int> target;
int i = 0;

auto res = find(target.begind(), target.end(), i);
if (res != target.end()) cout << "find" << endl;
```
- vector method
```c++
// 복사
dest.assign(source.begin(), source.end());

// 삭제
dest.erase(idx);
```
# 풀이
1. lottos, win_nums를 비교해 일치하는 개수를 센다.
2. 0의 개수를 센다.
3. 1번을 통해 최저 순위를, 1번과 2번을 더한 값을 통해 최고 순위를 알 수 있다.

# 코드
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
    
    // worst: lottos와 win_nums를 비교
    // best: worst + 0의 개수
    
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