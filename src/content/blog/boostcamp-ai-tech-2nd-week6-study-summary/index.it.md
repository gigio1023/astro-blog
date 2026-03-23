---
title: "Boostcamp AI Tech 2nd - Riepilogo settimana 6"
description: "Riepilogo della settimana 6 del Naver Boostcamp AI Tech: lezioni NLP, bucketing per il batching dei dati e discussioni peer session."
date: "2021-09-10T10:21:43.642Z"
tags: ["naver-boostcamp"]
draft: false
lang: it
translationOf: "boostcamp-ai-tech-2nd-week6-study-summary"
---

# Riepilogo settimana 6
## Revisione delle lezioni
### NLP (Post 1-9)
https://velog.io/@naem1023/series/NLP

## Processo degli assignment / Risultati
### bucketing
![](/assets/images/부스트캠프 AI Tech 2기 6주차 학습정리/89d8a5d1-3a51-4a52-8c89-fd8cfa8a7fcb-image.png)
Una tecnica che riorganizza i batch in base alla lunghezza dei dati.
È comparsa nell'Assignment 4. Il concetto in sé era facile da capire, ma il codice era molto difficile da seguire.

L'ho risolto durante la peer session. Quello che il codice cercava di fare:

- Guardare la lunghezza dei dati in unità di max_pad_len.
  - Ad esempio, si imposta max_pad_len=5 e si usa il quoziente. Allora i dati con lunghezza 5-9 dovrebbero essere riorganizzati in un singolo batch.
- Invece di spostare i dati per riorganizzarli, si salvano gli indici separatamente e si riorganizzano i batch per indice.
- Si riorganizzano i batch per indice in modo che dati con lunghezze simili siano adiacenti nella lista.
  - es., dati con lunghezza 5-9 sono posizionati adiacentemente nella lista.
- Una volta completato il processo, basta leggere la lista degli indici in ordine per ottenere i batch riorganizzati.

Questo era il contenuto del codice di bucketing nell'Assignment 4.


## Riepilogo della peer session
Abbiamo discusso a lungo del problema del bucketing menzionato sopra.

Abbiamo anche condiviso esperienze sulla formazione dei team. A differenza del CV, nel NLP tutti erano molto entusiasti della formazione dei team, quindi il processo di reclutamento è stato molto veloce.


## Retrospettiva di studio
21/09/06: Studiato Word2Vec, risolto Assignment 1
21/09/07: Studiato RNN, LSTM, risolti Assignment 2, 3
21/09/08: Studiato attention, risolto Assignment 4
21/09/09: Tanta energia spesa per la formazione del team...
21/09/10: Revisione Assignment 4
