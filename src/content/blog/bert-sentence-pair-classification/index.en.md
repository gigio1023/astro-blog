---
title: "BERT Sentence Pair Classification Task"
description: "BERT-based sentence pair classification covering NLI, semantic text pair similarity, and information retrieval QA."
date: "2021-09-28T08:35:45.631Z"
tags: ["nlp"]
draft: false
lang: en
translationOf: "bert-sentence-pair-classification"
---

# Sentence Pair Classification Task
A task that measures natural language inference and semantic similarity between two given sentences.

![](/assets/images/BERT 두 문장 관계 분류 task/9f79eea6-6b03-4120-bd92-3aea6143f05f-image.png)

Similar to single-sentence classification, a classifier on the CLS token handles the classification. The difference is that both sentences are fed into the model together, separated by a SEP token.

## NLI
Natural language inference.
- A task that verifies whether a language model understands natural language context
- Classifies Premise and Hypothesis as follows:
  - Entailment: hypothesis is true
  - Contradiction: hypothesis is false
  - Neutral: hypothesis is presumably true, or hard to judge definitively

## Semantic text pair
A task that checks whether two sentences have the same meaning.

## IRAQ
Information Retrieval Question and Answering.
A task that finds the most appropriate answer from a predefined QA set for a given question.
![](/assets/images/BERT 두 문장 관계 분류 task/dabde1fc-11e7-4882-98b9-5c5ff0114093-image.png)

The basic structure is the same as a typical chatbot. It compares the user's query with predefined queries by similarity and returns the answer for the most similar query.

The difference is that Paraphrase Detection is attached at the end of the model. The preceding task produces the top n answers with high similarity, and this model finds the most appropriate answer among them. It becomes a model that infers semantic similarity.
