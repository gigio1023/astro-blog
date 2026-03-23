---
title: "Python nested function"
description: "Usare i decoratori Python per comporre funzioni annidate e ottenere una struttura del codice piu' pulita."
date: "2021-08-03T16:47:56.382Z"
tags: ["python"]
lang: it
translationOf: "python-nested-function"
draft: false
---

# Funzioni annidate con decoratore
## Funzioni annidate
Le funzioni possono essere annidate. Invece di disporre le funzioni in modo unidimensionale, si possono costruire strutture composite complesse.

## Tramite decoratore
Strutture di funzioni che nel modo tradizionale sarebbero descritte in modo molto verboso possono essere espresse semplicemente tramite decoratori.

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
