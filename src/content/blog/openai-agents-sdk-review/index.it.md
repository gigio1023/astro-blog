---
title: "Review dell'OpenAI Agents SDK"
description: "Review pratica dell'OpenAI Agents SDK a confronto con LangChain: tool, guardrail, tracing e architettura dell'agent loop."
date: "2025-03-13T02:19:12+09:00"
tags: ["agent"]
lang: it
translationOf: "openai-agents-sdk-review"
draft: false
---

# OpenAI Agents SDK

> Un SDK che sfrutta le risorse dell'API OpenAI per costruire un ecosistema di agent.

## Impressione generale
### Confronto con Langchain
Rispetto a Langchain, il nuovo SDK sembra molto piu diretto. Grazie al maggiore utilizzo di Pydantic, l'agent loop diventa molto piu chiaro.

- Definire output e guardrail specifici per gli agent e ora intuitivo e comprensibile a colpo d'occhio.
- Langchain ha un chiaro punto di forza nel supporto alle integrazioni, offrendo molti moduli. Pero la complessita aumenta parecchio quando si cerca di entrare nelle implementazioni interne. In alcuni casi serve una buona conoscenza dei meccanismi interni di Langchain solo per impostare correttamente i type hint o costruire estensioni.
- Nota a margine: gli interni degli agent di Langchain sono ancora pieni di codice legacy dell'era GPT-3, il che li rende faticosi da leggere. Nonostante il chat completion sia diventato lo standard, bisogna ancora scavare tra implementazioni e documentazione in stile completion ormai superate.

### Tracing e Evaluation
L'interfaccia di tracing e essenzialmente identica a quella di Langsmith, che resta user-friendly e visivamente chiara.

- E l'ennesima conferma che le definizioni delle traiettorie degli agent tra i vari ecosistemi sono sorprendentemente simili.
- Pero c'e una sola dashboard di trace per progetto, il che mette piu responsabilita su chi gestisce l'account OpenAI nel tenere i progetti ben organizzati.

Curiosamente, la [funzionalita eval di OpenAI](https://openai.github.io/openai-agents-python/multi_agent/#orchestrating-via-llm), prima poco visibile, e ora pienamente accessibile.

L'introduzione di funzionalita robuste di tracing ed evaluation sembra un lock-in ancora piu stretto nell'ecosistema OpenAI.

### OpenAI Assistant API
Infine, il branding dell'OpenAI Assistant API sembra sempre meno chiaro. Con la capacita di ricerca vettoriale dell'Assistant API apparentemente integrata nell'Agents SDK come tool, la situazione si e fatta ancora piu confusa. Dati questi cambiamenti sostanziali nelle funzionalita, forse sarebbe il momento di un rebranding completo -- qualcosa tipo "Agents API."



## Agent

Usa una definizione generalmente accettata di "Agent":

- **Model**
- **Tool**
- **Guardrail**

### Come funziona l'Agent

E fondamentalmente lo stesso ReAct Agent che si trova in LangChain e LlamaIndex.

Una differenza rilevante e l'introduzione del termine `handoff`, che definisce quando un agent delega un task a un altro.

Una singola sequenza dei seguenti passaggi viene definita `turn`. Corrisponde esattamente al concetto convenzionale di turno conversazionale.


Secondo la [documentazione OpenAI](https://openai.github.io/openai-agents-python/running_agents/#the-agent-loop):

1. Si chiama l'LLM per l'agent corrente, con l'input corrente.
2. L'LLM produce il suo output.
    1. Se l'LLM restituisce un `final_output`, il loop termina e si restituisce il risultato.
    2. Se l'LLM fa un handoff, si aggiornano l'agent e l'input correnti e si riesegue il loop.
    3. Se l'LLM produce tool call, si eseguono quelle tool call, si aggiungono i risultati e si riesegue il loop.
3. Se si supera il `max_turns` specificato, viene sollevata un'eccezione [`MaxTurnsExceeded`](https://openai.github.io/openai-agents-python/ref/exceptions/#agents.exceptions.MaxTurnsExceeded).

# Concetti dell'Agents SDK

- Agents
- Tools
- Runner
- Guardrails

## Tools
Ci sono 3 categorie di tool

### Hosted tools:

Tool forniti da OpenAI. Operano tramite l'API di OpenAI. Anche la fatturazione passa per OpenAI.
- Web search -> governato dalla search policy di OpenAI (modello fine-tuned, $25~$50 per 1K richieste).
- File search -> file caricati sui server di OpenAI (costi di storage e ricerca addebitati separatamente).
- Computer use -> macchine virtuali fornite da OpenAI (modello fine-tuned, pricing da definire).

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
Argomenti e docstring vengono automaticamente analizzati dalla libreria Agents per compilare nomi dei tool, argomenti, descrizioni e altro -- esattamente come LangChain.

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

### Agent come tool:

Gli agent possono essere registrati e usati come tool.

Si puo impostare un nome personalizzato per ogni agent, e l'input all'agent viene passato come parametro.


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

Una delle possibili azioni che un agent puo eseguire:

Delegare il task corrente a un altro agent.

Target dell'handoff:
- Agent semplice.
- Oggetto Handoff: anche questo e un agent, ma permette di specificare azioni di handoff piu dettagliate.

Si possono usare i prompt di handoff predefiniti forniti da OpenAI.

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
Il tracing degli agent e disponibile tramite la dashboard di OpenAI, simile a LangSmith di LangChain.
- Pro:
  - Non serve un'infrastruttura di monitoring separata.
  - Probabilmente copre anche i server compatibili con OpenAI come vLLM.
- Contro:
  - Non ancora chiaro -- onestamente sembra abbastanza solido.


## Guardrails

I guardrail girano in parallelo con gli agent, validando il comportamento dell'agent.

Si dividono in guardrail di input e output:
- Input Guardrail:
  - Valida l'input fornito a un agent. Se il campo JSON tripwire_triggered restituisce true, viene sollevata un'eccezione [`InputGuardrailTripwireTriggered`](https://openai.github.io/openai-agents-python/ref/exceptions/#agents.exceptions.InputGuardrailTripwireTriggered).
- Output Guardrail:
  - Valida l'output generato da un agent. Analogamente, se il campo JSON tripwire_triggered restituisce true, viene sollevata un'eccezione [`OutputGuardrailTripwireTriggered`](https://openai.github.io/openai-agents-python/ref/exceptions/#agents.exceptions.OutputGuardrailTripwireTriggered).

## Runners

Simile a LangChain, esiste il concetto di oggetto eseguibile, anche se l'uso differisce leggermente. L'interazione principale avviene tramite il metodo .run.
	-	Runners: raggruppano ed eseguono uno o piu agent in un loop.
	-	Capaci di generare risposte per un singolo turno.

## Streaming
I tipi di evento sono definiti [qui](https://openai.github.io/openai-agents-python/ref/stream_events/), usando `Literal` e non Enum.

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

# Altro
Utilizzo di modelli con diversi provider di API LLM

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

Server compatibile con OpenAI personalizzato
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