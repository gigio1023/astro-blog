---
title: "Transformer"
description: "Core concepts of the Transformer model: encoder self-attention, Query/Key/Value embeddings, and multi-head attention mechanics."
date: "2021-08-13T11:44:01.736Z"
tags: ["dl", "nlp"]
draft: false
lang: en
translationOf: "transformer"
---

# Background
![](/assets/images/Transformer/37e659a6-c48b-4b2c-8c81-068ef440e09b-image.png)
Existing RNNs could handle sequence data, but dealing with sequence data that has missing elements (as shown above) was very difficult.

The Transformer was introduced to address this.

# Transformer
![](/assets/images/Transformer/8b722957-5374-445d-9961-20321bb984e9-image.png)
No recurrent structure like RNNs.

> Transformer is the first sequence transduction model based entirely on attention.

![](/assets/images/Transformer/ab8c26e4-1542-44a2-bbf6-4fc6e4f02531-image.png)

It was originally a model for machine translation. But since the Transformer is a methodology for processing sequential data and encoding it, it can be used beyond translation.

Recently, Transformer and self-attention are used in virtually every field.

---

![](/assets/images/Transformer/24a4aa82-d54d-4f0a-bf88-0ba3197a0dc4-image.png)

The Transformer is a sequence-to-sequence model as shown above. Let's look more closely.

![](/assets/images/Transformer/a811cfb8-f62f-411a-8961-40a2a4a11bb9-image.png)

Unlike RNNs, there's no recurrence. If 3 words were input to an RNN, it would recur 3 times to produce output.

But the Transformer produces encoding vectors all at once in a single encoding pass, regardless of whether there are 3 or 100 words. The output side does use something autoregressive, though.

## Key concept of transformer
1. How are n words processed at once during encoding?
2. What information flows between encoder and decoder?
3. How does the decoder generate output?

## Encoder
![](/assets/images/Transformer/cb9c346a-c68c-4bfa-9b24-a6d7bf35067f-image.png)
Takes all vectors as input. Self-attention plays a key role in both encoder and decoder. The feed-forward NN that follows is the familiar MLP.

![](/assets/images/Transformer/f3e9366d-3ce0-48af-bcd1-0d92a51a1b28-image.png)

- Self-attention takes n vectors.
- To transform input vector $$x_1$$ into $$z_1$$, all $$x$$ vectors are used.
  - All paths for creating $$z$$ vectors are interdependent.
- When $$z$$ passes through the feed-forward NN, it's processed in parallel, independently.

### Self-attention
To analyze the sentence below, a dependent network like this is constructed:
> The animal didn't cross the street because it was too tired.

![](/assets/images/Transformer/9cfedf74-f126-414c-8cfb-485a6e39769e-image.png)

Humans naturally understand "it" refers to "animal." When learned through self-attention, it shows strong dependency near "animal" as shown.

---
![](/assets/images/Transformer/f75e4df3-dd97-4e1b-933a-efa3d0f1d6e8-image.png)

Query, Key, Value vectors are computed per word (= embedding). One embedding produces one query, one key, and one value.

### Encoder computation
![](/assets/images/Transformer/4cad27c6-d8e9-4825-ab5a-7e30919afc82-image.png)

From the lecture, explaining this in words is really hard, but the math is simple.

In words:

- score = inner product of query and key
- $$d_k$$ = key vector dimension
- softmax result = softmax applied to score divided by $$d_k$$
- sum = softmax result x value

---

In matrices and formulas:

![](/assets/images/Transformer/174006cd-4e94-4ca8-bf0d-5c12a63a68b0-image.png)

Input X is represented as a matrix.
- row = number of words
- column = embedding dimension

Multiplying X by separate weight matrices for query, key, and value gives Q, K, V.
- attention dimension = key vector dimension

![](/assets/images/Transformer/0297aadc-ab19-4430-9215-f6e9e9838a34-image.png)

The rest follows the verbal explanation directly in formula form.
- softmax = row-wise softmax
- dim(V) can differ from dim(Q) and dim(K).
  - In practice, they're usually all the same for convenience.

## Transformer characteristics
MLPs and CNNs produce fixed outputs for fixed inputs.

But in a Transformer, even if one input is fixed, different surrounding inputs can change the output. This means it can represent far more things, but also requires more computation, so input length can't grow without bound.

## MHA (Multi-Head Attention)
![](/assets/images/Transformer/23f522ce-9a99-4266-9e8c-3102566ffd38-image.png)
Instead of a single set, multiple query, key, and value sets are created for each input.

![](/assets/images/Transformer/e522aaa3-90fe-48e9-a332-97783365a516-image.png)

Applying n attention heads to one input yields n outputs.

The key challenge is matching input and output dimensions. This is solved by concatenating results and multiplying by a matrix that projects back to the input dimension.

![](/assets/images/Transformer/31bb0018-27dd-45bb-b03c-25b45b9c3601-image.png)

Summarizing this entire process:

![](/assets/images/Transformer/58cdf471-cb08-4b0f-9019-9acc569c0b02-image.png)
ref: https://jalammar.github.io/illustrated-transformer/

In theory, the diagram above is all you need, but actual implementation differs. For instance, if input X is 100-dimensional, it might be split into 10 parts. I'll explain in the practical post.

### Positional encoding
![](/assets/images/Transformer/51001f08-e95a-4719-ad4c-9dbf1f7bb08d-image.png)
A value is added to the input, similar to a bias. This is needed because position-dependent variation is important. Without positional encoding, reordering a sentence would be undetectable. So positional encoding captures ordering information.

## Encoder Overview
![](/assets/images/Transformer/867da571-5a53-4c73-ad1f-d7a71ffcd677-image.png)

## Information flow between Encoder and Decoder
![](/assets/images/Transformer/e1a15fb5-6fe2-488a-ad0b-57c03a7b16e5-image.png)

undefined

GIF showing encoder information moving to the decoder.

- The encoder sends key and value to the decoder.
- The encoder inner-products query with keys of other words to create attention, then multiplies by value. To get the attention map, you need key and value.
  - Because the decoder creates its own query from its own input.
- Since encoders are stacked, upper layers produce words. (?)
- Output sentence is generated autoregressively.

## Decoder
### Self-attention
![](/assets/images/Transformer/c840c282-b382-4b8c-8347-8fc6f6823bb0-image.png)
Before the softmax step, a mask is applied to future information. Learning through the decoder while knowing the future is meaningless, so only preceding information is accessible.

### Encoder-Decoder attention
![](/assets/images/Transformer/0c19f826-55be-4244-9c09-16533aa0734a-image.png)
As mentioned above. The "Encoder-Decoder Attention" layer works like MHA, except: the query comes from the previous layer's output matrix, and key and value come from the encoder stack.

### Final layer
![](/assets/images/Transformer/fcd7e32f-79d7-409c-80ff-ba7aca93e3a1-image.png)

Calling it "final layer" for convenience. The decoder stack's output is converted into a word distribution.

# Vision Transformer
![](/assets/images/Transformer/d27b5896-f7aa-4bc3-9807-639d6b851e41-image.png)
The original Transformer paper was for machine translation, but it's been adopted in CV too.

Images are split into patches, go through word-like embedding, and then through the Transformer.

# DALL-E
![](/assets/images/Transformer/a40c33fa-64d6-451b-9b7a-1764e2c151d4-image.png)

A paper that generates images from text. It uses GPT-3.
