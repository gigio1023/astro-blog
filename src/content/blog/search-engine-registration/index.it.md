---
title: "Registrazione sui motori di ricerca"
description: "Guida passo passo per registrare un blog su Google Search Console, Google Analytics e Naver Search Advisor."
lang: it
translationOf: "search-engine-registration"
date: "2022-04-06T00:00:00.000Z"
tags: ["dev-tools"]
draft: false
---

# Google
## Google Search Console
Si può registrare il proprio blog nell'indice di ricerca. Google col tempo troverà automaticamente il sito, ma Google Search Console permette di richiedere proattivamente l'indicizzazione e apportare miglioramenti. Si possono anche verificare i dati sul traffico di ricerca: con quale frequenza il sito appare nelle ricerche Google, quali query lo mostrano e quanto spesso gli utenti cliccano.

https://search.google.com/search-console

1. Verificare tramite pagina HTTP
2. Richiedere l'indicizzazione in URL Inspection
3. Inviare sitemap.xml in Sitemaps

## Google Analytics
Uno strumento per capire come le persone usano il sito web. Mentre Search Console copre i visitatori provenienti dalle ricerche Google, Google Analytics copre i visitatori da tutte le fonti di traffico.

1. Creare un account Google Analytics
2. Creare una property
3. Aggiungere quanto segue a _config.yml

```yaml
# Analytics
analytics:
  provider               : "google-gtag" # false (default), "google", "google-universal", "custom"
  google:
    tracking_id          : "your tracking id"
    anonymize_ip         : # true, false (default)
```

# Naver
1. Registrare l'indirizzo github.io su https://searchadvisor.naver.com/
2. Richiedere la scansione delle pagine web
3. Inviare sitemap.xml
