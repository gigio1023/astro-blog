---
title: "GitHub Pages Basic Setup"
description: "Setting up a GitHub Pages blog with Jekyll: installation, configuration, YAML front matter, and theme customization."
date: "2022-04-06T00:00:00.000Z"
tags: ["dev-tools"]
lang: en
translationOf: "githubio-basic-setting"
draft: false
---

ref: [github.io setting reference](https://devinlife.com/howto/)
Moving from velog.io/@naem1023 to naem1023.github.io.
Customization, local posting, and the ability to deploy on a personal server if needed -- these advantages seemed better than Velog's simplicity.

# Installation
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
# Serve in local environment
bundle exec jekyll serve
```

# YFM (YAML Front Matter)
- Specifies post metadata in markdown format.
- Written in YAML.
- Placed at the top of the markdown file as follows:

```md
---
title:  "velog to github.io"
excerpt: "excerpt"
toc: true
toc_sticky: true
toc_label: "Page table of contents" # default: On this page
header:
  teaser: /assets/images/bio-photo-keyboard-teaser.jpg

categories:
  - Blog building
tags:
  - Blog
last_modified_at: 2022-04-06T08:06:00-05:00
---
YFM info can be accessed through double curly braces
e.g., {{ page.title }}, {{ page.last_modified_at }}
```
toc (table of contents) lets you display a list of H1-H6 headers on the right side of the page.

# _config.yml
Contains Jekyll's operational settings. While other files auto-reflect changes during the Jekyll server run, _config.yml changes only take effect on rebuild.

_config.yml content can be used like this:
```md
<{{ site.url }}{{ site.baseurl }}/blog/>
```
When built with Jekyll, the above renders as <{{ site.url }}{{ site.baseurl }}/blog/>.

## Comments
You can add a comment service by modifying the comments section in _config.yml.
Planning to use utterances.
ref: [utterances setting blog](https://ansohxxn.github.io/blog/utterances/)

## Open Graph Image
You can configure the Open Graph Protocol.
```yaml
og_image    : "path"
og_description  : ""
og_title    : ""
```
[What is Open Graph Protocol](/blog/en/open-graph-protocol/)

## Site Author
Information displayed in the left sidebar. Note that URLs should be written without quotes.
```yaml
# Site Author
author:
  name             : "Hobbyist developer"
  avatar           : "/assets/images/bio-photo-keyboard.jpg"
  bio              : "A developer who codes for salary at work and for fun at home"
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
Settings for how the blog is displayed. The paginate value controls how many recent posts appear on the first page. Exceeding that number shows page numbers.

## _posts, _pages
_posts contains date-based posts.
_pages is for non-date-based posts. You can write posts that appear at specific URLs within the site.

Settings defined for _posts and _pages in _config.yml become the defaults for markdown posts. Redefining YFM in individual posts overrides those defaults.

## Category, Tag
You can configure URLs and types for categories and tags.

# Menu Bar
Editable via _data/navigation.yml.

# Categories, Tag
Separate pages for categories and tags need to be created via Pages.
Create pages with '/categories' and '/tag' as permalinks. Any URL works as long as it's the base URL configured in _config.yml.
Categories and tags have author profile set to false by default, so I changed it to true.

## Category
If Categories contains all blog categories, individual category pages should show posts for that single category. Create pages with permalink as a sub-URL of categories.

```md
---
title: "About building blog"
permalink: /categories/blog
layout: category
author_profile: true
taxonomy: blog-building
---
```
The taxonomy field specifies which category to display.

# Comments
Make sure to set comments to true in _config.yml. I struggled with this for a while...

```yml
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      comments: true
```

I used utterances. Since it uses GitHub issues, if it's a forked repo you must verify that issue creation is enabled.
Unlike permalinks, the repo name must be enclosed in quotes.

```yaml
repository: # GitHub username/repo-name e.g. "mmistakes/minimal-mistakes"

comments:
  provider: "utterances"
  utterances:
    theme: "github-light" # "github-dark"
    issue_term: "pathname"
```

If issue_term is "pathname", comments map to GitHub issues based on the URL path. If the post title changes and the URL path changes, the comments disappear.

## Font
You can change the font by editing scss files.
```scss
# In _sass/minimal-mistakes/_variables.scss, modify User Font
$sans-serif: -apple-system, BlinkMacSystemFont, {User Font}


# Add the following to assets/css/main.scss
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

# Change font size in _sass/minimal-mistakes/_reset.scss

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

## Date Display
Modifying _config.yml as follows removes the reading time and shows the posting date instead. Settings placed here automatically apply to all posts' YFM.
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
