---
title: "AI Competition"
description: "Guide to approaching AI competitions with EDA strategies for image classification tasks."
date: "2021-08-23T04:42:14.134Z"
tags: ["ai-competition"]
lang: en
translationOf: "ai-competition"
draft: false
---

# Approach
- Don't jump into the data as soon as the competition starts — check the overview first.

# EDA (Exploratory Data Analysis)
![](/assets/images/ai competition/26691a6c-56b0-43d9-9f13-bebacd91e628-image.png)
Exploratory data analysis.
- Analysis of X (input)
- Analysis of y (target)
- Analysis to confirm the X-y relationship

## EDA in Image Classification
- Analysis of X (input)
  - X is the image. What features of X might be relevant?
- Image size
- Location of the target object
- Per-channel RGB statistics
	- Is R, G, or B noticeably dominant in the image?
- Analysis of y (target)
	- y is the value we want to predict. What characteristics does y have?
- Check the independent distribution of y values
	- Check the number of classes.
	- e.g., What is the distribution of y_1?
- Check the relationship distribution among y values
	- Is there a significant difference in count between classes?
	- e.g., What does the combined distribution of y_1 and y_2 look like?
- Analysis of the X-y relationship
	- What differences exist between X features and y characteristics?
- Relationship between image size and y characteristics
	- Sometimes training improves when images are resized.
    - Look for cases where changing image size helps training.
- Relationship between RGB statistics and y characteristics
	- RGB channel shift: shuffling the R, G, B order to prevent channel-dependent learning.
- Relationship between object location and y characteristics
- Check for data noise
	- e.g., Are there any incorrectly assigned y labels?
