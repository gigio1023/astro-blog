---
title: "pytorch template, tip"
description: "."
date: "2021-08-17T13:22:09.135Z"
tags: ["PyTorch", "python"]
draft: false
---

# Template
지금까지 졸업프로젝트, 회사 인턴이나 알바들을 할 때 tf도 쓰고 pytroch도 썻지만 template이란 것들 정해두고 쓰지 않았다. 중구난방하게 필요에 따라서 디렉터리와 스크립트를 추가하고 분리하고 구현하고... 

물론 템플릿이 만능은 아니다. 어느 템플릿이 그렇듯 흥망성쇠를 하겠지만 그래도 형식이란 것을 갖추고 개발을 시작하는 것만큼 효율적인 것은 없다고 생각한다.

https://github.com/victoresque/pytorch-template

예제 템플릿인데 템플릿은 물론이고 여러 구현 기법들이 포함돼있기에 참고하기 좋다.

# getattr
https://technote.kr/249

객체의 속성을 가져올 때, 이름으로 가져올 수 있게 해준다.
```python
class Person:
    def __init__():
        self.name = 'a'
jack = Person()
getattr(jack, 'name')
>>> 'a'
```

객체의 모든 속성에 대한 접근은 항상 하드코딩 방식이다. 가령, Jack의 name에 접근하기 위해서는 무조건 다음과 같이 명시해야 한다.
```python
jack.name
```
이 때, 속성을 가변적으로 사용하고 싶을 때 getattr을 사용할 수 있다. 즉, 속성이 바뀔 때마다 코드를 변경하지 않고 config.json과 같은 설정 파일만 수정해서 사용할 수 있게 해준다.

# abstract
java, c++ 등에서는 abstract를 function 명 앞에 명시해서 abstract method를 정읳나ㅡㄴ데, python은 decorator를 통해 정의한다.

``` python
@abstractmethod
    def _train_epoch(self, epoch):
        """
        Training logic for an epoch

        :param epoch: Current epoch number
        """
        raise NotImplementedError
```

그냥 정의하면 안되괴, NotImplemnetedError를 raise해줘서 에러도 정의해준다.