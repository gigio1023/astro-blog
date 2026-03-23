---
title: "GPT Language Models"
description: "Evolution of GPT language models from GPT-1 to GPT-3: architecture changes, zero/few-shot learning, and scaling effects."
date: "2021-10-12T05:01:34.907Z"
tags: ["nlp"]
lang: en
translationOf: "gpt-language-model"
draft: false
---

- BERT: an embedding model
  - Uses Transformer encoder
- GPT: a generative model
  - Uses Transformer decoder

# GPT Overview
![](/assets/images/GPT 언어 모델/2460ab0e-0bd1-426d-a664-61210c94f9f3-image.png)

The language generation process is the same as what you'd typically learn about language models. It sequentially predicts the most likely next words probabilistically.

![](/assets/images/GPT 언어 모델/e9d75507-faa0-4245-adaa-10d7239d739f-image.png)

GPT-1 was designed so you could attach a classifier at the end (like BERT) and fine-tune it for specific tasks. Chronologically, GPT-1 came before BERT.

GPT-1:
- A decoder very useful for natural language sentence classification.
- Achieved high classification performance even with small amounts of data.
- Achieved SOTA on various NLP tasks right away.
- Paved the way for pre-trained language models and laid the groundwork for BERT.
- Required supervised learning, so lots of labeled data was needed.
- A model fine-tuned for a specific task couldn't be used for other tasks.

The GPT researchers' new hypothesis:
> Due to the nature of language, the objective function of supervised learning is the same as that of unsupervised learning. In other words, fine-tuning is unnecessary.

This is because the labels in labeled data are also language.

Put differently: a language model trained on a sufficiently large dataset can perform all NLP tasks.

# Zero-shot, One-shot, Few-shot
![](/assets/images/GPT 언어 모델/d8863c8a-706a-45a6-bc3c-fb552188cb23-image.png)

Fine-tuning to create a model for just one task was deemed unnecessary.
Just as humans don't need lots of data to learn a new task, the same approach was applied to language models -- inference using zero, one, or few-shot.

That is, performing tasks without any gradient updates. To make this work, a model trained on massive datasets was developed -- GPT-2.

# GPT-2
![](/assets/images/GPT 언어 모델/b59b94a8-92a9-412f-bed9-7ac1a0cf90b0-image.png)
Minor decoder architecture changes compared to GPT-1.

Training data grew from 11GB to 40GB.

![](/assets/images/GPT 언어 모델/9fb5cd35-efa5-4193-8b92-46c112fdae40-image.png)

- On NLP tasks like MRC, summarization, and translation, performance was on par with typical neural network models.
- SOTA on next-word prediction.
- Opened new horizons for zero, one, and few-shot learning.

# GPT-3
![](/assets/images/GPT 언어 모델/8fbc30df-8739-4bdd-b7f3-f6b92e8bdcb1-image.png)

- Training data: 570GB refined from 45TB.
- Parameters increased from 1,500M to 175,000M.

![](/assets/images/GPT 언어 모델/a207ac5b-5f92-480d-8a6a-6a6b4c5025cb-image.png)

- Modified initialization.
- Used Sparse Transformer.

## Tasks of GPT-3
- Writing articles
  - 52% of GPT-3's articles were judged by evaluators to seem human-written.
- Arithmetic
  - Addition of 2-3 digit numbers performed almost perfectly.
- QA performance exceeded some existing models.
- Data parsing
  - Automatically parsed data from documents into tables.

## Restrictions
GPT is also a model pre-trained via NSP (Next Sentence Prediction).
- No weight updates.
  - Cannot learn new knowledge.
- Is just scaling model size the answer?
  - Nobody knows, but probably not.
- Cannot use multi-modal information.
