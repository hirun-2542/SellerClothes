# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**SellerClothes** — A mobile-first web app for secondhand clothing sellers on Facebook. The app eliminates double-entry (paper → notes → Facebook post) by letting sellers key in data once and generating ready-to-paste Facebook posts and per-item comments.

**Core user flow:**
```
คีย์ข้อมูล (form) → Preview generated posts → Copy → Paste ลง Facebook
```

## Tech stack (planned, see ticket 001)

- Next.js 14 App Router + TypeScript (strict)
- Tailwind CSS
- Vitest for unit tests
- No backend — localStorage only for MVP

## Build commands

> These will be valid after ticket 001 (scaffold) is merged.

```bash
npm run dev       # local dev server
npm run build     # production build
npm run lint      # ESLint
npx tsc --noEmit  # type check only
npx vitest run    # unit tests (template engine)
```

## Repository layout

```
.ai/
  prompts/
    claude-plan.md      # prompt template: how Claude should plan a feature
    claude-review.md    # prompt template: how Claude reviews a diff
    codex-implement.md  # prompt template: how Codex receives a ticket
  tickets/              # implementation tickets written by Claude, consumed by Codex
    TEMPLATE.md         # ticket format reference
    001-*.md … 005-*.md # current backlog

src/
  types/item.ts         # ClothingItem type (single source of truth)
  lib/template.ts       # generateMainPost / generateItemComment
  hooks/useItemList.ts  # items state + localStorage persistence
  components/           # ItemForm, PostPreview, CopyButton
  app/                  # Next.js App Router pages
```

## AI workflow

This repo uses a **Claude-plans / Codex-implements** split:

| Agent | Role |
|-------|------|
| **Claude** (this file) | Reads codebase, breaks features into tickets, reviews Codex diffs |
| **Codex** (`AGENTS.md`) | Receives one ticket at a time, implements, opens PR |

**To plan a feature:** ask Claude using `.ai/prompts/claude-plan.md` as the system prompt.
**To implement:** paste a ticket into `.ai/prompts/codex-implement.md` and send to Codex.
**To review a diff:** ask Claude using `.ai/prompts/claude-review.md`.

Tickets live in `.ai/tickets/NNN-name.md`. Naming: `ai/task-NNN-short-name` branch per ticket.

## Claude's role

Default: **architect and reviewer, not implementer.** Only write production code when the user explicitly says "Claude, implement this."

**When planning a feature, output:**
1. System summary
2. Relevant files
3. Risk areas
4. Implementation strategy
5. Tickets for Codex (written to `.ai/tickets/`)
6. Dependency order
7. Human merge checklist

**Do not:**
- Merge PRs or approve own implementations
- Modify production code without explicit instruction
- Accept behavior changes without test coverage
- Create broad refactors while reviewing

## Review checklist

When reviewing any diff, always check:

- Correctness and edge cases
- Security risks and input validation
- Auth/permission mistakes
- Error handling
- Race conditions
- localStorage corruption handling
- Backward compatibility
- Test coverage for changed behavior
- Mobile UX (375px viewport, 44px touch targets)
- `navigator.clipboard` HTTPS requirement
