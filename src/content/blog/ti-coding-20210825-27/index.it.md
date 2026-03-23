---
title: "TIL Appunti di coding 2021.08.25~27"
description: "Appunti TIL su logging wandb, fine-tuning di modelli pre-addestrati, early stopping ed ensemble learning durante una competizione di classificazione immagini."
date: "2021-08-26T23:45:48.082Z"
tags: ["pytorch", "naver-boostcamp", "ai-competition"]
draft: false
lang: it
translationOf: "ti-coding-20210825-27"
---

Ero così preso dal codice e dalla validazione che non ho preso nessun appunto. È ora di recuperare.

# conda, pip
conda è nettamente migliore per la risoluzione dei conflitti di dipendenze. Però era molto lento sui server Naver. La maggior parte delle installazioni generava conflitti, e conda impiegava più di 5 minuti per risolverli contro tutti i moduli Python installati. Su Windows era ancora peggio.

conda-forge copre praticamente tutti i pacchetti, ma per i moduli più piccoli ho usato pip.

# wandb
Molto meglio di tensorboard.
- tensorboard: legge file di log lasciati sul server.
- wandb: lo sviluppatore specifica esplicitamente cosa aggiornare, quando e quali oggetti dallo script Python.

## Oggetti wandb
Un singolo oggetto run di wandb diventa una raccolta di metriche con un nome su wandb.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/4ecb11b3-9b07-4405-bd98-f669fec6ae26-image.png)

Se si aggiornano train e validation nello stesso oggetto run, la visualizzazione degli step si rompe.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/952e8ca1-65f4-4fff-8b42-e627f2e0ccaf-image.png)

L'intenzione era che le metriche di train e validation procedessero separatamente. Ma aggiornando lo stesso oggetto run, si alternano.

Es., gli step 1-10 aggiornano train, gli step 11-15 aggiornano validation.

### Soluzione
Usare oggetti run wandb separati per train e validation. Devo rifare tutto il codice.

# Fine tuning
Cercavo solo modelli pre-addestrati che permettessero di cambiare il numero di classi, il che limitava le opzioni. Ripensandoci, posso prendere qualsiasi modello e modificarlo — è proprio il punto della flessibilità di PyTorch.

1. Scegliere un modello pre-addestrato.
2. Stampare la struttura del modello.
3. Identificare il nome del layer di output.
4. Accedere al layer di output come attributo del modello e cambiare l'output.
5. Di solito è un layer lineare, quindi inizializzare con Xavier.

# Sviluppo / Test
Testare sempre prima con una rete piccola, poi passare a un modello pesante quando servono risultati reali. Non testare alla cieca con efficientnet-b7; usare resnet-18 o qualcosa di più leggero.

Non faccio più tutto sul server. Implemento e testo il codice OS-indipendente sul desktop, poi lo distribuisco sul server. Il server continua solo ad addestrare, lo sviluppo avviene sul desktop. Grazie alla RTX 3070 non mi serve Colab.

# Separatori di percorso
Per abitudine uso `/` in stile Linux, ma dovrei usare `os.sep` o `os.path.join` per eliminare le dipendenze dal sistema operativo.

# Ensemble learning
Pensavo che i moduli di ensemble learning prendessero modelli arbitrari e producessero automaticamente uno ottimale. In effetti esiste un modulo PyTorch per questo:

https://ensemble-pytorch.readthedocs.io/en/stable/quick_start.html

Ma non offriva personalizzazione, era scomodo e non aveva effetto. Ho anche guardato XGBoost e LightGBM, ma sono tipi di modelli fondamentalmente diversi dalle CNN.

Dato che l'obiettivo della competizione è risolvere la classificazione delle mascherine con CNN, implementare il voting direttamente mi è sembrata la scelta migliore.

# Nome del salvataggio del modello
Nella mia azienda precedente, creavo directory per data e ci mettevo file di plot, immagini dei grafici, log di tensorboard, log del programma e altri artefatti.

In modo simile, creo directory per data e inserisco il nome del modello, il nome della feature e le metriche di valutazione nel nome del file.

# Early stopping
Nella mia azienda precedente facevo questo euristicamente. Ripensandoci, implementarlo meccanicamente richiede meno di 100 righe. Perché non ci ho pensato prima...

Ho deciso di costruire una classe che ferma l'addestramento se una metrica non migliora per un certo numero di step.

## delta
https://github.com/Bjarten/early-stopping-pytorch/blob/master/pytorchtools.py
Guardando un'implementazione pre-costruita di early stopping, c'è un delta aggiunto all'espressione di confronto.

L'early stopping mira a fermarsi quando le metriche convergono, ma definire la "convergenza" con un semplice confronto numerico è spesso inadeguato.

Supponiamo che l'early stopping scatti quando una metrica non migliora per 6 step. Se la metrica sale appena e poi scende di nuovo ripetutamente, l'early stopping non scatta mai. Si voleva fermarsi quando la metrica oscillava intorno a un valore, ma il confronto semplice resetta il contatore ad ogni minimo cambiamento.

Quindi delta cattura quel range di oscillazione e viene aggiunto al confronto. Si aggiunge (non si sottrae) perché la formula è basata sulla loss, e non si vogliono contare gli aumenti della loss.

```python
elif score < self.best_score + self.delta:
    self.counter += 1
```
# Struttura del progetto
Ho fatto molto riferimento al template Python mostrato a lezione.
https://github.com/victoresque/pytorch-template

Struttura attuale del progetto:
![](/assets/images/TIL 코딩 정리 2021.08.25~27/fa5294a5-736c-4735-a8d0-5f919ceddf39-image.png)

# git
## Tracciamento config
I percorsi dei file dati e le impostazioni del programma finiscono in config.json o config.py. Gestirli con git così:
- Se si tracciano i file config:
  - Configurare file config diversi per OS.
- Se non si tracciano:
  - Nessun problema.
  - Serve trovare un modo per distribuire i config separatamente durante il deployment.

Alterno Windows e Linux, quindi non traccio i file config. Ma per un deployment serio, andrebbero tracciati con varianti per OS.
## Fermare il tracciamento git
Non sapevo che esistesse, non ne avevo mai avuto bisogno. Buono a sapersi.
https://kamang-it.tistory.com/entry/TipGit-%EC%82%AC%EC%9A%A9%EC%8B%9C-%ED%8A%B9%EC%A0%95-%ED%8C%8C%EC%9D%BC%EC%9D%84-%ED%8A%B8%EB%9E%98%ED%82%B9%EC%9D%84-%ED%95%98%EA%B8%B0-%EC%8B%AB%EC%9D%84-%EA%B2%BD%EC%9A%B0

Usato per smettere di tracciare file config e artefatti CSV.

## git rebase
Nell'azienda precedente usavo solo merge, e quando mi hanno chiesto di fare rebase prima del merge ho avuto parecchie difficoltà. D'ora in poi userò rebase per gestire i branch in modo più pulito. Me lo ero dimenticato, quindi ho consultato la documentazione.
https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0

## git default branch
Cambiare il branch predefinito localmente si può fare da command line.
https://stevenmortimer.com/5-steps-to-change-github-default-branch-from-master-to-main/

Ma cambiare il branch predefinito del repository remoto deve essere fatto dall'admin del repository tramite il sito GitHub.
