---
title: "QA with Phrase Retrieval"
description: "Overview of phrase retrieval for open-domain QA, using dense-sparse representations to bypass the retriever-reader pipeline."
lang: en
translationOf: "qa-with-phrase-retrieval"
date: "2021-10-20T06:13:25.221Z"
tags: ["nlp"]
draft: false
---

# Phrase Retrieval in ODQA
## Current limitation of Retriever-Reader ODQA
- Error propagation
  - No matter how good the Reader is, if the Retriever fails to deliver proper context, the entire pipeline's performance drops.
- Query-dependent encoding
  - The encoding of the answer span changes depending on the query.
  - e.g., when using a BERT retriever, the query and context are concatenated as model input, so a different query means:
    - The encoding of the concatenated embedding must be recomputed every time.
    - The encoding result changes each time.

Phrase retrieval was proposed as a method to solve these problems without going through the Retriever-Reader pipeline.

## Solution
![](/assets/images/QA with Phrase Retrieval/26b4fa3b-f53b-4a50-8bef-cdaa8104e567-image.png)
1. Enumerate all phrases in the context.
2. Map each phrase using its embedding vector as a key.
3. The query vector is computed whenever a query comes in.
4. The problem reduces to comparing the query vector against the key vectors.

![](/assets/images/QA with Phrase Retrieval/3271090b-ce19-44d9-9c61-f6886edca812-image.png)
**Comparing the training process**
- Conventional approach
  - Feed phrase, question, and document into a score function to get all score combinations.
  - The Retriever-Reader is expressed as a single function F.
  - F takes a (answer candidates), d, and q as input and produces the predicted answer.
  - The score function must be recomputed whenever the query changes.

- Phrase retrieval
  - Instead of F, the score is computed by combining a Question encoder and a Phrase encoder.
  - H: takes a and d as input, maps them to a vector space, and finds the most similar vector -- via dot product, distance calculation, etc.
  - All results of H are pre-computed.
  - So only Q needs to be computed each time a query arrives.
  - **Problem**
    - The assumption that F can be decomposed into G and H might be wrong.
    - Rather than mathematically decomposing F, we define G and H and try to approximate F as closely as possible.

## Key Challenge
How do we map phrases well into vector space?
-> Try using both dense and sparse embeddings.

# Dense-sparse representation for Phrase
- Dense vectors: good at capturing syntactic and semantic information.
- Sparse vectors: good at capturing lexical information.

## Concat
![](/assets/images/QA with Phrase Retrieval/4231fbd6-2d5c-49a7-beef-7552bfd46a82-image.png)

The approach to combining both methods is: during phrase ODQA, compute a dense and sparse embedding vector for each phrase, then concatenate them.

## Dense representation
![](/assets/images/QA with Phrase Retrieval/b502584b-4123-429e-9023-5060fa60c7ec-image.png)

A phrase vector (dense vector) is generated using the hidden state vectors at the start and end tokens of the answer span.

![](/assets/images/QA with Phrase Retrieval/5ab5bac3-a51b-44e4-b7cb-18967160612a-image.png)

Coherency vector
- Indicates whether a phrase is a valid constituent of a sentence.
- Used to filter out phrases that don't form proper units.
- Computed from the start and end vectors.

![](/assets/images/QA with Phrase Retrieval/0ec457bf-9aa3-4a28-8cd7-ea45f3cbc15f-image.png)
Question embedding
- Generated from the CLS token.
- Same as standard document embedding.

## Sparse representation
![](/assets/images/QA with Phrase Retrieval/cd7e6740-c22d-4418-b7c6-dafac5b4c08a-image.png)
Uses contextualized embeddings to build sparse vectors from the most relevant n-grams.
1. Measure similarity with surrounding words of the target phrase.
2. Insert the similarity scores into the sparse vector corresponding to each word.

- Similar to TF-IDF. The difference is that weights change dynamically per phrase and sentence.
- Unigram and bigram can also be used to capture overlapping information.

## Scalability Challenge
Using Wikipedia data typically means dealing with around 60 billion phrases. Indexing and searching at this scale requires scalability considerations.

- Storage: pointer, filter, scalar quantization, etc. can reduce 240TB down to 1.4TB.
- Search: uses FAISS.
  - FAISS can only search dense vectors, not sparse ones.
  - Since phrase ODQA combines dense and sparse vectors, dense vectors are searched first.
  - Sparse vector scores are then used to rerank the FAISS results.

# Results & Analysis
![](/assets/images/QA with Phrase Retrieval/40ba02a7-4094-4b18-9dcf-dc72997869b9-image.png)
On SQuAD, there was a 3.6% performance improvement over DrQA (Retriever-Reader), and inference speed was 68x faster.
![](/assets/images/QA with Phrase Retrieval/9983f403-a203-418c-aa53-ee8cb279ef75-image.png)
Faster than other Retriever-Reader approaches. It also relies on CPU computation, so there's a side benefit of not needing GPU.

## Limitation
![](/assets/images/QA with Phrase Retrieval/2f5eceb0-656a-4018-a0f1-3d025843dd7f-image.png)

- Requires a lot of RAM.
- Performance is lower than state-of-the-art Retriever-Reader models.
  - Lower performance on Natural Questions.
  - Caused by the decomposability gap (decomposing F into G and H).

## Decomposability gap
![](/assets/images/QA with Phrase Retrieval/fb0883d9-16b0-4877-85a3-e7ffb986a311-image.png)
Approximating F through G and H is inherently error-prone. F represents a very complex Retrieval-Reader, so the approximation via G and H inevitably falls short.
