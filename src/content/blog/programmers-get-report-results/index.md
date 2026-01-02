---
title: "[프로그래머스] 신고 결과 받기"
description: "."
date: "2022-01-30T17:51:20.099Z"
tags: ["algorithm"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/92334?language=cpp
ref: https://wadekang.tistory.com/6
# C++ 재활
- unordered_map<T, T>
  - map과 동일한 사용 방법
  - map은 insert, erase시에 정렬이 발생하는데, unorderded_map은 안한다. 따라서 빠름. 
  - map의 탐색시간이 O(log n)
  - unordered_map은 O(1), 최악의 경우 O(n)
  - ref: [Blog1](https://math-coding.tistory.com/31), [Blog2](https://jjeongil.tistory.com/1045)
- stringstream
  - str(): 공백과 '\n'을 제외하고 문자열에서 적절한 자료형의 정보를 buffer에서 추출
  - ref: [Blog1](https://deukyu.tistory.com/48), [HowToUse](https://life-with-coding.tistory.com/403)
- Ranged-based for loops, auto
  - ref: [Auto 타입추론](https://boycoding.tistory.com/210), [Ranged-based for](https://blockdmask.tistory.com/319)
```c
  for (auto it: v)
	cout << it;
    
  for (auto& it: v)
  	it *= 2; //포인터 사용 가능
    
  for (const auto& it: v)
  	// 복사 비용이 크다면, const pointer 사용
  ```

  
# 풀이
1. 이용자를 구분할 수 있도록 이용자와 인덱스를 mapping
2. "key: 신고당한 사람, value: 신고한 사람의 집합"으로 mapping
3. 2번의 정보를 활용해 k명 이상이 신고했다면, 1번의 인덱스를 기준으로 정지당한 이용자의 정보를 업데이트

# 코드
```C++
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
#include <sstream>

using namespace std;

vector<int> solution(vector<string> id_list, vector<string> report, int k) {
    vector<int> answer(id_list.size(), 0);
    unordered_map<string, int> idx_map; // 이용자에게 index 부여
    for (int i = 0; i < id_list.size(); i++)
        idx_map[id_list[i]] = i;
    
    unordered_map<string, set<string>> report_map; // 신고당한 이용자를 기준으로 신고한 사용자 집합 저장
    stringstream ss;
    
    for (auto rep: report) {
        ss.str(rep);
        string first, second;
        ss >> first >> second; // stringstream으로 stream output을 진행하면서 공백 분리
        
        report_map[second].insert(first); // second를 신고한 사람인 first를 second의 set에 저장
        ss.clear();
    }
    
    for (auto it: report_map) {
        if (it.second.size() >= k) { // 신고한 사람이 k명 이상인 이용자에 대해서
            for (auto set_it: it.second) { // 신고한 사람들을 인덱스 기준으로 찾아서, 정지당했다고 알려준다.
                int idx = idx_map[set_it];
                answer[idx]++;
            }
        }
    }
    return answer;
}
```