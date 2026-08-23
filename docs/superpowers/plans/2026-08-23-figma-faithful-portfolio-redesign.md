# Figma-Faithful Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing portfolio's visual system so the 1920 x 1080 desktop state closely matches Figma Frames 1, 6, and 7 while every view remains adaptive, accessible, and deployable to GitHub Pages.

**Architecture:** Keep the current React hash-navigation architecture and bilingual content model. Express the Figma measurements as a small set of CSS reference tokens and view-specific layout rules, then adapt them with bounded fluid spacing and existing breakpoints rather than scaling a fixed canvas. Preserve component behavior and move project detail density into the existing case-study dialog.

**Tech Stack:** Vite, React, TypeScript, CSS, Lucide React, Vitest, Testing Library, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-23-figma-faithful-portfolio-redesign-design.md`

## Global Constraints

- The 1920 x 1080 Figma frames are desktop calibration targets, not a fixed canvas.
- Do not use letterboxing, `transform: scale()`, or viewport-wide uniform scaling.
- Preserve hash routes `#about`, `#skills`, `#projects`, and `#timeline`.
- Preserve English/Korean switching, light/dark themes, case-study dialogs, SEO metadata, analytics, privacy, 404 handling, and GitHub Pages deployment.
- Do not add a routing library, CSS framework, component library, animation package, server, CMS, or database.
- Pretendard Variable remains the primary font.
- At 1920 x 1080, use the measured Figma anchors; at other sizes, width and height respond independently.
- Minimum supported viewport width is 320 px, and no viewport may produce horizontal overflow.
- Preserve semantic headings, keyboard focus, reduced motion, accessible dialogs, and WCAG AA body-text contrast.
- Unrelated untracked files in `.superpowers/`, `.worktrees/`, and the Jane Street résumé plan/spec remain untouched.

---

### Task 1: Establish Reference Tokens and Shared Shell Geometry

**Files:**
- Modify: `Web/src/styles.css`
- Modify: `Web/src/styles.test.ts`

**Interfaces:**
- Consumes: existing classes `.page-shell`, `.topbar`, `.brand-lockup`, `.top-actions`, `.main-stage`, `.bottom-nav`, `.nav-link`, and `footer`
- Produces: CSS custom properties `--reference-width`, `--reference-height`, `--reference-nav-width`, `--reference-coral`, and shared desktop shell geometry used by Tasks 2-5

- [ ] **Step 1: Replace the old scale-oriented CSS assertions with reference-token assertions**

Add this test to `Web/src/styles.test.ts` and remove assertions that expect the old `512px`/`640px` content widths:

```ts
it("publishes the 1920 by 1080 Figma reference tokens", () => {
  const root = getComputedStyle(document.documentElement);

  expect(root.getPropertyValue("--reference-width").trim()).toBe("120rem");
  expect(root.getPropertyValue("--reference-height").trim()).toBe("67.5rem");
  expect(root.getPropertyValue("--reference-nav-width").trim()).toBe("42.125rem");
  expect(root.getPropertyValue("--reference-coral").trim()).toBe("#fd806a");
});
```

Keep the existing Pretendard test. Rename the suite from `PDF-proportioned desktop layout` to `Figma-proportioned adaptive layout`.

- [ ] **Step 2: Run the focused stylesheet test and confirm the new contract fails**

Run from `Web`:

```powershell
npm test -- --run src/styles.test.ts
```

Expected: FAIL because the four `--reference-*` properties do not exist and the current coral is `#ff7a66`.

- [ ] **Step 3: Add the reference tokens and recalibrate the shared shell**

In `Web/src/styles.css`, introduce the tokens and replace the current shared shell sizing with the following values:

