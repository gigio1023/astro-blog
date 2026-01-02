---
title: "pandas"
description: "."
date: "2021-08-19T02:17:47.613Z"
tags: ["pandas", "python"]
draft: false
---

쓸 때마다 쓰기 싫고 사용법 익히자마자 잊어버리는 pandas다. 까먹지 않게 정리해둔다.

# Pandas
tabular 데이터를 다루기 위한 라이브러리. R의 체계를 많이 따왔다고 한다. numpy와 통합되면서 성능도 향상됐다고 한다.

## DataFrame
- Data table 전체를 포함하는 object. 모든 데이터의 wrapper라고 생각하면 된다.
- DataFrame의 Serires들은 Series마다 data type이 다를 수 있다.



## Series
```python
ojb = Series(data=data, index=index)
ojb.index # -> index list
ojb.values # -> only list of values
```
- DataFrame 중 하나의 column에 해당하는 object.
- numpy의 wrapper지만 indexing에서 다른 점이 있다.
  - numpy처럼 숫자로만 indexing이 되는 것이 아니라 문자로도 가능하다.
- data에 list를 넣으면 자동으로 숫자가 indexing.
- data에 dict를 넣으면 자동으로 dict 형태에 맞춰서 indexing.
- index parameter가 최우선으로 indexing 우선권을 가진다.



## read_csv()
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html
```python
pd.read_csv(data, sep='\s+\, header=None)
```
- data: file system, web url 모두 가능
- seperator: seperator 지정
  - s: single space
  - +: 여러개가 있다.
나도 이 정도만 썻던거 같다. 필요하면 docs에서 계속 찾아가면서 쓰자.

## head(n)
상위 n개의 데이터만 불러온다.

## columns
리스트 형태이고 column들의 이름을 지정할 수 있다. 

```python
df_data.columns = ['a', 'b']
```

## values
pandas를 numpy 형태로 반환한다.

## iloc, loc
loc는 column 명을 접근하는 방식을 지원한다.
iloc는 numpy처럼 접근 가능하게 해준다. 난 iloc가 편한다..