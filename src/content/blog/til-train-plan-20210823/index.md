---
title: "TIL train 계획 정리 2021.08.23"
description: "."
date: "2021-08-23T16:57:30.489Z"
tags: ["PyTorch", "TIL", "ai competition"]
draft: false
---

TIL 자체를 체계적으로 정리하지않고 카테고리별로 포스팅 후, 주간학습 정리에서 TIL을 간략하게 적었다.

지식을 배울 때는 쓸모있는 방식인데 매일매일 해커톤과 같이 계속 코딩할 때는 매우 비효율적인 느낌이다. 대회가 진행되는 P stage에서는 TIL을 직접 적어야겠다.

# Train 계획
feature는 여러개가 있지만, feature 간의 상관관계, 인과관계가 있다고 장담할 수 없다. 그리고 없는게 당연하다. 데이터를 보아하니 그럴 수 있는 데이터가 아니다... 그래서 아래와 같이 앞으로 어떻게 학습할지 정리해봤다.

## 요약
글씨가 개판이다.. 정리하면 feature 별로 모델을 생성 후, Ensemble learning을 할 것이다. 각각의 모델을은 각각 동일한 images를 입력으로 받고, feature에 대한 classification을 하는 모델이다.

# Jupyter vs py
회사에서 jupyter를 안 쓰고 cli python으로만 코딩한게 1년이 넘어가니까 아무래도 후자의 방식이 훨씬 편하고 정리하기도 좋다. jupyter로 쓰면 노트북 하나에 그 많은 코드를 다 때려박아야되니 가시성이 끔찍하게 안 좋다.

다만, 이번에는 실험용으로 jupyter를 활용했다. 데이터 셋, pandas 사용법 등 여러 class, function들을 미리 jupyter에서 만들어보고 이를 .py에 적용했다.

다만 이렇게 해도 불편한 점들은 여전히 존재한다.
- module 관리할 수 있도록 따로 추가 코딩 필요.
- global variable을 자주 활용하는 jupyter 특성 상, .py에 그대로 적용이 어려워 추가 코딩 필요.

결국은 .py에 그대로 코딩 중이다.

# pycharm ssh
education 버전으로 pycharm을 쓰고 있어서 ssh, sftp를 써서 서버사이드 코딩이 되는 것을 알고 있었다. 다만, 내가 해봤을 때는 vscode의 remote-ssh보다 불편한 점들이 한두개가 아니라서 안썼다. 

몰랐는데 오늘 피어세션에서 다 된다는 정보를 들었다. 시간이 없으니 주말에나 도전해봐야겠다. ide의 완성도가 pycharm이 한참 좋아서 갈아타는게 무조건 이득이다.. 다만 대회에서 포트를 전부 open 안해놔서 pycharm으로는 디버깅이 안된다고 한다.