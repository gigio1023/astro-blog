---
title: "AI ed etica"
description: "Discussione su bias, equità e privacy nell'AI, con il caso studio COMPAS e l'analisi della privacy nel contact tracing COVID."
date: "2021-09-26T10:10:36.459Z"
tags: ["ethics", "naver-boostcamp"]
lang: it
translationOf: "ai-and-ethics"
draft: false
---

# Bias
Il COMPAS di Northpointe, un sistema per prevedere la recidiva negli USA, mostrava previsioni distorte riguardo razza e genere, ed è stato infine dismesso per basi giuridiche ambigue, come mostrato di seguito.
![](/assets/images/AI & Ethics/12702dce-9ede-49d5-86ba-785eb013d5a4-image.png)

Personalmente, penso che il COMPAS sia stato **un problema di bias causato da insufficiente persuasività legale e da una progettazione errata del modello**.

Se l'analisi dei dati era distorta verso un genere, razza o religione specifici, è un problema della metodologia di analisi dei dati, non propaganda dei developer basata sulle loro convinzioni. Se la distribuzione sbilanciata delle classi è stata gestita male e il modello l'ha appresa così com'è, l'affidabilità del modello non può essere garantita e nemmeno le sue previsioni saranno accurate.

L'aspetto importante è che il processo di sviluppo e i dati di COMPAS sono un **segreto commerciale**. [Articolo correlato](https://m.lawtimes.co.kr/Content/Opinion?serial=119712)
In altre parole, non sappiamo se i developer hanno costruito un modello distorto per convinzioni razziali o di genere, o se si è trattato di un semplice errore statistico.

Come menziona l'avvocato nell'articolo linkato, questo costituisce anche una **violazione del giusto processo**. Le prove adottate tramite segreti commerciali non lasciano spazio al diritto di difesa dell'imputato, e il tribunale non può usarle come base per il giudizio.

Il rapporto del NSTC (National Science and Technology Council) 'Preparing For The Future Of Artificial Intelligence' dedica un intero capitolo alla 'Fairness', mostrando come i metodi di apprendimento blackbox non garantiscano il diritto del pubblico all'informazione. Tali approcci blackbox rendono difficile certificare che non si siano verificate discriminazioni razziali o di genere, anche se è chiaramente un obiettivo da perseguire.

## Ricerca sul bias
Esistono anche paper giuridici che studiano come il bias emerge nei big data.
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2477899
L'abstract del paper dice che trovare soluzioni esatte è difficile perché la radice del problema è difficile da identificare.
- Gli algoritmi sono inevitabilmente basati sui dati. Se i dati sono distorti, anche l'output sarà distorto.
- Se le sentenze dei giudici precedenti erano distorte, anche l'algoritmo produrrà sentenze distorte. Il bias sociale si riflette negli algoritmi.
- Possono esistere pattern svantaggiosi per minoranze e gruppi vulnerabili nei dati sociali. Ma conoscere la fonte esatta di tali dati è difficile.
- I developer possono non avere l'intenzione di costruire modelli distorti, ma modelli distorti possono comunque risultare.

### Definizione di variabile target e label delle classi
Il paper dice che il bias può nascere dalla definizione stessa delle variabili target e delle label delle classi.
Per esempio, definire un "buon dipendente":
- Anzianità di servizio
- Ore lavorative giornaliere
- Produttività
- Relazioni con i colleghi

Il bias può entrare nella definizione di queste variabili e condizioni delle classi. Come si definisce la produttività, come si definiscono le ore lavorative giornaliere — possono comportare elementi altamente soggettivi.

### Labeling
In LinkedIn Talent Match, i dipendenti vengono valutati dai datori di lavoro. I datori di lavoro possono avere bias impliciti. Tali dati di valutazione possono riflettersi nei dati di addestramento.

### Raccolta dati
L'argomento è che il bias può essere incorporato nella raccolta dati stessa.
- Sottorappresentazione
  - Ci sono casi in cui i dati non rappresentano i gruppi vulnerabili.
  - Per esempio, a Boston i cittadini segnalano i danni stradali con foto dallo smartphone, ma nelle aree con concentrazione di popolazioni vulnerabili la diffusione degli smartphone era bassa, rendendo le segnalazioni inadeguate.
- Sovrarappresentazione
  - I dati sovrarappresentano i gruppi vulnerabili
  - Le attività dei dipendenti appartenenti a gruppi vulnerabili possono ricevere un'attenzione sproporzionata dai datori di lavoro, rendendo impossibile una valutazione oggettiva.

### Selezione delle feature
L'argomento è che il bias è incorporato nelle feature stesse. Un esempio rappresentativo per superare questo problema è il blind hiring.
Redlining: guardare criteri generali. Valutare l'ambiente circostante piuttosto che gli individui.

