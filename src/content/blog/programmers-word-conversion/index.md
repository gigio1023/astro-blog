---
title: "[프로그래머스] 단어 변환"
description: "."
date: "2021-09-02T20:28:41.333Z"
tags: ["algorithm", "python"]
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/43163

# 풀이
ref: https://moseory20.tistory.com/31
처음에 bfs로 풀었는데 4번째 테스팅을 통과 못해서 결국 다른 분의 풀이를 봤다.

내가 풀었던 것과 주요 포인트는 같았다.
- 한글자만 달라지는 것을 감지
- 한글자만 달라졌다면 검사 시행
- 검사 시행 결과를 저장

다만 나는 재귀함수로 더 복잡하게 풀었고 이 분은 반복문으로 깔끔하게 풀었다.

bfs, dfs를 재귀함수로 짜면 function의 parameter를 통해 새로운 subset문제를 정의한다. 이러한 과정을 반복문에서 변수들을 통해 세팅해 줄 수 있다.

이해가 바로 가지 않았던 점은 bfs를 반복문에서 표현한 것인데 answer에 대한 증감 비교가 없는 점이었다. 왜냐하면 순서대로 탐색을 할 경우 분명 answer의 값이 다르게 나올 가능성이 있을거라 생각했기 때문이다.

아래 코드를 보면 알 수 있지만, 순차적인 비교가 아니라 한꺼번에 비교하기 때문에 이렇게 비교해도 되는 것이었다.

diff_word에 한꺼번에 모든 word를 쌓아두고 비교하기 때문에 코드가 얻은 answer는 항상 minimize된 값이다.

# 코드
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
                if diff==1: # 1글자 차이
                    diff_word.append(word)
                    words.remove(word)
        
        answer += 1            
        if target in diff_word: return answer
        else: word_list = diff_word
    
    return answer

```