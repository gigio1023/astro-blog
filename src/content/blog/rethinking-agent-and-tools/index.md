---
title: "Rethinking agents and tools"
description: "LangCon 2025 발표 정리."
date: "2025-03-08T15:00:00+09:00"
tags: ["agent"]
draft: false
lang: ko
---

- LangCon 2025에서 에이전트 개발의 현실적 난관을 정리해 발표했다
- 좋은 에이전트의 기준이 학계, SNS, 회사에서 전부 다르다
- 어느 관점이든 실제 병목은 에이전트 로직이 아니라 도구 설계와 LLM 인프라에 있다
- Open API Specification에서 tool 변환, Port and Adapter, LLM-as-Judge 등의 접근법을 정리했다

---

LangCon 2025에서 "Rethinking about Agent and Tools"라는 제목으로 발표할 기회가 있었다. 잘 정리했다고 자신 있게 말하기는 어렵지만, 에이전트를 만들 때 부딪히는 기술적 난관들을 모아서 힌트 자료로 만들고 싶었다. 발표 자료만 봐도 내용 파악이 가능하도록 구성했다.

## "좋음"의 세 관점

에이전트의 정의 자체는 단순하다. 계획을 가지고 목표 도달 여부를 검증할 수 있는 application. 도구는 에이전트가 활용 가능한 function. 편한 논의를 위한 느슨한 정의인데, "좋은"이 붙는 순간 관점이 갈린다.

학계에서 좋은 에이전트는 새로운 해결 영역을 제시하거나 기존 방법을 개선하는 것이다. Huang et al.의 "Language Models as Zero-Shot Planners" (2022)가 GPT-3과 Sentence-BERT로 planning 가능성을 보여준 것이 대표적이다. 좋은 도구도 비슷한 방향인데, Lu et al.의 OctoTools (2025)가 16개 벤치마크에서 Unified Agent Framework를 제안한 것처럼 통합 프레임워크와 고품질 평가가 기준이 된다.

SNS에서는 매력적인 use case를 보여주는 early PoC가 기준이다. 2023년의 AutoGPT가 대표적인데, 실용성보다는 가능성 탐구에 초점이 있었다. 도구도 마찬가지로, Jina의 ReaderLM-v2처럼 HTML을 마크다운으로 변환해주는 모델이 주목받는 식이다. 다양한 예제에 얼마나 쉽게 통합 가능한지가 관건이다.

회사에서의 기준은 또 다르다. 좋은 에이전트는 투입 예산 대비 효용성이 좋아야 하고, 해결 불가능했던 use case를 해결하거나 기존 use case를 강화해야 한다. Perplexity가 오픈소스 커뮤니티의 검색 기반 에이전트를 서비스화하고 고도화한 것이 한 예다. 좋은 도구는 response 퀄리티가 보장되고, 인증이나 rate limit 관리가 수월하며, 구현 feasibility가 있어야 한다.

보편적인 유용함의 정의를 내리기는 어렵다. 하지만 어디서 에이전트를 만들든 공통적으로 부딪히는 지점이 있는 것 같다. 에이전트 자체보다 그 주변의 기술적 인프라에서 병목이 생긴다는 것이다.

## 도구가 병목

에이전트를 구현하다 보면, 정작 시간이 오래 걸리는 건 에이전트 로직이 아니라 도구를 어떻게 정의하고 연결할 것인가의 문제다.

가장 흔한 경우가 Open API Specification으로 정의된 RESTful API를 LLM function calling 스키마로 변환하는 것이다. 단순히 spec 문서를 programmable type과 function calling schema로 바꾸는 건데, 기존 오픈소스 generator들이 use case에 잘 맞지 않아서 사람의 손코딩이 필요한 경우가 많았다. OpenAI 기준으로는 functions schema generator를 직접 구현해야 하고, OpenAI Python SDK의 스키마를 참조하면 확인이 가능하다. composio.dev처럼 Python script에서 function calling spec으로 변환해주는 서비스도 있는데, 이런 서비스가 존재한다는 것 자체가 이 과정의 번거로움을 보여주는 것 같다.

웹 검색도 비슷하다. 가장 널리 사용되는 tool use case인데, 웹 크롤링, 페이지 클렌징, 요약 등의 인프라 작업이 수반된다. AI 엔지니어보다 데이터 엔지니어의 손이 더 필요한 영역이다. 엔터프라이즈에서는 사내 웹 검색 파이프라인(crawler, parser, search engine)을 직접 구축해야 하는 경우가 많고, 개인 프로젝트에서는 Tavily나 Firecrawl이 현실적이다. Gemini에서는 Google Search를 native하게 지원하는데, 무료 1,500 RPD 이후 1,000건당 $35다.

