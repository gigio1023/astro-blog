---
title: "pathlib"
description: "Introduzione al modulo pathlib di Python per una gestione dei percorsi file piu pulita e orientata agli oggetti, in alternativa a os.path."
date: "2021-09-07T01:10:10.740Z"
tags: ["python"]
lang: it
translationOf: "pathlib"
draft: false
---

# pathlib
ref: https://brownbears.tistory.com/415

Finora usavo os.path.join o os.sep per gestire manualmente le operazioni sui percorsi. Nessun problema di per se, ma e noioso, il codice diventa disordinato e difficile da mantenere. Per fortuna Python fornisce pathlib come modulo built-in.

L'idea chiave e gestire i percorsi come oggetti. Permette anche di ridefinire gli operatori per le operazioni sui percorsi, cosi '/' puo essere usato immediatamente come separatore di percorso invece che come divisione.