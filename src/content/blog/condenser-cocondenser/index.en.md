---
title: "Condenser, coCondenser"
description: "Paper review of Condenser and coCondenser for dense retrieval pre-training."
date: "2022-05-16T00:00:00.000Z"
tags: ["nlp", "paper-review", "dense-retrieval"]
draft: false
lang: en
translationOf: "condenser-cocondenser"
---

A summary of the paper review presented during a study group.
https://github.com/luyug/Condenser

# Condenser
## Abstract
PLMs have shown strong performance in text comparison and retrieval. However, training a dense encoder requires a large amount of data and sophisticated techniques.
This paper identifies why the internal structure of standard LMs is insufficient for use as a dense encoder. It also demonstrates that Condenser outperforms standard LMs on text retrieval and similar tasks.

## Issues with Transformer Encoders
In Transformers, all tokens including the CLS token receive information about other tokens in the sequence through a single round of attention. An [analysis paper](https://arxiv.org/abs/1906.04341) on the CLS token describes the following findings:
1. In most middle layers, the CLS token exhibits attention patterns similar to other text tokens and is not attended to by other tokens.
2. In the last layer, CLS acquires a unique broad attention pattern for the NSP task.

Putting these analyses together, we can conclude that the CLS token remains largely inactive across the middle layers and is only activated in the final attention round. The paper argues that an effective bi-encoder should be able to aggregate different levels of information across all layers. From this perspective, the key claim of the paper is that standard PLMs are not well-prepared for fine-tuning.

## Method
### Pre-training
The paper proposes the following model design to address this issue.

![](/assets/Condenser,coCondenser/20220516170729.png)

Rather than pre-training with a single attention mechanism, the paper proposes pre-training through an early encoder, a late encoder, and a condenser head. The early and late encoders can be expressed mathematically as follows:

$$[h^{0}_{cls};h^{0}] = Embed([CLS;x])$$


$$[h^{early}_{cls};h^{early}] = Encoder_{early}([h^{0}_{cls};h^{0}])$$


$$[h^{late}_{cls};h^{late}] = Encoder_{late}([h^{early}_{cls};h^{early}])$$

The hidden states from the early encoder are fed into the condenser head via a skip connection (referred to as a "short circuit" in the paper). The CLS output from the late encoder is also fed into the condenser head, encouraging a late-early representation to flow into it.

The MLM loss is computed as follows:

$$\mathcal{L}_\text{mlm} = \sum_{i \in \text{masked}} \text{CrossEntropy}(W h^{cd}_i, x_i)$$

In this architecture, while the late encoder can refine the token representations, new information can only pass through $h^{late}_{cls}$. Consequently, the late encoder is forced to aggregate newly generated information into the CLS representation, and the heads learn to rely on the late CLS for prediction.

By skip-connecting the hidden states from the early layers, the local information and syntactic structure of the input text in the encoding output are effectively bypassed. The paper claims this allows CLS to focus on the global meaning of the input text.

### Fine-tuning
During fine-tuning of the Condenser, the head is dropped. Fine-tuning trains the $CLS\ h^{late}_{cls}$ and updates the backbone gradients through backpropagation. Since the head serves only as a guide during pre-training, the Condenser can reduce the size of the encoder backbone, making it more efficient.
In practice, the Condenser can serve as a lightweight alternative to BERT.

### Weight Initialization
The Condenser head is initialized randomly, while the early and late encoders use the weights from a pre-trained PLM.

To prevent the backbone weights from interfering with gradient backpropagation through the head, an MLM objective on the late output is used as a contextual constraint and added to the loss:

$$\mathcal{L}_\text{mlm}^c = \sum_{i \in \text{masked}} \text{CrossEntropy}(W h^{late}_i, x_i)$$

$$\mathcal{L} = \mathcal{L}_\text{mlm} + \mathcal{L}_\text{mlm}^c$$

## Results
### Sentence Similarity

![](/assets/images/Condenser,coCondenser/20220516174926.png)

### Retrieval for Open QA
This refers to retrieval performance in the open-domain setting.
![](/assets/images/Condenser,coCondenser/20220516175155.png)

### Retrieval for Web Search
Open-domain metrics specifically for web search.

![](/assets/images/Condenser,coCondenser/20220516175321.png)


# coCondenser
This paper identifies two key problems with existing dense retrieval approaches:
1. Noise in training data
2. The requirement for large batch sizes

The paper uses Condenser as the pre-training architecture. It also proposes coCondenser, which learns a passage embedding space using an unsupervised corpus-level contrastive loss.

coCondenser eliminates the need not only for large batch training but also for heavy data engineering techniques such as augmentation, synthesis, and filtering.
