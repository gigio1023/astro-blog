---
title: "pandas"
description: "Riferimento rapido per gli essenziali di pandas: DataFrame, Series, read_csv, indicizzazione con loc e iloc."
date: "2021-08-19T02:17:47.613Z"
tags: ["python"]
lang: it
translationOf: "pandas"
draft: false
---

Ogni volta che uso pandas mi viene il nervoso, e dimentico l'utilizzo appena l'ho imparato. Scrivo tutto per non dimenticare.

# Pandas
Una libreria per gestire dati tabulari. Si dice che prenda molto dal sistema di R. Le prestazioni sono migliorate dopo l'integrazione con numpy.

## DataFrame
- Un oggetto che contiene l'intera tabella dati. Pensatelo come un wrapper per tutti i dati.
- Le Series all'interno di un DataFrame possono avere tipi di dato diversi.



## Series
```python
ojb = Series(data=data, index=index)
ojb.index # -> index list
ojb.values # -> only list of values
```
- Un oggetto corrispondente a una singola colonna di un DataFrame.
- Un wrapper attorno a numpy, ma diverso nell'indicizzazione.
  - A differenza di numpy, che indicizza solo per numeri, si puo indicizzare anche per stringhe.
- Passando una lista a data, l'indicizzazione avviene automaticamente con numeri.
- Passando un dict a data, l'indicizzazione segue automaticamente la struttura del dict.
- Il parametro index ha la priorita massima per l'indicizzazione.



## read_csv()
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html
```python
pd.read_csv(data, sep='\s+\', header=None)
```
- data: funziona sia con file system che URL web
- separator: specifica il separatore
  - s: singolo spazio
  - +: multipli
Credo di aver usato piu o meno solo questo. Cercare nella documentazione al bisogno.

## head(n)
Carica solo i primi n dati.

## columns
Formato lista; si possono impostare i nomi delle colonne.

```python
df_data.columns = ['a', 'b']
```

## values
Restituisce i dati pandas in formato numpy.

## iloc, loc
loc permette l'accesso per nome di colonna.
iloc permette l'accesso ai dati come numpy. Preferisco iloc.