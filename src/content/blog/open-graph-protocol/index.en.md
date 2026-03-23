---
title: "Open Graph Protocol"
description: "Overview of Open Graph Protocol for standardized metadata in HTML, with tips on Facebook's Sharing Debugger and cache management."
date: "2022-04-06T00:00:00.000Z"
tags: ["dev-tools"]
lang: en
translationOf: "open-graph-protocol"
draft: false
---

A metadata protocol developed by Facebook. You could pass metadata through HTML meta tags, but that requires manually editing tags. Using the standardized metadata notation defined by the Open Graph Protocol, Jekyll automatically inserts metadata into your blog.
ref: [Open Graph Protocol blog](https://blog.ab180.co/posts/open-graph-as-a-website-preview)

To check whether Open Graph Protocol is being used and to view its information, use Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/). The cache has a TTL, and if you want to clear the cache while TTL remains, service providers (like KakaoStory) offer cache reload functionality through the Sharing Debugger.