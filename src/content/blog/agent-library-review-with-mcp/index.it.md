---
title: "Recensione di librerie Agent con MCP"
description: "Recensione pratica di OpenAI Agents SDK, LangGraph, Gemini Gen AI SDK e MCP per la costruzione di agenti AI. Conclusione: meglio usare direttamente gli SDK dei provider LLM."
date: "2025-04-02T02:19:12+09:00"
tags: ["agent"]
draft: false
lang: it
translationOf: "agent-library-review-with-mcp"
---

- Le librerie per agent hanno una usabilità carente, per cui gestire tutto con gli SDK dei provider LLM offre la migliore observability a livello di codice — ma paradossalmente, la mancanza di buoni strumenti di monitoraggio stand-alone per agent rende l'observability integrata delle librerie molto preziosa.
- La definizione di graph state e edge di LangGraph ha un potenziale davvero alto. LangSmith, anche a distanza di tempo, resta un'esperienza positiva.
- MCP è stato un'esperienza particolare in quanto standard per un pubblico non specificato. Ma al di là del significato del protocollo, l'ecosistema mi è sembrato ancora immaturo.
- Per implementare il comportamento che volevo, usare solo gli SDK dei provider LLM è stata la scelta più saggia e rapida. Né il vibe coding né le librerie per agent risolvono ancora questo problema.

Ho scritto questo pezzo un po' alla rinfusa, senza un obiettivo preciso.

Di recente ho avuto occasione di sperimentare scenari agent avanzati, integrando strumenti interni tramite MCP.

Ho realizzato 3 versioni: una basata su OpenAI Agents SDK, una su LangGraph e una principalmente su Gemini Gen AI SDK. Tutti i demo collegavano API interne tramite MCP. La mia impressione finale è che le soluzioni tecniche disponibili nella community siano tutte ancora acerbe, e l'hype sugli agent è decisamente sproporzionato rispetto alla maturità tecnica e all'esperienza di sviluppo di ciascuna libreria.

Vediamole separatamente.

## MCP

- Vorrei considerarlo un protocollo il cui valore sta nella "standardizzazione" e passare oltre, ma non è stato così semplice.
- Per definire specifiche di chiamata LLM per client anonimi, MCP è insostituibile. Lo schema di Function Calling è per l'LLM, non per invocare strumenti. In realtà si tratta di Open API, ma dato che l'LLM non ha bisogno di autenticazione/autorizzazione o header di tracking interni, fare un wrapper ha senso. Detto questo, ecco le difficoltà che ho incontrato usandolo come semplice wrapper per spec interne già definite in Open API.
- Mi vergogno un po' a dirlo dato che non ho contribuito alla community, ma mcp-python-sdk ha una documentazione troppo carente. Leggere il codice per capire i dettagli è normale, ma non volevo dover scavare nel codice sorgente della libreria solo per capire quali funzionalità esistono. Per esempio, per aprire un server MCP tramite la CLI e capire come usare un server low-level invece di FastMCP e manipolare Starlette direttamente — ci sono esempi, ma sono del tutto insufficienti. Alla fine ho ottenuto quello che volevo scavando nel codice. Naturalmente MCP è un protocollo, e non intendo criticare nessuno.
- Anche il client mcp-python-sdk ha lo stesso problema. Gli esempi e i progetti in voga sono quasi tutti basati su stdio, un approccio difficile da usare anche per i demo. Per esempio, con stdio non ho mai avuto problemi di comunicazione, ma con gRPC/SSE su response grandi capitava che l'unicode si corrompesse. Sembra un problema di encoding nella restituzione di pydantic lato Starlette — risolto convertendo in dictionary. Ma non ho trovato segnalazioni di questo issue. Considerando che negli examples di mcp-python-sdk l'unicode viene restituito correttamente, mi sembra che il testing sia carente.

## OpenAI Agents SDK

