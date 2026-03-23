---
title: "RNN"
description: "Approfondimento sui tipi di RNN (one-to-one, one-to-many, many-to-many), modelli linguistici a livello di carattere e architetture LSTM/GRU."
lang: it
translationOf: "rnns"
date: "2021-09-07T04:06:29.529Z"
tags: ["nlp"]
draft: false
---

# RNN
![](/assets/images/RNNs/f1c02cc3-88bb-433c-b336-b3230a6be044-image.png)

Dati dei dati sequenziali come input/output, una rete che riceve l'input $x_t$ al tempo t e lo hidden state precedente $h_{t-1}$, e produce $h_t$ in output.

La cosa importante è che non compare un nuovo modello a ogni time stamp. Un singolo set di parametri A viene usato su tutti i time stamp.

La rappresentazione compressa a sinistra si chiama rolled diagram; quella che mostra i time stamp è l'unrolled diagram.

![](/assets/images/RNNs/7ac18831-58d8-4aff-8296-10ca8a6ad5a3-image.png)

Il diagramma appare come sopra.

- $h_t$: nuovo vettore di hidden state
- $f_w$: funzione RNN con parametri W.
  - W: matrice di trasformazione lineare
- $y_t$: vettore di output al time step t.
  - Calcolato usando $h_t$.
  - Può essere calcolato a ogni step, o solo alla fine -- è flessibile.
  - Es. il POS tagging richiede il calcolo a ogni step, mentre l'analisi del sentimento serve solo all'ultimo.

---
![](/assets/images/RNNs/ab88d030-736a-4ff8-a949-726b24ce4575-image.png)

$f_w$ è definita come una funzione non lineare come mostrato sopra. $W_{hh}$ e $W_{xh}$ sono separati da W nella formula, e possono essere intesi come derivati da un'unica matrice W come nella figura sotto.

![](/assets/images/RNNs/fbd27c87-8a6f-4b86-b2b0-84dcf56735be-image.png)

Poiché la dimensione di $h_t$ è un iperparametro, impostiamola a 2.

Per ricevere $x_t$ e $h_{t-1}$ in input e produrre $h_t$ in output, W deve avere forma (2, 5). Perché il prodotto scalare della concatenazione di $x_t$ e $h_{t-1}$ con W dà (2,1). Invece di tenere W come (2, 5), possiamo dividerlo al confine tra i cerchi rossi e verdi nella figura. Cioè, $x_t$ e $h_{t-1}$ hanno ciascuno il proprio W, e sommando i risultati dei prodotti scalari si ottiene $h_t$.

Quindi $W_{hh}$ trasforma $h_{t-1}$ in $h_t$, e $W_{xh}$ trasforma $x_t$ in $h_t$.

Con la stessa logica, $W_{hy}$ trasforma $h_t$ in $y_t$.

Per la binary classification, $y_t$ sarebbe un vettore 1-dimensionale (scalare). Si applica sigmoid per usare il risultato come probabilità prevista. Per multi-class, la dimensione di $y_t$ è uguale al numero di classi, e si applica softmax per ottenere una distribuzione di probabilità.

## Tipi di RNN
Le RNN possono gestire casi in cui uno o entrambi tra input/output sono dati sequenziali.
![](/assets/images/RNNs/5d5f1fa5-1da8-4a58-a081-da47d6c08237-image.png)
ref: http://karpathy.github.io/2015/05/21/rnn-effectiveness/

- one to one (rete neurale standard)
  - Né input né output sono dati sequenziali, con un singolo time step.
  - Stessa struttura di un DNN standard.
- one to many
  - L'input non è sequenziale, ma l'output è sequenziale su più time step.
  - Solo il primo step ha un input reale; i restanti ricevono tensor tutti a zero.
  - Es. Image captioning
- many to one
  - L'input avviene a ogni time step, con un singolo output alla fine.
  - Es. Sentiment classification
- many to many
  - I dati sequenziali vengono inseriti per time step, poi emessi per time step.
    - Es. Machine translation
  - Input e output a ogni time step.
    - Es. Video classification on frame level

# Modello linguistico a livello di carattere
Un modello linguistico (language model) predice la prossima parola basandosi sulla sequenza data di caratteri o parole.
Può essere eseguito sia a livello di parola che di carattere.

La costruzione di un modello linguistico a livello di carattere procede così:

> Esempio di sequenza di training: "hello"

