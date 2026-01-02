---
title: "Agent library review with MCP"
description: "."
date: "2025-04-02T02:19:12+09:00"
tags: ["agent", "llm", "langgraph", "mcp", "openai"]
draft: false
---

# My thoughts
My key conclusion after exploring current AI agent development tools is this: Directly managing all components using core LLM Provider SDKs was the fastest and clearest way to focus on solving the specific problem I aimed to solve.

This insight comes from my recent dive into building AI agents using various libraries (OpenAI Agents SDK, LangGraph) and the Multi-Agent Communication Protocol (MCP). 

Here’s a breakdown of the specific findings that led to this main takeaway:

# The Usability vs. Observability Paradox
Agent libraries often lack usability. While implementing directly with LLM Provider SDKs offers better code-level observability, the absence of strong standalone agent monitoring tools paradoxically makes the integrated observability within some libraries (like LangSmith) highly valuable.

# LangGraph

- The potential of its graph state and edge definition is genuinely high.
- Using LangSmith again was a truly positive experience; it remains excellent.
- However, its LangChain foundation resulted in a very poor usability experience, making me unlikely to use it again.
- Specific issues arose when using LangChain with Gemini via an OpenAI-compatible proxy, particularly around controlling structured output and function calling parameters. This consumed excessive time, recalling past frustrations requiring library code changes.
- LangSmith itself, revisited since '23, is still unparalleled for agent-oriented observability among the available tools.

# MCP

