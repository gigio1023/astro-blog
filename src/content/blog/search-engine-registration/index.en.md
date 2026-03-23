---
title: "Search Engine Registration"
description: "Step-by-step guide to registering a blog with Google Search Console, Google Analytics, and Naver Search Advisor."
lang: en
translationOf: "search-engine-registration"
date: "2022-04-06T00:00:00.000Z"
tags: ["dev-tools"]
draft: false
---

# Google
## Google Search Console
You can register your blog in the search index. Google will eventually find your website automatically over time, but Google Search Console lets you proactively request indexing and make improvements. You can also check search traffic data: how often your site appears in Google searches, which queries surface it, and how often users click through.

https://search.google.com/search-console

1. Verify via HTTP page
2. Request indexing in URL Inspection
3. Submit sitemap.xml in Sitemaps

## Google Analytics
A tool for understanding how people use your website. While Search Console covers visitors coming from Google searches, Google Analytics covers visitors from all traffic sources.

1. Create a Google Analytics account
2. Create a property
3. Add the following to _config.yml

```yaml
# Analytics
analytics:
  provider               : "google-gtag" # false (default), "google", "google-universal", "custom"
  google:
    tracking_id          : "your tracking id"
    anonymize_ip         : # true, false (default)
```

# Naver
1. Register your github.io address at https://searchadvisor.naver.com/
2. Request web page crawling
3. Submit sitemap.xml
