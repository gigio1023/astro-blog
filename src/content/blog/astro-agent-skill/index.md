---
title: "Astro 블로그를 위한 Agent Skill을 만들었다"
description: "에이전트가 Astro 6 코드를 반복적으로 틀리길래, 스킬을 하나 만들어봤다."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "agent-skill"]
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

스킬을 만들면서 Thariq의 [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378)를 참고했다. Anthropic 내부에서 수백 개의 스킬을 운영하면서 나온 이야기인데, gotchas 중심으로 만들라거나 progressive disclosure를 하라는 것 같은 기본적인 내용 외에 몇 가지 참고할 만한 포인트가 있었다.

**description 필드는 모델을 위한 것이다.** Claude Code는 세션이 시작될 때 설치된 모든 스킬의 description을 스캔해서 "이 요청에 맞는 스킬이 있나?"를 판단한다. 즉 description은 사람이 읽는 요약이 아니라 모델이 트리거 여부를 결정하는 조건이다. 이걸 읽고 description을 꽤 길게 다시 썼다.

```yaml
description: "Use when editing .astro/.mdx files, modifying astro.config.*,
  working with content collections (build-time or live),
  adding Tailwind CSS v4, using client directives (client:load/idle/visible),
  handling forms/actions with Zod 4, configuring server features
  (sessions, i18n, env vars, CSP, Cloudflare Workers),
  using view transitions or ClientRouter (<ClientRouter />),
  or setting up adapters (Node/Vercel/Netlify/Cloudflare) in an Astro project."
```

에이전트가 `.astro` 파일을 수정하거나 `astro.config`를 건드릴 때 이 스킬이 자동으로 트리거되도록 조건을 구체적으로 나열한 것이다. "Astro 개발 도우미"같은 요약으로 쓰면 트리거 타이밍이 모호해진다.

**에이전트에게 코드를 줘서 composition에 턴을 쓰게 하라.** 스킬에 스크립트나 템플릿을 포함하면 에이전트가 보일러플레이트를 처음부터 만드는 대신 조합하는 데 시간을 쓴다는 이야기다. 이 스킬에서는 `templates/` 디렉토리에 Astro 6 + Tailwind v4 기준 설정 파일을 넣어뒀다.

```
templates/
├── astro.config.ts    # Astro 6 + Tailwind v4 + MDX + Fonts API
├── content.config.ts  # Content Collections with glob loader
└── global.css         # Tailwind v4 CSS entry point
```

에이전트가 프로젝트를 셋업할 때 이 파일들을 복사해서 시작하면 설정에서 틀릴 여지가 줄어든다. 가드레일이 "이렇게 쓰면 안 돼"를 말해주는 거라면, 템플릿은 "이걸 복사해서 시작해"를 말해주는 쪽이다.

가드레일 자체는 에이전트가 틀리는 걸 볼 때마다 하나씩 추가하는 방식으로 만들었다. 처음부터 20개를 설계한 게 아니다. 글에서도 "Most of ours began as a few lines and a single gotcha, and got better because people kept adding to them"이라고 하는데 실제로 그렇게 된다.

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
