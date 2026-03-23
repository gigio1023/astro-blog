---
title: "Mac Basic Settings"
description: "Essential Mac setup checklist covering Rosetta 2, Homebrew for ARM and Intel, oh-my-zsh, language toggle key remapping, and menu bar customization."
date: "2022-05-19T00:00:00.000Z"
tags: ["dev-tools"]
lang: en
translationOf: "mac-settings"
draft: false
---

I consolidated scattered information into one place.

# Rosetta2
```sh
/usr/sbin/softwareupdate --install-rosetta agree-to-license
```

# brew
Depending on whether the terminal is arm or intel, brew installs accordingly. You just need to set up separate paths for the two.

## ARM brew installation
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Intel brew installation
```sh
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# If the above command doesn't work, try this instead
arch -x86_64 zsh
cd /usr/local
mkdir homebrew
curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

Add the following to .zshrc
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

# Language toggle key
1. Install Karabiner-elements
2. In Setting > Keyboard > Shortcuts > Input Sources, enable any one option and change the binding key to F18
3. In Karabiner-elements > Simple modifications, set:
   From key: right_command
   To key: f18

# Menu bar settings
## Runcat
Change to use random runner
## Hidden bar
Hold Command key to move the '|' and '>' shaped icons. You can hide menu icons based on that boundary.

# Unsplash Wallpaper
Set it to change daily and switch whenever you want.