1. Costruire un vocabolario unico a livello di carattere.
[h, e, l, o]
2. I caratteri nel vocabolario vengono rappresentati come vettori one-hot, come nel word embedding.
h = [1,0,0,0]
3. Inserire "hell" nella RNN in sequenza secondo la formula:
![](/assets/images/RNNs/9e7523f4-ac4b-426f-8c13-b698c0395df6-image.png)

Il punto chiave è che il prossimo carattere deve essere previsto a ogni time step. Quindi la RNN è impostata come many-to-many:
![](/assets/images/RNNs/0b4fb2b7-78b0-40b8-99b6-cd91fdf04cd1-image.png)

L'output si calcola come:

![](/assets/images/RNNs/d8dfdbb3-e15a-4be7-838f-b1726374c0c4-image.png)

Si chiama logit perché si usa softmax per la classificazione multi-classe.

## Inferenza

![](/assets/images/RNNs/2b482894-2652-4c16-a227-7498200b79d6-image.png)

Essendo una RNN, l'output di ogni time step può essere usato come input del time step successivo. Quindi basta dare 'h' come primo input e lasciare che il resto venga generato automaticamente.

# Training sulle opere di Shakespeare
![](/assets/images/RNNs/87087f1d-e4e0-46d8-9bbf-e3a7dcb8027a-image.png)
Il metodo usato a livello di carattere può essere applicato anche al testo. Si costruisce un vocabolario a livello di parola, includendo tutta la punteggiatura -- virgole, '\n', spazi, tutto. Così si può costruire un semplice language model con RNN.

![](/assets/images/RNNs/c85437f6-18b7-49ce-bc3e-87a65aed9c40-image.png)

Man mano che il training procede, le frasi generate a partire da un primo carattere diventano più naturali.

# Altri esempi
- Apprendere opere teatrali per distinguere personaggi e battute.
- Addestrare su paper in LaTeX per generare nuovi paper in inferenza.
- Addestrare su codice C per generare codice.

# BPTT (Backpropagation through time)
![](/assets/images/RNNs/cb149f49-78af-4aa4-aabc-1f85d98d1dde-image.png)
Sarebbe ideale usare tutte le loss per il training, ma le sequenze sono di solito troppo lunghe. Quindi tutti i dati vengono usati per il training, ma la loss viene presa solo da certi segmenti per la backpropagation.

# Come funziona la RNN
Si può tracciare come la RNN apprende. L'hidden state contiene tutte le informazioni precedenti al tempo t. Quindi tracciare come l'hidden state cambia rispetto al suo stato iniziale rivela come la RNN apprende.

I risultati qui sotto provengono da LSTM e GRU (non vanilla RNN) e mostrano i cambiamenti dell'hidden state.

Il rosso indica che una cella specifica nell'hidden state diventa più negativa; il blu che diventa più positiva.
![](/assets/images/RNNs/f7afb1a3-0e5e-41f9-8e90-f36f49e49c21-image.png)
Tracciando la cella responsabile del rilevamento delle virgolette nell'hidden state, si ottiene il risultato sopra.
![](/assets/images/RNNs/f32e3afc-5d82-45b7-8186-480ac42e793e-image.png)
L'hidden state della cella che gestisce gli if statement è cambiato come sopra.

# Vanishing/Exploding gradient nelle RNN
![](/assets/images/RNNs/bd0cb95e-ec84-4b7f-8b65-5f6c1c4efede-image.png)

La RNN in sé è solida, ma i problemi emergono nella backpropagation. Le formule della RNN coinvolgono la moltiplicazione ripetuta di $W_h$ e il passaggio attraverso funzioni di attivazione. Questa moltiplicazione ripetuta fa sì che i gradienti crescano senza limiti se maggiori di 1, o si riducano verso zero se minori di 1.

![](/assets/images/RNNs/266292dc-8f0c-4fe6-8bda-505a4d5be1ce-image.png)

Per un esempio semplice, pensiamo a W come uno scalare. Per ottenere il gradiente di h3, si differenzia. Calcolare il gradiente rispetto a h1 richiede di applicare la regola della catena 3 volte, e $w_{hh}$ (valore 3) viene moltiplicato 3 volte come parte del gradiente. Per una sequenza più lunga, il gradiente sarebbe proporzionale a una potenza ancora maggiore di 3. Se $w_{hh}$ fosse minore di 1, i valori si ridurrebbero drasticamente.

Il risultato è che il valore generato in h3 dovrebbe propagarsi bene fino a h1, ma invece i gradienti convergono verso infinito o zero.
