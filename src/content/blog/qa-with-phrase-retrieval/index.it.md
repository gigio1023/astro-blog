---
title: "QA con Phrase Retrieval"
description: "Panoramica sul phrase retrieval per QA open-domain, con rappresentazioni dense-sparse per evitare la pipeline retriever-reader."
lang: it
translationOf: "qa-with-phrase-retrieval"
date: "2021-10-20T06:13:25.221Z"
tags: ["nlp"]
draft: false
---

# Phrase Retrieval in ODQA
## Limiti attuali del Retriever-Reader ODQA
- Error propagation
  - Per quanto bravo sia il Reader, se il Retriever non fornisce un contesto adeguato, le prestazioni dell'intero processo calano.
- Query-dependent encoding
  - L'encoding dell'answer span cambia in base alla query.
  - Es. quando si usa un BERT retriever, query e context vengono concatenati come input del modello, quindi con una query diversa:
    - L'encoding dell'embedding concatenato va ricalcolato ogni volta.
    - Il risultato dell'encoding cambia ogni volta.

Il phrase retrieval è stato proposto come metodo per risolvere questi problemi senza passare dalla pipeline Retriever-Reader.

## Soluzione
![](/assets/images/QA with Phrase Retrieval/26b4fa3b-f53b-4a50-8bef-cdaa8104e567-image.png)
1. Enumerare tutte le phrase nel contesto.
2. Mappare ogni phrase usando il suo vettore di embedding come chiave.
3. Il vettore della query viene calcolato a ogni nuova query.
4. Il problema si riduce al confronto tra il vettore della query e i vettori chiave.

![](/assets/images/QA with Phrase Retrieval/3271090b-ce19-44d9-9c61-f6886edca812-image.png)
**Confronto del processo di addestramento**
- Approccio convenzionale
  - Si inseriscono phrase, question e document in una funzione di score per ottenere tutte le combinazioni di punteggio.
  - Il Retriever-Reader è espresso come un'unica funzione F.
  - F prende a (candidati risposta), d e q in input e produce la risposta prevista.
  - La funzione di score va ricalcolata ogni volta che la query cambia.

- Phrase retrieval
  - Invece di F, lo score si calcola combinando un Question encoder e un Phrase encoder.
  - H: prende a e d in input, li mappa in uno spazio vettoriale e trova il vettore più simile -- tramite prodotto scalare, calcolo della distanza, ecc.
  - Tutti i risultati di H sono pre-calcolati.
  - Quindi solo Q va calcolato ogni volta che arriva una query.
  - **Problema**
    - L'assunzione che F possa essere scomposta in G e H potrebbe essere sbagliata.
    - Piuttosto che scomporre F matematicamente, si definiscono G e H e si cerca di approssimare F il più possibile.

## Key Challenge
Come mappare bene le phrase nello spazio vettoriale?
-> Proviamo a usare sia embedding densi che sparsi.

# Rappresentazione dense-sparse per le Phrase
- Vettori densi: efficaci per catturare informazioni sintattiche e semantiche.
- Vettori sparsi: efficaci per catturare informazioni lessicali.

## Concat
![](/assets/images/QA with Phrase Retrieval/4231fbd6-2d5c-49a7-beef-7552bfd46a82-image.png)

L'approccio per combinare i due metodi: durante il phrase ODQA, si calcolano un vettore di embedding denso e uno sparso per ogni phrase, poi si concatenano.

## Rappresentazione densa
![](/assets/images/QA with Phrase Retrieval/b502584b-4123-429e-9023-5060fa60c7ec-image.png)

Un vettore di phrase (vettore denso) viene generato usando i vettori hidden state ai token di inizio e fine dell'answer span.

![](/assets/images/QA with Phrase Retrieval/5ab5bac3-a51b-44e4-b7cb-18967160612a-image.png)

Coherency vector
- Indica se una phrase è un componente valido della frase.
- Usato per filtrare le phrase che non formano unità appropriate.
- Calcolato dai vettori di inizio e fine.

![](/assets/images/QA with Phrase Retrieval/0ec457bf-9aa3-4a28-8cd7-ea45f3cbc15f-image.png)
Question embedding
- Generato dal token CLS.
- Identico all'embedding standard dei documenti.

## Rappresentazione sparsa
![](/assets/images/QA with Phrase Retrieval/cd7e6740-c22d-4418-b7c6-dafac5b4c08a-image.png)
Usa embedding contestualizzati per costruire vettori sparsi dagli n-gram più rilevanti.
1. Si misura la similarità con le parole circostanti della phrase target.
2. I punteggi di similarità vengono inseriti nel vettore sparso corrispondente a ogni parola.

- Simile a TF-IDF. La differenza è che i pesi cambiano dinamicamente per ogni phrase e frase.
- Si possono usare anche unigrammi e bigrammi per catturare informazioni sovrapposte.

## Scalability Challenge
Usare dati di Wikipedia significa tipicamente gestire circa 60 miliardi di phrase. Indicizzare e cercare a questa scala richiede considerazioni di scalabilità.

- Storage: pointer, filter, scalar quantization, ecc. possono ridurre 240TB a 1.4TB.
- Search: si usa FAISS.
  - FAISS può cercare solo vettori densi, non sparsi.
  - Poiché il phrase ODQA combina vettori densi e sparsi, prima si cercano i vettori densi.
  - I punteggi dei vettori sparsi vengono poi usati per fare il reranking dei risultati FAISS.

# Risultati e analisi
![](/assets/images/QA with Phrase Retrieval/40ba02a7-4094-4b18-9dcf-dc72997869b9-image.png)
Su SQuAD si è ottenuto un miglioramento del 3.6% rispetto a DrQA (Retriever-Reader), con una velocità di inferenza 68 volte superiore.
![](/assets/images/QA with Phrase Retrieval/9983f403-a203-418c-aa53-ee8cb279ef75-image.png)
Più veloce di altri approcci Retriever-Reader. Inoltre si basa su calcolo CPU, quindi c'è il vantaggio collaterale di non richiedere GPU.

## Limiti
![](/assets/images/QA with Phrase Retrieval/2f5eceb0-656a-4018-a0f1-3d025843dd7f-image.png)

- Richiede molta RAM.
- Le prestazioni sono inferiori rispetto ai modelli Retriever-Reader più recenti.
  - Prestazioni più basse su Natural Questions.
  - Causato dal decomposability gap (scomposizione di F in G e H).

## Decomposability gap
![](/assets/images/QA with Phrase Retrieval/fb0883d9-16b0-4877-85a3-e7ffb986a311-image.png)
Approssimare F tramite G e H è intrinsecamente soggetto a errore. F rappresenta un Retrieval-Reader molto complesso, quindi l'approssimazione tramite G e H è inevitabilmente imprecisa.
