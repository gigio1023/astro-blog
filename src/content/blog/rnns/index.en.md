---
title: "RNNs"
description: "Deep dive into RNN types (one-to-one, one-to-many, many-to-many), character-level language models, and LSTM/GRU architectures."
lang: en
translationOf: "rnns"
date: "2021-09-07T04:06:29.529Z"
tags: ["nlp"]
draft: false
---

# RNN
![](/assets/images/RNNs/f1c02cc3-88bb-433c-b336-b3230a6be044-image.png)

Given sequence data as input/output, a network that takes input $x_t$ at time t and the previous hidden state $h_{t-1}$, and outputs $h_t$.

The important thing is that a new model doesn't appear at every time stamp. A single parameter set A is used across all time stamps.

The compressed representation on the left is called a rolled diagram; the one showing time stamps is the unrolled diagram.

![](/assets/images/RNNs/7ac18831-58d8-4aff-8296-10ca8a6ad5a3-image.png)

The diagram looks like the above.

- $h_t$: new hidden state vector
- $f_w$: RNN function with parameters W.
  - W: linear transform matrix
- $y_t$: output vector at time step t.
  - Computed using $h_t$.
  - Can be computed at every step, or only at the end -- it's flexible.
  - e.g., POS tagging requires computation at every step, while sentiment analysis only needs the final step.

---
![](/assets/images/RNNs/ab88d030-736a-4ff8-a949-726b24ce4575-image.png)

$f_w$ is defined as a non-linear function as shown above. $W_{hh}$ and $W_{xh}$ are split from W in the formula, which can be understood as derived from a single W matrix as in the figure below.

![](/assets/images/RNNs/fbd27c87-8a6f-4b86-b2b0-84dcf56735be-image.png)

Since $h_t$'s dimension is a hyperparameter, let's set it to 2.

To take $x_t$ and $h_{t-1}$ as input and produce $h_t$ as output, W must have shape (2, 5). That's because the dot product of the concatenation of $x_t$ and $h_{t-1}$ with W yields (2,1). Instead of keeping W as (2, 5), we can split it at the boundary between the red and green circles in the figure. That is, $x_t$ and $h_{t-1}$ each get their own W, and adding their dot product results yields $h_t$.

So $W_{hh}$ transforms $h_{t-1}$ into $h_t$, and $W_{xh}$ transforms $x_t$ into $h_t$.

By the same logic, $W_{hy}$ transforms $h_t$ into $y_t$.

For binary classification, $y_t$ would be a 1-dimensional vector (scalar). Apply sigmoid to use the result as predicted probability. For multi-class, $y_t$'s dimension equals the number of classes, and softmax is applied to get a probability distribution.

## Type of RNN
RNN can handle cases where one or both of input/output are sequence data.
![](/assets/images/RNNs/5d5f1fa5-1da8-4a58-a081-da47d6c08237-image.png)
ref: http://karpathy.github.io/2015/05/21/rnn-effectiveness/

- one to one (standard neural network)
  - Neither input nor output is sequence data, with a single time step.
  - Same structure as a standard DNN.
- one to many
  - Input is not sequence data, but sequence data is output across multiple time steps.
  - Only the first step has real input; remaining steps receive all-zero tensors.
  - e.g., Image captioning
- many to one
  - Input occurs at each time step, with a single output at the end.
  - e.g., Sentiment classification
- many to many
  - Sequence data is input per time step, then output per time step.
    - e.g., Machine translation
  - Input and output at every time step.
    - e.g., Video classification on frame level

# Character-level language model
A language model predicts the next word based on the given sequence of characters or words.
Can be performed at both word and character level.

Building a character-level language model proceeds as follows:

> Example of training sequence: "hello"

1. Build a unique vocabulary at the character level.
[h, e, l, o]
2. Characters in the vocabulary are represented as one-hot vectors, as in word embedding.
h = [1,0,0,0]
3. Feed "hell" into the RNN sequentially according to the formula:
![](/assets/images/RNNs/9e7523f4-ac4b-426f-8c13-b698c0395df6-image.png)

The key point is that the next character must be predicted at every time step. So the RNN is set up as many-to-many:
![](/assets/images/RNNs/0b4fb2b7-78b0-40b8-99b6-cd91fdf04cd1-image.png)

Output is computed as:

![](/assets/images/RNNs/d8dfdbb3-e15a-4be7-838f-b1726374c0c4-image.png)

It's called logit because softmax is used for multi-class classification.

## Inference

![](/assets/images/RNNs/2b482894-2652-4c16-a227-7498200b79d6-image.png)

Since it's an RNN, each time step's output can be fed back as the next time step's input. So you only give 'h' as the first input and let the rest be generated automatically.

# Training Shakespeare's plays
![](/assets/images/RNNs/87087f1d-e4e0-46d8-9bbf-e3a7dcb8027a-image.png)
The method used at the character level can also be applied to text. Build a vocabulary at the word level, including all punctuation -- commas, '\n', spaces, everything. This way you can build a simple language model with RNN.

![](/assets/images/RNNs/c85437f6-18b7-49ce-bc3e-87a65aed9c40-image.png)

As training progresses, the sentences generated from a given first character become more natural.

# Other examples
- Learning plays to distinguish characters and dialogue.
- Training on LaTeX papers to generate new papers during inference.
- Training on C code to generate code.

# BPTT (Backpropagation through time)
![](/assets/images/RNNs/cb149f49-78af-4aa4-aabc-1f85d98d1dde-image.png)
It would be ideal to use all losses for training, but sequences are usually too long for that. So all data is used for training, but loss is only taken from certain segments for backpropagation.

# How RNN works
We can trace how RNN learns. The hidden state contains all information from before time t. So tracking how the hidden state changes from its initial state reveals how the RNN learns.

The results below are from LSTM and GRU (not vanilla RNN) showing hidden state changes.

Red means a specific cell in the hidden state is becoming more negative; blue means more positive.
![](/assets/images/RNNs/f7afb1a3-0e5e-41f9-8e90-f36f49e49c21-image.png)
Tracking the cell responsible for quote detection in the hidden state produced the above result.
![](/assets/images/RNNs/f32e3afc-5d82-45b7-8186-480ac42e793e-image.png)
The hidden state of the cell handling if statements changed like the above.

# Vanishing/Exploding gradient in RNN
![](/assets/images/RNNs/bd0cb95e-ec84-4b7f-8b65-5f6c1c4efede-image.png)

RNN itself is solid, but problems arise in backpropagation. RNN formulas involve repeatedly multiplying $W_h$ and passing through activation functions. This repeated multiplication causes gradients to grow unboundedly if greater than 1, or shrink toward zero if less than 1.

![](/assets/images/RNNs/266292dc-8f0c-4fe6-8bda-505a4d5be1ce-image.png)

For a simple example, think of W as a scalar. To get the gradient of h3, we differentiate. Computing the gradient with respect to h1 requires applying the chain rule 3 times, and $w_{hh}$ (value 3) gets multiplied 3 times as part of the gradient. For a longer sequence, the gradient would be proportional to an even larger power of 3. If $w_{hh}$ were less than 1, the values would shrink dramatically.

The result is that the value generated at h3 should propagate well back to h1, but instead gradients converge to infinity or zero.
