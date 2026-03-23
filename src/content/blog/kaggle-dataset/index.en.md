---
title: "Kaggle Dataset Download"
description: "Quick shell script for batch-downloading Kaggle competition datasets using the Kaggle API for local server training."
date: "2021-11-10T15:31:55.836Z"
tags: ["ai-competition"]
lang: en
translationOf: "kaggle-dataset"
draft: false
---

If you want to train on a personal server instead of using Kaggle notebooks, you need to download all the Kaggle datasets to the server. If you're only using the train/test files provided by the competition, you don't strictly need the Kaggle API.

But if you want to run the various code snippets posted in the discussion, you'll need to download a lot of datasets. It's tedious and time-consuming. I wrote a shell script using the Kaggle API to batch-download everything, and it made things much easier.

```shell
kaggle datasets download -d kishalmandal/extra-data
kaggle competitions download -c chaii-hindi-and-tamil-question-answering
kaggle datasets download -d kishalmandal/cleaned-data-for-chaii
kaggle datasets download -d kishalmandal/input
kaggle datasets download -d msafi04/squad-translated-to-tamil-for-chaii

files=("extra-data" "cleaned-data-for-chaii" "input" "squad-translated-to-tamil-for-chaii" "chaii-hindi-and-tamil-question-answering")
for i in "${files[@]}"; do unzip $i".zip" -d "$i;done
```
