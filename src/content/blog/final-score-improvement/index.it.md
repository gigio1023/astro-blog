---
title: "Miglioramento del punteggio all'ultimo minuto"
description: "Tecniche per migliorare il punteggio all'ultimo minuto: test-time augmentation (TTA) con soft voting e training a mezza precisione."
date: "2021-09-02T01:27:24.523Z"
tags: ["computer-vision", "pytorch", "ai-competition"]
draft: false
lang: it
translationOf: "final-score-improvement"
---

Tecniche che ho usato per alzare il punteggio verso la fine della competizione. Non miglioramenti drastici delle performance -- più che altro per consolidare il punteggio.

# TTA (Test time augmentation)
ref: https://chacha95.github.io/2021-06-26-data-augmentation2/

Un metodo utilizzabile quando si ha un modello finalizzato.

Si inseriscono immagini con varie augmentation individualmente nel modello finalizzato e si fa ensemble degli output.
![](/assets/images/마지막 점수 올리기/4738e4db-bdab-4b73-9942-f3efd86cc2f3-image.png)

Il metodo per fare ensemble di output multipli è a discrezione. Il soft voting è comunemente usato. Ci sono vari metodi disponibili, ma non c'è motivo di non usare il soft voting. Il soft voting è migliore dell'hard voting per prevenire l'overfitting puntando al miglioramento delle performance.

Ma il soft voting non è la soluzione universale.

ref: https://devkor.tistory.com/entry/Soft-Voting-%EA%B3%BC-Hard-Voting

> Si raccolgono solo i modelli la cui probabilità per una certa classe supera una soglia, poi si esegue l'Hard Voting solo su quelli.

L'esempio sopra è un caso tipico per l'uso dell'hard voting, a quanto si dice.

## Implementazione del soft voting
Ci sono vari modi per implementarlo. I due esempi che ho visto:

- Durante lo step di validation, si applicano n augmentation a un batch di immagini e ogni output è $Output_n$. Poi semplicemente si sommano gli n tensori e si divide per n.
- Supponiamo che la pipeline di scelta della transformation, costruzione del modello/dataset/dataloader ed esecuzione della validation sia impacchettata come un'unità. Si dà la transformation come fattore dinamico a questa pipeline, si ottengono gli output da pipeline multiple e si fa la media sugli indici delle classi.

Ho scelto il secondo approccio, ma in termini di comodità implementativa e semplicità, il primo è di gran lunga più facile. Ho scelto il secondo per vincoli strutturali.

# Half precision
Non sono sicuro che abbia effettivamente funzionato. Il batch size dovrebbe circa raddoppiare, ma è passato solo da 40 a 50, o a volte è rimasto uguale. La velocità sembrava invariata.. L'ho applicato come indicavano i docs, ma niente sembrava funzionare. Ho provato a installare nightly pensando che funzionasse solo lì, ma neanche quello ha aiutato.

Se applicata correttamente, questa tecnica andrebbe bene fin dall'inizio del training. Usare il floating point a 16 bit dovrebbe dare guadagni di 2x o più in velocità di training e batch size.

L'ho scoperto troppo tardi nella competizione, per questo è in questo post.
