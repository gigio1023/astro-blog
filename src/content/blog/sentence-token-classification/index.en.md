---
title: "Sentence Token Classification"
description: "Token-level classification tasks with BERT, covering Named Entity Recognition (NER) and POS tagging for Korean text."
lang: en
translationOf: "sentence-token-classification"
date: "2021-09-28T12:22:48.886Z"
tags: ["nlp"]
draft: false
---

# Model
![](/assets/images/문장 토큰 분류/604bc451-9007-4544-8e84-40a229e90656-image.png)

A task that classifies each token of a given sentence into categories. A classifier is attached to each token.

## NER
Named Entity Recognition.
The process of recognizing specific meaningful words, phrases, or entities -- such as person names and organization names -- from documents using context.

The same word can be recognized as different entities, so understanding context is important.

https://github.com/kakaobrain/pororo

An NLP and speech-related task library developed by Kakao. It handles most Korean-processable tasks, including NER.

## POS Tagging
Part-of-speech tagging.

- Splitting documents into parts of speech and morphemes.

## Korean data
- kor_ner
  - An NER dataset published by Korea Maritime University.
  - NER datasets typically include POS tagging information, and kor_ner does too.
  - Labeled with BIO tags [wikidocs](https://wikidocs.net/24682)
  ![](/images/3851e8d0-0a33-4a82-8f5b-6bae8b520672-image.png)

# Training
![](/assets/images/문장 토큰 분류/3aa9a28b-2465-4a76-874e-41d9c22ade6b-image.png)

As mentioned above, a classifier is attached to each token for training.

![](/assets/images/문장 토큰 분류/2cb82532-ad96-4ef1-a2f5-b741de436d52-image.png)

**Character-level tokenizing is recommended for sentence token classification.**
When tokenizing by morphemes or word units, the definition of an entity can become ambiguous. For example, splitting a Korean name like "Lee Sun-shin" at morpheme boundaries could break it into fragments that are nearly impossible to classify as a person name regardless of training.
