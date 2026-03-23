---
title: "numpy.matmul, numpy.dot"
description: "Difference between numpy.matmul and numpy.dot for high-dimensional matrix multiplication."
date: "2021-01-01"
tags: ["python"]
lang: en
translationOf: "numpymatmul-numpydot"
draft: false
---

ref: https://blog.naver.com/cjh226/221356884894

Matrix multiplication beyond the 2D case we learned in high school is hard or impossible to draw.
How would you draw 100-dimensional x 100-dimensional?

So we define things with formulas, and based on these definitions, there are two approaches.

# np.dot
For A x B, the last dimension of A and the second-to-last dimension of B must match.
>
np.dot(A,B)[i,j,k,m] == np.sum(A[i,j,:] * B[k,:,m])


# np.matmul
For A x B, the last two dimensions of A and B must match.
That is, treat the last two dimensions as matrices stacked along the remaining dimensions.
e.g., (2,3,4) means two (3,4) matrices stacked.

>
np.matmul(A,B)[i,j,k] == np.sum(A[i,j,:] * B[i,:,k])


# Conclusion
I understand the definitions, but I'm not sure how the actual usage differs.