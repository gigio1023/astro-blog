---
title: "Quant Trading / Researcher"
description: "Introduzione alle strategie di trading quantitativo: arbitraggio, market making e arbitraggio statistico."
lang: it
translationOf: "quant-trading-researcher"
date: "2021-09-23T09:51:47.930Z"
tags: ["quant-trading"]
draft: false
---

# Trading
- Trading: a breve termine
  - Si rientra nel giro di 1 secondo - 3 giorni.
- Investment: a lungo termine

# Quant trading
Trading quantitativo, come dice il nome. Invece di operare a sensazione, si usano matematica e modelli.
= Automated / system / algorithmic trading

- Passato: i prezzi dei derivati venivano considerati dotati di proprietà matematiche, e i prezzi venivano ricavati tramite manipolazione matematica.
  - Non si usavano dati storici.
- Presente: l'accesso ai dati storici è diventato facile. Approcci data-driven basati su statistica e ML si sono rivelati molto efficaci.

# Strategie del Quant trading
Esistono innumerevoli strategie. Quelle più note si possono categorizzare così:
- Per quanto tempo si mantiene la posizione?
  - Meno di 1 secondo, ~3 minuti, ~1 ora, ~1 giorno, ~3 giorni -- molto variabile.
- Quale classe di asset si tratta?
  - Azioni, futures, opzioni, obbligazioni, forex, crypto, ecc.
  - Es. in termini di numero di strumenti, i futures sono al massimo 10-100, mentre le azioni possono essere migliaia (diciamo 5000).
- Livello di automazione
  - Blackbox: 100% automatizzato
  - Greybox: interviene il giudizio del trader
- Trade execution vs. rendimenti propri
  - Massimizzare i rendimenti dallo strumento stesso
  - Strategia per gestire ordini di grandi dimensioni
- **Da dove viene l'edge?** [What is trading edge?](https://quantsavvy.com/finding-a-daytrading-edge/)
  - Comprensione delle caratteristiche del mercato
  - Generare rendimenti attraverso un buon modello

## Arbitraggio
Comprare dove costa poco e vendere dove costa di più per generare profitto. Si opera considerando le differenze di prezzo tra più exchange.

L'arbitraggio serve a equalizzare i prezzi dello stesso prodotto. Garantisce ai consumatori di poter comprare e vendere a prezzi simili indipendentemente dall'exchange.

Quando l'arbitraggio si rompe, significa che i prezzi tra exchange diventano imprevedibili. Un esempio noto è il "kimchi premium" -- le crypto in Corea scambiate a premio rispetto ad altri paesi.

**Essendo un metodo intuitivo e semplice, la competizione sulla velocità è feroce.** Quando si presenta un'opportunità di arbitraggio, le operazioni avvengono nel giro di microsecondi o millisecondi, a seconda del mercato e dell'exchange.

I fattori di successo sono circa 90% velocità e 10% alpha. Alpha indica quanto è intelligente la strategia. Quindi il modello migliore tende a dominare.

## Market Making
I market maker generano profitto sfruttando le caratteristiche dei mercati dei capitali.

Es. le banche generano ricavi dal trading in valuta estera.

> Fornire liquidità = chiunque può comprare e vendere facilmente quando vuole.
- I market maker creano mercati, forniscono liquidità e guadagnano lo spread.
- I market maker stabilizzano i mercati dei capitali.

Senza market maker, le persone dovrebbero operare P2P, gli importi varierebbero da persona a persona e i mercati diventerebbero instabili.

Quando tutti nel mercato operano nella stessa direzione contemporaneamente, i prezzi si muovono e i market maker possono subire perdite. Quindi è importante costruire strategie che rilevino questi movimenti e annullino gli ordini di conseguenza.

50% velocità, 50% alpha.

## Arbitraggio statistico
Nonostante il nome, ha poco a che fare con l'arbitraggio vero e proprio. È un termine ombrello per tutti i metodi che predicono variazioni future dei prezzi.
- Previsione dei prezzi usando movimenti recenti del book degli ordini
- Previsione dei prezzi usando correlazioni cross-section tra strumenti
- Previsione delle differenze di prezzo tra strumenti (basis trading)

