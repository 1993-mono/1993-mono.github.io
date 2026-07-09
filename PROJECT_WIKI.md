# PROJECT WIKI

> **Purpose**: Single source of truth for project direction, current state, and progress.  
> **Audience**: Maintainer + AI assistants. Not published on the site.  
> **Language**: English (all project files, commits, and docs). Conversation with AI may stay in Korean until fluency goal is reached.

---

## North Star

Build **DevFolio** — a portfolio site that demonstrates readiness for overseas software roles.

This is not just a showcase of finished work. It is a living record of:

1. **What I can build** → Portfolio
2. **How I learn and grow** → Dev Log (tech + English)
3. **Where I am headed** → Roadmap (public-facing summary)

**Ultimate goal**: Communicate in English across development — code, docs, commits, and AI pair programming.

---

## Goals

| Area | Goal |
|------|------|
| Portfolio | Present completed projects with clear impact for international recruiters |
| Dev Log | Document technical learning and English practice with visible progress |
| Site quality | Polished, responsive, accessible personal site built with modern stack |
| English | Shift all project artifacts to English; eventually converse in English with AI |
| Roadmap | Keep public progress transparent without exposing internal planning noise |

---

## Content Strategy

### Public site (`content/`, `src/app/`)

| Section | Route | Role | Tone |
|---------|-------|------|------|
| About | `/` | Who I am, what this site is | Concise, recruiter-friendly |
| Portfolio | `/portfolio` | Finished projects, impact-focused | Results over process |
| Dev Log | `/devlog` | Learning notes, build logs | Mix of English content + Korean reflections OK |
| Roadmap | `/roadmap` | Checklist summary of plans & progress | English, scannable |

### Dev Log folder conventions

```
content/devlog/
├── Language/
│   ├── Javascript/     # Technical learning
│   ├── Markdown/         # Tooling & writing
│   └── English/          # English study traces (planned)
├── News/                 # Industry notes
└── Log/                  # Build / project logs (folder exists, no posts yet)
```

**Rule**: Portfolio shows outcomes. Dev Log shows the journey. Do not let study notes overshadow project results on the main navigation experience.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Sass |
| State | Zustand |
| Content | Markdown (`gray-matter`, `remark`, `rehype`) |
| Animation | Framer Motion |
| Icons | Heroicons |
| Font | Pretendard |
| Package manager | Yarn 4 |
| Deploy target | GitHub Pages (`1993-mono.github.io`) |

### Key scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Dev server + devlog index watcher |
| `yarn build` | Generate devlog index + production build |
| `yarn devlog:index` | Regenerate `.devlog-index.json` |

---

## Current State

**Last updated**: 2026-07-09

### Done

- [x] Next.js app scaffold with App Router
- [x] Header navigation (About, Portfolio, Dev Log, Roadmap)
- [x] Responsive layout (PC / mobile detection via Zustand)
- [x] Dev Log: folder tabs, post list, dynamic `[...slug]` pages
- [x] Dev Log: TOC sidebar, markdown rendering pipeline
- [x] Dev Log index auto-generation (`scripts/generate-devlog-index.js`)
- [x] Roadmap page reading `content/roadmap/roadmap.md`
- [x] Dev Log posts: JavaScript getting started, Markdown guide, OpenClaw news note

### In progress / early stage

- [ ] About page — placeholder content only
- [ ] Portfolio — empty state ("No projects here yet")
- [ ] Dark mode — not started
- [ ] Tablet layout — not started
- [ ] Mobile menu — does not auto-close on link click
- [x] English dev log category — `content/devlog/Language/English/` created
- [ ] English dev log — study notes for first post (in progress)

---

## Architecture (brief)

