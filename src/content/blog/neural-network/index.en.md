---
title: "Neural Network"
description: "Introduction to neural networks covering linear regression, softmax classification, activation functions, and why deep layers are preferred."
date: "2021-01-01"
tags: ["dl", "ml"]
lang: en
translationOf: "neural-network"
draft: false
---

# Neural network

## NN in Linear Regression
![](/assets/images/Neural network/a6465dd5-9e84-4b33-926b-28b292517916-image.png)

A classic example that makes good use of matrix operations is NN.

Matrix X holds the data. W sends X's data into a different dimension.

Matrix b adds the y-intercept to each column vector at once.

The original X matrix with dimensions (X, d) gets transformed to (n, p).

### Interpretation
![](/assets/images/Neural network/8f274dcc-7500-48bd-a9fd-c5e17920319e-image.png)

X, which was d-dimensional, gets connected to p dimensions.

Each arrow represents one variable of the W vector. Since xd points to p outputs, there are d x p arrows, which matches the dimensions of W.

## NN in Classification

### Softmax
![](/assets/images/Neural network/feb29979-6787-45e1-9cab-37e2d7653619-image.png)
![](/assets/images/Neural network/0f1bfd63-8055-498f-88de-15a12d0905ee-image.png)

In classification, softmax is combined with a vector to produce a probability vector.
In other words, combining softmax with a linear model lets us interpret the model's output in the desired format.

### Softmax Implementation
```python
def softmax(vec):
	denumerator = np.exp(vec - np.max(vec, axis=-1, keepdims=True))
	numerator = np.sum(denumerator, axis=-1, keppdims=True)
	val = denumerator / numerator
	return val
```
np.max is added to prevent overflow. The original softmax computation result is preserved.

### Prediction
For prediction, we don't use softmax; we only use methods like one-hot encoding. I think this is because probabilities already come out of the NN's output.
```python
def one_hot(val, dim):
	return [np.eye(dim)[_] for _ in val]

def one_hot_encoding(vec):
	vec_dim = vec.shape[1]
 	vec_argmax = np.argmax(vec, axis=-1)
	return one_hot(vec_argmax, vec_dim)
```


# Activation Function
- Activation functions convert linear outputs into nonlinear ones.
- The vector transformed by an activation function = hidden vector, latent vector, neuron
- Neural network (NN) = a model composed of neurons
- Perceptron = a traditional model composed only of neurons
![](/assets/images/Neural network/37b7ce96-3cdb-4ecf-8f69-e4f5ebd1906c-image.png)

The difference from softmax is that softmax considers all variable values, whereas activation functions are applied to individual real numbers. ??
I thought softmax was also an activation function, but I was wrong.

## Definition
A nonlinear function defined on real numbers.
**An NN without activation functions is no different from a linear model!**

## Types
![](/assets/images/Neural network/dd670b29-c6d3-44d1-9be2-3325d9c2bc39-image.png)

Traditionally, sigmoid and tanh were used.
Recently, ReLU and its variants are used.

# NN (Neural Network)
## Definition
A function that composes linear models with activation functions.
![](/assets/images/Neural network/d1932628-aeb5-4062-bc29-9b03ab49e7ff-image.png)

Layers are stacked by repeatedly transforming input z into latent vector h within the network.
The figure above is a two-layer NN. Generalizing this gives the following:

![](/assets/images/Neural network/d98c927d-f6b5-4cd4-a12f-57c1d45aef04-image.png)


As mentioned above, when activation functions are applied, they operate individually on each real number within a vector.
## Why Use More Than 2 Layers
Universal approximation theorem
- Even a 2-layer network can approximate any continuous function
- But it's hard to achieve in practice

The deeper the layers, the fewer neurons are needed to approximate the target function.

So deeper NNs are typically used. But optimization gets harder.

## Forward Propagation
Following the NN's layer-stacking process as-is to adjust weights.

## Back Propagation
lol
..
### Parameter Update in Linear Models
A linear model can be thought of as having a single layer. That is, all parameters get updated at once.
### Parameter Update in NN
An NN, on the other hand, consists of multiple layers. So all parameters can't be updated at once. It has to be done sequentially.

### Principle
![](/assets/images/Neural network/0f6f5ef9-5c0a-4f2b-ace9-e1e420235db0-image.png)
Final goal: update all parameters used across L layers.

![](/assets/images/Neural network/cb01ea48-d602-4bbd-8082-c3c949585094-image.png)

Using the chain rule of differentiation, parameters are updated by going backward from the output to the input.

### Chain-Rule-Based Auto-Differentiation
The chain rule is the same concept from high school math.
![](/assets/images/Neural network/c0783dd2-a4d4-4540-98f1-8bb9e3dd8eaf-image.png)

For this to work via chain rule, the computer needs to know the tensors at each node.

Forward propagation, on the other hand, just computes sequentially, so it's more memory-efficient than back propagation.

---
![](/assets/images/Neural network/f3efca3c-9652-432b-b539-237129bcb9ab-image.png)

In the figure above, blue arrows represent forward propagation and red arrows represent back propagation. It shows the process of using the chain rule to compute the gradient vector for W1.

![](/assets/images/Neural network/9c2e9174-87e2-44cf-bef6-eafabdbcc9d9-image.png)