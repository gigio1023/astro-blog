---
title: "[백준] 2048 (Easy)"
description: "."
date: "2021-10-13T14:59:23.302Z"
tags: ["algorithm", "python"]
draft: false
---

[ref blog](https://chldkato.tistory.com/163)
# 문제
우리가 흔히 아는 그 게임이다. 다만 제약조건이 추가된다.
- 한 번의 이동에서 이미 합쳐진 블록은 다시 못 합침
- 3개 이상의 블럭이 합쳐질 수 있다면, 이동하는 방향에 가장 가까운 것들부터 합친다.
  - e.g., 위로 이동하는거면 위에 것들부터

# 풀이
합치는 아이디어 자체는 쉽게 도출 가능하다. 비어있으면 값을 옮기고, 값이 같으면 2배로 바꾸고, 이것도 아니라면 윗 칸에 옮기면 된다.

다른 분의 해설을 봐도 이해하기 어려웠던 점은 한 번 합쳐진 블럭에 대해서 막아주는 것이다. 뭔가 flag를 설정할 줄 알았는데 합쳐지는 row 혹은 column에 대해서 계속 값을 증가시키는 쪽으로 합쳐지는 row 혹은 column을 정했다.


두번째로 어려웠던 점은, 4방위에 대해서 어떻게 처리할 것인가이다. 이것은 row와 column에 대해서 어떤 것을 먼저 처리할 것인지 제대로 숙지해야했다. 

가령 좌우측으로 옮길 때는 column을 기준으로 row를 1개씩 옮겨야한다. 상하측은 row를 기준으로 column을 1개씩 옮겨야 한다.

```py
if direction == 0:
        # arr의 모든 column을 보기 위해서 n번 본다
        for j in range(n):
            idx = 0 
            # arr의 0번째 row를 빼고 모든 row에 대해서 봐야하므로
            for i in range(1, n):
                # arr의 요소가 0이 아니라면 == 비어있지 않다면
                if arr[i][j]:
                    # 일단 옮길 것을 저장해둔다.
                    temp = arr[i][j]
                    # 일단 옮길 것의 본래 공간을 비워둔다.
                    arr[i][j] = 0
                    # 옮겨갈 곳이 0일 때
                    if arr[idx][j] == 0:
                        # 비어있으므로 그냥 옮기면 된다.
                        arr[idx][j] = temp
                    # 옮기는 것과 옮겨갈 것이 같다면
                    elif arr[idx][j] == temp:
                        # 합친다
                        arr[idx][j] = temp * 2
                        # 다시 합치면 안되므로 idx를 더해준다.
                        idx += 1
                    # 옮기는 것과 옮겨갈 것이 다르다면
                    else:
                        idx += 1 # 막아주고
                        arr[idx][j] = temp # 복원
```
[0, 3]을 순서대로 상하좌우에 맵핑했다. direction = 0이므로 위 코드는 위로 블럭을 옮기는 예제다.

위로 옮기는건 쉽다. 좌우가 문제다. 좌는 아래처럼 해줬다.


```py
elif direction == 2:
        for i in range(n):
            idx = 0
            for j in range(1, n):
                if arr[i][j]:
                    # 일단 옮길 것을 저장해둔다.
                    temp = arr[i][j]
                    # 일단 옮길 것의 본래 공간을 비워둔다.
                    arr[i][j] = 0
                    # 옮겨갈 곳이 0일 때
                    if arr[i][idx] == 0:
                        # 비어있으므로 그냥 옮기면 된다.
                        arr[i][idx] = temp
                    # 옮기는 것과 옮겨갈 것이 같다면
                    elif arr[i][idx] == temp:
                        # 합친다
                        arr[i][idx] = temp * 2
                        # 다시 합치면 안되므로 idx를 더해준다.
                        idx += 1
                    # 옮기는 것과 옮겨갈 것이 다르다면
                    else:
                        idx += 1 # 막아주고
                        arr[i][idx] = temp # 복원
```

i는 무조건 row를 위한 변수로, j는 무조건 column을 위한 변수로 쓸 것이다. 이 때, 좌측으로 옮기는 task는 column을 기준으로 row를 한개씩 옮겨가면서 살펴봐야한다. 따라서 for문의 순서를 바꿔서 i, j 순서로 돌도록 해야한다. 

나머지는 위로 옮기는 것처럼 자연스럽게 쓰자.


아래로 옮기는건 i를, 우측으로 옮기는 것은 j를 반대로 range하면 된다. 즉, n-2부터 1까지 보도록 해주자. 


# 코드
https://github.com/naem1023/codingTest/blob/master/implementation/acmipic-12100.py