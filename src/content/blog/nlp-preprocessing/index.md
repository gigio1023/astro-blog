---
title: "NLP 전처리"
description: "."
date: "2021-09-06T23:56:25.864Z"
tags: ["NLP"]
draft: false
---

# 불용어(stopword)
ref: https://bkshin.tistory.com/entry/NLP-3-%EB%B6%88%EC%9A%A9%EC%96%B4Stop-word-%EC%A0%9C%EA%B1%B0
분석에 큰 의미가 없는 단어들. a, an, the와 같은 관사나 I, my 같은 대명사들이 해당된다.

- spacy는 nlp객체의 token에서 is_stop(boolean)을 제공해준다.
- nlkt는 불용어 사전을 제공해준다.
```python
import nltk
nltk.download('stopwords')
print('영어 불용어 갯수:',len(nltk.corpus.stopwords.words('english')))
```

# Lemmatization
ref: https://wikidocs.net/21707

단어는 어간과 접사가 있다.
- 어간(stem): 단어의 의미를 담고 있는 부분
- 접사(affix): 단어에 추가적인 의미를 주는 부분

어간을 추출하는 작업이 lemmatization이다.


# Punctuation
ref: https://www.delftstack.com/ko/howto/python/how-to-strip-punctuation-from-a-string-in-python/#%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%97%90%EC%84%9C-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%97%90%EC%84%9C-%EA%B5%AC%EB%91%90%EC%A0%90%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-string-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%82%AC%EC%9A%A9

Punctuation(구두점) 제거는 가장 흔하게 쓰이는 text normalization.
- Regex로 제거하기
  - text = re.sub(r"[^a-zA-Z0-9]", " ", text)
  - 알파벳, 숫자 외는 모두 공백으로 변경.
  - 보통 공백으로 치환해서 문장의 구조를 최대한 유지해준다.
- spacy의 token에서 is_punct를 호출하면 puncutaion인지 알 수 있다.
- python built in function을 써도 된다.
  - punctuation list인 string.punctuation를 사용.