Si usano tutte le fonti informative: analisi fondamentale ([ref](https://byeoltong.com/737)), indicatori tecnici, ecc.

L'approccio data-driven è indispensabile.

10% velocità, 90% alpha.

# Attori principali del trading
- Quant hedge fund ([ref](http://www.samsungfund.com/content/guide4_2_10.action?mobile)), robo-adviser ([wiki](https://ko.wikipedia.org/wiki/%EB%A1%9C%EB%B3%B4_%EC%96%B4%EB%93%9C%EB%B0%94%EC%9D%B4%EC%A0%80))
  - Gestiscono capitali di clienti su larga scala (centinaia di miliardi fino a decine di trilioni di won).
  - Guadagnano commissioni dall'AUM e una quota dei profitti.
  - Periodi di detenzione relativamente lunghi. Più vicino al quant investment che al quant trading.
- Proprietary trading ([ref](https://www.mk.co.kr/news/business/view/2015/06/571712/))
  - A differenza degli hedge fund, operano con capitale proprio o dei partner (decine-centinaia di miliardi di won).
  - Scala relativamente più piccola rispetto agli hedge fund.
  - Puntano a rendimenti elevati tramite HFT e market making. I team di successo raggiungono rendimenti annuali superiori al 100%.
  - Dopo la crisi finanziaria, i cambiamenti normativi hanno spinto molti a passare dal prop trading alla fornitura di servizi di quant trading.
    - Es. servizi di esecuzione ordini: eseguire grandi vendite che i sistemi standard non riescono a gestire, tramite quant trading.

# Strategia Stat Arb
Pensando alla strategia di arbitraggio statistico in ottica deep learning, idealmente la struttura è end-to-end. Elegante e semplice. Ma in pratica non tutto è end-to-end; la configurazione è più simile a:

- La maggior parte della previsione dei prezzi usa regressione lineare. Si usano anche modelli ML e DL, naturalmente.
- Portfolio optimizer: un modello che considera correlazioni tra strumenti, quanto si muovono i prezzi, ecc., per determinare quali posizioni generano i rendimenti più stabili.
  - Approccio basato su modelli piuttosto che sui dati.
  - Gli ordini effettivi da eseguire vengono decisi qui.

# Il quant trading funziona davvero?
Ci si potrebbe chiedere se generare rendimenti in eccesso sui mercati sia una truffa. Cioè se il quant trading stesso abbia un senso. Esistono molte ipotesi e aneddoti secondo cui questo approccio non può funzionare.

## Ipotesi del mercato efficiente (Eugene Fama)
> "I prezzi contengono tutte le informazioni sul prodotto, quindi è impossibile ottenere rendimenti in eccesso nel lungo periodo."

L'ipotesi che i prezzi riflettano già tutte le informazioni presenti e future, rendendo impossibili rendimenti superiori a un certo livello. L'autore ha vinto il premio Nobel per l'economia.

Argomenti a supporto:
- Confrontando gestori attivi (che comprano/vendono in base al proprio giudizio) con gli indici di mercato (acquisto di tutti gli strumenti ponderato per capitalizzazione), gli indici fanno meglio.
- Long Term Capital Management è saltato in modo spettacolare durante la crisi finanziaria asiatica del 1997.

## Perché la previsione è possibile
### Informazione riflessa attraverso il trading
A seconda dell'orizzonte di previsione, ci sono casi e ragioni chiari per cui la previsione funziona.

> Perché una nuova informazione si rifletta nel prezzo, qualcuno deve fare un'operazione.

L'ipotesi del mercato efficiente dice che le informazioni sono pre-riflesse nei prezzi, ma quella riflessione avviene attraverso il trading. Quindi osservare le operazioni può fornire un certo livello di previsione.

- I grandi partecipanti impiegano molto tempo a muoversi.
  - Grandi ordini di vendita su un singolo strumento richiedono tempo. Osservare questi movimenti può consentire la previsione dei prezzi.
- La psicologia della massa emerge durante grandi variazioni di prezzo.
  - Quando i prezzi salgono, raggiungono un picco e poi si correggono a un livello appropriato.
- I professionisti compiono azioni razionali di riduzione del rischio che hanno un impatto reale.
  - I market maker di opzioni che coprono grandi vendite devono operare nel mercato spot. Quindi il volume del mercato delle opzioni può prevedere il futuro prossimo (millisecondi).
- Le nuove informazioni (notizie, comunicati, utili, fondamentali) impiegano tempo per riflettersi nel mercato.
  - Modellare la propagazione di queste informazioni può generare rendimenti.
- Questioni tecniche: caratteristiche dell'exchange/strumento, partecipanti che seguono regole specifiche.
  - Le caratteristiche e le regole di strumenti e utenti specifici permettono la previsione.
- Strumenti o exchange ad alto volume guidano il processo di price discovery.
  - Gli arbitraggisti allineano i prezzi tra exchange con volumi molto diversi, usando l'exchange ad alto volume come riferimento.

### Criteri di successo diversi dall'intuizione
$r^2$ ([wiki](https://ko.wikipedia.org/wiki/%EA%B2%B0%EC%A0%95%EA%B3%84%EC%88%98)) è una metrica per valutare il successo della previsione. In parole semplici, indica quanto del prezzo futuro è stato previsto correttamente. Se negativo, meglio non prevedere; se positivo, va da 0 a 100%.

Consideriamo 6 previsioni. Si potrebbe pensare che le previsioni con $r^2$ alto siano utili per guadagnare. Ma in pratica, previsioni con $r^2$ di 0.05%, 1.00% e 3.00% sono quelle effettivamente realizzabili e profittevoli. Se $r^2$ supera il 15%, probabilmente c'è un problema -- un bug nella pipeline, una misurazione errata di $r^2$, o data snooping ([ref](https://ddingz.tistory.com/m/84)) che gonfia artificialmente il numero.

**Anche previsioni scadenti possono far guadagnare, ed è per questo che i criteri di successo nel quant trading differiscono dalla nostra intuizione.**

----

**Perché previsioni scadenti funzionano comunque**
- Scommesse estremamente piccole e numerose
  - Migliaia di strumenti, decine di migliaia di scommesse al giorno.
  - Se la probabilità di vincita è del 51%, per la legge dei grandi numeri il tasso di vittoria converge al 51%.
- Si usano molti algoritmi di previsione.
- Il profitto medio per operazione HFT è circa lo 0.01% del volume (1 basis point).
  - I rendimenti effettivi variano, ma la media complessiva produce un piccolo profitto.
  - Per raggiungere rendimenti annuali del 100%+ tramite HFT, serve un numero enorme di operazioni.

# Deep learning nel quant trading
Si usa molto la regressione lineare; ML e DL solo un po' per la previsione dei prezzi. **Perché il problema stesso di prevedere i mercati è difficile da definire, oltre che da risolvere.**
Perché la previsione di mercato è difficile:
- Solo una minima frazione dei fattori che influenzano i mercati è osservabile.
  - Posizioni e opinioni degli altri partecipanti, COVID, regolamentazione crypto, politica, economia, diplomazia, scandali, ecc.
  - Le informazioni vengono osservate sempre dopo il loro verificarsi.
- Le caratteristiche del mercato cambiano continuamente.
  - I partecipanti raffinano continuamente i propri approcci.
  - I partecipanti stessi cambiano.
  - Le normative cambiano.
  - Appaiono nuovi mercati / classi di asset.

## Definizione del problema e dell'ambiente
I problemi che il deep learning risolve bene includono:
- Riconoscimento immagini: gli oggetti nelle immagini non cambiano. Le caratteristiche di cani e gatti non cambieranno per milioni di anni.
- AI per il Go: l'intera scacchiera è osservabile indipendentemente dallo stato della partita.
- NLP: forme e proprietà del linguaggio cambiano, ma l'essenza del linguaggio resta stabile nel lungo periodo.

Questi problemi non cambiano nel tempo (indipendentemente dalla difficoltà). Paragonandoli alla previsione di mercato, è come:
- Identificare un animale da un singolo pelo.
- Gli animali cambiano il pelo per evitare la classificazione.
- Il governo ridefinisce le categorie degli animali.

## Cosa significa che il problema è difficile?
- Alto rischio di overfitting.
  - Ridurre l'errore in-sample è facile con ML/DL.
  - Ma trovare un errore basso probabilmente significa overfitting.
  - Anche prevenendo l'overfitting ora, non c'è garanzia che non succeda in futuro.
- Bisogna distinguere tra attributi di mercato che cambiano e quelli che non cambiano.
  - Se si riesce a classificarli correttamente, anche la regressione lineare produce un modello di valore.

---
**Il problema è difficile da definire, il problema stesso cambia continuamente, e anche le informazioni di valore comportano un alto rischio di overfitting -- ecco perché il deep learning non è molto usato nel quant trading.**

# Ricerca
## Ipotesi
La maggior parte della ricerca sui mercati parte da un'ipotesi.
- Se d'estate le alluvioni e il maltempo danneggiano i raccolti, i futures sui cereali dovrebbero salire.
- Se ordini di acquisto della stessa dimensione si ripetono, i prezzi dovrebbero salire.

Progettare approssimativamente un modello e buttarci dentro dati (approccio data-driven) tende a fallire. Senza un'ipotesi convincente, è difficile aggiustare modello, direzione e dati. Anche con un'ipotesi convincente, arrivare in produzione è raro; senza, è ancora più difficile.

**La ricerca non segue sempre un modello waterfall.** Iterare sulla forma e i risultati del modello per migliorare gli esiti è altrettanto essenziale.

## Dati
Le società di quant trading acquistano e usano dati molto diversificati.
- Prezzi di scambio, comunicati
- Notizie, Twitter, risultati di web crawling, report degli analisti
- Si dice che vengano usate anche immagini satellitari (conteggio auto nei parcheggi per previsioni economiche), dati meteo (previsione raccolti), dati sull'uso delle carte di credito, ecc.

Estrarre il segnale dai dati coinvolge le operazioni ML/DL che si conoscono:
- Filtering, rimozione rumore, clipping, rilevamento outlier, normalization, regularization, NLP...

## Algoritmo
- Esprime bene l'ipotesi?
- La funzione obiettivo da ottimizzare è progettata correttamente? (Es. meglio norma L1 o L2?)
- Riuso del codice esistente
  - Prospettiva ingegneristica: refactoring se il codice non è distribuito
  - Prospettiva di modellazione: compressione del modello

## Monetizzazione
I risultati dell'algoritmo devono effettivamente produrre denaro.
- Scelta dell'exchange
- Scelta del tipo di ordine
- Identificare quale portfolio offre performance costanti senza grandi oscillazioni
- Operare senza esporre il proprio alpha e le proprie posizioni
- Assicurarsi che le proprie operazioni non impattino il mercato
- Considerare il divario tra simulatore e realtà

## Avvertenze
- Divario tra sistema di produzione e di backtest
  - Sistema di backtest: per la valutazione
  - Es. produzione in C++, backtest in Python -- esistevano divari.
- Market impact: l'effetto sul mercato causato dalle proprie operazioni
- Data snooping: includere accidentalmente dati non visti durante la ricerca
  - Backtesting solo su azioni recentemente ad alto volume:
    - Rischioso perché non si sa quali azioni avranno alto volume in futuro.
  - Usare informazioni non disponibili il giorno di trading:
    - Includere accidentalmente i dati di oggi invece di quelli di ieri, ottenendo risultati di test fuorvianti.

## Pipeline di ricerca
Come nel ML, la ricerca spesso non produce risultati -- a differenza dello sviluppo, dove soddisfare i requisiti porta prima o poi al completamento. Nella ricerca, anche le idee migliori possono non portare a nulla.

Quindi una piattaforma che consenta iterazione efficiente sulle ipotesi è molto importante.
- Investimento a livello aziendale
  - Piattaforme di ricerca interne, cloud interno, DSL interno
- Investimento a livello di team
  - Script di ricerca facilmente riproducibili, investimento nell'efficienza della ricerca

# Settore
In Corea stanno nascendo startup di trading, prop desk nelle società di intermediazione tradizionali, robo-adviser e startup fintech come aziende di quant trading.

Un buon posto dove lavorare è uno che investe molto in piattaforme e processi, e che promuove una cultura di condivisione aperta dei risultati e dei materiali di ricerca all'interno.
