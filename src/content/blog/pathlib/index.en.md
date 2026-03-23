---
title: "pathlib"
description: "Introduction to Python's pathlib module for cleaner, object-oriented file path manipulation as an alternative to os.path."
date: "2021-09-07T01:10:10.740Z"
tags: ["python"]
lang: en
translationOf: "pathlib"
draft: false
---

# pathlib
ref: https://brownbears.tistory.com/415

Up to now I'd been using os.path.join or os.sep to manually handle path operations. No problems per se, but it's tedious, the code gets messy, and it's hard to maintain. Fortunately, Python provides pathlib as a built-in module.

The key idea is to manage paths as objects. It also lets you redefine operators for path operations, so '/' can be used immediately as a path separator instead of division.