---
title: "Generation-based MRC"
description: "Generation-based MRC using seq2seq models like BART: comparison with extraction-based approaches, preprocessing, and decoding strategies."
date: "2021-10-13T04:58:10.269Z"
tags: ["nlp"]
lang: en
translationOf: "generation-based-mrc"
draft: false
---

# Generation-based MRC
A task where the model reads a context and a question, then generates an answer.
While extraction-based MRC extracts answer probabilities per token from the context, generation-based MRC is, as the name suggests, a generation task.

In other words, extraction-based MRC can be converted into a generation-based MRC task, but not the other way around.

## Evaluation
You can use EM and F1 score like extraction-based, but BLEU and ROUGE are more common.

## Overview
![](/assets/images/Generation-based MRC/32a731fb-0dc3-4d28-b252-8be2e304e21f-image.png)
Unlike extraction-based, generation-based models produce the answer directly. It's essentially Seq2Seq. Since BERT only has an encoder, it can't be used in a Seq2Seq fashion.

## Differences from Extraction-based
- Extraction-based
  - PLM (Pre-trained Language Model) + Classifier
  - Computes loss to find the answer's position within the context
  - Requires a process to convert the model output into an answer
- Generation-based
  - Seq2Seq PLM
  - Free-form text generation

## Pre-processing
Simpler than extraction since there's no need to pinpoint the answer's location. Just feed the question and answer as-is.

**Tokenization**
- WordPiece Tokenizer

**Special tokens**
![](/assets/images/Generation-based MRC/1e3354fe-1249-43d6-a755-04703431eb46-image.png)

Like standard LMs, CLS, SEP, PAD can be used, but some models use tokens like "question" and "context" to separate sentences (as shown on the right). It varies by model, so check the format your model expects.

**Attention mask**
Handled the same way as in standard LMs, same as extraction-based.

**Token type IDs**
Unlike BERT, BART doesn't distinguish between sequences, so there are no token type IDs.

**Output representation**
![](/assets/images/Generation-based MRC/7d2da16f-64d5-4977-9319-74b830ba8d07-image.png)

Since this is Seq2Seq, no special processing is needed for the decoder's output form.

## Model
![](/assets/images/Generation-based MRC/0cc99423-340d-4156-b459-1f0c551e9353-image.png)
MRC requires Seq2Seq, so we need a model with both encoder and decoder -- not just an encoder (BERT) or just a decoder (GPT).

BART is called a denoising autoencoder. It takes masked sentences as input (like BERT) and generates sentences (like GPT). This resembles an autoencoder for noisy sentences, hence the name.

![](/assets/images/Generation-based MRC/e4de4ada-097a-4cb5-9c7b-bb80ed0d76e0-image.png)

BART
- Encoder: Bi-directional like BERT
- Decoder: Uni-directional (autoregressive) like GPT

### Pre-training BART
![](/assets/images/Generation-based MRC/5e37832b-03d0-4635-8094-8cf90ba60ea3-image.png)

BART masks sentences and reconstructs the originals. This reconstruction capability is then applied to generation tasks.

## Post-processing
Several decoding strategies are available:
- Greedy search
- Exhaustive search: examining all possibilities
- Beam search: exhaustive search but only keeping the top-k
