---
title: "Introduzione al Transformer"
description: "Introduzione all'architettura Transformer: self-attention con Query/Key/Value, scaled dot-product attention e come supera i limiti delle RNN."
date: "2021-09-13T09:25:25.569Z"
tags: ["nlp"]
draft: false
lang: it
translationOf: "transformer-introduction"
---

Prima del paper 'Attention is all you need' (2017), l'attention era solo un componente aggiuntivo per LSTM e GRU. Quel paper ha eliminato completamente il modello RNN esistente e ha proposto un nuovo modello Seq2Seq basato esclusivamente sull'attention.

# RNN esistenti
![](/assets/images/Transformer 도입/6db7e06a-32fe-4da2-9829-fe67bf7b4796-image.png)

La sequenza viene ricevuta token per token ad ogni step. Ad ogni step, lo hidden state viene codificato e prodotto in output. L'attention veniva usata anche per pesare le informazioni degli step precedenti, determinando quanta informazione passata usare allo step corrente.

Ma a causa della proprietà intrinseca delle RNN di avere tempi di elaborazione proporzionali alla lunghezza della sequenza, problemi fondamentali come la long-term dependency e il gradient vanishing/exploding non potevano essere risolti completamente.

# RNN bidirezionali
![](/assets/images/Transformer 도입/c77a3d16-d4ae-4354-8c2e-d1813138d51b-image.png)
Le RNN esistenti non possono usare informazioni sugli step futuri negli step precedenti. Nella Forward RNN sopra, 'I' non può accedere a informazioni su 'go' o 'home'. Ma esistono contesti che richiedono informazioni successive, quindi sono state considerate le Backward RNN.

L'idea è apprendere in parallelo con la sequenza invertita. Nell'esempio sopra, per 'go' si ottengono due hidden state: $h_2^f$ e $h_2^b$. Concatenandoli semplicemente si ottiene un nuovo hidden state di dimensione doppia.

# Transformer
## Self-attention
![](/assets/images/Transformer 도입/d2a126d4-f92e-494d-9566-8ed18f4eaad6-image.png)
(Figura 1)

Supponiamo che i vettori di input esistano come mostrato sopra. Il Transformer crea vettori di encoding che riflettono bene i contenuti della sequenza, nello stesso formato dei vettori di input.

Se vediamo questa figura come un decoder, allora I, go, home sono input che si presentano come hidden state a specifici time step. Simultaneamente, I, go, home possono essere visti come l'insieme dei vettori hidden state dell'encoder.

![](/assets/images/Transformer 도입/1c87ed9e-bc78-4f1c-a9ca-87c34dd1379f-image.png)
Nel post precedente sull'attention, la similarità veniva calcolata tramite prodotto interno tra hidden state dell'encoder e vettori hidden state del decoder.

Eseguire questo processo all'interno di un singolo set di vettori è il motivo per cui la (Figura 1) è chiamata modulo di self-attention.

### Problema
Dato che la similarità viene misurata all'interno di un singolo set di vettori, la similarità di un vettore con se stesso sarà molto più alta che con gli altri. Il vettore di output conterrà solo auto-informazione.

Quello che vogliamo è un'interpretazione significativa della sequenza (come in Seq2Seq), non un'auto-replicazione.

### Soluzione
Per affrontare questo, si ideano tre vettori:
- Query: determina quali vettori del set usare selettivamente.
- Key: il vettore materiale che viene moltiplicato internamente con la Query per la similarità.
- Values: il vettore a cui vengono applicati i pesi di similarità query-key.

**Struttura della self-attention**
Il set di vettori di input viene trasformato in vettori query, key e value attraverso matrici di trasformazione lineare separate $W^Q$, $W^K$, $W^V$.

**Processo di encoding**
Supponiamo di codificare 'I'.

1. Calcolo di Q, K, V
Si crea il vettore Query tramite $W^Q$, il vettore Key tramite $W^K$, il vettore Values tramite $W^V$. La similarità generata da $k_n$ corrisponde 1-a-1 con $v_n$.

2. Calcolo dei pesi dell'attention
Si calcola la similarità tra Q e K e si applica softmax.
Come nella (Figura 1), si può vedere che la auto-similarità è più bassa di quanto ci si aspetterebbe. Si ottiene una similarità oggettiva che non è dominata dall'auto-similarità.

3. Applicazione dei pesi di attention ai vettori value
Si ottiene il vettore di encoding desiderato per 'I'.

4. Ripetizione per l'elemento successivo della sequenza
Solo la Query viene ricalcolata tramite $W^Q$; Key e Value riutilizzano i risultati precedenti.

## Parallelizzazione con matrici
![](/assets/images/Transformer 도입/4c2a7006-2f55-4aba-bfa9-bd71c4693eea-image.png)

Consideriamo la frase 'Thinking Machines'. Per eseguire la self-attention, servono Q, K, V. Si potrebbe calcolare Q, K, V per 'Thinking' ($X_1$), poi calcolare il vettore di output, e fare lo stesso per $X_2$.

Ma parallelizziamo con le matrici.

Sia la matrice $X$ la concatenazione di $X_1$ e $X_2$. Il prodotto scalare di $X$ con $W^Q$ dà $Q$, che è uguale alla concatenazione di $Q_1$ e $Q_2$. Lo stesso vale per $K$ e $V$.

