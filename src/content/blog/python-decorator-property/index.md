---
title: "Python decorator, property"
description: "."
date: "2021-08-03T16:41:17.158Z"
tags: ["python"]
draft: false
---

# @property decorator
- class의 getter, setter를 쉽게 사용 가능하게 해준다.
- 일반적인 getter, setter와 동일하게 제한, 하위호환성 등을 고려할 수 있다.

python의 class에 property라는 내장함수가 있는데, 이를 decorator 형태로 사용 가능하게 한 것.


## 쉽게 getter, setter 사용
decorator 없이는 private member에 대해서 아래와 같이 코딩할 수 밖에 없다.
```
class Person():
    def __init__(self):
        self.__name = 'jack'
    def set_name(self, name):
    	self.__name = name
    def get_name(self):
    	return self.__name
```

이러한 getter, setter를 @property decorator를 통해 간단하게 표현할 수 있다.

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
## 하위호환성
추후에 Person이라는 class를 확장한다고 할 때, class member의 제약을 미리 걸어둬야할 경우가 있을 수 있다.
가령, 나이 제한을 둬야하는 경우가 있다고 하자.

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

하지만 외부에서 age에 바로 접근할 수 있는 경우이기에, age에 대한 제약이 효력이 없는 경우가 존재한다.

이럴 때, property decorator를 사용한다.
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
외부에서 어떤식으로 접근해도, age에 대한 제한이 유효하다.