---
title: "TIL 코딩 정리 2021.08.25~27"
description: "."
date: "2021-08-26T23:45:48.082Z"
tags: ["PyTorch", "TIL", "ai comeptition"]
draft: false
---

코딩, 검증에 정신없어서 기록을 하나도 못했다. 몰아서 정리해야겠다.

# conda, pip
conda가 dependency conflicts 측면에서는 압도적으로 좋다. 다만, 네이버 서버에서는 매우 느렸다. 대부분 conflicts가 발생했고 설치된 모든 파이썬 모듈에 대해서 conda가 conflicts를 해결하기 위해 5분 이상이 걸렸다. 특히 윈도우에서는 더욱 오래 걸렸다.

conda-forge를 사용하면 설치하지 못하는 모듈이 없지만, 작은 모듈들은 pip로 설치했다.

# wandb
tensorboard에 비해 매우 좋았다. 
- tensorboard: 서버사이드의 log파일에 남은 파일을 서버가 읽어준다.
- wandb: python script 상에서 개발자가 직접 update할 요소, update 시기, update 객체를 지정

## wandb 객체
하나의 wandb의 run 객체가 wandb 상에서 하나의 name을 가지는 지표 모음집이 된다.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/4ecb11b3-9b07-4405-bd98-f669fec6ae26-image.png)

이 때, 하나의 run 객체에서 train과 validation을 한번에 update해주면 step을 표시에서 문제가 발생한다.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/952e8ca1-65f4-4fff-8b42-e627f2e0ccaf-image.png)

개발자가 의도한 것은 train, validation 지표들이 분리되서 진행되는 것이다. 하지만 동일 run 객체에 update하게 되면 train, validation 지표가 번갈아가면서 업데이트된다. 

e.g., 1~10 step은 train이 업데이트되고, 11~15는 validation이 업데이트.

### 해결책
train과 validation 진행시 서로 다른 wandb run 객체를 불러와서 update해야한다. 코드를 다 뜯어고쳐야겠다..

# Fine tuning
class num을 조절할 수 있게 해주는 pre trained model들만 찾다보니 선택지가 별로 없었다. 생각해보면 pytorch의 특성을 살려서 사용하고 싶은 아무 모델이나 쓰면 된다.

1. Pre trained model 선정
2. print로 model 출력
3. 출력단 layer 이름 확인
4. 출력단 layer의 이름을 model의 attribute로 호출해서 layer output 변경.
5. 보통 linear neural network이니 xavier로 초기화.

# 개발 / 테스트
무조건 작은 네트워크로 프로그램을 테스트 후, 결과가 필요할 때 무거운 모델로 학습. 무식하게 efficientnet-b7으로 테스트하지말고 resnet-18이나 더 작은 모델로 테스트한다.

다만, 이전처럼 서버에서 모든 것을 해결하지 않는다. 데스크탑에서 os dependency가 없는 코드를 구현해 테스트하고, 이를 서버에서 사용하는 방식을 사용 중이다. 즉, 서버는 계속 train만 하고 개발은 데스크탑에서만 한다. 다행히 rtx3070 덕분에 colab을 안 써도 괜찮다.

# 경로 구분자
습관적으로 리눅스의 경로 구분자인 '/'를 사용하게 되는데, 의식해서 os.sep이나 os.path.join을 사용해서 os 종속성을 없애자.

# ensemble learning
내가 생각했던 ensemble learning module들은 임의의 model을 넣으면 알아서 본인만의 방법론으로 최적의 model을 만들어주는 줄 알았다. 실제로 pytorch 전용으로 그러한 모듈이 있긴하다. 

https://ensemble-pytorch.readthedocs.io/en/stable/quick_start.html

하지만, custom 여지도 없고 불편한데다 효과도 없었다. XGBoost, LightBGM같은 방법론도 찾아봤는데 CNN과는 다른 성질의 모델 자체였다.

마스크 구분 문제를 CNN으로 푸는 것이 취지인 대회이니 아예 voting을 구현하는 것이 제일 좋은 것 같다.

