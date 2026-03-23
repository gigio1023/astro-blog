---
title: "KLUE Dependency Parsing and Single Sentence Classification"
description: "Overview of Korean dependency parsing and single sentence classification tasks in KLUE, including BERT-based model architecture and training pipeline."
date: "2021-09-28T08:46:25.075Z"
tags: ["nlp"]
lang: en
translationOf: "klue-dependency-parsing-single-sentence-classification"
draft: false
---

# Dependency Parsing
![](/assets/images/KLUE 의존 구문 분석, 단일문장 분류/2f3d6ea6-828b-4bdc-ad3e-4aafd0f00625-image.png)

- Head: the semantic center
- Dependent: supplements (modifies) the meaning of the head
- Primarily studied in languages like Korean where word order is flexible and omission is common

## Rules
- Heads are postpositional
  - The head always appears after the dependent
- Each dependent has exactly one head, and vice versa.
- No crossing dependency structures.
  - Nesting is allowed though. If A is a head for one word, it can simultaneously be a dependent of another.

## Classification Method
Classification via sequence labeling.

## Applications
- Complex natural language forms can be structured as graphs.
- Information about each entity can be extracted.

# Single Sentence Classification Task
Determines which class a given sentence belongs to.
- Sentiment Analysis
  - Classifying a sentence as positive/negative/neutral, etc.
  - Hate speech classification
  - Corporate monitoring
- Topic Labeling
  - Classifying sentences into categories
  - Large-scale document classification
  - VoC (Voice of Customer): classifying customer feedback
- Language Detection
  - Identifying which language a sentence is in
  - Translation
  - Data filtering
- Intent Classification
  - Classifying the intent of a sentence
  - Chatbots: understanding intent to generate appropriate responses

## Korean Sentence Classification Datasets
- Kor_hate
  - Hate speech data
  - Bias expressions, not just profanity
- Kor_sarcasm
  - Sarcasm expression data
- Kor_sae
  - Question type data
  - e.g.,
    - Yes/no questions
    - Questions asking for alternative choices
    - Prohibitions, requests, commands
- Kor_3i4k
  - Intent-related data

## Sentence Classification Model Architecture
![](/assets/images/KLUE 의존 구문 분석, 단일문장 분류/9ad8aee3-cc16-4e21-9fe9-ca11aefd0de7-image.png)

Based on BERT, with a classifier attached to the CLS token for sentence classification.

The parameters used are standard BERT configuration values:

- input_ids: input sequence tokens
- attention_mask: mask of [0,1] to distinguish padding tokens
- token_type_ids: [0,1] to distinguish first and second sentences
- position_ids: embedding indices for each input sequence position
- inputs_embeds: directly assign embedding representations instead of input_ids
- labels: labels for loss computation
- Next_sentence_label: labels for next sentence prediction loss

## Training Process
1. Prepare dataset
2. Preprocess and tokenize dataset
3. Design dataloader
4. Prepare train and test datasets
5. Configure TrainingArguments
6. Import pretrained model
7. Set up Trainer
8. Train model
9. Implement prediction and evaluation
