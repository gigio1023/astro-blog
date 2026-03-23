---
title: "Convoluzione"
description: "Fondamenti della convoluzione: stride, padding, conteggio parametri e convoluzioni 1x1."
date: "2021-08-11T02:38:17.395Z"
tags: ["computer-vision", "dl"]
draft: false
lang: it
translationOf: "convolution"
---

# Convoluzione
## Nelle formule
![](/assets/images/Convolution/16f95e55-0d06-4a25-8612-e9a2c24b3391-image.png)


## Ruolo
![](/assets/images/Convolution/a2f9a130-941f-40ca-b403-7f470c47227c-image.png)

Permette di estrarre le feature desiderate.

Ad esempio, supponiamo di usare un kernel (3,3) dove tutti i valori sono 1/9. Diventa un'operazione di convoluzione che calcola la media.


## Tensore
![](/assets/images/Convolution/97633dcb-6c37-4aeb-b0aa-510479566d02-image.png)
Consideriamo un'immagine RGB con 3 canali. Per applicare un filtro (5,5) a questa immagine, si pensi ad applicare un filtro con 3 canali.

---
![](/assets/images/Convolution/a03d1561-9ab1-445d-8d2f-0885ed464fd2-image.png)
Ad esempio, applicando 4 filtri (5,5,3) a un'immagine RGB come sopra, si producono 4 feature (28,28) ciascuna con 1 canale.

## Stack di convoluzioni
![](/assets/images/Convolution/46095895-ee37-4209-b73e-22e11585427a-image.png)
Come in MLP, i layer vengono impilati passando attraverso una funzione non lineare.

## Convoluzione e reti neurali
![](/assets/images/Convolution/4c8b200f-4e9a-4564-b507-1dfc06dc1085-image.png)

La figura sopra mostra la CNN più classica.

Layer di convoluzione e pooling: estrazione delle feature
Fully connected layer: processo decisionale (es. classificazione, regressione)

La tendenza attuale è ridurre i fully connected layer.
Perché ridurre il numero di parametri facilita il training e migliora le performance di generalizzazione.


## Stride
Il kernel si sposta della quantità dello stride durante la convoluzione.
![](/assets/images/Convolution/4c218f92-54e5-452e-b82b-aa6a57263122-image.png)
Essendo 1D, anche il valore dello stride è 1D.

## Padding
La convoluzione non può essere eseguita ai bordi. Quindi si riempiono con valori arbitrari e si esegue la convoluzione sui bordi dell'immagine.
es., zero padding = riempire l'area di padding con 0.

![](/assets/images/Convolution/fb631b17-d4ed-4a22-9abe-c283be6819a5-image.png)

Con il padding, le dimensioni spaziali di input e output possono corrispondere.

undefined


## Conteggio dei parametri
_**Parametri di un'operazione di convoluzione = parametri del kernel**_

![](/assets/images/Convolution/c06d473c-8998-4c5e-a6d0-98fb68716177-image.png)
Padding(1), Stride(1), kernel 3x3

1. Diciamo kernel 3x3, ma come menzionato prima, il canale del kernel corrisponde al canale dell'input.
2. Quindi usiamo un kernel (3,3,128).
3. La convoluzione del kernel con i canali allineati all'input produce sempre 1 canale.
4. L'output ha 64 canali.
5. Quindi devono esistere 64 kernel (3,3,128).

**_Avere un senso approssimativo del numero di parametri attraverso questo processo è importante!_**


### Alexnet
![](/assets/images/Convolution/256bdb1a-f78b-4c3b-8b33-3f7e51c8264c-image.png)

Il numero di parametri tra layer di convoluzione e layer dense è vastamente diverso!
Le ragioni:
- La convoluzione condivide gli stessi pesi attraverso il kernel.
  - Lo stesso kernel viene usato indipendentemente dalla posizione dell'elemento nell'immagine di input.
- I layer dense hanno pesi diversi per ogni nodo, come sappiamo.

## Convoluzione 1x1
![](/assets/images/Convolution/3ec4885a-0cb6-4f6b-b6fc-93b2fd68161b-image.png)

La convoluzione 1x1 non può vedere una regione. Ovviamente -- è un kernel che ripete la convoluzione solo su un'area 1x1.

Ma può servire ai seguenti scopi:
- Riduzione dei canali (dimensioni)
- Riduzione attesa dei parametri quando la profondità aumenta
- es., bottleneck architecture
