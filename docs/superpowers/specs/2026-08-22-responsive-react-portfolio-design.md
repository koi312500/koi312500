# Responsive React Portfolio Design

## Goal

Rebuild the portfolio in `Web/` as a Vite + React + TypeScript site that closely reproduces the three supplied PDF frames while adapting naturally to desktop, tablet, and mobile screens and deploying entirely through GitHub Pages.

## Visual system

- Use the PDF's white dotted canvas, coral accent, charcoal typography, compact outlined icons, oversized desktop whitespace, and persistent four-item bottom navigation.
- Treat 1920x1080 as the reference composition, not a fixed canvas. Use fluid type and spacing, CSS Grid/Flexbox, and natural scrolling when content or viewport height requires it.
- About follows Frame 1: utility actions at top right, centered identity block, skill badges, two-column personal details, and bottom navigation.
- Skills follows Frame 6: compact brand lockup at top left, legend and grouped skill badges in two columns, and the same navigation.
- Projects follows Frame 7: compact brand lockup, responsive two-column project grid, and the same navigation. Project cards contain real content instead of gray placeholders.
- Timeline is an original screen using the same shell, typography, spacing, coral markers, and dotted background.
- Light mode is the PDF-faithful default. Dark mode preserves the same hierarchy with dark surfaces and lighter dots.

## Responsive behavior

- Large desktop (`>= 1200px`): closely match the reference proportions and bottom placement.
- Tablet (`768px-1199px`): reduce whitespace, keep two-column Skills/Projects where space permits, and allow the page to scroll.
- Mobile (`< 768px`): single-column content, compact header actions, wrapped badges, and a sticky bottom navigation with icon labels.
- Use `min-height: 100dvh`; never scale the whole page as an image and never assume a fixed aspect ratio.
- Respect reduced-motion preferences and keyboard focus visibility.

## Information architecture

- Main views use robust hash routes: `#about`, `#skills`, `#projects`, and `#timeline`.
- The active hash drives visible content, active navigation, and document title/description.
- Project cards may open an accessible detail dialog containing a concise case study, role, outcomes, technology, and verified external links.
- The primary above-fold CTA is the persistent Projects navigation item plus a restrained resume link in the About details; no marketing banner is added.
- Korean/English and light/dark preferences are stored locally.

## Content

- About identifies Geonwoo Kim as an undergraduate, competitive programmer, developer, and researcher at DGIST.
- Skills are grouped by Languages, Backend & Systems, Frontend, Data & AI, and Tools. Filled coral badges indicate main workflow and outlined badges indicate proficient/in use.
- Featured projects use verified portfolio/resume content: KimuStory - Ep, SnowMix, Sangsaeng-ieum, SCQ graduation research, 3D Gaussian Splatting R&E, and ARKit indoor navigation.
- Timeline summarizes education, competitive programming, research, projects, and leadership without duplicating the full resume.
- Public site content must not expose a phone number or precise home address.

## SEO, accessibility, and supporting pages

- Include site-wide Open Graph/X metadata, a branded social image, canonical URL, `robots.txt`, and `sitemap.xml`.
- Use `Person` JSON-LD rather than `LocalBusiness`.
- Include meaningful alt text; decorative graphics are hidden from assistive technology.
- Add a branded custom `404.html` with a return CTA.
- Add a concise privacy page. Google Analytics loads only when `VITE_GA_MEASUREMENT_ID` is set.
- Do not add breadcrumbs, FAQ, testimonials, map/directions, response-time promises, enquiry forms, or a thank-you page because they do not fit this personal portfolio.

## Deployment

- Vite's base path is `/koi312500/` for the repository Pages URL.
- GitHub Actions installs dependencies in `Web/`, builds `Web/dist`, uploads that directory, and deploys it to Pages on pushes to `master`.
- The site remains fully static and requires no backend.

## Acceptance criteria

- Production build and automated tests pass with no warnings.
- Hash navigation, theme, language, modal, external links, titles, and metadata work from the GitHub Pages base path.
- No horizontal overflow at 390x844, 768x1024, 1366x768, 1440x900, or 1920x1080.
- Desktop About, Skills, and Projects visibly preserve the respective PDF composition; mobile views remain readable and operable rather than being scaled-down screenshots.
- Keyboard focus, dialog dismissal, reduced motion, and accessible names are verified.
