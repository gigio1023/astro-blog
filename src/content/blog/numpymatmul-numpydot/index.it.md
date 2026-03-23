---
title: "numpy.matmul, numpy.dot"
description: "Differenza tra numpy.matmul e numpy.dot per la moltiplicazione di matrici ad alta dimensionalita."
date: "2021-01-01"
tags: ["python"]
lang: it
translationOf: "numpymatmul-numpydot"
draft: false
---

ref: https://blog.naver.com/cjh226/221356884894

La moltiplicazione di matrici oltre il caso 2D studiato al liceo e difficile o impossibile da disegnare.
Come si disegna 100 dimensioni x 100 dimensioni?

Percio si definisce tutto con formule, e in base a queste definizioni ci sono due approcci.

# np.dot
Per A x B, l'ultima dimensione di A e la penultima dimensione di B devono corrispondere.
>
np.dot(A,B)[i,j,k,m] == np.sum(A[i,j,:] * B[k,:,m])


# np.matmul
Per A x B, le ultime due dimensioni di A e B devono corrispondere.
Cioe si considerano le ultime due dimensioni come matrici impilate lungo le dimensioni restanti.
es. (2,3,4) significa due matrici (3,4) impilate.

>
np.matmul(A,B)[i,j,k] == np.sum(A[i,j,:] * B[i,:,k])


# Conclusione
Ho capito le definizioni, ma non mi e chiaro come differisca l'uso pratico.