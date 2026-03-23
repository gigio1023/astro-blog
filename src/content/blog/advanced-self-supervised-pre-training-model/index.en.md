---
title: "Advanced Self-supervised Pre-training Models"
description: "Overview of GPT-2, GPT-3, and ALBERT covering zero/few-shot learning, model scaling, and efficient pre-training approaches."
date: "2021-09-18T11:08:52.241Z"
tags: ["nlp"]
lang: en
translationOf: "advanced-self-supervised-pre-training-model"
draft: false
---

# GPT-2
The basic architecture is the same as GPT-1.
- Stacks more Transformer layers.
- Trained on a next-word prediction task.
- Uses more training data
  - Higher quality data in particular
- Demonstrated potential for zero-shot settings
ref: [zero shot learning](https://velog.io/@stapers/%EB%85%BC%EB%AC%B8%EC%8A%A4%ED%84%B0%EB%94%94-Week9-10-Zero-shot-Learning-Through-Cross-Modal-Transfer)
Learning to classify data that was never seen during training.

![](/assets/images/Advanced Self-supervised Pre-training model/fb607f1a-4fe0-47cc-9754-4f58b7450794-image.png)

GPT-2's fundamental task is a language model that, given a passage, sequentially predicts the next words as shown above. When given a passage resembling fiction, it continued with a plausibly human-like imaginative story.

## decaNLP, motivation of GPT-2
Traditional NLP required designing different model architectures and solutions for each task. For instance, to determine sentiment (positive/negative) of a sentence, you'd pass the CLS token through an output layer for binary classification. Or for QA, you'd need to design a completely separate model architecture.

The idea from decaNLP, which came 3-4 years before GPT-2, was that all NLP tasks could be unified as question answering. In other words, treat every task as a natural language generation task.

**e.g., A sentiment classification task structured like this:**
1. Input an arbitrary sentence
2. Add a question like 'What do you think about this document in terms of positive or negative?'
3. Expect the model to make a positive/negative judgment about sentence 1.

The query in step 2 can be freely modified. Something like 'Do you think whether this sentence is positive or negative?' works too.

For summarization, just append 'What is the summarization of the above paragraph?' after the input sentence.

## Dataset of GPT-2
To obtain high-quality text, the following sources were reportedly used as the dataset.
- Reddit
  - If a discussion with 3+ karma (upvotes) contained external links, the documents at those links were assumed to contain quality data
  - Reddit data and documents from referenced external links were used as the dataset
  - 45M links collected
- 8M removed Wikipedia documents
- Dragnet (seems to be a police drama series)
- newspaper

## Preprocess
- BPE (Byte pair encoding)
- Minimal fragmentation of words across multiple vocab tokens

## Modification of models
- Layer normalization
  - Applied at the sub-block level or repositioned from the original normalization location
- Initialization of weight in residual Layer
  - As the residual layer index grows, weight initialization values are made inversely proportional to $\sqrt{n}$.
  - The goal is for the linear transformation outputs of layers closer to the output to approach 0.
  - This reduces the role of later layers.
  - Mentor's take: as you go deeper into the model, it learns higher-dimensional features, so this might be to reduce the influence of such features?

## Question Answering
Used CoQA (Conversational question answering dataset).
- When tested without using this dataset at all
  - F1 score = 55%
- After fine-tuning
  - F1 score = 89%

Showed even greater potential for zero-shot learning compared to GPT-1.

## Summarization

![](/assets/images/Advanced Self-supervised Pre-training model/54b0c314-4525-41b1-9167-74b8e9a876e5-image.png)

This part seems like it needs more explanation from the lecture. There's no way a TL;DR; token exists for all training data..

GPT-2's training data contains many documents where a one-line summary follows a TL;DR; token. So without any separate fine-tuning, like zero-shot learning, you can perform summarization just by appending a TL;DR; token to the end of the desired passage.

## Translation
Like the TL;DR; token for summarization, appending a phrase like 'in French' after the sentence you want to translate makes it perform the translation task.

# GPT-3
By training with far more parameters, transformer layers, and a larger batch size than GPT-2, a better model was produced.

## Few-shot learning
While GPT-2 showed the potential for zero-shot and few-shot learning, GPT-3 demonstrated very strong performance in these areas.

![](/assets/images/Advanced Self-supervised Pre-training model/2668f8f5-e35d-47c3-b548-5d41228b28be-image.png)

The following inference tasks were performed without modifying the model at all.
- Zero-shot: GPT-3 was never trained on translation data, yet it could translate without any fine-tuning.
- One-shot: Show the model just one example pair of training data.
- Few-shot: Show the model several example pairs of training data.

![](/assets/images/Advanced Self-supervised Pre-training model/68579874-7c27-4d3e-8938-85890f933e74-image.png)

As model size (number of parameters) increases, performance on zero-shot, one-shot, and few-shot tasks keeps improving. This suggests that larger models have greater dynamic learning capability.

# ALBERT
A Lite BERT.
Training large models like BERT and GPT with self-supervised learning requires significant memory, parameters, and batch sizes. But these resources are limited. ALBERT is a lightweight alternative that actually outperforms BERT.
- Obstacles
  - Memory Limitation
  - Training speed
- Solutions
  - Factorized Embedding Parameterization
  - Cross-layer Parameter Sharing
  - (For performance) Sentence Order Prediction

## Factorized Embedding Parameterization
![](/assets/images/Advanced Self-supervised Pre-training model/9c19439d-673b-4846-8cc6-a58de9926c6b-image.png)

- Original transformer: Because of residual blocks within the transformer, the embedding dimension and output dimension must be identical, so all layer input/output dimensions are the same.
- ALBERT: Let's reduce the output dimensions per layer.

### Motivation
- Embedding layer: A vector that represents only word-level information as constants, without considering context
- Hidden state vector: A vector containing contextually-informed semantic information

The embedding layer carries less information than the hidden state vector. So let's split the embedding layer to represent it in a smaller dimension.

### Implementation
![](/assets/images/Advanced Self-supervised Pre-training model/0dee7a07-9347-4262-be6c-1ce1985b6109-image.png)
Suppose words are embedded in 4 dimensions. Then as shown in the diagram, the word embedding layer is also 4-dimensional. We want to reduce this embedding layer to 2 dimensions before feeding it into the model.

If we feed the V x E layer in the diagram as input to the transformer, the number of transformer parameters will be fewer than before.

For the residual operation, the dimensions must match the input, but the transformer will output 2 dimensions. So before the residual connection, we add a layer like E x H in the diagram to restore the original dimensions. As a result, the transformer's parameters are reduced while the output remains the same dimension as the input. This approach is called Low rank matrix factorization.

Factorized Embedding Parameterization is known to produce results that approximate using the original word embeddings directly.

## Cross-layer Parameter Sharing
![](/assets/images/Advanced Self-supervised Pre-training model/b90f1049-accb-40d3-9c85-c7cd9e623a3f-image.png)

In transformers, the learnable parameters are $W_n^Q, W_n^K, W_n^V$ per self-attention layer and $W_O$ for reducing the dimension of the concatenated matrix. As you stack more transformers, the number of parameters grows. In ALBERT, these parameters are shared across self-attention layers.

![](/assets/images/Advanced Self-supervised Pre-training model/fc8c39c3-3ef7-4f74-ab2a-3801921c84cf-image.png)

- Shared-FFN: Only sharing feed-forward network parameters
- Shared-Attention: Only sharing attention parameters
- All-shared: Both of them

Even with all-shared, performance isn't significantly worse compared to not-shared.

## Sentence Order Prediction
BERT is trained in two ways.
- Masked language modeling: Replace k% of tokens with mask tokens, then train
- Next sentence prediction: Concatenate two sentences with a sep token, then train

Research has shown that BERT's next sentence prediction is not very effective. Excluding it from training and performing only masked language modeling still yields good model performance.

The reason is that predicting negative samples in next sentence prediction can be done just by checking whether similar words appear.
> e.g., A news article from the society section and one from the sports section use very different words, so sentences sampled from different sections can easily be predicted as not being next sentences.

Sentences in a next sentence relationship would frequently share identical or similar words, making next sentence prediction too easy.

Since next sentence prediction relies on word occurrence rather than higher-level reasoning, models trained this way don't gain much useful information from it.

ALBERT modified next sentence prediction into sentence order prediction. This method requires the model to recognize correctly ordered sentence pairs as correctly ordered. Conversely, when incorrectly ordered sentence pairs (negative samples) are concatenated and fed to the model, it should recognize them as incorrectly ordered.

To ensure minimal word overlap between the two sentences, they are sampled from the same document. This forces the model to learn sentence order prediction by considering context rather than relying on word occurrence.

![](/assets/images/Advanced Self-supervised Pre-training model/0c88484e-052c-4874-a174-560c90c82f97-image.png)

This table shows results for NSP (Next sentence prediction) and SOP (Sentence order prediction). NSP shows minimal improvement and even degrades in some cases. SOP achieved significant performance gains.

![](/assets/images/Advanced Self-supervised Pre-training model/f344c656-a105-476d-b5da-0d6bde95cffe-image.png)
On GLUE, a benchmark for evaluating NLP tasks, ALBERT also outperforms existing models.

# ELECTRA
Efficiently Learning an Encoder that Classifies Token Replacements Accurately. A paper presented by the Google Research team at ICLR 2020.

![](/assets/images/Advanced Self-supervised Pre-training model/634ddd5e-ec24-487b-ba83-2027e083684c-image.png)
The two models are trained in an adversarial learning fashion.
Related links: [Adversarial learning](https://green-late7.tistory.com/100), [Adversarial learning detailed explanation](https://medium.com/@jongdae.lim/%EA%B8%B0%EA%B3%84-%ED%95%99%EC%8A%B5-machine-learning-%EB%A8%B8%EC%8B%A0-%EB%9F%AC%EB%8B%9D-%EC%9D%80-%EC%A6%90%EA%B2%81%EB%8B%A4-part-8-d9507cf20352)

- Generator: Masked language model
  - Operates on the same principle as BERT
  - Restores masked sentences
- Discriminator: Infers whether the word at the mask token position is the original word or a replaced word.
  - Performs binary classification based on Transformer.
  - Inspired by GAN (Generative adversarial network).
  - Learns by comparing the ground truth of the training data with the Discriminator's output.

**The Discriminator, not the Generator, is used as the pre-trained model.**

## Performance
![](/assets/images/Advanced Self-supervised Pre-training model/1770209f-2f5e-4ad0-9fd8-4192bf586d95-image.png)

It achieved higher GLUE scores than existing models at the same compute level. Along with ALBERT, it is widely used in many downstream tasks.

[What is a Downstream Task](https://velog.io/@nawnoes/Downstream-Task%EB%9E%80)

# Light-weight models
BERT, GPT, and ELECTRA have very many parameters because they achieved performance gains by stacking many self-attention blocks. Lightweight models that reduce these parameters to shrink model size and speed up training are being actively researched.

They are used for running models quickly and with low power consumption on mobile devices rather than cloud or high-performance computing resources.

## DistillBERT
A paper presented by HuggingFace at NeurIPS 2019.

It consists of teacher and student models.
- Teacher: Maintains the large architecture, learns features, and trains the student model.
- Student: Despite having fewer layers and parameters than the teacher, it tries to mimic the teacher's features.

### How It Works
**Teacher: Same as BERT's Seq2Seq.**
1. Given 'I go home' as input, the teacher in Seq2Seq tries to predict 'go' for 'I'.
2. For the input 'I', a vector of vocabulary size is generated and softmax is applied.
3. The highest probability value in step 2's result should correspond to the index for 'go'.

**Student: Trains using the teacher's output (target distribution) as ground truth.** It simply tries to mimic the teacher's output.

## TinyBERT
The teacher-student architecture is the same as DistillBERT. TinyBERT doesn't just mimic the teacher's output distribution — it also mimics intermediate products like query, key, value, and hidden states.

Since the student is a lightweight model, its layer dimensions are smaller than the teacher's. This becomes a problem during mimicry, which was solved by adding fully connected layers that reduce the teacher's dimensions.

# Fusing Knowledge Graph into Language Model
BERT excels at understanding context and computing word similarity, but sometimes fails to effectively handle information beyond the given dataset.

**e.g., Suppose the dataset contains only the sentence 'I dug the ground' for the act of digging.**
If a Question Answering task asks 'What tool was used?' about this sentence, existing models might struggle to answer. There's simply no information available.
Humans could use 'common sense' as external knowledge to infer tools used in various situations and answer accordingly.

This is the field that aims to incorporate such external information into models.

**Knowledge graph: Systematically organized information**

Representative models
- ERNIE
  - Information fusion layer takes the concatenation of the token embedding and
entity embedding
- KagNET
  - For each pair of question and answer candidate, it retrieves a sub-graph from
an external knowledge graph to capture relevant knowledge
