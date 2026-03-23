---
title: "Attention"
description: "Explanation of the attention mechanism in Seq2Seq models, covering attention vectors, context vectors, teacher forcing, and similarity functions."
date: "2021-09-08T05:27:10.397Z"
tags: ["nlp"]
lang: en
translationOf: "attention"
draft: false
---

# Seq2Seq with Attention
## Seq2Seq with LSTM
![](/assets/images/Attention/9c2dbb21-b1cb-4dbe-b29d-83e2a10a52a8-image.png)
Seq2Seq falls under the many-to-many category of RNN architectures. Both input and output are word-level sequences.

![](/assets/images/Attention/d54bf9f7-62ce-47ce-8e87-9677b39e0ab3-image.png)
The diagram above shows a dialog system (e.g., chat bot). The part that receives the input sentence is the encoder; the part that generates the output sentence is the decoder.
The RNN model used here is LSTM. The hidden state from the encoder's last step becomes the input hidden state for the decoder.

**SoS (Start of Sentence)**
Represents the first token of the generated sentence. SoS is managed separately in the vocabulary and is fed as the first input to the decoder during training.

**EoS (End of Sentence)**
Represents the last token of the generated sentence. It specifies when to stop generating.

### Problem
All encoder information must be stored in a fixed-dimension hidden state. So even though LSTM addresses long-term dependency, as the sequence grows longer, earlier information is likely to be lost or distorted.

For example, in a sentence like 'I go home,' the subject should be recognized first. But since subjects typically appear at the beginning of the sentence, that information may degrade toward the end, causing the decoder to fail at generating the subject properly.

**Workaround**
Reverse the sentence order. Turn 'I go home' into 'home go I' to place important information at the end. Not a fundamental solution.

**Solution**
Use all hidden states generated at each step.

## Seq2Seq with Attention
![](/assets/images/Attention/8e1cec15-3962-4998-9ca1-20e2067e5c27-image.png)

This is a task translating French sentences to English.

The encoder generates a hidden state at each step, same as regular Seq2Seq. The hidden state from the encoder's last step becomes the input hidden state for the first decoder step.

To determine which encoder hidden states are needed, the dot product is computed between each encoder $h_n^{(e)}$ and the decoder's $h_1^{(d)}$. In the diagram above, 4 dot product results would be computed individually.
The dot product results can be thought of as similarity between hidden states.

Applying softmax to the dot product results (treating them as logits) yields probabilities. These probabilities are used as weights applied to $h_n^{(e)}$.

**Attention vector**
This resulting weight vector that sums to 1 is called the attention vector.

A weighted average of $h_n^{(e)}$ using these weights produces a single attention output vector. This result is also called the context vector.

In summary, information that the decoder's hidden state needs is selected and combined from the encoder hidden states.

**Attention module**
The part enclosed by green lines in the diagram above is called the attention module. It takes encoder hidden states as input and computes a single attention output.

---

![](/assets/images/Attention/d755fe74-abab-410d-b20b-2830471c1c74-image.png)

The decoder's hidden state and context vector (attention output) are concatenated to become the input of the output layer. This is how the next word is predicted.

---

![](/assets/images/Attention/dfb30e3e-37fe-4a6d-9d9b-c646060de16e-image.png)

The second decoder step repeats the same process. The decoder receives $h_1^{(d)}$ as input hidden state and 'the' as input, producing $h_2^{(d)}$.

---

![](/assets/images/Attention/73af7d13-0fc7-4b75-acdf-6b6d71d6f729-image.png)

The repetition continues until the output produces an end token (EoS).

### Decoder's Hidden State
The decoder's hidden state vector must serve two roles.
- Determine which encoder hidden states to focus on.
  - = It must contain information for creating the attention vector.
- Serve as input to the output layer for prediction.

The decoder's training is conducted so it can perform both roles simultaneously.

![](/assets/images/Attention/4f7d2d84-4b42-4f8a-8d8c-8c0d9e17f886-image.png)

Therefore, backpropagation follows the purple path shown in the diagram above.

### Teacher Forcing
In teacher forcing, the decoder's input during training is the ground truth. In other words, even if the model mispredicts the next word during training, the ground truth corrects it.

### Similarity Measurement
Beyond simple dot products, similarity can be computed in several ways.
![](/assets/images/Attention/23a5d9f8-9ec3-46b9-a68e-28b6f637a4dd-image.png)
- $score$: similarity function
- $h_t$: decoder hidden state
- $\bar h_s$: encoder hidden state

$general$
A weight matrix $W_a$ is introduced in the dot product. Think of it as granting authority to assign weights to individual multiplication elements in matrix multiplication.

$\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} x & y \\ z & v \end{pmatrix}$
For example, the matrix product above consists of terms like $ax+bz$, $ay+bv$, etc.

Weights are assigned to each element: $w_0(ax+bz)$, $w_1(ay+bv)$, etc. — adding a tunable variable to each matrix product element. In deep learning, this creates learnable parameters.

$concat$
In $[h_t;\bar h_s]$, the semicolon denotes concatenation between matrices. Looking at the formula, the term wrapped in tanh resembles a neural network — and it is.
![](/assets/images/Attention/058b4e88-3af5-421a-97df-14e6060f9d20-image.png)

If $h_t=[1,3]$ and $\bar h_s=[2, -5]$, the network is constructed as shown above. W1 and W2 represent fully connected networks.

In the formula, W2 is denoted $v_a$. This is because the final network layer must output a scalar, so W2 must be a vector. In the diagram, the 3-dimensional vector must be reduced to a scalar, so W2 must also be a 3-dimensional vector.

---
**Why diversify similarity measurement methods?**
Compared to simple dot products, more tunable parameters are introduced during model training. These additional parameters are heavily involved in computing the attention vector.

In other words, by incorporating variables into similarity measurement, the model can also learn the process of computing the attention vector.

# Advantages of Attention
- Dramatically improved machine translation performance.
  - Unlike previous Seq2Seq, it created an environment where the decoder can focus on specific information.
  - Solved the problem of long sentences being poorly translated.
- Attention solves the bottleneck problem.
  - Solved problems arising from stuffing all previous information into a single hidden state.
  - The decoder can directly access source information.
- Attention solves gradient vanishing.
![](/assets/images/Attention/f1dd8188-220a-4ed4-8b92-8f1dc68a1bb7-image.png)
  - Previously, backpropagation propagated loss sequentially through the decoder and encoder (red path in the diagram above).
The bottleneck phenomenon occurs here too. Especially if you want to update hidden states at early encoder steps, backpropagation must go very deep.
  - With attention, this propagation process is simplified (blue path in the diagram). Attention output creates shortcut-like paths in backpropagation.
- Attention provides some interpretability.
  - Knowing the attention vector distribution for a specific input reveals what information the decoder is focusing on.

# Attention Examples
![](/assets/images/Attention/c463036d-526d-4af1-af66-0e6ada2785ac-image.png)
An example of translating French to English using attention. It translates in order just fine, and for phrases where word order changes, the attention mechanism automatically detects the reordering and handles the translation.
An end-to-end translation was performed automatically.
