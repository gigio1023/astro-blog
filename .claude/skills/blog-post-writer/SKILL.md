---
name: blog-post-writer
description: "Use when the user asks to write a blog post, draft a post, or provides free-form topics/thoughts/opinions to turn into a blog post. Also use when editing or rewriting existing blog posts in src/content/blog/."
---

# Blog Post Writer

이 블로그의 포스트를 작성하는 스킬. 유저가 주제, 생각, 의견을 자유롭게 입력하면 이 블로그의 톤과 구조에 맞는 포스트를 생성한다.

## Workflow

1. 유저 입력을 받는다 (주제, 메모, 의견 등 자유 형식)
2. 기존 포스트 2-3개를 읽어서 현재 톤을 확인한다 (`src/content/blog/` 아래 최근 글)
3. 한국어 초안(index.md)을 작성한다
4. 영문 버전(index.en.md)을 작성한다
5. 이탈리아어 버전(index.it.md)을 작성한다
6. `references/anti-patterns.md`를 읽고 AI 패턴이 없는지 검토한다
7. `astro build`로 빌드가 되는지 확인한다

## Post Structure

### 파일 위치
```
src/content/blog/{slug}/
├── index.md      # 한국어 (기본)
├── index.en.md   # 영문
└── index.it.md   # 이탈리아어
```

모든 포스트는 한국어, 영어, 이탈리아어 3개 언어로 작성한다.

### Frontmatter

한국어 (index.md):
```yaml
---
title: "제목"
description: "한 줄 설명"
date: "YYYY-MM-DDTHH:mm:ss+09:00"  # KST
tags: ["tag1", "tag2"]
draft: false
lang: ko
---
```

영어/이탈리아어 (index.en.md, index.it.md):
```yaml
---
title: "Title"
description: "One-line description"
date: "YYYY-MM-DDTHH:mm:ss+09:00"  # 한국어와 동일한 날짜
tags: ["tag1", "tag2"]              # 한국어와 동일한 태그
draft: false
lang: en  # or it
translationOf: "slug"               # 한국어 포스트의 slug
---
```

**description**: 짧고 건조하게. "." 한 글자도 괜찮다. AI처럼 구조화된 설명 금지.

**tags**: 아래 기존 태그 중에서 선택. 새 태그는 유저에게 확인 후 추가.
- 주요: `algorithm`, `nlp`, `dl`, `ml`, `pytorch`, `python`, `computer-vision`
- 인프라/도구: `dev-tools`, `mlops`, `ml-engineering`
- 기타: `agent`, `agent-skill`, `paper-review`, `data-viz`, `quant-trading`, `ethics`, `naver-boostcamp`, `ai-competition`, `rabbit-hole`

### 본문 구조

글 상단에 불릿 요약 3-4개를 둔다. 글의 핵심 takeaway를 먼저 보여주는 용도.

```markdown
- 첫 번째 포인트
- 두 번째 포인트
- 세 번째 포인트

---

본문 시작...
```

본문은 줄글 위주로 풀어간다. 헤더(`##`)는 주제 전환에만 쓴다.

---

## Writing Voice

이 블로그 저자의 문체 특성. **반드시** 이 톤을 유지해야 한다.

### 톤

- **건조하고 담담하다.** 흥분하거나 화내지 않는다. 감정 표현은 절제되어 있다.
- **1인칭 서술.** "나"를 쓴다. 자기 경험에서 출발한다.
- **줄글 위주.** 불릿 나열보다 문장으로 풀어간다. 불릿은 상단 요약이나 짧은 나열에만 쓴다.
- **헤징을 자연스럽게 쓴다.** "~인 것 같다", "~수도 있다", "~지 않을까 싶다" 같은 표현이 자연스럽게 섞인다.
- **자기 의심을 드러낸다.** "이건 내가 잘못 확인했을 수도 있다", "처음에는 내가 프롬프트를 잘못 쓰나 싶었는데" 같은 표현.
- **단정하지 않는다.** "확정적 참사", "반드시 ~해야 한다" 같은 단정적 표현을 피한다.
- **코드는 탐구 과정의 일부로 보여준다.** 튜토리얼처럼 "다음 코드를 보세요"가 아니라 "에이전트한테 시키니까 이렇게 뱉었다" 같은 맥락으로 자연스럽게 등장한다.

### 하지 말 것

- 이전 포스트와 억지로 연결짓지 마라 ("이전 글에서 ~했었다" 같은 패턴)
- "마무리" 같은 선언적 마감을 쓰지 마라
- em-dash(—)로 제목을 구성하지 마라
- "짜증난다", "화가 난다" 같은 직접적 감정 표현을 쓰지 마라
- 홍보성 마무리를 쓰지 마라 ("오픈소스로 공개했으니 기여 환영")
- ASCII 다이어그램을 넣지 마라
- 모든 독자가 아는 것을 설명하지 마라 (agent skill이 뭔지 등)

### 번역 버전 (영어, 이탈리아어)

3개 언어 모두 같은 구조와 내용을 유지하되, 각 언어 독자에게 자연스러운 톤으로 다시 쓴다. 직역하지 않는다.

- 건조한 톤은 모든 언어에서 동일하게 유지한다
- 영어: AI filler ("It's worth noting", "At its core", "leverage", "utilize") 금지. `references/anti-patterns.md`의 영문 섹션 참조.
- 이탈리아어: 자연스러운 이탈리아어 산문체. 영어 기술 용어는 이탈리아어에서도 그대로 쓴다 (agent, skill, guardrail, MCP 등). 과도한 격식체(Lei form)는 피하고 비인칭 또는 1인칭으로 쓴다.

---

## Anti-Patterns

글 작성 후 반드시 `references/anti-patterns.md`를 읽고 검토한다. AI스러운 패턴이 있으면 수정한다.

## Templates

`templates/` 디렉토리에 포스트 템플릿이 있다. frontmatter 형식 참고용.
