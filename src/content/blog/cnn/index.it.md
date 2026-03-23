---
title: "CNN"
description: "Fondamenti delle CNN: operazioni di convoluzione, meccanica dei kernel, convoluzioni multi-dimensionali e backpropagation."
date: "2021-01-01"
tags: ["computer-vision", "ml", "algorithm"]
draft: false
lang: it
translationOf: "cnn"
---

# CNN

Il fully connected layer in MLP ha una matrice dei pesi molto grande.
![](/assets/images/CNN/db07a015-2c05-4f67-abf1-2a1b424243be-image.png)

Le CNN, invece, usano un vettore di input fisso chiamato kernel.

![](/assets/images/CNN/dac9cc61-94e2-4fc2-afd7-f808c3e69683-image.png)

- Il kernel V viene applicato per ogni i.
- Si sposta lungo x della dimensione del kernel e viene applicato.
- Anche l'operazione di convoluzione, escludendo la funzione di attivazione, è una trasformazione lineare.


## Formule
Le formule per i casi continuo e discreto sono le seguenti.

![](/assets/images/CNN/5d4278b4-b3ad-4a7e-b1a7-c366f353ca83-image.png)

La convoluzione amplifica o attenua localmente un segnale per estrarre o filtrare informazioni.

### Cross-correlation
La cross-correlation è l'operazione di convoluzione unita con +. In pratica, la cross-correlation viene usata nell'implementazione delle CNN. Tradizionalmente la cross-correlation veniva chiamata convoluzione, ma sono operazioni diverse.

![](/assets/images/CNN/cac572e4-50de-4e96-b121-cd002a79f97e-image.png)

## Operazione di convoluzione
Translation invariant: il kernel non cambia mentre si sposta nel dominio.
Inoltre, il kernel viene applicato solo localmente al segnale.
undefined
undefined

## Esempio di convoluzione nelle immagini
Demo interattiva: https://setosa.io/ev/image-kernels/

## Formule di convoluzione multi-dimensionale
![](/assets/images/CNN/4e85d7a4-d0e5-48e7-9499-dcb922f48906-image.png)

## Applicare la convoluzione
![](/assets/images/CNN/b6a87966-6702-4afa-aed9-1e69713e7359-image.png)
- f è il kernel, g è l'input.
- Le coordinate per l'input sono (i, j).
- Nell'esempio, gli intervalli di p e q sono rispettivamente 0-1 e 0-1. Cioè, gli intervalli di p e q servono ad accoppiare ogni elemento del kernel con un elemento della matrice di input.
- Ogni coppia viene moltiplicata element-wise e sommata.
- Questo si ripete senza superare i confini dell'input.

## Stima della dimensione dell'output della convoluzione

![](/assets/images/CNN/4fbbe67b-beca-4be2-a6cd-0b4f7bff8ff8-image.png)
- Dimensione input = (H, W)
- Dimensione kernel = (KH, KW)
- Dimensione output = (OH, OW)

## Convoluzione 2D
Da 3 dimensioni in su, si parla di tensore, non di matrice.

![](/assets/images/CNN/3264d057-ee6f-4f83-8f31-a366f28a6f31-image.png)

Quando un input 2D entra con 3 canali, la convoluzione viene eseguita come mostrato sopra.
Si crea un kernel per ogni canale, e la convoluzione viene eseguita tra il kernel e l'input 2D di ogni canale. Poi tutti i risultati vengono sommati.

Illustrato graficamente:

![](/assets/images/CNN/7e7f2718-dafb-40a6-b2a7-cd9c97739c96-image.png)

Si preparano un kernel 3D e un input 3D. Naturalmente, sono diventati 3D perché abbiamo assunto dei canali per un input 2D.

Quando si esegue una convoluzione tra 3D e 3D, si produce un output 2D con 1 canale. Questo perché i kernel per tutti i canali sono stati preparati.

---

Se si vuole un output 2D con più canali invece di 1, basta creare più tensori kernel 3D e applicarli!

![](/assets/images/CNN/6453c204-1769-43d6-a8ff-a4c00c28c484-image.png)

## Backpropagation nelle CNN
Quando si calcola la backpropagation, compaiono anche le operazioni di convoluzione. Sembra complicato, ma la formula è la seguente.
![](/assets/images/CNN/a8a024e3-1a5a-4ec0-aaca-9050be6394d3-image.png)

- f: kernel
- g: segnale (input)
- Obiettivo: derivare la convoluzione di f e g

Per derivare rispetto a x, solo g contiene il termine x, quindi la derivata si applica solo a g.
In altre parole, come mostrato nella seconda riga della formula, _**diventa una convoluzione di f e la derivata di g!**_

Questo vale anche nel caso discreto.

### Esempio
![](/assets/images/CNN/df5ffcfb-ac63-410a-bf1e-3ee814bc3a47-image.png)
Supponiamo di eseguire una convoluzione con input e kernel come vettori. I risultati vengono memorizzati nel vettore di output.

---

![](/assets/images/CNN/be6d426a-0397-47d6-ae17-9d816e3f43e9-image.png)

Supponiamo che l'errore sia calcolato dalla loss function e la sua derivata abbia raggiunto il vettore di output tramite backpropagation.

Può confondere, ma guardando la figura sopra: X3 e W3 vengono moltiplicati per produrre O1. Allo stesso modo, X3 e W2 vengono moltiplicati per O2, e X3 e W1 per O3.

Nello stesso modo, le derivate vengono moltiplicate con W3, W2, W1 del kernel e consegnate a X3.

---
![](/assets/images/CNN/c8b6e862-5500-43de-b456-5645f26c1e10-image.png)

Il kernel viene aggiornato allo stesso modo, a quanto pare. Onestamente, non capisco bene questa parte...

---

![](/assets/images/CNN/4537f8cd-49f1-43f3-8ec1-d7f418761b78-image.png)
Mettendo tutto insieme, anche la backpropagation procede in modo identico a un'operazione di convoluzione!
