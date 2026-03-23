---
title: "AI Model as Service"
description: "Processo end-to-end per il deployment di modelli AI come servizi, dall'analisi dei requisiti alla costruzione del dataset, modellazione, testing e organizzazione del team."
date: "2021-09-23T05:09:46.199Z"
tags: ["naver-boostcamp"]
lang: it
translationOf: "ai-model-as-service"
draft: false
---

# AI Model as Researching
![](/assets/images/AI model as Service/b0c684b9-202f-40b7-8a82-eeebc246bbcd-image.png)
Come ImageNet, il dataset è ben definito e il focus è sulla modellazione per risolverlo.

# AI Model as Servicing
![](/assets/images/AI model as Service/0bfb577d-4358-44fe-a2a4-09f16450e819-image.png)
Nella maggior parte degli ambienti industriali, i dataset non esistono affatto. Tipicamente esistono solo i requisiti software, e l'AI è richiesta come strumento per soddisfarli.

Quindi nella maggior parte dei casi bisogna costruire il dataset da soli.

## Requisiti
Basta pensare all'ingegneria del software studiata a scuola. Usare qualsiasi mezzo per estrarre requisiti funzionali e non funzionali.

### Dataset
![](/assets/images/AI model as Service/8ebf7128-e569-4c5e-b5fe-2ae4faa638c6-image.png)
- Chiarire i requisiti relativi a tipo, quantità e ground truth
- Ogni requisito va definito chiaramente
- Tipo: dipende fortemente dai requisiti, ma restare flessibili
  - es., Nell'OCR per formule matematiche, come si categorizzano i tipi di immagine? Considerare categorie come elementare, scuola media, manoscritto, stampato, ecc.
- Definire i moduli per l'elaborazione del dataset
  - es., Definire un modulo AI per estrarre singole formule da immagini che ne contengono multiple.
- Definire il ground truth
  - es., Per OCR di formule matematiche, il ground truth è una stringa LaTeX
- Definire la quantità
  - Impostare in modo appropriato considerando budget e prestazioni del modello

### Modellazione
- Tempo di elaborazione
  - Tempo dall'input all'output nel servizio reale
- Accuratezza target
  - Determinata quantitativamente
- QPS target (Query per Second)
  - Determinare le query elaborabili al secondo
  - Influenzato da hardware, tempo di elaborazione, dimensione del modello
  - La dimensione del modello influenza le QPS solo alle soglie
    - Se la GPU MEM è 10GB e il modello supera i 5GB, per quanto lo si riduca, se ne può caricare solo uno. Dal punto di vista delle QPS, modelli sopra i 5GB non influenzano le QPS.
- Metodo di serving
  - Local, Cloud, Mobile, ecc.
- Specifiche hardware

#### Partizionamento del modello
Fortemente dipendente dalla progettazione del dataset. Se necessario, **combinare più modelli verificati in uno è un buon approccio.** I dataset devono essere preparati separatamente per ogni modello.

Prendiamo come esempio l'OCR per formule matematiche manoscritte.

AI Model
- input: immagine della formula
- output: stringa LaTeX

Non esiste un modello dedicato solo per questo task, e modellare l'OCR da zero sarebbe un task ad alta dimensionalità. Quindi il modello AI può essere suddiviso così.

AI model
  - Rilevatore: rilevamento simboli LaTeX
  - Riconoscitore: classificazione simboli LaTeX
  - Allineatore: allineamento simboli LaTeX su una singola riga
  - Convertitore: generazione stringa LaTeX

Essendo suddiviso in 4 modelli, servono dataset che forniscano input/output appropriati per ciascuno.

#### Modelli candidati
Lanciare un servizio con un solo modello AI può essere rischioso. Creare più modelli candidati e scegliere la versione per il rilascio dopo valutazione quantitativa e qualitativa.

### Test
A volte si costruisce un dataset di test separato; altre volte si usa una parte dei dati di addestramento. Anche questo va derivato dai requisiti.

- **Offline test**: valutazione quantitativa nell'ambiente di sviluppo prima del deployment effettivo
  - Usato per selezionare dal pool di modelli candidati
  - es., Accuratezza del modello al 99%
- **Online test**: valutazione quantitativa durante il deployment nel servizio effettivo
  - Identificare punti di miglioramento tramite VOC (Voice of Customer)

**Es., 1 vs 1 AI Game Player**
- input dataset: immagini catturate per frame, log di giocatori professionisti
- output dataset: set di abilità da usare (incluso "nessuna azione")

Supponiamo che questo task sia trattato come classificazione e che si sviluppi un modello con il 99% di accuratezza (**offline test**). Ma giocando contro utenti reali (**online test**), il modello molto probabilmente starebbe fermo.

Perché è stato sviluppato assumendo una semplice classificazione. Nei log dei pro gamer, dove il giocatore è per lo più fermo e usa abilità occasionalmente, qualsiasi cosa diversa dall'inattività verrebbe probabilmente trattata come rumore.

## Team
![](/assets/images/AI model as Service/01baaabd-315e-4064-b830-3232f0783300-image.png)
Un diagramma della struttura del team per analizzare e sviluppare i requisiti.

- Model engineer
  - La maggior parte dei modelli è sviluppata in PyTorch; conversione in TensorFlow per adattarli al servizio
  - Conversione dei modelli TensorFlow in TFLite per il mobile
  - Conversione dei modelli in TensorRT per il serving su GPU server
  - Sviluppo di operazioni inesistenti durante la conversione del framework
  - CUDA Programming
  - Task di ottimizzazione
  - Conversione delle operazioni in C++/C per calcoli più veloci
- Modeler
  - Personale che sviluppa i modelli
  - La capacità di costruire buoni modelli è ancora molto preziosa, ma l'automazione avanza rapidamente (es., AutoML)
  - Provare a studiare un po' anche altri ambiti.
    - FE: annotation tool, debugging tool
    - BE: API serving, massive GPU training
    - Model: engineering
- Model management
  - Gestione della qualità complessiva del modello
