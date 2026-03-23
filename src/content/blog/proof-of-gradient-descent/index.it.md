---
title: "Dimostrazione del gradient descent"
description: "Derivazione matematica del gradient descent per la regressione lineare, dalle funzioni di costo con norma L2 fino a SGD."
date: "2021-08-04T06:19:39.104Z"
tags: ["ml", "algorithm"]
lang: it
translationOf: "proof-of-gradient-descent"
draft: false
---

Ho gia' organizzato questo argomento piu' volte su Notion. Qui lo riorganizzo basandomi solo su quanto imparato al BoostCamp.

I miei appunti precedenti sul gradient descent si trovano ai link seguenti.
https://naem1023.notion.site/Gradient-descent-429308fbd0184aaab90c0ac50e90b526
https://naem1023.notion.site/ML-68740e6ac0db42e9a01b17c9ab093606


# Gradient descent
## Scopo
Nel post precedente ho solo costruito una struttura algoritmica per la regressione lineare usando il gradient descent. Questa volta vedremo come viene usato dal punto di vista matematico.

## Uso nella regressione lineare
![](/assets/images/Gradient descent 증명/5a0c0d90-cb90-4b5c-b72c-b52eee765fbc-image.png)

L'obiettivo della regressione lineare e' minimizzare la norma L2 tra i valori reali y e le predizioni yhat.

In teoria si potrebbe calcolare tramite la pseudoinversa di Moore-Penrose, ma nella pratica non e' quasi mai fattibile. Cerchiamo yhat tramite gradient descent.

## Funzione di costo per la regressione lineare
La maggior parte dei post spiega cos'e' la funzione di costo e poi illustra il gradient descent, il che rendeva questa parte difficile da capire. Ad esempio, negli appunti Notion linkati sopra si procede con la differenziazione di J(theta_0, theta_1).

L'approccio del BoostCamp tramite la norma L2 ha reso tutto molto piu' chiaro.

![](/assets/images/Gradient descent 증명/445f962f-2928-4899-a956-df4bbded9bfe-image.png)

Dato che l'obiettivo finale e' trovare un yhat ideale, usare il quadrato della norma L2 come funzione di costo invece della norma L2 stessa va benissimo.

Quello che vogliamo e' trovare il beta che minimizza la funzione di costo. Il gradient descent e' il metodo che abbiamo scelto per questo.

In altre parole, dobbiamo calcolare il vettore gradiente della funzione di costo, da fornire all'algoritmo del post precedente.

### Derivata parziale della funzione di costo rispetto al k-esimo elemento di beta
La derivata parziale rispetto al k-esimo elemento di beta e':
![](/assets/images/Gradient descent 증명/43b3c8a5-24f2-4cc8-8681-07c0281a401c-image.png)

A differenza della semplice norma L2, qui e' importante calcolare la media.

Nella formula, questo simbolo:
![](/assets/images/Gradient descent 증명/e4b0b06a-b2c3-46dd-8716-3309d38bc0a9-image.png)
indica la trasposta del k-esimo vettore colonna della matrice X.


### Vettore gradiente della funzione di costo
Il vettore gradiente rispetto a beta si presenta come le derivate parziali per ogni k-esimo elemento di beta disposte in un vettore gradiente:
![](/assets/images/Gradient descent 증명/2124cda7-fbcd-4322-a1be-7a44d8fbb93a-image.png)


Semplificando si ottiene:
![](/assets/images/Gradient descent 증명/6e3989ef-8dde-47d7-bf17-3df15753854c-image.png)
Dopo tutta la complessita', il risultato e' semplicemente la moltiplicazione per X-trasposta -- la derivata di X*beta rispetto a beta.

### Algoritmo di gradient descent che minimizza la funzione di costo
Al passo t, l'aggiornamento di beta per il passo t+1 funziona cosi':

![](/assets/images/Gradient descent 증명/45118802-286f-4592-a3b2-d639646316ca-image.png)

