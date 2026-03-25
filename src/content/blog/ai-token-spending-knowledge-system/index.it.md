---
title: "21,4 miliardi di token fuori dal codice"
description: "12 settimane, 21,4 miliardi di token."
date: "2026-03-26T10:00:00+09:00"
tags: ["agent", "dev-tools"]
draft: false
lang: it
translationOf: "ai-token-spending-knowledge-system"
---

- 21,4 miliardi di token in 12 settimane con abbonamenti personali. La maggior parte non è andata a scrivere codice, ma a costruire conoscenza strutturata e a far girare ricerca e decisioni sopra, tramite agent harness.
- Le interfacce possono cambiare, ma conoscenza ben organizzata e guide funzionano su qualsiasi strumento.
- Anche con modelli migliori, il ruolo di definire direzione e confini probabilmente non scomparirà.

---

Ho sommato l'utilizzo di token dei miei abbonamenti AI personali. Nessun utilizzo di Claude Code o Cursor forniti dall'azienda è incluso. Le policy di sicurezza del mio datore di lavoro sono rigide, e non volevo usare asset aziendali per promozione personale. Qui c'è solo l'utilizzo tracciato dagli abbonamenti personali: ChatGPT Personal, un abbonamento annuale ChatGPT Pro vinto a un hackathon OpenAI, Claude Code Max 20x e Cursor a $20 al mese. La maggior parte gira in modo asincrono, gli agenti lavorano mentre pranzo o faccio altro.

| Strumento | Token | Costo |
|-----------|-------|-------|
| Claude Code | 1,67 mld | $1.480 |
| Codex / OpenAI | 19,72 mld | $6.459 |
| Cursor | 48M | $55 |
| **Totale** | **21,4 mld** | **$7.994** |

Dal 1° gennaio al 25 marzo 2026. Circa 12 settimane. Aggregato da `bunx ccusage --json` e `bunx @ccusage/codex@latest --json` su due MacBook, più il CSV di utilizzo 2026 dalla dashboard di OpenClaw. OpenClaw funziona con un abbonamento OpenAI, quindi è incluso nella riga Codex / OpenAI, anche se l'utilizzo è stato inferiore al previsto: 52 milioni di token. L'utilizzo di strumenti forniti dall'azienda è escluso. Tutti abbonamenti, quindi non ho pagato davvero così tanto. È quanto sarebbe uscito con tariffazione a token.

## Costruire l'ambiente

Lo sviluppo personale si è limitato a qualche progetto Unity e a questo blog. Il grosso dei token è andato a costruire una base di conoscenza personale — 3.200 file Markdown, 370.000 righe — e a trasformarla in un sistema in cui gli agenti possono fare ricerca e prendere decisioni. Contiene cose come note di ricerca tecnica, pianificazione finanziaria, ricerca comparativa sulle politiche migratorie, e anche la gestione delle todo list. In pratica i temi sono molti di più, ma ci sono troppe informazioni personali per elencarli.

OpenAI ha un concetto che chiama harness engineering: "ogni volta che un agente fa un errore, ci si prende il tempo di progettare una soluzione perché quell'errore non si ripeta mai più." Sto applicando lo stesso principio al mio sistema di conoscenza personale. Quando un agente fa riferimento a informazioni errate, correggo la catena INDEX. Quando manca letteratura, la raccolgo. Quando un'attività si ripete, la trasformo in un agent skill. Ci sono 19 skill su questo repo. Uno skill vault-health rileva link rotti e file non referenziati, e uno skill di revisione settimanale riassume i cambiamenti e stabilisce le priorità per la settimana successiva.

C'è una quantità significativa di informazioni personali, quindi condividere il contenuto è fuori discussione. Onestamente, anche averlo in un repo privato a volte mi inquieta. Una chiave GitHub compromessa e tutto è esposto. Sto considerando il git self-hosted, ma i miei due server personali non mi sembrano abbastanza affidabili. Conosco troppo bene il valore dei managed service per fare quel salto con leggerezza.

## Anche al lavoro

Non pretendo di essere il migliore in questo, ma applico lo stesso approccio al lavoro. Per esempio, raccolgo metriche VictoriaMetrics via CLI e API, faccio del lavoro manuale iniziale per adattarmi all'infrastruttura aziendale, poi lo impacchetto come agent skill. Dopo, gli agenti recuperano le metriche e le reimmettono nello sviluppo automaticamente. Il lavoro con le dashboard Grafana SDK segue lo stesso schema.

Il wiki aziendale gira su Jira Confluence, facile da raggiungere via MCP. L'infrastruttura raggiungibile via HTTP API o CLI ha specifiche ben mantenute. Alcune parti non sono definite a livello IaC o seguono convenzioni interne, quindi c'è stato un po' di trial and error all'inizio.

Una cosa che ho scoperto in un ambiente multi-repo: i setup monorepo sono spesso difficili da imporre a livello organizzativo, ma per il mio workspace, avvolgere più repo sotto una directory padre e lavorare da lì rende il mantenimento del contesto molto più facile. Quando BE, Grafana SDK repo, Airflow e repo infrastrutturali sono separati, il contesto si spezza costantemente. Avvolgerli permette all'agente di capire le relazioni tra repo.