- Working with MCP was unique due to its goal of setting a broad standard, but the ecosystem feels underdeveloped relative to the protocol's significance.
- Insufficient mcp-python-sdk documentation necessitated code analysis for understanding details (like low-level server use with Starlette), which is undesirable when caused by documentation gaps.
- (I should acknowledge I haven't contributed documentation back myself.)
- Encountered Unicode encoding issues with large GRPC/SSE responses (solved by using dictionaries instead of Pydantic models), suggesting many might be using stdio, which is disappointing for wider adoption.

# OpenAI Agents SDK

- It delivered the expected Pydantic-based simplicity and potential for easy handoff/guardrail integration, but little else.
- The lack of other useful features resulted in significant constraints.
- It misses capabilities for complex agent state management.
- Other limitations include slow OpenAI traces, no tagging, dependency on OpenAI infrastructure, and issues using LLM proxies (due to not following the standard chat completion spec), effectively tying users to OpenAI LLMs.

# Google Gemini & Gen AI SDK

- The Gemini model itself performs excellently (1M context, cost, performance).
- However, the genai SDK and documentation lack clarity, especially compared to the high standard set by OpenAI's SDK.
- For instance, parallel tool calling exists but lacks clear configuration guidance, and function calling documentation was sparse, forcing reliance on prompt adjustments. OpenAI offers clearer control here.
- The overall SDK experience (GenAI and Vertex AI) felt subpar ("quite poor"). Using an OpenAI-compatible interface via an LLM Proxy often seemed more convenient.
Final Thought:

# Conclusion 
To implement the specific behavior I needed, using only the LLM Provider SDK was the most prudent choice and saved significant time. This need isn't yet fully addressed by current agent libraries or abstract approaches ("vibe coding").

----

# Agent 구현 + MCP 사용담: 아직 어설프다

- agent library들의 부족한 사용성 때문에 LLM Provider sdk만을 활용해 구현할 때가 observability가 제일 높지만 역설적이게도 좋은 agent향 모니터링 툴이 부재해서, agent library들의 observability가 매우 높기도 하다.
- langgraph의 graph state, edge 정의는 잠재력이 정말 높다. langsmith는 오랜만에 사용해도 행복하다는 경험을 할 수 있었다.
- MCP는 불특정 다수를 위한 표준을 제시했다는 점에서 사용하는 것 자체가 특별한 경험이었다. 하지만 프로토콜의 의의와 별도로 아직 부족한 생태계로 보였다.
- 내가 원하는 동작을 구현하기 위해서는 LLM Provider sdk만을 사용하는게 가장 현명하고 시간 단축이 됐다. 이 일을 아직은 vibe coding이나 agent 라이브러리가 해소해주지는 않는다.

조금은 두서 없이 목적없는 글을 작성해봤다. 

최근 사내 툴을 MCP로 말고, 고도화된 agent 시나리오를 실험해 볼 일이 있었다. 

3가지 버전으로 구현을 했고 각각 openai agents sdk, langgraph, 그리고 gemini의 gen ai sdk를 주로 활용한 버전들이다. 또한 각각의 데모들은 사내 API를 mcp로 말아서 연동하는 시나리오였다. 결론적으로 커뮤니티에서 활용 가능한 기술 방안들이 모두 어설프고, 이 정도 뿐인가라는 생각이 가시질 않았다. agent의 높은 hype에 비해서 각 라이브러리들에 대한 기술적인 성숙도나 개발 경험이 좋지 않았다. 

나눠서 보면 이야기해보자면

# mcp

- “표준화”에 의의를 둔 프로토콜이라고 생각하고 넘어가고 싶지만 그렇지 않았다.
- 익명의 client를 위한 LLM 호출 규격을 맞춘다는 측면에서는 MCP만한게 없다. Function Calling schema는 LLM을 위한 스키마이고, 툴을 호출하기 위한 규격이 아니기 때문이다. 사실은 이것이 Open API이긴하지만 LLM에게 인증/인가, 사내 트래킹 헤더 등은 불필요하기 때문에 wrapper로 한번 말아준다는 의미에서 유효하다. 하지만 사내에서 상호 규격이 정해진 스펙(Open API)으로 정의되어 있고 단순히 wrapper로써 mcp를 사용하는 입장에서 불편했던 점들을 이야기하겠다.
- 나조차도 커뮤니티에 제대로 기여하고 있지 못한 바여서 부끄럽긴하지만, mcp-python-sdk는 문서화가 부족해도 너무 부족하다. 세부 동작을 알기 위해 코드를 보는건 당연하지만, 어떤 기능이 있는지 파악하기 위해서 라이브러리 코드를 뜯어보고 싶지는 않았다. 예를 들어서 mcp cli를 통해서 mcp 서버를 열 때, 어떻게 해야 FastMCP가 아니라 Low level 서버를 열고 starlette을 내가 직접 조작할 수 있는지 알고 싶을 때 예제가 있긴하지만 부족해도 너무 부족하다. 결국 코드를 뜯어보면서 원했던 작업에 달성했다. 물론 mcp 자체는 프로토콜인걸 인지하고 있기에, 누군가를 힐난하고자 하는건 결코 아니다.
- mcp-python-sdk를 활용한 client도 마찬가지이다. hype되는 예제나 프로젝트들을 보면 대부분 stdio 기준으로 작성되어 있는데 데모에서도 사용하기 어려운 방식이다. 예를 들어 stdio 방식으로는 통신에서 문제가 발생하는 경우를 보지 못했지만 grpc, sse로 통신하는 경우에 큰 response에 대해서 종종 유니코드가 깨지는 이슈가 있었다. 아마 Starlette쪽에서 pydantic을 반환할 때 인코딩이 제대로 되지 않는 이슈인 것 같고 dictionary로 변환해서 반환하니 해결됐다. 하지만 이슈 리포팅이 된 사례를 본 적이 없다. 유니코드가 제대로 반환되는 예제가 mcp-python-sdk examples 있는걸 생각해보면 테스팅이 제대로 안되지 않았나 싶다.

# agnets sdk

- agents sdk는 이전에 리뷰했던 것처럼 pydantic 중심이고 심플한데, handoff / guardrail 등의 연동이 매우 쉬워서 구현을 시도했다.
- 하지만 이것이 전부였다. 복잡한 agent state를 관리하기에 라이브러리의 기능은 오히려 제한을 두는 일이 많았다. langgraph는 Annotated를 활용해 agent state를 관리하는 콜백 함수들을 별도로 지정하고 있는데 이건 그런 것도 없다.
- openai trace를 통해 agents sdk의 동작을 모니터링하는건 인상적이다. 아직까지 이만한 기능을 제공하는 모니터링 툴은 langsmith말고 본 적은 없다. 물론 매우 느리고 불편하고 태깅도 없어서 agents sdk의 홍보와 다르게 productizable platform이라고 생각하진 않는다. 오히려 이 부분에서는 langsmith가 매우 성숙하다고 본다.
- openai trace는 openai 인프라와 엮여있는 기능이어서, openai compatible api들은 사용이 불가능하다.
- agents sdk는 chat completion 스타일을 사용하지 않는걸로 확인되어서 open compatible api 사용 자체가 불가능했었다. LLM Proxy를 별도로 두고 사용해야하는 production에서는 사용이 불가능한 것으로 보였다. 이건 내가 잘못 확인했을 수도 있다.

# langgraph

- 언급했듯이 agent를 graph로 관리하고자 하는 아이디어와 그 구현, 그리고 agent graph state 관리는 매우 참신하고 좋았다. 처음 사용해보는 langgraph였는데 이런 아이디어가 개발자 개인의 구현 속도와 더불어 협업에서도 매우 유리한 구조로 보였다. promptflow에서는 이를 yaml로 관리하고 있고 충분히 programmable하지만 gui 외에는 사용이 불가능할 정도였다. langgraph는 충분히 programmable한 graph 정의가 가능했고 가시성도 좋다.
- 반면, langchain 기반이기 때문에 최악의 사용성 경험을 했다.
- 태생적으로 다양한 LLM Provider를 포용해야했기에 어쩔 수 없었겠지만, 아무튼 쓰기 불편한 langchain의 한계를 그대로 가지고 있다.
- 간단한 데모 구현에는 문제 없어보인다. 하지만 사내 openai compatible(chat completion)한 사내 LLM Proxy를 활용해서 gemini를 사용해보려고 했는데 문제가 많았다. structured output 인자가 제대로 입력되지 않아 일반 생성만이 가능했고, function calling 인자 컨트롤도 gemini에서 지원하는 인자들이 pydantic으로 관리되고 있지 않아서 langchian을 사용함에도 gemini gen ai sdk의 types를 사용해서 변환해주거나 혹은 검증되지 않은 dictionary를 손으로 기입해야했다. structured output 이슈는 도저히 해결되지 않아서 포기했다.
- 역설적이게도 가장 쓰기 불편했지만, 가장 관찰하기 편했다. langsmith는 23년도부터 잘 사용해왔었는데 여전히 agent 시나리오에서도 사용하기 매우 좋았다. 별도 integration 툴 없이 즉시 메트릭 수집이 되는게 좋았다. 너무 좋다. 첨언하며 LLM 모니터링 툴은 시중에 많은데 agent trace를 보기 편한 모니터링 툴은 거의 없어서 langfuse session으로 억지로 보는 중이었다. 좋은 방안이 있을지 궁금하다.

# gemini gen ai sdk

- vertext ai sdk와 별도로 사용 가능한 google ai studio / vertex ai 모두 커버 가능한 sdk이다. gemini developer api로 데모를 만들고, enterprise 레벨에서 vertex ai를 사용할 때 이 sdk로 모두 커버 가능하다.
- gemini에 대한 세부적인 컨트롤이 가능하고, openai style의 LLM 활용법에 익숙해져 있기에 이 sdk만을 활용하여 agent 고도화 시나리오를 구현했다.
- 최종적으로 agents sdk와 langgraph에서 사용 자체가 불가능했던 점들이 있었기에 이 버전의 데모를 사내에서 사용 중이다. 하지만 앞의 두개와 맞먹을 정도로 이상한 사용성을 가지고 있다.
- Gemini 자체는 훌륭하다. 저렴한데 context size가 1M이라 이만한 모델이 없다. 하지만 gen ai sdk는 사용법이 모호하고 문서화 너무 부족하다. 예를 들어서 parallel tool calling이라고 하면 보통 openai function calling에서 일컫는 “여러 개의 함수 선택지를 생성한다”로 이해한다. 하지만 gemini gen ai sdk 문서에서는 그렇지 않다. 마치 여러 개의 함수가 입력 가능한 것처럼 적어뒀고, 실제로 이를 컨트롤하는 인자가 존재하지 않는다. openai에서 일컫는 parallel tool calling을 사용하기 위해서는 openai와 다르게 결국 프롬프트 조정이 전부이다. 결국 직관적이지 않은 사용성과 부족한 문서화가 큰 허들이었다.
- 그래서 재밌게도 gemini를 가장 잘 사용하는 방법은 LLM Proxy에서 openai sdk로 gemini를 호출하는 방법으로 결론을 내렸다.