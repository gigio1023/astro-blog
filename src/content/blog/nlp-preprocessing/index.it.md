---
title: "Preprocessing NLP"
description: "Tecniche di preprocessing testuale per l'NLP: rimozione di stopword, lemmatizzazione e gestione della punteggiatura con NLTK e spaCy."
date: "2021-09-06T23:56:25.864Z"
tags: ["nlp"]
lang: it
translationOf: "nlp-preprocessing"
draft: false
---

# Stopword
ref: https://bkshin.tistory.com/entry/NLP-3-%EB%B6%88%EC%9A%A9%EC%96%B4Stop-word-%EC%A0%9C%EA%B1%B0
Parole che non hanno grande significato analitico. Articoli come a, an, the e pronomi come I, my rientrano in questa categoria.

- spaCy fornisce `is_stop` (booleano) sui token dell'oggetto NLP.
- NLTK fornisce un dizionario di stopword.
```python
import nltk
nltk.download('stopwords')
print('Number of English stopwords:',len(nltk.corpus.stopwords.words('english')))
```

# Lemmatization
ref: https://wikidocs.net/21707

Le parole hanno radici e affissi.
- Radice (stem): la parte che porta il significato della parola
- Affisso (affix): la parte che aggiunge significato aggiuntivo

La lemmatization e il processo di estrazione della radice.


# Punctuation
ref: https://www.delftstack.com/ko/howto/python/how-to-strip-punctuation-from-a-string-in-python/#%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%97%90%EC%84%9C-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%97%90%EC%84%9C-%EA%B5%AC%EB%91%90%EC%A0%90%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-string-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%82%AC%EC%9A%A9

La rimozione della punteggiatura e la normalizzazione testuale piu comune.
- Rimuovere con regex
  - text = re.sub(r"[^a-zA-Z0-9]", " ", text)
  - Sostituisce tutto tranne lettere e numeri con spazi.
  - Di solito si sostituisce con spazi per preservare al massimo la struttura della frase.
- Il token `is_punct` di spaCy indica se un token e punteggiatura.
- Si possono usare anche le funzioni built-in di Python.
  - Usare la lista di punteggiatura `string.punctuation`.