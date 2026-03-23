---
title: "Attention"
description: "Spiegazione del meccanismo di attention nei modelli Seq2Seq, con attention vector, context vector, teacher forcing e funzioni di similarità."
date: "2021-09-08T05:27:10.397Z"
tags: ["nlp"]
lang: it
translationOf: "attention"
draft: false
---

# Seq2Seq con Attention
## Seq2Seq con LSTM
![](/assets/images/Attention/9c2dbb21-b1cb-4dbe-b29d-83e2a10a52a8-image.png)
Seq2Seq rientra nella categoria many-to-many delle architetture RNN. Sia input che output sono sequenze a livello di parola.

![](/assets/images/Attention/d54bf9f7-62ce-47ce-8e87-9677b39e0ab3-image.png)
Il diagramma sopra mostra un dialog system (es., chat bot). La parte che riceve la frase in input è l'encoder; la parte che genera la frase in output è il decoder.
Il modello RNN usato è LSTM. L'hidden state dell'ultimo step dell'encoder diventa l'hidden state in input del decoder.

**SoS (Start of Sentence)**
Rappresenta il primo token della frase generata. SoS è gestito separatamente nel vocabulary e viene inserito come primo input al decoder durante l'addestramento.

**EoS (End of Sentence)**
Rappresenta l'ultimo token della frase generata. Specifica quando smettere di generare.

### Problema
Tutte le informazioni dell'encoder devono essere archiviate in un hidden state a dimensione fissa. Quindi anche se LSTM affronta le dipendenze a lungo termine, all'allungarsi della sequenza le informazioni precedenti tendono a perdersi o distorcersi.

Per esempio, in una frase come 'I go home', il soggetto andrebbe riconosciuto per primo. Ma dato che i soggetti appaiono tipicamente all'inizio della frase, quell'informazione può degradarsi verso la fine, causando problemi al decoder nella generazione del soggetto.

**Soluzione parziale**
Invertire l'ordine della frase. Trasformare 'I go home' in 'home go I' per posizionare le informazioni importanti alla fine. Non è una soluzione fondamentale.

**Soluzione**
Usare tutti gli hidden state generati ad ogni step.

## Seq2Seq con Attention
![](/assets/images/Attention/8e1cec15-3962-4998-9ca1-20e2067e5c27-image.png)

Si tratta di un task di traduzione dal francese all'inglese.

L'encoder genera un hidden state ad ogni step, come nel Seq2Seq standard. L'hidden state dell'ultimo step dell'encoder diventa l'hidden state in input del primo step del decoder.

Per determinare quali hidden state dell'encoder servono, si calcola il prodotto scalare tra ogni $h_n^{(e)}$ dell'encoder e $h_1^{(d)}$ del decoder. Nel diagramma sopra, verrebbero calcolati 4 risultati di prodotto scalare individualmente.
I risultati del prodotto scalare si possono interpretare come similarità tra hidden state.

Applicando softmax ai risultati del prodotto scalare (trattandoli come logit) si ottengono probabilità. Queste probabilità vengono usate come pesi applicati a $h_n^{(e)}$.

**Attention vector**
Questo vettore di pesi risultante che somma a 1 si chiama attention vector.

Una media pesata degli $h_n^{(e)}$ usando questi pesi produce un singolo vettore di output dell'attention. Questo risultato è anche chiamato context vector.

In sintesi, le informazioni di cui l'hidden state del decoder ha bisogno vengono selezionate e combinate dagli hidden state dell'encoder.

**Modulo attention**
La parte racchiusa dalle linee verdi nel diagramma è il modulo attention. Riceve in input gli hidden state dell'encoder e calcola un singolo output dell'attention.

---

![](/assets/images/Attention/d755fe74-abab-410d-b20b-2830471c1c74-image.png)

L'hidden state del decoder e il context vector (output dell'attention) vengono concatenati per diventare l'input dell'output layer. Così si predice la parola successiva.

---

![](/assets/images/Attention/dfb30e3e-37fe-4a6d-9d9b-c646060de16e-image.png)

Il secondo step del decoder ripete lo stesso processo. Il decoder riceve $h_1^{(d)}$ come hidden state in input e 'the' come input, producendo $h_2^{(d)}$.

---

![](/assets/images/Attention/73af7d13-0fc7-4b75-acdf-6b6d71d6f729-image.png)

La ripetizione continua finché l'output produce un token di fine (EoS).

### Hidden state del decoder
L'hidden state vector del decoder deve svolgere due ruoli.
- Determinare su quali hidden state dell'encoder concentrarsi.
  - = Deve contenere le informazioni per creare l'attention vector.
