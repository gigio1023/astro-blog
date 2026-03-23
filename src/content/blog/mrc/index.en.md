---
title: "MRC"
description: "Introduction to Machine Reading Comprehension covering dataset types, key challenges like coreference resolution and multi-hop reasoning, and evaluation metrics."
date: "2021-10-12T01:31:41.828Z"
tags: ["nlp"]
lang: en
translationOf: "mrc"
draft: false
---

# MRC
Machine Reading Comprehension.
The task of understanding a given context and inferring answers to queries/questions.

The ultimate goal is to answer QA pairs that don't exist in the training MRC dataset by using external data.


## Extractive Answer Datasets
The answer to a question always exists as a segment (or span) within the given context.

### Cloze Tests
e.g., CNN/Daily Mail, CBT
![](/assets/images/MRC/695e12f4-531e-4065-8862-e9b5686405e4-image.png)
While it follows a Question-Answering format, the questions aren't in the complete form we want for MRC.

### Span Extraction
e.g., SQuAD, KorQuAD, NewsQA, Natural Questions
![](/assets/images/MRC/faeb59eb-be0f-4f4f-a8ec-88ca8ddc1710-image.png)

## Descriptive Narrative Answer Datasets
Instead of extracting an answer as a span within the context, the answer is determined as a generated sentence (or free-form) based on the question.

e.g., MS MARCO, Narrative QA
![](/assets/images/MRC/7362e732-73ef-4df1-b60b-0710b6d5c3b9-image.png)

## Multiple-choice Datasets
A task where the answer to a question is selected from answer candidates. Said to be not ideal for building MRC QA models.
e.g., MCTest (reportedly the first public MRC dataset, released in 2013), RACE, ARC

# Challenges in MRC
## Paraphrased paragraph
![](/assets/images/MRC/09a179cc-8a14-4813-bcd5-7e9c12647b20-image.png)
P1 and P2 are sentences with the same meaning. They are paraphrased sentences.

P1 contains key words from the question like 'selected' and 'mission', and the sentence structure is straightforward. So if the model can find P1 in the context, it should be easy to answer the question.

But P2 doesn't contain the words from the question at all, and the sentence structure is more difficult.

An MRC model needs to be able to find answers in both P1 and P2.

## Coreference resolution
![](/assets/images/MRC/5734c92e-d1ff-4a38-a816-d59aac0083b8-image.png)
Coreference refers to entities that mutually refer to the same thing. Coreference resolution is recognizing these entities as the same entity.
ref: [Blog](https://jjdeeplearning.tistory.com/26)


## Unanswerable questions
There are clearly cases where the answer cannot be determined from the context alone. But an immature model might force an answer anyway.

So for unanswerable questions, the model should respond that it cannot provide an answer.

## Multi-hop reasoning
A task where supporting facts from multiple documents must be found to answer the question.

e.g., HotpotQA, QAngaroo
![](/assets/images/MRC/fb6e8b56-1c99-4f3d-b901-b3d0f08b3010-image.png)


# Evaluation methods
## Exact Match, F1 score
Evaluation methods used when the answer exists within the passage (extractive answer) and for multiple-choice datasets.

- Exact Match (EM) or Accuracy
  - The ratio of predictions that **exactly** match the ground truth
  - (Number of correct samples) / (Number of whole samples)
- F1 score
  - Compute the F1 score based on token overlap between predicted answer and ground truth

## ROUGE-L, BLEU
Evaluation methods for descriptive answers.
- ROUGE-L Score
  - Overlap recall between prediction and ground truth
- BLEU
  - Precision between predicted answer and ground truth