```css
:root {
  --reference-width: 120rem;
  --reference-height: 67.5rem;
  --reference-nav-width: 42.125rem;
  --reference-coral: #fd806a;
  --accent: var(--reference-coral);
  --accent-strong: #eb6854;
  --ink: #1f1f1f;
  --muted: #55514f;
  --canvas: #fffefd;
  --dot: rgba(31, 31, 31, 0.032);
  --panel: rgba(255, 254, 253, 0.94);
  --line: rgba(31, 31, 31, 0.075);
  --shadow: none;
}

body {
  background-image: radial-gradient(circle, var(--dot) 1.25px, transparent 1.35px);
  background-position: 3px 3px;
  background-size: 14px 14px;
}

.page-shell {
  grid-template-rows: auto minmax(0, 1fr) auto auto;
  padding: 2.125rem 2.5rem 1.5rem;
}

.brand-lockup {
  margin-top: 0.5rem;
  margin-left: 0.75rem;
}

.brand-avatar {
  width: 1.6875rem;
  border-radius: 0.25rem;
}

.top-actions {
  gap: 1.25rem;
}

.icon-action {
  width: 2rem;
  height: 2rem;
}

.icon-action svg,
.github-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.main-stage {
  width: 100%;
  max-width: none;
  padding: 0;
}

.bottom-nav {
  max-width: var(--reference-nav-width);
  margin: 0 auto clamp(0rem, calc((100vh - 50rem) * 0.62), 10.875rem);
  border-top-width: 3px;
}
```

Delete the radial spotlight from `.page-shell::before`; keep only a transparent, pointer-free pseudo-element if the selector is still useful. Retain the dark-theme variables, but reduce dark dots to `rgba(255, 255, 255, 0.045)` and keep `--shadow: none`.

- [ ] **Step 4: Run the stylesheet and application tests**

```powershell
npm test -- --run src/styles.test.ts src/App.test.tsx
```

Expected: PASS. Existing navigation, language, theme, content, and dialog behavior remain unchanged.

- [ ] **Step 5: Commit the shared visual foundation**

```powershell
git add Web/src/styles.css Web/src/styles.test.ts
git commit -m "style: calibrate portfolio shell to Figma frame"
```

---

### Task 2: Recompose the About View Around Frame 1

**Files:**
- Modify: `Web/src/styles.css`
- Modify: `Web/src/styles.test.ts`
- Verify: `Web/src/views/AboutView.tsx`

**Interfaces:**
- Consumes: `--reference-coral` and the shared shell from Task 1; existing `.identity-row`, `.featured-skills`, and `.detail-grid` markup
- Produces: a 610 px desktop About composition with a 93 px avatar, 48 px identity title, full-width skill row, and view-specific vertical anchoring

- [ ] **Step 1: Add a failing About composition test**

Add to `Web/src/styles.test.ts`:

```ts
it("matches the Frame 1 identity geometry", () => {
  document.body.innerHTML = `
    <section class="about-view">
      <div class="identity-row">
        <div class="avatar-wrap"></div>
        <div class="name-line"><h1>KIM GEON WOO</h1></div>
      </div>
      <div class="featured-skills"></div>
      <div class="detail-grid"></div>
    </section>
  `;

  expect(getComputedStyle(document.querySelector(".about-view")!).maxWidth).toBe("610px");
  expect(getComputedStyle(document.querySelector(".avatar-wrap")!).width).toBe("93px");
  expect(getComputedStyle(document.querySelector("h1")!).fontSize).toBe("48px");
  expect(getComputedStyle(document.querySelector(".featured-skills")!).marginLeft).toBe("0px");
  expect(getComputedStyle(document.querySelector(".detail-grid")!).marginLeft).toBe("0px");
});
```

- [ ] **Step 2: Run the test and verify that the old shifted layout fails**

```powershell
npm test -- --run src/styles.test.ts
```

Expected: FAIL because the avatar is 80 px at most and the skills/details inherit a left margin equal to the avatar column.

- [ ] **Step 3: Implement the Frame 1 geometry without changing content**

Replace the About rules in `Web/src/styles.css` with:

```css
.page-shell--about .main-stage {
  align-items: start;
  padding-top: clamp(8rem, 27vh, 18.25rem);
}

.about-view {
  width: 100%;
  max-width: 38.125rem;
  margin-inline: auto;
}

.identity-row {
  grid-template-columns: 5.8125rem minmax(0, 1fr);
  gap: 2.9375rem;
}

.avatar-wrap {
  width: 5.8125rem;
  border-radius: 0.5rem;
  box-shadow: none;
}

.name-line h1 {
  font-size: 3rem;
  line-height: 1;
  letter-spacing: 0.035em;
}

.role-line {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.featured-skills {
  gap: 0.25rem;
  margin: 1.3125rem 0 2.75rem;
}

.featured-skills .skill-badge {
  min-height: 1.3125rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.8125rem;
}

.detail-grid {
  gap: 0.875rem 3.75rem;
  margin-left: 0;
}

.detail-item {
  font-size: 1rem;
}
```

Do not change the `details` or `featuredSkills` arrays. Keep the current real profile image, but rely on the neutral square geometry rather than shadow decoration.

- [ ] **Step 4: Run focused tests**

```powershell
npm test -- --run src/styles.test.ts src/App.test.tsx
```

Expected: PASS, including the no-phone-number and bilingual About assertions.

- [ ] **Step 5: Commit the About composition**

```powershell
git add Web/src/styles.css Web/src/styles.test.ts
git commit -m "style: align About view with Figma Frame 1"
```

---

### Task 3: Rebuild the Skills View to Match Frame 6 Density

**Files:**
- Modify: `Web/src/styles.css`
- Modify: `Web/src/styles.test.ts`
- Verify: `Web/src/views/SkillsView.tsx`
- Verify: `Web/src/components/SkillBadge.tsx`

**Interfaces:**
- Consumes: existing five skill groups and `SkillBadgeData.level`
- Produces: an 860 px two-column desktop skills composition, centered legend, and context-specific 16 px skill labels

- [ ] **Step 1: Add a failing Skills geometry test**

Add to `Web/src/styles.test.ts`:

```ts
it("matches the Frame 6 skills width and badge scale", () => {
  document.body.innerHTML = `
    <section class="skills-view">
      <div class="skill-legend"></div>
      <div class="skill-groups">
        <section class="skill-group"><div class="skill-list"><span class="skill-badge">C++</span></div></section>
      </div>
    </section>
  `;

  expect(getComputedStyle(document.querySelector(".skills-view")!).maxWidth).toBe("860px");
  expect(getComputedStyle(document.querySelector(".skill-legend")!).justifyContent).toBe("center");
  expect(getComputedStyle(document.querySelector(".skills-view .skill-badge")!).fontSize).toBe("16px");
});
```

- [ ] **Step 2: Run the stylesheet test and confirm the old 768 px, 10.88 px treatment fails**

```powershell
npm test -- --run src/styles.test.ts
```

Expected: FAIL for skills maximum width, legend alignment, and badge font size.

- [ ] **Step 3: Implement Frame 6 column width, vertical anchor, and badge hierarchy**

Update `Web/src/styles.css`:

```css
.page-shell--skills .main-stage {
  align-items: start;
  padding-top: clamp(7.5rem, 20vh, 13.5rem);
}

.skills-view {
  width: 100%;
  max-width: 53.75rem;
  margin-inline: auto;
}

.skill-legend {
  justify-content: center;
  margin-bottom: 2.75rem;
  font-size: 0.8125rem;
}

.skill-groups {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.875rem 8.25rem;
}

.skill-group h2 {
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.skills-view .skill-list {
  gap: 0.375rem 0.5rem;
}

.skills-view .skill-badge {
  min-height: 1.75rem;
  padding: 0.25rem 0.625rem;
  font-size: 1rem;
}
```

Keep `SkillBadge.tsx` using one semantic component and allow `.featured-skills` and `.skills-view` parent selectors to provide their different Figma sizes. Do not duplicate the component or add a size prop.

- [ ] **Step 4: Run Skills and application tests**

```powershell
npm test -- --run src/styles.test.ts src/App.test.tsx
```

Expected: PASS. `Languages`, `PostgreSQL`, and the active Skills navigation state remain present.

- [ ] **Step 5: Commit the Skills composition**

```powershell
git add Web/src/styles.css Web/src/styles.test.ts
git commit -m "style: match Skills view to Figma Frame 6"
```

