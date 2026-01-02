---
title: "MLOps 정리"
description: "."
date: "2021-09-22T17:27:56.922Z"
tags: ["mlops"]
draft: false
---

# MLOps framerwork, tool
부스트캠프에서 사용해볼만한 MLOps framerwork, tool. 필요한 것만 써보자.

- Wandb
  - main logger
  - Sweap
    - hyperparameter tunner
- Hydra: configuration manager
  - json parser를 직접 구현하는 것보다 통일성, 확장성 좋음
  - hyperparameter 공유에 용이
- DVC: data version control
  - nlp data를 수정할 일이 있으면 사용해볼만 할 듯.
  - KLUE에서는 쓸 일 없을 것 같음
- ONNX: model deployment
  - pytorch의 model paramters를 배포하는 것이 아닌, 온전하게 실행 가능한 ONNX model로 model 변환
  - 외부 배포가 필요하다면 고려 가능
- Fast API / Uvicorn
  - Asynchronous server가 필요할 경우 docker로 두 프레임워크 사용
  - ONNX 배포에 유용할 듯
- Github actions, Jenkins, Circle CI
  - trained model 후처리에 사용
  - wandb-action
    - wandb 결과들을 통합해서 csv로 정리
    - wandb sweeps 사용할거면 굳이 안 써도 될거 같음
- Kibana
  - AWS Elastic 사용할거면 필수로 보임.
  - Wandb sweap만으로 해결할거면 불필요
  
# 협업
## 사용 가능 환경
Software engineering이 아닌 MLOps 관점에서 적용할만한 사항들
- Circle CI 
  - Build
  - Deploy
  - 보통 Orbs라는 Wrapper package로 관리
  - [ref](https://velog.io/@priveate/CircleCI-%EB%A7%9B%EB%B3%B4%EA%B8%B0)
- Github
  - Discussion, issue, action 단일화 가능
  - 별도 세팅 불필요
  - Issue: 개발 사항
  - Discussion: Issue 사항 혹은 그 외 사항들 토론
  - Action: trained model 후처리
- Jira Software
  - 별도 세팅 필요, github token으로만 가능
  - Issue: 개발 사항, 자동화 여지는 github보다 많음
  - Board: Github Project와 다르게 Board자체가 issue generator. Github은 issue로 따로 변환해야 한다.
  - Build: 별도 build tool 연결해야 함. Circle CI, Jenkins, Travis 모두 jira 지원.


## 방식
- Github만 사용
  - Code review, project 관리 모두 github으로
- Github은 Code review, Jira는 Project 관리 용도로 사용
  - https://makeeyaf.postype.com/post/8614009
  - Code review: Github PR
    - Github는 VCS용도로만
  - Project 관리: Jira(Issue, Board, Build)
  - Build: Circle CI, Jenkins, Travis, etc..