---
title: "NN & Multi Layer Perceptron"
description: "Neural networks as function approximators: linear models, activation functions, multi-layer perceptrons, universal approximation theorem, and loss functions."
date: "2021-01-01"
tags: ["dl"]
lang: en
translationOf: "nn-multi-layer-perceptron"
draft: false
---

# Neural Networks
Some say neural networks work well because they mimic the neural networks in the human brain.
![](/assets/images/NN & Multi layer perceptron/bec49730-5ab0-475b-9da8-3c21210874a5-image.png)
There's some truth to that. The implementation of NN nodes does resemble the structure of actual neurons.

But it's a stretch to say they mimic the brain, since processes like back propagation are essential to NNs.

![](/assets/images/NN & Multi layer perceptron/163090cf-0a5c-43ab-a4a4-651564b282ae-image.png)

Early airplanes were modeled after bats and birds. The Wright brothers' airplane had that shape to some extent. But you can't say modern aircraft mimic bats or birds.

Same with NNs. They started from mimicking the human brain to replicate human intelligence, but recent DL research diverges significantly from how humans operate.

The point is: don't just assume NNs work because they mimic humans. Analyze mathematically why they work.

## Define
Neural networks are _**function approximators**_ that stack affine transformations followed by nonlinear transformations.

- They approximate functions.
- Implemented nonlinearly through activation functions.

## Linear Neural Network
### Simple Data
![](/assets/images/NN & Multi layer perceptron/1ca7f55c-4f9d-41cc-99d4-a3d33d1c8fea-image.png)

Let's define data, model, and loss as above.
Now let's find the optimal w and b, the model's parameters.

![](/assets/images/NN & Multi layer perceptron/07c46c4e-0f0f-4c37-9f36-6b875157b1c8-image.png)
![](/assets/images/NN & Multi layer perceptron/8bff603b-ec9b-4cfb-9408-aeb4e9beca63-image.png)

It's a linear regression problem with a convex function and a small training set, so there are definitely methods to find optimal w and b in one shot. But in DL, we use back propagation as shown above.

Back propagation goal: update parameters in the direction that minimizes the loss.
I've explained back propagation in detail in another post, so I won't elaborate further here.

![](/assets/images/NN & Multi layer perceptron/ff1ceb8c-7a52-407f-b478-520282df6956-image.png)

### More Large Data
![](/assets/images/NN & Multi layer perceptron/9264a0b0-a60f-4569-a695-92eecd9a942d-image.png)
Weights are represented using matrices. The goal is to send x to y through W and b.

### More Layer Stack
![](/assets/images/NN & Multi layer perceptron/84ff7973-780d-4703-8547-2beb5225d078-image.png)

To stack more layers, we can express it as a product of weights. The form above is a nesting of the earlier basic formula (bias is omitted).

The intention was to create a multi-layer with hidden layers, but the result is still effectively a single layer. Because W2 and W1 collapse into a single weight through matrix multiplication.

![](/assets/images/NN & Multi layer perceptron/bffeb80b-7d38-4cb8-8009-ca32340fc60a-image.png)
So a nonlinear transform must be applied first, then combined with a linear transform, for the layer-stacking effect to kick in.

### Activation Functions
![](/assets/images/NN & Multi layer perceptron/38244fff-f134-4a27-b7d9-ba9d99eda595-image.png)
Which one is best depends on the problem.

## Beyond Linear Neural Networks
![](/assets/images/NN & Multi layer perceptron/a53406e4-8bcb-4a0b-bb80-318de84b70be-image.png)
On any compact set K, any continuous function can be approximated as closely as desired with just one hidden layer.
=> This only implies existence. It doesn't guarantee that the NN I train will approximate the function I want.

It only demonstrates the expressive power of NNs.

## Loss Function

![](/assets/images/NN & Multi layer perceptron/6b1295f4-f730-4a80-ab47-57273668294d-image.png)

Cross entropy is used in classification problems.

Labels in classification are typically represented as one-hot vectors. Only the dimension to be classified has a value; the rest are all 0. The value itself doesn't matter -- it could be 1 or 1000000. What matters is that it's distinct from other values.

Cross entropy is used to express this property mathematically.


Alternatively, suppose we're building a model to estimate age groups from face photos. In that case, the output is usually expressed as probabilities, implemented using log likelihood through MSE.