---

### Task 4: Replace Heavy Project Cards with Frame 7 Editorial Tiles

**Files:**
- Modify: `Web/src/components/ProjectCard.tsx`
- Modify: `Web/src/styles.css`
- Modify: `Web/src/App.test.tsx`
- Modify: `Web/src/styles.test.ts`

**Interfaces:**
- Consumes: `Project`, `Language`, and `onOpen(project: Project): void`
- Produces: `.project-card__index`, `.project-card__meta`, `.project-card__summary`, and unchanged accessible case-study/GitHub actions

- [ ] **Step 1: Add failing structural and geometry tests**

Extend the project rendering test in `Web/src/App.test.tsx`:

```ts
const snowMixCard = screen
  .getByRole("heading", { name: "SnowMix" })
  .closest("article");

expect(snowMixCard).toHaveAttribute("data-project-id", "snowmix");
expect(within(snowMixCard!).getByText("02")).toHaveClass("project-card__index");
expect(snowMixCard!.querySelector(".project-card__accent")).not.toBeInTheDocument();
```

Add to `Web/src/styles.test.ts`:

```ts
it("matches the Frame 7 tile grid", () => {
  document.body.innerHTML = `
    <section class="projects-view">
      <div class="project-grid"><article class="project-card"></article></div>
    </section>
  `;

  expect(getComputedStyle(document.querySelector(".projects-view")!).maxWidth).toBe("548px");
  expect(getComputedStyle(document.querySelector(".project-grid")!).columnGap).toBe("28px");
  expect(getComputedStyle(document.querySelector(".project-grid")!).rowGap).toBe("24px");
  expect(getComputedStyle(document.querySelector(".project-card")!).height).toBe("130px");
});
```

- [ ] **Step 2: Run the focused tests and verify they fail against the coral sidebar cards**

```powershell
npm test -- --run src/App.test.tsx src/styles.test.ts
```

Expected: FAIL because cards have `.project-card__accent`, no `data-project-id`, no numeric `02` index, a 608 px container, and auto height.

- [ ] **Step 3: Simplify `ProjectCard` while preserving behavior**

Update the prop type and component signature in `Web/src/components/ProjectCard.tsx`:

```tsx
type ProjectCardProps = {
  project: Project;
  projectIndex: number;
  language: Language;
  onOpen: (project: Project) => void;
};

export function ProjectCard({
  project,
  projectIndex,
  language,
  onOpen,
}: ProjectCardProps) {
```

Then replace the article body with:

```tsx
<article className="project-card" data-project-id={project.id}>
  <div className="project-card__body">
    <div className="project-card__meta">
      <span className="project-card__index" aria-hidden="true">
        {String(projectIndex).padStart(2, "0")}
      </span>
      <span>{project.category[language]}</span>
      <span>{project.period}</span>
    </div>
    <h2>{project.title}</h2>
    <p className="project-card__summary">{project.summary[language]}</p>
    <div className="project-card__footer">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={language === "en" ? `${project.title} case study` : `${project.title} 자세히 보기`}
      >
        {language === "en" ? "Case study" : "자세히 보기"}
        <ArrowUpRight aria-hidden="true" />
      </button>
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
          GitHub
        </a>
      ) : null}
    </div>
  </div>
</article>
```

Close the component function after the returned article. In `ProjectsView.tsx`, change the mapping callback to `projects.map((project, index) => ...)` and pass `projectIndex={index + 1}` to `ProjectCard`. This creates stable `01` through `06` display indices without changing the semantic project IDs.

- [ ] **Step 4: Implement the exact Frame 7 grid and quiet tile styling**

Replace the project overview rules in `Web/src/styles.css` with:

```css
.page-shell--projects .main-stage {
  align-items: start;
  padding-top: clamp(7rem, 22.5vh, 15.1875rem);
}

.projects-view {
  width: 100%;
  max-width: 34.25rem;
  margin-inline: auto;
}

.project-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.75rem;
  row-gap: 1.5rem;
}

.project-card {
  position: relative;
  display: block;
  height: 8.125rem;
  overflow: hidden;
  background: color-mix(in srgb, var(--panel) 92%, #d9d9d9 8%);
  border: 1px solid var(--line);
  box-shadow: none;
}

.project-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0.1875rem;
  content: "";
  background: var(--accent);
  opacity: 0;
  transition: opacity 160ms ease;
}

.project-card:hover::before,
.project-card:focus-within::before {
  opacity: 1;
}

.project-card__body {
  height: 100%;
  padding: 0.75rem 0.875rem;
}

.project-card__meta {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.5rem;
}

.project-card__index {
  color: var(--accent-strong);
  font-weight: 800;
}

.project-card h2 {
  margin: 0.375rem 0 0.25rem;
  font-size: 0.9375rem;
}

.project-card__summary {
  display: -webkit-box;
  overflow: hidden;
  font-size: 0.6875rem;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.project-card__footer {
  padding-top: 0.375rem;
}
```

Retain the dialog styles and behavior. Delete `.project-card__accent` rules and the hover shadow/4 px lift. Use a maximum 1 px hover translation if motion is retained.

- [ ] **Step 5: Run project, accessibility, and stylesheet tests**

```powershell
npm test -- --run src/App.test.tsx src/styles.test.ts
```

Expected: PASS, including opening SnowMix, focus trapping, Escape dismissal, GitHub href, and the 548 x 438 px grid contract.

- [ ] **Step 6: Commit the project overview redesign**

```powershell
git add Web/src/components/ProjectCard.tsx Web/src/views/ProjectsView.tsx Web/src/styles.css Web/src/App.test.tsx Web/src/styles.test.ts
git commit -m "style: rebuild Projects view from Figma Frame 7"
```

---

### Task 5: Unify Timeline, Dark Theme, and Adaptive Breakpoints

**Files:**
- Modify: `Web/src/styles.css`
- Modify: `Web/src/styles.test.ts`
- Verify: `Web/src/views/TimelineView.tsx`
- Verify: `Web/src/components/BottomNav.tsx`

**Interfaces:**
- Consumes: the shared color, line, type, and navigation system from Tasks 1-4
- Produces: one-column tablet/mobile layouts, independent width/height response, fixed safe-area mobile navigation, and restrained Timeline styling

- [ ] **Step 1: Add failing adaptive-contract assertions**

Add to `Web/src/styles.test.ts`:

```ts
it("contains independent width and height adaptations", () => {
  expect(styles).toContain("@media (max-width: 680px)");
  expect(styles).toContain("@media (max-height: 760px) and (min-width: 681px)");
  expect(styles).toContain("grid-template-columns: 1fr");
  expect(styles).toContain("padding-bottom: calc(7rem + env(safe-area-inset-bottom))");
  expect(styles).not.toContain("transform: scale(");
});
```

The first three strings already exist in some form, but the exact safe-area content padding and explicit absence of fixed-canvas scaling establish the final contract.

- [ ] **Step 2: Run the stylesheet test and confirm the mobile safe-area contract fails**

```powershell
npm test -- --run src/styles.test.ts
```

Expected: FAIL because `.page-shell` currently uses a fixed `7rem` mobile bottom padding without adding the safe-area inset.

- [ ] **Step 3: Restyle Timeline and make every view adaptive**

Update `Web/src/styles.css` so Timeline uses the shared 674 px measure and quiet coral nodes:

```css
.page-shell--timeline .main-stage {
  align-items: start;
  padding-top: clamp(6rem, 17vh, 11.5rem);
}

.timeline-view {
  max-width: var(--reference-nav-width);
}

.timeline-list::before {
  width: 1px;
  background: color-mix(in srgb, var(--accent) 32%, transparent);
}

.timeline-marker {
  width: 0.875rem;
  height: 0.875rem;
  border-width: 2px;
}
```

Replace the responsive overrides with explicit view-aware rules:

