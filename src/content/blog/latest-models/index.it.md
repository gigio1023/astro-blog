---
title: "Modelli NLP recenti"
description: "Rassegna dei modelli NLP post-BERT tra cui XLNet, RoBERTa, BART, T5, Meena e language model controllabili come PPLM."
date: "2021-10-13T01:49:14.563Z"
tags: ["nlp"]
lang: it
translationOf: "latest-models"
draft: false
---

# XLNet
Problemi dei modelli esistenti:
- BERT
  - Predice i token [MASK] indipendentemente, quindi non può apprendere le relazioni tra token
  - I limiti della lunghezza dell'embedding impediscono l'apprendimento delle relazioni tra segmenti
- GPT
  - Addestrato solo in una direzione

XLNet è emerso per superare queste limitazioni.

## Relative positional encoding
Introdotto per superare il limite di training a 512 token. Rende il positional encoding esistente ([Ref](https://skyjwoo.tistory.com/entry/positional-encoding%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)) relativo.

![](/assets/images/최신 모델/894a3f8c-280e-46dc-afc3-da6e55068235-image.png)

- Il positional encoding esistente usa posizioni assolute: 0, 1, 2, 3...
- Il relative positional encoding usa distanze relative: 0-esimo, 1-esimo, 2-esimo...

-> Nessun limite di lunghezza della sequenza.

## Permutation language modeling
Eliminato il [MASK]. Invece, usa permutazioni per mescolare l'ordine dei dati durante il training, incoraggiando un apprendimento indipendente dall'ordine.
![](/assets/images/최신 모델/69701f1d-1b5b-44b8-b848-359d80d9d070-image.png)

## Prestazioni
![](/assets/images/최신 모델/2102ee3c-4d28-42ad-9caa-0970e790bbc8-image.png)

Ha superato i modelli precedenti su GLUE.

# RoBERTa
Stessa architettura di BERT, ma con cambiamenti nel metodo di training.
- Aumento del tempo di training + batch size + dati di training
- Rimossa la next sentence prediction
  - Non correlata al fine-tuning
  - Il paper sostiene che è troppo facile e peggiora le prestazioni del modello
- Aggiunte frasi più lunghe
- Dynamic masking
  - Applicati 10 pattern di masking diversi per campione di dati durante il training

# BART
Applicare insieme i metodi di training di BERT e GPT.
![](/assets/images/최신 모델/4d3287c1-654e-4bcf-b813-43feaf37d360-image.png)
![](/assets/images/최신 모델/13d2157f-66c7-4fdd-b91c-8050d5c77219-image.png)
A quanto pare, ha superato BERT e RoBERTa.

# T5
![](/assets/images/최신 모델/1bcdfcf3-5185-48d0-9f11-17f6b956c6eb-image.png)

LM unificato Transformer Encoder-Decoder -- il miglior LM dell'epoca.
Maschera più span e li ricostruisce tutti in una volta.

![](/assets/images/최신 모델/5a0180ab-e3d7-436a-9f54-e948514bc204-image.png)

![](/assets/images/최신 모델/f577a4da-6d1e-48c7-9f2e-7162ecacb72e-image.png)

Il modello con le migliori prestazioni su GLUE.

# Meena
Un LM progettato specificamente per la conversazione.
![](/assets/images/최신 모델/8e407b53-6ec5-47f8-9be0-67e0cb7217a8-image.png)

Composto da 1 Transformer encoder e più Transformer decoder.

- Trainato su 341GB di dati da social media, 2,6 miliardi di parametri.
- Ha proposto l'SSA (Sensibleness and Specificity Average) come metrica di valutazione per chatbot
  - SSA più alto per risposte specifiche e chiare.
  - Progettato per chiudere la falla per cui risposte vaghe potevano comunque produrre un chatbot funzionante.

![](/assets/images/최신 모델/f87c8902-9836-48c8-8618-50092c9c29e8-image.png)

# Controllable LM
LM in cui giudizi di valore umani come l'etica possono essere controllati.

## PPLM (Plug and Play Language Model)
![](/assets/images/최신 모델/f4265dd7-4e65-40f2-a6b4-184cf5438438-image.png)
- LM standard
  - Predice la parola successiva basandosi sulla distribuzione di probabilità
- PPLM
  - Regola la predizione della parola successiva secondo l'intento dello sviluppatore
  - Memorizza le parole future in un bag of words

Supponiamo di volere la frase "The chicken tastes delicious."
Ma il modello produce "ok" come ultima parola. PPLM usa la backpropagation per modificare il vettore di "chicken" in modo che "delicious" esca come parola finale.

**Vantaggio: nessun gradient update -- solo modifica dei vettori di output per guidare l'output desiderato.**

### Applicazioni
- Memorizzando parole di più categorie nel bag of words si possono produrre risultati cross-categoria.
  - Es., gioia + sorpresa + gaming
- Generare emozioni su categorie specifiche in altre lingue
  - Es., sostituire parole chiave religiose, politiche o razziali con parole neutre
- Regolare le distribuzioni di probabilità per creare rabbia graduale (un meme di internet)
  - Es., aumentare gradualmente la probabilità di parole legate alla rabbia

### Necessità
Un LM trainato solo su dati privi di bias non produce necessariamente output privi di bias. Metodi come PPLM aiutano a superare i limiti attuali dei LM.

# LM multi-modali
## LXMERT
Language model per il ragionamento cross-modale.
Learning Cross-Modality Encoder Representations from Transformers.
![](/assets/images/최신 모델/ae49ffc2-4884-464b-9445-5267fa4e41c3-image.png)

Le informazioni su immagine e linguaggio vengono embeddate separatamente e poi entrambe passate a un cross-modality encoder che genera informazioni combinate su immagine e linguaggio.

![](/assets/images/최신 모델/6f9ccfa5-8cf6-445d-b85c-4097188eb254-image.png)

Come mostrato sopra, poteva rispondere a domande in linguaggio naturale con risposte sia visive che testuali.

## BERT per visione e linguaggio
Stessa architettura di BERT. L'unica differenza è che immagini e testo vengono combinati usando [SEP] durante il training. Come prima, un classifier è attaccato al CLS token per la classificazione delle informazioni combinate immagine e testo.

![](/assets/images/최신 모델/9b72842e-e625-45de-a456-823fe475a816-image.png)

## DALL-E
La terza volta che incontro questo modello al Boostcamp.
![](/assets/images/최신 모델/66f3549d-2b77-4907-b5fb-63bf3048cddb-image.png)
Per generare immagini, bisogna apprendere i token immagine. Anche un'immagine (256, 256, 3) è molto grande, quindi si usa VQ-VAE per la riduzione dimensionale come mostrato sopra. Questo è un diagramma molto semplificato di VQ-VAE.

Una volta che le immagini possono essere convertite in latent vector, il resto è uguale a GPT.
![](/assets/images/최신 모델/2278744b-5c9f-4e93-ba02-f5702923c539-image.png)
Come GPT predice la frase successiva, DALL-E predice gli embedding immagine che seguono i 256 token di text embedding, trainando in modo autoregressivo.
