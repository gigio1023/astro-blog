---
title: "OpenAI Agents SDK review"
description: "."
date: "2025-03-13T02:19:12+09:00"
tags: ["agent", "llm"]
draft: false
---

# OpenAI Agents SDK

> An SDK leveraging OpenAI API resources for building an agent ecosystem.

## Overall Impression
### Compare to Langchain
Compared to Langchain, the new SDK feels way more straightforward. Thanks to its deeper reliance on Pydantic, the agent loop becomes much clearer.

- Defining agent-specific outputs and guardrails is now intuitive and easy to grasp at a glance.
- Langchain has a clear strength in terms of integration support, offering many modules. However, the complexity ramps up significantly when you try to dig into the internal implementations. In some cases, you need a solid understanding of Langchain's inner workings just to properly set type hints or build extensions.
- On a side note, Langchain's agent internals are still littered with legacy code from the GPT-3 era, making it a pain to read. Despite chat completion becoming the new norm, you still have to sift through outdated completion-style implementations and documentation.

### Tracing and Evaluation
The tracing UI is essentially identical to Langsmith’s, which remains user-friendly and visually clear.

- It's another reminder that agent trajectory definitions across ecosystems look surprisingly similar.
- However, there's only one trace dashboard per project, putting extra responsibility on whoever manages the OpenAI account to keep projects well-organized.

