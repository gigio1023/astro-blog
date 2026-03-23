---
title: "Template e consigli per PyTorch"
description: "Consigli per progetti PyTorch: struttura del template, getattr per configurazione dinamica e metodi astratti."
lang: it
translationOf: "pytorch-template-tip"
date: "2021-08-17T13:22:09.135Z"
tags: ["pytorch", "python"]
draft: false
---

# Template
Durante il progetto di laurea, gli stage e i lavoretti, ho usato sia TF che PyTorch senza mai stabilire un template. Aggiungevo e separavo directory e script alla rinfusa in base alle necessità.

I template non sono la soluzione a tutto, ovviamente. Come ogni template, hanno i loro alti e bassi. Però credo che non ci sia niente di più efficiente che iniziare lo sviluppo con una struttura definita.

https://github.com/victoresque/pytorch-template

Questo template di esempio è un buon riferimento non solo per la struttura, ma anche per le varie tecniche di implementazione che contiene.

# getattr
https://technote.kr/249

Permette di accedere agli attributi di un oggetto tramite il nome.
```python
class Person:
    def __init__():
        self.name = 'a'
jack = Person()
getattr(jack, 'name')
>>> 'a'
```

L'accesso agli attributi di un oggetto è sempre hardcoded. Per esempio, per accedere al nome di Jack bisogna scrivere:
```python
jack.name
```
Quando si vogliono usare gli attributi in modo dinamico, getattr torna utile. Permette di modificare solo un file di configurazione come config.json invece di cambiare il codice ogni volta che un attributo cambia.

# abstract
In Java, C++, ecc., si mette abstract prima del nome della funzione per definire un metodo astratto. In Python si usa un decorator.

``` python
@abstractmethod
    def _train_epoch(self, epoch):
        """
        Training logic for an epoch

        :param epoch: Current epoch number
        """
        raise NotImplementedError
```

Non basta definirlo senza fare raise di NotImplementedError -- bisogna sollevare l'errore per rendere l'astrazione effettiva.
