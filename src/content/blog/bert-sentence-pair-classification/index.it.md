---
title: "Task di classificazione di coppie di frasi con BERT"
description: "Classificazione di coppie di frasi basata su BERT: NLI, similarità semantica e question answering per information retrieval."
date: "2021-09-28T08:35:45.631Z"
tags: ["nlp"]
draft: false
lang: it
translationOf: "bert-sentence-pair-classification"
---

# Task di classificazione di coppie di frasi
Un task che misura l'inferenza nel linguaggio naturale e la similarità semantica tra due frasi date.

![](/assets/images/BERT 두 문장 관계 분류 task/9f79eea6-6b03-4120-bd92-3aea6143f05f-image.png)

Come nella classificazione di singole frasi, un classifier sul token CLS gestisce la classificazione. La differenza è che entrambe le frasi vengono inserite nel modello insieme, separate da un token SEP.

## NLI
Natural language inference.
- Un task che verifica se un language model comprende il contesto del linguaggio naturale
- Classifica Premise (premessa) e Hypothesis (ipotesi) come segue:
  - Entailment (implicazione): l'ipotesi è vera
  - Contradiction (contraddizione): l'ipotesi è falsa
  - Neutral (neutro): l'ipotesi si presume vera, o è difficile giudicare con certezza

## Semantic text pair
Un task che verifica se due frasi hanno lo stesso significato.

## IRAQ
Information Retrieval Question and Answering.
Un task che trova la risposta più appropriata da un set QA predefinito per una data domanda.
![](/assets/images/BERT 두 문장 관계 분류 task/dabde1fc-11e7-4882-98b9-5c5ff0114093-image.png)

La struttura di base è la stessa di un chatbot tipico. Si confronta la query dell'utente con query predefinite per similarità e si restituisce la risposta della query più simile.

La differenza è che alla fine del modello si aggiunge un Paraphrase Detection. Il task precedente produce le prime n risposte con alta similarità, e questo modello trova la risposta più appropriata tra di esse. Diventa un modello che inferisce la similarità semantica.
