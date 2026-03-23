---
title: "Passage Retrieval"
description: "Fundamentals of passage retrieval for open-domain QA, covering sparse embedding, TF-IDF, and similarity search in vector space."
date: "2021-10-13T15:00:36.624Z"
tags: ["nlp"]
lang: en
translationOf: "passage-retrieval"
draft: false
---

# Passage Retrieval
Retrieving documents (passages) that match a query.
![](/assets/images/Passage Retrieval/b5526456-14fc-409d-83c4-ac2894f973f8-image.png)

Database
- Could use a DBMS in practice.
- Here, we use Wiki data.

## Passage Retrieval with MRC
Open-domain Question Answering: finding answers to questions from a large set of documents.

![](/assets/images/Passage Retrieval/540e7cbd-b9dd-49e6-8a8f-617385ab55b6-image.png)

Combining passage retrieval with MRC gives you open-domain question answering.
- Passage Retrieval
  - Provides contexts likely containing the answer to the MRC model.
- MRC
  - Derives the answer from the given context.

## Overview
![](/assets/images/Passage Retrieval/fba64164-0725-4dd1-a80a-ffccca06482a-image.png)
Passage retrieval searches based on embedding space.

- Embed query and passages into embedding space.
  - Passages are pre-embedded in batch for efficiency.
- Compute similarity scores between query and passage embeddings.
  - Vector distance calculation; shorter distance = more similar.
  - Inner product calculation; higher value = more similar.
- Output passages ranked by similarity to the query.


## Passage Embedding
Like word embedding, passages are embedded to vectorize them.
![](/assets/images/Passage Retrieval/dcad009f-066d-4cbb-9305-6b451cdbec23-image.png)
Similarity is computed via inner product or distance calculation between vectors in the embedding space, just like any typical embedding space.

## Sparse Embedding
Sparse: the opposite of dense. Very few non-zero numbers present.

A representative example is BoW (Bag of Words).
Words each constitute a dimension, so when embedding a document, there need to be as many dimensions as the vocabulary size. Most values will inevitably be 0, with very few non-zero entries.

In BoW, increasing n in n-gram causes the number of possible combinations to grow exponentially. So typically only bigrams (2-grams) are used, occasionally trigrams.

**Term Value**
- Binary: just whether a term appears in the document or not.
- Term frequency: how many times a term appears.
  - e.g., TF-IDF


**Characteristics of Sparse Embedding**
- Dimension of embedding vector = number of terms
  - Grows as n in n-gram increases.
- Useful when you need to precisely detect term overlap.
  - e.g., determining if a term is contained in a document during search.
- Cannot compare words that are semantically similar but different.
  - Not at all!

# TF-IDF
Term Frequency - Inverse Document Frequency

- TF (Term Frequency): how often a word appears.
  - Compute raw count / num words and normalize.
  - Log normalization is also used.
- IDF (Inverse Document Frequency): the amount of information a word provides.
- Frequently appearing words: judged to provide less information.
- Rarely appearing words: judged to provide more information.

**IDF**
![](/assets/images/Passage Retrieval/2fe016b3-3cc6-4ebd-8e60-a8f2ad0ff9c6-image.png)
$$DF(t)$$: the number of documents in which term t appears.
- Unlike TF, it depends only on the term.
- The fewer documents term t appears in, the higher IDF(t) becomes.

**TF-IDF**
$$TF-IDF = TF(t,d) \times IDF(t)$$
- Articles would have low TF-IDF.
  - TF might be high, but IDF converges to 0.
- Rare proper nouns would have high TF-IDF.
  - Even if TF is low, IDF is much higher.

## Computing TF-IDF
You can compute it for each term individually, or multiply tables together.
![](/assets/images/Passage Retrieval/5e75ae76-a297-45e7-b3b1-5066bd213300-image.png)

Rows represent individual documents. Columns represent the vocabulary. In this example, each document contains only one vocab element, so all values are 0 or 1. The table values are directly the TF values.

![](/assets/images/Passage Retrieval/8fd60152-c21d-46c5-9325-919129b69437-image.png)

IDF values computed for each term. Since IDF depends only on the term, values are the same regardless of document.

TF-IDF is just TF times IDF, so element-wise multiplication of the two tables gives you the full TF-IDF.

![](/assets/images/Passage Retrieval/777f7b23-43cf-48e7-9c53-9707fac353e3-image.png)

## Using TF-IDF
Can be used to get similarity between query and passages in passage retrieval.

1. Tokenize the query.
2. Exclude tokens not in the vocabulary.
3. Treat the query as a document and compute TF-IDF.
4. Compute similarity scores with pre-computed passage TF-IDFs.
5. Select the passage with the highest score.

![](/assets/images/Passage Retrieval/02dbcb40-5880-4361-bbb1-5b35dd7c33f8-image.png)

# BM25
Based on TF-IDF. Also considers document length.
- Caps the TF value.
- Gives more weight to shorter-than-average documents when a term matches.
- An algorithm still widely used in search engines, recommendation systems, etc.
![](/assets/images/Passage Retrieval/9d7e3b01-2b05-4954-9c90-b38278c77f1d-image.png)