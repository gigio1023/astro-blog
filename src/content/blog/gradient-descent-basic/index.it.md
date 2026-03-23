---
title: "Basi del Gradient Descent"
description: "Basi del gradient descent: differenziazione, vettori gradiente, derivate parziali e operatore nabla."
date: "2021-08-03T18:23:37.780Z"
tags: ["ml"]
lang: it
translationOf: "gradient-descent-basic"
draft: false
---

Ho già organizzato questo argomento su Notion diverse volte, ma ecco un'altra passata incentrata su ciò che ho imparato al Boostcamp.

## Differenziazione
```
import sympy as sym
from sympy.abc import x

sym.diff(sym.poly(x**2 + 2*x + 3), x)
```

## Gradient Ascent (salita del gradiente)
f(x)
Si aggiunge la derivata a x per trovare la posizione del massimo locale della funzione.
Usato quando la funzione obiettivo deve essere massimizzata.

## Gradient Descent (discesa del gradiente)
f(x)
Si sottrae la derivata da x per trovare la posizione del minimo locale della funzione.
Usato quando la funzione obiettivo deve essere minimizzata.

### Algoritmo
```
# gradient: funzione che calcola la derivata
# init: punto di partenza
# lr: learning rate
# eps: epsilon

var = init
grad = gradient(var)
while (abs(grad) > eps):
	var = var - lr * grad
    grad = gradient(var)
```
L'obiettivo è che la derivata raggiunga 0, ma i computer non possono rappresentarlo esattamente. Quindi un valore reale molto piccolo, epsilon, viene usato come condizione di terminazione.

## Derivata parziale
Le variabili nel ML sono solitamente vettori, quindi servono le derivate parziali invece delle derivate ordinarie per stabilire la direzionalità.
Come si farebbe in un corso di analisi.

undefined

Qui, ei è un vettore unitario con 1 nella posizione i-esima e 0 altrove. Filtra solo la componente desiderata per la differenziazione.

### Vettore gradiente

#### Nabla
Quando la funzione prende un vettore come input, bisogna usare le derivate parziali, e il numero di variabili può diventare molto grande.

Quindi si raccolgono i risultati delle derivate parziali di tutte le variabili in un vettore e lo si usa per il gradient descent. Questo è chiamato vettore gradiente, e il suo vantaggio è permettere aggiornamenti simultanei su tutte le variabili.

undefined

Questo simbolo si chiama nabla.

#### Visualizzazione del vettore gradiente
![](/assets/images/Gradient descent 기본/8e486de8-6882-48bb-89bb-0778f81aa965-image.png)
![](/assets/images/Gradient descent 기본/7c31e669-58b0-43d4-bf3a-85f7b0118c64-image.png)

Le curve di livello rendono questo concetto facile da capire. Rispetto alle curve di livello, la direzione del vettore punta verso la diminuzione più rapida verso l'origine.

#### Algoritmo con vettore gradiente
```
# gradient: funzione che calcola il vettore gradiente
# init: punto di partenza
# lr: learning rate
# eps: epsilon

var = init
grad = gradient(var)
while (norm(grad) > eps):
	var = var - lr * grad
    grad = gradient(var)
```
Le differenze sono la definizione di gradient e l'uso di norm invece di abs nella condizione di terminazione.
