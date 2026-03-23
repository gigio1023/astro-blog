---
title: "TIL Training Plan 2021.08.23"
description: "Training plan for a mask classification competition: per-feature models with ensemble learning, plus Jupyter vs. CLI workflow notes."
date: "2021-08-23T16:57:30.489Z"
tags: ["pytorch", "naver-boostcamp", "ai-competition"]
draft: false
lang: en
translationOf: "til-train-plan-20210823"
---

I wasn't organizing TILs systematically — I was posting by category and briefly summarizing them in weekly reviews.

That works fine when learning new concepts, but it feels very inefficient during daily hackathon-style coding. For the competition phase (P stage), I'll write TILs directly.

# Training plan
There are multiple features, but I can't guarantee correlations or causal relationships between them. And it makes sense — the data doesn't support that. So I laid out a plan for how to train going forward.

## Summary
My handwriting is terrible... In short: create a model per feature, then do ensemble learning. Each model receives the same images as input and performs classification for its respective feature.

# Jupyter vs py
After spending over a year at work coding exclusively with CLI Python (no Jupyter), I'm much more comfortable with that approach and it's easier to organize. With Jupyter, you cram all that code into one notebook and visibility is terrible.

That said, I used Jupyter for experimentation this time. I prototyped datasets, pandas usage, and various classes/functions in Jupyter first, then applied them to .py files.

Still inconvenient in some ways though:
- Need extra code to manage modules.
- Jupyter relies heavily on global variables, making direct .py translation difficult — more extra code needed.

In the end, I'm coding directly in .py.

# PyCharm SSH
I'm using the education version of PyCharm, which I know supports SSH and SFTP for server-side coding. When I tried it before, it had more inconveniences than VSCode's remote-ssh, so I didn't use it.

Turns out it works fully — learned this from today's peer session. No time now, so I'll try it over the weekend. PyCharm's IDE quality is much better, so switching would be a clear win. The catch is that the competition environment doesn't open all ports, so debugging through PyCharm reportedly doesn't work.
