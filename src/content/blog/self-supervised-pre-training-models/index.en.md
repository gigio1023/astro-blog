---
title: "Self-supervised Pre-training Models"
description: "Overview of self-supervised pre-training models including GPT-1 and BERT, covering masked language modeling and transfer learning."
lang: en
translationOf: "self-supervised-pre-training-models"
date: "2021-09-18T10:51:48.531Z"
tags: ["nlp"]
draft: false
---

# Recent trends
- Transformer and self-attention are being used beyond machine translation.
- Experiments have shown that simply stacking more transformers -- 12, 24, or more instead of the 6 proposed in the original paper -- improves performance, without any special architectural changes. Self-supervised learning frameworks are used to train on large-scale data for these models.
  e.g., BERT, GPT-3, XLNet, ALBERT, RoBERTa, Reformer, T5, ELECTRA
- After training this way, just applying transfer learning to various domains and tasks outperforms models specifically designed for those areas.
- Applications: recommender systems, drug discovery, computer vision...
- Limitation: still stuck on greedy decoding. Decoding left-to-right, making the best choice at each step.

# GPT-1
Unified multiple NLP tasks.

![](/assets/images/Self-supervised Pre-training models/9dcd16aa-dec1-41de-a3cc-bab14982e8c3-image.png)
Stacked 12 transformers.

## Standard Seq2Seq
The standard sequence training process is the same as the basic transformer covered in previous posts. To output 'I go home', the input starts with '[SOS]' to produce 'I', then 'I' is input to produce 'go', and so on.

## Classification
![](/assets/images/Self-supervised Pre-training models/abfa3113-89f0-483c-98e4-060457015953-image.png)
Implemented by adding start and extract tokens at the beginning and end of the text while performing Seq2Seq.

1. After transformer training, encoding vectors are formed with the same format as input.
2. The value at the extract token position in the encoding vector is used for classification.
   e.g., sentence sentiment (positive/negative)
3. Seq2Seq can continue using the remaining encoding vector values excluding the extract token.

## Entailment
![](/assets/images/Self-supervised Pre-training models/6cb1708f-394e-4e05-84bb-799250c9db2d-image.png)
A task that determines whether a premise and hypothesis have a logical entailment or contradiction relationship.
In GPT-1, the premise and hypothesis are combined into a single sequence to solve the task. The extract token acts as a query within the transformer, pulling relevant information from other positions in the sequence.

1. A delimiter called Delim is placed between the two sentences, and an Extract token is placed at the end.
2. The extract token from the encoding vector is passed through the output layer to determine the logical relationship.

## Transfer learning
A GPT-1 model trained for a specific task can be reused for other tasks.
For example, suppose you want to repurpose a sentiment analysis model for topic classification.

![](/assets/images/Self-supervised Pre-training models/abfa3113-89f0-483c-98e4-060457015953-image.png)

The existing output layer is a linear neural network for sentiment classification. So you remove it and attach a new linear neural network for topic classification after the transformer.

This is the same idea as changing just the final classification layer's number of outputs in a CNN to perform an arbitrary classification task. The pre-trained network is kept intact, and only the output layer is initialized and trained.

### Self-supervised learning
GPT uses unlabeled data to train the pre-trained model on a Seq2Seq task. Since it's a next-word prediction task, labeling isn't needed. This is where self-supervised learning comes in.

But topic classification requires labeled data. Labeled data is usually far smaller than unlabeled data, which is disadvantageous for model training.

Since the model was pre-trained with self-supervised learning on large data, most parameters are meaningfully initialized. So just using a small amount of labeled data for transfer learning can produce a well-performing model.

![](/assets/images/Self-supervised Pre-training models/2ee91262-d36c-41c8-942e-b0a4ad5eac20-image.png)

The table above compares task-specific model+data combinations with GPT. Pre-training on large data followed by transfer learning shows better performance.

# BERT
![](/assets/images/Self-supervised Pre-training models/449f50bc-7b49-45a2-bb43-29df3b933f7b-image.png)

Bidirectional Transformers for Language Understanding. Previous attempts used LSTM for self-supervised learning on large data, but BERT performed significantly better.

## Motivation
RNN-family models acquire information in only one direction. This is a very weak approach for tasks that require understanding the full context. BERT's Masked Language Model was created to acquire information bidirectionally.

## Masked Language Model (MLM)
Words in the input sequence are randomly replaced with masks. The model is trained to infer the masked words.

Hyperparameter $k$: the probability level for masking words.
- $k$ too high: too much information is hidden, making masked data hard to infer.
- $k$ too low: training takes too long or efficiency drops.

Typically $k=15$ is used.

**Side effect**
Even if we intend to mask 15% of words, replacing all of that 15% with mask tokens causes issues.

The pre-trained model gets used to 15% of data being mask tokens, but real test data likely won't have that. This discrepancy significantly hinders transfer learning.

**Solution**
The $k\%$ of data is classified as follows:
- 80% is replaced with mask tokens.
- 10% is replaced with random words. This helps the model handle strange input words.
- 10% keeps the original. This helps the model confidently assert that the original is correct.

## Next Sentence Prediction
A method proposed by BERT for handling sentence-level tasks, similar to GPT's approach.

![](/assets/images/Self-supervised Pre-training models/ff485e36-afd9-4b14-af63-693cb810cbef-image.png)

Similar to GPT's extract and delimiter tokens, BERT uses CLS and SEP tokens.
- SEP: separates sentences.
- CLS: holds classification information. Placed at the beginning.
- MASK: the mask used in the masked language model.

