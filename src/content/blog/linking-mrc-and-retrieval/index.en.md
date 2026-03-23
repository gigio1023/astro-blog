---
title: "Linking MRC and Retrieval"
description: "Deep dive into Open Domain Question Answering, covering the Retriever-Reader approach, distant supervision, and passage granularity strategies."
date: "2021-10-17T08:45:26.446Z"
tags: ["nlp"]
lang: en
translationOf: "linking-mrc-and-retrieval"
draft: false
---

# Open Domain Question Answering (ODQA)

Unlike the MRC discussed earlier, ODQA requires passage retrieval from broad domains like the entire web or all of Wikipedia. The input/output format stays the same.

![](/assets/images/Linking MRC and Retrieval/93ec9529-7aa0-414d-b8d4-ae4678b4a60a-image.png)

![](/assets/images/Linking MRC and Retrieval/f2a1963a-29fb-44b8-a928-f56b8d24f681-image.png)

- No context is provided separately.
- QA based on world knowledge
  - Modern search engines fall into this category.
  - They provide not just relevant documents but also relevant answers.

## History of ODQA
![](/assets/images/Linking MRC and Retrieval/156edb4a-ae2f-4273-b2c5-995b74906aa4-image.png)

QA Tracks (1997-2007) at the Text Retrieval Conference (TREC) studied ODQA-style tasks.

The structure of Question Processing, Passage Retrieval, and Answer Processing is very similar to today's architecture. The goal wasn't simple Information Retrieval (IR) but short answers with support -- where "support" means the document containing the answer. The task wanted both the answer and the supporting document.

### Question Processing
Since DL/ML models weren't advanced yet, the approach was to select keywords from questions and perform answer type selection on those keywords.

### Passage Retrieval
Very similar to current ODQA.
1. Use existing IR to extract relevant documents
2. Split documents into passages and select relevant ones
3. Use hand-crafted features like named entities and word count overlap with the question for selection. e.g., TF-IDF, BM25

### Answer Processing
A classifier using hand-crafted features and heuristics determined which document to use for a given question.

Current MRC derives answers at the span level within passages, so there are differences from this older approach in answer processing.

## Recent ODQA Research
![](/assets/images/Linking MRC and Retrieval/3d2fb8a1-7627-4bb8-98c0-e524311b29c4-image.png)

# Retriever-Reader Approach
ODQA can be solved using the Retriever and Reader (MRC model) from earlier MRC work.
- Retriever: searches for relevant documents from a DB
  - Input: document corpus, query
  - Output: document
  - Training
    - TF-IDF, BM25: self-supervised learning without labeled data
    - Dense: trained using QA datasets
- Reader: extracts answers from retrieved documents
  - Input: retrieved document, query
  - Output: answer
  - Training
    - Trained on MRC datasets like SQuAD
    - Additional training data possible via distant supervision

## Distant Supervision
Datasets that only have question and answer pairs don't tell you which document contains the answer.
e.g., CuratedTREC, WebQuestions, WikiMovies

But the Reader needs a document in addition to the question and answer for training. So when a supporting document is needed, you have to find where the answer is located yourself. This process is called distant supervision.

1. Use the Retriever to search for highly relevant documents
2. Filter:
   - Remove documents that are too short or too long
   - Remove documents that don't contain the question's named entities
   - Remove documents where the answer doesn't appear as an exact match
3. From the remaining documents, select the most relevant paragraph based on word usage as supporting evidence

## Inference
- Retriever
  - Returns the 5 most relevant documents for the question
- Reader
  - Reads 5 documents and predicts answers
  - The reader's predicted answer with the highest score is used as the final answer

# Issues, Recent Approaches
## Different Granularities of Text at Indexing Time
When using Wikipedia data, the indexing granularity must be defined in advance. Common choices are article, paragraph, and sentence.

![](/assets/images/Linking MRC and Retrieval/2b5da2bb-92f3-45de-bf99-3d5952eaf7ef-image.png)

The Retriever's top-k varies depending on granularity. The table above shows typical k values. Scores also vary slightly by granularity.

**Increasing k usually improves performance, but not always.** Tuning k is also important in MRC competitions.

## Single Passage Training & Multi-passage Training

**Single-passage training**
The approach discussed so far. The Retriever returns k documents, and the Reader computes answers and scores for each, selecting the best. Multiple documents are examined, but from the Reader's perspective each passage is processed individually -- hence "single passage training." It doesn't consider correlations between the documents the Retriever provides.

**Multi-passage training**
Treats all retrieved passages as a single passage. Unlike single-passage, it trains the Reader considering relationships across all passages.
Training documents get very long, so GPU cost increases.

## Importance of Each Passage
![](/assets/images/Linking MRC and Retrieval/97556851-9de6-42e9-97b2-a8c4ec1fa922-image.png)
An approach that retains the Retriever's passage scores and uses them when computing the final score.
