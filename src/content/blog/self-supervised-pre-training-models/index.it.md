---
title: "Modelli pre-addestrati con self-supervised learning"
description: "Panoramica sui modelli pre-addestrati con self-supervised learning tra cui GPT-1 e BERT, con masked language modeling e transfer learning."
lang: it
translationOf: "self-supervised-pre-training-models"
date: "2021-09-18T10:51:48.531Z"
tags: ["nlp"]
draft: false
---

# Tendenze recenti
- Transformer e self-attention vengono usati oltre la traduzione automatica.
- Gli esperimenti hanno dimostrato che impilare semplicemente più transformer -- 12, 24 o più invece dei 6 proposti nel paper originale -- migliora le prestazioni, senza modifiche architetturali speciali. Si usano framework di self-supervised learning per addestrare questi modelli su dati su larga scala.
  Es. BERT, GPT-3, XLNet, ALBERT, RoBERTa, Reformer, T5, ELECTRA
- Dopo questo tipo di addestramento, il solo transfer learning su vari domini e task supera modelli specificamente progettati per quelle aree.
- Applicazioni: sistemi di raccomandazione, drug discovery, computer vision...
- Limitazione: ancora bloccati sul greedy decoding. Decodifica da sinistra a destra, facendo la scelta migliore a ogni passo.

# GPT-1
Ha unificato più task NLP.

![](/assets/images/Self-supervised Pre-training models/9dcd16aa-dec1-41de-a3cc-bab14982e8c3-image.png)
12 transformer impilati.

## Seq2Seq standard
Il processo di addestramento standard delle sequenze è lo stesso del transformer base trattato nei post precedenti. Per produrre 'I go home', l'input parte con '[SOS]' per generare 'I', poi 'I' viene dato in input per produrre 'go', e così via.

## Classification
![](/assets/images/Self-supervised Pre-training models/abfa3113-89f0-483c-98e4-060457015953-image.png)
Implementato aggiungendo token di start ed extract all'inizio e alla fine del testo durante il Seq2Seq.

1. Dopo il training del transformer, si formano vettori di encoding con lo stesso formato dell'input.
2. Il valore alla posizione del token extract nel vettore di encoding viene usato per la classificazione.
   Es. sentimento della frase (positivo/negativo)
3. Il Seq2Seq può continuare usando i valori rimanenti del vettore di encoding escluso il token extract.

## Entailment
![](/assets/images/Self-supervised Pre-training models/6cb1708f-394e-4e05-84bb-799250c9db2d-image.png)
Un task che determina se premessa e ipotesi hanno una relazione di implicazione logica o di contraddizione.
In GPT-1, premessa e ipotesi vengono combinate in un'unica sequenza per risolvere il task. Il token extract funge da query nel transformer, estraendo informazioni rilevanti dalle altre posizioni nella sequenza.

1. Un delimitatore chiamato Delim viene posto tra le due frasi, e un token Extract alla fine.
2. Il token extract dal vettore di encoding viene passato attraverso l'output layer per determinare la relazione logica.

## Transfer learning
Un modello GPT-1 addestrato per un task specifico può essere riusato per altri task.
Ad esempio, supponiamo di voler riutilizzare un modello di analisi del sentimento per la classificazione dei temi.

![](/assets/images/Self-supervised Pre-training models/abfa3113-89f0-483c-98e4-060457015953-image.png)

L'output layer esistente è una rete neurale lineare per la classificazione del sentimento. Quindi lo si rimuove e si attacca una nuova rete neurale lineare per la classificazione dei temi dopo il transformer.

È la stessa idea di cambiare solo il numero di output dell'ultimo layer di classificazione in una CNN per eseguire un task di classificazione arbitrario. La rete pre-addestrata viene mantenuta intatta, e solo l'output layer viene inizializzato e addestrato.

### Self-supervised learning
GPT usa dati non etichettati per addestrare il modello pre-addestrato su un task Seq2Seq. Poiché è un task di predizione della prossima parola, non serve etichettatura. Qui entra in gioco il self-supervised learning.

Ma la classificazione dei temi richiede dati etichettati. I dati etichettati sono di solito molto meno di quelli non etichettati, il che è svantaggioso per l'addestramento.

Poiché il modello è stato pre-addestrato con self-supervised learning su grandi dati, la maggior parte dei parametri è inizializzata in modo significativo. Quindi basta una piccola quantità di dati etichettati per il transfer learning per produrre un modello performante.

![](/assets/images/Self-supervised Pre-training models/2ee91262-d36c-41c8-942e-b0a4ad5eac20-image.png)

