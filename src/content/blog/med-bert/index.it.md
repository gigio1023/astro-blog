---
title: "Med-BERT"
description: "Revisione del paper su Med-BERT, un modello in stile BERT pre-addestrato su dati EHR strutturati con codici ICD per task di predizione di malattie."
date: "2022-05-17T00:00:00.000Z"
tags: ["nlp", "paper-review"]
draft: false
lang: it
translationOf: "med-bert"
---

# Contributi principali

I contributi dichiarati dal paper sono:
1. Primo studio che dimostra quanto sia significativo un modello BERT-style addestrato su EHR strutturate per task di modellazione del mondo reale.
2. Design di un task di pre-training domain-specific cross-visit che cattura semantiche generali e contestuali nei dati EHR.
3. Prima dimostrazione di prestazioni superiori ai metodi SOTA su molteplici task clinici in coorti fenotipizzate.
4. Generalizzazione del modello EHR BERT usando un dataset (Truven) diverso da quello di training (Cerner).
5. Il miglioramento delle prestazioni di Med-BERT si osserva per tutte le dimensioni del campione. Il modello pre-addestrato funziona bene anche con dati di training limitati.
6. Fornitura di uno strumento di visualizzazione per la semantica di dipendenza degli EHR.
7. Rilascio del modello pre-addestrato e del codice.

# Abstract
Studi precedenti che tentavano di modellare EHR strutturate con transfer learning includono BEHRT e G-BERT.

BEHRT ha fatto pre-training tramite predizione di medical code sulle visite. Ha usato metriche non standard come AUC, rendendo difficile il confronto con studi precedenti.

G-BERT ha appreso embedding GNN e BERT tramite codici clinici. Ha modificato il task di pre-training MLM in un task domain-specific che massimizza la differenza tra codici clinici esistenti e inesistenti e predice codici diversi. Tuttavia, i dati di input di G-BERT erano campioni single-visit, insufficienti per identificare informazioni contestuali a lungo termine negli EHR.

Partendo da questi problemi e per costruire un modello specializzato nella predizione di malattie, il paper ha progettato Med-BERT. A differenza del BERT originale che apprende da testo libero, Med-BERT usa dati diagnostici strutturati basati su codici ICD (International Classification of Disease).

# Confronto con studi correlati
![](/assets/images/Med-BERT/20220517112753.png)

Med-BERT ha un vocabolario più grande e una coorte di pre-training più ampia rispetto a BEHRT e G-BERT. Il paper sostiene che la coorte più grande e le sequenze di visite più lunghe aiutano a comprendere meglio la semantica contestuale.

Inoltre, essendo pre-addestrato con vocabolari grandi e pubblicamente accessibili come ICD-9 e ICD-10 e con dati di più istituzioni, il paper sostiene che sia adatto a diverse istituzioni e scenari clinici.

Come BEHRT e G-BERT, Med-BERT usa code embedding per i codici clinici, visit embedding per visite diverse e transformer per identificare le inter-relazioni tra i codici. A differenza di BEHRT e G-BERT che non usavano l'ordinamento dei codici nelle visite, Med-BERT usa serialization embedding per rappresentare l'ordine relativo dei codici.

Il paper ha progettato un task di pre-training domain-specific per predire la degenza ospedaliera prolungata (Prolonged LOS). Questo è un problema clinico noto che richiede modellazione per valutare la gravità delle informazioni sanitarie del paziente in base alla progressione della malattia e non richiede annotazione umana. Apprendere questo task aiuta il modello ad apprendere meglio feature cliniche e contestualizzate.

# Fine-tuning
L'utilità di Med-BERT pre-addestrato viene valutata tramite fine-tuning su due task di predizione da 3 coorti di pazienti di due dataset EHR diversi:
- Insufficienza cardiaca tra pazienti con diabete (DHF)
- Insorgenza di cancro pancreatico

Questi task differiscono dai task di predizione del pre-training (MLM e Prolonged LOS), quindi sono buoni per valutare la generalizzazione del modello. Le ragioni per cui questi 2 task sono stati scelti:
- Contengono informazioni più complesse dei singoli codici diagnostici.
- Si basano su algoritmi di fenotipizzazione che integrano informazioni oltre i codici diagnostici, come vincoli temporali, momento della diagnosi, farmaci e dati di laboratorio.

