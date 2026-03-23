---
title: "PyTorch Template and Tips"
description: "PyTorch project tips: template structure, getattr for dynamic config, and abstract methods."
lang: en
translationOf: "pytorch-template-tip"
date: "2021-08-17T13:22:09.135Z"
tags: ["pytorch", "python"]
draft: false
---

# Template
Throughout my graduation project, company internships, and part-time work, I used both TF and PyTorch but never settled on a template. I'd add and split directories and scripts haphazardly as needed.

Templates aren't a silver bullet, of course. Like any template, they rise and fall in popularity. But I think there's nothing more efficient than starting development with some structure in place.

https://github.com/victoresque/pytorch-template

This example template is worth referencing not just for the template itself but also for the various implementation techniques it contains.

# getattr
https://technote.kr/249

Lets you access an object's attributes by name.
```python
class Person:
    def __init__():
        self.name = 'a'
jack = Person()
getattr(jack, 'name')
>>> 'a'
```

Accessing an object's attributes is always hardcoded. For instance, to access Jack's name, you must write:
```python
jack.name
```
When you want to use attributes dynamically, getattr comes in handy. It lets you modify only a config file like config.json instead of changing code every time an attribute changes.

# abstract
In Java, C++, etc., you put abstract before the function name to define an abstract method. In Python, you use a decorator instead.

``` python
@abstractmethod
    def _train_epoch(self, epoch):
        """
        Training logic for an epoch

        :param epoch: Current epoch number
        """
        raise NotImplementedError
```

You can't just define it without raising NotImplementedError -- you need to raise the error to make the abstraction enforceable.
