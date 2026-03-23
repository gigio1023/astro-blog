---
title: "Bar Plot"
description: "Guide to bar plot visualization techniques in matplotlib, covering stacked, overlapped, and grouped bar charts with best practices."
date: "2021-08-16T12:14:26.551Z"
tags: ["data-viz", "python"]
lang: en
translationOf: "bar-plot"
draft: false
---

I'd seen this material before but transcribed it here as review.

# Principle of Proportion Ink
> The actual value and the ink used to represent it should be proportional.

- A principle that applies across all visualizations.
- The x-axis must always start at 0.
  - The vertical ratio of the plot should represent the data differences.

![](/assets/images/Bar plot/fe90cd8b-91de-49c6-bac0-766292955d7b-image.png)

The left chart doesn't start from 0. So the graph's proportions fail to reflect the actual data proportions. To avoid unnecessary misunderstanding, use a chart like the one on the right.

# Bar Plot

- Data represented with bars, as the name suggests.
- Well suited for comparing numerical values across categories.

## Classification by Bar Direction
In matplotlib:
- .bar() : categories on x-axis, data on y-axis
- .barh() : categories on y-axis, values on x-axis
  - Better when there are many categories

## Multiple Categories
- Bar plots represent values for a single feature per category
  - Only shows values for 1 feature
  - To display multiple groups, other methods are needed

Solutions:
- Multiple plots
- Represent simultaneously in a single plot
  - Stacked
  - Overlapped
  - Side by side

### Stacked Bar Plot
![](/assets/images/Bar plot/38e77e6d-742f-45ef-8e2f-305c05bb31dc-image.png)
- Stack 2 or more groups
- Distribution of the bottom-most stacked bar is easy to see.
  - Bars stacked above it are harder to interpret.
- matplotlib
  - .bar() uses the bottom parameter for stacking.
  - .barh() uses the left parameter for stacking.

### Percentage Stacked Bar Chart
![](/assets/images/Bar plot/f9755ff7-f0ca-40e6-8eb2-cc49add0ea39-image.png)

Since stacked bar plots make the overall distribution hard to see, this converts the stacked bar chart to percentages.

### Overlapped Bar Plot
![](/assets/images/Bar plot/2eb0f831-b391-487f-adb8-c3ff8e3b599d-image.png)
- Good for comparing just 2 groups.
  - Compare by adjusting transparency (alpha).
  - Keep in mind that color brightness and saturation also affect the transparency effect.
- Not great for 3 or more groups.
  - Area plots work better in that case.

### Grouped Bar Plot
**_The most effective method!_**
![](/assets/images/Bar plot/9bfd23d5-dba3-493b-9c5b-202dea6a5008-image.png)
- Place group bars side by side
- Implementation is tricky in matplotlib, so handled in seaborn.
  - Uses .set_xticks(), .set_xticklabels().

---

All the methods above work well with 5-7 groups. If there are more groups, different approaches are needed.

# Data Sorting
- Sorting is a must
  - e.g., in pandas: sort_values(), sort_index()
- Sort appropriately by time, size, category order, or category value.

# Proper Use of Space
- matplotlib's bar plot fills the ax and feels cramped
- Adjust with the following methods:
  - X/Y axis limit (.set_xlim(), .set_ylim())
  - Spines (.spines[spine].set_visible())
  - Gap (width)
  - Legend (.legend()), where to place it
  - Margins (.margins())
