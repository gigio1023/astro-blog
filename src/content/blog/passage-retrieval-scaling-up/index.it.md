---
title: "Passage Retrieval - Scaling Up"
description: "Scalare il passage retrieval con tecniche di ricerca di similarita approssimata: quantizzazione scalare, indicizzazione a file invertito e FAISS."
date: "2021-10-17T08:32:29.667Z"
tags: ["nlp"]
lang: it
translationOf: "passage-retrieval-scaling-up"
draft: false
---

# Passage Retrieval e Similarity Search
![](/assets/images/Passage Retrieval - Scaling up/4ceaaed8-f971-40c9-8a48-4e21634d2255-image.png)

Una volta che passage e query sono codificati e proiettati nello spazio vettoriale, si esegue uno dei seguenti:
- Nearest neighborhood search
- Ricerca del prodotto scalare piu alto tramite inner dot product

Quando si esegue una similarity search di questo tipo, trovare il passage piu simile per una query diventa piu difficile all'aumentare del numero di passage. Con decine di milioni di passage, anche calcolare il prodotto interno con forza bruta per ogni caso diventa molto costoso.
## Nearest Neighbor Search
Si puo trovare il vettore passage piu vicino al vettore query usando la distanza euclidea o L2. Ma per efficienza computazionale, di solito si usa il prodotto interno.

## MIPS
Maximum Inner Product Search

$$v_i\in V,  argmax(q^Tv_i)$$

Un approccio semplice: calcolare il prodotto interno per tutti gli $i$ passage. Il problema e trovare un modo efficiente per farlo quando i passage sono moltissimi.

In pratica, prendendo Wikipedia come riferimento, ci sono circa 5 milioni di documenti, e a seconda del task questo puo scalare a miliardi o persino bilioni. Questo a livello di documenti -- se i passage vengono considerati a livello di paragrafo, lo spazio di ricerca cresce ulteriormente.

**In altre parole, esplorare tutti gli embedding dei documenti con forza bruta non e fattibile.**

## Soglie della Similarity Search
- Velocita di ricerca
  - Quanto tempo serve per trovare i k vettori passage piu simili per query?
- Utilizzo di memoria
  - Dove vengono memorizzati tutti i vettori nello spazio vettoriale?
  - Sarebbe comodo avere tutto in RAM, ma e praticamente impossibile.
  - Se tutto fosse su HDD, sarebbe molto lento.
- Accuratezza
  - Se non si usa la forza bruta, bisogna sacrificare l'accuratezza in qualche misura -- fino a che punto?

![](/assets/images/Passage Retrieval - Scaling up/e24de2b9-1476-40d2-bf57-99346a3fa57e-image.png)

Tempo di ricerca e recall sono generalmente proporzionali. Una ricerca piu accurata richiede piu tempo.

Questi problemi di soglia diventano piu concreti all'aumentare delle dimensioni del corpus:
- Lo spazio di ricerca aumenta, rendendo la ricerca piu difficile.
- Serve piu spazio di memoria.
- Lo sparse embedding peggiora ulteriormente questi problemi.
  - In parte alleviato dalla compressione.

![](/assets/images/Passage Retrieval - Scaling up/8afc7957-1279-4f37-b2e9-acdb4d49dd08-image.png)

Con dimensione = 768, assumendo circa 1 miliardo di documenti (scala Wikipedia), lo spazio di memoria richiesto e 3TB. Oltre 1 bilione, sono 3PB.

Anche se il corpus usato nella maggior parte delle competizioni e del codice di pratica e nell'ordine dei milioni, 3GB sono gia tanti... La compressione e essenziale per un uso efficiente della memoria.


# Approssimazione della Similarity Search

## Compressione - SQ
Scalar Quantization.
I vettori sono tipicamente rappresentati con dimensione di 4 byte (int). Ma non tutti i 4 byte vengono effettivamente usati. Quindi si comprime il vettore riducendo i byte usati -- questa e la SQ.

es. 4 byte floating point -> 1 byte unsigned integer

## Pruning - IVF
**Pruning** (potatura). Nel passage retrieval, significa formare cluster tramite clustering.
Se il clustering e fatto bene, il MIPS puo essere eseguito in modo molto efficiente. Il problema di forza bruta su tutti i dati viene ridotto a visitare solo m cluster (meno di k cluster totali) vicini.

IVF (Inverted File). Cercandolo, si riferisce a un inverted index. https://cloudingdata.tistory.com/45

IVF nel retrieval significa che l'ID del centroide di un cluster contiene tutti gli ID dei vettori appartenenti a quel cluster. Quindi se si trova l'ID del centroide piu vicino alla query, si possono confrontare rapidamente tutti i vettori di quel cluster.

![](/assets/images/Passage Retrieval - Scaling up/7e15239c-3b4f-48c4-91bb-a9a7418a0770-image.png)

# FAISS
Una libreria costruita da Facebook per similarity search e clustering. Open source. Ottimizzata per large scale, costruita in C++ ma wrappata in Python -- molto veloce e facile da usare.

## Come si usa
### Addestrare l'indice e mappare i vettori
- Clustering
  - Serve addestrare sui dati dei passage per il clustering dei passage.
- Scalar quantization
  - Quando si converte da 4 byte floating point a 1 byte integer, si identificano max e min dei dati per la conversione.
- Di solito si addestra sui dati di training, ma per efficienza si usa un campione dei dati di training come dati di training FAISS. Se i dati originali sono grandi, e comune campionare fino a circa 1/40.
![](/assets/images/Passage Retrieval - Scaling up/69716955-8db4-4ff1-88c9-58614bcff882-image.png)

Una volta definiti i cluster e il range SQ attraverso il training, i dati di training vengono inseriti nei cluster secondo le regole SQ.

### Ricerca basata sull'indice FAISS
1. Quando arriva una query, la si riformatta secondo le regole di cluster e SQ definite durante il training.
2. Si trova il cluster piu vicino.
3. Si determinano i top-k del cluster piu vicino.
![](/assets/images/Passage Retrieval - Scaling up/044202c1-7e0a-475e-9a6e-e7055d69e627-image.png)

## Product Quantization
[ref blog](https://datacrew.tech/product-quantizaton/)
In pratica, si usa spesso PQ al posto di SQ. Si dice che comprima meglio di SQ.