# model save name
이전 회사에서도 날짜를 활용해 디렉터리를 생성 후, 해당 디렉터리에 plt 출력 파일, 그래프 이미지 파일, 텐서보드 로그 파일, 프로그램 로그 파일 등등 온갖 부산물을 다 넣었다. 

그 때와 유사하게 이번에도 날짜별로 디렉터리를 만들고 model의 이름, feature 이름, 평가 지표 등을 파일 이름에 넣기로 했다. 

# early stopping
이전 회사에선느 이걸 휴리스틱하게 했는데, 생각해보면 기계적으로 깔끔하게 처리하는 것을 구현하는데 100줄도 안되는 코드로 구현이 된다. 왜 지금까지 생각을 못했을까...

일정 step만큼 특정 지표가 상승되지 않다면 학습을 멈추게 해주는 클래스를 만들어서 쓰기로 했다. 

## delta
https://github.com/Bjarten/early-stopping-pytorch/blob/master/pytorchtools.py
github에 미리 구현된 early stopping을 보면 delta라는 것을 비교 수식에 더해준다. 

early stopping은 지표가 수렴할 때 멈추고자 하는 것인데, 수렴의 정확한 의미를 수치 상의 단순 비교로 처리하기 어려운 경우가 많다. 

가령, 6번의 step 동안 평가 지표가 상승하지 않아야지 early stopping을 한다고 해보자.
이 때, 지표가 아주 미세하고 상승하고 다시 하락하는 행위가 반복된다면 early stopping을 할 수 없다. 즉, 지표가 특정 수치 부근에서 수렴하는 듯할 때 학습이 멈추길 바랬지만 단순 수치 상의 비교를 하게 되면 지표가 조금이라도 변할 때 early stopping counting을 멈춘다.

따라서 지표가 진동하는 듯한 그 범위를 delta로 잡아주고 비교 수식에 더해준다. 빼주지 않는 이유는 아래 수식은 loss를 기반으로 하고 있기 때문에 loss가 상승하는 것을 count하지 않기 위함이다.

```python
elif score < self.best_score + self.delta:
    self.counter += 1
```
# project sturcture
수업에서 알려준 python template을 많이 참고했다. 
https://github.com/victoresque/pytorch-template

현재 사용 중인 프로젝트 구조는 다음과 같다.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/fa5294a5-736c-4735-a8d0-5f919ceddf39-image.png)

# git
## config 추적
데이터 파일들의 경로, 프로그램 설정 값 등을 config.json이나 config.py로 관리하게 된다. 이 때 git으로 아래처럼 관리하자.
- config file 추적을 할 경우
  - os 별로 서로 다른 config file을 사용하도록 설정
- config file 추적을 안 할 경우
  - 신경쓸거없다.
  - 배포 시에 따로 config 파일을 배포할 방법을 찾아야한다.
  
윈도우와 리눅스를 번갈아가면서 사용하고 있어서 config 파일을 추적하지 않지만, 제대로 배포할거면 config 파일을 추적해서 os 별로 다르게 사용하도록 하자.
## git 추적 중지
사용할 일이 없어서 몰랐는데 알아두자.
https://kamang-it.tistory.com/entry/TipGit-%EC%82%AC%EC%9A%A9%EC%8B%9C-%ED%8A%B9%EC%A0%95-%ED%8C%8C%EC%9D%BC%EC%9D%84-%ED%8A%B8%EB%9E%98%ED%82%B9%EC%9D%84-%ED%95%98%EA%B8%B0-%EC%8B%AB%EC%9D%84-%EA%B2%BD%EC%9A%B0

config 파일, csv 부산물들을 추적 중지할 때 사용했다.

## git rebase
전 회사에서 merge만 쓰다가, rebase로 다시 merge하라고 했을 때 문제 해결하려고 안간힘 썻던 기억이 난다.. 깔끔하게 브랜치 관리가 편한 rebase를 되로고 쓰자. 사용법을 까먹어서 docs를 보고 참고했다. 
https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0

## git default branch
local에서 default branch를 변경하는 것은 command로 해결 가능하다.
https://stevenmortimer.com/5-steps-to-change-github-default-branch-from-master-to-main/

하지만 remote repository의 default branch를 변경하는 것은 반드시 repository 관리자가 github 웹사이트에서 행해야하더라.