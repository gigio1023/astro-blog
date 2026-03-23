---
title: "AI 에이전트는 Astro 코드를 망친다 — Agent Skill로 해결한 이야기"
description: "AI 에이전트가 Astro 6 코드를 자신있게 망치는 이유와, MCP만으로 부족한 이유, 그리고 이를 해결하기 위해 Agent Skill을 만든 과정."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "astro", "mcp", "claude-code", "agent-skill"]
draft: false
lang: ko
---

- AI 에이전트는 Astro 코드를 자신있게 망친다. Astro 6의 breaking change를 모르기 때문이다.
- Astro Docs MCP는 "질문에 답"을 하지만, 에이전트가 질문하지 않는 잘못된 코드를 막지는 못한다.
- Agent Skill은 MCP를 대체하는 게 아니라 보완한다. 가드레일, 멀티 컨셉 레시피, 의사결정 프레임워크를 제공한다.
- 이 스킬을 만들게 된 배경과 구조를 공유한다.

---

## 문제: AI 에이전트 + Astro = 확정적 참사

이 블로그는 Astro로 만들어져 있다. Claude Code, Cursor 등으로 블로그 작업을 하다 보면 에이전트가 생성하는 Astro 코드가 엉망인 경우가 대부분이다. Astro에 매우 익숙한 사람이 아니라면 에이전트가 만든 코드가 왜 안 되는지조차 파악하기 어렵다.

핵심 문제는 에이전트가 **자기가 모르는 것을 모른다**는 점이다. Astro 6에서 대규모 breaking change가 있었는데, 에이전트의 학습 데이터에는 Astro 3/4/5 패턴이 압도적으로 많다. 결과적으로 에이전트는 옛날 패턴을 자신있게 생성하고, 그게 틀렸다는 사실을 인지하지 못한다.

실제로 겪은 사례들을 보자.

### `entry.render()` → `render(entry)`

Astro 6에서 `render()`는 entry의 메서드가 아니라 standalone 함수로 바뀌었다.

```ts
// 에이전트가 생성하는 코드 (Astro 5 이하)
const { Content } = await post.render()

// Astro 6 올바른 패턴
import { render } from 'astro:content'
const { Content } = await render(post)
```

이건 에러 메시지도 직관적이지 않아서 Astro를 잘 모르면 원인 파악이 어렵다.

### `Astro.glob()` 삭제

에이전트가 `Astro.glob()`을 사용하면 Astro 6에서는 아예 존재하지 않는 API를 호출하는 것이다.

```ts
// 에이전트가 생성하는 코드 (삭제된 API)
const posts = await Astro.glob('./posts/*.md')

// Astro 6 올바른 패턴
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

### Zod 4 문법 변경

Astro 6는 Zod 4를 사용한다. 에이전트는 Zod 3 문법을 생성한다.

```ts
// 에이전트가 생성하는 코드 (Zod 3)
import { defineCollection, z } from 'astro:content'
z.string().email()

// Astro 6 + Zod 4 올바른 패턴
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

import 경로부터 다르고, validator 메서드 체이닝 방식도 달라졌다. 에이전트가 이걸 맞출 확률은 거의 없다.

### Content Collections의 `loader` 필수화

