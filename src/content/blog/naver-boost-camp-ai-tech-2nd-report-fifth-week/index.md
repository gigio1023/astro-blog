---
title: "부스트캠프 AI Tech 2기 7주차 학습정리"
description: "."
date: "2021-09-17T11:34:08.418Z"
tags: ["boostcamp"]
draft: false
---

# 7주차 학습정리
## 강의 복습 내용
### NLP (10~14번 포스팅)
https://velog.io/@naem1023/series/NLP

## 과제 수행 과정 / 결과물 정리
## 멘토링 답변
** 피어세션 **
피어세션에서 정말 많은 질의가 오갔다. 그 중에서 해결이 안되거나 애매모호한 부분들만 모아서 질문을 했고 이에 대한 답변을 정리하면 다음과 같다.

- transformer에서  d_k로 나누는 이유?
    - d_k와 n이 비례하여 증가하기 때문에 gradient exploding을 방지하기 위해서 쓰는거라고 예상했었다.
    - 결론적으로 랜덤 확률 변수를 n으로 나누면 분산을 n^2으로 나누기 때문에, 수학적으로 자명한 사실을 사용했던 것으로 이해했다.
    
- positional encoding에서 sin, cos을 쓰는 이유는?
    - Sin과 Cos 함수는 값이 증가하지 않고 주기성을 가지면서 유니크한 값을 얻을 수 있다. 또한 선형변환을 통해서도 독자적인 값을 가짐을 어느정도 보장할 수 있기 때문에 사용한다.
    
- 시간복잡도 (해결)
    - 이 부분은 약간 이해에 착오가 생기신 것 같습니다. "Complexity per Layer" 부분이 행렬연산에서 시간복잡도입니다. 여기서 이야기하는 "Sequential Operation"은 다른 이야기입니다.
    - RNN을 예로 들면, t번째 time step의 hidden state를 계산하려면, t-1번째 hidden state까지의 연산이 되어있어야만 연산이 가능합니다. 그러니까 Sequence 길이에 비례하게 연산이 진행되어야겠죠. (Sequence 끝까지 연산을 하려면 t=1일 때를 계산하고, 그 다음에 t=2를 계산하고 ... 병렬처리가 될 수가 없죠?) 그래서 두 번째 Recurrent 부분에 O(n) 이라고 표기가 되어있는 것입니다. Sequence 길이에 비례하니까요 !
    - 반면 Transformer의 경우 전체 Sequence에 대한 모든 attention을 한 번에 계산합니다. Transformer 부분 강의자료를 다시 살펴보시면, Query 행렬 Q를 연산할 때, 입력행렬의 차원수가 (n * d)인걸 보시면, sequence내 전체 token에 대해 연산을 한번에 진행하는 것을 알 수 있죠. 그래서 Sequence 길이와 관계 없는 O(1)이 됩니다. GPU 성능... 이야기는 어디서 나온건지 말 모르겠네요 !
    - Transformer를 이해하는데 [가장 좋은 글](https://jalammar.github.io/illustrated-transformer/)인 것 같습니다. 찾아보면 번역본이 있어요
- 왜 sqrt(d)로 나누는가? (해결)
    - 이는 Attention is all you need! 논문을 다시 한 번 꼼꼼히 살펴보시면 이해할 수 있을 겁니다. 이를 나눠주지 않게 되면, Softmax 내에 있는 값이 행렬곱이 벡터 내적연산 결과다보니 값이 너무 커서 나눠주게 됩니다. 첨부 이미지 참고해주세요
- 왜 Sin, Cos 인가?
    - 너무 다양한 이유가 있지만 단순 정수의 나열은 뒤로 갈수록 값이 너무 커지는 문제가 있고, 정수는 우리가 임베딩에 포함된 값들에 비해 그 수가 너무 크기 때문에 아주 "작은" 위치 정보만을 임베딩에 추가해야하는 원래 취지를 벗어나게 됩니다.
    - sin, cos은 그 값을 sequence 길이에 따라 그 주기성을 이용해 조절할 수 있고, 수학적으로도 안정적 (?) 이기 때문에 사용한다는 데 이는 제가 보증할 수 없습니다 (ㅎㅎ)
    - Positional encoding을 이해하는데 도움이 되는 링크는 아주 많습니다. 몇 가지 첨부해드릴게요
        - [What is the positional encoding in the transformer model?](https://datascience.stackexchange.com/questions/51065/what-is-the-positional-encoding-in-the-transformer-model)
        - [Why does the transformer positional encoding use both sine and cosine?](https://datascience.stackexchange.com/questions/68553/why-does-the-transformer-positional-encoding-use-both-sine-and-cosine)
        - [Transformer Architecture: The Positional Encoding](https://datascience.stackexchange.com/questions/68553/why-does-the-transformer-positional-encoding-use-both-sine-and-cosine)
- 왜 Post-Layer Normalization이 문제 되는가와 warm-up
    - 지금 써주신 두 가지 화두가 같은 문제입니다. LN을 후에 걸어주게 되면, 값의 안정화가 후에 일어나기 때문에 이 부근 미분값이 초기에 크기 때문에 learning rate에 민감해진다는 이슈입니다. 그래서 warm-up이 필요한 것이구요. (정말 간단하게만 설명했습니다)
    - 자세한건 캠퍼분들께서 아래 논문을 리뷰해보시면 좋을 것 같습니다.
        - [On Layer Normalization in the Transformer Architecture](https://arxiv.org/pdf/2002.04745.pdf)
- Transformer에서 Gradient Vanishing
    - 음 이 문제는 이슈가 되지 않는 것이 1번이랑 관련이 있습니다. Vanishing이라는 게 결국에 sequence가 길어지면서 뒤의 sequence에서 생긴 gradient가 앞의 sequence까지 전달되는 과정에서 값이 작아지기 때문인데, Transformer의 경우 전체 sequence를 동시에 보기 때문에 그런 이슈에 대한 언급이 많이 없는 것 같습니다.
    - 또한 Skip-connection이 Transformer에서도 사용되는데, 이 부분이 어느 정도 Vanishing을 해결해주지만, 결정적이라고 생각하지는 않습니다. RNN과 구조상 차이인 '모든 sequence를 한 번에 본다'가 더 이유라고 보는게 맞을 것 같네요 !


## 피어세션 정리
위에서 언급한 질문들에 대해서 논의하고, 멘토님의 답변을 다시 우리들만의 언어로 이해하고 정리하기 위해 노력했다.  

## 학습 회고
21/09/06: transformer 1강 공부
21/09/07: transformer 2강 공부
21/09/08: BERT 공부
21/09/09: 나머지 강의들 공부. transformer 복습 및 정리.
21/09/10: 과제 리뷰 및 정리.