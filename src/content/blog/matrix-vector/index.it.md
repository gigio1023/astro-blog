---
title: "Matrice, Vettore"
description: "Ripasso di algebra lineare: norme vettoriali, prodotti interni, moltiplicazione matriciale, matrici inverse e pseudo-inversa di Moore-Penrose con esempi NumPy."
date: "2021-08-03T17:51:44.040Z"
tags: ["python"]
lang: it
translationOf: "matrix-vector"
draft: false
---

# Matrix
Le mie conoscenze matematiche dal primo anno di analisi e algebra lineare si sono in gran parte perse. Le rinfresco qui insieme alla notazione numpy.

## Annotation
### scalar calculation
In numpy, + e - funzionano direttamente.

### scalar product
Hadamard Product: prodotto elemento per elemento di vettori della stessa forma.
X · Y

```
X * Y
```

### Norm
![](/assets/images/Matrix, Vector/46f4a9f2-c27e-4533-b96e-0181628262f0-image.png)
Distanza dall'origine al vettore.
L1 norm = somma dei valori assoluti delle variazioni
L2 norm = distanza euclidea


### Angolo tra vettori

![](/assets/images/Matrix, Vector/afa1e8c8-b904-4223-8665-5982f81cfca0-image.png)
Usando il teorema del coseno, si puo calcolare l'angolo tra due vettori.
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
Tramite la moltiplicazione matriciale, una matrice puo essere intesa come un operatore nello spazio vettoriale. Perche la moltiplicazione matriciale puo mandare un vettore in uno spazio di dimensione diversa.
Si puo usare per estrazione di pattern e compressione dati.

### inner product
![](/assets/images/Matrix, Vector/3209ccf9-99e0-4aac-b54c-46c608898d11-image.png)

![](/assets/images/Matrix, Vector/ff574778-710e-4f6a-8638-29dc845ce06f-image.png)

### inner in numpy
np.inner calcola il prodotto interno tra vettori. Per esprimere il prodotto interno dei vettori in forma matriciale, si usa tipicamente la trasposta.
![](/assets/images/Matrix, Vector/1fda92b4-f9d3-4339-9e37-c458e06b078d-image.png)
```
np.inner(X, Y)
```

### Matrice inversa
```
np.linalg.inv(X)
```

### Pseudo-inversa, matrice di Moore-Penrose
- A differenza dell'inversa regolare, il numero di righe e colonne non deve coincidere.
- Svolge comunque un ruolo simile all'inversa.
![](/assets/images/Matrix, Vector/b237ed5e-2263-4a08-b3ca-0aed843b9101-image.png)
n = righe, m = colonne

```
np.linalg.pinv(X)
```

#### Risoluzione di sistemi di equazioni
![](/assets/images/Matrix, Vector/5a0334a4-a0f5-4342-878b-184006fac8b9-image.png)
#### Regressione lineare
![](/assets/images/Matrix, Vector/d0ffd305-292e-4c76-8493-70bc84974d75-image.png)

Considerando la distribuzione dei dati, fare una regressione lineare come sistema di equazioni non e possibile.
Quindi, trovare una soluzione che minimizzi la norma L2 di y e l'approccio generale.
```
# using sklearn for linear regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
y_test = model.predict(x_test)

# Moore-Penrose inverse matrix
X_ = np.array([np.append(x, [1]) for x in X]) # aggiunta intercetta y
beta = np.linalg.pinv(X_) @ y
y_test = np.append(x_test) @ beta
```
sklearn stima automaticamente l'intercetta y nella regressione lineare.
Quando si fa regressione lineare tramite l'inversa di Moore-Penrose, bisogna aggiungere manualmente l'intercetta y per costruire X.
