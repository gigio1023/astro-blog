---
title: "Ridurre il bias nel training"
description: "Tipi di bias nel training per MRC e ODQA, e tecniche per mitigarli tra cui negative sampling e gestione del bias di annotazione."
lang: it
translationOf: "reducing-training-bias"
date: "2021-10-18T03:44:02.826Z"
tags: ["nlp"]
draft: false
---

# Definizione di Bias
Il bias non è intrinsecamente negativo. Ma alcuni bias danneggiano le prestazioni del modello, e quelli vanno affrontati.
- ML/DL
  - Inductive bias ([ref](https://velog.io/@euisuk-chung/Inductive-Bias%EB%9E%80))
    - Assunzioni aggiuntive usate per fare previsioni accurate su situazioni non incontrate durante il training.
  - Preferire certe forme di funzione per iniettare conoscenza pregressa.
    - L'atto stesso di progettare un modello e alimentarlo con dati porta una forma di bias.
- Mondo reale
  - Historical Bias
    - Se il mondo reale stesso è biased, lo sarà anche il modello.
  - Co-occurrence bias
    - Attributi indesiderati appresi a causa di correlazioni superficiali come genere e occupazione.
- Generazione dei dati
  - Specification bias
    - Bias derivante dal modo in cui input e output sono definiti.
  - Sampling bias
    - Bias causato dal metodo di campionamento dei dati.
  - Annotator bias
    - Bias causato dalle caratteristiche degli annotatori stessi.

## Gender bias
![](/assets/images/Reducing Training Bias/d2f45ed8-ae11-4789-88a9-27bd42c0d60c-image.png)

Un modello che estrae vari attributi dalle foto. Poiché i dati di training contenevano molte immagini di donne che cucinavano, classificava spesso come donne anche gli uomini intenti a cucinare.

![](/assets/images/Reducing Training Bias/14acf299-66af-4726-9806-3fcbdab7dbdb-image.png)
https://ai.googleblog.com/2020/04/a-scalable-approach-to-reducing-gender.html

Traducendo "qualcuno è un dottore" dal turco all'inglese si otteneva "he". Anche se Google non lo intendeva, se i dati di training contenevano molte correlazioni tra dottori e uomini, il modello fa assunzioni inesatte come questa. Lo vedo più come un problema di output impreciso del modello che come una questione sociale.

## Sampling bias
Se il campionamento è biased, si perde la fiducia che il campione rifletta le proprietà della popolazione. Campionare in modo casuale e corretto.

# Bias in ODQA
Il modello reader apprende sempre da dati di training in cui la risposta è inclusa nel documento -- solo quelle coppie sono trattate come positive.
Es. i positivi di SQuAD hanno una tripletta fissa (Context, Query, Answer).

Quindi la capacità di comprensione del reader sarà molto scarsa su coppie di dati con proprietà completamente diverse.
Es. un reader addestrato su romanzi, saggi e saggistica potrebbe avere prestazioni scarse su inferenza in medicina, ingegneria o scienze naturali.

## Mitigare il bias nel training
- Addestrare con esempi negativi
  - Gli esempi negativi possono spingere i dati di input negativi lontano dalla risposta corretta nello spazio di embedding.
  - Invece di scegliere negativi casuali, scegliere quelli che creano confusione.
    - Simile a come il dense embedding usa documenti il più possibile simili per il negative sampling.
    - Usare campioni con alti punteggi BM25/TF-IDF che non contengono la risposta.
    - Usare passaggi/domande diversi dallo stesso documento.
- Aggiungere bias per "no answer"
  - Gestire il caso "nessuna risposta".
  - Assumere un token extra oltre la sequenza di input.
  - Se le probabilità di inizio e fine nella predizione della risposta cadono su quel token di bias, trattarlo come assenza di risposta.

# Bias di annotazione dai dataset
![](/assets/images/Reducing Training Bias/98739eba-aaed-4025-99d3-f2173a65bfed-image.png)

I dataset dovrebbero essere costruiti con lo scenario in cui chi fa la domanda non conosce la risposta. Altrimenti la domanda stessa potrebbe contenere o suggerire pesantemente la risposta.

Nella tabella sopra, i dataset nei riquadri blu seguono questo principio.

Ma ci sono casi in cui l'annotazione avviene mentre chi chiede già conosce la risposta. TriviaQA e SQuAD sono esempi noti.

In SQuAD, molte parole si sovrappongono tra domanda e paragrafo di evidenza. Quindi il modello potrebbe imparare un semplice abbinamento di parole invece di sviluppare una reale comprensione del testo. Non è necessariamente sbagliato, ma non è la direzione di apprendimento desiderata se l'obiettivo è migliorare la comprensione.

Inoltre, SQuAD usa i 500 articoli Wikipedia più visualizzati come dati di training, quindi è probabilmente molto biased verso quei documenti.

## Effetto del bias di annotazione
![](/assets/images/Reducing Training Bias/05353d86-b769-4cd1-a891-5b6907eae76c-image.png)

La valutazione oggettiva è difficile su dataset con bias di annotazione. Nella tabella sopra, la maggior parte dei modelli funziona meglio con DPR, ma SQuAD specificatamente funziona meglio con BM25 -- perché SQuAD ha molte parole sovrapposte tra domande ed evidenze.

Un possibile rimedio è usare sia BM25 che DPR. Ma questo è un fix specifico per dataset con bias di annotazione; per altri modelli, combinare entrambi i metodi a volte peggiora le prestazioni. Provare in modo appropriato per ogni dataset.

## Gestire il bias di annotazione
Usare dataset progettati per prevenire il bias di annotazione.
Es. Natural Questions usa query reali degli utenti dalla ricerca Google in cui non viene fornita evidenza di supporto a chi pone la domanda. Poiché questa configurazione rispecchia da vicino l'ODQA, riduce molto il bias di annotazione.

# Domande non adatte all'ODQA
Una domanda come "Chi è il presidente degli Stati Uniti?" potrebbe essere risolvibile nell'MRC ma non necessariamente nell'ODQA. Non è chiaro se la domanda riguardi il presidente attuale, una lista di tutti i presidenti, o un presidente passato specifico.

Gestire questo tipo di domande è altrettanto necessario.