La tabella sopra confronta combinazioni modello+dati specifiche per task con GPT. Il pre-training su grandi dati seguito da transfer learning mostra prestazioni migliori.

# BERT
![](/assets/images/Self-supervised Pre-training models/449f50bc-7b49-45a2-bb43-29df3b933f7b-image.png)

Bidirectional Transformers for Language Understanding. Tentativi precedenti usavano LSTM per self-supervised learning su grandi dati, ma BERT ha ottenuto prestazioni molto migliori.

## Motivazione
I modelli della famiglia RNN acquisiscono informazioni in una sola direzione. Questo è un approccio molto debole per task che richiedono la comprensione del contesto completo. Il Masked Language Model di BERT è stato creato per acquisire informazioni bidirezionalmente.

## Masked Language Model (MLM)
Le parole nella sequenza di input vengono sostituite casualmente con maschere. Il modello viene addestrato a inferire le parole mascherate.

Iperparametro $k$: il livello di probabilità per mascherare le parole.
- $k$ troppo alto: troppe informazioni nascoste, rendendo difficile inferire i dati mascherati.
- $k$ troppo basso: il training richiede troppo tempo o l'efficienza cala.

Tipicamente si usa $k=15$.

**Effetto collaterale**
Anche se si intende mascherare il 15% delle parole, sostituire tutto quel 15% con token mask causa problemi.

Il modello pre-addestrato si abitua ad avere il 15% dei dati come token mask, ma i dati di test reali probabilmente non li avranno. Questa discrepanza ostacola significativamente il transfer learning.

**Soluzione**
Il $k\%$ dei dati viene classificato così:
- L'80% viene sostituito con token mask.
- Il 10% viene sostituito con parole casuali. Per aiutare il modello a gestire parole strane in input.
- Il 10% mantiene l'originale. Per aiutare il modello ad affermare con sicurezza che l'originale è corretto.

## Next Sentence Prediction
Un metodo proposto da BERT per gestire task a livello di frase, simile all'approccio di GPT.

![](/assets/images/Self-supervised Pre-training models/ff485e36-afd9-4b14-af63-693cb810cbef-image.png)

Simile ai token extract e delimiter di GPT, BERT usa token CLS e SEP.
- SEP: separa le frasi.
- CLS: contiene informazioni di classificazione. Posto all'inizio.
- MASK: la maschera usata nel masked language model.

Il task mostrato nella figura determina se due frasi sono adiacenti. Il token CLS contiene dati binari. Tutte le informazioni nella figura vengono passate al transformer contemporaneamente, e la rete produce il risultato della predizione al token CLS.

## Architettura BERT
### Model Architecture
  - L: Layer
  - H: dimensione del vettore di encoding dell'Attention
  - A: Attention head per layer
  - BERT Base: L=12, A=12, H=768
  - BERT Large: L=24, A=16, H=1024

### Input Representation
- WordPiece embedding: embedding a livello di subword anziché di parola (30.000 WordPiece)
- Learned positional embedding
![](/assets/images/Self-supervised Pre-training models/7ce8492c-8515-449c-92c3-a0b0daf049c8-image.png)
Il Transformer originale usava sin/cos con offset predeterminati per il positional embedding. BERT apprende questa matrice end-to-end, come l'apprendimento dei vettori di embedding in Word2Vec.
- Segment Embedding

#### Segment Embedding
![](/assets/images/Self-supervised Pre-training models/8949e7c7-6900-43fa-a3b9-ccdc797248a8-image.png)
Il positional embedding fornisce l'ordinamento, ma non riconosce i confini tra frasi.

Nella Next Sentence Prediction, 'he' dopo un token SEP dovrebbe essere trattato come la prima parola di una nuova frase, ma a livello di sequenza non è il primo -- da qui il problema. Il segment embedding lo risolve.

La distinzione tra frasi prima e dopo SEP viene calcolata tramite segment embedding e semplicemente sommata.

## Bidirezionale
![](/assets/images/Self-supervised Pre-training models/4bb1e6ca-012b-47e1-9b14-f19482403798-image.png)

GPT usa masked self-attention per impedire di guardare le informazioni future -- perché non si può vedere la parola successiva quando la si sta predicendo.

BERT vede l'intera sequenza poiché è mascherata. Deve vedere il contesto completo per predire le maschere. Quindi BERT usa la self-attention standard del transformer originale.

## Transfer learning
![](/assets/images/Self-supervised Pre-training models/be38af2c-5672-47d8-b674-405d529f9c80-image.png)

