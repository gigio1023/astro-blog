---
title: "Naver Boostcamp AI Tech 2 - Report settimana 8"
description: "Retrospettiva della settimana 8 del Naver Boostcamp AI Tech: lezioni NLP, ricerca su strumenti MLOps e discussioni sulla distribuzione del validation set."
date: "2021-09-24T09:24:46.070Z"
tags: ["naver-boostcamp"]
lang: it
translationOf: "naver-boost-camp-ai-tech-2nd-report-eighth-week"
draft: false
---

# Report settimana 8
## Revisione lezioni
https://velog.io/@naem1023/NLP-%ED%97%B7%EA%B0%88%EB%A0%B8%EB%8D%98-%EC%A0%90%EB%93%A4
https://velog.io/@naem1023/Kaggle-tip
https://velog.io/@naem1023/AI-model-as-Service%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%96%A5-AI-%EB%AA%A8%EB%8D%B8
https://velog.io/@naem1023/MLOps-%EC%A0%95%EB%A6%AC


## Processo di lavoro / risultati
Ho fatto ricerche su argomenti legati a MLOps in anticipo e testato cose in preparazione alla competizione.

Github actions
- Mi aspettavo di usare molto Wandb action, ma si e rivelato essere solo un generatore CSV per riassumere i risultati. Wandb stesso e migliore, quindi ho deciso di non usarlo.


## Riepilogo sessione tra pari
- Abbiamo discusso se dare sempre al validation set una distribuzione di classi uniforme renderebbe il modello piu robusto.
  - La mia opinione e conclusione: no.
  - L'addestramento del modello e stima della popolazione. Pre-predire le proprieta della popolazione per costruire il validation set puo essere rischioso per l'addestramento, perche il modello si addestrera per ottenere buoni punteggi su quel validation set, producendo un modello adattato al validation set. Non c'e neanche garanzia che le assunzioni sul validation set rappresentino sempre la popolazione. **In altre parole, predeterminare la distribuzione del validation set e un atto non necessario dato che non sappiamo se aiuta con la stima della popolazione.**
  - Penso che la distribuzione delle classi del validation set debba corrispondere a quella del train set. **Far corrispondere la distribuzione delle classi tra train e validation set mantiene la consistenza, evita di introdurre rumore non necessario nell'addestramento e lascia spazio ad altri metodi di training per regolare le distribuzioni di classi sbilanciate.** Se le distribuzioni di validation set e train set differiscono, si verificherebbe rumore non necessario, distruggendo l'affidabilita dei risultati delle metodologie di training.
  - Detto questo, manipolare il validation set in se non e privo di significato. Piu precisamente, ci sono chiaramente casi in cui **la manipolazione del dataset e necessaria.**
  - Per esempio, se la distribuzione delle classi dei dati di training e 99:1, c'e una probabilita molto alta che l'addestramento non funzioni affatto. In tali casi, regolare la distribuzione del dataset a qualcosa di piu bilanciato di 99:1, e poi creare train e validation set da quello, sarebbe appropriato.
  - **_Conclusione_**
    - **Se le distribuzioni di train e validation set differiscono, si genera rumore nel processo di addestramento, distruggendo l'affidabilita dei metodi di training.** Quindi convenzionalmente potrebbe non essere una validazione precisa, ma per dataset estremi, la manipolazione della distribuzione del dataset sembra necessaria.

## Retrospettiva di studio

21/09/09: Frequentate 4 lezioni speciali.
21/09/10: Frequentate 4 lezioni speciali.
