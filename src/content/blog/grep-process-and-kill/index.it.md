---
title: "Terminare tutti i processi corrispondenti con grep"
description: "One-liner per trovare e terminare tutti i processi corrispondenti usando ps, grep, awk e xargs."
date: "2021-10-29T08:57:49.695Z"
tags: ["dev-tools"]
lang: it
translationOf: "grep-process-and-kill"
draft: false
---

```shell
ps aux | grep python | awk '{print $2}' | xargs kill -9

```
Condiviso da Kim Ji-seong del Naver Boostcamp AI Tech 2a edizione.

- La pipe ( | ) passa l'output del comando precedente al successivo.
- `ps aux` recupera le informazioni su tutti i processi in esecuzione.
- `grep python` filtra le righe che contengono "python".
- `awk '{print $2}'` estrae solo la seconda colonna, che è il PID.
  - [awk blog](https://reakwon.tistory.com/163)
  - awk permette di selezionare campi e record.
  - Qui stampa il contenuto del 2° campo.
- `xargs kill -9` termina tutti i PID estratti.
  - [xargs blog](https://jm4488.tistory.com/60)
  - xargs usa l'input ricevuto via pipe come argomenti per il comando dato.
  - L'output di awk diventa gli argomenti per kill -9.
