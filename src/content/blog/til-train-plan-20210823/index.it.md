---
title: "TIL Piano di addestramento 2021.08.23"
description: "Piano di addestramento per una competizione di classificazione mascherine: modelli per feature con ensemble learning, più note sul workflow Jupyter vs CLI."
date: "2021-08-23T16:57:30.489Z"
tags: ["pytorch", "naver-boostcamp", "ai-competition"]
draft: false
lang: it
translationOf: "til-train-plan-20210823"
---

Non stavo organizzando i TIL in modo sistematico — pubblicavo per categoria e li riassumevo brevemente nelle revisioni settimanali.

Funziona bene quando si imparano concetti nuovi, ma è molto inefficiente durante la fase di coding quotidiano stile hackathon. Per la fase di competizione (P stage), scriverò i TIL direttamente.

# Piano di addestramento
Ci sono diverse feature, ma non posso garantire correlazioni o relazioni causali tra di esse. Ed è logico — i dati non lo supportano. Quindi ho definito un piano su come addestrare.

## Sintesi
La mia calligrafia è terribile... In breve: creare un modello per feature, poi fare ensemble learning. Ogni modello riceve le stesse immagini in input ed esegue la classificazione per la propria feature.

# Jupyter vs py
Dopo aver passato più di un anno al lavoro a programmare esclusivamente con Python da CLI (senza Jupyter), mi trovo molto più a mio agio con quell'approccio ed è più facile organizzare il codice. Con Jupyter, si ammassa tutto il codice in un notebook e la visibilità è terribile.

Detto questo, ho usato Jupyter per la sperimentazione. Ho prototipato dataset, utilizzo di pandas e varie classi/funzioni in Jupyter, poi li ho applicati ai file .py.

Comunque rimane scomodo per certi aspetti:
- Serve codice extra per gestire i moduli.
- Jupyter si basa molto sulle variabili globali, rendendo difficile la traduzione diretta in .py — altro codice extra necessario.

Alla fine sto programmando direttamente in .py.

# PyCharm SSH
Uso la versione education di PyCharm, che supporta SSH e SFTP per la programmazione lato server. Quando l'ho provato, aveva più inconvenienti del remote-ssh di VSCode, quindi non l'ho usato.

A quanto pare funziona completamente — l'ho scoperto dalla sessione peer di oggi. Non ho tempo ora, ci proverò nel weekend. La qualità dell'IDE di PyCharm è molto migliore, quindi il passaggio sarebbe un vantaggio netto. Il problema è che l'ambiente della competizione non apre tutte le porte, quindi a quanto dicono il debug tramite PyCharm non funziona.
