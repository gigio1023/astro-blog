---
title: "NLP 헷갈렸던 점들"
description: "."
date: "2021-09-20T05:49:40.684Z"
tags: ["NLP"]
draft: false
---

# argmax, multinomial
nlp 모델의 출력에 대해 argmax를 쓰지 않는 이유는 자명하다. 왜냐하면 argmax는 classification과 같이 모델의 출력이 하나의 답을 얻도록 유도하기 때문이다. 

가령, 입력 $X_n$에 대한 모델의 출력에 softmax를 거친 결과물이 [0.2, 0.5, 0.3]이라고 해보자. 그렇다면 argmax를 취했을 때 1번째 index를 답이라 생각하고 나머지 결과들은 무시하게 된다. 이러한 과정은 $X_n$에 대해서 1번째 index만을 출력하도록 모델을 강화하는 효과를 가져온다.

따라서 argmax를 출력단에 묶어준다면 classification에 아주 적합하다!

** multinomial을 쓰는 개인적인 생각**
다항분포를 NLP 모델의 출력단에 묶는 이유는 argmax와 같이 출력을 한 가지 경우에 대해서만 강화시키지 않기 위함이라고 이해했다.

입력 $X_n$에 대한 모델의 출력에 softmax를 거친 결과물이 [0.2, 0.5, 0.3]이라고 해보자. multinomial에서 각각의 index를 뽑을 확률은 해당 값들이 가진 값을 확률로 사용한 경우다. 즉, 한가지 방향으로 출력을 유도하도록 모델을 강화하지 않고 다양한 결과들이 수용될 수 있는 여지를 남겨준다.

멘토님 말씀으로는 multinomial 외에도 여러 방법을 사용해서 모델의 출력단에서 뽑아지는 결과들을 sampling 한다고 한다. multinomial과 같이 여러 가능성에 대해서 출력이 가능한 여지를 남겨두는 방법론을 선택하면 되기 때문이다. pointer network가 그 예시라고 한다!

# Beam search와 sampling은 다른가?
얼핏 들었을 때 많이 헷갈렸던 말이다. 근본적으로 전혀 다른 방법론이라고 생각한다.

Beam search에 대한 이전 포스팅: https://velog.io/@naem1023/Beam-search
Beam search는 hypothesis들에 대한 join probabilty를 생성해서 decoding을 하고자 하는 것이다. 즉, decoding을 위한 방법론이다. 

Sampling은 모집단에서 표본을 추출하는 행위다. 데이터 추출은 random, multinomial, uniform distribution 등 확률적으로 본인이 원하는 방법론을 사용하면 된다. 모집단의 성질을 잘 반영하도록 추출한다면 더욱 좋을 것이다.

따라서 bema search는 모집단으로부터 표본을 추출하는 행위가 아니다. sampling 또한 joint probability를 계산해서 최적의 decoding 결과를 생성하는 방법론이 아니다.

# GPT를 $\sqrt{n}$에 반비례하게 scaling하는 이유
transformer에서 차원수만큼 scaling을 하여 본래 분산을 복원하는 것과 동일하다. 
transformer와 다른점은 GPT는 Layer normalization이 Pre-LN 방식을 사용했다. transformer에서는 LN 후 residual block마다 scaling을 해주는 Post-LN이다.

Pre-LN인 GPT는 LN을 선수행 후, residual을 수행한다. 

## Pre-LN, Post-LN
또한 Pre-LN, Post-LN에 대한 실험적 증명과 이에 대한 논문이 있다고 한다.

[On Layer Normalization in the Transformer Architecture](https://arxiv.org/pdf/2002.04745.pdf)

멘토님의 답변을 정리하면 아래와 같다.
>
위 논문의 주된 내용
기존 Post-LN Transformer를 Pre-LN Transformer로 변경하면서 warm-up stage를 제거해도 된다는 것이 주된 목표이고 이에 대한 여러 실험결과였다. 이 때 Post-LN의 경우 Warm-up의 유무가 실험 결과에 굉장히 큰 영향이 있었다.

그러면 그냥 warmup을 쓰면 되지 않느냐 라는 질문도 당연히 제기되었고 이에 대한 문제는 최종 성능에 영향을 미치고 최적화에도 시간이 오래 걸린다는 문제가 있다. (On the Variance of the Adaptive Learning Rate and Beyond 참고. RAdam 논문인데 이 Optimizer를 사용하면 warm-up을 제거해도 괜찮다 라는 내용의 논문)

결과적으로는 Pre-LN의 경우 gradient 의 크기 (norm)가 Layer가 깊어져도 그 깊이와 관계 없이 유지되는 것이 확인됐다.
Post-LN은 output 쪽에서 미분값이 너무 크고 초반의 layer로 갈수록 이 미분값이 작아진다는 것이 확인됐다. 이 수식은 당연히 이 논문이 엄밀하지만 아래 논문을 확인하는 것이 좋을 것 같다.

Post-norm과 pre-norm을 비교한 논문: [Learning Deep Transformer Models for Machine Translation](https://arxiv.org/abs/1908.03265)

--- 
멘토님은 모델의 뒷단에 올수록 high dimentional한 feature가 나타나는데, 이러한 feature에 덜 영향을 받기 위함이라고 하셨는데 근거가 무엇인지 모르겠다. 다시 여쭤보는 중이다.