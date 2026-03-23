---
title: "Python decorator, property"
description: "How to use Python's @property decorator for clean getter/setter patterns and backward compatibility."
date: "2021-08-03T16:41:17.158Z"
tags: ["python"]
lang: en
translationOf: "python-decorator-property"
draft: false
---

# @property decorator
- Makes it easy to use getters and setters on a class.
- Supports restrictions and backward compatibility, just like traditional getters/setters.

Python's class has a built-in function called `property`, and this is its decorator form.


## Easy getter/setter usage
Without decorators, you'd have to write private member access like this:
```
class Person():
    def __init__(self):
        self.__name = 'jack'
    def set_name(self, name):
    	self.__name = name
    def get_name(self):
    	return self.__name
```

The @property decorator simplifies this:

```
class Person():
    def __init__(self):
        self.__name = 'jack'

    @property
    def name(self):
    	return self.__name
    @name.setter
    def name(self, name):
    	self.__name = name


someone = Person()

someone.name = 'JACK'
print(someone.name)

--> JACK

```
## Backward compatibility
When extending a class like Person later, you might need to add constraints on a member in advance.
Say you need to restrict age:

```
class Person():
    def __init__(self):
        self.age = 10
    def set_age(self, age):
        if age < 0:
            print('error')
            return
    	self.age = age
    def get_age(self):
    	return self.age
```

But if external code can access age directly, the constraint has no effect in some cases.

That's where the property decorator helps:
```
class Person():
    def __init__(self):
        self.age = 10
    @property
    def age(self):
    	return self.age
    @age.setter
    def age(self, age):
        if age < 0:
            print('error')
            return
    	self.age = age
```
No matter how age is accessed externally, the restriction remains in effect.
