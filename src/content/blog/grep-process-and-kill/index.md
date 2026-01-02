---
title: "grep process 한꺼번에 종료"
description: "."
date: "2021-10-29T08:57:49.695Z"
tags: ["linux"]
draft: false
---

```shell
ps aux | grep python | awk '{print $2}' | xargs kill -9

```
네이버 부스트캠프 AI Tech 2기 김지성 캠퍼님께서 공유해주신 내용.

- 중간 ( | ) 명령은 파이프로, 앞 명령의 실행 결과를 뒤 명령으로 전달합니다.
- ps aux 명령으로 모든 실행중인 프로세스 정보를 가져온다.
- grep python 명령으로 python 이란 이름을 가진 process 행만 추출
- awk '{print $2}' 명령으로 pid를 의미하는 두번째 열만 추출
  - [awk blog](https://reakwon.tistory.com/163)
  - awk는 필드와 레코드를 선택할 수 있다. 
  - 여기서는 2번째 필드의 내용을 출력하는 action을 수행
- xargs kill -9 명령으로 최종 추출된 pid들을 모두 kill -9 명령으로 종료
  - [xargs blog](https://jm4488.tistory.com/60)
  - 파이프라인을 통해 전달받은 값을 argument로 사용하는 명령어
  - kill -9의 argument로 awk의 결과값을 사용