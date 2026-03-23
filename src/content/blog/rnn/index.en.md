---
title: "RNN"
description: "Fundamentals of RNN including sequence data handling, latent autoregressive models, BPTT, and truncated backpropagation."
lang: en
translationOf: "rnn"
date: "2021-08-06T07:23:27.018Z"
tags: ["ml", "nlp", "algorithm"]
draft: false
---

# RNN
## Sequence data
- Data that must proceed in order: audio, strings, stock prices, etc.
- Easily violates the iid (independent and identically distributed) assumption.
  - For example, "the dog bit the person" and "the person bit the dog" have entirely different data distributions, frequencies, and meanings.
- Changing the order or losing past information alters the probability distribution of the data.
  - Predicting the future without past information or context is impossible.

### Handling sequence data
Conditional probability is used to model the probability distribution of upcoming data based on previous sequence information.

![](/assets/images/RNN/a953e4fe-612e-45ca-92c2-f8d0f84b9007-image.png)

If we want to use all past information to compute conditional probabilities, the formula looks like the above.

---
Typically, sequence data is handled as follows:
![](/assets/images/RNN/db4c5a53-d223-4a00-9b5a-0203f0d6a054-image.png)

Not all past information is needed. This varies heavily by domain.

For example, to predict a stock price for a company founded 30 years ago, you don't need all data from day one. Usually about 5 years of data is used.

=> Truncating information is itself a skill.

---
![](/assets/images/RNN/007ca09c-6a78-4fbe-a6a0-225e6dc24615-image.png)
Sequence data must be handled with variable lengths as shown above. A model that can handle variable-length inputs is needed.

### Autoregressive model
![](/assets/images/RNN/df1b72f5-1504-4cee-bf36-53548771f3b4-image.png)
There are cases where only a fixed-length sequence of size tau is used. This is called an AR(tau) (Autoregressive model).
- Deciding tau itself requires substantial domain knowledge.
- tau must be set short or long depending on the need.

## Latent autoregressive model
![](/assets/images/RNN/775dedc3-7ed1-483c-a149-ed432a48930d-image.png)
- To predict Xt, both Xt-1 and Ht are used.
- Ht (latent variable) contains information from Xt-2 all the way back to X1.
- **Variable-length data is converted to fixed-length data.** This makes it easier for models to process.
- Problem: how to encode Ht?

## RNN (Recurrent Neural Network)
![](/assets/images/RNN/5e1bbe91-6e2a-40bb-9921-2b6a5298d632-image.png)
A model that learns sequence data patterns by repeatedly using the latent variable Ht from the latent autoregressive model through a neural network.

The network can be expressed mathematically as:

![](/assets/images/RNN/a2dcb8e6-0e43-43e9-b15f-4f2f1ef5091f-image.png)
- Xt: current time step's sequence data
- Ht: latent variable up to the current time step
- W(1), W(2): weight matrices shared across all time steps.

This network can only handle the current time step's data. So the network is extended as follows:
![](/assets/images/RNN/2d256449-527c-4f12-b020-ea4421589899-image.png)

- Wx(1): weight matrix combined with the current time step's data
- WH(1): weight matrix combined with the previous time step's latent variable
- Ht: newly computed latent variable. Copied and used to encode the next latent variable.
- Fixed weight matrices used across the entire network: Wx(1), WH(1), W(2)

### BPTT (Backpropagation through time)
The backpropagation method for RNN.
![](/assets/images/RNN/214e7c97-8738-4722-8f40-db93b97253e9-image.png)
- Red: gradient flow path
- Blue: forward propagation

---

![](/assets/images/RNN/a609a3b6-833e-4512-912d-3d2a9a4133d1-image.png)
As sequence length grows, the term inside the red box becomes unstable. If the value inside is less than 0, it shrinks toward zero; if greater than 0, it grows unboundedly.

### Truncated BPTT
Computing gradients for all sequence steps causes the differential terms to become very unstable, leading to gradient vanishing.
![](/assets/images/RNN/3287a8f7-8b35-41f4-8e80-d18ef5bc59f0-image.png)

So we truncate appropriately.

For example, in the figure above, BPTT proceeds normally until Ht receives gradient information only from Ot, and the gradient is updated from there.

![](/assets/images/RNN/75b5f4da-e38b-4801-9af7-b4a61f4a23b0-image.png)

But even this has limits, which is why LSTM and GRU were developed to address the problem.
