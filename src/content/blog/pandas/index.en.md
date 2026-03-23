---
title: "pandas"
description: "Quick reference for pandas essentials: DataFrame, Series, read_csv, indexing with loc and iloc."
date: "2021-08-19T02:17:47.613Z"
tags: ["python"]
lang: en
translationOf: "pandas"
draft: false
---

Every time I use pandas I hate it, and I forget the usage right after learning it. Writing this down so I don't forget.

# Pandas
A library for handling tabular data. Said to borrow a lot from R's system. Performance improved after integrating with numpy.

## DataFrame
- An object that contains the entire data table. Think of it as a wrapper for all data.
- Series within a DataFrame can have different data types.



## Series
```python
ojb = Series(data=data, index=index)
ojb.index # -> index list
ojb.values # -> only list of values
```
- An object corresponding to a single column of a DataFrame.
- A wrapper around numpy, but differs in indexing.
  - Unlike numpy, which only indexes by numbers, you can also index by strings.
- Passing a list to data auto-indexes with numbers.
- Passing a dict to data auto-indexes according to the dict structure.
- The index parameter takes top priority for indexing.



## read_csv()
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html
```python
pd.read_csv(data, sep='\s+\', header=None)
```
- data: file system or web URL both work
- separator: specify the separator
  - s: single space
  - +: multiple
I think I only used about this much. Look up the docs as needed.

## head(n)
Loads only the top n data entries.

## columns
A list format; you can set column names.

```python
df_data.columns = ['a', 'b']
```

## values
Returns pandas data in numpy format.

## iloc, loc
loc supports accessing by column name.
iloc lets you access data like numpy. I prefer iloc.