- Agents SDK è pydantic-centrico e semplice come avevo recensito in precedenza, con integrazione facile di handoff/guardrail, e per questo l'ho provato.
- Ma era tutto lì. Per gestire stati agent complessi, le funzionalità della libreria erano più un limite che un aiuto. LangGraph usa Annotated per gestire callback di stato agent separatamente — qui non c'è nulla del genere.
- Monitorare il comportamento di agents SDK tramite OpenAI trace è impressionante. A parte LangSmith, non ho visto strumenti di monitoraggio con queste funzionalità. Però è lento, scomodo, senza tagging, e non è quella "piattaforma productizable" che il marketing di agents SDK promette. Su questo aspetto LangSmith è molto più maturo.
- OpenAI trace è legato all'infrastruttura OpenAI, quindi le API OpenAI-compatible non possono usarlo.
- A quanto ho verificato, agents SDK non usa lo stile chat completion, quindi le API OpenAI-compatible non erano utilizzabili. In produzione, dove si usa un LLM Proxy separato, sembra inutilizzabile. Potrei aver verificato male.

## LangGraph

- Come detto, l'idea di gestire gli agent come grafi, la sua implementazione e la gestione dello stato del grafo agent sono molto innovative. Era la mia prima volta con LangGraph, e ho trovato che questa idea avvantaggia sia la velocità di sviluppo individuale sia la collaborazione di team. PromptFlow gestisce questo con YAML ed è sufficientemente programmabile ma inutilizzabile al di fuori della GUI. LangGraph offre una definizione di grafo programmabile con buona visibilità.
- D'altra parte, essendo basato su LangChain, l'esperienza d'uso è stata pessima.
- Per la necessità intrinseca di supportare diversi provider LLM, i limiti di usabilità di LangChain si ereditano completamente.
- Per demo semplici non ci sono problemi. Ma quando ho provato a usare Gemini tramite un LLM Proxy interno OpenAI-compatible (chat completion), i problemi sono stati tanti. I parametri di structured output non venivano inseriti correttamente (possibile solo generazione normale), e per il controllo dei parametri di function calling i parametri supportati da Gemini non erano gestiti tramite pydantic, quindi dovevo convertire usando i types del gen ai sdk di Gemini o inserire manualmente dictionary non verificati. Il problema di structured output era irrisolvibile, quindi ho rinunciato.
- Paradossalmente, è stato il più scomodo da usare ma il più comodo da osservare. LangSmith lo uso dal 2023 e resta ottimo anche per scenari agent. La raccolta di metriche immediata senza strumenti di integrazione separati è un grande plus. Aggiungo che gli strumenti di monitoraggio LLM sono tanti, ma quelli che mostrano bene le trace degli agent sono pochissimi — sto arranggiandomi con le session di langfuse. Mi chiedo se esistano alternative migliori.

## Gemini Gen AI SDK

- Un SDK separato da Vertex AI SDK, che copre sia Google AI Studio che Vertex AI. Si possono creare demo con l'API Gemini developer e poi coprire il livello enterprise con Vertex AI usando lo stesso SDK.
- Permette un controllo granulare di Gemini, e dato che ero abituato allo stile OpenAI per l'uso degli LLM, ho implementato lo scenario agent avanzato usando solo questo SDK.
- Alla fine, dato che con agents SDK e LangGraph alcune cose erano impossibili, questa versione del demo è quella in uso internamente. Ma ha problemi di usabilità paragonabili ai precedenti.
- Gemini stesso è eccellente. Economico e con context size di 1M, non c'è rivale. Ma il gen ai SDK ha un uso ambiguo e documentazione carente. Per esempio, "parallel tool calling" normalmente si intende come "generare più scelte di funzioni" alla OpenAI function calling. Ma nella documentazione del gen ai SDK di Gemini non è così. Sembra che si possano inserire più funzioni, e in realtà non esiste un parametro per controllarlo. Per il parallel tool calling alla OpenAI, alla fine conta solo l'aggiustamento del prompt. L'uso non intuitivo e la documentazione carente sono stati i maggiori ostacoli.
- Quindi, ironicamente, il modo migliore per usare Gemini è chiamarlo via SDK OpenAI tramite un LLM Proxy.
