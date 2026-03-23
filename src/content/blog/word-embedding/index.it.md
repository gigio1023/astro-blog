---
title: "Word Embedding"
description: "Introduzione al word embedding e Word2Vec: come le parole vengono mappate in spazi vettoriali per catturare relazioni semantiche."
date: "2021-09-06T11:04:54.688Z"
tags: ["nlp"]
draft: false
lang: it
translationOf: "word-embedding"
---

# Word Embedding
Un metodo per convertire le parole in vettori, così che le parole di una frase possano essere rappresentate come punti in uno spazio vettoriale.

Il word embedding è di per sé una tecnica di deep learning / machine learning. Si addestra usando dati di training e una dimensionalità dello spazio vettoriale predefinita. Una volta addestrato, produce il vettore ottimale per ogni parola nei dati di training.

## Idea di base del Word Embedding
Parole con significati simili vengono mappate in posizioni simili nello spazio vettoriale, ottenendo così una similarità. Questo fornisce un ambiente migliore per altri task NLP.

## Word2Vec
L'esempio più noto di word embedding.

L'assunzione di base: parole vicine in una frase hanno probabilmente significati simili. Ovvero, _**il significato di una parola si può determinare dalle parole circostanti.**_

> The cat purrs.
This cat hunts mice.

In queste due frasi, le parole vicine a "cat" includono The, purrs, this, hunts, mice. L'assunzione è che queste parole abbiano significati simili a "cat."

### Metodo di predizione
Basandosi sui dati di training, si predice la distribuzione di probabilità delle parole circostanti (w) per la parola target (qui, "cat").

![](/assets/images/Word Embedding/86cb5366-3ede-449e-ad8a-7cabfc970947-image.png)
Se "cat" è dato in input, le parole circostanti vengono nascoste e si addestra $P(w|cat)$.

### Metodo di addestramento
1. Tokenizzare le frasi in parole.
2. Costruire un vocabolario dalle parole uniche.
3. Ogni parola nel vocabolario viene rappresentata come un vettore one-hot con dimensione pari alla grandezza del vocabolario.
4. Costruire coppie input-output usando sliding window.

Supponiamo che la dimensione della sliding window sia 3.

> I study math.

Applicando la sliding window a "I": si guarda 1 parola avanti e indietro. Nulla prima, "study" dopo, quindi la coppia è (I, study).

Per "study": "I" prima, "math" dopo, dando le coppie (study, I) e (study, math).

5. Costruire una rete neurale semplice e addestrarla sulle coppie preparate.

![](/assets/images/Word Embedding/a55dc671-1420-4c7f-bd74-a6232bf7aa48-image.png)

Input Layer: nodi pari alla dimensione del vettore one-hot di input.
Output Layer: nodi pari alla dimensione del vettore one-hot di output.
Hidden Layer: nodi pari alla dimensione dello spazio di word embedding — un iperparametro definito dall'utente.

---

![](/assets/images/Word Embedding/f3a03d57-9baa-4a28-aa9d-7c3cf21eea57-image.png)

La rete neurale sopra visualizzata in forma vettoriale.

La forma è $W_2(W_1x)$, quindi W1 è (2,3) e W2 è (3,2). Poi si applica softmax per rendere il vettore 3D una distribuzione di probabilità. La rete viene addestrata usando softmax loss per minimizzare la distanza tra questo output e il vettore y.

### Calcolo del prodotto interno
La moltiplicazione matriciale standard funziona, ma dato che i vettori one-hot hanno un solo componente 1, viene preso solo il valore di un indice specifico.

Per esempio, moltiplicando W1 per x sopra, solo il 2° componente di x è 1, quindi viene presa solo la 2° colonna di W1.

Sfruttando questa proprietà, le moltiplicazioni con vettori one-hot non eseguono una moltiplicazione matriciale completa ma prendono semplicemente il valore di un indice specifico.

W2 avrà tanti vettori riga quante sono le parole nel vocabolario — qui, 3 righe. La dimensione delle righe è 2 per permettere il prodotto interno con W1.

>**Ground truth**
Si riferisce al valore reale. Originariamente un termine meteorologico per le osservazioni fatte al suolo (in contrapposizione ai dati satellitari). Nel machine learning, indica il valore reale di y dato come dato di training, non y-hat.

>**logits**
La funzione inversa della sigmoid. L'output va da -infinito a +infinito.
ref: https://velog.io/@gwkoo/logit-sigmoid-softmax%EC%9D%98-%EA%B4%80%EA%B3%84

