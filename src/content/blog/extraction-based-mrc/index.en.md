---
title: "Extraction-Based MRC"
description: "Extraction-based machine reading comprehension: span prediction with BERT, preprocessing, fine-tuning, and post-processing."
date: "2021-10-13T04:09:10.578Z"
tags: ["naver-boostcamp"]
draft: false
lang: en
translationOf: "extraction-based-mrc"
---

# Extraction-Based MRC
The answer always exists as a span within the given context.
Instead of generating the answer, the problem is narrowed to finding the answer in the context.
e.g., SQuAD, KorQuAD, NewsQA, Natural Questions
![](/assets/images/Extraction-Based MRC/722a0e0b-0d30-4a1b-9385-39bff9ad45ab-image.png)

Downloading these datasets from HuggingFace Datasets is the easiest.

## Metric
### Exact Match (EM) Score
Gives 1 point only if the predicted value and answer match exactly at the character level. 0 points if even one character differs.

### F1 score
Calculated as a ratio of overlap between prediction and answer, so the score range is [0, 1].
![](/assets/images/Extraction-Based MRC/312d9333-731d-4210-91e8-c34a0cdc3522-image.png)


## Overview
![](/assets/images/Extraction-Based MRC/e320aa87-c2e7-4e26-bb65-a541bdbce9f5-image.png)

## Pre-processing
**Tokenization**
- Recently, Byte Pair Encoding (BPE) is widely used.
  - Solves Out-of-vocabulary (OOV) problems
  - Information-theoretic benefits (?)
- Will use WordPiece Tokenizer among BPE variants
  - Segments by frequently occurring tokens

**Attention mask**
- Occurs in Positional Embedding
- Usually 0 means ignore, 1 means include in computation

**Token type IDs**
- Question gets 0, Context gets 1 as masks, directing the model to find the answer only in the range where 1 appears
- Therefore PAD tokens also get 0

**Answer position**
After tokenization, the answer's index changes. Preprocessing for this is needed.
Usually only the start and end indices are needed, so just find the span containing the answer.

## Fine-tuning
![](/assets/images/Extraction-Based MRC/88682340-7783-48f2-bdf1-12f6ef10e851-image.png)

Modify BERT's output layer so that every token in the Context outputs two values:
- Probability that this token is the answer's start token
- Probability that this token is the answer's end token

Once all probability values are computed, cross-entropy loss can be calculated against the ground truth. The rest proceeds as usual: apply softmax and compute negative log likelihood for training. [ref](https://airsbigdata.tistory.com/202)

## Post-processing
**Remove impossible answers**
- End position is before start position
- Predicted position is outside the context range
- Longer than max_answer_length


**Finding the optimal answer**
1. Find the top N each from start/end position predictions by score (logits).
2. Remove impossible start/end combinations.
3. Sort viable combinations by sum of scores in descending order.
4. Select the combination with the highest score as the final prediction.
5. If top-k is needed, output them in order.
