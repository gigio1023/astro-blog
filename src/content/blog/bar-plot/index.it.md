---
title: "Bar Plot"
description: "Guida alle tecniche di visualizzazione con bar plot in matplotlib, inclusi grafici a barre impilati, sovrapposti e raggruppati."
date: "2021-08-16T12:14:26.551Z"
tags: ["data-viz", "python"]
lang: it
translationOf: "bar-plot"
draft: false
---

Avevo gia visto questo materiale, ma l'ho trascritto qui come ripasso.

# Principio dell'inchiostro proporzionale
> Il valore reale e l'inchiostro usato per rappresentarlo devono essere proporzionali.

- Un principio valido per tutte le visualizzazioni.
- L'asse x deve sempre partire da 0.
  - Il rapporto verticale del grafico deve rappresentare le differenze nei dati.

![](/assets/images/Bar plot/fe90cd8b-91de-49c6-bac0-766292955d7b-image.png)

Il grafico a sinistra non parte da 0. Quindi le proporzioni del grafico non riflettono le proporzioni reali dei dati. Per evitare fraintendimenti inutili, usare un grafico come quello a destra.

# Bar Plot

- Dati rappresentati con barre, come dice il nome.
- Adatto per confrontare valori numerici tra categorie.

## Classificazione per direzione delle barre
In matplotlib:
- .bar() : categorie sull'asse x, dati sull'asse y
- .barh() : categorie sull'asse y, valori sull'asse x
  - Meglio quando ci sono molte categorie

## Categorie multiple
- I bar plot rappresentano valori per una singola feature per categoria
  - Mostrano valori per 1 sola feature
  - Per visualizzare piu gruppi servono altri metodi

Soluzioni:
- Grafici multipli
- Rappresentare simultaneamente in un singolo grafico
  - Impilati
  - Sovrapposti
  - Affiancati

### Bar plot impilato
![](/assets/images/Bar plot/38e77e6d-742f-45ef-8e2f-305c05bb31dc-image.png)
- Impilare 2 o piu gruppi
- La distribuzione della barra impilata piu in basso e facile da vedere.
  - Le barre impilate sopra sono piu difficili da interpretare.
- matplotlib
  - .bar() usa il parametro bottom per impilare.
  - .barh() usa il parametro left per impilare.

### Bar chart impilato a percentuale
![](/assets/images/Bar plot/f9755ff7-f0ca-40e6-8eb2-cc49add0ea39-image.png)

Dato che i bar plot impilati rendono difficile vedere la distribuzione complessiva, qui si converte il bar chart impilato in percentuali.

### Bar plot sovrapposto
![](/assets/images/Bar plot/2eb0f831-b391-487f-adb8-c3ff8e3b599d-image.png)
- Buono per confrontare solo 2 gruppi.
  - Confrontare regolando la trasparenza (alpha).
  - Tenere presente che luminosita e saturazione del colore influenzano anche l'effetto di trasparenza.
- Non ottimale per 3 o piu gruppi.
  - In quel caso meglio gli area plot.

### Bar plot raggruppato
**_Il metodo piu efficace!_**
![](/assets/images/Bar plot/9bfd23d5-dba3-493b-9c5b-202dea6a5008-image.png)
- Posizionare le barre dei gruppi affiancate
- L'implementazione e complicata in matplotlib, quindi si gestisce in seaborn.
  - Usa .set_xticks(), .set_xticklabels().

---

Tutti i metodi sopra funzionano bene con 5-7 gruppi. Se ci sono piu gruppi, servono approcci diversi.

# Ordinamento dei dati
- L'ordinamento e obbligatorio
  - es., in pandas: sort_values(), sort_index()
- Ordinare appropriatamente per tempo, dimensione, ordine delle categorie o valore delle categorie.

# Uso appropriato dello spazio
- Il bar plot di matplotlib riempie l'ax e risulta stretto
- Regolare con i seguenti metodi:
  - Limiti asse X/Y (.set_xlim(), .set_ylim())
  - Spine (.spines[spine].set_visible())
  - Gap (width)
  - Legenda (.legend()), dove posizionarla
  - Margini (.margins())
