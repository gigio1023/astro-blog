---
title: "MRC"
description: "."
date: "2021-10-12T01:31:41.828Z"
tags: ["MRC"]
draft: false
---

# MRC
기계독해. Machine reading comprehension.
주어진 지문(context)를 이해하고, 질의(Query/Question)의 답변을 추론하는 task.

최종적으로는 train에 사용한 MRC Dataset에 존재하지않는 QA에 대해서도 외부 데이터를 활용해 답을 하고자 한다.


## Extractive Answer Datasets
질의(question)에 대한 답이 항상 주어진 context의 segment(or span)으로 존재

### Cloze Tests
e.g., CNN/Daily Mail, CBT 
![](/assets/images/MRC/695e12f4-531e-4065-8862-e9b5686405e4-image.png)
Question, Answering의 형식이긴하지만 우리가 MRC에서 원하는 것과 같이 온전한 형태의 질문이 아니다.

### Span Extraction
e.g.,) SQuAD, KorQuAD, NewsQA, Natural Questions
![](/assets/images/MRC/faeb59eb-be0f-4f4f-a8ec-88ca8ddc1710-image.png)

## Descriptive Narrative Answer Datasets
Context 내의 span으로 답을 추출하지 않고, Question을 보고 생성된 sentence(or free-form)의 형태를 답으로 결정.

e.g., MS MACRO, Narrative QA
![](/assets/images/MRC/7362e732-73ef-4df1-b60b-0710b6d5c3b9-image.png)

## Multiple-choice Datasets
Answer candidates 중에서 Question의 답을 고르는 task. MRC QA model을 만드는데 적합하지는 않다고 한다.
e.g.,) MCTest(2013년에 공개된 최초의 public MRC dataset이라고들 한다), RACE, ARC

# Challenges in MRC
## Paraphrased paragraph
![](/assets/images/MRC/09a179cc-8a14-4813-bcd5-7e9c12647b20-image.png)
P1과 P2는 동일한 의미를 가지는 문장이다. paraphrased된 문장들이다.

P1 문장은 Question에서 등장하는 핵심 단어들인 'selected', 'mission'이 등장하면서 문장의 구조도 매우 쉽다. 따라서 P1 문장을 context에서 찾을 수 있다면 question에 대해서 쉽게 답을 할 수 있을 것이다.

하지만 P2 문장은 question에서 등장하는 단어들이 등장하지도 않을 뿐더러, 문장의 구조는 어려워졌다. 

MRC model은 P1, P2에서 모두 답을 찾을 수 있어야 한다.

## Coreference resolution
![](/assets/images/MRC/5734c92e-d1ff-4a38-a816-d59aac0083b8-image.png)
coreference는 상호간에 동일한 의미를 가지며 지칭되는 entity들을 의미한다. coreference resolution은 이러한 entity들을 같은 entity로 인식하는 것이다.
ref: [Blog](https://jjdeeplearning.tistory.com/26)


## Unanswerable questions
지문만을 보고 답을 할 수 없는 경우는 분명 존재한다. 하지만 미숙한 모델일 경우 억지로 답을 도출해낼 수도 있다.

따라서 unasnwerable question에 대해서는 답을 내릴 수 없다는 답을 내줘야 한다.

## Multi-hop resoning
답을 찾기 위해서 여러 document의 supporting fact를 찾아야만 답을 할 수 있는 task.

e.g., HotpotQA, QAngaroo
![](/assets/images/MRC/fb6e8b56-1c99-4f3d-b901-b3d0f08b3010-image.png)


# 평가방법
## Extract Match, F1 score
답변이 지문 내에 존재하는 경우(extractive answer)와 multiple-choice dataset의 경우에 사용하는 평가방법들.

- Extract match(EM) or Accuracy
  - 예측한 답과 ground truth이 **정확히** 일치 비율
  - (Number of correct samples) / (Number of whole sampels)
- F1 score
  - 예측한 답과 ground truth 사이의 token overlap을 F1 score로 계산
  
## ROUGE-L, BLEU
descriptive answer를 위한 평가 방법.
- ROUGE-L Score
  - 예측한 값과 ground truth 사이의 overap recall
- BLEU
  - 예측한 답과 ground truth 사이의 precision