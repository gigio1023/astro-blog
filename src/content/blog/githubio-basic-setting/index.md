---
title: "github.io basic"
description: "."
date: "2022-04-06T00:00:00.000Z"
tags: ["blog"]
draft: false
---

ref: [github.io setting reference](https://devinlife.com/howto/)  
velog.io/@naem1023에서 naem1023.github.io로 옮기는 중.  
커스터마이징, 로컬 포스팅, 필요하다면 개인 서버에서 deploy가 가능하다는 장점이 velog의 간편성보다 좋다고 생각했다.

# Installation
```sh
# install ruby, jekyll, bundler
# Ubunu
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


# setup jekyll theme and deploy
git clone {git address of jekyll theme}
mv ./minimal-mistakes {name of my github.io repository}
cd {{name of my github.io repository}}
git remote remove origin
git remote add origin {link of my github.io repository}
git push -u origin master
```
# Testing
```sh
# Serve in local environmnet
bundle exec jekyll serve
```

# YFM(YAML Front Matter)
- markdown 형식 포스트의 정보를 지정.
- YAML 형태로 작성.
- markdown 상단에 아래와 같이 표시.  

```md
---
title:  "velog to github.io"
excerpt: "excerpt"
toc: true
toc_sticky: true
toc_label: "페이지 주요 목차" # default: On this page
header:
  teaser: /assets/images/bio-photo-keyboard-teaser.jpg

categories:
  - Blog building
tags:
  - Blog
last_modified_at: 2022-04-06T08:06:00-05:00
---
이중 괄호를 통해 YFM 정보에 접근 가능
e.g., {{ page.title }}, {{ page.last_modified_at }}  
```  
toc(table of contents)를 통해 markdown의 H1~H6 사이의 헤더 목록을 오른쪽에 위치시킬 수 있다.
# _config.yml
Jekyll 동작 설정에 대한 내용을 담고 있다. 다른 파일들은 jekyll 서비스 중에도 변경사항이 발생하면 자동 반영되지만, _config.yml은 재빌드 시에만 새로운 내용이 반영된다.

_config.yml의 내용을 아래처럼 활용 가능하다.
```md
<{{ site.url }}{{ site.baseurl }}/blog/>
```
위 구문을 jekyll로 빌드하면 <{{ site.url }}{{ site.baseurl }}/blog/>로 표시된다.

## Comments
_config.yml의 comments를 수정해서 댓글 서비스 추가 가능.  
utterances 사용 예정.  
ref: [utterances setting blog](https://ansohxxn.github.io/blog/utterances/)

## Open Graph Image
Open Graph Protocol을 지정할 수 있다. 
```yaml
og_image    : "path"
og_description  : ""
og_title    : ""
```
[Open Graph Protocol란]({{site.url}}{{site.baseurl}}/blog-building/Open-Graph-Protocol/)

## Site Author
site 좌측 사이드바에 표시되는 정보들이다. 유의할점은 url을 적을 때 쌍따옴표 없이 써야한다.
```yaml
# Site Author
author:
  name             : "취미코딩하는 개발자"
  avatar           : "/assets/images/bio-photo-keyboard.jpg"
  bio              : "회사에서는 월급 받고 집에서는 취미로 코딩하는 개발자"
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
블로그 표시 방법들에 대한 정보들이다. paginate를 통해 첫 페이지에 보여줄 최근 게시물의 수를 지정 가능하다. 해당 개수를 넘으면 다음 페이지 번호들이 표기된다. 

## _posts, _pages
_posts는 일반적인 날짜 기반의 포스팅들이다.  
날짜와 관련 없는 포스팅을 하기 위해서 _pages를 사용한다. 사이트 내 특정 주소에 보여줄 포스팅을 작성할 수 있다. 

_config.yml에서 설정한 _posts, _pages 설정이 markdown 포스팅들의 기본 설정이 된다. markdown 포스팅들에서 YFM을 재정의한다면 재정의한 설정을 지키게 된다.

## Category, tag
category, tag에 대한 url과 type 설정 가능.

# Menu bar
_data/navigation.yml을 통해 수정 가능.

# Categories, tag
Pages를 통해 categories, tag에 대한 별도의 페이지를 생성해야 한다.  
'/categories'와 '/tag'를 permalink로 하여 해당 page들을 만들자. 해당 url 아니어도 무관하다. _config.yml에 설정된 base url이기만 하면 된다.  
categories, tag에서는 author profile이 기본적으로 false이기 때문에 true로 변경했다.

## Category
Categories에 블로그의 모든 category가 담겨있다면, category에는 하나의 category에 대한 포스팅들이 존재해야 한다. categories의 하위 url로 permalink 설정해 page를 만들자.

```md
---
title: "About building blog"
permalink: /categories/blog
layout: category
author_profile: true
taxonomy: blog-building
---
```
taxonomy를 통해 표기할 category를 설정한다.

# Comments
_config.yml에서 comments를 꼭 true로 해야한다. 이것때문에 엄청 해맸다..

```yml
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      comments: true
```

uterances를 사용했다. github issue를 사용하기 때문에 fork repo라면 반드시 issue 작성이 가능한지 확인해야한다.  
permalink와는 다르게 큰 따옴표로 묶어서 repo이름을 적어야 한다.

```yaml
repository: # GitHub username/repo-name e.g. "mmistakes/minimal-mistakes"

comments:
  provider: "utterances"
  utterances:
    theme: "github-light" # "github-dark"
    issue_term: "pathname"
```

issue_term이 pathname이라면 말 그대로 path name에 의존해서 github issue comment와 mapping이 된다. 즉, 포스팅의 제목이 달라져서 url path가 수정된다면 댓글이 삭제된다.

## Font
scss 파일들을 수정해줘서 font를 바꿀 수 있다. 
```scss
# _sass/minimal-mistakes/_variables.scss 에서 User Font 수정
$sans-serif: -apple-system, BlinkMacSystemFont, {User Font}

 
# assets/css/main.scss에 다음 구문 추가
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

# _sass/minimal-mistakes/_reset.scss 에서 font size 변경

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

## Date 표시
_config.yml를 아래와 같이 수정하면 읽은 시간이 사라지고 포스팅 날짜가 표시된다. _config.yml의 아래 항목에 설정을 해두면 전체 posts의 YFM에 해당 내용들이 자동반영된다.
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