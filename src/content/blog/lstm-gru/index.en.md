---
title: "LSTM, GRU"
description: "Detailed explanation of LSTM and GRU architectures, covering gate mechanisms, cell state, and how they solve RNN's long-term dependency problem."
date: "2021-09-07T06:49:00.329Z"
tags: ["nlp"]
lang: en
translationOf: "lstm-gru"
draft: false
---

# LSTM
Long short-term memory.

A model that addresses the long-term dependency problem of RNN. It was designed to better propagate information from distant time steps.

The name comes from treating the hidden state as a short-term memory unit and engineering it to survive for a longer period of time.

Original RNN:
$h_t=f_w(x_t, h_{t-1})$

![](/assets/images/LSTM, GRU/7ea559fc-a17b-4a5f-aee0-84c7217836fd-image.png)

LSTM:
cell state ($C_t$): a state containing all prior information.
hidden state ($h_t$): a state containing information that should be exposed only at the current step.
$C_t, h_t=LSTM(x_t, C_{t-1}, h_{t-1})$

![](/assets/images/LSTM, GRU/ac01efbd-be4a-468e-bf62-51229c235589-image.png)

The result of linearly transforming $x_t$ and $h_{t-1}$ is passed through respective activation functions to produce the input gate, forget gate, output gate, and gate gate (?).

If h is the dimension of $x_t$ and the hidden state, then W is (4h, 2h). The column dimension is 2h because we need to linearly transform x and the hidden state together. The row dimension is 4h so the result can be directly used as i, f, o, g.


The probabilities obtained through sigmoid are multiplied element-wise with the hidden state, effectively acting as weights.

## Forget gate
![](/assets/images/LSTM, GRU/bdc68075-8b6c-4f1e-b6dd-901317b552d2-image.png)
![](/assets/images/LSTM, GRU/91210f85-3b3f-4580-80a3-3cfcada828ef-image.png)

$h_{t-1}$ and $x_t$ are concatenated, linearly combined with W, and then passed through sigmoid. This is multiplied with the cell state to determine how much of the cell state values to preserve. In other words, it decides how much information to forget.

## Gate gate
![](/assets/images/LSTM, GRU/e03ef103-303b-42e0-bf51-7d5aa1c05d9e-image.png)
![](/assets/images/LSTM, GRU/ca1652db-356f-44c7-9a1c-f6b3eb1af438-image.png)
$\tilde{C_t}$ is the gate gate. It generates new information.

$i_t$ is the input gate. Like the forget gate, it has values passed through sigmoid. It determines how much of $\tilde{C_t}$ to apply to $C_t$.
![](/assets/images/LSTM, GRU/5720ab0d-448f-40f0-9989-a387670a3c75-image.png)
The cell state gets updated. The first term is the product of the forget gate and the previous cell state we saw earlier. The product of the input gate and gate gate is added to it.

The reason for creating a separate input gate and multiplying it with the gate gate is that a single linear transformation alone isn't sufficient to produce the desired result. In other words, the input gate and gate gate together make it easier to manipulate the information to be added.

## Output gate
![](/assets/images/LSTM, GRU/3a97d88c-cda9-482d-8450-0eccf4581c42-image.png)
![](/assets/images/LSTM, GRU/8dd2d712-9343-47cb-b421-8315284df0cc-image.png)

The output gate is computed first to generate $h_t$. The output gate is used to scale each dimension of the cell state by an appropriate ratio.
In LSTM, $h_t$ is the value directly used for the output at the current time step. Think of it as filtered information from $C_t$ that is relevant only to the current time step t.

For example, suppose there's a model with "hello" as training data and we run inference after training. If we feed "h" into the model, the linear combination of $h_t$ with $W_y$ produces "e", which becomes the input for the next step.

## Backpropagation
Unlike RNN, LSTM combines information through addition as shown below.
![](/assets/images/LSTM, GRU/5720ab0d-448f-40f0-9989-a387670a3c75-image.png)

This means gradient vanishing/exploding doesn't occur from repeated exponentiation even with long sequence data.



# GRU (Gated Recurrent Unit)
A network designed to use less memory than LSTM. It's widely used because its performance is similar to or sometimes better than LSTM.

![](/assets/images/LSTM, GRU/40e9cc2e-7594-48b6-ba86-31a1742e8c9d-image.png)
![](/assets/images/LSTM, GRU/9b14177c-2e51-4987-9e77-2e45045300b1-image.png)

In LSTM, the forget gate and input gate control the amount of information deleted and created respectively. In GRU, $z_t$ is computed once, and $1-z_t$ is used like a forget gate while $z_t$ is used like an input gate.

Additionally, LSTM's cell state and hidden state are implemented with just a single hidden state in GRU. In other words, GRU's hidden state carries all prior information while also directly contributing to the output at the current step.
