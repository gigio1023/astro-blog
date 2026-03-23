---
title: "NLP Preprocessing"
description: "NLP text preprocessing techniques: stopword removal, lemmatization, and punctuation handling with NLTK and spaCy."
date: "2021-09-06T23:56:25.864Z"
tags: ["nlp"]
lang: en
translationOf: "nlp-preprocessing"
draft: false
---

# Stopwords
ref: https://bkshin.tistory.com/entry/NLP-3-%EB%B6%88%EC%9A%A9%EC%96%B4Stop-word-%EC%A0%9C%EA%B1%B0
Words that carry little analytical significance. Articles like a, an, the, and pronouns like I, my fall into this category.

- spaCy provides `is_stop` (boolean) on NLP object tokens.
- NLTK provides a stopword dictionary.
```python
import nltk
nltk.download('stopwords')
print('Number of English stopwords:',len(nltk.corpus.stopwords.words('english')))
```

# Lemmatization
ref: https://wikidocs.net/21707

Words have stems and affixes.
- Stem: the part that carries the word's meaning
- Affix: the part that adds additional meaning

Lemmatization is the process of extracting the stem.


# Punctuation
ref: https://www.delftstack.com/ko/howto/python/how-to-strip-punctuation-from-a-string-in-python/#%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%97%90%EC%84%9C-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%97%90%EC%84%9C-%EA%B5%AC%EB%91%90%EC%A0%90%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-string-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%82%AC%EC%9A%A9

Punctuation removal is the most common text normalization.
- Remove with regex
  - text = re.sub(r"[^a-zA-Z0-9]", " ", text)
  - Replace everything except alphabets and numbers with spaces.
  - Usually replace with spaces to preserve sentence structure as much as possible.
- spaCy's token `is_punct` tells you if a token is punctuation.
- You can also use Python built-in functions.
  - Use the punctuation list `string.punctuation`.