Interestingly, the previously under-the-radar [OpenAI eval functionality](https://openai.github.io/openai-agents-python/multi_agent/#orchestrating-via-llm) is now fully accessible.

The introduction of robust tracing and evaluation features feels like an even tighter lock-in to the OpenAI ecosystem.

### OpenAI Assistant API
Lastly, the OpenAI Assistant API branding seems increasingly unclear. With Assistant API's vector search capability apparently rolled into the Agents SDK as a tool, it's gotten even murkier. Given these substantial changes in functionality, it might be time for a full rebrand—perhaps something along the lines of an "Agents API."



## Agent

Uses a generally accepted definition of an "Agent":

- **Model**
- **Tool**
- **Guardrail**

### How the Agent Works

It's basically the same as the ReAct Agent found in LangChain and LlamaIndex.

A notable difference is the introduction of the `handoff` term, defining when one agent delegates a task to another.

A single sequence of the following steps is defined as a `turn`. This aligns exactly with the conventional concept of a conversational turn.


According to [OpenAI Docs](https://openai.github.io/openai-agents-python/running_agents/#the-agent-loop),

1. We call the LLM for the current agent, with the current input.
2. The LLM produces its output.
    1. If the LLM returns a `final_output`, the loop ends and we return the result.
    2. If the LLM does a handoff, we update the current agent and input, and re-run the loop.
    3. If the LLM produces tool calls, we run those tool calls, append the results, and re-run the loop.
3. If we exceed the `max_turns` passed, we raise a [`MaxTurnsExceeded`](https://openai.github.io/openai-agents-python/ref/exceptions/#agents.exceptions.MaxTurnsExceeded) exception.

# Concept of Agents SDK

- Agents
- Tools
- Runner
- Guardrails

## Tools
There're 3 categories of tools 

### Hosted tools:

A tool provided by OpenAI. Operates via OpenAI’s API. Billing also goes through OpenAI.
- Web search → governed by OpenAI’s search policy (fine-tuned model, $25~$50 per 1K requests).
- File search → files uploaded to OpenAI’s file servers (storage and search costs charged separately).
- Computer use → leverages virtual machines provided by OpenAI (fine-tuned model, pricing TBD).

```python
from agents import Agent, FileSearchTool, Runner, WebSearchTool

agent = Agent(
    name="Assistant",
    tools=[
        WebSearchTool(),
        FileSearchTool(
            max_num_results=3,
            vector_store_ids=["VECTOR_STORE_ID"],
        ),
    ],
)

async def main():
    result = await Runner.run(agent, "Which coffee shop should I go to, taking into account my preferences and the weather today in SF?")
    print(result.final_output)
```

### Function calling:
Arguments and docstrings are automatically parsed by the Agents library to fill in tool names, arguments, descriptions, and more—exactly like LangChain.

```python
import json

from typing_extensions import TypedDict, Any

from agents import Agent, FunctionTool, RunContextWrapper, function_tool

class Location(TypedDict):
    lat: float
    long: float

@function_tool  
async def fetch_weather(location: Location) -> str:
    
    """Fetch the weather for a given location.

    Args:
        location: The location to fetch the weather for.
    """
    # In real life, we'd fetch the weather from a weather API
    return "sunny"

@function_tool(name_override="fetch_data")  
def read_file(ctx: RunContextWrapper[Any], path: str, directory: str | None = None) -> str:
    """Read the contents of a file.

    Args:
        path: The path to the file to read.
        directory: The directory to read the file from.
    """
    # In real life, we'd read the file from the file system
    return "<file contents>"

agent = Agent(
    name="Assistant",
    tools=[fetch_weather, read_file],  
)

for tool in agent.tools:
    if isinstance(tool, FunctionTool):
        print(tool.name)
        print(tool.description)
        print(json.dumps(tool.params_json_schema, indent=2))
        print()
```

### Agents as tools:

Agents can be registered and used as tools.

You can set a custom name for each agent, and the input to the agent is passed as a parameter.


```python
from agents import Agent, Runner
import asyncio

spanish_agent = Agent(
    name="Spanish agent",
    instructions="You translate the user's message to Spanish",
)

french_agent = Agent(
    name="French agent",
    instructions="You translate the user's message to French",
)

orchestrator_agent = Agent(
    name="orchestrator_agent",
    instructions=(
        "You are a translation agent. You use the tools given to you to translate."
        "If asked for multiple translations, you call the relevant tools."
    ),
    tools=[
        spanish_agent.as_tool(
            tool_name="translate_to_spanish",
            tool_description="Translate the user's message to Spanish",
        ),
        french_agent.as_tool(
            tool_name="translate_to_french",
            tool_description="Translate the user's message to French",
        ),
    ],
)

async def main():
    result = await Runner.run(orchestrator_agent, input="Say 'Hello, how are you?' in Spanish.")
    print(result.final_output)
```

## Handoffs

One of the possible actions an agent can perform:

Delegating the current task to another agent.

Handoff target:
- Simple agent.
- Handoff object: This is also an agent, but allows specifying more detailed handoff actions.

You can use the prebuilt handoff prompts provided by OpenAI.

```python
from agents import Agent, handoff

billing_agent = Agent(name="Billing agent")
refund_agent = Agent(name="Refund agent")

triage_agent = Agent(name="Triage agent", handoffs=[billing_agent, handoff(refund_agent)])
```
```python
from agents import Agent
from agents.extensions.handoff_prompt import RECOMMENDED_PROMPT_PREFIX

billing_agent = Agent(
    name="Billing agent",
    instructions=f"""{RECOMMENDED_PROMPT_PREFIX}
    <Fill in the rest of your prompt here>.""",
)
```

## Tracing
Agent tracing is available through OpenAI’s dashboard, similar to LangChain’s LangSmith.
- Pros:
  - No need for separate monitoring infrastructure.
  - Probably covers vLLM OpenAI-compatible servers as well.
- Cons:
  - Not clear yet—honestly just seems pretty solid.


## Guardrails

Guardrails run in parallel with agents, validating agent behavior.

They are categorized into input and output guardrails:
- Input Guardrail:
  - Validates the input provided to an agent. If the JSON output field tripwire_triggered returns true, an [`InputGuardrailTripwireTriggered`](https://openai.github.io/openai-agents-python/ref/exceptions/#agents.exceptions.InputGuardrailTripwireTriggered) exception is raised.
- Output Guardrail:
  - Validates the output generated by an agent. Similarly, if the JSON output field tripwire_triggered returns true, an [`OutputGuardrailTripwireTriggered`](https://openai.github.io/openai-agents-python/ref/exceptions/#agents.exceptions.OutputGuardrailTripwireTriggered) exception is raised.

## Runners

Similar to LangChain, there is the concept of a runnerable object, though usage slightly differs. The primary interaction is through a .run method.
	•	Runners: Bundle and execute one or more agents in a loop.
	•	Capable of generating responses for a single turn.

## Streaming
Events types are defined in [here](https://openai.github.io/openai-agents-python/ref/stream_events/), using `Literal` not Enum.

```python
import asyncio
import random
from agents import Agent, ItemHelpers, Runner, function_tool

@function_tool
def how_many_jokes() -> int:
    return random.randint(1, 10)

async def main():
    agent = Agent(
        name="Joker",
        instructions="First call the `how_many_jokes` tool, then tell that many jokes.",
        tools=[how_many_jokes],
    )

    result = Runner.run_streamed(
        agent,
        input="Hello",
    )
    print("=== Run starting ===")

    async for event in result.stream_events():
        # We'll ignore the raw responses event deltas
        if event.type == "raw_response_event":
            continue
        # When the agent updates, print that
        elif event.type == "agent_updated_stream_event":
            print(f"Agent updated: {event.new_agent.name}")
            continue
        # When items are generated, print them
        elif event.type == "run_item_stream_event":
            if event.item.type == "tool_call_item":
                print("-- Tool was called")
            elif event.item.type == "tool_call_output_item":
                print(f"-- Tool output: {event.item.output}")
            elif event.item.type == "message_output_item":
                print(f"-- Message output:\n {ItemHelpers.text_message_output(event.item)}")
            else:
                pass  # Ignore other event types

    print("=== Run complete ===")

if __name__ == "__main__":
    asyncio.run(main())
```

---

# Ohters
Model usage in different LLM API Provider

OpenAI
```python
from agents import Agent, Runner, AsyncOpenAI, OpenAIChatCompletionsModel
import asyncio

spanish_agent = Agent(
    name="Spanish agent",
    instructions="You only speak Spanish.",
    model="o3-mini", 
)

english_agent = Agent(
    name="English agent",
    instructions="You only speak English",
    model=OpenAIChatCompletionsModel( 
        model="gpt-4o",
        openai_client=AsyncOpenAI()
    ),
)

triage_agent = Agent(
    name="Triage agent",
    instructions="Handoff to the appropriate agent based on the language of the request.",
    handoffs=[spanish_agent, english_agent],
    model="gpt-4o",
)

async def main():
    result = await Runner.run(triage_agent, input="Hola, ¿cómo estás?")
    print(result.final_output)
```

Custom OpenAI Compatible Server
```python
external_client = AsyncOpenAI(
    api_key="EXTERNAL_API_KEY",
    base_url="https://api.external.com/v1/",
)

spanish_agent = Agent(
    name="Spanish agent",
    instructions="You only speak Spanish.",
    model=OpenAIChatCompletionsModel(
        model="EXTERNAL_MODEL_NAME",
        openai_client=external_client,
    ),
    model_settings=ModelSettings(temperature=0.5),
)
```