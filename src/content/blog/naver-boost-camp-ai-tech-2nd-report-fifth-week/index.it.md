---
title: "Naver Boostcamp AI Tech 2 - Report settimana 7"
description: "Retrospettiva della settimana 7 del Naver Boostcamp AI Tech: studi su Transformer e BERT, Q&A dal mentoring su meccanismi di attenzione e positional encoding."
date: "2021-09-17T11:34:08.418Z"
tags: ["naver-boostcamp"]
lang: it
translationOf: "naver-boost-camp-ai-tech-2nd-report-fifth-week"
draft: false
---

# Report settimana 7
## Revisione lezioni
### NLP (post 10~14)
https://velog.io/@naem1023/series/NLP

## Processo di lavoro / risultati
## Risposte dal mentoring
**Sessione tra pari**
Molte domande sono state scambiate durante le sessioni tra pari. Ho raccolto quelle irrisolte o ambigue e le ho poste al mentore. Ecco un riepilogo delle risposte:

- Perche dividere per d_k nel transformer?
    - Avevo supposto fosse per prevenire il gradient exploding dato che d_k e n crescono proporzionalmente.
    - La conclusione: dividere una variabile casuale per n divide la sua varianza per n^2, quindi e un fatto matematicamente ovvio che viene applicato.

- Perche usare sin e cos nel positional encoding?
    - Le funzioni sin e cos non crescono in ampiezza, hanno periodicita e producono valori unici. Garantiscono inoltre valori ragionevolmente unici attraverso la trasformazione lineare.

- Complessita temporale (risolta)
    - C'era un leggero fraintendimento. La parte "Complexity per Layer" e la complessita temporale per le operazioni matriciali. Le "Sequential Operation" discusse qui sono una cosa diversa.
    - Per le RNN: per calcolare lo hidden state al time step t, il calcolo fino a t-1 deve essere completato prima. Quindi il calcolo procede proporzionalmente alla lunghezza della sequenza (non si puo parallelizzare). Per questo O(n) e indicato per la parte Recurrent.
    - Per il Transformer: tutta l'attention sull'intera sequenza viene calcolata in una volta. Guardando i materiali delle lezioni, la matrice di input ha dimensioni (n * d), mostrando che tutti i token nella sequenza vengono elaborati simultaneamente. Quindi e O(1) indipendentemente dalla lunghezza della sequenza.
    - [Questo](https://jalammar.github.io/illustrated-transformer/) sembra la migliore risorsa per capire i Transformer. Esistono versioni tradotte.
- Perche dividere per sqrt(d)? (risolta)
    - Leggendo attentamente il paper "Attention is All You Need" dovrebbe essere chiaro. Senza dividere, i valori dentro il softmax diventano troppo grandi dato che risultano da operazioni di prodotto scalare.
- Perche sin e cos?
    - Molte ragioni, ma sequenze di interi semplici crescono troppo verso la fine, e gli interi sono troppo grandi rispetto ai valori degli embedding, deviando dall'intento originale di aggiungere solo "piccole" informazioni posizionali agli embedding.
    - sin e cos possono essere regolati usando la loro periodicita in base alla lunghezza della sequenza, e sono matematicamente stabili (?) -- anche se non posso garantirlo.
    - Link utili per capire il positional encoding:
        - [What is the positional encoding in the transformer model?](https://datascience.stackexchange.com/questions/51065/what-is-the-positional-encoding-in-the-transformer-model)
        - [Why does the transformer positional encoding use both sine and cosine?](https://datascience.stackexchange.com/questions/68553/why-does-the-transformer-positional-encoding-use-both-sine-and-cosine)
        - [Transformer Architecture: The Positional Encoding](https://datascience.stackexchange.com/questions/68553/why-does-the-transformer-positional-encoding-use-both-sine-and-cosine)
- Perche il Post-Layer Normalization e problematico, e il warm-up
    - Questi due argomenti sono lo stesso problema. Quando il LN viene applicato dopo, la stabilizzazione dei valori avviene piu tardi, causando gradienti grandi nella fase iniziale, il che crea sensibilita al learning rate. Per questo serve il warm-up.
    - Per i dettagli, e utile leggere questo paper:
        - [On Layer Normalization in the Transformer Architecture](https://arxiv.org/pdf/2002.04745.pdf)
- Gradient Vanishing nel Transformer
    - Non e davvero un problema, il che si collega al punto 1. Il vanishing avviene quando i gradienti dalla fine della sequenza si riducono propagandosi all'indietro, ma il Transformer vede l'intera sequenza contemporaneamente, quindi non c'e molta discussione su questo problema.
    - Lo skip-connection viene usato anche nei Transformer e aiuta in parte col vanishing, ma non penso sia il fattore decisivo. La differenza strutturale dalle RNN -- "vedere tutte le sequenze contemporaneamente" -- sembra essere la ragione piu rilevante.


## Riepilogo sessione tra pari
Abbiamo discusso le domande menzionate sopra e cercato di capire e riassumere le risposte del mentore nei nostri termini.

## Retrospettiva di studio
21/09/06: Studiata lezione 1 sul transformer
21/09/07: Studiata lezione 2 sul transformer
21/09/08: Studiato BERT
21/09/09: Studiate le lezioni rimanenti. Revisione e riassunto del transformer.
21/09/10: Revisione e organizzazione dei compiti.
