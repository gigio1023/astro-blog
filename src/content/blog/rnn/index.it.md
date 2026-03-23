---
title: "RNN"
description: "Fondamenti delle RNN: gestione dei dati sequenziali, modelli autoregressivi latenti, BPTT e backpropagation troncata."
lang: it
translationOf: "rnn"
date: "2021-08-06T07:23:27.018Z"
tags: ["ml", "nlp", "algorithm"]
draft: false
---

# RNN
## Dati sequenziali (sequence)
- Dati che devono procedere in ordine: audio, stringhe, prezzi azionari, ecc.
- Violano facilmente l'assunzione iid (independent and identically distributed).
  - Ad esempio, "il cane ha morso la persona" e "la persona ha morso il cane" hanno distribuzioni di dati, frequenze e significati completamente diversi.
- Cambiare l'ordine o perdere informazioni passate altera la distribuzione di probabilità dei dati.
  - Prevedere il futuro senza informazioni o contesto passati è impossibile.

### Gestire i dati sequenziali
Si usa la probabilità condizionata per modellare la distribuzione di probabilità dei dati futuri basandosi sulle informazioni precedenti della sequenza.

![](/assets/images/RNN/a953e4fe-612e-45ca-92c2-f8d0f84b9007-image.png)

Se si vogliono usare tutte le informazioni passate per calcolare le probabilità condizionate, la formula è quella sopra.

---
Tipicamente i dati sequenziali vengono gestiti così:
![](/assets/images/RNN/db4c5a53-d223-4a00-9b5a-0203f0d6a054-image.png)

Non servono tutte le informazioni passate. Questo varia molto in base al dominio.

Per esempio, per prevedere il prezzo di un'azione di un'azienda fondata 30 anni fa, non servono tutti i dati dal primo giorno. Di solito si usano circa 5 anni di dati.

=> Troncare le informazioni è di per sé una competenza.

---
![](/assets/images/RNN/007ca09c-6a78-4fbe-a6a0-225e6dc24615-image.png)
I dati sequenziali devono essere gestiti con lunghezze variabili come mostrato sopra. Serve un modello in grado di gestire input di lunghezza variabile.

### Modello autoregressivo
![](/assets/images/RNN/df1b72f5-1504-4cee-bf36-53548771f3b4-image.png)
Ci sono casi in cui si usa solo una sequenza di lunghezza fissa tau. Questo si chiama AR(tau) (modello autoregressivo).
- Decidere tau stesso richiede una conoscenza del dominio significativa.
- tau va impostato corto o lungo a seconda delle necessità.

## Modello autoregressivo latente
![](/assets/images/RNN/775dedc3-7ed1-483c-a149-ed432a48930d-image.png)
- Per prevedere Xt, si usano sia Xt-1 che Ht.
- Ht (variabile latente) contiene informazioni da Xt-2 fino a X1.
- **Dati di lunghezza variabile vengono convertiti in dati di lunghezza fissa.** Questo rende più facile l'elaborazione per i modelli.
- Problema: come codificare Ht?

## RNN (Recurrent Neural Network)
![](/assets/images/RNN/5e1bbe91-6e2a-40bb-9921-2b6a5298d632-image.png)
Un modello che apprende i pattern dei dati sequenziali usando ripetutamente la variabile latente Ht dal modello autoregressivo latente attraverso una rete neurale.

La rete si può esprimere matematicamente così:

![](/assets/images/RNN/a2dcb8e6-0e43-43e9-b15f-4f2f1ef5091f-image.png)
- Xt: dati della sequenza al time step corrente
- Ht: variabile latente fino al time step corrente
- W(1), W(2): matrici dei pesi condivise su tutti i time step.

Questa rete può gestire solo i dati del time step corrente. Quindi la rete viene estesa così:
![](/assets/images/RNN/2d256449-527c-4f12-b020-ea4421589899-image.png)

- Wx(1): matrice dei pesi combinata con i dati del time step corrente
- WH(1): matrice dei pesi combinata con la variabile latente del time step precedente
- Ht: variabile latente appena calcolata. Viene copiata e usata per codificare la variabile latente successiva.
- Matrici dei pesi fisse usate in tutta la rete: Wx(1), WH(1), W(2)

### BPTT (Backpropagation through time)
Il metodo di backpropagation per le RNN.
![](/assets/images/RNN/214e7c97-8738-4722-8f40-db93b97253e9-image.png)
- Rosso: percorso del flusso del gradiente
- Blu: forward propagation

---

![](/assets/images/RNN/a609a3b6-833e-4512-912d-3d2a9a4133d1-image.png)
Man mano che la lunghezza della sequenza cresce, il termine nel riquadro rosso diventa instabile. Se il valore è minore di 0, tende a zero; se maggiore di 0, cresce senza limiti.

### BPTT troncata
Calcolare i gradienti per tutti i passi della sequenza rende i termini differenziali molto instabili, portando al gradient vanishing.
![](/assets/images/RNN/3287a8f7-8b35-41f4-8e80-d18ef5bc59f0-image.png)

Quindi si tronca in modo appropriato.

Ad esempio, nella figura sopra, la BPTT procede normalmente fino a quando Ht riceve informazioni sul gradiente solo da Ot, e il gradiente viene aggiornato da lì.

![](/assets/images/RNN/75b5f4da-e38b-4801-9af7-b4a61f4a23b0-image.png)

Ma anche questo ha dei limiti, motivo per cui sono state sviluppate LSTM e GRU per risolvere il problema.