## Miglioramento sui limiti delle RNN
Il Transformer produce vettori di encoding convertendo tutti i contenuti della sequenza in Q, K, V, indipendentemente dalla lunghezza o dall'ordine. Si è liberato dalla struttura fondamentale delle RNN dove lo hidden state fatica a portare informazioni precedenti man mano che le sequenze si allungano, migliorando sostanzialmente il problema della long-term dependency.

# Scaled Dot-Product Attention

- Input: query $q$, un set di key-value $(k,v)$
- Q, K, V, Output sono tutti vettori!
- Output: somma pesata dei values
- Vettore pesato: prodotto interno di query e key corrispondente
- Query e key hanno la stessa dimensionalità $d_k$.
- La dimensionalità del value è $d_v$.
- $d_k$ e $d_v$ non devono essere uguali!
  - L'applicazione del peso ai values è una moltiplicazione scalare indipendente dalla dimensione.


## Generalizzazione



![](/assets/images/Transformer 도입/d2839f00-d508-44d2-b13d-a0c73b9f3e4c-image.png)
- i: quale vettore di input
- j: indice per calcolare i prodotti interni di q con tutti i k

---

![](/assets/images/Transformer 도입/eadc7d76-82cd-4c03-9371-6fbae7532ad8-image.png)

La prima formula mostra il risultato della self-attention per una singola query. Estendiamola a una matrice Query, dove ogni riga è una query.

![](/assets/images/Transformer 도입/a096577f-69ad-431b-bad1-37c4346ebad8-image.png)

1. Il prodotto delle matrici Q e K crea una matrice le cui righe sono vettori pre-softmax per tutti i prodotti interni query-key.

2. Si applica softmax al risultato del prodotto Q-K. La softmax su una matrice è row-wise per default. Ogni riga diventa un vettore di pesi che somma a 1.

3. Si moltiplica il risultato del passo 2 per la matrice dei values. Questo esegue la moltiplicazione element-wise dei vettori di pesi con i vettori value.
Essendo un prodotto interno, i pesi vengono moltiplicati lungo le colonne e sommati.

Questo mi ha confuso perché l'ordine di calcolo differisce leggermente dai diagrammi concettuali precedenti.

![](/assets/images/Transformer 도입/b67e0323-8b47-4c86-bc61-ffc314f4a5ac-image.png)

Qui, il peso 0.2 viene moltiplicato scalarmene a $v_1$, 0.1 a $v_2$, 0.7 a $v_3$, producendo $v_1, v_2, v_3$ modificati. Questi 3 vettori vengono poi semplicemente sommati per formare un vettore 3-dimensionale.

![](/assets/images/Transformer 도입/37b48225-c5a8-4330-b896-6d7e9badb784-image.png)

Nella formula reale, i pesi per tutte le query sono già calcolati e memorizzati riga per riga. Anche i values sono memorizzati riga per riga. Quindi moltiplicare le due matrici applica la moltiplicazione dei pesi per colonna e la somma per riga.

Le spiegazioni concettuali vengono calcolate in parallelo tramite operazioni matriciali.

## Riepilogo del Transformer
![](/assets/images/Transformer 도입/3d4dbbf7-ce2a-443f-a640-78a9db4d9d03-image.png)
Solo la parte di scaling è diversa; questo riassume tutto quanto spiegato sopra.

Ordine di calcolo semplificato:

1. Calcolo di Q, K, V
2. Esecuzione del calcolo dell'attention secondo la formula
3. Ottenimento del vettore di encoding!

Come diagramma:
![](/assets/images/Transformer 도입/abe2b34e-7c3a-41d0-84a1-bfcec1de9fd3-image.png)



## Perché scalare per $\sqrt{d_k}$

Tra colleghi, l'abbiamo semplicemente inteso come prevenzione del gradient exploding. È in parte valido, ma la lezione del Professor Jaegeol Ju ha dato la risposta rigorosa.

**Varianza**
Si assumano due vettori con media 0 e varianza 1:
> (a, b), (x, y)

Il loro prodotto si calcola come $ax+by$ trasponendo (x,y).

**Fatti matematici**
- Moltiplicare variabili casuali con la stessa media preserva media e varianza.
- Sommare due variabili casuali somma le loro varianze.
- Dividere una variabile casuale per $\sqrt{n}$ divide la sua varianza per $n$.

Quindi la varianza di $ax+by$ è 2. Qui abbiamo usato vettori 2D quindi la differenza è piccola, ma con 100 dimensioni la varianza sarebbe 100.

Se la varianza è 2, la deviazione standard è $\sqrt{2}$, e supponiamo che il risultato del prodotto sia $[1.1, -0.8, -1.7]$. Se la varianza saltasse a 100, questi potrebbero diventare $[8, -11, 7]$. (Valori non esatti.)

Nella softmax, una deviazione standard maggiore significa che la distribuzione di probabilità si concentra sui valori più grandi. Una deviazione standard minore produce una distribuzione più uniforme.

Quindi, al crescere della dimensione, la distribuzione di probabilità può deviare significativamente da quella intesa. Se certe probabilità softmax diventano troppo grandi o piccole, il gradient vanishing diventa un rischio.

Perciò, usando i fatti matematici sopra, si ripristina la varianza. Dividendo $ax+by$ per $\sqrt{2}$ si divide la varianza per 2, riportandola a 1.

Ecco perché il Transformer scala per $d_k$. Perché $d_k = d_q$.
