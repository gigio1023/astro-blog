---
title: "Python nested function"
description: "."
date: "2021-08-03T16:47:56.382Z"
tags: ["python"]
draft: false
---

# Nested function by decorator
## Nested function
함수를 중첩하여 사용가능하다. 일차원적으로 함수를 나열하는 것이 아니라, 복잡한 구조의 함수 결합체를 생성 가능.

## Via decorator
기존의 방식으로는 매우 복잡하게 서술되는 함수 구조를, decorator를 통해 단순하게 표현 가능.

```
def start(func):
    def inner_func(*args, **kwargs):
        print("*" * 30)
        func(*args, **kwargs)
        print("*" * 30)
    return inner_func

def percent(func):
    def inner_func(*args, **kwargs):
        print("%" * 30)
        func(*args, **kwargs)
        print("%" * 30)
    return inner_func

@start
@percent
def printer(msg):
    print(msg)

printer('haha')

******************************
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
haha
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
******************************
```
ref : https://velog.io/@inyong_pang/Python-Nested-Function-2wk42jt94r