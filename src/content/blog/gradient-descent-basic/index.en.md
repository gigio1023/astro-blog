---
title: "Gradient Descent Basics"
description: "Gradient descent basics: differentiation, gradient vectors, partial derivatives, and the nabla operator."
date: "2021-08-03T18:23:37.780Z"
tags: ["ml"]
lang: en
translationOf: "gradient-descent-basic"
draft: false
---

I've organized this in Notion multiple times before, but here's another pass centered on what I learned at Boostcamp.

## Differentiation
```
import sympy as sym
from sympy.abc import x

sym.diff(sym.poly(x**2 + 2*x + 3), x)
```

## Gradient Ascent
f(x)
Add the derivative to x to find the location of the function's local maximum.
Used when the objective function needs to be maximized.

## Gradient Descent
f(x)
Subtract the derivative from x to find the location of the function's local minimum.
Used when the objective function needs to be minimized.

### Algorithm
```
# gradient: function that computes the derivative
# init: starting point
# lr: learning rate
# eps: epsilon

var = init
grad = gradient(var)
while (abs(grad) > eps):
	var = var - lr * grad
    grad = gradient(var)
```
The goal is for the derivative to reach 0, but computers can't represent that exactly. So a very small real value, epsilon, is used as the termination condition.

## Partial Differentiation
Variables in ML are usually vectors, so partial derivatives are needed instead of regular derivatives to establish directionality.
Same as what you'd do in a calculus class.

undefined

Here, ei is a unit vector with 1 at the i-th position and 0 elsewhere. It filters out only the desired component for differentiation.

### Gradient Vector

#### Nabla
When the function takes a vector as input, partial derivatives must be used, and the number of variables can get very large.

So we collect the partial derivative results for all variables back into a vector and use that for gradient descent. This is called the gradient vector, and its advantage is enabling simultaneous updates across all variables.

undefined

This symbol is called nabla.

#### Gradient Vector Visualization
![](/assets/images/Gradient descent 기본/8e486de8-6882-48bb-89bb-0778f81aa965-image.png)
![](/assets/images/Gradient descent 기본/7c31e669-58b0-43d4-bf3a-85f7b0118c64-image.png)

Contour plots make this easy to understand. Relative to the contour lines, the vector direction points toward the fastest decrease toward the origin.

#### Algorithm Using Gradient Vector
```
# gradient: function that computes the gradient vector
# init: starting point
# lr: learning rate
# eps: epsilon

var = init
grad = gradient(var)
while (norm(grad) > eps):
	var = var - lr * grad
    grad = gradient(var)
```
The differences are the definition of gradient and using norm instead of abs in the termination condition.