The task shown in the figure determines whether two sentences are adjacent. The CLS token holds binary data. All information in the figure is fed to the transformer at once, and the network outputs the prediction result at the CLS token.

## BERT architecture
### Model Architecture
  - L: Layer
  - H: Attention encoding vector dimension
  - A: Attention heads per layer
  - BERT Base: L=12, A=12, H=768
  - BERT Large: L=24, A=16, H=1024

### Input Representation
- WordPiece embedding: Subword-level embedding rather than word-level (30,000 WordPiece)
- Learned positional embedding
![](/assets/images/Self-supervised Pre-training models/7ce8492c-8515-449c-92c3-a0b0daf049c8-image.png)
The original Transformer used sin/cos with predetermined offsets for positional embedding. BERT learns this matrix end-to-end, like learning embedding vectors in Word2Vec.
- Segment Embedding

#### Segment Embedding
![](/assets/images/Self-supervised Pre-training models/8949e7c7-6900-43fa-a3b9-ccdc797248a8-image.png)
Positional embedding provides ordering, but it doesn't recognize sentence boundaries.

In Next Sentence Prediction, 'he' after a SEP token should be treated as the first word of a new sentence, but sequence-wise it isn't first -- hence the problem. Segment embedding solves this.

The distinction between sentences before and after SEP is computed via segment embedding and simply added.

## Bidirectional
![](/assets/images/Self-supervised Pre-training models/4bb1e6ca-012b-47e1-9b14-f19482403798-image.png)

GPT uses masked self-attention to prevent looking at future information -- because you can't see the next word when predicting it.

BERT sees the entire sequence since it's masked. It needs to see the full context to predict masks. So BERT uses standard self-attention from the original transformer.

## Transfer learning
![](/assets/images/Self-supervised Pre-training models/be38af2c-5672-47d8-b674-405d529f9c80-image.png)

Given a pre-trained BERT from self-supervised learning, the following tasks are possible. Similar to GPT.

### Sentence pair classification

![](/assets/images/Self-supervised Pre-training models/854f091e-26f9-4c20-beff-7e9a0bd29a5a-image.png)

1. Two sentences are joined with a SEP token.
2. A CLS token is placed at the first index and passed through BERT.
3. The CLS token from the encoding vector is fed to the output layer to get a class label.

### Single sentence classification
![](/assets/images/Self-supervised Pre-training models/d2895a2e-c83c-4d98-9c73-913e2d4b8245-image.png)
Same as sentence pair classification, just with one sentence and only a CLS token.

### Single Sentence Tagging
![](/assets/images/Self-supervised Pre-training models/cf90374c-0ed6-4100-82ed-fceedc0711d6-image.png)

Each word has an encoding vector, and each one is passed through the output layer to determine POS, morpheme, and other information.

# BERT vs GPT-1
- Training size
  - GPT: BookCorpus (800M words)
  - BERT: BookCorpus + Wikipedia (2,500M words)
- BERT: has SEP and CLS tokens. Uses segment embedding to distinguish sentences.
- Batch size
  - BERT: 128,000 words
  - GPT: 32,000 words
  - Larger batch size generally means more stable and better training.
  Using gradients computed in a single pass is better than averaging gradients from multiple training iterations.
- Task-specific fine-tuning
  - GPT: used 5e-5 learning rate across tasks.
  - BERT: fine-tuned learning rate per task.

# MRC (Machine Reading Comprehension), Question Answering
Reading a text and answering questions about it.
![](/assets/images/Self-supervised Pre-training models/d9e0adf8-0f25-407f-be4e-f9f278d99288-image.png)
As shown above, proper comprehension of subjects and actions in the document is required to answer.

## SQuAD 1.1
Stanford Question Answering Dataset for testing QA model performance with MRC. Version 2.0 also exists now. There's a leaderboard for test set scores.

## SQuAD 1.1 solution process
![](/assets/images/Self-supervised Pre-training models/5d8ffe38-4dd6-472d-a1af-f22eff6f26b0-image.png)
Typically the answer sits at a specific location in the passage; the goal is to find that location.
1. Concatenate the question and the passage using a SEP token.
2. Obtain the encoding vector for the concatenated data.
3. Add a fully connected layer to reduce the encoding vector to a scalar for finding the start point, then apply softmax.
4. Add another fully connected layer for finding the end point, then apply softmax.
5. Two fully connected layers on a single encoding vector yield the start and end points of the answer.

## SQuAD 2.0 solution process
In 1.1 there's always an answer, but 2.0 includes cases where no answer exists in the passage.

So a task to determine whether an answer exists must come first. If an answer exists, proceed with the SQuAD 1.1 process.

1. Concatenate question and passage, add a CLS token.
2. Add a fully connected layer for binary classification using the CLS token's value.
3. Classify using cross entropy.

# SWAG
A task that picks the most likely next sentence given a preceding sentence.
![](/assets/images/Self-supervised Pre-training models/3b64218d-f588-4185-9144-e47eadeace3e-image.png)

1. Concatenate the premise with each answer choice separately.
   e.g., Premise + Choice 1, Premise + Choice 2, ...
2. Get encoding vectors for each concatenation.
3. Pass each encoding vector through the output layer to get a scalar. The same output layer is used for all.
4. Apply softmax to the scalar results and pick the choice with the highest probability.

# BERT: Ablation study
![](/assets/images/Self-supervised Pre-training models/b2eb659a-3768-4e91-9fc0-5d06324adad9-image.png)
BERT's performance improved with more parameters.
