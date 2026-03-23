---
title: "Naver Boostcamp AI Tech 2 - Report settimana 1"
description: "Retrospettiva della settimana 1 del Naver Boostcamp AI Tech: fondamenti di matematica per l'AI, basi di Python e implementazione della discesa del gradiente."
date: "2021-08-06T05:37:46.336Z"
tags: ["naver-boostcamp"]
lang: it
translationOf: "naver-boost-camp-ai-tech-2nd-report-first-week"
draft: false
---

# Report settimana 1
## Revisione lezioni
### ai math (post 1~11)
https://velog.io/@naem1023/series/ai-math

### python (post 1~2)
https://velog.io/@naem1023/series/python

## Processo di lavoro / risultati
Il compito opzionale 1 era la sfida principale. Implementare la gradient descent tramite operazioni vettoriali era gestibile dato che era stato trattato a lezione.
Ma mi sono inaspettatamente bloccato nell'implementare la gradient descent per una funzione lineare come y = mx + c secondo l'esempio.

https://towardsdatascience.com/linear-regression-using-gradient-descent-97a6c8700931

Avevo gia studiato e organizzato la gradient descent su Notion, ma continuo a dimenticare, quindi ho fatto riferimento al link sopra. Probabilmente dovro farci riferimento anche in futuro.

Il punto chiave, come descritto nel link, e definire la loss function e usare le sue derivate rispetto a m e c come vettore gradiente.

![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/9b9e6416-22d6-4f53-aa73-f908b373f364-image.png)
![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/ee96d9af-354c-4004-b2c7-8fb64d8f879a-image.png)
Dopo aver differenziato la loss function rispetto a m e c separatamente, m e c vengono aggiornati tramite la formula familiare qui sotto.
![](/assets/images/부스트캠프 AI Tech 2기 1주차 학습정리/d1271fde-207e-4577-9dc4-e5503f64c58e-image.png)

L'ho risolto traducendo direttamente questo processo in codice con numpy.

## Riepilogo sessione tra pari
Il professor Im Sung-bin ha organizzato molto bene i contenuti discussi frequentemente durante le sessioni tra pari.
Dato che erano argomenti su cui ci siamo trovati in difficolta per ambiguita o mancanza di informazioni, li riassumo nella sezione sessione tra pari.

https://naem1023.notion.site/4b3c83b157ca43a8b6d1ef706084a1fb

Ho organizzato tutto tramite Notion.

## Retrospettiva di studio
https://naem1023.notion.site/ML-68740e6ac0db42e9a01b17c9ab093606
La prima settimana ha rivisitato contenuti che avevo gradualmente organizzato nel link sopra durante gli anni universitari. Eppure tutto sembrava nuovo.
L'ho interpretato come un segno che nemmeno le mie basi erano abbastanza solide.

Spero che i contenuti di studio che organizzo su velog si accumulino bene.
