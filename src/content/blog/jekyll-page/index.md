---
title: "Jekyll Page"
description: "."
date: "2022-04-06T00:00:00.000Z"
draft: false
---

# Jekyll Page
날짜 기반 포스팅 외의 포스팅을 Page로 한다.  
Page의 YFM은 아래와 같다.
```md
---
title: "About me"
permalink: /about/
layout: single
---
```
- permalink: page의 base url. 날짜 기반 포스팅이 아니기 때문에 base url이 필요하다.
- layout: 사전에 jekyll에서 지정된 layout 중 어떤 것을 사용할지 고를 수 있다. _layouts 디렉터리에 여러 포맷들이 있다. page의 layout은 single이 기본 설정이다.

# 404 page
이를 활용해서 github.io만의 404 페이지를 만들 수 있다. Github Pages에서 기본적으로 404 페이지를 지원해주니 필수는 아니다.

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