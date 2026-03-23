---
title: "Modelli avanzati di pre-training auto-supervisionato"
description: "Panoramica su GPT-2, GPT-3 e ALBERT: zero/few-shot learning, scaling dei modelli e approcci efficienti al pre-training."
date: "2021-09-18T11:08:52.241Z"
tags: ["nlp"]
lang: it
translationOf: "advanced-self-supervised-pre-training-model"
draft: false
---

# GPT-2
L'architettura di base è la stessa di GPT-1.
- Più layer Transformer impilati.
- Addestrato su un task di predizione della parola successiva.
- Usa più dati di addestramento
  - In particolare dati di qualità superiore
- Ha dimostrato capacità potenziali in impostazioni zero-shot
ref: [zero shot learning](https://velog.io/@stapers/%EB%85%BC%EB%AC%B8%EC%8A%A4%ED%84%B0%EB%94%94-Week9-10-Zero-shot-Learning-Through-Cross-Modal-Transfer)
Imparare a classificare dati mai visti durante l'addestramento.

![](/assets/images/Advanced Self-supervised Pre-training model/fb607f1a-4fe0-47cc-9754-4f58b7450794-image.png)

Il task fondamentale di GPT-2 è un language model che, dato un brano, predice sequenzialmente le parole successive come mostrato sopra. Dato un brano in stile narrativo, ha prodotto una continuazione fantasiosa plausibilmente scritta da un essere umano.

## decaNLP, motivazione di GPT-2
L'NLP tradizionale richiedeva architetture e soluzioni diverse per ogni task. Per esempio, per determinare il sentiment (positivo/negativo) di una frase, si passava il token CLS attraverso un output layer per la classificazione binaria. Per il QA serviva un'architettura completamente separata.

L'idea di decaNLP, arrivata 3-4 anni prima di GPT-2, era che tutti i task NLP potessero essere unificati come question answering. In pratica, trattare ogni task come un task di generazione in linguaggio naturale.

**Esempio: un task di classificazione del sentiment strutturato così:**
1. Si inserisce una frase arbitraria
2. Si aggiunge una domanda tipo 'What do you think about this document in terms of positive or negative?'
3. Ci si aspetta che il modello giudichi il sentiment della frase 1.

La domanda al punto 2 può essere liberamente modificata. Qualcosa come 'Do you think whether this sentence is positive or negative?' funziona ugualmente.

Per la summarization basta aggiungere 'What is the summarization of the above paragraph?' dopo la frase di input.

## Dataset di GPT-2
Per ottenere testo di qualità, sono state usate le seguenti fonti come dataset.
- Reddit
  - Se una discussione con 3+ karma (upvote) conteneva link esterni, i documenti a quei link erano considerati dati di qualità
  - Dati di Reddit e documenti dai link esterni referenziati sono stati usati come dataset
  - 45M link raccolti
- 8M documenti Wikipedia rimossi
- Dragnet (sembra essere una serie poliziesca)
- newspaper

## Preprocess
- BPE (Byte pair encoding)
- Frammentazione minima delle parole su più token del vocabolario

## Modifiche ai modelli
- Layer normalization
  - Applicata a livello di sotto-blocco o riposizionata rispetto alla posizione originale
- Inizializzazione dei pesi nel residual layer
  - All'aumentare dell'indice del residual layer, i valori di inizializzazione dei pesi sono resi inversamente proporzionali a $\sqrt{n}$.
  - L'obiettivo è che gli output delle trasformazioni lineari dei layer più vicini all'output si avvicinino a 0.
  - Questo riduce il ruolo dei layer successivi.
  - Risposta del mentore: andando più in profondità nel modello, si apprendono feature ad alta dimensionalità, quindi potrebbe servire a ridurne l'influenza?

## Question Answering
Usato CoQA (Conversational question answering dataset).
- Testato senza usare affatto questo dataset
  - F1 score = 55%
- Dopo il fine-tuning
  - F1 score = 89%

Ha mostrato un potenziale ancora maggiore per lo zero-shot learning rispetto a GPT-1.

## Summarization

![](/assets/images/Advanced Self-supervised Pre-training model/54b0c314-4525-41b1-9167-74b8e9a876e5-image.png)

Questa parte sembra necessitare di più spiegazioni dalla lezione. Non è possibile che un token TL;DR; esista per tutti i dati di addestramento..

I dati di addestramento di GPT-2 contengono molti documenti in cui un riassunto in una riga segue un token TL;DR;. Quindi, senza fine-tuning separato, come nello zero-shot learning, si può eseguire la summarization semplicemente aggiungendo un token TL;DR; alla fine del brano desiderato.

## Translation
Come il token TL;DR; per la summarization, aggiungendo una frase come 'in French' dopo la frase da tradurre si esegue il task di traduzione.

# GPT-3
Addestrando con molti più parametri, layer transformer e batch size maggiori rispetto a GPT-2, è stato prodotto un modello migliore.

## Few-shot learning
Se GPT-2 ha mostrato il potenziale per zero-shot e few-shot learning, GPT-3 ha dimostrato prestazioni molto elevate in queste aree.

![](/assets/images/Advanced Self-supervised Pre-training model/2668f8f5-e35d-47c3-b548-5d41228b28be-image.png)

I seguenti task di inferenza sono stati eseguiti senza modificare affatto il modello.
- Zero-shot: GPT-3 non è mai stato addestrato su dati di traduzione, eppure è in grado di tradurre senza fine-tuning.
- One-shot: si mostra al modello una sola coppia di esempio.
- Few-shot: si mostrano al modello diverse coppie di esempio.

![](/assets/images/Advanced Self-supervised Pre-training model/68579874-7c27-4d3e-8938-85890f933e74-image.png)

All'aumentare delle dimensioni del modello (numero di parametri), le prestazioni su task zero-shot, one-shot e few-shot continuano a migliorare. Questo suggerisce che modelli più grandi hanno una maggiore capacità di apprendimento dinamico.

# ALBERT
A Lite BERT.
Addestrare modelli di grandi dimensioni come BERT e GPT con self-supervised learning richiede molta memoria, molti parametri e grandi batch size. Ma queste risorse sono limitate. ALBERT è un'alternativa leggera che in realtà supera BERT nelle prestazioni.
- Ostacoli
  - Limiti di memoria
  - Velocità di addestramento
- Soluzioni
  - Factorized Embedding Parameterization
  - Cross-layer Parameter Sharing
  - (Per le prestazioni) Sentence Order Prediction

## Factorized Embedding Parameterization
![](/assets/images/Advanced Self-supervised Pre-training model/9c19439d-673b-4846-8cc6-a58de9926c6b-image.png)

- Transformer originale: a causa dei blocchi residual, la dimensione dell'embedding e la dimensione dell'output devono essere identiche, quindi tutte le dimensioni di input/output dei layer sono uguali.
- ALBERT: riduciamo le dimensioni di output per layer.

### Motivazione
- Embedding layer: un vettore che rappresenta solo informazioni a livello di parola come costanti, senza considerare il contesto
- Hidden state vector: un vettore che contiene informazioni semantiche contestualizzate

L'embedding layer porta meno informazioni rispetto all'hidden state vector. Quindi proviamo a suddividere l'embedding layer per rappresentarlo in una dimensione inferiore.

### Implementazione
![](/assets/images/Advanced Self-supervised Pre-training model/0dee7a07-9347-4262-be6c-1ce1985b6109-image.png)
Supponiamo che le parole siano embedded in 4 dimensioni. Allora, come nel diagramma, anche il word embedding layer è a 4 dimensioni. Vogliamo ridurre questo embedding layer a 2 dimensioni prima di inserirlo nel modello.

Se forniamo il layer V x E del diagramma come input al transformer, il numero di parametri del transformer sarà inferiore rispetto a prima.

Per l'operazione residual le dimensioni devono corrispondere all'input, ma il transformer produrrà output a 2 dimensioni. Quindi prima della connessione residual si aggiunge un layer come E x H nel diagramma per ripristinare le dimensioni originali. Di conseguenza, i parametri del transformer si riducono mentre l'output mantiene le stesse dimensioni dell'input. Questo approccio si chiama Low rank matrix factorization.

La Factorized Embedding Parameterization produce risultati che approssimano l'uso diretto degli embedding originali delle parole.

## Cross-layer Parameter Sharing
![](/assets/images/Advanced Self-supervised Pre-training model/b90f1049-accb-40d3-9c85-c7cd9e623a3f-image.png)

Nei transformer, i parametri apprendibili sono $W_n^Q, W_n^K, W_n^V$ per ogni self-attention layer e $W_O$ per ridurre la dimensione della matrice concatenata. Man mano che si impilano i transformer, il numero di parametri cresce. In ALBERT, questi parametri sono condivisi tra i layer di self-attention.

![](/assets/images/Advanced Self-supervised Pre-training model/fc8c39c3-3ef7-4f74-ab2a-3801921c84cf-image.png)

- Shared-FFN: condivisione solo dei parametri del feed-forward network
- Shared-Attention: condivisione solo dei parametri di attention
- All-shared: entrambi

Anche con all-shared, le prestazioni non sono significativamente peggiori rispetto a not-shared.

## Sentence Order Prediction
BERT viene addestrato in due modi.
- Masked language modeling: si sostituisce il k% dei token con mask token, poi si addestra
- Next sentence prediction: si concatenano due frasi con un token sep, poi si addestra

La ricerca ha mostrato che la next sentence prediction di BERT non è molto efficace. Escluderla dall'addestramento e fare solo masked language modeling produce comunque buone prestazioni.

Il motivo è che prevedere i sample negativi nella next sentence prediction si può fare semplicemente controllando se compaiono parole simili.
> Esempio: un articolo dalla sezione società e uno dalla sezione sport usano parole molto diverse, quindi frasi campionate da sezioni diverse sono facilmente prevedibili come non consecutive.

Frasi in relazione di successione condividono frequentemente parole identiche o simili, rendendo la predizione troppo facile.

Dato che la next sentence prediction si basa sulla presenza delle parole piuttosto che su un ragionamento di livello superiore, i modelli addestrati in questo modo non ricavano molte informazioni utili da essa.

ALBERT ha trasformato la next sentence prediction in sentence order prediction. Questo metodo richiede al modello di riconoscere coppie di frasi nell'ordine corretto. Al contrario, coppie nell'ordine sbagliato (sample negativi) devono essere riconosciute come tali.

Per minimizzare la sovrapposizione di parole tra le due frasi, vengono campionate dallo stesso documento. Questo costringe il modello a imparare la predizione dell'ordine considerando il contesto piuttosto che basandosi sulla presenza delle parole.

![](/assets/images/Advanced Self-supervised Pre-training model/0c88484e-052c-4874-a174-560c90c82f97-image.png)

Questa tabella mostra i risultati per NSP (Next sentence prediction) e SOP (Sentence order prediction). NSP mostra miglioramenti minimi e in alcuni casi peggiora. SOP ha ottenuto miglioramenti significativi.

![](/assets/images/Advanced Self-supervised Pre-training model/f344c656-a105-476d-b5da-0d6bde95cffe-image.png)
Su GLUE, benchmark per la valutazione dei task NLP, anche ALBERT supera i modelli esistenti.

# ELECTRA
Efficiently Learning an Encoder that Classifies Token Replacements Accurately. Un paper presentato dal team Google Research a ICLR 2020.

![](/assets/images/Advanced Self-supervised Pre-training model/634ddd5e-ec24-487b-ba83-2027e083684c-image.png)
I due modelli vengono addestrati in modo adversarial.
Link correlati: [Adversarial learning](https://green-late7.tistory.com/100), [Adversarial learning spiegazione dettagliata](https://medium.com/@jongdae.lim/%EA%B8%B0%EA%B3%84-%ED%95%99%EC%8A%B5-machine-learning-%EB%A8%B8%EC%8B%A0-%EB%9F%AC%EB%8B%9D-%EC%9D%80-%EC%A6%90%EA%B2%81%EB%8B%A4-part-8-d9507cf20352)

- Generator: Masked language model
  - Opera sullo stesso principio di BERT
  - Ripristina le frasi mascherate
- Discriminator: inferisce se la parola nella posizione del mask token è quella originale o una sostituta.
  - Esegue classificazione binaria basata su Transformer.
  - Ispirato alle GAN (Generative adversarial network).
  - Apprende confrontando il ground truth dei dati di addestramento con l'output del Discriminator.

**Come modello pre-trained si usa il Discriminator, non il Generator.**

## Performance
![](/assets/images/Advanced Self-supervised Pre-training model/1770209f-2f5e-4ad0-9fd8-4192bf586d95-image.png)

Ha ottenuto punteggi GLUE più alti rispetto ai modelli esistenti a parità di risorse computazionali. Insieme ad ALBERT, è ampiamente usato in molti downstream task.

[Cos'è un Downstream Task](https://velog.io/@nawnoes/Downstream-Task%EB%9E%80)

# Modelli leggeri
BERT, GPT ed ELECTRA hanno moltissimi parametri perché hanno ottenuto miglioramenti prestazionali impilando molti blocchi di self-attention. Modelli leggeri che riducono questi parametri per diminuire dimensioni e tempi di addestramento sono oggetto di ricerca attiva.

Sono usati per eseguire modelli in modo rapido e a basso consumo energetico su dispositivi mobili invece che su risorse cloud o di high-performance computing.

## DistillBERT
Un paper presentato da HuggingFace a NeurIPS 2019.

Consiste in un modello teacher e uno student.
- Teacher: mantiene l'architettura grande, apprende le feature e addestra il modello student.
- Student: nonostante abbia meno layer e parametri del teacher, cerca di imitarne le feature.

### Funzionamento
**Teacher: come il Seq2Seq di BERT.**
1. Con 'I go home' come input, il teacher nel Seq2Seq cerca di predire 'go' per 'I'.
2. Per l'input 'I', viene generato un vettore di dimensione pari al vocabolario e si applica softmax.
3. Il valore con la probabilità più alta nel risultato del punto 2 dovrebbe corrispondere all'indice per 'go'.

**Student: si addestra usando l'output del teacher (target distribution) come ground truth.** Semplicemente cerca di imitare l'output del teacher.

## TinyBERT
L'architettura teacher-student è la stessa di DistillBERT. TinyBERT non imita solo la distribuzione dell'output del teacher — imita anche i prodotti intermedi come query, key, value e hidden state.

Dato che lo student è un modello leggero, le dimensioni dei suoi layer sono più piccole di quelle del teacher. Questo diventa un problema durante l'imitazione, risolto aggiungendo layer fully connected che riducono le dimensioni del teacher.

# Integrazione di Knowledge Graph nei Language Model
BERT eccelle nella comprensione del contesto e nel calcolo della similarità tra parole, ma talvolta non riesce a gestire efficacemente informazioni al di fuori del dataset dato.

**Esempio: supponiamo che il dataset contenga solo la frase 'Ho scavato il terreno' per l'azione di scavare.**
Se un task di Question Answering chiede 'Quale strumento è stato usato?' riguardo a questa frase, i modelli esistenti potrebbero avere difficoltà a rispondere. Semplicemente non c'è l'informazione.
Gli esseri umani potrebbero usare il 'senso comune' come conoscenza esterna per inferire gli strumenti usati in varie situazioni e rispondere di conseguenza.

Questo è il campo che mira a incorporare tali informazioni esterne nei modelli.

**Knowledge graph: informazioni organizzate sistematicamente**

Modelli rappresentativi
- ERNIE
  - Information fusion layer takes the concatenation of the token embedding and
entity embedding
- KagNET
  - For each pair of question and answer candidate, it retrieves a sub-graph from
an external knowledge graph to capture relevant knowledge