Scrivo la documentazione wiki in modo completo, ma penso che la documentazione pratica e la definizione delle attività vivano più fedelmente negli agent skill. Contengono ogni gotcha dall'uso reale, e se qualcosa diventa obsoleto, il mio stesso lavoro si blocca, quindi devo correggerlo. Per costruire gli skill, faccio riferimento alle [Lessons from Building Claude Code](https://x.com/trq212/status/2033949937936085378) di Thariq Shihipar così spesso che ho creato un skill creator skill separato solo per il processo.

## Da Notion ai repository git

Avevo tutto su Notion con un setup PARA. Notion è genuinamente migliore per scrivere ed è bello da vedere. Per un po' li ho usati in parallelo. Ma col tempo solo Projects e Archives crescevano, l'accesso mobile era pessimo, e non ho mai costruito l'abitudine di aprire Notion.

Ciò che ha spinto la migrazione completa: le funzionalità dashboard più recenti di Notion non funzionavano con il piano educational. Solo i grafici base erano disponibili. Notion MCP poteva aggiungere viste di visualizzazione, ma incorporarle nelle pagine effettive non era possibile via MCP, quindi un umano doveva comunque assemblare le cose manualmente. Un problema secondario, ma uno dei motivi per cui ho spostato quasi tutto nei repository git.

Ho usato Claude Code per migrare tutto. Notion MCP si è rivelato basato su blocchi, non su Markdown, quindi gli elementi dovevano essere inseriti uno per uno. Dal punto di vista di un agente, Notion sembrava un archivio dati isolato. I repository git con file Markdown permettono agli agenti di leggere e scrivere direttamente. Con 3.200 file, uso alberi INDEX.md per la navigazione così il sistema non collassa man mano che cresce.

Di recente ho iniziato a usare Obsidian. Non sono ancora sicuro del valore aggiunto. Quando il grafo della conoscenza è gestito tramite un agent harness, non mi è chiaro cosa porti Obsidian in più. Vantaggi attuali: il rendering Markdown è migliore di VSCode, il frontmatter si visualizza in modo pulito. Sembra più "non dover premere Cmd+Shift+V ogni volta" che "usare Obsidian."

## Inbox e ricerca web

Il mio inbox funziona tramite un canale Discord dedicato dove butto i link. OpenClaw gira su un'istanza Oracle ARM con il mio repo di conoscenza clonato. Basato su abbonamento OpenAI, reasoning effort impostato su high. xhigh ha quota sufficiente ma si comportava in modo strano su task semplici. Quando arriva un link, recupera l'articolo e ogni link di riferimento menzionato, producendo un riassunto tramite un agent skill personalizzato. L'istanza ARM64 gratuita di Oracle Cloud funziona per sempre senza costi.

Anche l'abbonamento ChatGPT Pro è utile. È un premio annuale vinto a un hackathon OpenAI. L'ho usato per eseguire ricerche web multi-hop ad alto volume da Claude Code, e per usare Codex CLI stesso come strumento di ricerca web dentro OpenClaw, che non ha ricerca integrata. Entrambi funzionano tramite `codex exec ...` con query in linguaggio naturale modellate per ciascun harness. Lo facevo prima che il subagent Codex diventasse ufficiale. All'hackathon OpenAI del 20 gennaio, un ingegnere ha menzionato che la funzionalità era stata aggiunta senza documentazione, e ho iniziato a usarla da allora. All'epoca era instabile, quindi lanciavo più processi Codex dalla shell bash in parallelo. Il multi-thread non funzionava; doveva essere multi-processo. Dopo aver aumentato il mio abbonamento Claude Code, ho smesso di usare questo pattern lì. In OpenClaw è ancora molto utile.

## Una volta costruito

Ho condotto uno studio comparativo sui sistemi di immigrazione di diversi paesi europei. Paesi in cui non ho mai vissuto, di cui non sapevo quasi nulla, e che parlano lingue completamente diverse. Il risultato: 366 file, iterati fino alla versione 7.0. Circa due mesi di lavoro.

L'ambito della ricerca delegata agli agenti era ampio. Confronto dei diritti di soggiorno del coniuge in 6 paesi, requisiti per categoria di visto come Blue Card e Highly Skilled Migrant, regolamenti effettivi delle ambasciate inclusa Seoul, come funziona l'amministrazione basata sul comune per la registrazione della residenza e il rilascio del SSN, modifiche recenti ai regolamenti del Visto D, strutture fiscali e sistemi di previdenza sociale per ciascun paese. Ho costruito una matrice decisionale che confronta 5 città su 11 dimensioni — dimensione del mercato, complessità del visto, barriera linguistica, struttura fiscale, costo della vita, e così via — e ho visualizzato 12 percorsi di trasferimento diversi come timeline mese per mese.

Si potrebbe risolvere assumendo un consulente per l'immigrazione o acquisendo le competenze linguistiche e la conoscenza locale. Ma seduto a casa in Corea, ho potuto far raccogliere agli agenti documenti legali, requisiti dell'ambasciata e report di esperienze reali, farli verificare incrociandoli, e produrre piani abbastanza concreti. Senza agenti, ci sarebbero voluti diversi mesi in più di domande nei forum per espatriati.