Dato un BERT pre-addestrato con self-supervised learning, sono possibili i seguenti task. Simile a GPT.

### Classificazione di coppie di frasi

![](/assets/images/Self-supervised Pre-training models/854f091e-26f9-4c20-beff-7e9a0bd29a5a-image.png)

1. Due frasi vengono unite con un token SEP.
2. Un token CLS viene posto al primo indice e passato attraverso BERT.
3. Il token CLS dal vettore di encoding viene passato all'output layer per ottenere un'etichetta di classe.

### Classificazione di frase singola
![](/assets/images/Self-supervised Pre-training models/d2895a2e-c83c-4d98-9c73-913e2d4b8245-image.png)
Uguale alla classificazione di coppie di frasi, ma con una sola frase e solo un token CLS.

### Tagging di frase singola
![](/assets/images/Self-supervised Pre-training models/cf90374c-0ed6-4100-82ed-fceedc0711d6-image.png)

Ogni parola ha un vettore di encoding, e ciascuno viene passato attraverso l'output layer per determinare POS, morfemi e altre informazioni.

# BERT vs GPT-1
- Dimensione del training
  - GPT: BookCorpus (800M parole)
  - BERT: BookCorpus + Wikipedia (2.500M parole)
- BERT: ha token SEP e CLS. Usa segment embedding per distinguere le frasi.
- Batch size
  - BERT: 128.000 parole
  - GPT: 32.000 parole
  - Un batch size più grande generalmente significa training più stabile e migliore.
  Usare gradienti calcolati in un singolo passaggio è meglio che mediare gradienti da più iterazioni.
- Fine-tuning specifico per task
  - GPT: ha usato learning rate 5e-5 per tutti i task.
  - BERT: ha fatto fine-tuning del learning rate per ogni task.

# MRC (Machine Reading Comprehension), Question Answering
Leggere un testo e rispondere a domande su di esso.
![](/assets/images/Self-supervised Pre-training models/d9e0adf8-0f25-407f-be4e-f9f278d99288-image.png)
Come mostrato sopra, è necessaria una corretta comprensione dei soggetti e delle azioni nel documento per rispondere.

## SQuAD 1.1
Stanford Question Answering Dataset per testare le prestazioni dei modelli QA con MRC. Esiste anche la versione 2.0. C'è una leaderboard per i punteggi sul test set.

## Processo di risoluzione SQuAD 1.1
![](/assets/images/Self-supervised Pre-training models/5d8ffe38-4dd6-472d-a1af-f22eff6f26b0-image.png)
Tipicamente la risposta si trova in una posizione specifica nel passaggio; l'obiettivo è trovare quella posizione.
1. Concatenare domanda e passaggio usando un token SEP.
2. Ottenere il vettore di encoding per i dati concatenati.
3. Aggiungere un fully connected layer per ridurre il vettore di encoding a uno scalare per trovare il punto di inizio, poi applicare softmax.
4. Aggiungere un altro fully connected layer per trovare il punto di fine, poi applicare softmax.
5. Due fully connected layer su un singolo vettore di encoding producono i punti di inizio e fine della risposta.

## Processo di risoluzione SQuAD 2.0
Nella 1.1 c'è sempre una risposta, ma la 2.0 include casi in cui nessuna risposta esiste nel passaggio.

Quindi prima deve venire un task per determinare se una risposta esiste. Se esiste, si procede con il processo SQuAD 1.1.

1. Concatenare domanda e passaggio, aggiungere un token CLS.
2. Aggiungere un fully connected layer per binary classification usando il valore del token CLS.
3. Classificare usando cross entropy.

# SWAG
Un task che sceglie la frase successiva più probabile data una frase precedente.
![](/assets/images/Self-supervised Pre-training models/3b64218d-f588-4185-9144-e47eadeace3e-image.png)

1. Concatenare la premessa con ogni scelta di risposta separatamente.
   Es. Premessa + Scelta 1, Premessa + Scelta 2, ...
2. Ottenere vettori di encoding per ogni concatenazione.
3. Passare ogni vettore di encoding attraverso l'output layer per ottenere uno scalare. Lo stesso output layer viene usato per tutti.
4. Applicare softmax ai risultati scalari e scegliere la scelta con la probabilità più alta.

# BERT: Ablation study
![](/assets/images/Self-supervised Pre-training models/b2eb659a-3768-4e91-9fc0-5d06324adad9-image.png)
Le prestazioni di BERT sono migliorate con più parametri.