```
src/
├── app/                  # Pages & layouts
│   ├── page.tsx          # About (home)
│   ├── portfolio/
│   ├── devlog/
│   └── roadmap/
├── lib/
│   ├── constants.ts      # SITE_NAME, MENU
│   ├── devlog.ts         # Dev log file system helpers
│   ├── roadmap.ts        # Roadmap markdown → HTML
│   └── markdown.ts       # Unified remark/rehype pipeline
└── stores/               # Zustand (responsive, devlog tabs)

content/
├── devlog/               # Markdown posts (auto-indexed)
└── roadmap/
    └── roadmap.md        # Public checklist (derived from this wiki)
```

---

## Checklists

> **Roadmap sync**: Copy checklist sections below into `content/roadmap/roadmap.md` for the public site.  
> Keep roadmap concise — details and rationale stay here.

### Dev Log — Technical

- [ ] Javascript
- [ ] React
- [ ] Next.js
- [ ] Typescript
- [ ] React Native

### Dev Log — English (planned)

- [x] Create `content/devlog/Language/English/` folder
- [ ] Write first post: technical reading notes in English (passage added; study notes pending)
- [ ] Practice commit message / PR description patterns
- [ ] Summarize interview Q&A in English

### Portfolio

- [ ] Implement gallery layout
- [ ] Design project cards
- [ ] Add filtering (optional)
- [ ] Add first real project entry

### About

- [ ] Build page layout
- [ ] Add visual elements
- [ ] Write recruiter-friendly bio (English)

### Responsive

- [ ] Optimize mobile layout
  - Layout adjustments for small screens
  - Fix: mobile menu should close when a nav link is clicked
- [ ] Support tablet viewport
  - Intermediate layout between mobile and desktop

### Dark Mode

- [ ] Define dark mode color palette
  - CSS variables for theme tokens
- [ ] Implement dark mode toggle
  - Detect system preference
  - Manual toggle button
  - Persist user preference

### Infrastructure & DX

- [ ] Replace default README with project-specific docs
- [ ] Set up GitHub Pages deployment workflow
- [ ] Add OG meta / SEO basics

---

## Roadmap Sync Rules

1. **Source of truth for planning** → `PROJECT_WIKI.md` (this file)
2. **Public display** → `content/roadmap/roadmap.md`
3. When updating progress:
   - Edit checklists here first (add context, notes, rationale)
   - Copy summarized checklist items to `roadmap.md`
   - Do not duplicate long explanations on the public roadmap
4. Mark items `[x]` in both files when completed, or only here if the item is internal-only

---

## English Learning Strategy

| Practice | Where |
|----------|-------|
| Code, variable names, comments | `src/` |
| Commits & PR descriptions | Git |
| Documentation & planning | `PROJECT_WIKI.md`, `README.md` |
| Technical writing | `content/devlog/Language/English/` |
| AI pair programming | Gradual shift from Korean → English conversation |

**Principle**: English in artifacts first. Conversational fluency with AI follows naturally from daily practice.

---

## Notes for AI Assistants

When working on this project:

1. Read this file first to understand direction and current position
2. Write all code comments, docs, and commit messages in **English**
3. Respond to the maintainer in **Korean** unless asked otherwise
4. Prefer minimal, focused diffs — match existing conventions in `src/`
5. Do not delete existing code without explicit confirmation
6. Checklist changes: update here, then sync relevant items to `content/roadmap/roadmap.md`
7. CSS suggestions: propose one inline change at a time; wait for approval before writing

### Site identity

- **Name**: DevFolio (`SITE_NAME` in `src/lib/constants.ts`)
- **Tagline idea**: Dev — ideas turned into work. Folio — pieces collected like loose sheets of paper.

---

## Changelog (wiki)

| Date | Update |
|------|--------|
| 2026-07-09 | Initial wiki created. Defined north star, content strategy, checklists, and roadmap sync rules. |
| 2026-07-09 | Synced `content/roadmap/roadmap.md` with checklists. Added `.cursor/rules/project-wiki-roadmap.mdc`. |
| 2026-07-09 | Added first English dev log post: `01_why_i_built_devfolio.md`. |
