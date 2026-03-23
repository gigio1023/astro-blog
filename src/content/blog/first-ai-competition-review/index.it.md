---
title: "Conclusione della mia prima AI Competition"
description: "Retrospettiva su una competition di classificazione immagini (maschera/età/genere): scelta del modello, augmentation, CutMix e lezioni apprese."
date: "2021-09-06T11:01:54.134Z"
tags: ["ai-competition", "naver-boostcamp"]
lang: it
translationOf: "first-ai-competition-review"
draft: false
---

Sono state solo due settimane, ma avendo tirato notte ogni giorno, è sembrato di viverne quattro. Ecco un riepilogo di ciò che ho provato e dei metodi usati dagli altri.

# Risultato finale
Codice implementato per gli esperimenti: https://github.com/naem1023/boostcamp-pstage-image

Sono stato contento che il mio modello ci abbia portato al 5° posto, ma la cosa più preziosa è stata restare svegli fino a tardi a programmare e sperimentare con i compagni di squadra. Non avevo mai provato quel tipo di cameratismo fuori dall'università -- è stata la prima volta che ho sentito un legame che andava oltre la collaborazione professionale.

Con i dati public eravamo 10°, quindi l'umore era tipo "vabbè, ci abbiamo provato." Quando è uscita la classifica finale coi dati private e siamo saliti, è scoppiata la festa.

Il fatto che il f1 score non sia cambiato tra dati public e private suggerisce che concentrarsi su un modello robusto ha funzionato.

# Panoramica della competition
Le 18 classi sono composte da maschera (3 classi), genere (2 classi) ed età (3 classi). Il compito è costruire un classifier per queste 18 classi sui dati di training e inviare un submission.csv per la valutazione.

# Piano di training
Primo piano: https://velog.io/@naem1023/TIL-train-%EA%B3%84%ED%9A%8D-%EC%A0%95%EB%A6%AC-2021.08.24
Secondo piano: https://velog.io/@naem1023/TIL-train-%EA%B3%84%ED%9A%8D-%EC%A0%95%EB%A6%AC-2021.08.24-xuou0hx5

All'inizio pensavo vagamente di fare ensemble ma non riuscivo nemmeno a capire come. Dopo aver ricevuto feedback dai compagni, ho messo insieme un piano di training strutturato che è diventato la base di tutto il lavoro successivo.

# Pipeline di training
ref: https://github.com/victoresque/pytorch-template
Ho provato a strutturare il codice usando questo template. L'idea era un'astrazione completa -- ad esempio, i compagni avrebbero ereditato da BaseTrainer per creare i propri Trainer. Non ha funzionato proprio così, ma almeno abbiamo tratto valore dall'uso dell'OOP.

## config
Ho messo le configurazioni in config.py in modo che eseguendo train.py il training partisse automaticamente. Idealmente si dovrebbe avere un config.json con un parser corrispondente, ma preferivo lanciare esperimenti velocemente piuttosto che perdere tempo a costruire un parser.
Ho semplicemente definito i valori di configurazione come variabili in config.py e ho usato la sintassi Python per comporli.

# Backbone model
Ho provato diversi modelli; ecco i risultati:
- Modelli sperimentali (ResNet18, EfficientNet-b2)
  - Usati per ottenere risultati rapidi durante i test di augmentation, CutMix, ecc.
  - Curiosamente, dopo aver applicato CutMix, ResNet18 andava malissimo. I f1 score oscillavano tra 0.6 e 0.7, rendendo difficile distinguere tra le varie tecniche di CutMix. Per esempio, l'effetto del CutMix verticale con rapporti lambda casuali non era visibile su ResNet18.
  - I modelli più grandi mostravano differenze significative tra gli approcci CutMix, quindi dalla seconda settimana sono passato a EfficientNet-b2 per gli esperimenti.
- Modello di validazione (EfficientNet-b7)
  - Volevo usare EfficientNet-b4, ma b7 lo superava di qualche decimale, quindi ho usato b7 per la validazione.
  - I team al 1° e 2° posto usavano EfficientNet-b0 e ResNet152.

# Augmentation
Tentativo con Albumentations: https://velog.io/@naem1023/Preprocessing

Albumentations era interessante per la velocità, ma il vero punto di forza è la varietà di transformation offerte. Ha funzionato benissimo.

Attenzione: a differenza delle transforms di PyTorch, restituisce un dictionary.

# Preprocessing
## Face crop
Trattandosi di classificazione maschera/età/genere, il nostro team era convinto che rimuovere lo sfondo fosse importante. Un compagno ha procurato un dataset con le facce ritagliate e lo abbiamo usato.

I team al 1° e 2° posto in realtà non hanno fatto il face crop. Sorprendente.

La mia ipotesi è che trovare una persona in una foto sia un task relativamente facile per il modello, quindi rimuovere lo sfondo potrebbe non essere necessario.

## Transformation
https://velog.io/@naem1023/TransformationAlbumentation
Ho scritto un post separato su questo e l'ho seguito. L'idea chiave era usare augmentation forte per costruire un modello robusto, dato che i dati non erano molti.

## Modifica dei criteri delle label
Ho cambiato i confini dei gruppi di età. La guida della competition divideva l'età in 3 gruppi a 30 e 60 anni per derivare le 18 classi. Ma i dati erano estremamente sbilanciati, rendendo il training quasi impossibile con quelle soglie.

![](/assets/images/첫번째 Ai Competition 마무리/398ac5b3-a8f7-4d62-9441-37e7f968c8dd-image.png)

