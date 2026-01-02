---
title: "Linux server sleep"
description: "."
date: "2021-10-03T21:06:55.212Z"
tags: ["linux"]
draft: false
---

ref: https://www.unixtutorial.org/disable-sleep-on-ubuntu-server/

개인용 서버로 구매한 오드로이드가 가동 1년쯤부터 자꾸 꺼지기 시작했다. 단순히 전원 케이블이 잘못 꼽혀서 발생한 문제인줄 알았는데, 빈번하게 서버가 자주 꺼졌다. 

구글링 결과
- 대부분의 사람들이 /var/log/messages 체크를 추천했지만 난 이러한 로그 파일이 전혀 존재하지 않았다. 
- /var/log/messages에 적혀야 할 내용들은 dmesg에 있었다.

시스템 로그를 살펴보니 NetworkManager에 sleep 명령어가 전달되고 시스템이 종료됐다.
```
NetworkManager[755]: <info>  [1633287633.3651] manager: sleep: sleep requested (sleeping: no  enabled: yes)
NetworkManager[755]: <info>  [1633287633.3661] manager: NetworkManager state is now ASLEEP
ModemManager[809]: <info>  [sleep-monitor] system is about to suspend
```

> 일반적인 시스템 로그: /var/log/syslog



하드웨어적인 문제로 트러블슈팅되지 않아서 다행이었다. 리눅스 시스템 자동 sleep 관해서 찾아서 위에 첨부한 링크대로 수행했다. sleep.target service에서 loaded 부분만 바꿔준걸 보니 기존에 특정 스케쥴러들이 sleep.target에 관여하던 내용들을 지워준 것으로 보인다.

```shell
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

위 명령어 수행 후 다행히 아직까진 서버 이상 종료 현상은 발생하지 않고 있다.