도구를 단순한 function이 아니라 에이전트의 핵심 기능으로 활용하는 접근도 있다. 개인화를 KnowledgeTriple(subject, predicate, object) 형태의 메모리로 구현하면, LLM이 매 iteration마다 개인화 소재를 생성하고 vector store에 저장할 수 있다. 도구 설계가 에이전트의 능력 자체를 결정하는 셈이다.

![개인화를 tool로 구현한 agent graph. load_memories에서 시작해 agent가 LLM과 tools를 오가며 메모리를 저장하고 조회한다.](./personalization-graph.png)

## 구현과 추상화

에이전트를 어떻게 구현할 것인가도 고민인데, Python 기준으로는 zero-base 구현이 가장 편리하고 빨랐다. 오픈소스 중에서는 FastAPI, OpenAI Python SDK, LiteLLM Proxy 정도만 사용했다. LLM 인프라 레이어를 OpenAI spec으로 통일하면 나머지가 깔끔해진다. 많은 backend-focused ML 엔지니어들이 체감하고 각자만의 솔루션을 가지고 있는 주제인데, 회사마다 이런 기반을 갖추는 속도가 다르다.

발표에서는 사내 자체 모델이 vLLM OpenAI Compatible Server로 서빙되고 있는 상황에서 ReAct 에이전트를 만드는 예시를 들었다. LangChain으로 만들면 빠른 프로토타이핑이 가능하고 코드 압축 효과가 좋다. 하지만 agent behavior spec이 고정되고, 디버깅이나 타입 정의가 어려우며, 라이브러리 내부 로직 변경이 쉽지 않다. 자체 구현은 초기 부담이 있고 보일러 플레이트가 늘어나지만, 요구사항 반영이 용이하고 LLM provider별 기능 활용이 자유롭다. Structured Output을 반환 받고 싶을 때가 대표적인 예다.

간단한 pseudo code에서 출발해서 o3-mini로 134줄의 Python ReAct 에이전트를 만들어봤다. 코드는 [gist](https://gist.github.com/gigio1023/f383dd337385d5f8e11ca2688b8bb937)에 올려뒀다.

![ReAct Agent pseudo code. 17줄로 agent loop의 핵심 구조를 표현한다.](./react-pseudo-code.png)

LLM을 에이전트 내에서 어떻게 사용할 것인가는 Port and Adapter 패턴이 깔끔한 해결책이라고 생각한다. LLMProviderService라는 추상 인터페이스를 정의하고, OpenAI나 LoraX 등 provider별 adapter를 구현하면, application 코드에서 LLM provider 교체가 투명해진다. vLLM OpenAI Compatible Server나 LiteLLM Proxy Server와 조합하면 된다.

![Port and Adapter 아키텍처. Domain을 중심으로 Port와 Adapter가 외부 인터페이스(HTTP API, RPC, MySQL 등)를 추상화한다.](./port-and-adapter.png)

## 평가와 비용

대화 시스템에서의 에이전트 평가는 LLM-as-Judge가 현실적이다. MT-Bench의 pairwise comparison, answer grading, reference-guided grading이나, WildBench처럼 무작위 대화 로그로부터도 평가가 가능하다. 1회 평가당 예산을 조절해서 현실적인 평가 주기와 크기를 탐색하는 게 핵심인데, 1회당 $5 정도를 기준으로 시작해볼 수 있다.

저비용 고품질을 달성하려면 end-to-end 평가와 모듈별 평가를 병행해서 가성비 영역을 정의해야 한다. 어느 모듈에서 어떤 모델을 쓸 것인지, 파라미터 대비 성능에서 sweet spot이 어디인지를 찾는 과정이다.

이건 나의 정리 방식이고, 각자의 현장에서는 또 다른 난관들이 있을 것이다.

## References

- Huang, W., Abbeel, P., Pathak, D., & Mordatch, I. (2022). [Language Models as Zero-Shot Planners: Extracting Actionable Knowledge for Embodied Agents](https://arxiv.org/abs/2201.07207). ICML 2022.
- Lu, P., Chen, B., Liu, S., Thapa, R., Boen, J., & Zou, J. (2025). [OctoTools: An Agentic Framework with Extensible Tools for Complex Reasoning](https://arxiv.org/abs/2502.11271). arXiv:2502.11271.
- Zheng, L., Chiang, W., Sheng, Y., et al. (2023). [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685). NeurIPS 2023.
- Lin, B.Y., Deng, Y., Chandu, K., et al. (2024). [WildBench: Benchmarking LLMs with Challenging Tasks from Real Users in the Wild](https://arxiv.org/abs/2406.04770). arXiv:2406.04770.
- LINE Engineering. [Port and Adapter Architecture](https://engineering.linecorp.com/ko/blog/port-and-adapter-architecture).
