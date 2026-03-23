---
title: "Word Embedding"
description: "Introduction to word embedding and Word2Vec: how words are mapped to vector spaces to capture semantic relationships."
date: "2021-09-06T11:04:54.688Z"
tags: ["nlp"]
draft: false
lang: en
translationOf: "word-embedding"
---

# Word Embedding
A method for converting words into vectors so that words in a sentence can be represented as points in a vector space.

Word embedding itself is a deep learning / machine learning technique. It trains using training data and a predefined vector space dimensionality. Once trained, it outputs the optimal vector for each word in the training data.

## Core idea of Word Embedding
Words with similar meanings are mapped to similar positions in the vector space, giving them similarity. This provides a better environment for other NLP tasks.

## Word2Vec
The most well-known example of word embedding.

The core assumption: neighboring words in a sentence are likely to have similar meanings. That is, _**the meaning of a word can be determined by its surrounding words.**_

> The cat purrs.
This cat hunts mice.

In these two sentences, words near "cat" include The, purrs, this, hunts, mice. The assumption is that these words have meanings similar to "cat."

### Prediction method
Based on training data, predict the probability distribution of surrounding words (w) for the target word (here, "cat").

![](/assets/images/Word Embedding/86cb5366-3ede-449e-ad8a-7cabfc970947-image.png)
If "cat" is given as input, the surrounding words are hidden and $P(w|cat)$ is trained.

### Training method
1. Tokenize the given sentences into words.
2. Build a vocabulary from unique words.
3. Each word in the vocabulary is represented as a one-hot vector with dimension equal to vocabulary size.
4. Construct input-output pairs using sliding windows.

Say the sliding window size is 3.

> I study math.

Applying the sliding window to "I": look 1 word ahead and behind. Nothing before, "study" after, so the pair is (I, study).

For "study": "I" before, "math" after, giving pairs (study, I) and (study, math).

5. Build a simple neural network and train on the prepared pairs.

![](/assets/images/Word Embedding/a55dc671-1420-4c7f-bd74-a6232bf7aa48-image.png)

Input Layer: nodes equal to input one-hot vector dimension.
Output Layer: nodes equal to output one-hot vector dimension.
Hidden Layer: nodes equal to the word embedding space dimension — a user-defined hyperparameter.

---

![](/assets/images/Word Embedding/f3a03d57-9baa-4a28-aa9d-7c3cf21eea57-image.png)

The neural network above visualized in vector form.

The form is $W_2(W_1x)$, so W1 is (2,3) and W2 is (3,2). Then softmax is applied to make the 3D vector a probability distribution. The network is trained using softmax loss to minimize the distance between this output and the y vector.

### Inner product computation
Standard matrix multiplication works, but since one-hot vectors have only a single 1 component, only one specific index value is taken.

For example, when multiplying W1 by x above, only the 2nd component of x is 1, so only the 2nd column of W1 is taken.

Using this property, one-hot vector multiplications don't perform full matrix multiplication but instead just take a specific index value.

W2 will have as many row vectors as the vocabulary size — here, 3 rows. Row dimension is 2 to allow inner product with W1.

>**Ground truth**
Refers to the actual value. Originally a meteorology term for observations taken on the ground (as opposed to satellite data). In machine learning, it means the actual y value given as training data, not y-hat.

>**logits**
The inverse function of sigmoid. Output range is -infinity to +infinity.
ref: https://velog.io/@gwkoo/logit-sigmoid-softmax%EC%9D%98-%EA%B4%80%EA%B3%84

For $W_2(W_1x)$ to match the ground truth, the logits value at the 3rd index (where ground truth is 1) should be infinite, and the rest should be negative infinity.

#### Something I didn't understand
The instructor also mentioned that the W1-W2 operation is equivalent to measuring vector similarity, but I didn't follow.

### Property of Word2Vec
Word2Vec learns the semantic relationships between words well as relationships between vectors.
![](/assets/images/Word Embedding/1e262f45-bd01-472b-964c-601113b61db0-image.png)

The figure shows vectors of words learned via Word2Vec. Vectors of words with similar relationships have the same directional relationship (vector difference).

### Word2Vec in Korean
https://word2vec.kr/search/?query=%ED%95%9C%EA%B5%AD-%EC%84%9C%EC%9A%B8%2B%EB%8F%84%EC%BF%84

![](/assets/images/Word Embedding/a94e074e-e8f6-428f-906b-529fdb58091c-image.png)

A Korean implementation of Word2Vec. Queries work like this: "Korea - Seoul" captures the country-capital relationship. Adding "Tokyo" applies that relationship to Tokyo and shows the result.

### Intrusion Detection
Given several words, find the one most semantically different from the rest. This can be solved using Word2Vec embedding results.

Compute the Euclidean distance from each word to all others and average them. Repeat for every word. The word with the largest average distance is the outlier.

### Application of Word2Vec
Originally a methodology for finding word meanings, but it's a task that easily produces word embedding results. So it's widely used in other NLP methods that need word-to-vector conversion.
- Word similarity
- Machine translation
  - Makes it easy to align words with the same meaning across different languages.
- PoS tagging
- NER
- Sentiment analysis
  - Makes it easy to represent positive/negative word sentiment.
- Clustering
- Semantic lexicon building
- Image captioning

## GloVe
A word embedding method commonly used alongside Word2Vec.

The key difference from Word2Vec: co-occurrence frequencies of word pairs within a single window are pre-computed across all training data. Call this $P_{ij}$.

![](/assets/images/Word Embedding/42dd8894-fed3-494d-a1eb-feab9605c113-image.png)

GloVe's objective (loss) function is shown above.
- $u_i$ = input word embedding vector
- $v_j$ = output word embedding vector
- $P_{ij}$ = how many times words i and j co-occur within a single window

From a linear algebra perspective, this can also be understood as co-occurrence low-rank matrix factorization, similar to recommendation system algorithms.

### Advantages
Redundant computation is reduced. For instance, if "study" and "math" co-occur frequently, Word2Vec just trains on their relationship many times. GloVe knows about their co-occurrence in advance.

So in the formula above, for "study" and "math," a large value is subtracted from the inner product, allowing faster training.

It also works better with less data.

### Examples
![](/assets/images/Word Embedding/83e4d75b-78c7-483c-87e8-0044e3074d79-image.png)

GloVe results for words with same meaning but different gender, visualized with PCA. The gender difference has a consistent magnitude and direction.

![](/assets/images/Word Embedding/41d2c1e0-3829-49f8-89d0-fc03c6e756c6-image.png)

Comparative and superlative adjective relationships also learn consistent magnitude and direction.

### Pre-trained model
https://nlp.stanford.edu/projects/glove/

Pre-trained models using words collected from Wikipedia, crawling, and Twitter.
![](/assets/images/Word Embedding/7216a42a-d6d0-4828-aecd-83a9aa09bd6f-image.png)
- uncased: treats capitalization variants as the same word
- cased: treats capitalization variants as different words
- dimension: dimension of input/output word vectors