```css
@media (max-width: 900px) {
  .page-shell--about .main-stage,
  .page-shell--skills .main-stage,
  .page-shell--projects .main-stage,
  .page-shell--timeline .main-stage {
    padding-top: clamp(5rem, 14vh, 8rem);
  }

  .skill-groups {
    column-gap: 3rem;
  }
}

@media (max-width: 680px) {
  .page-shell {
    display: block;
    min-height: 100dvh;
    padding: 1rem 1rem calc(7rem + env(safe-area-inset-bottom));
  }

  .identity-row {
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 1.125rem;
  }

  .avatar-wrap {
    width: 5.5rem;
  }

  .skill-groups,
  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    height: auto;
    min-height: 9.5rem;
  }

  .bottom-nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

@media (max-height: 760px) and (min-width: 681px) {
  .page-shell--about .main-stage,
  .page-shell--skills .main-stage,
  .page-shell--projects .main-stage,
  .page-shell--timeline .main-stage {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }

  .bottom-nav {
    margin-bottom: 0;
  }
}
```

Ensure the more specific mobile and short-height rules occur after desktop view rules. Keep the existing fixed mobile nav, reduced motion, timeline column collapse, and dialog accessibility styles.

- [ ] **Step 4: Run the full test suite**

```powershell
npm test
```

Expected: all tests PASS with no content or interaction regressions.

- [ ] **Step 5: Commit the adaptive polish**

```powershell
git add Web/src/styles.css Web/src/styles.test.ts
git commit -m "style: unify adaptive portfolio layouts"
```

---

### Task 6: Production Build and Visual Regression Calibration

**Files:**
- Modify only if visual calibration exposes a defect: `Web/src/styles.css`
- Verify: `Web/dist/`

**Interfaces:**
- Consumes: completed responsive views from Tasks 1-5 and Figma nodes `1:56`, `19:364`, and `55:2`
- Produces: a tested production build and browser-verified layouts at the required desktop, laptop, and mobile sizes

- [ ] **Step 1: Run all automated verification from `Web`**

```powershell
npm test
npm run build
```

Expected: every Vitest test passes and Vite completes a production build without TypeScript or bundling errors.

- [ ] **Step 2: Start the production preview**

```powershell
npx vite preview --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173/koi312500/` in the in-app browser.

- [ ] **Step 3: Calibrate the 1920 x 1080 desktop views against Figma**

At 1920 x 1080, capture About, Skills, Projects, and Timeline screenshots. Verify:

```text
About: avatar near x=655 y=370 at 93x93; name near x=795 y=369 at 48px;
       skills aligned to x=655; navigation rule near y=785.
Skills: content spans about x=540..1400 and y=366..684; legend is centered;
        navigation rule near y=785.
Projects: 260x130 tiles at x=686/974 and y=321/475/629;
          grid gap 28px by 24px; navigation rule near y=785.
Shared: secondary brand begins near x=52 y=42; top actions occupy x=1738..1880;
        footer begins near y=1014; dots remain subordinate to content.
```

Use browser screenshots and DOM geometry reads. If an anchor differs by more than roughly 8 px, change the nearest container, gap, or view padding token rather than introducing per-element absolute positioning.

- [ ] **Step 4: Verify adaptive behavior at 1366 x 768 and 390 x 844**

For every route and both languages, verify:

```text
1366x768: readable desktop or compact two-column composition; short-height rules active;
           content scrolls if necessary; no overlap with navigation or footer.
390x844: one-column content; fixed bottom navigation with safe-area padding;
         no horizontal overflow; project cards readable; dialogs fit within 88dvh.
```

Also toggle light/dark themes, open and close SnowMix with keyboard, and confirm reduced-motion rules remain present.

- [ ] **Step 5: Re-run verification after any calibration edits**

```powershell
npm test
npm run build
git diff --check
```

Expected: all commands succeed. `dist/index.html`, `dist/404.html`, and `dist/privacy/index.html` still contain the deployed portfolio assets and metadata.

- [ ] **Step 6: Commit final visual calibration if files changed**

If Task 6 required stylesheet calibration:

```powershell
git add Web/src/styles.css
git commit -m "fix: calibrate responsive portfolio visuals"
```

If no files changed, do not create an empty commit. Record the tested viewports and final command results in the completion handoff.
