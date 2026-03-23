---
title: "CutMix"
description: "Data augmentation CutMix in PyTorch: calcolo della loss, accuracy e F1 score."
date: "2021-08-27T23:02:28.794Z"
tags: ["computer-vision", "pytorch", "ai-competition"]
draft: false
lang: it
translationOf: "cutmix"
---

# CutMix
https://hongl.tistory.com/223
Ho deciso di usare CutMix, che sembra essere più efficace del random crop.
![](/assets/images/CutMix/d52b3e66-10b8-43c2-af9b-eac1649383a7-image.png)

Ad esempio, il cutout rimuove completamente la faccia del cane. CutMix incolla un gatto nella regione della faccia del cane e allena con quello.

- Obiettivo: combinare $(x_A, y_A)$ con $(x_B, y_B)$ per creare un modello robusto e performante.
- Metodo di combinazione: usa un rapporto di combinazione $\lambda$. Il rapporto viene usato come segue:
![](/assets/images/CutMix/2f9cd52d-08f4-449c-9bce-2af81849e5a1-image.png)
  - $M \in \{0,1\}^{W\times H}$, perché è normalizzato.

## Implementazione
Repo ufficiale: https://github.com/clovaai/CutMix-PyTorch
Repo implementazione PyTorch: https://github.com/hysts/pytorch_cutmix

Guardando cutmix.py e train.py nel repo dell'implementazione ci si fa un'idea.

### Loss
Quando CutMix viene usato come collate_fn nel dataloader, l'output delle label del dataloader consiste in due tensori. Il primo è la label originale, il secondo è la label dell'immagine casualmente mescolata e incollata sull'originale.

Si calcola la loss per il tensore dell'immagine processata con CutMix contro ciascuno dei due tensori di label, poi si applicano lambda e 1-lambda come pesi rispettivamente.

---
L'implementazione PyTorch usa cross entropy. È configurata per cambiare liberamente il criterion, quindi si può cambiare a piacere. Io usavo focal loss a causa del forte squilibrio di classi nei miei dati.


## Metriche di valutazione
### Accuracy, loss
L'accuracy si calcola come y-hat usando lambda nella formula sopra. Perché quel rapporto è stato effettivamente usato.

La loss si calcola analogamente applicando la stessa formula ai valori passati attraverso la cross entropy. Stesso ragionamento dell'accuracy.

### F1 score
Di solito si calcola passando y e predicted_y insieme a sklearn. predicted_y è già pronto, ma y è il problema.

CutMix è implementato come collate function del Dataloader, configurato per ricevere un y originale e un y mescolato. Cioè, y ricevuto dal dataloader è composto da 2 set di y, e le altre metriche (accuracy, loss) moltiplicano lambda e (1-lambda) ai due risultati e li sommano per ottenere una singola metrica scalare.

Per l'F1 score, si usa il lambda calcolato per batch:
> (origin f1 score) * lambda + (random shuffle f1 score) * (1 - lambda)

Si calcola per batch e si usa la media degli F1 score dei batch per un'epoch.
