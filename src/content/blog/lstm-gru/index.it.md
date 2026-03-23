---
title: "LSTM, GRU"
description: "Spiegazione dettagliata delle architetture LSTM e GRU, coprendo meccanismi dei gate, cell state e come risolvono il problema delle dipendenze a lungo termine delle RNN."
date: "2021-09-07T06:49:00.329Z"
tags: ["nlp"]
lang: it
translationOf: "lstm-gru"
draft: false
---

# LSTM
Long short-term memory.

Un modello che risolve il problema della dipendenza a lungo termine delle RNN. Progettato per propagare meglio le informazioni da time step distanti.

Il nome deriva dal fatto che lo hidden state viene trattato come un elemento di memoria a breve termine, progettato per sopravvivere per un periodo più lungo.

RNN originale:
$h_t=f_w(x_t, h_{t-1})$

![](/assets/images/LSTM, GRU/7ea559fc-a17b-4a5f-aee0-84c7217836fd-image.png)

LSTM:
cell state ($C_t$): uno state che contiene tutte le informazioni precedenti.
hidden state ($h_t$): uno state che contiene le informazioni da esporre solo allo step corrente.
$C_t, h_t=LSTM(x_t, C_{t-1}, h_{t-1})$

![](/assets/images/LSTM, GRU/ac01efbd-be4a-468e-bf62-51229c235589-image.png)

Il risultato della trasformazione lineare di $x_t$ e $h_{t-1}$ viene passato attraverso le rispettive funzioni di attivazione per produrre input gate, forget gate, output gate e gate gate (?).

Se h è la dimensione di $x_t$ e dello hidden state, allora W è (4h, 2h). La dimensione delle colonne è 2h perché bisogna trasformare linearmente x e lo hidden state insieme. La dimensione delle righe è 4h in modo che il risultato possa essere usato direttamente come i, f, o, g.


Le probabilità ottenute tramite sigmoid vengono moltiplicate element-wise con lo hidden state, agendo di fatto come pesi.

## Forget gate
![](/assets/images/LSTM, GRU/bdc68075-8b6c-4f1e-b6dd-901317b552d2-image.png)
![](/assets/images/LSTM, GRU/91210f85-3b3f-4580-80a3-3cfcada828ef-image.png)

$h_{t-1}$ e $x_t$ vengono concatenati, combinati linearmente con W, e poi passati attraverso sigmoid. Il risultato viene moltiplicato con il cell state per determinare quanta parte dei valori del cell state preservare. In altre parole, decide quanta informazione dimenticare.

## Gate gate
![](/assets/images/LSTM, GRU/e03ef103-303b-42e0-bf51-7d5aa1c05d9e-image.png)
![](/assets/images/LSTM, GRU/ca1652db-356f-44c7-9a1c-f6b3eb1af438-image.png)
$\tilde{C_t}$ è il gate gate. Genera nuove informazioni.

$i_t$ è l'input gate. Come il forget gate, ha valori passati attraverso sigmoid. Determina quanta parte di $\tilde{C_t}$ applicare a $C_t$.
![](/assets/images/LSTM, GRU/5720ab0d-448f-40f0-9989-a387670a3c75-image.png)
Il cell state viene aggiornato. Il primo termine è il prodotto del forget gate e del cell state precedente visto prima. Si aggiunge il prodotto dell'input gate e del gate gate.

Il motivo per cui si crea un input gate separato e lo si moltiplica con il gate gate è che una singola trasformazione lineare non basta a produrre il risultato desiderato. In altre parole, input gate e gate gate insieme facilitano la manipolazione delle informazioni da aggiungere.

## Output gate
![](/assets/images/LSTM, GRU/3a97d88c-cda9-482d-8450-0eccf4581c42-image.png)
![](/assets/images/LSTM, GRU/8dd2d712-9343-47cb-b421-8315284df0cc-image.png)

L'output gate viene calcolato per primo per generare $h_t$. Viene usato per ridurre ogni dimensione del cell state di una proporzione appropriata.
Nella LSTM, $h_t$ è il valore usato direttamente per l'output al time step corrente. Si può pensare come informazione filtrata da $C_t$, rilevante solo per il time step t corrente.

Per esempio, supponiamo di avere un modello con "hello" come dati di training e di eseguire l'inference dopo l'addestramento. Se si dà "h" al modello, la combinazione lineare di $h_t$ con $W_y$ produce "e", che diventa l'input per lo step successivo.

## Backpropagation
A differenza delle RNN, la LSTM combina le informazioni tramite addizione come mostrato sotto.
![](/assets/images/LSTM, GRU/5720ab0d-448f-40f0-9989-a387670a3c75-image.png)

Questo significa che il gradient vanishing/exploding non si verifica per esponenziazione ripetuta anche con sequenze lunghe.



# GRU (Gated Recurrent Unit)
Una rete progettata per usare meno memoria della LSTM. Viene usata molto perché le prestazioni sono simili o a volte migliori della LSTM.

![](/assets/images/LSTM, GRU/40e9cc2e-7594-48b6-ba86-31a1742e8c9d-image.png)
![](/assets/images/LSTM, GRU/9b14177c-2e51-4987-9e77-2e45045300b1-image.png)

Nella LSTM, il forget gate e l'input gate controllano rispettivamente la quantità di informazione eliminata e creata. Nella GRU, $z_t$ viene calcolato una sola volta, e $1-z_t$ viene usato come forget gate mentre $z_t$ viene usato come input gate.

Inoltre, il cell state e lo hidden state della LSTM vengono implementati con un singolo hidden state nella GRU. In altre parole, lo hidden state della GRU contiene tutte le informazioni precedenti e contribuisce direttamente all'output dello step corrente.
