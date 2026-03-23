---
title: "Addestramento di BERT"
description: "Dettagli della pipeline di addestramento BERT: creazione del tokenizer, costruzione del dataset con NSP, strategie di masking, gestione dei segmenti e troncamento."
date: "2021-09-28T02:22:24.556Z"
tags: ["nlp"]
draft: false
lang: it
translationOf: "training-bert"
---

# Processo
1. Creare il Tokenizer
2. Costruire il Dataset
3. NSP (Next Sentence Prediction)
4. Masking

# Addestramento
Questo contraddice in parte quello che avevo imparato prima, quindi lo annoto.

> Per task specifici di dominio, addestrare da zero usando **solo dati del dominio specifico** funziona meglio del fine-tuning di un modello pre-addestrato.

![](/assets/images/Training BERT/54e501c8-a585-4e61-b0dd-0f09f295c423-image.png)
ref: https://huggingface.co/microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract

Questo è un paper che ha addestrato BERT da zero usando dati da PubMed, uno dei più grandi archivi di articoli biomedici.

![](/assets/images/Training BERT/4e949c96-0eef-437c-a499-dcf459faa0b6-image.png)

Questi sono i punteggi di BERT su task biomedici. Per esempio, BC5-chem è un task di NER chimico. Per questi task specifici di dominio, addestrare BERT da zero su dati biomedici ha superato il fine-tuning.

# Dati
![](/assets/images/Training BERT/b2f590fc-3d8a-46d0-b00a-2e19fd8f2ffd-image.png)
## Dataset
Si trasformano i dati in una forma che il modello può consumare. Per BERT, bisogna creare:
- input_ids: Vocab ID generati tramite Token Embedding.
- token_type_ids: Segment ID generati tramite Segment Embedding.
- Informazioni di Positional encoding.

### target_seq_length
https://github.com/huggingface/transformers/blob/5e3b4a70d3d17f2482d50aea230f7ed42b3a8fd0/src/transformers/data/datasets/language_modeling.py#L247

Questo è codice di BERT su GitHub. La dimensione dell'embedding viene controllata così:
- max_num_tokens: numero massimo di token che possono entrare in BERT.

```python
target_seq_length = max_num_tokens
if random.random() < self.short_seq_probability:
     target_seq_length = random.randint(2, max_num_tokens)
```
short_seq_probability rende target_seq_length variabile casualmente.

Il motivo è la generalizzazione del modello. Se tutti i dati vengono impacchettati al max_num_tokens, il modello potrebbe non gestire bene altre lunghezze. Quindi la dimensione massima dell'embedding viene regolata casualmente per produrre un modello più flessibile.

### Controllo dei segmenti
https://github.com/huggingface/transformers/blob/5e3b4a70d3d17f2482d50aea230f7ed42b3a8fd0/src/transformers/data/datasets/language_modeling.py#L258

Dalla riga 258, il codice controlla i segmenti. Il dataset cerca di riempire la dimensione massima dell'embedding. Ovvero, **se 'frase_1[SEP]frase_2' è troppo corta, creerà qualcosa come 'frase_1+frase_2[SEP]frase_3+frase_4'.** I segmenti sono comunque solo 2 — 'frase_1+frase_2' diventa un unico segmento.

Il codice taglia casualmente la lunghezza del Segmento A — sceglie un intero casuale e usa solo quei token come segmento.

### Troncamento (Truncation)
https://github.com/huggingface/transformers/blob/5e3b4a70d3d17f2482d50aea230f7ed42b3a8fd0/src/transformers/data/datasets/language_modeling.py#L293

'SegmentoA[SEP]SegmentoB' potrebbe superare la dimensione massima dell'embedding. In quel caso serve il troncamento.

Il troncamento ripete:

1. Scelta casuale tra Segmento A o B.
2. Rimozione dell'ultimo token dal segmento scelto.
3. Controllo del conteggio dei token; se serve ancora troncamento, tornare al passo 1.

## Dataloader
Determina come i dati vengono consegnati al modello. Per BERT, questo si riduce alla strategia di masking.
