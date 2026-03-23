---
title: "BERT Applications"
description: "Practical applications of BERT for sentiment analysis, relation extraction, semantic similarity, NER, and machine reading comprehension."
date: "2021-09-27T16:09:51.308Z"
tags: ["nlp"]
lang: en
translationOf: "bert-applications"
draft: false
---

These are topics that Professor Joo covered at length in his lectures. Let me re-summarize the BERT model alongside instructor Kim Sunghyun's class at SMAGE.

# Introduction
![](/assets/images/BERT 응용/c3c6d777-d94f-4750-b8d6-c0a23993c127-image.png)

Language models evolved in the order shown above. Initially, the encoder and decoder were separated and developed individually as RNNs. Attention was introduced to Seq2Seq to improve decoder performance, and the transformer unified them.

**Image AutoEncoder**
![](/assets/images/BERT 응용/5dc975bc-a5e6-41ec-9fd3-ee2b599848ac-image.png)
The goal of an AutoEncoder is to reproduce and restore the original image. The network compresses and stores information needed to reproduce the original.

**BERT**
![](/assets/images/BERT 응용/43454042-079c-4bc8-a830-a5f3c57d4dc2-image.png)
Like the AutoEncoder, BERT's goal is to reproduce and restore the original. But to increase difficulty, masking is applied before reproduction. Since the original is natural language itself, the network is forced to learn about natural language.

**BERT, GPT**
![](/assets/images/BERT 응용/4c3f4be7-eef3-4a54-8d5f-35c721c944c1-image.png)
GPT-1 apparently came before BERT.
- GPT-1: Uses only the Transformer decoder for natural language learning
- BERT: Uses only the Transformer encoder for learning masked natural language
- GPT-2: Uses only the Transformer decoder.
  - Removes content after a specific point in the sequence and learns to infer the rest

# BERT
The process of training BERT is as follows. This produces a pre-trained BERT.
![](/assets/images/BERT 응용/78580aee-2eab-4188-8d4a-634fbd5d00cf-image.png)

- Sentences 1 and 2 are fed together, joined by a [SEP] token.
- The [CLS] token contains information about whether sentences 1 and 2 are in a next-sentence relationship.
  - The [CLS] token vector has all input sentence information fused into its embedding.
  - A classifier is attached to the [CLS] token for next-sentence relationship classification training.

# Data Processing
- Word Tokenizing
  - BERT uses WordPiece tokenizing.
  - Frequency-based tokenizing.
- Sentence
  - The second sentence is either the actual next sentence or a randomly chosen sentence.
- Masking
  - Tokens become masking candidates with 15% probability.
  - Among candidates, masking, randomly replacing, and leaving unchanged are chosen at an 8:1:1 ratio.

# BERT Applications
Try benchmarking through GLUE, KLUE, and others.

Representative benchmarks are as follows.
![](/assets/images/BERT 응용/2353a73e-49ae-49b5-8253-65542b5ba94c-image.png)
- Single sentence classification
   - Classification from a single sentence input
- Two sentence relationship classification
  - Classify similarity, relationship, next-sentence relationship between two sentences
- Sentence token classification
  - Attach a classifier to each token for token classification
  - NER (Named entity recognition)
- Machine reading comprehension
  - Given a question and a document containing the answer
  - Identify the answer's location in the document

Examples for each benchmark are as follows.

## Sentiment Analysis
![](/assets/images/BERT 응용/e6d28e3d-e774-423e-ba79-032574bcc259-image.png)

A task that judges whether the input sentence is positive or negative. Before BERT emerged in 2018, such tasks typically showed about 85% accuracy. After BERT, 91% accuracy became the expected baseline.

## Relation Extraction
![](/assets/images/BERT 응용/5fade764-73d5-4e3e-a275-bf090bdf2069-image.png)
Define entities as targets for relation extraction, then extract relationships between entities. For example, if the subject is 'Yi Sun-sin' and the object is 'military officer,' the relationship would be 'occupation.'
Tasks that previously showed poor performance on Korean data were handled well by BERT.

## Semantic Similarity
![](/assets/images/BERT 응용/ff6a2d90-04a4-4614-810d-38218acc8771-image.png)
Judge the semantic similarity between two sentences. A task that finds sentences with similar meanings.

The training data should consist of sentences with high similarity. If training data only contains very dissimilar sentences, the only thing the model could learn is 'differences in vocabulary.' But there are clearly sentences that use similar words yet have different meanings.
So the training data should consist of sentences with high similarity.

**Using only high-similarity training data is a preprocessing and data design concern.**

## Named Entity Recognition
![](/assets/images/BERT 응용/fe16fe87-ba56-44e7-ae2a-9d854c177845-image.png)

Previously, NER was performed with traditional ML like SVM. BERT's performance for NER significantly surpasses SVM.

## Machine Reading Comprehension

![](/assets/images/BERT 응용/66f5f38a-22f0-4523-be66-a0c3ee0f6431-image.png)

Previously, the MRC task was almost exclusively evaluated through KorQuAD, one of the few benchmarks with a leaderboard. As of 2021, KLUE has been released so you can use that.

Word-level tokenizing performed significantly worse than character-level tokenizing. Because in word-level tokenizing, semantically identical words end up as different tokens.
e.g., 'Yi Sun-sin' and 'Yi Sun-sin-eun' (with a particle attached)

# Korean BERT
## ETRI KoBERT
![](/assets/images/BERT 응용/6bf71531-8402-48f7-8190-8b9683609d37-image.png)

KoBERT doesn't apply WordPiece directly — it first performs morphological analysis, then applies WordPiece. The intent was to tokenize at the minimum meaningful unit. Performance was very good; upon release, it immediately held #1 on KorQuAD for over a month. It scored 10+ points better than Google's model.

## SKT KoBERT
https://github.com/SKTBrain/KoBERT
SKT also released a Korean BERT called KoBERT. This one applies WordPiece directly without morphological segmentation.

## Differences
ETRI KoBERT outperforms SKT KoBERT on KorQuAD. So from a performance perspective, ETRI's model is better. But using it requires the extra effort of preprocessing data in a format suitable for ETRI's model.
SKT's model is more convenient for direct use.

## Performance Differences by Tokenizing
![](/assets/images/BERT 응용/0fbfdaec-4a34-4d1a-8805-7f46a124d215-image.png)
ref: https://arxiv.org/abs/2010.02534
A paper co-authored by Kakao and Scatter Lab (the company that made Lee Luda). The paper compared performance across different Korean tokenizing methods.

The paper concluded that the best-performing method was Morpheme-aware Subword, which performs morphological segmentation followed by WordPiece.

## Advanced BERT
_Instructor Kim Sunghyun shared this from personal experience._
In KorQuAD, the feature BERT uses to find answers seems to be entities. But fundamentally, BERT lacks a structure for explicitly representing entities.

Therefore:
1. Extract key entities through entity linking.
2. Attach entity tags from step 1.
3. Add an entity embedding layer.
4. Perform chunking masking prioritizing NNP and entities through morphological analysis.

![](/assets/images/BERT 응용/90e6b330-8aa4-499b-b028-1d32b8d7bcce-image.png)

In other words, beyond the existing Token Embedding, Segment Embedding, and Position Embedding, an Entity Embedding concept was added to the embedding layer.

This improved KorQuAD scores.
![](/assets/images/BERT 응용/78c5c2d9-0915-493c-9574-ac0150e9a4e8-image.png)

This approach was presented in the English-speaking world as ERNIE, which is reportedly the current SOTA model.
[Blog](https://omicro03.medium.com/ernie-paper-%EC%A0%95%EB%A6%AC-7244fe74c31b)