Come previsto dal gradient descent, si sottrae il vettore gradiente dal beta al passo t nella direzione che minimizza la funzione di costo.

Sostituendo il vettore gradiente calcolato sopra si inverte il segno:
![](/assets/images/Gradient descent 증명/af3dc779-3c25-4ca4-8c67-c7cf4cec7e9d-image.png)

## Funzione di costo con il quadrato della norma L2
Calcolando con la sola norma L2 il vettore gradiente veniva disordinato. Elevando al quadrato si elimina la radice, quindi dovrebbe essere piu' pulito.

![](/assets/images/Gradient descent 증명/49a8ccd7-4f21-4c63-82fd-b0eba4d9c60e-image.png)

## Algoritmo finale di gradient descent
```python
# norm: funzione che calcola la norma l2
# lr: learning rate
# T: numero di passi di addestramento

for t in range(T):
	error = y - X @ beta
	grad = - transpose(X) @ error
	beta = beta - lr * grad
```

## Garanzie di convergenza del gradient descent
Con un numero appropriato di passi e un learning rate adeguato, la convergenza e' sempre garantita per funzioni convesse differenziabili.

La funzione di costo della regressione lineare e' convessa rispetto a beta, quindi la convergenza e' garantita.

Tuttavia, la regressione non lineare non ha garanzie di convessita' della funzione di costo rispetto a beta, quindi la convergenza non e' garantita.

![](/assets/images/Gradient descent 증명/28bc1210-5e3e-4dc9-8097-6f357e489a6b-image.png)

# SGD (Stochastic Gradient Descent)
SGD usa solo un sottoinsieme dei dati invece di tutti per gli aggiornamenti.

Non e' una soluzione universale, ma nel deep learning dove le funzioni di costo sono solitamente non convesse, SGD si e' dimostrato empiricamente superiore al gradient descent standard.

Il professore ha menzionato che SGD, che usa solo una porzione dei dati, produce risultati probabilisticamente simili al gradient descent completo, come verificato empiricamente.

![](/assets/images/Gradient descent 증명/bdea073e-957e-4b80-bcd2-7c72ec129a50-image.png)

Il sottoinsieme di dati usato si chiama mini batch.
Per convenzione, usare un singolo dato si chiama SGD, mentre usare un sottoinsieme si chiama mini batch SGD.

## Efficienza
![](/assets/images/Gradient descent 증명/21d5bdbd-f88e-4862-b128-344fc711f856-image.png)

Dato che si usa un mini batch (Xb, yb) invece dei dati completi (X, y), il calcolo si riduce di un fattore b/n.

Inoltre, suddividere i dati permette di usare la memoria GPU in modo piu' efficiente.

## Come funziona
Il gradient descent standard usa tutti i dati per calcolare nabla theta L, come mostrato qui sotto:

![](/assets/images/Gradient descent 증명/8f7aa27a-e537-4a45-a3b6-dc0ae58e2a88-image.png)


SGD usa un mini batch D(b) per calcolare il vettore gradiente:

![](/assets/images/Gradient descent 증명/338084a7-0b3d-4f13-af7d-c3ef15f67215-image.png)

Questo fornisce una direzione simile al gradient descent standard.

---

![](/assets/images/Gradient descent 증명/d0a7658b-4fb8-487f-a7cf-32f1ac90aded-image.png)

Inoltre, dato che D(b) cambia ad ogni passo, anche la funzione obiettivo cambia ad ogni passo.
Quindi anche raggiungendo un minimo locale, dato che la funzione obiettivo cambia, c'e' una probabilita' di sfuggire ai minimi locali.

## Confronto con il gradient descent
![](/assets/images/Gradient descent 증명/c7f7ab44-27b4-44fe-bed7-e9bc68c7d5e8-image.png)
SGD potrebbe essere meno efficiente del gradient descent su problemi convessi. Ma per le tipiche funzioni obiettivo del machine learning, e' piu' efficiente.