### Proxy
- Discriminazione non intenzionale
  - Il modello scopre autonomamente pattern distorti senza che ci sia intenzionalità
- Discriminazione intenzionale
  - I progettisti iniettano deliberatamente bias negli algoritmi

## Metriche di bias
![](/assets/images/AI & Ethics/cebc13d0-9abf-4940-a53a-b60ac8401221-image.png)
Source: May, et al. NAACL 2019

Nei modelli NLP, i nomi europeo-americani risultano appresi come più contestualmente appropriati con parole positive, mentre i nomi afro-americani con parole negative.

![](/assets/images/AI & Ethics/626691f1-c2b7-457a-9294-da78f20313e9-image.png)
Come mostra il diagramma, anche nella valutazione positiva/negativa frase-per-frase si riscontra bias, secondo il paper.

## Conclusione sul bias
Essendo un argomento sensibile, l'ho trattato con più cura rispetto ad altri post.

COMPAS è l'esempio più adatto per introdurre casi di AI e bias. Il modello ha appreso da dati distorti con previsioni scadenti; un modello blackbox non ha persuasività legale come prova; e non può garantire il diritto di difesa dell'imputato.

Detto questo, personalmente non credo si debba ossessionarsi sui risultati distorti. Se è stato progettato un approccio statisticamente e metodologicamente corretto, mettere in discussione i risultati per bias non ha senso.

Il bias sociale sbagliato esiste, ed è ragionevole che i modelli AI evitino di apprenderlo e rafforzarlo. Ma casi come 'Lee Luda' mostrano che anche analisi guidate dalla propaganda, piuttosto che dal ragionamento legale o statistico, erano diffuse nella società.

