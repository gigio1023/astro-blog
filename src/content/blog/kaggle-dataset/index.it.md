---
title: "Download dataset Kaggle"
description: "Script shell per il download in batch dei dataset delle competition Kaggle usando l'API Kaggle per il training su server locale."
date: "2021-11-10T15:31:55.836Z"
tags: ["ai-competition"]
lang: it
translationOf: "kaggle-dataset"
draft: false
---

Se si vuole trainare su un server personale invece di usare i notebook Kaggle, bisogna scaricare tutti i dataset Kaggle sul server. Se si usano solo i file train/test forniti dalla competition, l'API Kaggle non è strettamente necessaria.

Ma se si vogliono eseguire i vari codici condivisi nella discussion, servono molti dataset da scaricare. È noioso e richiede tempo. Ho scritto uno script shell usando l'API Kaggle per scaricare tutto in batch, e ha semplificato molto le cose.

```shell
kaggle datasets download -d kishalmandal/extra-data
kaggle competitions download -c chaii-hindi-and-tamil-question-answering
kaggle datasets download -d kishalmandal/cleaned-data-for-chaii
kaggle datasets download -d kishalmandal/input
kaggle datasets download -d msafi04/squad-translated-to-tamil-for-chaii

files=("extra-data" "cleaned-data-for-chaii" "input" "squad-translated-to-tamil-for-chaii" "chaii-hindi-and-tamil-question-answering")
for i in "${files[@]}"; do unzip $i".zip" -d "$i;done
```
