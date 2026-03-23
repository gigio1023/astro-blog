---
title: "Impostazioni base del Mac"
description: "Checklist essenziale per la configurazione del Mac: Rosetta 2, Homebrew per ARM e Intel, oh-my-zsh, rimappatura tasto cambio lingua e personalizzazione barra menu."
date: "2022-05-19T00:00:00.000Z"
tags: ["dev-tools"]
lang: it
translationOf: "mac-settings"
draft: false
---

Ho raccolto in un unico posto le informazioni sparse.

# Rosetta2
```sh
/usr/sbin/softwareupdate --install-rosetta agree-to-license
```

# brew
A seconda che il terminale sia arm o intel, brew si installa di conseguenza. Basta impostare percorsi separati per i due.

## Installazione brew ARM
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Installazione brew Intel
```sh
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Se il comando sopra non funziona, provare questo
arch -x86_64 zsh
cd /usr/local
mkdir homebrew
curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

Aggiungere quanto segue al .zshrc
```
alias ibrew='arch -x86_64 /usr/local/homebrew/bin/brew'
```

# terminal
```sh
# install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# install syntax-highlight
brew install zsh-syntax-highlighting
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# install auto-suggestion
brew install zsh-autosuggestions
```

# Tasto cambio lingua
1. Installare Karabiner-elements
2. In Setting > Keyboard > Shortcuts > Input Sources, abilitare un'opzione qualsiasi e cambiare il tasto di binding a F18
3. In Karabiner-elements > Simple modifications, impostare:
   From key: right_command
   To key: f18

# Impostazioni barra menu
## Runcat
Cambiare per usare runner casuale
## Hidden bar
Tenere premuto il tasto Command per spostare le icone a forma di '|' e '>'. Si possono nascondere le icone del menu in base a quel confine.

# Unsplash Wallpaper
Impostarlo per cambiare giornalmente e cambiarlo quando si vuole.
