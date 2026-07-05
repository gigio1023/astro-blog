---
title: "Configurazione base di GitHub Pages"
description: "Configurazione di un blog GitHub Pages con Jekyll: installazione, configurazione, YAML front matter e personalizzazione del tema."
date: "2022-04-06T00:00:00.000Z"
tags: ["dev-tools"]
lang: it
translationOf: "githubio-basic-setting"
draft: false
---

ref: [github.io setting reference](https://devinlife.com/howto/)
Migrazione da velog.io/@naem1023 a naem1023.github.io.
Personalizzazione, posting locale e possibilità di deploy su un server personale -- questi vantaggi mi sembravano migliori della semplicità di Velog.

# Installazione
```sh
# install ruby, jekyll, bundler
# Ubuntu
sudo apt install ruby ruby-dev build-essential

# m1 mac
brew install ruby rbenv
rbenv install 3.1.2
rbenv global 3.1.2

# install jekyll, bundler
gem install jekyll bundler
bundle update --bundler
bundle add webrick
bundle install --redownload

# set zshrc
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"' >> ~/.zshrc


# setup del tema jekyll e deploy
git clone {indirizzo git del tema jekyll}
mv ./minimal-mistakes {nome del mio repository github.io}
cd {{nome del mio repository github.io}}
git remote remove origin
git remote add origin {link del mio repository github.io}
git push -u origin master
```
# Test
```sh
# Servire in ambiente locale
bundle exec jekyll serve
```

# YFM (YAML Front Matter)
- Specifica i metadati del post in formato markdown.
- Scritto in YAML.
- Posizionato all'inizio del file markdown come segue:

```md
---
title:  "velog to github.io"
excerpt: "excerpt"
toc: true
toc_sticky: true
toc_label: "Indice della pagina" # default: On this page
header:
  teaser: /assets/images/bio-photo-keyboard-teaser.jpg

categories:
  - Blog building
tags:
  - Blog
last_modified_at: 2022-04-06T08:06:00-05:00
---
Si può accedere alle informazioni YFM tramite doppie parentesi graffe
es., {{ page.title }}, {{ page.last_modified_at }}
```
Il toc (table of contents) permette di visualizzare un elenco degli header H1-H6 sul lato destro della pagina.

# _config.yml
Contiene le impostazioni operative di Jekyll. Mentre gli altri file riflettono automaticamente le modifiche durante l'esecuzione del server Jekyll, le modifiche a _config.yml hanno effetto solo al rebuild.

Il contenuto di _config.yml può essere usato così:
```md
<{{ site.url }}{{ site.baseurl }}/blog/>
```
Quando compilato con Jekyll, il codice sopra viene renderizzato come <{{ site.url }}{{ site.baseurl }}/blog/>.

## Commenti
Si può aggiungere un servizio di commenti modificando la sezione comments in _config.yml.
Ho intenzione di usare utterances.
ref: [utterances setting blog](https://ansohxxn.github.io/blog/utterances/)

## Open Graph Image
Si può configurare l'Open Graph Protocol.
```yaml
og_image    : "path"
og_description  : ""
og_title    : ""
```
[Cos'è l'Open Graph Protocol](/blog/it/open-graph-protocol/)

## Site Author
Informazioni visualizzate nella sidebar sinistra. Attenzione: gli URL vanno scritti senza virgolette.
```yaml
# Site Author
author:
  name             : "Sviluppatore per hobby"
  avatar           : "/assets/images/bio-photo-keyboard.jpg"
  bio              : "Uno sviluppatore che programma per stipendio al lavoro e per hobby a casa"
  location         : "South Korea"
  email            :
  links:
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: mailto:devinlifeidea@gmail.com
    - label: "Website"
      icon: "fas fa-fw fa-link"
      url: "https://devinlife.com"
```

## Outputting
Impostazioni per la visualizzazione del blog. Il valore paginate controlla quanti post recenti appaiono nella prima pagina. Superato quel numero, vengono mostrati i numeri di pagina.

## _posts, _pages
_posts contiene i post basati su data.
_pages serve per i post non basati su data. Si possono scrivere post che appaiono a URL specifici all'interno del sito.

Le impostazioni definite per _posts e _pages in _config.yml diventano i default per i post markdown. Ridefinire il YFM nei singoli post sovrascrive quei default.

## Category, Tag
Si possono configurare URL e tipi per categorie e tag.

# Barra dei menu
Modificabile tramite _data/navigation.yml.

# Categorie, Tag
Servono pagine separate per categorie e tag, create tramite Pages.
Creare pagine con '/categories' e '/tag' come permalink. Qualsiasi URL va bene purché sia il base URL configurato in _config.yml.
Categorie e tag hanno il profilo autore impostato su false di default, quindi l'ho cambiato in true.

## Category
Se Categories contiene tutte le categorie del blog, le pagine delle singole categorie devono mostrare i post di quella specifica categoria. Creare pagine con permalink come sotto-URL di categories.

```md
---
title: "About building blog"
permalink: /categories/blog
layout: category
author_profile: true
taxonomy: blog-building
---
```
Il campo taxonomy specifica quale categoria visualizzare.

# Commenti
Assicurarsi di impostare comments su true in _config.yml. Ci ho perso parecchio tempo...

```yml
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      comments: true
```

Ho usato utterances. Dato che usa le issue di GitHub, se è un repo forkato bisogna verificare che la creazione di issue sia abilitata.
A differenza dei permalink, il nome del repo va racchiuso tra virgolette.

```yaml
repository: # GitHub username/repo-name es. "mmistakes/minimal-mistakes"

comments:
  provider: "utterances"
  utterances:
    theme: "github-light" # "github-dark"
    issue_term: "pathname"
```

Se issue_term è "pathname", i commenti si mappano alle issue GitHub in base al percorso URL. Se il titolo del post cambia e il percorso URL cambia, i commenti scompaiono.

## Font
Si può cambiare il font modificando i file scss.
```scss
# In _sass/minimal-mistakes/_variables.scss, modificare User Font
$sans-serif: -apple-system, BlinkMacSystemFont, {User Font}


# Aggiungere il seguente in assets/css/main.scss
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

# Cambiare la dimensione del font in _sass/minimal-mistakes/_reset.scss

html {
  box-sizing: border-box;
  background-color: $background-color;
  font-size: 14px;

  @include breakpoint($medium) {
    font-size: 14px;
  }

  @include breakpoint($large) {
    font-size: 16px;
  }

  @include breakpoint($x-large) {
    font-size: 18px;
  }

  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
```

## Visualizzazione della data
Modificando _config.yml come segue si rimuove il tempo di lettura e si mostra la data di pubblicazione. Le impostazioni inserite qui si applicano automaticamente al YFM di tutti i post.
ref: [Reference github comment](https://github.com/devinlife/devinlife.github.io/commit/c6a8fe5a2f2a6f208b4ad90528074842e5c3ee66#commitcomment-50500658)
```yml
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: false
      comments: true
      share: true
      related: true
      show_date: true
```
