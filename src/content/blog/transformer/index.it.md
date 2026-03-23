---
title: "Transformer"
description: "Concetti fondamentali del modello Transformer: self-attention dell'encoder, embedding Query/Key/Value e meccanica della multi-head attention."
date: "2021-08-13T11:44:01.736Z"
tags: ["dl", "nlp"]
draft: false
lang: it
translationOf: "transformer"
---

# Background
![](/assets/images/Transformer/37e659a6-c48b-4b2c-8c81-068ef440e09b-image.png)
Le RNN esistenti potevano gestire dati sequenziali, ma gestire sequenze con elementi mancanti (come sopra) era molto difficile.

Il Transformer è stato introdotto per affrontare questo problema.

# Transformer
![](/assets/images/Transformer/8b722957-5374-445d-9961-20321bb984e9-image.png)
Nessuna struttura ricorrente come nelle RNN.

> Transformer is the first sequence transduction model based entirely on attention.

![](/assets/images/Transformer/ab8c26e4-1542-44a2-bbf6-4fc6e4f02531-image.png)

In origine era un modello per la traduzione automatica. Ma dato che il Transformer è una metodologia per elaborare dati sequenziali e codificarli, può essere usato anche in altri ambiti.

Recentemente, Transformer e self-attention vengono usati in praticamente ogni campo.

---

![](/assets/images/Transformer/24a4aa82-d54d-4f0a-bf88-0ba3197a0dc4-image.png)

Il Transformer è un modello sequence-to-sequence come mostrato sopra. Vediamolo più da vicino.

![](/assets/images/Transformer/a811cfb8-f62f-411a-8961-40a2a4a11bb9-image.png)

A differenza delle RNN, non c'è ricorrenza. Se 3 parole fossero l'input di una RNN, ricorrerebbe 3 volte per produrre l'output.

Ma il Transformer produce i vettori di encoding tutti insieme in un'unica passata, indipendentemente dal fatto che ci siano 3 o 100 parole. Il lato output usa comunque qualcosa di autoregressivo.

## Concetti chiave del transformer
1. Come vengono elaborate n parole contemporaneamente durante l'encoding?
2. Quali informazioni fluiscono tra encoder e decoder?
3. Come genera l'output il decoder?

## Encoder
![](/assets/images/Transformer/cb9c346a-c68c-4bfa-9b24-a6d7bf35067f-image.png)
Riceve tutti i vettori in input. La self-attention ha un ruolo chiave sia nell'encoder che nel decoder. La feed-forward NN che segue è il classico MLP.

![](/assets/images/Transformer/f3e9366d-3ce0-48af-bcd1-0d92a51a1b28-image.png)

- La self-attention riceve n vettori.
- Per trasformare il vettore di input $$x_1$$ in $$z_1$$, vengono usati tutti i vettori $$x$$.
  - Tutti i percorsi per creare i vettori $$z$$ sono interdipendenti.
- Quando $$z$$ passa attraverso la feed-forward NN, viene elaborato in parallelo, indipendentemente.

### Self-attention
Per analizzare la frase seguente, si costruisce una rete dipendente come questa:
> The animal didn't cross the street because it was too tired.

![](/assets/images/Transformer/9cfedf74-f126-414c-8cfb-485a6e39769e-image.png)

Gli esseri umani capiscono naturalmente che "it" si riferisce ad "animal." Quando si apprende tramite self-attention, si mostra una forte dipendenza vicino ad "animal" come nell'immagine.

---
![](/assets/images/Transformer/f75e4df3-dd97-4e1b-933a-efa3d0f1d6e8-image.png)

I vettori Query, Key, Value sono calcolati per ogni parola (= embedding). Un embedding produce un query, un key e un value.

### Calcolo dell'encoder
![](/assets/images/Transformer/4cad27c6-d8e9-4825-ab5a-7e30919afc82-image.png)

Dalla lezione, spiegarlo a parole è davvero difficile, ma la matematica è semplice.

A parole:

- score = prodotto interno di query e key
- $$d_k$$ = dimensione del vettore key
- risultato softmax = softmax applicata allo score diviso per $$d_k$$
- somma = risultato softmax x value

---

In matrici e formule:

![](/assets/images/Transformer/174006cd-4e94-4ca8-bf0d-5c12a63a68b0-image.png)

L'input X è rappresentato come matrice.
- riga = numero di parole
- colonna = dimensione dell'embedding

