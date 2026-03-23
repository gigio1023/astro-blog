---
title: "Alcuni suggerimenti"
description: "Suggerimenti su data feeding efficiente, ordinamento delle transform per le performance e uso di Albumentations per l'augmentation delle immagini."
date: "2021-08-24T02:35:24.900Z"
tags: ["pytorch", "ai-competition"]
draft: false
lang: it
translationOf: "data-generation"
---

# Data Generation

## Data feeding
Proviamo a fare bene il data feeding.

![](/assets/images/Data Generation/ba02679f-71ab-49da-800f-2b178061cab7-image.png)

Supponiamo che il codice sia come sopra. Entrambi gli approcci sono inefficienti.
Il primo: il generator è più lento del modello, quindi il modello non può esprimere il suo potenziale.
Il secondo: il modello è più lento del generator, quindi il generator non può esprimere il suo potenziale.

Detto ciò, la performance del modello di solito equivale alla performance della GPU. Se si dovesse scegliere una situazione, scegliere la seconda direzione che massimizza la performance del modello sembra meglio. Ovviamente, varia a seconda della situazione, quindi scegliere di conseguenza.

### transforms
```python
ToTensor()
RandomRotation([-8, +8])
Resize((1024, 1024))
```

La performance di queste 3 transform dipende dall'ordine. Se l'immagine è più piccola di 1024, fare il resize per ultimo dà le performance migliori. Ovviamente -- eseguire la conversione a tensore e la rotazione su 100x100 è più veloce che su 1024x1024.

#### albumentations
Si dice che sia più veloce delle transform di PyTorch e abbia più funzionalità. Ho deciso di provarlo imparando cose nuove.
```python
import albumentations as A
import albumentations.pytorch

transformation = A.Compose(
    [
        A.Resize(224, 224),
        A.HorizontalFlip(p=0.5),
        A.OneOf([A.GaussNoise()], p=0.2),
        A.OneOf(
            [
                A.MotionBlur(p=0.2),
                A.MedianBlur(blur_limit=3, p=0.1),
                A.Blur(blur_limit=3, p=0.1),
            ],
            p=0.2,
        ),
        A.OneOf(
            [
                A.CLAHE(clip_limit=2),
                A.Sharpen(),
                A.Emboss(),
                A.HueSaturationValue(),
                A.RGBShift(),
                A.ChannelShuffle(),
            ],
            p=0.3,
        ),
        A.ShiftScaleRotate(
            shift_limit=0.2,
            scale_limit=0.2,
            rotate_limit=10,
            border_mode=0,
            p=0.5,
        ),
        A.RandomBrightnessContrast(p=0.2),
        A.Rotate(limit=(-30, 30), p=0.2),
        A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225],),
        albumentations.pytorch.transforms.ToTensorV2(),
    ]
)
```

- La maggior parte delle funzionalità è autoesplicativa dal nome del metodo.
- p = probabilità
- ShiftScaleRotate ruota l'intera immagine e gestisce anche lo spazio vuoto dalla rotazione.
- In Normalize si possono specificare direttamente mean e std dei canali RGB.
- OneOf: seleziona uno tra i componenti di OneOf. Si può specificare p anche per questo.
