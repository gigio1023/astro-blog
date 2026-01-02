---
title: "Unicode, Tokenization"
description: "."
date: "2021-10-12T02:26:14.074Z"
tags: ["MRC", "python"]
draft: false
---

# Unicode
> e.g., U+AC00

- 'U+': unicode를 뜻하는 접두어
- 'AC00': 16진수 code point

## python
- ord: character to unicode code point
- chr: unicode code point to character

- 완성형 한글 11,172자
  - len을 적용하면 2 반환
- 조합형 한글
  - len을 적용하면 1 반환
  
# Tokenization
사람이 직접 정의한 rule로 tokenizing에 한계가 있음에 동의하는 추세이고, 최근에는 데이터 기반으로 접근하는 추세라고 한다.
- Subword
  - 자주 쓰이는 글자 조합을 하나의 단위로 취급
  - 자주 쓰이자 않는 조합은 subword로 분할
- BPE(Byte-Pair Encoding)
  - 가장 자주 나오는 글자 단위 Bigram(or Byte Pair)를 다른 글자로 치환