## Un consulente personale

Un caso d'uso meno prevedibile: ho costruito un skill di consulenza sullo stesso sistema di conoscenza basato su repository git. Non ho alcuna competenza di dominio qui, quindi l'intera costruzione potrebbe essere fondamentalmente sbagliata in modi che non riesco a vedere. Ma ho raccolto tutta la letteratura sulla consulenza che gli agenti potessero reperire. Approcci principali come CBT, DBT, ACT, colloquio motivazionale, terapia centrata sulla persona a livello di manuale, più linee guida etiche e protocolli di intervento in crisi.

L'approccio è stato completamente diverso dagli skill orientati all'implementazione come quelli di Thariq o dell'harness engineering. Invece di catturare gotcha nel codice, il tempo è andato a mappare i punti di collisione tra teorie terapeutiche e a progettare vincoli di sicurezza. Il modello dei common factors di Wampold (2001) sostiene che la relazione terapeutica conta più dell'approccio specifico, ma questo confligge con tecniche proprietarie in certe situazioni, e dovevo pre-mappare quelle priorità. Come la meta-analisi di Fluckiger et al. (2018) sull'alleanza terapeutica si applica alla consulenza mediata dall'AI era un'altra questione aperta. Alla fine ho impostato vincoli di sicurezza rigidi e lasciato che l'LLM seguisse il suo agent harness per trovare e confrontare le fonti. Non volevo funzionare su una pipeline fissa come i prodotti di consulenza AI esistenti.

Ho costruito il flusso di conversazione attorno ad AskUserQuestion, e la sensazione è molto diversa da quando lo uso durante lo sviluppo. Quando l'agente fa una domanda e rispondo, finisco per riorganizzare la mia situazione nel processo. Già solo questo si è rivelato un esercizio utile. Codex ha un equivalente chiamato request_user_input, ma funziona solo in plan mode, il che è abbastanza scomodo da essere uno dei motivi per cui il mio utilizzo di Claude Code è aumentato bruscamente nelle ultime due settimane. Per inciso, mi piace lavorare da CLI, ma l'app Codex mi manca un po'. I primi tempi c'era un surriscaldamento terribile, ma si è stabilizzata, l'app è bella e soprattutto era comoda. Capisco la strategia di Claude Code di unificare tutto in un'unica app Mac, ma rispetto all'app Codex... mi trattengo.

Un professionista formato è migliore sotto ogni aspetto, legalmente e praticamente. Non penso che l'AI possa sostituire qualcuno che legge segnali non verbali in sessioni vocali e conduce valutazioni standardizzate. Ma a tarda notte, quando dubbi sulla carriera o preoccupazioni personali emergono mentre lavoro da solo, gli chiedo cose. Considerazioni legali impediscono la pubblicazione. Lo uso rigorosamente per studio personale. Il campo si è rivelato più profondo e interessante di quanto mi aspettassi.

## Per chiudere

Ci si potrebbe chiedere perché questa non sia una storia incentrata su OpenClaw. Si potrebbe costruire lo stesso sistema su OpenClaw. Onestamente, non penso che OpenClaw in sé sia così importante. Cloni il repo di conoscenza, gli dici "lavora solo da questo repo," e lo fa. Finché si fa il backup dei file di memoria, OpenClaw è un'interfaccia remota basata su Discord molto accessibile, ma non è il nucleo.

Il nucleo è il sistema di conoscenza sottostante e gli agent skill che ci fanno ricerca e decisioni sopra. Le interfacce possono cambiare, ma conoscenza ben organizzata e guide funzionano su qualsiasi strumento. Anche adesso, gli skill impostano la direzione su argomenti sconosciuti e mantengono la qualità su compiti ripetitivi. Man mano che i modelli migliorano, gli skill potrebbero aver bisogno di meno dettaglio, ma il ruolo di definire direzione e confini probabilmente non scomparirà.

Non penso che questo sistema sia finito. Accumulare informazioni personali in un repo privato è di per sé un rischio, e non sono ancora sicuro che Obsidian sia un livello necessario. Ma nel tempo che ci è voluto per accumulare 3.200 file, non ho mai pensato "dovrei buttare tutto e tornare a Notion." Ognuno usa questi strumenti a modo suo, e questo è solo uno dei modi.

## Riferimenti

- [Harness Engineering: Leveraging Codex in an Agent-First World](https://openai.com/index/harness-engineering/) (OpenAI, 2026)
- [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378) (Thariq Shihipar, Anthropic)
- [ccusage](https://github.com/ryoppippi/ccusage) — strumento per il tracciamento dell'utilizzo di token di Claude Code / Codex CLI
- Wampold, B. E. (2001). *The Great Psychotherapy Debate: Models, Methods, and Findings.* Lawrence Erlbaum Associates.
- Fluckiger, C., Del Re, A. C., Wampold, B. E., & Horvath, A. O. (2018). The alliance in adult psychotherapy: A meta-analytic synthesis. *Psychotherapy*, 55(4), 316-340.