- Pochissime persone intorno ai 30 anni finivano nel gruppo 30-60.
- Il gruppo 60+ aveva molte meno persone degli altri gruppi.

Per risolvere il problema:
- Spostato il confine inferiore da 30 a 29 per aumentare leggermente i dati del gruppo 30-60.
- Spostato il confine superiore da 60 a 59 per aumentare i dati del gruppo 60+.

# Separazione delle feature
Per fortuna il nostro team ha sollevato la questione fin dal primo giorno.
La competition richiede di classificare le immagini in 18 classi usando le feature maschera, età e genere. Ma qualcuno ha fatto notare che queste feature non hanno correlazione né relazione causale tra loro. Ero d'accordo.

Nel nostro team, io ho trainato con le feature separate mentre gli altri le hanno combinate. L'approccio separato era marginalmente migliore -- qualche punto alla seconda cifra decimale.

Ovviamente, in una competition quel margine conta molto. Ma non posso dire che separare feature non correlate abbia avuto un effetto enorme. Penso che i modelli siano generalmente abbastanza grandi da imparare le feature maschera, genere ed età simultaneamente -- imparando di fatto più feature in parallelo anche senza un legame causale esplicito.

# Label smoothing
Per il nostro team, applicare il label smoothing ha peggiorato le prestazioni. I team al 1° e 2° posto però lo usavano, quindi forse c'era qualcosa di sbagliato nel nostro modo di applicarlo.

# Costruzione del validation set
Questo è un aspetto che il nostro team ha un po' trascurato. Il ragionamento era: perché preoccuparsi quando basta inviare un CSV e ottenere il punteggio?

Col senno di poi, era un ragionamento pessimo. Molte tecniche di training si basano sulle metriche del validation set per prendere decisioni. Un validation set costruito male è spazzatura.

Certo, il validation set di per sé non partecipa all'aggiornamento dei parametri del modello, quindi un validation set scadente non significa direttamente training scadente. Ma per le ragioni sopra citate, va assolutamente costruito bene.

## Metodo di costruzione
- Assicurarsi che la stessa persona non compaia sia nel train che nel test set.
  - Ogni persona ha 5 foto con maschera, 1 normale e 1 incorretta. Se queste 7 foto sono sparse tra train e test set, la stessa persona appare in entrambi. I punteggi di validazione per quella persona sarebbero artificialmente alti, distorcendo le metriche.
- Assicurare distribuzioni di classi identiche nel train e test set.
  - Per la legge dei grandi numeri, dividendo casualmente un dataset molto grande si otterrebbero distribuzioni simili. Ma i dati della competition non erano abbastanza grandi, quindi era necessario bilanciare esplicitamente le distribuzioni.

# Loss function
Ho usato la focal loss, che assegna un peso maggiore alle classi sottorappresentate. Scelta comune a praticamente tutti i team.

La differenza è che i team al 1° e 2° posto usavano la f1 loss -- aggiungendo il f1 score al valore della loss dopo loss.backward() ma prima di optimizer.step(). Questo guida la loss function a ridurre il f1 score.

# CutMix
Il tanto discusso CutMix. Ironia della sorte, i team al 1° e 2° posto non usavano CutMix -- usavano CutOut.

L'implementazione CutMix del nostro team è documentata qui:
https://velog.io/@naem1023/CutMix
https://velog.io/@naem1023/CutMix-vertical

# DataSampler
Il DataLoader permette di specificare un sampler. Ho usato RandomSampler per dividere train e test set.

Un altro team ha usato ImbalancedDatasetSampler (oltre alla libreria ufficiale PyTorch) per bilanciare un po' i dati sbilanciati.

# One-hot vector?
La maggior parte dei team ha usato one-hot vector per la classificazione multi-label, ma il team al 2° posto no. Passavano l'output attraverso sigmoid in modo che ogni classe avesse una probabilità indipendente, poi usavano torch.argmax per selezionare la classe con la probabilità più alta -- come si farebbe costruendo un one-hot vector.

# Pseudo labeling
Il metodo tanto discusso. Il nostro team non lo ha nemmeno considerato perché sapevamo che in Dacon e altre competition nazionali era vietato usare il test set. Si è scoperto che il regolamento della competition Boostcamp in realtà lo permetteva. Non lo sapevamo...

È una metodologia per usare dati non etichettati (dati del test set o immagini scaricate da internet) come dati di training. Una volta che il modello è abbastanza allenato da fare inference, lo si usa per etichettare i dati non etichettati e aggiungerli al training set. In sostanza, rinforza fortemente la direzione di apprendimento esistente del modello.

È quasi una scommessa, dato che non c'è garanzia che la direzione di apprendimento attuale sia corretta. Ma in una competition come questa, dove un modello performante emerge verso la fine, è molto utile.

La differenza di f1 score rispetto ai team al 1° e 2° posto era solo 0.01, e il pseudo labeling sembra essere stato il fattore principale.

# TTA
Il giorno prima della scadenza, TTA ha portato la mia migliore submission da 0.7665 a 0.7666. Come suggerisce il risultato, non è un miglioramento drastico -- più una tecnica per consolidare il punteggio.

# Retrospettiva
Ho trascurato molte più tecniche di quanto pensassi. La costruzione del validation set è stata particolarmente critica. I risultati sono stati buoni, ma non sono metodi che si userebbero in produzione. Ottenere un buon punteggio è stato bello, ma soprattutto è stata un'occasione per identificare tutto ciò che mi era sfuggito.
