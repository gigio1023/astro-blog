---
title: "Confusing Points in NLP"
description: "Clarifying commonly confused NLP concepts: argmax vs. multinomial sampling, beam search vs. sampling, and Pre-LN vs. Post-LN in GPT and Transformer."
date: "2021-09-20T05:49:40.684Z"
tags: ["nlp"]
lang: en
translationOf: "nlp-confusing-points"
draft: false
---

# argmax, multinomial
The reason NLP models don't use argmax on their output is obvious. argmax forces the model to converge on a single answer, just like in classification.

For example, say the model output after softmax for input $X_n$ is [0.2, 0.5, 0.3]. Taking argmax would treat index 1 as the answer and ignore the rest. This process reinforces the model to only output index 1 for $X_n$.

So binding argmax to the output layer makes it well-suited for classification.

**My thoughts on why multinomial is used**
I understand that using a multinomial distribution at the output layer of an NLP model is meant to avoid reinforcing output in a single direction, unlike argmax.

Say the model output after softmax for input $X_n$ is [0.2, 0.5, 0.3]. In multinomial sampling, the probability of picking each index is the corresponding value. So instead of reinforcing the model toward one specific output, it leaves room for diverse results to be accepted.

My mentor mentioned that besides multinomial, various other methods are used to sample results from the model's output layer. You just need to pick a method that leaves room for multiple output possibilities, like multinomial does. Pointer networks are one example.

# Are Beam Search and Sampling Different?
This confused me at first. They're fundamentally different approaches.

Previous post on beam search: https://velog.io/@naem1023/Beam-search
Beam search generates joint probabilities over hypotheses for decoding. It's a decoding method.

Sampling is the act of drawing samples from a population. Data extraction can use random, multinomial, uniform distributions, etc.--whatever probabilistic method suits the purpose. The better it reflects the population's properties, the better.

So beam search is not about extracting samples from a population. And sampling is not about computing joint probabilities to produce optimal decoding results.

# Why GPT Scales Inversely with $\sqrt{n}$
Same idea as in the transformer, where scaling by the dimension restores the original variance. The difference is that GPT uses Pre-LN (Layer Normalization before the sublayer), while the original transformer uses Post-LN, where scaling happens after each residual block.

In Pre-LN GPT, LN is applied first, then the residual connection.

## Pre-LN, Post-LN
There are also experimental proofs and papers on Pre-LN vs. Post-LN.

[On Layer Normalization in the Transformer Architecture](https://arxiv.org/pdf/2002.04745.pdf)

Summarizing my mentor's explanation:
>
The main point of the paper:
Switching from Post-LN Transformer to Pre-LN Transformer allows removing the warm-up stage. The paper presents various experimental results. For Post-LN, the presence or absence of warm-up had a huge impact on results.

The natural follow-up question of "why not just use warm-up?" was raised, and the issue is that it affects final performance and takes longer to optimize. (See "On the Variance of the Adaptive Learning Rate and Beyond"--the RAdam paper, which argues that using this optimizer eliminates the need for warm-up.)

The result was that with Pre-LN, gradient norm stays stable regardless of layer depth.
Post-LN showed that gradients near the output are too large and shrink as you go toward earlier layers. The rigorous math is in the paper, but checking this paper might also help:

Paper comparing post-norm and pre-norm: [Learning Deep Transformer Models for Machine Translation](https://arxiv.org/abs/1908.03265)

---
My mentor mentioned that higher-dimensional features appear toward the later layers of the model, and that scaling helps reduce their influence, but I'm not sure what the basis for that is. I've asked for clarification.