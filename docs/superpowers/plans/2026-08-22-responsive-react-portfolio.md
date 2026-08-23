# Responsive React Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a responsive Vite + React portfolio that reproduces the supplied PDF screens while working reliably on GitHub Pages.

**Architecture:** A single static React application in `Web/` uses hash-based view state, data-driven content, shared shell components, and CSS tokens for the reference design. Static support files provide 404, privacy, crawl, and social metadata; GitHub Actions builds and uploads `Web/dist`.

**Tech Stack:** Vite 7, React 19, TypeScript, Vitest, Testing Library, CSS, Lucide React, GitHub Pages Actions

**Spec:** `docs/superpowers/specs/2026-08-22-responsive-react-portfolio-design.md`

## Global Constraints

- Work in `C:\Users\koi\Coding\koi312500` on `codex/react-portfolio-redesign`.
- Preserve unrelated existing files under `docs/` and do not expose the user's phone number.
- Use `/koi312500/` as the GitHub Pages base path.
- Main navigation must use `#about`, `#skills`, `#projects`, and `#timeline`.
- The 1920x1080 PDF is a visual reference, not a fixed viewport requirement.
- Write behavior tests before production behavior and verify each expected failure.

---

### Task 1: Vite foundation and routing model

**Files:**
- Create: `Web/package.json`, `Web/package-lock.json`, `Web/tsconfig.json`, `Web/tsconfig.app.json`, `Web/tsconfig.node.json`, `Web/vite.config.ts`, `Web/src/main.tsx`, `Web/src/vite-env.d.ts`
- Create: `Web/src/lib/navigation.test.ts`, `Web/src/lib/navigation.ts`
- Replace: `Web/index.html`

**Interfaces:**
- Produces: `type ViewId = 'about' | 'skills' | 'projects' | 'timeline'`, `readView(hash): ViewId`, `viewMeta(view, language)`.

- [ ] Write tests asserting valid hashes, invalid-hash fallback, and per-view English/Korean titles.
- [ ] Run the navigation test and verify it fails because the module does not exist.
- [ ] Add the minimal navigation implementation and Vite foundation.
- [ ] Run the test and verify it passes.
- [ ] Commit the foundation.

### Task 2: PDF-faithful shell and About view

**Files:**
- Create: `Web/src/App.test.tsx`, `Web/src/App.tsx`, `Web/src/styles.css`
- Create: `Web/src/components/AppShell.tsx`, `Web/src/components/BrandHeader.tsx`, `Web/src/components/BottomNav.tsx`, `Web/src/components/SkillBadge.tsx`, `Web/src/views/AboutView.tsx`
- Create: `Web/src/data/content.ts`, `Web/src/types.ts`

**Interfaces:**
- Consumes: `ViewId`, `readView`, and `viewMeta` from Task 1.
- Produces: `App`, shared shell components, typed localized content, and the recognizable About preview.

- [ ] Write component tests for identity text, four navigation links, active About state, language toggle, theme toggle, and no telephone text.
- [ ] Run the App test and verify it fails because the components do not exist.
- [ ] Implement the smallest coherent About screen with the dotted background and responsive shell.
- [ ] Run tests and build, then start the development preview and verify the exact local URL responds.
- [ ] Open the first meaningful preview in Codex before broadening the source.
- [ ] Commit the About slice.

### Task 3: Skills, Projects, case studies, and Timeline

**Files:**
- Create: `Web/src/views/SkillsView.tsx`, `Web/src/views/ProjectsView.tsx`, `Web/src/views/TimelineView.tsx`
- Create: `Web/src/components/ProjectCard.tsx`, `Web/src/components/CaseStudyDialog.tsx`
- Modify: `Web/src/App.test.tsx`, `Web/src/App.tsx`, `Web/src/data/content.ts`, `Web/src/styles.css`

**Interfaces:**
- Consumes: localized content and shared shell.
- Produces: all four hash views and accessible project details.

- [ ] Add failing tests for each routed view, project external links, dialog open/close, and Escape dismissal.
- [ ] Run the focused tests and verify they fail for the missing views.
- [ ] Implement data-driven Skills, Projects, and Timeline screens plus the case-study dialog.
- [ ] Run all tests and verify they pass.
- [ ] Commit the complete portfolio views.

### Task 4: SEO, privacy, 404, and analytics guard

**Files:**
- Create: `Web/src/lib/analytics.test.ts`, `Web/src/lib/analytics.ts`
- Create: `Web/public/robots.txt`, `Web/public/sitemap.xml`, `Web/public/404.html`, `Web/public/privacy/index.html`, `Web/public/og.png`
- Modify: `Web/index.html`, `Web/src/main.tsx`

**Interfaces:**
- Produces: `initAnalytics(measurementId?: string): boolean`, static support pages, and share metadata.

- [ ] Write tests proving Analytics stays disabled without an ID and initializes only once with a valid `G-` ID.
- [ ] Run the analytics test and verify it fails because the module does not exist.
- [ ] Implement the guarded loader and add Person JSON-LD, canonical, OG/X metadata, crawl files, privacy, and branded 404.
- [ ] Run all tests and verify they pass.
- [ ] Commit SEO and support files.

### Task 5: GitHub Pages build and responsive verification

**Files:**
- Modify: `.github/workflows/static.yml`, `README.md`
- Modify as needed from QA: `Web/src/styles.css`, `Web/src/*.tsx`, `Web/src/views/*.tsx`

**Interfaces:**
- Consumes: the complete static Vite application.
- Produces: `Web/dist` suitable for GitHub Pages and documented local/deployment usage.

- [ ] Update the workflow to install, test, build, and upload `Web/dist`.
- [ ] Run `npm test`, `npm run build`, and inspect generated base-path asset references.
- [ ] Use the in-app browser to compare About, Skills, and Projects at desktop reference size and test 1366x768, tablet, and mobile layouts.
- [ ] Correct observed visual, overflow, keyboard, or contrast defects and rerun tests/build.
- [ ] Run the final verification suite and inspect the Git diff for unrelated or private content.
- [ ] Commit the verified GitHub Pages version and push the feature branch for user review before merging to `master`.
