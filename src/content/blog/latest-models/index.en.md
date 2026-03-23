---
title: "Recent NLP Models"
description: "Survey of post-BERT NLP models including XLNet, RoBERTa, BART, T5, Meena, and controllable language models like PPLM."
date: "2021-10-13T01:49:14.563Z"
tags: ["nlp"]
lang: en
translationOf: "latest-models"
draft: false
---

# XLNet
Problems with existing models:
- BERT
  - Predicts [MASK] tokens independently, so it can't learn relationships between tokens
  - Embedding length limits prevent learning relationships between segments
- GPT
  - Only trains in one direction

XLNet emerged to overcome these limitations.

## Relative Positional Encoding
Introduced to break free from the 512-token training limit. Makes the existing positional encoding ([Ref](https://skyjwoo.tistory.com/entry/positional-encoding%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)) relative.

![](/assets/images/최신 모델/894a3f8c-280e-46dc-afc3-da6e55068235-image.png)

- Existing positional encoding uses absolute positions: 0, 1, 2, 3...
- Relative positional encoding uses relative distances: 0th, 1st, 2nd...

-> No more sequence length limitation.

## Permutation Language Modeling
Got rid of [MASK]. Instead, uses permutations to shuffle the order of data during training, encouraging order-agnostic learning.
![](/assets/images/최신 모델/69701f1d-1b5b-44b8-b848-359d80d9d070-image.png)

## Performance
![](/assets/images/최신 모델/2102ee3c-4d28-42ad-9caa-0970e790bbc8-image.png)

Outperformed previous models on GLUE.

# RoBERTa
Same architecture as BERT, but with changes in the training method.
- Increased model training time + batch size + training data
- Removed next sentence prediction
  - Unrelated to fine-tuning
  - The paper argued it's too easy, actually hurting model performance
- Added longer sentences
- Dynamic masking
  - Applied 10 different masking patterns per data sample during training

# BART
Apply both BERT and GPT training methods together.
![](/assets/images/최신 모델/4d3287c1-654e-4bcf-b813-43feaf37d360-image.png)
![](/assets/images/최신 모델/13d2157f-66c7-4fdd-b91c-8050d5c77219-image.png)
Reportedly outperformed BERT and RoBERTa.

# T5
![](/assets/images/최신 모델/1bcdfcf3-5185-48d0-9f11-17f6b956c6eb-image.png)

Unified Transformer Encoder-Decoder LM -- the best LM at the time.
Masks multiple spans and reconstructs them all at once.

![](/assets/images/최신 모델/5a0180ab-e3d7-436a-9f54-e948514bc204-image.png)

![](/assets/images/최신 모델/f577a4da-6d1e-48c7-9f2e-7162ecacb72e-image.png)

Best performing model on GLUE.

# Meena
An LM designed specifically for conversation.
![](/assets/images/최신 모델/8e407b53-6ec5-47f8-9be0-67e0cb7217a8-image.png)

Composed of 1 Transformer encoder and multiple Transformer decoders.

- Trained on 341GB of social media data, 2.6 billion parameters.
- Proposed SSA (Sensibleness and Specificity Average) as a chatbot evaluation metric
  - Higher SSA for specific and clear responses.
  - Designed to close the loophole where vague answers could still produce a functioning chatbot.

![](/assets/images/최신 모델/f87c8902-9836-48c8-8618-50092c9c29e8-image.png)

# Controllable LM
LMs where human value judgments like ethics can be controlled.

## PPLM (Plug and Play Language Model)
![](/assets/images/최신 모델/f4265dd7-4e65-40f2-a6b4-184cf5438438-image.png)
- Standard LM
  - Predicts next word based on probability distribution
- PPLM
  - Adjusts next-word prediction to match the developer's intent
  - Stores upcoming words in a bag of words

Suppose you want the sentence "The chicken tastes delicious."
But the model outputs "ok" as the last word. PPLM uses backpropagation to modify the vector for "chicken" so that "delicious" comes out as the final word.

**Advantage: no gradient updates -- just modifying output vectors to guide the desired output.**

### Applications
- Storing multiple category words in the bag of words can produce cross-category results.
  - e.g., joy + surprise + gaming
- Generating emotions about specific categories in other languages
  - e.g., replacing religious, political, or racial keywords with neutral words
- Adjusting probability distributions to create gradient anger (an internet meme)
  - e.g., gradually increasing the probability of anger-related words

### Necessity
An LM trained only on bias-removed data doesn't necessarily produce bias-free output. Methods like PPLM help overcome current LM limitations.

# Multi-modal LM
## LXMERT
Cross-modal reasoning language model.
Learning Cross-Modality Encoder Representations from Transformers.
![](/assets/images/최신 모델/ae49ffc2-4884-464b-9445-5267fa4e41c3-image.png)

Image and language information are embedded separately and both fed to a cross-modality encoder that generates combined image and language information.

![](/assets/images/최신 모델/6f9ccfa5-8cf6-445d-b85c-4097188eb254-image.png)

As shown above, it could answer natural language questions with both image and text responses.

## BERT for Vision-and-Language
Same architecture as BERT. The only difference is that images and text are combined using [SEP] during training. As before, a classifier is attached to the CLS token for classification of combined image and text information.

![](/assets/images/최신 모델/9b72842e-e625-45de-a456-823fe475a816-image.png)

## DALL-E
The third time encountering this model at Boostcamp.
![](/assets/images/최신 모델/66f3549d-2b77-4907-b5fb-63bf3048cddb-image.png)
To generate images, image tokens must be learned. Even a (256, 256, 3) image is very large, so VQ-VAE is used for dimensionality reduction as shown above. This is a highly simplified diagram of VQ-VAE.

Once images can be converted to latent vectors, the rest is the same as GPT.
![](/assets/images/최신 모델/2278744b-5c9f-4e93-ba02-f5702923c539-image.png)
Just as GPT predicts the next sentence, DALL-E predicts image embeddings that follow 256 text embedding tokens, training autoregressively.