```ts
// 에이전트가 생성하는 코드 (Astro 5 이하)
const blog = defineCollection({ schema: z.object({...}) })

// Astro 6 올바른 패턴
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

`loader`가 필수이고, schema는 함수 형태로 `image()` 같은 헬퍼를 받는다. 설정 파일 위치도 `src/content/config.ts`에서 `src/content.config.ts`로 바뀌었다. 에이전트는 이 중 아무것도 모른다.

이런 사례가 20개 정도 된다.

---

## MCP가 있는데 왜 부족한가?

Astro Docs MCP가 있다. `search_astro_docs()`로 공식 문서를 검색할 수 있고, 문서화도 잘 되어 있다. 이 블로그에서도 MCP를 사용하고 있다.

하지만 MCP는 **에이전트가 질문할 때만 동작**한다. 문제는 에이전트가 `entry.render()`를 쓸 때 MCP에 "render 함수가 어떻게 바뀌었나요?"라고 질문하지 않는다는 것이다. 에이전트는 자기가 알고 있는 패턴이 맞다고 확신하고 그냥 코드를 생성한다.

정리하면:

| 상황 | MCP | Agent Skill |
|------|-----|-------------|
| "paginate() 어떻게 쓰나요?" | 검색해서 답변 가능 | reference 파일 참조 |
| 에이전트가 `entry.render()` 생성 | 질문 자체를 안 함 → 개입 불가 | 가드레일로 사전 차단 |
| 태그 페이지 + 페이지네이션 구현 | 한 번의 검색으로는 불완전 | 멀티 컨셉 레시피 제공 |
| Actions vs API routes 선택 | 양쪽 다 설명 | 의사결정 프레임워크 제공 |

MCP는 **"어떻게?"**에 답하고, Agent Skill은 **"그렇게 하면 안 돼"**를 말해주는 역할이다. 둘은 대체 관계가 아니라 보완 관계다.

---

## Agent Skill이란

Agent Skill은 AI 에이전트에게 도메인 지식을 주입하는 방법이다. Claude Code, Codex CLI, Cursor 등 40개 이상의 코딩 에이전트에서 사용할 수 있다. 에이전트가 코드를 생성하기 전에 참조하는 가이드라인이라고 생각하면 된다.

MCP가 "외부 도구 호출 표준"이라면, Agent Skill은 "에이전트의 내부 지식 확장"이다.

### MCP와의 관계

```
┌─────────────┐     ┌──────────────────┐
│  Agent Skill │     │   Astro Docs MCP │
│              │     │                  │
│  가드레일     │     │  문서 검색        │
│  레시피       │     │  API 레퍼런스     │
│  결정 프레임워크│    │  설정 옵션        │
└──────┬───────┘     └────────┬─────────┘
       │                      │
       └──────────┬───────────┘
                  │
          ┌───────▼───────┐
          │   AI Agent    │
          │ (코드 생성)    │
          └───────────────┘
```

Agent Skill이 에이전트의 코드 생성 품질을 높이고, MCP가 최신 문서에 대한 접근을 제공한다.

---

## astro-dev Skill 구조

만든 스킬의 구조는 다음과 같다.

```
skills/astro-dev/
├── SKILL.md                    # 진입점: 20개 가드레일 + 라우터
├── references/
│   ├── astro-core-patterns.md  # Core API, 스타일, 스크립트, 미들웨어
│   ├── content-collections.md  # 빌드/라이브 컬렉션, 로더, Zod 4
│   ├── blog-recipes.md         # RSS, 페이지네이션, 태그, SEO, TOC
│   ├── tailwind.md             # Vite 플러그인, CSS 테마, 폰트 API
│   ├── islands-and-hydration.md # client 디렉티브, 상태 공유, 서버 아일랜드
│   ├── actions-and-forms.md    # Actions API, 유효성 검사
│   ├── view-transitions.md     # ClientRouter 라이프사이클, FOUC 방지
│   ├── server-features.md      # 프리렌더/온디맨드, 세션, 환경변수, i18n
│   └── doc-endpoints.md        # MCP 설정, LLM 최적화 문서 URL
└── templates/
    ├── astro.config.ts         # Astro 6 + Tailwind v4 드롭인 설정
    ├── content.config.ts       # Content Collections 설정
    └── global.css              # Tailwind v4 CSS 엔트리포인트