- Servire come input all'output layer per la predizione.

L'addestramento del decoder viene condotto in modo che possa svolgere entrambi i ruoli simultaneamente.

![](/assets/images/Attention/4f7d2d84-4b42-4f8a-8d8c-8c0d9e17f886-image.png)

Quindi la backpropagation segue il percorso viola mostrato nel diagramma sopra.

### Teacher forcing
Nel teacher forcing, l'input del decoder durante l'addestramento è il ground truth. In altre parole, anche se il modello predice male la parola successiva durante l'addestramento, il ground truth serve a correggere.

### Misurazione della similarità
Oltre al semplice prodotto scalare, la similarità può essere calcolata in diversi modi.
![](/assets/images/Attention/23a5d9f8-9ec3-46b9-a68e-28b6f637a4dd-image.png)
- $score$: funzione di similarità
- $h_t$: hidden state del decoder
- $\bar h_s$: hidden state dell'encoder

$general$
Si introduce una matrice di pesi $W_a$ nel prodotto scalare. Si può pensare come assegnare pesi ai singoli elementi della moltiplicazione nella moltiplicazione matriciale.

$\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} x & y \\ z & v \end{pmatrix}$
Per esempio, il prodotto matriciale sopra è composto da termini come $ax+bz$, $ay+bv$, ecc.

Si assegnano pesi a ogni elemento: $w_0(ax+bz)$, $w_1(ay+bv)$, ecc. — aggiungendo una variabile regolabile a ogni elemento del prodotto matriciale. Nel deep learning, questo crea parametri apprendibili.

$concat$
In $[h_t;\bar h_s]$, il punto e virgola indica la concatenazione tra matrici. Guardando la formula, il termine avvolto in tanh assomiglia a una rete neurale — e lo è.
![](/assets/images/Attention/058b4e88-3af5-421a-97df-14e6060f9d20-image.png)

Se $h_t=[1,3]$ e $\bar h_s=[2, -5]$, la rete si costruisce come mostrato sopra. W1 e W2 rappresentano reti fully connected.

Nella formula, W2 è denotato $v_a$. Questo perché l'ultimo layer della rete deve produrre uno scalare, quindi W2 deve essere un vettore. Nel diagramma, il vettore a 3 dimensioni deve essere ridotto a uno scalare, quindi anche W2 deve essere un vettore a 3 dimensioni.

---
**Perché diversificare i metodi di misurazione della similarità?**
Rispetto al semplice prodotto scalare, si introducono più parametri regolabili durante l'addestramento. Questi parametri aggiuntivi sono fortemente coinvolti nel calcolo dell'attention vector.

In altre parole, incorporando variabili nella misurazione della similarità, il modello può anche apprendere il processo di calcolo dell'attention vector.

# Vantaggi dell'Attention
- Ha migliorato drasticamente le prestazioni della traduzione automatica.
  - A differenza del Seq2Seq precedente, ha creato un ambiente in cui il decoder può concentrarsi su informazioni specifiche.
  - Ha risolto il problema delle frasi lunghe tradotte male.
- L'attention risolve il problema del bottleneck.
  - Ha risolto i problemi derivanti dal condensare tutte le informazioni precedenti in un singolo hidden state.
  - Il decoder può accedere direttamente alle informazioni sorgente.
- L'attention risolve il gradient vanishing.
![](/assets/images/Attention/f1dd8188-220a-4ed4-8b92-8f1dc68a1bb7-image.png)
  - In precedenza, la backpropagation propagava la loss sequenzialmente attraverso decoder ed encoder (percorso rosso nel diagramma sopra).
Il fenomeno del bottleneck si verifica anche qui. In particolare, se si vogliono aggiornare gli hidden state nei primi step dell'encoder, la backpropagation deve andare molto in profondità.
  - Con l'attention, questo processo di propagazione si semplifica (percorso blu nel diagramma). L'output dell'attention crea percorsi tipo scorciatoia nella backpropagation.
- L'attention fornisce una certa interpretabilità.
  - Conoscendo la distribuzione dell'attention vector per un input specifico, si può capire su quali informazioni il decoder si sta concentrando.

# Esempi di Attention
![](/assets/images/Attention/c463036d-526d-4af1-af66-0e6ada2785ac-image.png)
Un esempio di traduzione dal francese all'inglese usando l'attention. Traduce bene in ordine, e per le frasi in cui l'ordine delle parole cambia, il meccanismo di attention rileva automaticamente il riordinamento e gestisce la traduzione.
Una traduzione end-to-end eseguita automaticamente.
