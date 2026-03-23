---
title: "Astro 블로그를 위한 Agent Skill을 만들었다"
description: "에이전트가 Astro 6 코드를 반복적으로 틀리길래, 스킬을 하나 만들어봤다."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "dev-tools"]
draft: false
lang: ko
---

- 에이전트는 Astro 6의 breaking change를 모른 채 옛날 패턴을 생성한다.
- Astro Docs MCP는 에이전트가 질문할 때만 동작하는데, 에이전트는 자기가 틀린 줄 모르니까 질문을 안 한다.
- 그래서 에이전트가 코드를 생성하기 전에 참조하는 Agent Skill을 만들었다.

---

이 블로그는 Astro로 만들어져 있다. Claude Code나 Cursor로 블로그를 작업할 때, 에이전트가 생성하는 Astro 코드가 반복적으로 틀리는 걸 발견했다. Astro 6에서 꽤 큰 breaking change가 있었는데 에이전트의 학습 데이터에는 Astro 3/4/5 시절 코드가 많다 보니, 에이전트 입장에서는 자기가 아는 패턴이 맞다고 생각하고 그대로 생성하는 거다.

Astro Docs MCP도 쓰고 있는데, MCP는 에이전트가 질문할 때만 동작한다. 에이전트가 `entry.render()`를 쓸 때 "이 API 바뀌었나?"라고 MCP에 물어보지 않는다. 자기가 아는 게 맞다고 확신하니까 그냥 코드를 생성한다. MCP가 "이거 어떻게 쓰나요?"에 답해주는 거라면, 필요했던 건 "그렇게 쓰면 안 돼"를 말해주는 쪽이었다.

그래서 Agent Skill을 만들었다. 에이전트가 코드를 생성하기 전에 참조하는 가이드라인 같은 것이고, MCP를 대체하는 게 아니라 MCP가 커버하지 못하는 영역을 보완하는 용도다.

## 에이전트가 반복적으로 틀리는 것들

몇 가지 대표적인 사례를 보면 상황이 이해가 된다.

Astro 6에서 `render()`가 entry 메서드에서 standalone 함수로 바뀌었다. 에이전트한테 블로그 포스트 렌더링을 시키면 거의 확실하게 `post.render()`를 쓴다.

```ts
// 에이전트가 생성하는 코드
const { Content } = await post.render()

// Astro 6에서는 이렇게 바뀌었다
import { render } from 'astro:content'
const { Content } = await render(post)
```

`Astro.glob()`은 Astro 6에서 아예 삭제된 API인데, 에이전트가 포스트 목록을 가져올 때 여전히 쓴다.

```ts
// 삭제된 API
const posts = await Astro.glob('./posts/*.md')

// Content Collections를 사용해야 한다
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

Astro 6는 Zod 4를 쓰는데, import 경로부터 다르고 validator 체이닝도 달라졌다.

```ts
// Zod 3 문법
import { defineCollection, z } from 'astro:content'
z.string().email()

// Zod 4 문법
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

Content Collections의 `loader`가 필수로 바뀐 것도 있다. 설정 파일 위치도 `src/content/config.ts`에서 `src/content.config.ts`로 바뀌었다.

```ts
// loader 없이는 동작하지 않는다
const blog = defineCollection({ schema: z.object({...}) })

// loader가 필수이고, schema는 함수 형태다
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

이런 식으로 정리한 패턴이 20개 정도 된다. Tailwind v4의 CSS 네이티브 설정, `client:load`를 모든 컴포넌트에 붙이는 것, `<ClientRouter />`에서 이벤트 리스너가 날아가는 것 등이다.

---

## 어떤 기준으로 만들었나

스킬을 만들 때 나름대로 기준을 두고 있었는데, Thariq의 [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378)를 읽고 나서 좀 더 명료해진 부분이 있었다. Anthropic 내부에서 수백 개의 스킬을 운영하면서 정리한 노하우인데, 이걸 참고해서 기존에 만들던 것을 다듬었다.

**Don't State the Obvious.** Claude는 이미 코딩에 대해 많이 알고 있으니까 스킬에는 에이전트가 평소에 하지 않는 방향으로 생각하게 만드는 정보를 넣으라는 이야기다. 처음에는 "Content Collections는 이렇게 쓰는 거다" 같은 일반적인 설명도 넣고 있었는데, 이걸 읽고 가드레일 형태로 정리하는 쪽으로 바꿨다. 에이전트가 틀리는 지점만 짚는 거다.

```markdown
# 이런 식으로 가드레일을 작성했다

**3. `Astro.glob()` does not exist:**
// agents generate this (removed API)
const posts = await Astro.glob('./posts/*.md')

// correct pattern
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

