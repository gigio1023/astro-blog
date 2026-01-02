---
title: "Regex 연습"
description: "."
date: "2021-09-27T12:44:21.119Z"
tags: ["NLP", "regex"]
draft: false
---

```python
import re
password_checker = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$"  )
mat = re.search(password_checker, password)
```

쓰는 것만 써서 이렇게 새로운 형태를 만나면 굳어버린다. 이 참에 연습할겸 분석을 했다.
ref: [Blog](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=odise444&logNo=60145646608), [COGNEX](https://support.cognex.com/docs/vidi_341/web/KO/vidisuite/Content/ViDi_Topics/1_Overview/images_display_filters_regex_basics.htm), [Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)

- ^: 행(라인)의 시작
- $: 행의 가장 마지막을 의미
- |: and
- \t: tab
- \n: 줄 바꿈
- .: 모든 문자를 의미
- []: 대괄호 내의 모든 문자를 순서를 고려하지 않고 찾고자 한다.
  - e.g., [a-ZA-Z가-힣]
- [^]: 대괄호 내의 모든 문자를 제외하고 찾고자 한다.
  - e.g., [^a-Z]: 알파벳 소문자를 제외하고 검색
- *: 0번 이상의 문자
  - '*' 앞에 오는 문자를 반복한다.
  - e.g., 'bo*'는 'b'도 되고 'booooo'도 된다. 
- ?: 물음표 앞에 오는 문자가 0 혹은 1개 존재함을 의미
- x(?=y): lookahead라고 한다. 오직 y가 뒤따라오는 x에만 대응됨을 의미한다. 
  - [Blog](https://elvanov.com/2388)
- \d: 0-9와 동일. 숫자를 의미한다.


# 적용
```python
import re
password_checker = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$"  )
mat = re.search(password_checker, password)
```

위 정규표현식은 다음의 조건을 충족시키는 문자를 찾기 위한 것이다.
- 8자리 이상 30글자 미만
- 영어 대문자와 소문자 최소 1개씩 포함
- 하나 이상의 숫자 포함
- 하나 이상의 특수기호 (!@#$%^&*) 포함

## 조건 검사
(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])은 이러한 조건들을 하나씩 체크하는 것이다. 즉, 4개의 조건 중 1개라도 거짓일 경우 4개의 그룹은 모두 거짓으로 계산될 것이다. 

아래의 블로그 포스팅들을 보면 마치 AND 연산처럼 여러개의 조건을 이어붙인거라고 할 수 있다.

- [AND](https://1004lucifer.blogspot.com/2019/04/regex-and.html)
- [Negative lookahead](http://1004lucifer.blogspot.com/2019/06/regex.html)