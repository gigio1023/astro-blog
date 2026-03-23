---
title: "Preprocessing"
description: "Tecniche di preprocessing delle immagini e data augmentation per competizioni di deep learning: ridimensionamento, ritaglio bounding box e trasformazioni torchvision."
date: "2021-08-24T02:04:59.305Z"
tags: ["pytorch", "ai-competition"]
lang: it
translationOf: "preprocessing"
draft: false
---

# Preprocessing
## Bounding Box
Filtrare le informazioni superflue. Il problema e che di solito ti danno solo l'immagine grezza. Lo sviluppatore deve trovare l'approccio giusto da solo.
Si potrebbe usare YOLO come insegnato a lezione, oppure dato che la maggior parte delle foto con mascherina sono centrate, basterebbe un ritaglio centrale... Bisogna provare varie cose.

## Resize
Sarebbe bello calcolare alla dimensione originale, ma considerando larghezza, altezza e canali dell'immagine, la quantita di informazioni e enorme. Bisogna trovare un equilibrio tra perdita di informazioni ed efficienza computazionale. A volte ridurre un po' i calcoli per fare piu iterazioni di training e piu efficiente.

## Usare la conoscenza di dominio
![](/assets/images/Preprocessing/785c872e-2ec4-4746-8c3a-779c6f9aa42f-image.png)
Ho preso un'immagine di dati oculari da Kaggle. L'immagine originale non e stata usata tal quale; e stato applicato un po' di preprocessing. Sembra che la luminosita sia stata aumentata e la saturazione leggermente ridotta. Se sembra appropriato per il dominio, usatelo subito.

# Data Augmentation
## Bias, Varianza
![](/assets/images/Preprocessing/2c2574df-3404-483c-8ade-e2eefaf9fe79-image.png)

E la quarta volta che studio questo argomento in due anni. Ma la prospettiva e leggermente diversa. Prima studiavo questo per capire modelli che generalizzano bene.

Ora posso pensarci dalla prospettiva del rumore. Dati perfettamente ideali non esistono nel mondo reale, e i problemi reali hanno molto rumore. Quindi per addestrare un modello che gestisca bene questo rumore, servono preprocessing e augmentation per il rumore.

## Train, Validation
![](/assets/images/Preprocessing/1933d51d-0cd7-4c71-898a-3ea48707ca39-image.png)

Quando ho visto PyTorch per la prima volta l'anno scorso, ero curioso su questo. Pensavo che i risultati del validation set venissero retroalimentati nel training per regolare i pesi. Ma guardando il codice PyTorch, semplicemente guarda i risultati della validation e finisce il training, il che mi confondeva.

Il motivo per cui ci si prende la briga di separare un validation set e che serve una distribuzione di dati non usata nel training. Senza, non c'e modo di sapere se il training e andato bene fino a quando non si testa il modello sul test set. Il mio codice sarebbe semplicemente un modello fittato sul training set, il che e ovvio col senno di poi.

Percio si crea deliberatamente un validation set dal training set. Permette agli umani di verificare se il training sta andando bene, e puo anche essere usato come metrica per il tuning degli iperparametri.

_**Non toccare mai il test set!!**_ Guardarlo e solo barare, e danneggia anche la generalizzazione.

## Data Augmentation
_**Il processo di generalizzazione dei dati.**_
Variare i casi e gli stati che i dati possono avere per generalizzarli.

![](/assets/images/Preprocessing/a71c2c28-f0ed-4a80-beb5-29d72708c41d-image.png)
Per esempio, supponiamo di avere una foto di un'auto. Potremmo addestrare solo con questa foto, ma gli stati e i casi delle immagini sono molto diversi. Potremmo supporre che non sia luminosa come nella foto, o che stia piovendo.

E nella realta il modello deve funzionare in queste situazioni diverse. Quindi aggiungendo rumore ai dati per aumentare la varianza, possiamo costruire un modello piu robusto.

## torchvision.transforms
![](/assets/images/Preprocessing/6ea904db-1a4a-4d88-b07b-24ef71c74ef6-image.png)
https://www.cse.iitb.ac.in/~vkaushal/talk/auto-augment/

Come mostrato, le immagini vengono trasformate in vari modi per aumentare la varianza. L'importante e considerare varianze che potrebbero plausibilmente esistere nel mondo reale.

Per esempio, questa competizione di immagini riguarda il rilevamento di foto con mascherina. L'obiettivo e rilevare foto scattate ai clienti davanti ai negozi. A meno che i clienti non siano appesi al soffitto, non ci si aspettano foto capovolte verticalmente. Non serve includere il capovolgimento verticale nelle trasformazioni.

Usare la conoscenza di dominio in modo proattivo.

## Albumentations
![](/assets/images/Preprocessing/38cdf08d-308b-4bad-8841-2f03d5f46784-image.png)
Si dice che sia piu veloce e vario delle trasformazioni di PyTorch. Vale la pena provarlo.

# Riepilogo
Non c'e un metodo che si deve assolutamente usare, e non c'e un metodo universalmente buono. Validare attraverso ipotesi ed esperimenti.