Moltiplicando X per matrici di pesi separate per query, key e value si ottengono Q, K, V.
- dimensione dell'attention = dimensione del vettore key

![](/assets/images/Transformer/0297aadc-ab19-4430-9215-f6e9e9838a34-image.png)

Il resto segue la spiegazione verbale direttamente in forma di formula.
- softmax = softmax per riga (row-wise)
- dim(V) può differire da dim(Q) e dim(K).
  - In pratica, di solito sono tutte uguali per comodità.

## Caratteristiche del Transformer
MLP e CNN producono output fissi per input fissi.

Ma nel Transformer, anche se un input è fisso, input circostanti diversi possono cambiare l'output. Questo significa che può rappresentare molte più cose, ma richiede anche più calcolo, quindi la lunghezza dell'input non può crescere senza limiti.

## MHA (Multi-Head Attention)
![](/assets/images/Transformer/23f522ce-9a99-4266-9e8c-3102566ffd38-image.png)
Invece di un singolo set, si creano più set di query, key e value per ogni input.

![](/assets/images/Transformer/e522aaa3-90fe-48e9-a332-97783365a516-image.png)

Applicare n attention head a un input produce n output.

La sfida principale è far corrispondere le dimensioni di input e output. Si risolve concatenando i risultati e moltiplicando per una matrice che proietta nella dimensione dell'input.

![](/assets/images/Transformer/31bb0018-27dd-45bb-b03c-25b45b9c3601-image.png)

Riassumendo l'intero processo:

![](/assets/images/Transformer/58cdf471-cb08-4b0f-9019-9acc569c0b02-image.png)
ref: https://jalammar.github.io/illustrated-transformer/

In teoria basta il diagramma sopra, ma l'implementazione reale è diversa. Per esempio, se l'input X ha 100 dimensioni, potrebbe essere diviso in 10 parti. Lo spiegherò nel post pratico.

### Positional encoding
![](/assets/images/Transformer/51001f08-e95a-4719-ad4c-9dbf1f7bb08d-image.png)
Si aggiunge un valore all'input, simile a un bias. Serve perché la variazione dipendente dalla posizione è importante. Senza positional encoding, riordinare una frase sarebbe impercettibile. Quindi il positional encoding cattura le informazioni sull'ordine.

## Panoramica dell'Encoder
![](/assets/images/Transformer/867da571-5a53-4c73-ad1f-d7a71ffcd677-image.png)

## Flusso di informazioni tra Encoder e Decoder
![](/assets/images/Transformer/e1a15fb5-6fe2-488a-ad0b-57c03a7b16e5-image.png)

undefined

GIF che mostra le informazioni dell'encoder che passano al decoder.

- L'encoder invia key e value al decoder.
- L'encoder calcola il prodotto interno tra query e key delle altre parole per creare l'attention, poi moltiplica per value. Per ottenere la attention map servono key e value.
  - Perché il decoder crea il proprio query dal proprio input.
- Dato che gli encoder sono impilati, i layer superiori producono le parole. (?)
- La frase di output viene generata in modo autoregressivo.

## Decoder
### Self-attention
![](/assets/images/Transformer/c840c282-b382-4b8c-8347-8fc6f6823bb0-image.png)
Prima del passo softmax, viene applicata una maschera alle informazioni future. Apprendere tramite il decoder conoscendo il futuro non ha senso, quindi si rende accessibile solo l'informazione precedente.

### Encoder-Decoder attention
![](/assets/images/Transformer/0c19f826-55be-4244-9c09-16533aa0734a-image.png)
Come menzionato sopra. Il layer "Encoder-Decoder Attention" funziona come MHA, eccetto che: la query viene dalla matrice di output del layer precedente, e key e value vengono dallo stack dell'encoder.

### Layer finale
![](/assets/images/Transformer/fcd7e32f-79d7-409c-80ff-ba7aca93e3a1-image.png)

Lo chiamo "layer finale" per comodità. L'output dello stack di decoder viene convertito in una distribuzione di parole.

# Vision Transformer
![](/assets/images/Transformer/d27b5896-f7aa-4bc3-9807-639d6b851e41-image.png)
Il paper originale del Transformer era per la traduzione automatica, ma è stato adottato anche in CV.

Le immagini vengono divise in patch, passano attraverso un embedding simile a quello delle parole, e poi attraverso il Transformer.

# DALL-E
![](/assets/images/Transformer/a40c33fa-64d6-451b-9b7a-1764e2c151d4-image.png)

Un paper che genera immagini dal testo. Usa GPT-3.
