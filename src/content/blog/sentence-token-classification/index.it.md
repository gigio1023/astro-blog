---
title: "Classificazione dei token di frase"
description: "Task di classificazione a livello di token con BERT, tra cui Named Entity Recognition (NER) e POS tagging per il testo coreano."
lang: it
translationOf: "sentence-token-classification"
date: "2021-09-28T12:22:48.886Z"
tags: ["nlp"]
draft: false
---

# Modello
![](/assets/images/문장 토큰 분류/604bc451-9007-4544-8e84-40a229e90656-image.png)

Un task che classifica ogni token di una frase data in categorie. Un classifier viene attaccato a ogni token.

## NER
Named Entity Recognition.
Il processo di riconoscimento di parole, frasi o entità con un significato specifico -- come nomi di persone e organizzazioni -- dai documenti attraverso il contesto.

La stessa parola può essere riconosciuta come entità diverse, quindi capire il contesto è importante.

https://github.com/kakaobrain/pororo

Una libreria per task NLP e relativi al parlato sviluppata da Kakao. Gestisce la maggior parte dei task elaborabili in coreano, incluso il NER.

## POS Tagging
Part-of-speech tagging.

- Suddivisione dei documenti in parti del discorso e morfemi.

## Dati coreani
- kor_ner
  - Un dataset NER pubblicato dalla Korea Maritime University.
  - I dataset NER tipicamente includono informazioni di POS tagging, e kor_ner le include.
  - Etichettato con tag BIO [wikidocs](https://wikidocs.net/24682)
  ![](/images/3851e8d0-0a33-4a82-8f5b-6bae8b520672-image.png)

# Training
![](/assets/images/문장 토큰 분류/3aa9a28b-2465-4a76-874e-41d9c22ade6b-image.png)

Come detto sopra, un classifier viene attaccato a ogni token per il training.

![](/assets/images/문장 토큰 분류/2cb82532-ad96-4ef1-a2f5-b741de436d52-image.png)

**Si raccomanda il tokenizing a livello di carattere per la classificazione dei token di frase.**
Quando si tokenizza per morfemi o unità di parola, la definizione di un'entità può diventare ambigua. Ad esempio, dividere un nome coreano come "Lee Sun-shin" ai confini dei morfemi potrebbe spezzarlo in frammenti che sono quasi impossibili da classificare come nome di persona, indipendentemente dal training.
