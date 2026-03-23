---
title: "NLP Overview"
description: "Overview of NLP fundamentals including tokenization, NER, sentiment analysis, machine translation, and the impact of Transformer on the field."
date: "2021-09-06T04:45:14.931Z"
tags: ["nlp"]
lang: en
translationOf: "nlp-overview"
draft: false
---

# NLP (Natural Language Processing)
Divided into NLU and NLG.
- NLU (Natural Language Understanding): understanding the intent behind language
- NLG (Natural Language Generation): teaching machines how to generate natural language

- Major conferences: ACL, EMNLP, NAACL

## Low-level Parsing
Low-level tasks for meaning extraction:
### Tokenization
ref: https://bkshin.tistory.com/entry/NLP-2-%ED%85%8D%EC%8A%A4%ED%8A%B8-%ED%86%A0%ED%81%B0%ED%99%94Text-Tokenization
- Token: the smallest grammatically indivisible unit of language
- Corpus: a body of text; a text sample
- Tokenization: splitting a corpus into tokens

In other words, a sentence is understood as a sequence of tokens.

### Stemming
- Stem: the root of a word
- Stemming: extracting the root

In both English and Korean, words can have various inflectional forms attached to the stem or suffix. Stemming removes these inflections to extract only the original meaning.

## Word and Phrase Level
### NER (Named Entity Recognition)
The process of recognizing named entities (proper nouns, etc.) composed of multiple words. Recognizing people's names, times, companies, etc.

### POS (Part of Speech) Tagging
Figuring out the part of speech of words.

## Sentence Level
### Sentiment Analysis
Analyzing the sentiment of sentences. Evaluating positive/negative, etc.

### Machine Translation
Machine translation. Performed with careful consideration of the target language's grammar and word order.

## Multi-sentence and Paragraph Level
### Entailment Prediction
Predicting logical contradiction relationships between two sentences.

### Question Answering
Comprehending the meaning of sentences and providing the answer the user wants.

### Dialog System
A task for handling conversations, like chatbots.

### Summarization
A task for summarizing given documents.

# Text Mining
- Major conferences: KDD, The WebConf (formerly WWW), WSDM, CIKM, ICWSM

- Extract useful information and insights from text and document data
  - e.g., analyzing a public figure's image over time, analyzing keyword frequency to gauge public reaction
- Document clustering (topic modeling)
  - Grouping terms with different meanings into the same group
  - e.g., using keywords like value-for-money, durability, A/S to explore reactions to a product
- Highly related to computational social science
  - e.g., discovering social insights by analyzing social media data

# Information Retrieval
Search-related technologies.
- Search tech used by Google, Naver, etc. has advanced so much that progress has slowed down.
- The most active research area is recommendation systems.
  - e.g., a search engine proactively suggests content the user might look for

# Trends of NLP
CV development 2-3 years ago:
- Rapid progress through new convolution layer stacking methods and GAN usage

NLP:
- Developed relatively slowly compared to CV before the Transformer.
- RNN-based models like LSTM and GRU were predominantly used.
- After the 2017 "Attention is All You Need" paper, almost all NLP models use self-attention-based transformers.

## Transformer
Originally designed for machine translation.
Before deep learning, machine translation required experts to manually define and map all linguistic rules.

After deep learning, RNN inputs and outputs were trained with different languages sharing the same meaning. Thanks to many techniques, RNN-based machine translation performance reached its ceiling.

The transformer showed even better performance than RNNs for machine translation. After its introduction, it's also been applied to image processing, time-series forecasting, drug discovery, material discovery, etc.

Normally, specialized models are developed for each domain and situation. But after the transformer, large models built by stacking self-attention were trained with self-supervised learning to handle general-purpose tasks. These models, applied to specific domains via transfer learning with minimal structural changes, were proven to outperform domain-specific models.

### Supervised Learning in NLP
It's similar to fill-in-the-blank. For example, in "I study math," you blank out "study" and train the model to infer what word goes there. In this example, the blank for "study" is where a verb should go, and verbs that can take "math" as an object would be candidates.

Models trained this way include BERT, GPT, etc.

We can see technology progressing from AI that handles only specific tasks toward more general-purpose AI.

But this self-supervised learning requires massive data and GPU resources. Even Tesla reportedly spent billions on electricity for model training alone...

### Word Embedding
Representing sentences as vectors in vector space as sequences.