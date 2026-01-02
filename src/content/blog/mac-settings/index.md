---
title: "Mac basic settings"
description: "."
date: "2022-05-19T00:00:00.000Z"
draft: false
---

산개해있던 정보들을 취합했다. 

# Rosetta2
```sh
/usr/sbin/softwareupdate --install-rosetta agree-to-license
```

# brew
terminal이 arm이냐, intel이냐에 따라서 brew가 알아서 설치된다. 이원화를 위해서 경로만 따로 파주면 된다.

## ARM brew installation
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Intel brew installation
```sh
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# 위 명령어가 안되면 아래 명령어로 실행
arch -x86_64 zsh
cd /usr/local
mkdir homebrew
curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

.zshrc에 아래 내용 기입
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
1. Karabiner-elements 설치
2. Setting > Keyboard > Shortcuts > Input Sources에서 뭐든 1개만 옵션 키고 F18로 binding key 변경
3. Karabiner-elements > Simple modifications에서 아래와 같이 변경  
   From key: right_command  
   To key: f18

# Menu bar settings
## Runcat
무작위 runner 쓰도록 변경
## Hidden bar
Command 키 눌러서 '|', '>' 모양의 아이콘을 옮긴다. 해당 경계선을 기준으로 menu icon 숨길 수 있음.

# Unsplash Wallpaper
Daily하게 바뀌게 하고 맘대로 바꾸자.