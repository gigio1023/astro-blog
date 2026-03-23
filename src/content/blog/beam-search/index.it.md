---
title: "Beam Search"
description: "Spiegazione del beam search decoding come compromesso tra greedy decoding e ricerca esaustiva nella generazione di sequenze."
date: "2021-09-08T10:39:16.519Z"
tags: ["nlp"]
lang: it
translationOf: "beam-search"
draft: false
---

# Greedy Decoding
Negli approcci con attention e LSTM dei post precedenti, quando si predice la parola successiva in un dato step, viene selezionata la singola parola con la probabilita piu alta. Questo si chiama greedy decoding.

E greedy perche sceglie l'opzione localmente migliore piuttosto che predire dal contesto complessivo.

Per esempio:
> input: {testo francese difficile}, answer: he hit me with a pie

In questa situazione, supponiamo che il decoder abbia predetto solo 'he hit a' finora. E chiaramente una frase sbagliata, ma nel greedy decoding non c'e modo di tornare indietro.

## Ricerca esaustiva
![](/assets/images/Beam search/5e071974-4a49-4fed-baad-01a0420124b7-image.png)
Nel greedy decoding, l'output y per una frase data x puo essere espresso come probabilita congiunta come mostrato sopra.
Il primo termine della probabilita congiunta e la probabilita di produrre y1 dato x. Il secondo termine e la probabilita di produrre y2 dati y1 e x. Il prodotto di tutti questi valori rappresenta la probabilita dell'output y considerando tutti i token nel Seq2Seq — una probabilita congiunta su eventi simultanei.

**Obiettivo**
Massimizzare $P(y|x)$. L'obiettivo e trovare l'y piu naturale.

**Problema**
Il greedy decoding potrebbe non raggiungere questo obiettivo. Il problema e fare scelte miopi che massimizzano $P(y_1|x)$. Tali scelte possono far rimpicciolire i termini successivi dopo $P(y_1|x)$, riducendo potenzialmente il valore complessivo.

**Soluzione**
Anche se la probabilita al tempo t diminuisce, fare scelte che possano aumentare il valore complessivo.
Calcolare tutte le opzioni possibili al tempo t realizzerebbe questo. Se il numero di scelte al tempo t del decoder (cioe la dimensione del vocabolario) e $V^t$, la complessita sarebbe $O(V^t)$. Troppo grande.

# Beam Search
Un compromesso tra greedy search e ricerca esaustiva. Invece di cercare $V^t$, l'utente imposta un k per cercare k opzioni dal vocabolario V.

![](/assets/images/Beam search/56127164-40e8-4cbe-9617-f8c4ef530d47-image.png)
k: beam size (nella pratica circa 5-10)
Ad ogni step, vengono esplorate k ipotesi.

Si applica il log alla probabilita congiunta originale, convertendola in una funzione monotona crescente. Quando il dominio aumenta, anche il codominio aumenta — quindi la probabilita congiunta e massima quando anche il punteggio trasformato in log e massimo. In altre parole, applicare il log va bene.

- Non garantisce una soluzione globalmente ottimale.
- Piu efficiente della ricerca esaustiva.

![](/assets/images/Beam search/f9a523c0-1e1e-4138-a217-778334300d44-image.png)
Qui le ipotesi si ramificano in 4. Dallo start, si generano k ipotesi. Allo step successivo, ognuna delle k genera k ulteriori ipotesi. Qui k=2, step=2, quindi il numero di ipotesi e $k^n = 2^2 = 4$.

---
![](/assets/images/Beam search/361ca7c2-e54c-439a-84a2-7bbc0aaa2589-image.png)
Ma allo step successivo, non si creano k ipotesi per ognuna delle k. Si selezionano in modo parzialmente greedy le k(2) ipotesi con i valori di probabilita piu alti, e da quelle si creano k ipotesi.

Grazie a questo approccio, la complessita e molto inferiore rispetto alla ricerca di tutti i percorsi.

---

## Condizione di terminazione dell'ipotesi
Quando il decoder genera un token \<END\>. Alcune ipotesi possono finire prima di altre — questi risultati vengono salvati separatamente, e quelli non finiti continuano normalmente.

## Condizione di terminazione del Beam Search
- Quando si raggiunge un timestep predeterminato T
- Quando almeno n ipotesi sono terminate

## Valutazione finale
![](/images/6cbe16e1-2d23-4550-949d-79b5ed15928b-image.png)

Dato che i valori di probabilita sono tra 0 e 1, il punteggio ovviamente diminuisce all'allungarsi della probabilita congiunta. I valori del log diventano negativi. Quindi per calcolare i punteggi in modo equo, il punteggio viene diviso per la lunghezza.
