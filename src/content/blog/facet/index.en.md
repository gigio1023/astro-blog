---
title: "Facet"
description: "Using matplotlib facets with GridSpec and subplots to visualize datasets from multiple perspectives."
date: "2021-08-22T21:04:31.712Z"
tags: ["data-viz"]
draft: false
lang: en
translationOf: "facet"
---

# Facet
Splitting. That is, visualizing a single dataset in different ways.
- Different insights through different encodings
- Viewing multiple features simultaneously with the same method
- Large-scale perspective, small-scale perspective, etc...

In matplotlib, facets can be expressed through multiple figures and axes.

## Grid spec
![](/assets/images/facet/0fc1a677-5eaa-4ed8-8913-9297326cda59-image.png)
Literally treating axes like a grid. There are two ways to use them as a grid:
- numpy-like slicing
- Using x, y, dx, dy

## Adding subplots inside an ax
![](/assets/images/facet/1a173eaa-693a-4a9c-9c8e-1d9f61eae65e-image.png)
Added in a minimap-like form.
