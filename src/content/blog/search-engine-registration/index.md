---
title: "Search Engine Registration"
description: "."
date: "2022-04-06T00:00:00.000Z"
tags: ["blog"]
draft: false
---

# Google
## Google Search Console
본인의 블로그를 검색 색인에 등록할 수 있다. 시간이 지나면 Google이 자동으로 내 웹사이트를 찾지만, Google Search Console을 사용하면 능동적으로 색인 생성 요청을 하고 개선할 수 있다.  
Google 검색에 사이트가 표시되는 빈도, 사이트를 표시하는 검색어, 검색 사용자가 검색어를 클릭하여 연결하는 빈도 등의 검색 트래픽 정보 확인이 가능하다.

https://search.google.com/search-console

1. HTTP page로 인증
2. URL Inspection(색인 생성 범위)에서 indexing request
3. Sitemaps(사이트맵 제출)에서 sitemap.xml 제출

## Google Analytics
사람들이 나의 웹 사이트를 어떻게 사용하는지 파악할 수 있게 해주는 도구다. Search Console이 Google 검색을 통한 유입 방문자 정보를 확인한다면, Google Analytics는 모든 유입 경로에 대한 방문자 정보 확인이 가능하다.  

1. Google Analytics 계정 생성
2. property 생성
3. _config.yml에서 아래의 정보 기입

```yaml
# Analytics
analytics:
  provider               : "google-gtag" # false (default), "google", "google-universal", "custom"
  google:
    tracking_id          : "your tracking id"
    anonymize_ip         : # true, false (default)
```

# Naver
1. https://searchadvisor.naver.com/에 github.io 주소 등록
2. 웹 페이지 수집 요청
2. sitemap.xml 제출