Il fine-tuning è stato condotto con questi obiettivi:
- Testare il miglioramento delle prestazioni aggiungendo Med-BERT a 3 modelli SOTA
- Confrontare Med-BERT con embedding non contestualizzati pre-addestrati (stile word2vec)
- Prestazioni di predizione malattie di Med-BERT per diverse dimensioni del training set di fine-tuning

# Architettura di Med-BERT
## Modalità dei dati di input
Si usa la stessa architettura (multi-level embedding, transformer bidirezionale) e tecniche di pre-training simili (funzione di loss su masking, task di classificazione per pre-training) del [paper BERT originale](https://arxiv.org/abs/1810.04805). Data la differenza semantica tra EHR e testo, è importante adattare la metodologia di BERT agli EHR strutturati.

![](/assets/images/Med-BERT/20220517135319.png)
I dati di input del BERT originale sono 1D, ma gli EHR strutturati sono dati in stile multilayer e multi-relazione. Quindi è importante come appiattire i dati EHR strutturati in 1D e codificarli per BERT.

La Tabella 3 esplicita queste differenze.

![](/assets/images/Med-BERT/20220517135430.png)

## Architettura del modello

![](/assets/images/20220517135639.png)

Med-BERT ha 3 tipi di input:
- code embedding
  - Rappresentazioni a bassa dimensionalità di ogni codice diagnostico
- serialization embedding
  - Ordine relativo di ogni visita. Per i dati di questo paper, l'ordine di priorità di ogni codice in ogni visita.
- visit embedding
  - Distinzione di ogni visita nella sequenza

A differenza di BERT, non si usano [CLS] e [SEP]. Dato che la sequenza è troppo lunga per riassumere le informazioni nel [CLS], si usa un feed-forward layer separato per comprimere il contenuto dei token di output. Inoltre il visit embedding da solo è sufficiente per separare le informazioni delle visite, quindi [SEP] non è necessario.

# Pre-training di Med-BERT
Il pre-training è stato fatto con gli iperparametri e l'algoritmo raccomandati dal paper BERT originale.

## Masked LM
Si usa l'algoritmo di masking del paper BERT originale. Un codice casuale viene convertito in token [MASK] con probabilità dell'80%, in un codice casuale con probabilità del 10%, e rimane invariato con probabilità del 10%.

## Predizione della degenza ospedaliera prolungata (Prolonged LOS)

Per la generalizzabilità del modello pre-addestrato, si è scelto un problema clinico non disease-specific e simile al dataset di pre-training. I candidati per il task di pre-training includevano indicatori di qualità delle cure, mortalità, ri-ospedalizzazione precoce e Prolonged LOS. Mortalità e ri-ospedalizzazione precoce hanno mostrato accuratezze superiori al 99%, risultando task relativamente facili. Quindi si è scelto come task di pre-training la valutazione se la degenza supera i 7 giorni.

Strutturalmente, il Prolonged LOS sfrutta la struttura bidirezionale di Med-BERT perché le informazioni sanitarie delle visite passate influenzano il LOS delle visite successive. Al contrario, l'insorgenza di malattia o la mortalità terminano sempre all'ultima visita della sequenza, quindi hanno una struttura unidirezionale.

# Task di predizione downstream tramite fine-tuning
Il modello pre-addestrato produce solo embedding generali per i dati di input, non etichette di predizione.

Nei modelli predittivi EHR, si usa una RNN come prediction head.

# Valutazione
Si è valutato eseguendo due task di predizione di malattie su 3 coorti da 2 database.
- Due task: predizione di DHF e PaCa
- 3 coorti: DHF-Cerner e PaCa-Cerner per entrambi i task; Truven solo per la predizione del cancro pancreatico

A differenza di BEHRT e G-BERT, in Med-BERT i task di pre-training e valutazione sono più complessi e richiedono fenotipizzazione da prospettive multiple. Quindi il paper sostiene che la sua metodologia è più realistica e aiuta a stabilire la generalizzabilità.

Metodi usati per il confronto:
- GRU, Bi-GRU
- RETAIN: un modello popolare per la predizione di malattie con doppia GRU e modello di attention
- L2LR: regressione logistica con regolarizzazione L2
- RF: random forest

![](/assets/images/20220517160625.png)



# Riferimenti
- Med-BERT: https://www.nature.com/articles/s41746-021-00455-y
- Med-BERT Github: https://github.com/ZhiGroup/Med-BERT
- BEHRT: https://www.nature.com/articles/s41598-020-62922-y
- G-BERT: https://arxiv.org/abs/1906.00346
