---
title: "Pratica con le Regex"
description: "Pratica sulle regex analizzando un pattern di validazione password con lookahead e classi di caratteri."
lang: it
translationOf: "regex-practice"
date: "2021-09-27T12:44:21.119Z"
tags: ["nlp", "python"]
draft: false
---

```python
import re
password_checker = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$"  )
mat = re.search(password_checker, password)
```

Tendo a usare solo i pattern che già conosco, quindi incontrarne uno nuovo così mi blocca. Ho colto l'occasione per fare pratica e analizzarlo.
ref: [Blog](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=odise444&logNo=60145646608), [COGNEX](https://support.cognex.com/docs/vidi_341/web/KO/vidisuite/Content/ViDi_Topics/1_Overview/images_display_filters_regex_basics.htm), [Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)

- ^: inizio della riga
- $: fine della riga
- |: and
- \t: tab
- \n: a capo
- .: qualsiasi carattere
- []: corrisponde a qualsiasi carattere all'interno delle parentesi, indipendentemente dall'ordine
  - es. [a-ZA-Z]
- [^]: corrisponde a tutto tranne i caratteri all'interno delle parentesi
  - es. [^a-Z]: cerca escludendo l'alfabeto minuscolo
- *: zero o più occorrenze del carattere precedente
  - Ripete il carattere prima di '*'.
  - es. 'bo*' corrisponde a 'b' e anche a 'booooo'.
- ?: zero o una occorrenza del carattere precedente
- x(?=y): chiamato lookahead. Corrisponde a x solo se seguito da y.
  - [Blog](https://elvanov.com/2388)
- \d: uguale a 0-9. Corrisponde alle cifre.

# Applicazione
```python
import re
password_checker = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$"  )
mat = re.search(password_checker, password)
```

La regex qui sopra cerca stringhe che soddisfano le seguenti condizioni:
- Lunghezza da 8 a 30 caratteri
- Almeno una lettera maiuscola e una minuscola
- Almeno una cifra
- Almeno un carattere speciale (!@#$%^&*)

## Controllo delle condizioni
(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]) controlla ogni condizione una per una. Se una delle 4 condizioni è falsa, tutti e 4 i gruppi risultano falsi.

Guardando i post di blog qui sotto, è essenzialmente un concatenamento di più condizioni come un'operazione AND.

- [AND](https://1004lucifer.blogspot.com/2019/04/regex-and.html)
- [Negative lookahead](http://1004lucifer.blogspot.com/2019/06/regex.html)
