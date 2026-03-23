---
title: "Bag-of-Words"
description: "Introduzione alla rappresentazione del testo con Bag-of-Words, one-hot encoding e classificazione Naive Bayes."
date: "2021-09-06T07:04:30.522Z"
tags: ["nlp"]
lang: it
translationOf: "bag-of-words"
draft: false
---

# Bag-of-Words
Una tecnica pre-deep learning per rappresentare le parole come numeri.

## Rappresentazione Bag-of-Words
### 1. Costruzione del vocabulary contenente parole uniche.
Anche se una parola appare in piu frasi, nel vocabulary appare una sola volta.

### 2. Codifica delle parole uniche in vettori one-hot.
Le parole nel vocabulary possono essere viste come dati categorici, quindi le rappresentiamo come vettori one-hot.
![](/assets/images/Bag-of-Words/0911f986-9d47-4272-a180-667181a756de-image.png)
Per esempio, se il vocabulary ha 8 parole, si costruiscono vettori one-hot a 8 dimensioni.
Per qualsiasi coppia di parole, la distanza euclidea e $\surd2$.
Per qualsiasi coppia di parole, la cosine similarity e 0. Perche tutte le combinazioni di prodotto scalare sono 0.

In altre parole, tutte le parole sono rappresentate con relazioni identiche indipendentemente dal loro significato.

## Vettore Bag-of-Words
Una volta rappresentate le parole come vettori one-hot, anche le frasi possono essere rappresentate come vettori one-hot.
![](/assets/images/Bag-of-Words/a5d5e957-3c06-436d-b28c-422c8c07d31f-image.png)
Rappresentare una frase come la somma dei vettori one-hot di tutte le sue parole — questo e il vettore Bag-of-Words.

# Classificatore Naive Bayes
Un metodo per classificare un vettore Bag-of-Words (che rappresenta una frase o un documento) in una categoria specifica.

d: documento
c: classe
![](/assets/images/Bag-of-Words/5a1987f6-0614-47e6-ae2a-4e651b8be5ab-image.png)

- P di c, dato d.
  - MAP: Maximum a posteriori = classe piu probabile. Selezionare la classe c con la probabilita piu alta in $P(c|d)$.
- Trasformabile nella seconda formula tramite la regola di Bayes.
  - $P(d)$ e la probabilita di estrarre un documento specifico, trattata come costante. Ignorandola si ottiene la terza formula.


---
![](/assets/images/Bag-of-Words/05b9f810-99a1-4b0c-ae25-03e056a69623-image.png)

- $P(d|c)$: probabilita del documento d data la categoria c fissa.
- d puo essere visto come l'evento in cui le parole w1, ..., wn appaiono simultaneamente.
- Quindi la formula puo essere trasformata come mostrato a sinistra.

Cioe, se possiamo stimare $P(c)$ e $P(w_i|c)$, possiamo stimare tutti i parametri necessari per il classificatore Naive Bayes.

## Applicazione
1. Calcolare $P(c)$ e $P(w_i|c)$ per tutti i casi possibili.
2. Per nuovi input, usare i dati del passo 1 per calcolare $P(c)$ e $P(w_i|c)$ per categoria.
3. Calcolare l'argmax.

## Limite
Se l'input contiene parole non presenti nei dati di addestramento, $P(w_i|c)$ diventa 0 per quelle parole. Quindi anche se altre parole sono fortemente correlate a una classe specifica, tutte le probabilita delle classi possono diventare 0.

=> Risolto tramite regolarizzazione.

## Calcolo effettivo
$P(c)$ e $P(w_i|c)$ possono essere calcolati semplicemente contando, ma nella pratica si usano metodi come MLE.
