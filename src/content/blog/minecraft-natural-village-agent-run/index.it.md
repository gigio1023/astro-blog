---
title: "Cosa ha lasciato il mio agent Minecraft in un villaggio naturale"
description: "Un piccolo record di esecuzione."
date: "2026-06-30T22:00:00+09:00"
tags: ["agent", "rabbit-hole"]
draft: false
lang: it
translationOf: "minecraft-natural-village-agent-run"
---

- [Detailed report](https://gigio1023.github.io/minecraft-llm-agent-community/blog/natural-village-model-comparison)
- [Repository](https://github.com/gigio1023/minecraft-llm-agent-community)

- Sto provando a capire se un agent basato su large language model lascia veri cambiamenti di world state dentro Minecraft.
- Questo run e partito vicino a un villaggio naturale, con un fresh world per ogni model lane.
- L'obiettivo era piccolo material work: legno, materiali di base, crafting table, tool, e pietra se il run arrivava fin li.
- Il report dettagliato contiene metriche e screenshot per lane. Qui tengo il contesto e la timeline.

---

Da un po' sto rimettendo mano a un progetto con agent in Minecraft. L'idea di base è mettere un agent basato su large language model dentro Minecraft, fargli scegliere azioni, eseguire quelle azioni nel gioco, e poi registrare cosa è cambiato davvero.

L'agent non scrive soltanto un piano in chat. Il modello propone la prossima azione, il runtime controlla se quell'azione è disponibile, e un bot Mineflayer si muove dentro un server Minecraft. Dopo l'azione, il run viene letto attraverso inventory, cambiamenti nei block e runtime records.

Minecraft è utile perché il mondo conserva stato. Se l'agent raccoglie legno, i log devono comparire nell'inventory. Se crea o usa un crafting table, deve restare una traccia come item, block o runtime record. Una frase come "l'ho fatto" vale meno di uno stato del mondo che si può ispezionare dopo.

## Villaggio naturale

Per questo run non ho usato un'arena preparata a mano. L'agent è partito vicino a un villaggio generato naturalmente. Lo scenario era `natural-village-spawn-v1`, con seed `4167799982467607063`.

Ho eseguito diverse model lane con la stessa configurazione. Qui lane significa un percorso di run indipendente per un modello. Ogni lane ha usato lo stesso seed, ma il mondo è stato creato da zero ogni volta. Così i block e l'inventory di una lane non entravano nella successiva.

Ogni lane ha avuto 30 cycle. Un cycle è un passaggio di osservazione, decisione del modello, esecuzione dell'azione e registrazione del risultato. L'obiettivo pratico era più o meno questo:

```text
Da un fresh world vicino a un villaggio naturale, crea un piccolo work point per continuare il material work.
Raccogli legno, crea materiali di base, crea o usa un crafting table,
recupera dai blocker, e lascia uno stato verificabile dopo il run
con inventory, screenshot e runtime records.
```

Ho scelto questo obiettivo perché il material work iniziale in Minecraft tocca più parti dell'harness insieme. Il bot deve trovare legno, raccogliere item, creare materiali, continuare a lavorare intorno a un crafting table, e recuperare quando movimento o accesso ai block si bloccano.

## Timeline

Il report dettagliato linkato sopra contiene metriche, screenshot e card per lane. Per questo post basta la timeline.

![Timeline del practical goal state per un run Minecraft agent in un villaggio naturale. Mostra gli stati materiali durevoli lasciati da Qwen Plus, Qwen Max, GPT-5.4 mini e Gemini 3.1 Flash Lite in 30 cycle.](./practical-goal-state-timeline.png)

Il grafico non conta ogni tentativo di azione. Ripetere un'azione non migliora il work point se nel mondo non resta uno stato più utile. Per questo segna stati materiali durevoli. Wood acquired indica che la lane ha ottenuto legno. Basic materials indica planks o sticks. Crafting table indica che la lane è arrivata al passaggio del tavolo. Tool retained indica che un tool era ancora presente alla fine. Stone follow-through indica che il run è passato dai tool di legno al cobblestone.

La lettura più corta è questa: Qwen Max ha raggiunto lo stato materiale più profondo. Ha mantenuto la catena crafting table e wooden pickaxe, poi ha chiuso con 6 cobblestone registrati. Qwen Plus è arrivato a un work point di livello wood con un wooden pickaxe mantenuto. GPT-5.4 mini ha raccolto materiali utili e teneva un crafting table, poi non ha stabilizzato il work point. Gemini 3.1 Flash Lite è arrivato al table step, poi ha passato buona parte del run intorno al recupero.

La configurazione è troppo stretta per una classifica dei modelli. Ho usato Qwen Plus e Qwen Max tramite ModelScope. Le lane OpenAI e Gemini sono rimaste nel free-tier o low-quota access che avevo disponibile. Non ho incluso run con frontier paid model come GPT-5.5 o Claude Opus 4.8.

## Prove

Gli screenshot aiutano una persona a leggere il run. Mostrano dove si trovava il bot, cosa vedeva la camera, e se i log erano collegati a una scena Minecraft reale.

Comunque non ho usato i pixel da soli per decidere block identity o material progress. Le affermazioni sui materiali in questo post vengono da inventory, observe e world-state scan, runtime status e action records.

Questa distinzione contava soprattutto per Qwen Max. La camera third-person finale aveva un artifact che mostrava una sezione del terreno. Ho trattato il progresso sulla pietra come claim da inventory e world-state, non come claim da quella immagine.

## Prossima domanda

Questo run ha un ambito piccolo. Non mostra social emergence. Non mostra neanche che l'agent abbia imparato un action-consequence target oltre il prior di un large language model. Il claim attuale è più piccolo: l'harness è ormai abbastanza vicino da eseguire piccoli esperimenti di material work in un villaggio naturale.

Per il prossimo run restringerei l'obiettivo. Qualcosa come: piazzare un crafting table e mantenere un work point vicino al villaggio con material follow-through limitato. Mischiare shelter, storage, navigation recovery e continuità lunga in un solo task ha reso più difficile leggere i fallimenti.

Il run è stato comunque utile. Partendo da un villaggio naturale, ora posso progettare il prossimo esperimento guardando prima inventory e world state, poi la narrazione del modello.
