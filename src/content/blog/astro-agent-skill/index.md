---
title: "Astro 블로그를 AI 에이전트로 작업하면 안 되는 이유, 그리고 Agent Skill"
description: "에이전트가 Astro 6 코드를 자신있게 망치길래 Agent Skill을 만들었다."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "astro", "mcp", "claude-code", "agent-skill"]
draft: false
lang: ko
---

- 에이전트는 Astro 코드를 자신있게 망친다. Astro 6 breaking change를 모르기 때문이다.
- Astro Docs MCP는 좋은데, 에이전트가 질문 자체를 안 하면 소용이 없다.
- 그래서 Agent Skill을 만들었다. MCP를 대체하는 게 아니라 보완하는 용도다.
- 삽질 기록과 스킬 구조를 정리해봤다.

---

이 블로그는 Astro로 만들어져 있다. Claude Code나 Cursor로 블로그 작업을 하다 보면 에이전트가 뱉는 Astro 코드가 거의 다 틀린다. 처음에는 내가 프롬프트를 잘못 쓰나 싶었는데, 반복되니까 에이전트 쪽 문제라는 게 확실해졌다.

문제는 Astro 6에서 꽤 큰 breaking change가 있었다는 건데, 에이전트의 학습 데이터에는 Astro 3/4/5 시절 코드가 압도적으로 많다. 에이전트 입장에서는 자기가 아는 패턴이 맞다고 생각하니까 자신있게 옛날 코드를 생성한다. 자기가 모르는 걸 모르는 상태인 거다.

꽤 삽질을 많이 해서 어떤 패턴들이 문제인지 정리가 됐다.

## 에이전트가 반복적으로 틀리는 것들

### `entry.render()`가 안 된다

Astro 6에서 `render()`가 entry 메서드에서 standalone 함수로 바뀌었다. 에이전트한테 블로그 포스트 렌더링을 시키면 십중팔구 이렇게 뱉는다:

```ts
// 에이전트가 뱉는 코드
const { Content } = await post.render()
```

이러면 런타임에서 `post.render is not a function` 비슷한 에러가 나는데, Astro를 잘 모르면 이게 뭔 소린지 감이 안 온다. 올바른 패턴은 이거다:

```ts
import { render } from 'astro:content'
const { Content } = await render(post)
```

### `Astro.glob()`은 삭제됐다

에이전트가 포스트 목록을 가져올 때 `Astro.glob()`을 쓰는 경우가 많은데, Astro 6에서 아예 삭제된 API다.

```ts
// 삭제된 API
const posts = await Astro.glob('./posts/*.md')

// 이제는 이렇게 써야 한다
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

### Zod 4 문법이 다르다

이건 좀 짜증나는 부분인데, Astro 6는 Zod 4를 쓴다. import 경로부터 다르고 validator 체이닝도 달라졌다.

```ts
// 에이전트가 뱉는 코드 (Zod 3)
import { defineCollection, z } from 'astro:content'
z.string().email()

// Astro 6에서는 이렇게 바뀌었다
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

에이전트가 이걸 맞출 확률은 거의 없다.

### Content Collections에 `loader`가 필수다

이것도 큰 변경인데, 에이전트는 거의 모른다:

