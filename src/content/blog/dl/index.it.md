---
title: "Deep Learning"
description: "Fondamenti del deep learning: componenti chiave (dati, modello, loss, optimizer) e breve storia da AlexNet a GPT-3."
date: "2021-01-01"
tags: ["dl", "ml"]
draft: false
lang: it
translationOf: "dl"
---

# DL
Le lezioni del Boostcamp hanno chiarito cose che capivo vagamente.
Molte cose ovvie, ma ho scritto tutto comunque.

## Capacità necessarie
- Capacità implementative
- Capacità matematiche (algebra lineare, probabilità)
- Conoscere molti paper sulle tendenze più recenti

## Definizione
![](/assets/images/DL /ca2391dc-7082-4d0c-9318-adaf8ae8d212-image.png)

AI = mira a imitare l'intelligenza umana
ML = approccio basato sui dati per risolvere problemi
DL = quando si imita l'intelligenza umana con approccio basato sui dati, il sottocampo che usa le NN

## Componenti chiave
- Data: da cui il modello può apprendere
- Model: come trasformare i dati
- Loss function: che quantifica quanto è cattivo il modello
- Algorithm: regola i parametri per minimizzare la loss

### Data
![](/assets/images/DL /e0b03f19-eeb4-4af7-b923-11162a010c1d-image.png)
Varia in base alla definizione del problema.
- Classification: dati etichettati
- Semantic segmentation: dati di segmentazione
- Detection: dati con bounding box
- Pose estimation: dati scheletrici
- Visual QnA: dati colore, ecc...

### Model
Serve un modello appropriato per la definizione del problema.

### Loss function
Quando dati e modello sono fissati, definisce come allenare secondo la definizione del problema.
![](/assets/images/DL /0dcd9b7d-2e4e-407b-958f-8a98c1a9ffdc-image.png)

Anche se la loss function funziona correttamente, non c'è garanzia che produca i risultati desiderati.

Ad esempio, supponiamo un problema di regressione con dati molto rumorosi.
Gli outlier verranno amplificati enormemente dal quadrato della MSE.

Per prevenire questo, si può considerare l'uso del valore assoluto al posto del quadrato nella MSE, o usare una loss function completamente diversa.

Quindi definirla in modo appropriato secondo il problema e i dati.

### Algoritmo di ottimizzazione
undefined

Metodi che ottimizzano la loss function.

Di solito si usa l'informazione della derivata prima dei parametri della NN rispetto alla loss function. Usarla direttamente è SGD.
In pratica SGD si usa raramente; gli altri si usano.

Altre tecniche usate:
- Dropout
- Early stopping
- k-fold validation
- weight decay
- batch normalization
- MixUp
- Ensemble
- Bayesian Optimization

# Storia del DL
## AlexNet (2012)
![](/assets/images/DL /75f40b7a-4e4c-427e-8803-94e890afca9f-image.png)
- CNN
- Prima vittoria all'ILSVRC (ImageNet Large Scale Visual Recognition Challenge) usando il DL
- Tutte le edizioni successive dell'ILSVRC sono state vinte dal DL
- Questo è stato il punto di svolta

## DQN (2013)
![](/assets/images/DL /7cf33bb9-514c-46b8-b380-536c31444421-image.png)
- DL che ha risolto giochi Atari con il reinforcement learning
- Sviluppato da DeepMind
- Algoritmo usato in AlphaGo

## Encoder/Decoder (2014)
![](/assets/images/DL /d46ac9c4-767b-42ce-ada9-79160c6042dd-image.png)
- Sviluppato per NMT (Neural machine translation)
- Modello sequence to sequence
- La NMT è cambiata da questo punto

## Adam Optimizer (2014)
![](/assets/images/DL /8f051186-ea7d-4bd6-884e-79e5514d9523-image.png)
I paper sono di solito implementati con vari learning schedule.
Cambiare il learning rate per epoch, usare SGD, e così via...

Queste metodologie richiedono tipicamente risorse di calcolo molto grandi.
Ad esempio, se una grande azienda ha 1000 TPU, può eseguire 1000 configurazioni contemporaneamente. Gli studenti di solito hanno al massimo 1-2 GPU, quindi replicare paper di livello aziendale potrebbe richiedere più di un anno.

Adam funziona molto bene nella maggior parte delle metodologie. Allevia in qualche modo l'obbligo di sperimentare con molte configurazioni.

## GAN (Generative Adversarial Network, 2015)
![](/assets/images/DL /c7b5d85b-4897-424e-82c9-c6757ddb5c90-image.png)
DL che genera immagini realistiche usando immagini esistenti.
A quanto pare, il ricercatore ha avuto l'idea mentre beveva al bar...

## Residual Networks (ResNet, 2015)
La ricerca che ha reso il DL degno del nome "deep." Un paper con NN impilate molto in profondità.

Prima non si costruivano layer profondi. Perché anche se i dati di training venivano appresi bene, le performance sui dati di test erano scarse.

Dopo ResNet si è iniziato a impilare layer profondi. Ovviamente configurazioni con 1000 layer ancora non funzionano e sono inefficienti. Ma ha permesso di passare da 20 layer a 100 layer.

## Transformer (2017)
Un paper dal titolo "Attention is All You Need."

All'epoca si pensava funzionasse solo nel suo dominio specifico, ma ora ha sostituito le RNN in quasi tutti i campi. Sta invadendo anche il CV.

## BERT (fine-tuned NLP models, 2018)
Bidirectional Encoder Representations from Transformers.

- Fine-tuned NLP models
  - Pre-training con dati di training grandi e generali.
  - Fine-tuning sulla categoria desiderata.

## BIG Language Models (GPT-X, 2019)
- Composizione dei dati desiderata tramite leggero fine-tuning.
- Numero di parametri molto grande (175 miliardi)

## Self Supervised Learning (2020)
![](/assets/images/DL /f7da3d8d-72c3-40dd-8505-d2e575726bcf-image.png)
- Paper rappresentativi come SimCLR
  - Usare dati senza label.
  - Usare unsupervised learning per ottenere buone representation anche fuori dai dati di training.
- Self supervised data sampling
  - Quando si ha una conoscenza di dominio profonda del problema definito, una metodologia per creare dati di training autonomamente.
