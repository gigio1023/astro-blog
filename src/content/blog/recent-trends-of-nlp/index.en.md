---
title: "Recent Trends of NLP"
description: "Survey of recent NLP trends covering QA, open-domain chatbots, unsupervised machine translation, text style transfer, and in-context learning."
lang: en
translationOf: "recent-trends-of-nlp"
date: "2021-09-19T13:41:16.480Z"
tags: ["nlp"]
draft: false
---

# Question Answering
![](/assets/images/Recent trends of NLP/51679e9c-0eec-4d8b-8950-8b3963c8574a-image.png)
This is arguably the area that benefited the most from self-supervised learning with models like BERT and GPT.

- A question and context are given.
  - Context can be understood as the surrounding information, though the exact meaning varies slightly by domain.
- Multiple-choice: several answer candidates are provided, and the model picks one.
- Span-based: the answer is extracted from the passage.
  e.g., the answer lies between the 10th and 30th index of the text.
- Yes/No: binary answer to the question.
- Generation-based: the answer itself is treated as a language generation task, as in GPT.

# Open-Domain Question Answering
![](/assets/images/Recent trends of NLP/c84b7650-9a71-40b9-b92f-2c5783e5160c-image.png)

Information is extracted from external knowledge such as knowledge bases and knowledge graphs (structured DBs) to perform QA.
![](/assets/images/Recent trends of NLP/f9583d5f-92a4-4dca-a04a-2904898adbda-image.png)
- Knowledge tuple: pairs of information-bearing nodes like [Hotel], [HasA], [Lobby].
- Knowledge graph: a structure composed of knowledge tuples.

![](/assets/images/Recent trends of NLP/29c071a9-8b60-490e-a3ec-889e113bed6f-image.png)

Open-domain QA retrieves information from external knowledge. Most NLP tasks learn from natural language sequence data. A recent trend is to use structured data like knowledge bases when fine-tuning these models.

Open-domain QA has the Retriever extract from external knowledge -- whether that's a knowledge base or natural language data like Wikipedia -- and then performs MRC.

## Retrieval-augmented Language Model pre-training/fine-tuning
![](/assets/images/Recent trends of NLP/709cc4be-7d1c-4e11-845b-bc95597783b8-image.png)

Instead of finding the answer in the passage, it uses the pre-training model's internal knowledge plus external knowledge to find answers. A form of zero-shot learning.

# Open-domain Chatbot
There's no standardized approach for chatbots yet. They're usually built with Seq2Seq.

- Open-domain chatbot: can converse about unstructured topics.
  - Much harder than closed-domain.
- Closed-domain chatbot: designed for specific topics and purposes. Often uses human-designed models.
  - Limited freedom.
  - Usually classification-based.

![](/assets/images/Recent trends of NLP/939fc6a3-a738-473c-8f47-47d25b28f2fd-image.png)

This is the architecture of Facebook's Blender Bot 2.0. It combines the model's pre-existing knowledge with internet information for queries.

# Unsupervised Neural Machine Translation

Standard translation tasks use labeled data. This field aims to apply translation to unlabeled data.

## Back-translation
![](/assets/images/Recent trends of NLP/b83e7ce2-6962-4c5a-9e6e-dcc68f4016b2-image.png)

The same technique used in CycleGAN, StarGAN, etc.

- Parallel corpus: literally a parallel document set. For example, (English, Korean) pairs.

The idea behind back-translation: translate English to French, then French back to English, and check whether the original sentence is recovered. The model tries to minimize this difference. It resembles an AutoEncoder in that input and output should be similar, but unlike an AutoEncoder, we do care about the intermediate output. The French translation in between should actually be correct.

Of course, the intermediate result could be garbage while the final output still matches the input. To address this contradiction, techniques like denoising autoencoders or checking the decoder output are used.

# Text Style Transfer
![](/assets/images/Recent trends of NLP/db328dbb-5ef1-456b-aeca-c0eb5dbfbd67-image.png)

A task that converts a source sentence into a desired style. For example, reordering words, converting casual text to formal text, etc.
![](/assets/images/Recent trends of NLP/f4d012ae-24ff-4225-a188-5878aef63fe6-image.png)

