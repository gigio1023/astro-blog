---
title: "Python nested function"
description: "Using Python decorators to compose nested functions for cleaner code structure."
date: "2021-08-03T16:47:56.382Z"
tags: ["python"]
lang: en
translationOf: "python-nested-function"
draft: false
---

# Nested function by decorator
## Nested function
Functions can be nested. Instead of laying functions out one-dimensionally, you can build complex composite function structures.

## Via decorator
Function structures that would be described very verbosely the traditional way can be expressed simply through decorators.

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
