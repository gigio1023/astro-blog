---
title: "NLP Trends"
description: "Survey of NLP trends including reinforcement learning for summarization and QA, and multimodal NLP+CV approaches like Show and Tell and GLAC Net."
date: "2021-10-29T09:55:54.188Z"
tags: ["nlp"]
lang: en
translationOf: "nlp-trends"
draft: false
---

# NLP + RL
## A Deep Reinforced Model for Abstractive Summarization

NLP with RL, where improving the ROUGE score is set as the reward.

## DCN+
Mixed objective and deep residual coattention for question answering.

Existing QA models sometimes extract wrong answers, and RL is used to address this.

Both RL loss and the NLP model's loss (cross-entropy) are used together.

1) Mixed objective function: cross entropy loss + self-critical policy learning --> reduces the gap between the evaluation method and the loss function
2) Residual co-attention encoder: deep self-attention + residual network

## Dialogue Generation
https://github.com/lvwerra/trl
- RL training with empathy as the reward.
- Three models are used: a generative model (GPT-2), an empathy evaluation model (BERT, RoBERTa), and an RL model for empathy.

# NLP + CV
## Description Generation
- Descriptions of Images in Isolation (DII)
  - Describing images individually
- Descriptions of Images in Sequence (DIS)
  - Describing multiple images
- Stories of Images in Sequence (SIS)
  - Generating a story from multiple images

### Show and Tell
https://arxiv.org/pdf/1411.4555.pdf

A model that generates image embeddings via CNN and generates sentences via RNN. This paper sparked active attempts to solve image-to-text with deep learning.

### GLAC Net
https://arxiv.org/pdf/1805.10973.pdf

A Seoul National University paper that generates a single story from multiple images.
- Two attention mechanisms are combined into one attention group (called GLocal attention here).
  - Local attention: embeddings for individual images
  - Global attention: embeddings for multiple images