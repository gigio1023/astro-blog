---
title: "Language Model Benchmark Summary"
description: "Summary of language model benchmarks from GLUE to multilingual evaluations, covering the evolution from RNN to ELMo, BERT, and beyond."
date: "2021-09-26T22:12:41.097Z"
tags: ["nlp", "naver-boostcamp"]
lang: en
translationOf: "language-model-benchmark-summary"
draft: false
---

# Language Modeling
A Seq2Seq task. Predicting the next word given context.

![](/assets/images/Language model Benchmark 간단 정리/c4574267-c36a-47a2-8735-213136b0523f-image.png)

Can also be thought of as predicting the probability of the next word appearing at a given point in a sentence.

## RNNs
![](/assets/images/Language model Benchmark 간단 정리/eade94db-783b-4d14-97ce-ba671fdb5f24-image.png)

Sequence elements are fed into the model in order. The previous hidden state is used as input for the next step.

RNNs are models designed for specific tasks, so they **only work well on those tasks**. e.g., a Seq2Seq model only handles Seq2Seq.

## Bidirectional Language Modeling
### ELMo
Bidirectional language modeling. ELMo (Embeddings from Language Models) first introduced this concept.

It showed that embedding natural language and performing language modeling tasks can also handle other NLP tasks.

![](/assets/images/Language model Benchmark 간단 정리/76453581-7a9e-45d5-81f6-df575506d647-image.png)

As shown in the right diagram, ELMo performs language modeling in both forward and backward directions.

![](/assets/images/Language model Benchmark 간단 정리/a7b68d9f-1073-4494-afc5-4383d18764ed-image.png)

Previously, there were separate models specialized for SQuAD (QA), SNLI (contradiction detection), SRL (semantic role labeling), Coref (entity finding, [Blog](https://gnoej671.tistory.com/15)), NER (entity recognition), and SST-5 (sentence classification).

ELMo performed all 6 tasks with a single language model and showed meaningful accuracy.

## BERT
Bidirectional Encoder Representations from Transformers. A paper that used Transformers for bidirectional language modeling.
![](/assets/images/Language model Benchmark 간단 정리/1118b4bd-da20-492a-8b94-7282d751cf00-image.png)

Pre-trains encoding/decoding transformers on a large corpus to extract embeddings. Where ELMo used two RNNs for bidirectional encoding, BERT uses transformers to train both directions simultaneously.

![](/assets/images/Language model Benchmark 간단 정리/5ee98e48-41c5-4b9c-9134-dc97ef254a51-image.png)

![](/assets/images/Language model Benchmark 간단 정리/2cfb4633-fe7c-4b83-acc7-c019d407509c-image.png)
Like ELMo, BERT showed that language modeling can handle multiple NLP tasks.

![](/assets/images/Language model Benchmark 간단 정리/0b9ec46d-9a05-4ac1-86a4-510ea9b1d20e-image.png)

Others had tried handling multiple NLP tasks with a single language model before, but BERT had the best performance and was easier to use.

Demonstrated effective performance on GLUE and SQuAD 1.1/2.0.

# GLUE
General Language Understanding Evaluation.
A dataset and task definition for evaluating how well a language model **understands** natural language.

Standardized datasets and NLP task definitions made evaluating BERT and subsequent models much easier. Facebook's RoBERTa, Stanford's ELECTRA, Google's ALBERT -- all were fairly evaluated under this framework.

GLUE Benchmark items. ref: https://vanche.github.io/NLP_Pretrained_Model_BERT(2)
- MNLI (Multi-Genre Natural Language Inference): entailment classification task
- QQP (Quora Question Pairs): determining if question pairs on Quora are semantically identical
- QNLI (Question Natural Language Inference): binary classification version of SQuAD -- whether a paragraph contains the answer
- SST-2 (Stanford Sentiment Treebank): single sentence binary classification using movie review sentiment
- CoLA (Corpus of Linguistic Acceptability): binary classification of whether English sentences are linguistically acceptable
- STS-B (Semantic Textual Similarity Benchmark): measuring sentence pair similarity
- MRPC (Microsoft Research Paraphrase Corpus): sentence pair similarity
- RTE (Recognizing Textual Entailment): similar to MNLI but with less data
- WNLI (Winograd NLI): NLI dataset with scoring issues, excluded from BERT experiments

![](/assets/images/Language model Benchmark 간단 정리/cccf4ba8-a0b8-46f6-9f2e-fcc534e6477b-image.png)

GLUE provided an ongoing impetus for model improvement through benchmarking.

# Natural Language Generation Benchmarks

![](/assets/images/Language model Benchmark 간단 정리/5372dd0d-92c6-4a22-abaf-0b8a475d4507-image.png)

Beyond GLUE, benchmarks for evaluating language models like Google's T5 ([Blog](https://brunch.co.kr/@synabreu/49)) and Facebook's BART ([Blog](https://dladustn95.github.io/nlp/BART_paper_review/)) emerged.
These benchmarks evaluate how well natural language is generated.

Masked or noisy text is reconstructed not by the encoder but through the decoder's output. That is, the decoder is also included in the pre-training scope.

# Multilingual Benchmarks
Since GLUE is English-based, other languages had to rely on English-based approaches. Without considering language-specific characteristics, this led to inefficient processes of modifying English approaches or devising language-specific methods from scratch.

Multilingual benchmarks emerged, designing and evaluating benchmarks tailored to specific languages:
- FLUE: French
- CLUE: Chinese
- IndoNLU benchmark: Indonesian
- IndicGLUE: Indian languages
- RussianSuperGLUE: Russian

## Korean Benchmark
KLUE (Korean Language Understanding Evaluation)

- Named Entity Recognition (NER)
  - Classifying words according to predefined categories
- POS Tagging and Dependency Parsing
  - Identifying parts of speech
  - Analyzing dependency relationships between words
- Text Classification
- Natural Language Inference
  - Determining if two sentences are contradictory, explanatory, etc.
- Semantic Textual Similarity
- Relation Extraction
- Question Answering
- Task-oriented Dialogue
