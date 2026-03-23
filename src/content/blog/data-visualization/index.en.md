---
title: "Data Visualization"
description: "Data visualization concepts: data types, marks, channels, and pre-attentive attributes."
date: "2021-08-09T13:06:49.641Z"
tags: ["ml", "data-viz"]
draft: false
lang: en
translationOf: "data-visualization"
---

# Data viz
## Data
Data used for visualization
- Dataset perspective (global)
- Individual data perspective (local)

### Structured data
CSV files.
![](/assets/images/데이터 시각화/1484c59d-c573-4c81-9589-73f236ab76e7-image.png)

item = 1 row
attribute (feature) = column

### Time series data
![](/assets/images/데이터 시각화/e48008d8-1e3e-4129-8973-8dbc01291416-image.png)
- Time-series form following the flow of time.
- Audio, video
- Examine trend, seasonality, and cycle over time.

### Geographic / map data
![](/assets/images/데이터 시각화/fe86e094-5886-4ab7-afb1-c7131245d584-image.png)

- Uses distance, paths, distributions, etc.

### Relational data
![](/assets/images/데이터 시각화/3929c3f1-8c33-4731-9c2d-fede261217d2-image.png)

- Visualizes relationships between objects
- Objects are Nodes
- Relationships are Links

### Hierarchical data
![](/assets/images/데이터 시각화/75e8e44a-586d-4da1-8c8d-f4776af7e2d7-image.png)

- Data with clear containment relationships
- Tree, Treemap, Sunburst, etc..

## Types of data
- Numerical
  - Continuous: length, weight, temperature..
  - Discrete: dice values, number of people...
- Categorical
  - Nominal: blood type, religion...
  - Ordinal: grade, star rating, rank...

Discrete and ordinal can overlap.
- Discrete: can be used proportionally as numerical values.
- Ordinal: things that are not discrete but have an ordering?

## Mark, channel
Mark
- Visualization data composed of points, lines, and areas

Channel
- Elements that can modify each mark
![](/assets/images/데이터 시각화/5486582e-4644-44a4-96fb-a0d097d0f8e7-image.png)

## Pre-attentive Attribute
Elements that people naturally perceive without paying special attention.
![](/assets/images/데이터 시각화/15c051bd-5598-496c-8194-443cc576886f-image.png)

For example, in the figure above, Orientation -- you can immediately tell that only the center element has a different tilt.

_**Using them simultaneously makes them hard to perceive!**_
Use them appropriately to induce visual pop-out.
