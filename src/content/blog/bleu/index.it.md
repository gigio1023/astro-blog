---
title: "BLEU"
description: "BLEU score per la valutazione della traduzione automatica: precision, recall, F1, sovrapposizione n-gram e brevity penalty."
date: "2021-09-10T05:52:17.974Z"
tags: ["nlp"]
draft: false
lang: it
translationOf: "bleu"
---

Se si calcolano precision o recall standard in Seq2Seq, la maggior parte delle metriche sarà vicina a 0. Confrontando step per step, la probabilità di mismatch è molto alta. Questo significa che anche frasi molto simili come quelle sotto potrebbero dare metriche quasi nulle.
![](/assets/images/BLEU/58b650dd-378a-4bfd-b915-7c066c40cc9c-image.png)

Quindi è necessario riflettere questo contesto nelle metriche.

# Precision, Recall
![](/assets/images/BLEU/346e52dd-e71a-4ba8-b0a8-d298402fd0e9-image.png)
![](/assets/images/BLEU/712dc76b-c5f9-4ff2-9688-98e443521384-image.png)

**Precision**
- Indica quante corrected words ci sono nel risultato predetto.
- Il numero di parole sovrapposte con il ground truth, basandosi sul risultato predetto.
- Una metrica di quanto siano accurate le predizioni mostrate all'utente.
  - es., tra i risultati di ricerca mostrati all'utente, quanti erano effettivamente corretti.

**Recall**
- Indica quante corrected words ci sono rispetto al ground truth.
- Il numero di parole sovrapposte con la predizione, basandosi sul ground truth.
- Tra i risultati che avrebbero dovuto essere trovati, quanti ne ha effettivamente trovati il motore di ricerca.
  - Tra i risultati non mostrati all'utente potrebbero esserci informazioni che l'utente voleva.
- Si pensi al recall in StarCraft 1: delle unità che si volevano evocare, quante sono state effettivamente evocate?

# F1 score
Per esprimere una statistica combinata di precision e recall, si calcola la media di entrambe le metriche.
L'ordinamento delle diverse medie è:
> Media aritmetica >= Media geometrica >= Media armonica

L'F1 score usa la media armonica, che si concentra sulla più piccola tra precision e recall. La mia impressione è che, come la notazione Big O che assume il caso peggiore, usare la media armonica porti a una metrica più accurata.

---

Nella traduzione automatica, calcolare l'F1 score nel modo convenzionale ignora la grammatica, l'ordine delle parole e vari altri fattori. Quindi serve una nuova metrica.

# BLEU score
BiLingual Evaluation Understudy. Si pronuncia "blue", a quanto pare.
![](/assets/images/BLEU/fbf1424e-0a7b-4a1c-9ffc-365f9ce0a944-image.png)
- Invece di calcolare la sovrapposizione per singole parole, si calcola la sovrapposizione N-gram.
  - Tipicamente da 1 a 4 gram.
- Il termine successivo considera solo la precision, non il recall.
  - Perché nella traduzione automatica, quanto completamente la frase originale sia stata riprodotta non è la priorità.
  - Conta di più quanto la predizione si sovrapponga alla frase originale.
- Si calcola la media geometrica della precision per i gram da 1 a 4.
  - Per concentrarsi sui valori più piccoli tra le metriche, come fa l'F1 score.
  - La media armonica non si usa perché dà troppo peso a metriche eccessivamente piccole.


## Brevity penalty
Un termine per pesare risultati di traduzione troppo corti. Corrisponde al min() nella formula del BLEU.

Se il risultato predetto è più corto della frase originale, questo valore diventa minore di 1.

Questo compensa in parte il recall che il termine successivo non considera. Sopprime il massimo del recall a 1 quando potrebbe superarlo, e inoltre moltiplica per un fattore quando la frase predetta è più corta dell'originale.
