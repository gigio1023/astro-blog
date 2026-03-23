---
title: "Full Stack ML Engineer"
description: "Cosa significa essere un full-stack ML engineer: ruoli, ciclo di vita dei prodotti ML, struttura del team e compromessi."
date: "2021-09-26T09:41:46.765Z"
tags: ["mlops", "naver-boostcamp"]
lang: it
translationOf: "full-stack-ml-engineer"
draft: false
---

# ML Engineer
Un engineer che comprende e studia ML/DL e costruisce prodotti.
![](/assets/images/Full stack ML Engineer/eb9eb9c1-bc28-40c0-ac2f-ac3c54855c8f-image.png)

Si trova in una posizione ambigua tra Researcher ed Engineer. Il settore si muove così velocemente che spesso la ricerca deve essere applicata ai prodotti contemporaneamente.

# Full Stack Engineer

![](/assets/images/Full stack ML Engineer/cc790f50-9fe5-4605-9946-f9fc4af539f5-image.png)
Un engineer in grado di gestire sia front-end che back-end. Con abbastanza tempo, può costruire un intero prodotto da solo.

# Full Stack ML Engineer
Un engineer che comprende la ricerca DL e può costruire prodotti ML.

**ML nel back-end**
![](/assets/images/Full stack ML Engineer/4486a601-8052-4c92-8602-da7faf181f65-image.png)

**ML nel front-end**
![](/assets/images/Full stack ML Engineer/d61bbf30-d230-4963-b553-cb4b4b21bfce-image.png)

**Pipeline per lo sviluppo di modelli ML**
![](/assets/images/Full stack ML Engineer/a74e3312-4cef-4b03-a23c-ef6ac982d7b6-image.png)

## Pro
- Adatto al prototyping
  - Il prototyping è spesso difficile da fare in modo collaborativo, quindi poterlo fare da soli è un vantaggio.
- Sinergia tra gli stack
  - Conoscere uno stack può rendere più efficiente lo sviluppo su un altro.
- Collaborazione
  - Si possono trovare punti di collaborazione dove potrebbero sorgere conflitti.
  - Si possono anticipare rischi potenziali.
- Crescita diversificata
  - Serve come base per la crescita.
  - Può essere un trigger per uscire dalla routine.

## Contro
- Si rischia di perdere profondità in un singolo stack.
  - Ogni stack si evolve così velocemente che restare aggiornati è estremamente difficile.
- Mancanza assoluta di tempo
  - Tanti ambiti da studiare, le stesse 24 ore per tutti.

# Prodotto ML
![](/assets/images/Full stack ML Engineer/fea45e30-6992-4980-bd5c-de925c475dec-image.png)
- Raccolta dei requisiti
  - Meeting con il cliente (B2B), pianificazione del servizio (B2C)
  - Documentazione dei requisiti e dei vincoli
  - Formulazione come problema ML
- Raccolta dati
  - Raccolta dati grezzi
  - Pianificazione / sviluppo del tool di annotation
  - Creazione / gestione della guida di annotation
- Sviluppo del modello ML
  - Ricerca bibliografica e interiorizzazione
  - Esperimenti con dati reali, valutazione / feedback
  - Ottimizzazione a livello di modello
- Deploy in produzione
  - Ottimizzazione ingegneristica
  - Pulizia del codice di ricerca
  - Versioning del modello / automazione del deploy

# Team ML
Esempio di un team ML idealmente strutturato:
- 1 project manager
- 2 sviluppatori
- 2 ricercatori
- 1 planner
- 1 data manager

Un team ML più piccolo con ruoli misti:
- 1 persona come project manager, planner, ricercatore
- 1 persona come sviluppatore, ricercatore, data manager
- 1 persona come sviluppatore, data manager

## Full Stack ML Engineer nel team ML
Una persona ricopre più ruoli: sviluppatore, planner, data version manager, ecc.

### 1. Formulare problemi reali come problemi ML
Concretizzare i requisiti del cliente/servizio. Richiede una conoscenza ampia della ricerca ML esistente e la consapevolezza dello stato dell'arte per valutare la fattibilità e gli approcci risolutivi.

### 2. Raccolta dati grezzi
Implementare direttamente web crawler (scraper).

### 3. Sviluppo del tool di annotation
Costruire applicazioni per l'inserimento dei dati raccolti/forniti e delle relative label.
- Serve un design UI che consideri velocità e accuratezza.
- Spesso è necessario comprendere il modello ML stesso per sviluppare il tool di annotation.

![](/assets/images/Full stack ML Engineer/9705aef5-6565-4c05-88de-a81c31c2a525-image.png)

### 4. Gestione versioni dati, sviluppo data loader
Le versioni dei dati devono essere gestite. Nella maggior parte dei casi si accede ai dati tramite un DB piuttosto che direttamente, quindi serve sviluppare un package loader apposito. Il nostro mentor usava Amazon S3 con Python.
![](/assets/images/Full stack ML Engineer/b6ba9bd2-c039-4237-bef7-d4449815cfe9-image.png)

### 5. Sviluppo modello, scrittura paper
- Ricerca bibliografica, riproduzione
  - Prestazioni di riproduzione verificate su dati benchmark pubblici
- Applicazione dei dati di servizio raccolti
- Miglioramento del modello e applicazione di idee
  - Scrittura di paper se necessario
![](/assets/images/Full stack ML Engineer/2956ed76-bd5a-46ec-b42c-e9cd777ff19c-image.png)

### 6. Sviluppo tool di valutazione e demo
- Costruzione di applicazioni che valutano i risultati delle predizioni del modello
- I tool di valutazione aiutano a identificare i punti di miglioramento del modello

### 7. Deploy in produzione
- Pulizia del codice di ricerca dei passaggi 1-6 per l'uso su server di produzione
- Salvataggio di codice e pesi dei parametri su un file server per il versioning
- Il server di produzione invia job ai worker Python via MQ
![](/assets/images/Full stack ML Engineer/fc215f70-56d9-4b42-a380-47243e2129b9-image.png)

# Stack
![](/assets/images/Full stack ML Engineer/bb761f82-eea7-4089-989d-39992ea229d5-image.png)

# Consigli
Riepilogo dei consigli del nostro mentor:
- Costruisci velocemente
  - Considerare un'architettura sistematica per ogni stack allunga troppo il ciclo di sviluppo. Prima costruisci tutto end-to-end il più velocemente possibile, poi aggiungi funzionalità.
- Scegli una specializzazione
  - Mantenere tutti gli stack a livello principiante-intermedio non è il massimo. Raggiungi almeno il livello intermedio nella tua specializzazione.
  - Un engineer in qualsiasi campo dovrebbe poter guardare un'implementazione ad alto livello e capire i meccanismi interni.
  ![](/images/93669793-f3f5-4bc3-b2b3-87454c951ad8-image.png)

- Ripeti per superare la paura

## Raccomandazioni per ML Engineer
1. Leggere paper ML e implementare/riprodurre
2. Far girare l'implementazione sul web
3. Evolvere l'implementazione del punto 2 usando un DB