Implemented by inserting style information between encoder and decoder, or by feeding both x and style information to the transformer. Also called a conditional model or conditional generator.
- (a) Disentanglement: context (z) and style (s) are separated.
- (b) Entanglement: context and style are not separated.

# Quality Estimation

![](/assets/images/Recent trends of NLP/83c8fd4e-0f37-41e8-b3e5-2f978689dd78-image.png)

BLEU score is a metric for NLG (Natural Language Generation). But it's just a human-designed score and not a holistic metric for models. A model with a BLEU score under 50 might still be more than adequate for production. Designing a score that captures how well a model performs a domain-specific task is very hard.

Quality Estimation aims to evaluate using diverse, non-standardized factors about sentences. It's a challenging field because evaluating whether output sentences are good is inherently difficult.

## BERTScore
![](/assets/images/Recent trends of NLP/2c5789c8-dc22-41cf-9565-f3dfa8c552b9-image.png)

Uses BERT encoding to perform evaluation. Compares the ground truth and the sentence being evaluated via similarity.

# In-Context Learning
A field that aims to handle all NLP tasks as natural language generation tasks. GPT is the representative example.

![](/assets/images/Recent trends of NLP/287c17a3-f28f-4ffe-92d5-eeb3d3368bab-image.png)

This is somewhat different from few-shot in CNN. Since all tasks are treated as language generation, even the task description, examples, and prompt are natural language. It's still few-shot in the sense that no translation-related data was used for training.

## Prompt Tuning
The task of figuring out how to write the task description, examples, and prompt (from the diagram above) to best perform the desired task.

![](/assets/images/Recent trends of NLP/ef440bf2-f134-470d-a1e1-19abdedbd69a-image.png)

It optimizes all the text used in the query to get an answer. A separate model is built for prompt tuning, but the original model (GPT) is not fine-tuned at all.

## Language Models Trained on Code
![](/assets/images/Recent trends of NLP/c5dc3fa6-d7d9-4efc-9ddd-9479c8da862f-image.png)
Codex: a language model fine-tuned on publicly available Python code from GitHub.
Applying In-Context Learning and Prompt Tuning to code also produced good coding results.

# Multi-Modal Models
Models that combine multiple types of information.

## DALL-E
![](/assets/images/Recent trends of NLP/627b1a77-8cfc-4903-a048-441fc08f2443-image.png)
Generating images from text descriptions. A conditional generator.
Images are split into n patches, and each patch is treated as an embedding vector. DALL-E collects these n patches and processes them as a single sequence. It's transformer-based.

## CLIP
![](/assets/images/Recent trends of NLP/50752cfc-b048-4272-8033-3db8d860905b-image.png)

A model based on the logic that if text and image are semantically similar, they should be close in embedding space.

Training data consists of images and captions. Captions from different image types are pushed far apart in embedding space, while captions from similar images are pulled closer. Also transformer-based.

**Heavily used as a pre-trained model.**
It's a highly versatile pre-trained model usable in both CV and NLP. It can encode text, images, or anything.

NeRF, a 3D image generation model, is said to be based on transfer learning from CLIP.

# Q&A
- Have traditional RNN-family models (RNN, LSTM, GRU) been entirely replaced by transformers?
  - No. RNN is still used in many domains for future information prediction.
  - Fields that focus on pattern signals are representative RNN users.
  - Transformers don't have that many parameters per se, but they're usually stacked with many layers, and intermediate products (Q, K, V) require a lot of memory. $softmax(QK^T)$ requires memory proportional to $sequence^2$.
  - So RNN-family models are used when lightweight models are needed.
- Word2Vec, GloVe, RNN, LSTM seem to be used less and less. Should I focus on recent tech?
  - Recently, pre-trained models work well even with data that hasn't gone through elaborate embedding. But Word2Vec and GloVe are arguably embedding layers too. Understanding how they work is still helpful.
- Wouldn't it be enough if the model had all the information?
  - Models aren't built that way because of unexpected information that needs handling. Also, it's realistically impossible for one model to know all the information in the world.
