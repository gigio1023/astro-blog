---
title: "Regex Practice"
description: "Hands-on regex practice dissecting a password validation pattern with lookaheads and character classes."
lang: en
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

I tend to only use the patterns I already know, so encountering something new like this freezes me up. I took this as a chance to practice and analyze it.
ref: [Blog](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=odise444&logNo=60145646608), [COGNEX](https://support.cognex.com/docs/vidi_341/web/KO/vidisuite/Content/ViDi_Topics/1_Overview/images_display_filters_regex_basics.htm), [Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)

- ^: start of a line
- $: end of a line
- |: and
- \t: tab
- \n: newline
- .: any character
- []: match any character inside the brackets, regardless of order
  - e.g., [a-ZA-Z]
- [^]: match anything except the characters inside the brackets
  - e.g., [^a-Z]: search excluding lowercase alphabet
- *: zero or more of the preceding character
  - Repeats the character before '*'.
  - e.g., 'bo*' matches 'b' and also 'booooo'.
- ?: zero or one of the preceding character
- x(?=y): called a lookahead. Matches x only if followed by y.
  - [Blog](https://elvanov.com/2388)
- \d: same as 0-9. Matches digits.

# Application
```python
import re
password_checker = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$"  )
mat = re.search(password_checker, password)
```

The regex above finds strings that satisfy the following conditions:
- 8 to 30 characters long
- At least one uppercase and one lowercase English letter
- At least one digit
- At least one special character (!@#$%^&*)

## Condition checks
(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]) checks each condition one by one. If any of the 4 conditions is false, all 4 groups evaluate to false.

Looking at the blog posts below, it's essentially chaining multiple conditions like an AND operation.

- [AND](https://1004lucifer.blogspot.com/2019/04/regex-and.html)
- [Negative lookahead](http://1004lucifer.blogspot.com/2019/06/regex.html)