```ts
// 에이전트가 뱉는 코드
const blog = defineCollection({ schema: z.object({...}) })

// 실제로는 loader가 필수이고, schema도 함수 형태다
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

설정 파일 위치도 `src/content/config.ts`에서 `src/content.config.ts`로 바뀌었다. 에이전트는 이 중 아무것도 모른다.

이런 식으로 정리한 패턴이 20개 정도 된다. Tailwind v4가 CSS 네이티브 설정으로 바뀐 것, `client:load`를 모든 컴포넌트에 때려박는 것, `<ClientRouter />`에서 이벤트 리스너가 날아가는 것 등등.

---

## MCP가 있는데 왜 부족한가

[이전 글](../agent-library-review-with-mcp)에서 MCP에 대해 이야기했었는데, Astro Docs MCP도 있다. `search_astro_docs()`로 공식 문서를 검색할 수 있고 꽤 잘 동작한다. 이 블로그에서도 쓰고 있다.

근데 MCP는 에이전트가 질문할 때만 동작한다. 에이전트가 `entry.render()`를 쓸 때 "render 함수 바뀌었나?" 같은 질문을 MCP에 던지지 않는다. 자기가 아는 패턴이 맞다고 확신하니까 그냥 코드를 생성한다. 이게 근본적인 문제다.

MCP가 "이거 어떻게 쓰나요?"에 답해주는 거라면, 내가 필요했던 건 "그렇게 쓰면 안 돼"를 말해주는 무언가였다.

그래서 Agent Skill을 만들었다.

---

## Agent Skill이 뭔지

간단히 말하면 에이전트에게 도메인 지식을 주입하는 방법이다. Claude Code, Codex CLI, Cursor 같은 코딩 에이전트에서 쓸 수 있다. 에이전트가 코드를 생성하기 전에 참조하는 가이드라인이라고 보면 된다.

MCP가 외부 도구 호출 표준이라면, Agent Skill은 에이전트 내부의 지식을 늘려주는 쪽이다. MCP를 대체하는 게 아니고, MCP가 커버 못 하는 영역을 메꾸는 관계다.

- MCP: 에이전트가 "이거 어떻게 쓰나요?" 하고 물어볼 때 → 문서 검색해서 답해줌
- Agent Skill: 에이전트가 물어보지도 않고 틀린 코드를 쓸 때 → 사전에 "이건 틀린 패턴이야"라고 알려줌
- MCP: 한 번의 검색으로 하나의 개념을 설명
- Agent Skill: 태그 페이지 + 페이지네이션 같은 여러 개념이 얽힌 패턴을 한 번에 제공

둘 다 있어야 제대로 동작한다는 게 결론이었다.

---

## 만든 스킬 구조

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

크게 세 가지로 나뉜다.

**가드레일**이 핵심이다. 위에서 본 4개 외에도 Tailwind v4 설정, `client:` 디렉티브 선택, Actions API, 온디맨드 렌더링, 환경변수, ClientRouter 이벤트 등 에이전트가 반복적으로 틀리는 패턴 20개를 정리했다. 전부 실제로 에이전트가 틀린 걸 보고 추가한 것들이다.

**블로그 레시피**는 이 블로그를 만들면서 필요했던 것들이다. RSS, 페이지네이션, 태그 페이지 + 중첩 페이지네이션, Shiki 다크모드, MDX 컴포넌트 오버라이드, 읽기 시간, 목차, 이전/다음 글 네비게이션 등 9개. 이런 건 여러 개념이 얽혀 있어서 MCP 검색 한 번으로는 제대로 된 코드가 안 나온다.

**의사결정 프레임워크**는 에이전트가 선택지 앞에서 맞는 걸 고르도록 돕는다. `client:load` vs `client:idle` vs `client:visible`을 언제 쓰는지, Actions와 API routes 중 뭘 쓸지, 프리렌더와 온디맨드 중 뭘 고를지 같은 것들이다.

SKILL.md에는 에이전트가 작업에 따라 어떤 reference 파일을 읽어야 하는지 안내하는 라우터도 넣었다. 모든 걸 한꺼번에 로드하면 컨텍스트만 낭비되니까, 필요한 모듈만 읽도록 했다.

---

## 쓰는 법

Claude Code 기준으로는 스킬 디렉토리에 클론하고 프로젝트 CLAUDE.md에 경로를 추가하면 된다:

```bash
git clone https://github.com/gigio1023/astro-dev-skill.git ~/.claude/skills/astro-dev-skill
```

Astro Docs MCP와 같이 쓰는 걸 권장한다. MCP가 최신 문서 검색을, 스킬이 가드레일과 레시피를 담당하는 구조다:

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

---

[이전 글](../agent-library-review-with-mcp)에서 agent 라이브러리들이 아직 어설프다고 이야기했었다. 에이전트의 능력 자체를 바꾸는 건 어렵지만, 적어도 도메인 지식을 주입해서 "아는 척하며 틀리는" 상황은 줄일 수 있지 않을까 싶어서 만든 스킬이다. Astro 외에도 프레임워크마다 이런 게 있으면 좋겠다는 생각이 든다.

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)
