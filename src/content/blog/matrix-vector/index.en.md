---
title: "Matrix, Vector"
description: "Linear algebra refresher covering vector norms, inner products, matrix multiplication, inverse matrices, and Moore-Penrose pseudo-inverse with NumPy examples."
date: "2021-08-03T17:51:44.040Z"
tags: ["python"]
lang: en
translationOf: "matrix-vector"
draft: false
---

# Matrix
My math knowledge from freshman calculus and linear algebra has mostly faded. Refreshing it here alongside numpy notation.

## Annotation
### scalar calculation
In numpy, + and - work directly.

### scalar product
Hadamard Product: element-wise product of identically shaped vectors.
X · Y

```
X * Y
```

### Norm
![](/assets/images/Matrix, Vector/46f4a9f2-c27e-4533-b96e-0181628262f0-image.png)
Distance from the origin to the vector.
L1 norm = sum of absolute values of changes
L2 norm = Euclidean distance


### Angle between vectors

![](/assets/images/Matrix, Vector/afa1e8c8-b904-4223-8665-5982f81cfca0-image.png)
Using the law of cosines, we can compute the angle between two vectors.
```
def angle(x, y):
    v = np.inner(x, y) / (l2_norm(x) * l2_norm(y))
    theta = np.arccos(v)
    return theta
```

### multiplication
XY
```
X @ Y
```
Through matrix multiplication, a matrix can be understood as an operator in vector space. Because matrix multiplication can send a vector to a different dimensional space.
In other words, it can be used for pattern extraction and data compression.

### inner product
![](/assets/images/Matrix, Vector/3209ccf9-99e0-4aac-b54c-46c608898d11-image.png)

![](/assets/images/Matrix, Vector/ff574778-710e-4f6a-8638-29dc845ce06f-image.png)

### inner in numpy
np.inner computes the inner product between vectors. To express the inner product of vectors in matrix form, a transpose is typically used.
![](/assets/images/Matrix, Vector/1fda92b4-f9d3-4339-9e37-c458e06b078d-image.png)
```
np.inner(X, Y)
```

### Inverse matrix
```
np.linalg.inv(X)
```

### Pseudo-inverse, Moore-Penrose matrix
- Unlike the regular inverse, the number of rows and columns doesn't need to match.
- Still performs a role similar to the inverse.
![](/assets/images/Matrix, Vector/b237ed5e-2263-4a08-b3ca-0aed843b9101-image.png)
n = rows, m = columns

```
np.linalg.pinv(X)
```

#### Solving systems of equations
![](/assets/images/Matrix, Vector/5a0334a4-a0f5-4342-878b-184006fac8b9-image.png)
#### Linear regression
![](/assets/images/Matrix, Vector/d0ffd305-292e-4c76-8493-70bc84974d75-image.png)

Considering the distribution of data, doing linear regression as a system of equations is not possible.
Therefore, finding a solution that minimizes the L2 norm of y is the general approach.
```
# using sklearn for linear regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
y_test = model.predict(x_test)

# Moore-Penrose inverse matrix
X_ = np.array([np.append(x, [1]) for x in X]) # add y-intercept
beta = np.linalg.pinv(X_) @ y
y_test = np.append(x_test) @ beta
```
sklearn automatically estimates the y-intercept when performing linear regression.
When doing linear regression via the Moore-Penrose inverse, you need to manually add the y-intercept to construct X.
