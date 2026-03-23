---
title: "Unicode, Tokenizzazione"
description: "Basi della gestione Unicode in Python e metodi di tokenizzazione subword incluso BPE (Byte-Pair Encoding)."
date: "2021-10-12T02:26:14.074Z"
tags: ["nlp", "python"]
draft: false
lang: it
translationOf: "unicode-tokenization"
---

# Unicode
> Es., U+AC00

- 'U+': prefisso che indica Unicode
- 'AC00': code point esadecimale

## Python
- ord: da carattere a code point Unicode
- chr: da code point Unicode a carattere

- Hangul precomposti (sillabe complete): 11.172 caratteri
  - len restituisce 2
- Jamo combinati (coreano decomposto)
  - len restituisce 1

# Tokenizzazione
C'è un consenso crescente sul fatto che le regole di tokenizzazione definite manualmente hanno i loro limiti. La tendenza recente è l'approccio basato sui dati.
- Subword
  - Le combinazioni di caratteri frequenti vengono trattate come unità singole.
  - Le combinazioni infrequenti vengono divise in subword.
- BPE (Byte-Pair Encoding)
  - Sostituisce il bigram (o byte pair) a livello di carattere più frequente con un nuovo carattere.
