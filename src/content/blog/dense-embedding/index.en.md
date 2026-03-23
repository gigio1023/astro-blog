---
title: "Dense Embedding"
description: "Dense embedding for passage retrieval: training bi-encoders with contrastive learning and negative sampling strategies."
date: "2021-10-14T06:43:17.095Z"
tags: ["nlp"]
draft: false
lang: en
translationOf: "dense-embedding"
---

# Problems with Sparse Embedding
![](/assets/images/Dense Embedding/759edf0c-3b21-4ea7-9af2-bcd7a210a0c1-image.png)
- In Passage Embedding, Sparse Embedding usually has over 90% of vector values as 0.
- The number of dimensions is very large.
  - Can be overcome with compressed format.
- Cannot consider similarity.
  - Even very similar words are embedded into completely different dimensions if the characters differ. There is also no way to represent that similar words have similar dimensions.

# Dense Embedding
![](/assets/images/Dense Embedding/5861876f-3fec-4150-95a5-c6a95d4a6f4d-image.png)
- Vocab and dimensions are mapped at high density.
  - Usually 50 to 1000 dimensions.
- The position of a term comes from combining information across all dimensions.
  - Unlike BoW, a single dimension does not represent a single term.
- Most elements are non-zero -- they carry meaning.
- Dimension is much smaller than BoW, so more types of algorithms can be applied.

## Differences from Sparse Embedding
- Sparse Embedding
  - Excellent performance when looking for exact term matches
  - Cannot be further trained once embedding is built
- Dense Embedding
  - Excellent at capturing word similarity and context
  - Embedding is created through training, further training possible

Usually sparse embedding alone is rarely used. It is either dense embedding alone or both combined for retrieval.

## Overview of Passage Retrieval with Dense Embedding
![](/assets/images/Dense Embedding/17abd514-45b0-4b13-b4ea-0b615b6ca892-image.png)
Extract the hidden state (CLS value) for the query. Do the same for each passage. Assuming both hidden states have matching dimensions, compute similarity via inner product.

- $$BERT_Q, BERT_B$$ can use the same model or separately pre-trained models. Configure as appropriate for the task.


# Training Dense Encoder
The example is BERT, but anything works. It just needs to be a PLM (Pre-trained language model).

- MRC model: feeds query and answer together into a single PLM.
- Dense Encoder: prepares separate PLMs for query and passage and feeds each respectively.
  - To use the final output of different CLS tokens!

![](/assets/images/Dense Embedding/c782ea0b-bb5b-42d4-b13e-7e415995db20-image.png)

As mentioned, the Question encoder and Passage encoder can be the same or separately fine-tuned before use.

## Training goal
Narrow the distance between question and passage dense embeddings.
= increase the inner product value
= find higher similarity.

![](/assets/images/Dense Embedding/4d4ceaa4-5cde-4bc2-8f9d-1c70efbb0866-image.png)

**How to train?**
- Use context and answer from existing MRC datasets.
  - e.g., SQuAD
- For related question-passage pairs, narrow the dense embedding distance.
  - high similarity, positive
  - Use the actual context and answer from the MRC dataset as-is.
- For unrelated question-passage pairs, increase the dense embedding distance.
  - Use arbitrary context for the answer from the MRC Dataset.
![](/assets/images/Dense Embedding/55ba80a5-198f-4d7f-b657-f61f52967ba4-image.png)

**Choosing negative samples**
- Random extraction from the corpus
- Extraction designed to confuse the model
  - Samples with high TF-IDF scores but not containing the answer

### Objective function
Uses negative log likelihood (NLL) loss on the positive passage.
![](/assets/images/Dense Embedding/f74f181e-4973-4308-a835-8fe97fc4a198-image.png)

Goal: convert the positive passage score into a probability.
- Similarity score between positive passage and question
- Score for negative samples
Take both scores, apply softmax, then take negative log likelihood for training.

The formula above expresses negative log likelihood. It is negative log, so -log is attached, and softmax is placed inside the log. The softmax numerator contains the positive element, and the denominator includes negative elements as well -- because softmax is defined as (target / total).

## Evaluation Metric
- Check if the ground truth passage is included among retrieved passages
- Check the ratio of retrieved passages that contain the answer
  - For extractive-based MRC, if the passage does not contain the answer, no answer can be produced.
  - Hence an upper bound form.

## Passage Retrieval with Dense Encoder
![](/assets/images/Dense Embedding/f00885ca-6af8-438c-99fa-ff2d676e3ddd-image.png)

As shown in the overview. Compare pre-computed passage embeddings with the query embedding by distance and pick the closest passage.

![](/assets/images/Dense Embedding/9f7f3336-9f17-4167-85bd-a0e5405a05c0-image.png)

Feed the selected passage and query into the MRC model to get the answer.

## Improving Dense Encoder
- Improve training methods
  - e.g., DPR
- Improve encoder model
  - Better models than BERT
- Improve data
  - More data
  - Better preprocessing