Perché $W_2(W_1x)$ corrisponda al ground truth, il valore dei logits al 3° indice (dove il ground truth è 1) dovrebbe essere infinito, e il resto dovrebbe essere meno infinito.

#### Qualcosa che non ho capito
L'istruttore ha anche menzionato che l'operazione W1-W2 equivale a misurare la similarità tra vettori, ma non ho seguito.

### Proprietà di Word2Vec
Word2Vec apprende bene le relazioni semantiche tra le parole come relazioni tra vettori.
![](/assets/images/Word Embedding/1e262f45-bd01-472b-964c-601113b61db0-image.png)

La figura mostra i vettori di parole appresi tramite Word2Vec. I vettori di parole con relazioni simili hanno la stessa relazione direzionale (differenza tra vettori).

### Word2Vec in coreano
https://word2vec.kr/search/?query=%ED%95%9C%EA%B5%AD-%EC%84%9C%EC%9A%B8%2B%EB%8F%84%EC%BF%84

![](/assets/images/Word Embedding/a94e074e-e8f6-428f-906b-529fdb58091c-image.png)

Un'implementazione coreana di Word2Vec. Le query funzionano così: "Corea - Seoul" cattura la relazione paese-capitale. Aggiungendo "Tokyo" si applica quella relazione a Tokyo e si mostra il risultato.

### Intrusion Detection
Date diverse parole, si trova quella semanticamente più diversa dalle altre. Si può risolvere usando i risultati di embedding di Word2Vec.

Si calcola la distanza euclidea di ogni parola rispetto a tutte le altre e si fa la media. Si ripete per ogni parola. La parola con la media di distanza più grande è l'intruso.

### Applicazioni di Word2Vec
In origine una metodologia per trovare il significato delle parole, ma è un task che produce facilmente risultati di word embedding. Quindi è ampiamente usato in altri metodi NLP che richiedono la conversione parola-vettore.
- Similarità tra parole
- Traduzione automatica
  - Facilita l'allineamento di parole con lo stesso significato in lingue diverse.
- PoS tagging
- NER
- Analisi del sentiment
  - Facilita la rappresentazione del sentiment positivo/negativo delle parole.
- Clustering
- Costruzione di lessici semantici
- Image captioning

## GloVe
Un metodo di word embedding comunemente usato insieme a Word2Vec.

La differenza principale da Word2Vec: le frequenze di co-occorrenza delle coppie di parole all'interno di una singola finestra vengono pre-calcolate su tutti i dati di training. Chiamiamola $P_{ij}$.

![](/assets/images/Word Embedding/42dd8894-fed3-494d-a1eb-feab9605c113-image.png)

La funzione obiettivo (loss) di GloVe è mostrata sopra.
- $u_i$ = vettore di embedding della parola di input
- $v_j$ = vettore di embedding della parola di output
- $P_{ij}$ = quante volte le parole i e j co-occorrono in una singola finestra

Da una prospettiva di algebra lineare, si può anche intendere come co-occurrence low-rank matrix factorization, simile agli algoritmi dei sistemi di raccomandazione.

### Vantaggi
I calcoli ridondanti vengono ridotti. Per esempio, se "study" e "math" co-occorrono frequentemente, Word2Vec semplicemente addestra molte volte sulla loro relazione. GloVe conosce in anticipo la loro co-occorrenza.

Quindi nella formula sopra, per "study" e "math", un valore grande viene sottratto dal prodotto interno, permettendo un addestramento più veloce.

Funziona anche meglio con meno dati.

### Esempi
![](/assets/images/Word Embedding/83e4d75b-78c7-483c-87e8-0044e3074d79-image.png)

Risultati GloVe per parole con stesso significato ma genere diverso, visualizzati con PCA. La differenza di genere ha una grandezza e direzione costanti.

![](/assets/images/Word Embedding/41d2c1e0-3829-49f8-89d0-fc03c6e756c6-image.png)

Anche le relazioni comparative e superlative degli aggettivi apprendono grandezza e direzione costanti.

### Modello pre-addestrato
https://nlp.stanford.edu/projects/glove/

Modelli pre-addestrati usando parole raccolte da Wikipedia, crawling e Twitter.
![](/assets/images/Word Embedding/7216a42a-d6d0-4828-aecd-83a9aa09bd6f-image.png)
- uncased: tratta le varianti maiuscole/minuscole come la stessa parola
- cased: tratta le varianti maiuscole/minuscole come parole diverse
- dimension: dimensione dei vettori di parole input/output
