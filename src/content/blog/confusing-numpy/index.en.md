---
title: "Confusing NumPy"
description: "Common NumPy pitfalls: dtype=object issues with mixed-type lists and axis behavior in np.mean."
date: "2021-09-01T20:33:06.787Z"
tags: ["pytorch", "python"]
draft: false
lang: en
translationOf: "confusing-numpy"
---

# dtype=object, when complex list

When converting a list to NumPy that mixes str and numerical data, the dtype gets locked to object. In this case, even index slicing does not change the dtype, and calling astype throws an error.

```python
a = {somthing compelx Nd list}
b = np.array(a)
only_numerical = b[ {some slicing selecting only numerical data} ]

only_numerical.astype(np.float16) -> error!!

```

Using np.stack solved it instantly..

```python
np.stack(only_numercial)
```

# np.mean
I needed np.mean while implementing soft voting.

```python
>>> pred.shape
(10, 12800, 3)
```

10 is the number of augmentations, 12800 is the number of data points, 3 is the number of classes. What I wanted was the average of the class predictions across augmentation results. Since I wanted the average along the last axis, I initially did this:

```python
np.mean(pred, axis=-1)
```

But thinking about it, axis=0 was the intended one. The key points:
- The axis given to np.mean disappears. For example, axis=2 makes the 2nd axis disappear.
- Thinking in terms of rows and columns does not work in N-d, so just think of it as computing over the data at the axis-th position.
  - For example, for [[1,1,1],[2,2,2]], computing the mean with axis=1 means averaging 1, 1, 1.

Considering these points, it should be axis=0, not axis=-1. Because we need to average across augmentations.

```python
>>> pred.shape
(10, 12800, 3)
>>> np.mean(pred, axis=0).shape
(12800, 3)
```
