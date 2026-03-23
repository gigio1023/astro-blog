---
title: "Bag-of-Words"
description: "Introduction to Bag-of-Words text representation with one-hot encoding and Naive Bayes classification."
date: "2021-09-06T07:04:30.522Z"
tags: ["nlp"]
lang: en
translationOf: "bag-of-words"
draft: false
---

# Bag-of-Words
A pre-deep-learning technique for representing words as numbers.

## Bag-of-Words Representation
### 1. Constructing the vocabulary containing unique words.
Even if a word appears across multiple sentences, it appears only once in the vocabulary.

### 2. Encoding unique words to one-hot vectors.
Words in the vocabulary can be viewed as categorical data, so we represent them as one-hot vectors.
![](/assets/images/Bag-of-Words/0911f986-9d47-4272-a180-667181a756de-image.png)
For example, if the vocabulary has 8 words, we construct 8-dimensional one-hot vectors.
For any pair of words, the Euclidean distance is $\surd2$.
For any pair of words, the cosine similarity is 0. Because all dot product combinations are 0.

In other words, all words are represented with identical relationships regardless of their meaning.

## Bag-of-Words Vector
Once words are represented as one-hot vectors, sentences can be represented as one-hot vectors too.
![](/assets/images/Bag-of-Words/a5d5e957-3c06-436d-b28c-422c8c07d31f-image.png)
Representing a sentence as the sum of all its words' one-hot vectors — that's the Bag-of-Words vector.

# Naive Bayes Classifier
A method for classifying a Bag-of-Words vector (representing a sentence or document) into a specific category.

d: document
c: class
![](/assets/images/Bag-of-Words/5a1987f6-0614-47e6-ae2a-4e651b8be5ab-image.png)

- P of c, given d.
  - MAP: Maximum a posteriori = Most likely class. Select the class c with the highest probability in $P(c|d)$.
- Can be converted to the second formula by Bayes rule.
  - $P(d)$ is the probability of a specific document being drawn, treated as a constant. Ignoring it yields the third formula.


---
![](/assets/images/Bag-of-Words/05b9f810-99a1-4b0c-ae25-03e056a69623-image.png)

- $P(d|c)$: Probability of document d given fixed category c.
- d can be viewed as the event where words w1, ..., wn appear simultaneously.
- So the formula can be transformed as shown on the left.

That is, if we can estimate $P(c)$ and $P(w_i|c)$, we can estimate all parameters needed for the Naive Bayes classifier.

## Application
1. Compute $P(c)$ and $P(w_i|c)$ for all possible cases.
2. For new input, use step 1's data to compute $P(c)$ and $P(w_i|c)$ per category.
3. Compute argmax.

## Limitation
If input contains words not present in the training data, $P(w_i|c)$ becomes 0 for those words. So even if other words are strongly related to a specific class, all class probabilities can become 0.

=> Solved through regularization.

## Actual Computation
$P(c)$ and $P(w_i|c)$ can be computed by simply counting, but in practice methods like MLE are used.