I problemi del servizio Lee Luda sono stati evidenziati da vari articoli. [Link all'articolo](https://m.lawtimes.co.kr/Content/LawFirm-NewsLetter?serial=170076)
Ciò che va notato sono i problemi di protezione della privacy e legali di Lee Luda, non un modello distorto. Come studioso di AI, è un peccato che la questione Lee Luda sia stata oscurata dalla propaganda di certi gruppi.

**In sintesi, penso sia fuorviante affermare che un modello è stato sviluppato con bias basandosi solo sui suoi output, senza considerare le prospettive statistiche e legali.**

# Privacy
Questo è un paper che analizza le questioni di privacy dell'app di contact tracing COVID-19 di Singapore 'TraceTogether' e suggerisce miglioramenti.
ref: https://arxiv.org/pdf/2003.11511.pdf

Le questioni di privacy sollevate nel paper sono le seguenti.
- I dispositivi degli utenti contengono solo le proprie informazioni. Tuttavia, tutte le informazioni degli utenti sono archiviate su un server centrale, mascherate con stringhe casuali che non permettono di identificare gli individui.
- Privacy dagli snooper
  - Le informazioni individuali sono gestite tramite identificatori che cambiano con stringhe casuali ogni volta, e solo le informazioni personali esistono sul dispositivo. Quindi anche se c'è un rischio di snooping, le questioni di privacy non sono significative.
- Privacy dai contatti
  - Se viene rilevato un contatto con un paziente COVID-19, l'app notifica il governo di Singapore. Ma non trasmette informazioni personali identificabili (nome, genere, ecc.).

**Miglioramenti**
Il paper suggerisce i seguenti miglioramenti tecnici per la protezione della privacy.
- Archiviare le informazioni personali su server distribuiti
- Usare soluzioni basate sulla crittografia
- Aggiungere rumore casuale non aiuta con la protezione della privacy.

**Corea del Sud**
La Corea del Sud ha meno casi confermati rispetto ad altri paesi, quindi tutte le informazioni sui pazienti confermati vengono divulgate. Non è un buon approccio dal punto di vista della privacy. È anche inutile se il numero di casi confermati è alto.

# Disuguaglianza sociale
Questo è un rapporto della Casa Bianca che riassume l'impatto sociale che l'AI potrebbe avere nei prossimi 10 anni. Esistono rapporti del 2016, 2018 e 2019; il riferimento è al rapporto del 2016.

ref: https://ainowinstitute.org/AI_Now_2016_Report.pdf

Il rapporto dice:

L'AI potrebbe prendere decisioni socialmente importanti.
- Alloggio
- Assicurazione sanitaria: chi ha determinate malattie o predisposizioni genetiche potrebbe pagare di più o vedersi negata la copertura. L'assicurazione sanitaria tradizionale prende decisioni simili, ma l'AI ha il potenziale per rilevare malattie latenti e predisposizioni genetiche precocemente.

**Beneficiari**
- Professioni che usano bene l'AI (developer, finanza, ecc.)
- Gruppi con accesso a risorse su larga scala

**Danneggiati**
- Popolazioni vulnerabili senza accesso IT
- Piccoli gruppi, scuole

## Lavoro
La perdita di posti di lavoro sembra inevitabile. C'è anche il potenziale per danni quando la gestione sistematica dei dipendenti diventa più strutturata. Es.: Uber

## Disinformazione
**News**
Language model come GPT-3 che scrivono testo in stile umano hanno il potenziale per la produzione esplosiva di fake news.
ref: https://tinkeredthinking.com/?id=836

**Deepfakes**
ref: https://arxiv.org/pdf/2001.00179.pdf
Se le GAN di prima generazione producevano immagini goffe, quelle di seconda generazione e successive generano immagini molto naturali. Questo paper affronta il rilevamento di sostituzione facciale per prevenire danni correlati.

## Identità
**Predizione dell'identità**
ref: https://www.pnas.org/content/pnas/110/15/5802.full.pdf
Un paper che predice informazioni sugli utenti (età, genere, orientamento politico) analizzando i loro like su Facebook.

![](/assets/images/AI & Ethics/a20d8724-5198-424a-8902-8fff6ffd8ada-image.png)

Le predizioni sono possibili per una notevole varietà di informazioni e sono significative.

**Rilevamento di imbroglioni nei test di coding**
ref: https://dl.acm.org/doi/abs/10.1145/3386527.3406726
![](/assets/images/AI & Ethics/fe3ff752-4b41-4c89-86b9-551e700b236b-image.png)
Un paper per rilevare imbroglioni nei test di coding. Classifica gli utenti rilevando i keystroke.

# Salute
**Rilevamento precoce**
Tra i pazienti diabetici, alcuni sviluppano complicazioni che causano perdita della vista. È stata sviluppata tecnologia per rilevare tali casi precocemente.
ref: https://irisvision.com/diabetic-retinopathy/

**Interpretazione di immagini mediche**
ref: https://youtu.be/Mur70YjInmI
Usato per la diagnosi del cancro tramite interpretazione di immagini per aiutare la diagnosi. Personalmente, alcuni developer sembrano pensare che la CV abbia trovato la soluzione definitiva per questi casi, ma penso che debbano ancora servire solo come strumenti di supporto. Di fatto, le restrizioni legali attuali li classificano come strumenti di supporto medico piuttosto che strumenti diagnostici medici.

**Rilevamento COVID-19**
ref: https://www.nature.com/articles/s41591-020-0931-3
Un paper su un modello che rileva il COVID-19 combinando più modelli DL.

# Cambiamento climatico
**Emissioni di $CO_2$**
ref: https://s10251.pcdn.co/pdf/2021-bender-parrots.pdf
Una questione che emerge sempre quando si parla di AI e inquinamento ambientale.
Se una persona emette circa 5 tonnellate di $CO_2$ all'anno, un singolo addestramento di un grande transformer emette circa 284 tonnellate di $CO_2$. Il paper sostiene che i ricercatori dovrebbero considerare i costi energetici insieme all'efficienza e alle prestazioni.

**Casi in cui aiuta l'ambiente**
ref: https://arxiv.org/pdf/1906.05433.pdf
È un paper lungo, ma riassumendo le applicazioni dell'AI:
- Sviluppare soluzioni che non usano combustibili fossili
- Sviluppare soluzioni che riducano efficacemente il consumo delle risorse esistenti
- Sviluppare piani per l'implementazione globale di tali soluzioni
- Aumentare l'efficienza energetica dei trasporti (veicoli elettrici)
- Pianificare orari efficienti per grandi mezzi di trasporto (treni, aerei) per ridurre il consumo di carburante
- Analizzare i tempi di utilizzo dell'acqua calda per una fornitura efficace
- Posizionare le biciclette condivise in base alla domanda per aumentarne l'utilizzo
- Ottimizzare i percorsi Uber per tragitti più brevi

![](/assets/images/AI & Ethics/4218cae7-cb2a-464f-85dc-85cef50c65c7-image.png)

Per esempio, se le previsioni sul consumo di elettricità fossero fatte in modo efficace, le risorse potrebbero essere allocate in base alle necessità. Dato che si parla di elettricità, il punto chiave sembra essere la regolazione della produzione piuttosto che l'allocazione delle risorse. Dopotutto, non esiste un sistema pratico di accumulo come una diga..

---

![](/assets/images/AI & Ethics/faeb6bb5-c874-44b7-8ba9-a542309fee04-image.png)
ref: https://deepmind.com/blog/article/deepmind-ai-reduces-google-data-centre-cooling-bill-40

Un post di DeepMind sull'efficienza del raffreddamento nei data center di Google. L'obiettivo è analizzare i pattern di scheduling durante i carichi di lavoro ML rispetto a quelli non-ML usando il ML, riducendo così l'energia consumata per il raffreddamento.
