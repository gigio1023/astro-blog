---
title: "Kaggle dataset"
description: "."
date: "2021-11-10T15:31:55.836Z"
tags: ["kaggle"]
draft: false
---

kaggle notebook을 안쓰고 개인 서버에서 train 해보려면 kaggle dataset을 전부 서버에 받아야한다. 대회에서 제공해주는 train/test 파일들만 쓴다면 kaggle api를 쓸 필요까지 없다.

하지만 discussion에 올라온 여러 code들을 돌려보려면 정말 많은 dataset들을 받아야한다 귀찮고 시간도 오래 걸린다. kaggle api로 한꺼번에 받는 쉘 스크립트를 만들어서 쓰니 편했다.

```shell
kaggle datasets download -d kishalmandal/extra-data
kaggle competitions download -c chaii-hindi-and-tamil-question-answering
kaggle datasets download -d kishalmandal/cleaned-data-for-chaii
kaggle datasets download -d kishalmandal/input
kaggle datasets download -d msafi04/squad-translated-to-tamil-for-chaii

files=("extra-data" "cleaned-data-for-chaii" "input" "squad-translated-to-tamil-for-chaii" "chaii-hindi-and-tamil-question-answering")
for i in "${files[@]}"; do unzip $i".zip" -d "$i;done
```