"이 API는 이렇게 쓰는 거다"가 아니라 "에이전트가 이걸 쓰려고 하면 그건 삭제된 API다"라는 방향이다. 에이전트가 이미 아는 것을 반복하면 컨텍스트만 낭비된다.

**Build a Gotchas Section.** 스킬에서 가장 가치가 높은 콘텐츠는 gotchas 섹션이고, 에이전트가 실패하는 지점을 모아서 계속 업데이트하라는 이야기다. 이 스킬의 가드레일 20개가 전부 이 방식으로 만들어졌다. 처음부터 20개를 설계한 게 아니라 에이전트가 틀리는 걸 볼 때마다 하나씩 추가한 것이다.

**Use the File System & Progressive Disclosure.** 스킬을 폴더 구조로 나눠서 progressive disclosure를 하라는 건 스킬을 만드는 사람이라면 대부분 알고 있는 내용이고, 이 스킬도 처음부터 `references/` 폴더로 분리해서 만들고 있었다. 다만 글을 읽고 나서 라우터를 좀 더 명시적으로 만들었다. SKILL.md에 작업별로 어떤 파일을 읽어야 하는지 테이블로 안내하는 부분이다.

```markdown
# SKILL.md의 라우터 부분

| What you're doing | Read this file |
|---|---|
| Content collections (schema, loader, querying, Zod 4) | references/content-collections.md |
| Blog features (RSS, pagination, tags, SEO, TOC) | references/blog-recipes.md |
| Tailwind CSS (config, theming, classes, fonts) | references/tailwind.md |
| Client directives / islands / hydration | references/islands-and-hydration.md |
```

에이전트가 "지금 뭘 하고 있으니까 이 파일을 읽어라"를 명시적으로 알려주는 구조다. 모든 걸 한꺼번에 로드하면 컨텍스트만 커지니까 필요한 모듈만 읽도록 한 것이다.

**Avoid Railroading Claude.** 지나치게 구체적으로 지시하면 에이전트가 상황에 맞게 판단할 여지가 없어진다. 이 스킬에서는 "이건 틀린 패턴이고, 올바른 패턴은 이거다"까지만 알려주고 실제 적용은 에이전트에게 맡기는 방식으로 작성했다. 예를 들어 `client:` 디렉티브 선택 가이드에서는 결정 트리를 제공하되 최종 판단은 에이전트가 컴포넌트의 맥락을 보고 하도록 했다.

---

## 스킬 구조

```
skills/astro-dev/
├── SKILL.md                    # 진입점. 20개 가드레일 + 라우터
├── references/
│   ├── astro-core-patterns.md  # Core API, 스타일, 스크립트, 미들웨어
│   ├── content-collections.md  # 빌드/라이브 컬렉션, 로더, Zod 4
│   ├── blog-recipes.md         # RSS, 페이지네이션, 태그, SEO, TOC
│   ├── tailwind.md             # Vite 플러그인, CSS 테마, 폰트 API
│   ├── islands-and-hydration.md
│   ├── actions-and-forms.md
│   ├── view-transitions.md
│   ├── server-features.md
│   └── doc-endpoints.md        # MCP 설정, LLM 최적화 문서 URL
└── templates/
    ├── astro.config.ts
    ├── content.config.ts
    └── global.css
```

가드레일이 SKILL.md에 들어 있고, 세부 레퍼런스는 `references/` 아래에 주제별로 분리되어 있다. 블로그 작업에서 자주 필요한 멀티 컨셉 패턴들(RSS, 페이지네이션, 태그 페이지 + 중첩 페이지네이션, Shiki 다크모드, MDX 컴포넌트 오버라이드, 읽기 시간, 목차, 이전/다음 글)은 `blog-recipes.md`에 모아뒀다. 이런 건 여러 개념이 얽혀 있어서 MCP 검색 한 번으로는 올바른 코드가 나오지 않는다.

`client:load` vs `client:idle` vs `client:visible` 선택, Actions vs API routes, 프리렌더 vs 온디맨드 같은 의사결정 프레임워크도 포함되어 있다. `templates/`에는 Astro 6 + Tailwind v4 기준 드롭인 설정 파일이 들어 있다.

---

## 쓰는 법

Claude Code 기준으로는 스킬 디렉토리에 클론하고 CLAUDE.md에 경로를 추가하면 된다.

```bash
git clone https://github.com/gigio1023/astro-dev-skill.git ~/.claude/skills/astro-dev-skill
```

Astro Docs MCP와 같이 쓰면 MCP가 최신 문서 검색을, 스킬이 가드레일과 레시피를 담당하는 구조가 된다.

```json
{
  "mcpServers": {
    "astro-docs": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/astro-docs-mcp"]
    }
  }
}
```

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)
