---
title: "NLP 개요"
description: "."
date: "2021-09-06T04:45:14.931Z"
tags: ["NLP"]
draft: false
---

# NLP(Natural language processing)
NLU와 NLG로 나뉜다.
- NLU(Natural language understanding): 언어에서 의도한 바를 이해하는 것
- NLG(Natural language generation): machine이 nl을 어떻게 생성할지 가르치는 영역.

- Major conference: ACL, EMNLP, NAACL

## Low-level parsing
의미 추출을 위한 low level task들은 다음과 같다.
### Toeknization
ref: https://bkshin.tistory.com/entry/NLP-2-%ED%85%8D%EC%8A%A4%ED%8A%B8-%ED%86%A0%ED%81%B0%ED%99%94Text-Tokenization
- Token: 문법적으로 나눌 수 없는 언어요소.
- Corpus: 말뭉치. 텍스트 표본.
- Toeknization: corpus로부터 token을 분리하는 작업.

즉, 문장을 token으로 이루어진 sequence로 이해한다.

### Stemming
- Stem: 어간
- Stemming: 어간 추출

영어든 한글이든 단어의 어간, 말미에는 여러 변화형이 붙을 수 있다. 이러한 변화형들을 제거해서 단어의 본래 의미만을 추출하는 작업이다.

## Word and pharse level
### NER(Named entity recognition)
여러 단어로 이루어진 개체명(고유명사 등)을 인식하는 과정. 사람 이름, 시간, 회사 등을 인식하는 것.

### POS(Part of speeching) tagging
단어의 품사를 알아내는 작업.

## Sentence level
### Sentiment analysis
문장의 감정 분석. 긍정적/부정적 등을 평가할 수 있는 과정.

### Machine translation
기계번역. target 언어의 문법과 어순을 잘 고려해서 수행.

## Multi-sentence and paragraph level
### Entailment prediction
두 문장 간의 논리적인 모순 관계 예측.

### Question answering
문장의 의미를 독해해서 사용자가 원하는 답을 해주는 것.

### Dialog system
Chat bot과 같은 대화를 처리하는 task.

### Summarization
주어진 문서를 요약하는 task.

# Text Mining
- Major conference: KDD, The WebConf(formerly, WWW), WSDM, CIKM, ICWSM

- Extract useful information and insights from text and document data
  - e.g., 특정 인물의 시대별 이미지를 분석, 특정 키워드의 빈도수를 분석해 대중의 반응 분석
- Document clustering(topic modeling)
  - 서로 다른 의미를 가지지만 같은 group으로 처리하는 task
  - e.g., 가성비, 내구성, A/S 등의 키워드를 통해 특정 제품의 반응을 탐색한다.
- Highly related to computational social science
  - e.g., social media data를 분석해 사회적 insight를 발견.
  
# Information retrieval
검색 관련 기술.
- 구글, 네이버와 같은 곳에서 사용되는 검색 기술은 정말 많이 발전해와서 현재는 발전 속도가 더디다.
- 가장 활발한 연구 분야는 추천시스템.
  - e.g., 검색엔진이 사용자가 찾아볼법한 내용들을 선제시해준다.
  
# Trends of NLP
2~3년 전의 CV 발전
- 새로운 Convolution layer를 쌓는 방법 개발, GAN 활용하며 굉장히 빠르게 발전

NLP
- Transformer의 등장 전까지 CV에 비해 비교적 느리게 발전.
- LSTM, GRU오 같은 RNN 계열의 모델들이 주로 사용돼왔음.
- 2017년, 'Attention is all you need'라는 논문 발표 이후로 거의 모든 NLP 모델들은 self-attention 기반의 transformer를 사용한다.

## Transformer
본래 기계 번역을 위해 고안된 모델.
딥러닝 이전의 기계번역은 언어의 전반적인 rule을 전문가가 모두 정의하고 대응시켰다. 

딥러닝의 등장 후에는 RNN의 입력과 출력으로 같은 의미를 가지는 서로 다른 언어를 학습시켜서 기계 번역을 수행했다. 많은 기법들 덕분에 RNN 계열의 기계번역은 성능이 오를대로 올랐다.

이러한 RNN보다 기계번역에서 더 좋은 성능을 보여준 것이 transformer다. 등장 이후에는 영상처리, 시계열예측, 신약개발, 신물질개발 등에서도 활용된다.

본래 각자 도메인과 상황에 맞게 특화된 모델을 개발해서 사용하기 마련이다. 하지만,  transformer 등장 이후에는 self-attention을 쌓아올려서 만든 거대한 모델을 자가지도학습(supervised learning)으로 학습해서 범용적 task를 처리할 수 있도록 만들었다. 
이러한 모델은 후에 큰 구조적 변화가 없이 여러 분야에 transfer learning 형태로 적용하면, 해당 분야에 특화된 모델보다 더욱 뛰어난 성능을 보여주는 것이 증명됐다.

### NLP에서의 supervised learning
빈 칸 채우기와 유사하다. 가령 'I study math'에서 study를 빈 칸으로 만들고 빈 칸에 들어갈 단어를 유추하도록 학습시킨다. 예시에서는 study에 해당하는 빈 칸에는 동사가 들어갈 자리이고, 문맥상 목적어로 math를 가질 수 있는 동사들을 후보군으로 가지고 학습을 진행할 것이다.

이런 식으로 학습된 모델들이 BERT, GPT 등이 존재한다.

특정한 task만을 처리하는 인공지능에서 보편적인 AI(Artificial Intelligence)에현대의 기술이 발전하는 것으로 볼 수 있다.

하지만 이러한 자가지도학습을 위해서는 대규모 데이터, gpu 리소스가 필요하다. 테슬라도 모델 학습을 위한 전기세만 수십억원을 소모했다고한다..

### Word Embedding
문장을 vector로 만들어 벡터 공간에서 sequence로 표현하는 것.