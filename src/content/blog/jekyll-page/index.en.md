---
title: "Jekyll Pages"
description: "Guide to creating non-date-based Jekyll pages with custom permalinks, layouts, and a custom 404 page for GitHub Pages."
tags: ["dev-tools"]
date: "2022-04-06T00:00:00.000Z"
lang: en
translationOf: "jekyll-page"
draft: false
---

# Jekyll Page
Posts that aren't date-based are called Pages.
The YFM for a Page looks like this:
```md
---
title: "About me"
permalink: /about/
layout: single
---
```
- permalink: the Page's base URL. Since it's not date-based, a base URL is required.
- layout: choose from pre-defined Jekyll layouts. Various formats are available in the _layouts directory. The default layout for pages is "single".

# 404 Page
Using this, you can create a custom 404 page for your github.io site. GitHub Pages provides a default 404 page, so this isn't mandatory.

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
