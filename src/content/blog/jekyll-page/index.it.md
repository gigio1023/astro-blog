---
title: "Pagine Jekyll"
description: "Guida alla creazione di pagine Jekyll non basate su data con permalink personalizzati, layout e una pagina 404 personalizzata per GitHub Pages."
tags: ["dev-tools"]
date: "2022-04-06T00:00:00.000Z"
lang: it
translationOf: "jekyll-page"
draft: false
---

# Pagina Jekyll
I post che non sono basati su data si chiamano Page.
Il YFM di una Page è così:
```md
---
title: "About me"
permalink: /about/
layout: single
---
```
- permalink: l'URL base della Page. Non essendo basata su data, serve un URL base.
- layout: si sceglie tra i layout predefiniti di Jekyll. Vari formati sono disponibili nella directory _layouts. Il layout predefinito per le pagine è "single".

# Pagina 404
Usando questo, si può creare una pagina 404 personalizzata per il proprio sito github.io. GitHub Pages fornisce una pagina 404 predefinita, quindi non è obbligatorio.

```md
---
title: "Page Not Found"
excerpt: "Page not found. :("
permalink: /404.html
---

Page not Found. :(
<script>
  var GOOG_FIXURL_LANG = 'en';
  var GOOG_FIXURL_SITE = 'https://naem1023.github.io'
</script>
<script src="https://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js">
</script>
```
