---
title: "Passage Retrieval - Scaling Up"
description: "Scaling passage retrieval with approximate similarity search techniques: scalar quantization, inverted file indexing, and FAISS."
date: "2021-10-17T08:32:29.667Z"
tags: ["nlp"]
lang: en
translationOf: "passage-retrieval-scaling-up"
draft: false
---

# Passage Retrieval and Similarity Search
![](/assets/images/Passage Retrieval - Scaling up/4ceaaed8-f971-40c9-8a48-4e21634d2255-image.png)

Once passages and queries are encoded and projected into vector space, one of the following is performed:
- Nearest neighborhood search
- Search for the highest dot product via inner dot production

When performing similarity search like this, finding the most similar passage for a query gets harder as the number of passages increases. With tens of millions of passages, even brute-forcing inner products for every case becomes very costly.
## Nearest Neighbor Search
You can find the closest passage vector to the query vector using Euclidean distance or L2. But for computational efficiency, inner dot product is typically used instead.

## MIPS
Maximum Inner Product Search

$$v_i\in V,  argmax(q^Tv_i)$$

A simple approach: compute inner products for all $i$ passages. The problem is finding an efficient way to do this when there are very many passages.

In practice, if we take Wikipedia as a baseline, there are about 5 million documents, and depending on the task, this could scale to billions or even trillions. That's at the document level -- if passages are considered at the paragraph level, the search space grows even more.

**In other words, brute-forcing through all document embeddings is infeasible.**

## Threshold of Similarity Search
- Search Speed
  - How long does it take to find the k most similar passage vectors per query?
- Memory Usage
  - Where are all vectors in the vector space stored?
  - It'd be convenient if everything were in RAM, but that's practically impossible.
  - If everything were on HDD, it'd be very slow.
- Accuracy
  - If not brute-force, accuracy must be sacrificed to some extent -- how much?

![](/assets/images/Passage Retrieval - Scaling up/e24de2b9-1476-40d2-bf57-99346a3fa57e-image.png)

Search time and recall are generally proportional. More accurate search takes longer.

These threshold issues become more concrete as corpus size grows:
- Search space increases, making search harder.
- More memory space is required.
- Sparse embedding makes these problems even worse.
  - Somewhat alleviated by compression.

![](/assets/images/Passage Retrieval - Scaling up/8afc7957-1279-4f37-b2e9-acdb4d49dd08-image.png)

With dimension = 768, assuming about 1 billion documents (roughly Wikipedia-scale), the required memory space is 3TB. Over 1 trillion, it's 3PB.

Even if the corpus used in most competitions and practice code is in the millions, 3GB is already very large... Compression is essential for efficient memory usage.


# Approximating Similarity Search

## Compression - SQ
Scalar Quantization.
Vectors are typically represented using 4-byte (int) size. But not all 4 bytes are actually used. So compress the vector by reducing the bytes used -- that's SQ.

e.g., 4-byte floating point -> 1-byte unsigned integer

## Pruning - IVF
**Pruning**. In passage retrieval, this means forming clusters through clustering.
If clustering is done well, MIPS can be performed very efficiently. The brute-force problem over all data is reduced to visiting only m clusters (fewer than k total clusters) that are nearby.

IVF (Inverted File). Looking it up, it refers to an inverted index. https://cloudingdata.tistory.com/45

IVF in retrieval means that the centroid ID of a cluster holds all vector IDs belonging to that cluster. So if you find the closest cluster centroid ID to the query, you can quickly compare against all vectors in that cluster.

![](/assets/images/Passage Retrieval - Scaling up/7e15239c-3b4f-48c4-91bb-a9a7418a0770-image.png)

# FAISS
A library built by Facebook for similarity search and clustering. Open source. Optimized for large scale, built in C++ but wrapped in Python -- very fast and easy to use.

## How to Use
### Train Index and Map Vectors
- Clustering
  - Training on passage data is needed for clustering passages.
- Scalar quantization
  - When converting 4-byte floating point to 1-byte integer, the max and min of the data are identified for conversion.
- Usually trained on training data, but for efficiency, a sample of training data is used as FAISS training data. If the original training data is large, sampling down to about 1/40 is common.
![](/assets/images/Passage Retrieval - Scaling up/69716955-8db4-4ff1-88c9-58614bcff882-image.png)

Once clusters and SQ range are defined through training, training data is inserted into clusters according to SQ rules.

### Search Based on FAISS Index
1. When a query comes in, reformat it according to the cluster and SQ rules defined during training.
2. Find the nearest cluster.
3. Determine the cluster nearest top-k.
![](/assets/images/Passage Retrieval - Scaling up/044202c1-7e0a-475e-9a6e-e7055d69e627-image.png)

## Product Quantization
[ref blog](https://datacrew.tech/product-quantizaton/)
In practice, PQ is often used instead of SQ. Said to compress better than SQ.