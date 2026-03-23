---
title: "Python decorator, property"
description: "Come usare il decoratore @property di Python per pattern getter/setter puliti e compatibilita' all'indietro."
date: "2021-08-03T16:41:17.158Z"
tags: ["python"]
lang: it
translationOf: "python-decorator-property"
draft: false
---

# Decoratore @property
- Permette di usare facilmente getter e setter su una classe.
- Supporta restrizioni e compatibilita' all'indietro, proprio come i getter/setter tradizionali.

La classe Python ha una funzione built-in chiamata `property`, e questa ne e' la forma a decoratore.


## Getter/setter semplificati
Senza decoratori, l'accesso ai membri privati andrebbe scritto cosi':
```
class Person():
    def __init__(self):
        self.__name = 'jack'
    def set_name(self, name):
    	self.__name = name
    def get_name(self):
    	return self.__name
```

Il decoratore @property semplifica il tutto:

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
## Compatibilita' all'indietro
Quando si estende una classe come Person in seguito, potrebbe servire aggiungere vincoli su un membro in anticipo.
Supponiamo di dover limitare l'eta':

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

Ma se il codice esterno puo' accedere direttamente ad age, il vincolo non ha effetto in alcuni casi.

E' qui che il decoratore property aiuta:
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
Indipendentemente da come si accede ad age dall'esterno, la restrizione resta in vigore.
