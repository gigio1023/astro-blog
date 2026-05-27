---
title: "Riavviare la simulazione sociale in Minecraft"
description: "Questa volta parto dalle prove."
date: "2026-05-27T10:00:00+09:00"
tags: ["agent", "rabbit-hole"]
draft: false
lang: it
translationOf: "minecraft-social-simulation-rebuild"
---

- [Repository](https://github.com/gigio1023/minecraft-llm-agent-community)
- [Documentazione](https://naem1023.github.io/minecraft-llm-agent-community/)

- Ricordavo di aver iniziato verso il 2023, ma la storia git dice che il primo commit è del 22 maggio 2024.
- Il vecchio progetto usava Voyager come riferimento principale. Quello attuale lo studia ancora, ma cerca di non diventare una copia di Voyager.
- Sono tornato nel 2026 anche perché i run dei modelli costano meno, ma soprattutto perché ora voglio una struttura in cui un modello con più contesto e più autorità venga controllato dalle tracce di esecuzione.
- L'obiettivo attuale non è un diario di costruzione. È un actor che sceglie azioni da memoria, obiettivi, osservazione e corpo, poi porta il risultato verificato nel ciclo successivo.

---

Sto riguardando `minecraft-llm-agent-community`, un repository che avevo lasciato fermo troppo a lungo. Nella mia memoria era nato verso la fine del 2023 o l'inizio del 2024. Il repository è più preciso: il primo commit è del 22 maggio 2024.

Nel vecchio README c'era una frase secondo cui il progetto sarebbe ripartito dopo il 18 giugno 2024. Non è successo davvero. L'intenzione c'era, e il sogno era abbastanza grande. Volevo osservare agent in Minecraft che formano gruppi, costruiscono villaggi e affrontano cooperazione, convivenza e sopravvivenza. Questa direzione mi sembra ancora quella giusta.

È cambiato il modo di arrivarci.

## Prima forma

La versione del 2024 partiva quasi direttamente da Voyager. Nella checklist del README c'erano voci come configurare l'ambiente con il baseline Voyager, creare un single agent con lo stesso baseline, e scrivere un'analisi con un'immagine architetturale. Nei documenti c'era anche una riscrittura in pseudo codice del ciclo `learn()` di Voyager, con la nota che un ciclo usava cinque chiamate sequenziali al modello.

All'epoca aveva senso. Se si voleva costruire un agent con modello linguistico di grandi dimensioni in Minecraft, Voyager era il riferimento più ovvio. Anch'io pensavo in termini di skill library, curriculum, critic e generazione di azioni. Per arrivare a una società multi actor, pensavo di dover prima sistemare un single actor stile Voyager, poi mettere più bot intorno.

Molto lavoro, però, stava un livello sotto. Comunicazione tra Mineflayer e Minecraft server, installazione del Fabric server, import dei plugin, comportamento del physics tick, bot che parlavano troppo, bot espulsi dal server. La storia git conserva ancora fix per `mineflayer-hawkeyes`, per i bot troppo loquaci, e per rendere i bot operator così che il server non li cacciasse.

Erano problemi risolvibili. Io però non li ho risolti con sufficiente disciplina. Ho passato troppo tempo a rattoppare l'ambiente e troppo poco a isolare il core loop. Una parte era incertezza tecnica. Una parte era semplicemente poca costanza. Il progetto si è fermato lì.

C'è stato un altro tentativo a gennaio 2025. Ho sistemato l'esecuzione locale, aggiunto risposte mock, e modificato il bridge server Mineflayer in modo che accettasse più bot. Anche allora, però, la forma restava una struttura Python derivata da Voyager che parlava con un bridge server JavaScript. Non riesco a separare del tutto i miei limiti dall'architettura, ma era una base troppo fragile per una simulazione sociale.

## Motivo del riavvio

Nel 2026 il costo dei modelli pesa meno. Nel 2024 gli esperimenti ripetuti sembravano costosi. Oggi Gemini ha un free tier esplicito, e l'application programming interface di OpenAI non è un free tier nello stesso senso, ma ha richieste di prova gratuite, limiti per account, modelli più economici e percorsi basati su crediti. Piccole esecuzioni reali per riparare lo strato di esecuzione sono molto più facili da giustificare.

Il costo però non è il motivo principale. Nel frattempo la discussione su memory system, agent runtime e confini degli strumenti è avanzata. Anche le mie abitudini sono cambiate usando a lungo Codex e Claude Code. Un agent non nasce dando al modello un prompt più lungo o un nome di modello migliore. L'ambiente deve conservare ciò che è vero quando il modello sbaglia.

In Minecraft questa differenza si vede subito. Un bot che si muove un po' non ha completato un obiettivo. La frase "ho raccolto legna" non è una prova. Conta l'inventario che cambia, il blocco scavato, il pickup dell'item, la modifica del ledger del chest, la chat consegnata, una traccia concreta dell'esecuzione.

Il vecchio progetto era più vicino a "esegui Voyager e lascia che impari". Quello attuale è più vicino a "l'actor propone un'azione, lo strato di esecuzione controlla se può partire, e anche il motivo del fallimento diventa input per il ciclo successivo".

## Autorità e verifica

Più precisamente, non si tratta solo di creare un bot che costruisce una bella casa in Minecraft. La cosa che mi interessa è simile al modo in cui oggi usiamo i modelli linguistici di grandi dimensioni come strumenti di coding. Diamo al modello il contesto del repository, gli lasciamo modificare file, gli lasciamo toccare terminale e test, e gli permettiamo di prendere più decisioni rispetto a un semplice sistema di completamento.

Nel coding però non mi fido davvero della frase del modello. Mi fido del diff, del type check, dei test e dell'output reale. Se il modello dice di aver sistemato qualcosa e la build è rotta, non ha sistemato davvero. Se la spiegazione è imperfetta ma il diff è comprensibile e i test passano, quel risultato può diventare materiale per la decisione successiva.

Minecraft è un ambiente utile per guardare lo stesso problema. C'è uno stato del mondo, ci sono inventario, blocchi, item e chat. Più contesto e autorità riceve il modello, più diventa importante spezzare le sue decisioni in unità verificabili. Per questo continuo a definire società, action skill, azioni disponibili e memoria. Non è solo worldbuilding. Voglio che il modello giudichi di più da solo, ma voglio anche che quel giudizio venga controllato ripetutamente.

La memoria conta per lo stesso motivo. L'obiettivo non è tenere un diario che dica che qualcosa è già successo. Il sistema deve decidere quali osservazioni possono entrare nella decisione successiva, da quale risultato di esecuzione dipende una memoria, e come un giudizio fallito deve ridurre le ripetizioni future. Solo così un actor che vive a lungo può essere più di un prompt lungo.

## Distanza da Voyager

Voyager resta importante. Automatic curriculum, executable skill library, environment feedback e self-verification sono meccanismi utili. Il repository attuale li cita ancora. Allo stesso tempo ripete spesso di non far rinascere Voyager come architettura attiva. Può sembrare eccessivo, ma è voluto.

Una skill library globale in stile Voyager non si adatta bene alla simulazione sociale che vorrei. Una skill dovrebbe appartenere a un actor. Lo spazio di lavoro dell'actor dovrebbe registrare cosa quell'actor può fare ora, quale risultato concreto lo dimostra, e se una skill proposta è ancora candidata o è già utilizzabile. Una skill non dovrebbe essere solo una funzione JavaScript da qualche parte nel repository. Dovrebbe essere più simile a una parte del corpo attuale dell'actor.

Tratto gli altri riferimenti nello stesso modo. Da Generative Agents prendo il ciclo osservazione, memoria, riflessione e pianificazione, ma non l'idea che un testo di riflessione provi il progresso in Minecraft. Da SayCan e SWE-agent prendo la lezione che l'interfaccia d'azione cambia il comportamento dell'agent. Dalle note sul memory system Hermes prendo l'idea della memoria come contratto di ingresso e uscita: quando può essere scritta e a quale traccia di esecuzione rimanda, non come diario.

I riferimenti non sono specifiche di prodotto. Bisogna estrarre meccanismi e tradurli dentro questo progetto. Continuo a scriverlo nei documenti perché altrimenti un progetto del genere diventa rapidamente imitazione di paper.

## Ciclo attuale

L'implementazione attuale gira intorno a un social-cycle runtime. Il nome è più grande del sistema presente. Per ora è un piccolo loop che gestisce un ciclo d'azione.

Ci sono nomi interni come ActorSoul e LifeGoal. I nomi sono un po' pesanti, ma il ruolo è semplice. Conservano una descrizione persistente di chi è l'actor e di cosa continua a considerare importante.

A questo si aggiungono osservazioni recenti, memoria, informazioni relazionali e azioni disponibili. La chiamata al modello, che nel codice viene chiamata provider, propone un piccolo obiettivo e un candidato d'azione per il ciclo corrente. Lo strato di esecuzione controlla se l'azione ha gli argomenti necessari, se ripete lo stesso fallimento, e se è davvero consentita. Solo dopo Mineflayer agisce come client Minecraft. Dopo l'esecuzione, un verifier guarda cambiamenti come inventario, blocchi, chest e chat, poi registra il risultato. Quel risultato e il giudizio entrano nel ciclo successivo.

Il confine è semplice. Il modello propone. Lo strato di esecuzione controlla se la proposta è eseguibile. Mineflayer legge e cambia il mondo. Il successo appartiene alla traccia dell'esecuzione, non al testo del modello.

Per questo nel repository ora ci sono molti meccanismi secchi. Se il modello scrive solo "muoviti a est" come motivo, ma non fornisce una posizione o una direzione di esplorazione limitata, l'azione non parte. Se la stessa azione fallisce più volte per lo stesso motivo, il tentativo identico successivo viene bloccato prima di chiamare Minecraft. La memoria può influenzare il giudizio successivo, ma non può provare progresso fisico.

Non è una parte spettacolare. È lo strato che mi serviva nel 2024 e non avevo. Quando un run fallisce, posso distinguere una cattiva scelta del modello, un controllo prima dell'esecuzione che manca, un fallimento Mineflayer, e un checker o report troppo fiducioso.

## Un posto dove stare

Il lavoro attuale è vicino all'obiettivo "costruirsi un posto dove stare". Sembra un agent per costruire case. Esiste anche un'azione chiamata `buildBasicShelter`. Però questo obiettivo è più un caso di test per una struttura ampia che il prodotto finale.

Di recente ho controllato una per una alcune azioni piccole che sembrano necessarie per quell'obiettivo. Piazzare un crafting table, scavare cobblestone, costruire un shelter semplice e usare un chest condiviso sono esempi. Il codice attuale espone 14 azioni di questo tipo, e tutte e 14 hanno prodotto il risultato atteso in quei controlli. Per risultato non intendo una frase di successo scritta dal modello. Intendo che inventario, stato dei blocchi o un'altra traccia lato Minecraft sono cambiati come previsto.

Trasformare questo nella vera identità del progetto sarebbe un errore. Casa, base, shelter e storage sono cose che un actor può considerare in una situazione concreta. Non sono l'architettura del runtime. Questo obiettivo è utile perché mette nello stesso run azioni poco spettacolari: raccogliere legna, creare planks e sticks, piazzare un crafting table, scavare cobblestone, usare storage condiviso, chiedere qualcosa a un altro actor, annunciare una risorsa. Per questo è un buon caso di test. Memoria, azioni disponibili, controlli prima dell'esecuzione, esecuzione reale, verifica del risultato e relazioni compaiono insieme.

Il runtime non dovrebbe diventare un planner dedicato alle case. Dovrebbe dare all'actor osservazione, memoria, relazioni, azioni disponibili, gate e prove, così che il modello possa scegliere una piccola azione successiva dalla situazione corrente. Se questo strato è abbastanza generale, potrà sostenere anche agricoltura, scambio, storage condiviso, conflitto e altre situazioni sociali.

Per questo il fatto che quelle 14 azioni passino non è un giro d'onore. Significa che ogni azione ha funzionato da sola in un piccolo ambiente di test dove le precondizioni erano già preparate. Bene, ma non è simulazione sociale.

Un'esecuzione più lunga racconta una cosa simile. Ho chiesto al sistema di continuare per 100 cicli d'azione, ed è arrivato al ciclo 54 prima di fermarsi su un problema di permessi durante il cleanup dei file. Non lo chiamerei una storia di successo. È stato comunque utile perché il report non ha dichiarato completamento ampio senza supporto concreto, e giudizio precedente più memoria erano visibili nel contesto successivo.

## Ancora piccolo

L'implementazione è ancora centrata quasi tutta su un actor. Più actor con obiettivi di lungo periodo e memoria separati non ci sono davvero. Le azioni sociali sono ancora pezzi piccoli: avvicinarsi, chiedere, annunciare, consegnare, aspettare. Conflitto, pericolo e cambiamenti relazionali più ricchi sono per lo più planned.

Va bene così. Preferisco tenere il core loop piccolo ma end to end, invece di costruire un altro grande bridge layer sopra un comportamento instabile. L'osservazione deve entrare nel loop, le azioni disponibili devono essere visibili, il modello deve proporre una piccola azione, lo strato di esecuzione deve bloccarla o eseguirla, i risultati Mineflayer devono essere registrati, e memoria più giudizio devono arrivare al ciclo successivo.

Quando questo loop sarà stabile, avrà senso aggiungere più actor. Senza questo, dieci actor produrrebbero probabilmente solo più log.

Il sogno originale è ancora lì. Sto cercando di mettergli sotto delle prove.

## Riferimenti

- [Voyager: An Open-Ended Embodied Agent with Large Language Models](https://arxiv.org/abs/2305.16291)
- [Gemini Developer pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [OpenAI pricing](https://platform.openai.com/docs/pricing/)
- [OpenAI rate limits](https://platform.openai.com/docs/guides/rate-limits)