```

### 핵심 구성요소

**1. 20개 가드레일**

에이전트가 반복적으로 틀리는 패턴을 정리했다. 위에서 본 4개 외에도:

- Tailwind v4는 CSS 네이티브 설정을 사용한다 (JS config 아님)
- `client:load`를 모든 컴포넌트에 붙이면 안 된다 (용도별 선택)
- 폼은 Actions API를 사용해야 한다 (수동 API route 아님)
- 쿠키/세션은 온디맨드 렌더링이 필수다
- 환경변수는 `astro:env`를 써야 한다 (`process.env` 아님)
- `<ClientRouter />`에서는 `astro:page-load` 이벤트를 사용해야 한다
- 등등

각 가드레일은 실제 에이전트 실패 사례에서 식별된 것이다.

**2. 9개 블로그 레시피**

블로그 개발에서 자주 필요한 멀티 컨셉 패턴들이다. 에이전트가 하나의 MCP 검색으로는 제대로 구현하기 어려운 것들이다.

- RSS + Content Collections
- 페이지네이션 (`paginate()` + `getStaticPaths`)
- 태그 페이지 + 중첩 페이지네이션 (`flatMap` + `paginate()`)
- Shiki 다크모드 (`.astro-code` 클래스, `--shiki-*`가 아님)
- MDX 컴포넌트 오버라이드
- SEO 메타 레이아웃
- 읽기 시간 (remark 플러그인)
- 목차 (headings 배열 활용)
- 이전/다음 글 네비게이션

**3. 4개 의사결정 프레임워크**

에이전트가 잘 못 고르는 선택지들에 대한 가이드:

- `client:load` vs `client:idle` vs `client:visible` — 긴급도와 위치 기반 결정 트리
- Actions vs API routes — 폼/뮤테이션은 Actions, 웹훅/스트리밍은 API routes
- 프리렌더 vs 온디맨드 — 쿠키, 세션, 폼, 라이브 컬렉션이면 온디맨드 필수
- 어댑터 선택 — Node/Vercel/Netlify/Cloudflare, 온디맨드 기능이 있을 때만 필요

---

## Quick Router

SKILL.md에는 에이전트가 작업에 따라 어떤 레퍼런스 파일을 읽어야 하는지 안내하는 라우터가 있다. 모든 모듈을 한꺼번에 로드하지 않고 필요한 것만 읽도록 설계했다.

| 작업 | 읽어야 할 파일 |
|------|-------------|
| 프로젝트 셋업 / Core API | `astro-core-patterns.md` |
| Content Collections | `content-collections.md` |
| 블로그 기능 (RSS, 페이지네이션 등) | `blog-recipes.md` |
| Tailwind CSS | `tailwind.md` |
| 클라이언트 디렉티브 / 하이드레이션 | `islands-and-hydration.md` |
| 폼, Actions | `actions-and-forms.md` |
| View Transitions | `view-transitions.md` |
| 세션, 환경변수, i18n | `server-features.md` |
| MCP 설정, 문서 URL | `doc-endpoints.md` |

---

## 사용법

### Claude Code

```bash
# 1. 스킬 디렉토리에 클론
git clone https://github.com/gigio1023/astro-dev-skill.git ~/.claude/skills/astro-dev-skill

# 2. 프로젝트 CLAUDE.md에 스킬 경로 추가
```

### Astro Docs MCP와 함께 사용

이 스킬은 Astro Docs MCP와 함께 사용할 때 가장 효과적이다. MCP는 최신 문서 검색을, 스킬은 가드레일과 레시피를 담당한다.

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

## 마무리

[이전 글](../agent-library-review-with-mcp)에서 agent 라이브러리들의 미성숙함에 대해 이야기했었다. Agent Skill은 그 문제의 일부를 해결하는 방법이다. 에이전트의 능력 자체를 바꾸는 건 아니지만, 도메인 지식을 주입해서 "아는 척하며 틀리는" 상황을 크게 줄일 수 있다.

Astro 외에도 프레임워크마다 이런 스킬이 있다면 에이전트를 활용한 개발 경험이 많이 나아질 거라 생각한다. 오픈소스로 공개해뒀으니 기여나 피드백은 환영한다.

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)
