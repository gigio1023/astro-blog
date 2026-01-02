---
title: "Open Graph Protocol"
description: "."
date: "2022-04-06T00:00:00.000Z"
tags: ["blog"]
draft: false
---

Facebook에서 개발한 meta data protocol. HTML의 meta tag를 통해서 meta data를 전달해도 되지만, 직접 tag 수정을 해야하는 번거로움이 있다. Open Graph Protocol에 정의된 표준화된 meta data 표기법을 사용하면 Jekyll에서 알아서 meta data를 블로그에 넣어준다.   
ref: [Open Graph Protocol blog](https://blog.ab180.co/posts/open-graph-as-a-website-preview)

Open Graph Protocol에 대한 사용여부와 정보를 확인하려면 Facebook에서 제공하는 [Sharing Debugger](https://developers.facebook.com/tools/debug/)를 사용하면 된다. Cachce에도 TTL이 있는데, TTL이 남아서 cache를 지우고 싶다면 페이스북은 sharing deubugger은 서비스 업체(카카오스토리 등)에서 cache reload 기능을 제공해준다.