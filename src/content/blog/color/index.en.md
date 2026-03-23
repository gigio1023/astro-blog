---
title: "Color"
description: "Color usage in data visualization: sequential and diverging colormaps, HSI color space, and color palettes."
date: "2021-08-22T20:58:50.619Z"
tags: ["data-viz"]
draft: false
lang: en
translationOf: "color"
---

There was too much code used in the practice, so code-related content is only in the Jupyter notebook.

# Sequential
![](/assets/images/color/1664f5cb-f531-4880-8a67-6ff4ab15a674-image.png)
- Suitable for sequential data
- Represented with continuous colors

# Diverging
![](/assets/images/color/10cc8235-025a-4a1c-bbf1-5af971a84260-image.png)
- Diverges from the center
  - Suitable for opposing values (temperature), two different datasets (approval ratings)
- Usually darker colors toward the extremes
- The center color is neutral, not biased toward either side

## Example
![](/assets/images/color/d218b671-672d-42dd-bd58-24e6073660a8-image.png)
South Korea average temperature data

# HSI
Matplotlib's color API uses HSI, apparently. It's "that color space" I learned in computer vision class in college..

- Hue: the color itself. Complementary colors exist -- mixing complementary colors produces white. Hue differences are usually the easiest to notice.
- Saturation: the ratio of mixing between white and a pure color. Described as "light" or "vivid."
- Lightness: brightness. Dark or bright.

# Color palette
Modules provide default palettes, but there are various color palettes on GitHub. For professional use, Adobe Color is recommended.
https://color.adobe.com/create/color-wheel

## RColorBrewer palettes
https://www.datanovia.com/en/blog/top-r-color-palettes-to-know-for-great-data-visualization/

The instructor said these are well-differentiated and look good.
