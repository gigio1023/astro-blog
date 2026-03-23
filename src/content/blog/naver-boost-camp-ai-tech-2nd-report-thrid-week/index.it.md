---
title: "Naver Boostcamp AI Tech 2 - Report settimana 3"
description: "Settimana 3 del Naver Boostcamp AI Tech: modelli custom PyTorch, dataset, dataloader e visualizzazione dati."
date: "2021-08-20T08:16:21.329Z"
tags: ["naver-boostcamp"]
lang: it
translationOf: "naver-boost-camp-ai-tech-2nd-report-thrid-week"
draft: false
---

# Report settimana 3
## Revisione lezioni
### pytorch (post 1~11)
https://velog.io/@naem1023/series/pytorch
### data viz (post 3~4)
https://velog.io/@naem1023/series/Data-Viz
## Processo di lavoro / risultati
### Custom model
Il compito sui modelli custom aveva codice di verifica simile a unit test (non proprio assert, ma quasi), che rendeva facile controllare il completamento. Per esempio, se il risultato era tensor([1]) o tensor([1.0], dtype=float64).

Il compito era corposo quindi ha richiesto tempo, ma i progressi erano proporzionali allo sforzo investito. Parti menzionate brevemente nelle lezioni venivano trattate in dettaglio nei compiti. Questo ha reso piu facile organizzare i contenuti delle lezioni su velog.

Non era la prima volta che lavoravo con modelli PyTorch, ma i problemi relativi alle dimensioni sembravano scoraggianti come imparare un nuovo linguaggio. Cose come torch.gather o far corrispondere le dimensioni per ottenere la risposta giusta erano cosi.

### Custom dataset/dataloader
A differenza del compito precedente, le descrizioni dei problemi erano vaghe in molti punti. C'era molto contenuto che non avevo mai trattato prima, e ho speso davvero tanto tempo. Penso di aver speso 4 ore solo sull'ultimo problema del dataset NLP.

Ho avuto molte difficolta con il vocab di torchtext e la creazione di un dizionario di encoding tramite vocab. Ci voleva troppo tempo per generarlo, ma si e scoperto che vocab aveva metodi dedicati per quello. I docs del vocab erano cosi brevi sulla creazione del vocab che li avevo messi da parte mentre facevo il compito. Dovro leggere i docs piu attentamente in futuro.


## Riepilogo sessione tra pari
Lo studio di algoritmi che ho organizzato per aiutare durante le sessioni tra pari e stata l'attivita principale questa settimana. Tutti erano esausti dal completare i compiti obbligatori entro venerdi, quindi c'era tempo vuoto per la discussione nei giorni rimanenti. Dato che tutti erano riluttanti riguardo alla scuola di specializzazione, erano tutti favorevoli allo studio di algoritmi.

Abbiamo iniziato dalle basi -- algoritmi di ricerca e ordinamento. Gli altri usavano C++ quindi non avevano problemi di velocita, ma io usavo Python e avevo problemi che non passavano neanche con pypy3.
I problemi di ordinamento erano particolarmente problematici -- l'I/O causava un grave degrado della velocita. L'ho risolto cercando, ma sto considerando di passare a C++ per i problemi Baekjoon.


## Retrospettiva di studio
21/08/17: Risolto il compito opzionale ViT della settimana scorsa, organizzati metodi PyTorch, blog
21/08/18: Risolto compito obbligatorio 1, studiati metodi PyTorch, blog
21/08/19: Risolto compito obbligatorio 2, blog
21/08/20: Ricerca info su MLOps, blog
