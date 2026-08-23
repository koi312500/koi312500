# Figma-Faithful Portfolio Redesign

## Status

Approved design direction on 2026-08-23. This document specifies the visual redesign before implementation planning.

## Objective

Rework the existing Vite and React portfolio so it carries the visual character of the supplied 1920 x 1080 Figma frames while remaining responsive at arbitrary viewport sizes. Preserve the site's real content, navigation, accessibility, language toggle, theme toggle, case-study dialogs, metadata, and GitHub Pages deployment.

The target is not a pixel-scaled screenshot. The target is the same composition expressed as responsive layout rules: a quiet dotted canvas, a sparse central content cluster, strong typographic hierarchy, generous negative space, restrained coral accents, a lightweight top bar, and a shared bottom navigation rail.

## Reference Interpretation

The supplied PDFs are Figma exports. The high-resolution raster previews appeared to be 3840 x 2160, but both the Figma selection labels and the PDF page boxes confirm that Frame 1, Frame 6, and Frame 7 are authored at 1920 x 1080. The earlier 3840 interpretation was incorrect and explains why the first implementation over-reduced the composition. The actual 1920 x 1080 coordinates are the desktop design reference, not a fixed canvas or a requirement that every browser be 16:9.

At 1920 x 1080, the website should closely match the source frame's relative sizes, spacing, and alignment. At other viewport sizes and aspect ratios, it must adapt rather than uniformly scale the entire composition. Containers, gaps, and type use bounded fluid values; columns collapse when needed; vertical placement responds to available height; and short screens scroll. The implementation must not use letterboxing, a transformed 1920 px stage, or viewport-wide scaling that makes text unreadable.

The source frames are:

- Frame 1: Figma node `1:56`
- Frame 6: Figma node `19:364`
- Frame 7: Figma node `55:2`

The implementation will preserve these relationships:

- Desktop content occupies a deliberately small portion of the canvas and is visually centered rather than stretched to the viewport.
- The top controls live near the upper corners and do not compete with the main content.
- About content forms one compact identity block with a large name, short role line, skills, and contact details.
- Skills content uses two balanced columns with generous gaps between groups.
- Projects uses a two-column by three-row visual rhythm on wide screens.
- The bottom navigation is a thin horizontal rail above the footer, with coral used for the active marker and icons.
- The dotted background remains perceptible only as texture.

### Measured Desktop Anchors

At a 1920 x 1080 viewport, implementation screenshots should closely track these source coordinates before responsive interpolation:

- Shared secondary-page brand begins around `x = 52`, `y = 42`; the title glyphs occupy approximately `x = 102-325`, `y = 46-65`, and the Korean descriptor begins near `x = 344`, `y = 47`.
- Shared top actions occupy approximately `x = 1738-1880`, `y = 35-62`.
- Frame 1 avatar is `93 x 93` at approximately `x = 655`, `y = 370`.
- Frame 1 name begins at `x = 795`, `y = 369` with a 48 px text size. The role line begins near `x = 795`, `y = 438`.
- Frame 1 skill row begins at `x = 655`, `y = 484`; it aligns with the avatar rather than the name column.
- Frame 1 contact rows also begin from the avatar edge around `x = 655`, with text beginning around `x = 686`.
- Frame 6 skill groups occupy two broad columns beginning around `x = 540` and `x = 1037`, with content spanning approximately `y = 366-684`.
- Frame 7 project placeholders are exactly `260 x 130`, at `x = 686` and `x = 974`, and `y = 321`, `475`, and `629`. Horizontal gap is 28 px and vertical gap is 24 px.
- The desktop navigation rule is at `y = 785`; its content spans roughly `x = 627-1301`, with Frame 1 using a slightly wider left start near `x = 609`.
- Navigation labels begin around `y = 803`, and the footer text baseline begins around `y = 1014`.

These measurements are calibration targets for the 1920 x 1080 visual regression check. They will be expressed with centered containers, grid alignment, and bounded fluid spacing rather than copied into dozens of unrelated absolute positions.

## Chosen Direction

Use a reference-faithful, content-aware redesign.

This balances two rejected extremes:

1. A literal screenshot reconstruction would match the Figma export but would replace useful content with placeholders and fail on non-16:9 screens.
2. A light polish of the existing site would retain the current card-heavy, component-library appearance that caused the mismatch.

The selected direction keeps actual portfolio information but applies the Figma file's visual grammar. Content density will be reduced at the overview level, with details available through the existing dialogs.

## Visual System

### Typography

- Continue using Pretendard Variable as the primary family.
- Use fewer weights: approximately 800 for identity and brand headings, 600 for labels, and 400 or 500 for supporting text.
- Restore the Figma-like size contrast: the name is visually dominant, while metadata remains clearly subordinate.
- Avoid excessive uppercase microcopy and wide tracking. Uppercase is reserved for role lines, navigation, and small project classifications where it improves scanning.
- Keep readable minimum text sizes on mobile even when the desktop composition is visually small.

### Color

- Canvas: near-white warm neutral.
- Ink: near-black rather than pure black.
- Supporting text: neutral medium gray.
- Accent: existing coral family, used as punctuation rather than large surface area.
- Panels: transparent or near-canvas neutral surfaces.
- Dark theme keeps the same hierarchy and reduces glow, blur, and saturated accent area.

### Background

- Retain the dot pattern but reduce its contrast and visual radius.
- Remove the current radial wash if it makes the center look artificially spotlighted.
- The background must not reduce text contrast or make screenshots appear noisy.

### Surfaces and Motion

- Remove broad shadows from the avatar and project overview cards.
- Use hairline borders and small neutral fills where separation is needed.
- Hover motion is limited to subtle color, underline, or one-to-two-pixel movement.
- Reduced-motion preferences remain respected.

## Layout Architecture

### Shared Shell

The application remains a four-view React interface using hash navigation. The shell continues to own the top bar, main stage, bottom navigation, and footer.

Desktop layout is governed by measured anchors and proportions instead of a uniform scale factor:

- Outer padding follows viewport width within bounded minimum and maximum values.
- Each view receives its own content maximum width and vertical anchor based on the Figma composition.
- The About identity starts near `y = 369`, Skills content near `y = 366`, and Projects near `y = 321` at the reference viewport. The current implementation places these sections too high and must not reuse one generic top padding for every view.
- The navigation sits below the content with a deliberate gap and remains above the footer.
- Short screens may scroll rather than compressing content below readable sizes.
- Width and height respond independently. A wide but short screen follows the desktop column structure while reducing vertical gaps or allowing scroll; a narrow but tall screen follows the mobile column structure without enlarging everything to fill the height.

Tablet and mobile progressively collapse columns while retaining whitespace and hierarchy. Mobile keeps the sticky bottom navigation because it is useful and already part of the product requirements, even though the desktop Figma frame does not show that state.

## View Designs

### About

- Keep the actual profile image, but present it as a quiet square element without a shadow or decorative frame.
- Make the name and Korean name the primary visual anchor.
- Reduce the role line to one concise row on desktop and allow a controlled wrap on narrow screens.
- Show a curated set of core skills. Primary skills may use a coral fill; secondary skills use a coral outline.
- Arrange contact and identity details as a balanced two-column list aligned to the text block.
- Keep external-link affordances small and consistent.
- Preserve all current links and their accessible names.

### Skills

- Retain grouped skills and the main/proficient legend.
- Use two sparse columns on wide screens and one column on mobile.
- Reduce the total visual weight of pills: smaller coral fill area, quieter outlines, and consistent widths only where natural.
- Increase spacing between groups while keeping each heading attached to its own badges.
- Use the Figma location-pin style group marker or an equivalent existing line icon consistently.

### Projects

- Retain the six featured projects and existing case-study dialogs.
- Replace the current coral sidebars, deep shadows, and dense card chrome with flat editorial tiles.
- Each overview tile includes a restrained visual area, project title, short classification or date, and a maximum of roughly two lines of description.
- Coral appears as a small index, line, icon, or active state rather than a full-height block.
- GitHub and case-study actions share one quiet, consistent placement.
- Full role, outcome, stack, and extended description remain in the dialog instead of competing in the overview.
- Wide screens preserve the reference's two-by-three rhythm. Narrow screens use one column without shrinking type excessively.

### Timeline

- Keep existing chronological content because no dedicated Figma frame was supplied.
- Restyle it using the same restrained line, type, and spacing system as the other views.
- Use coral only for nodes or the current emphasis, not for large continuous surfaces.

## Component Boundaries

- `AppShell`: responsive page geometry and shared chrome.
- `BrandHeader`: compact brand lockup and top actions.
- `BottomNav`: shared navigation rail and mobile sticky navigation.
- `AboutView`: identity composition and details.
- `SkillsView` and `SkillBadge`: grouped capability presentation.
- `ProjectsView` and `ProjectCard`: quiet project overview tiles.
- `CaseStudyDialog`: detailed project disclosure, keyboard behavior, and focus management.
- `TimelineView`: chronological presentation.
- `content.ts`: remains the source of bilingual content and project data.

No new routing library, CSS framework, component library, animation package, or image-generation dependency is introduced.

## Responsive Rules

- The layout must work at widths from 320 px upward and on both short and tall viewports.
- At wide desktop sizes, content remains intentionally compact but must not look accidentally miniaturized.
- At tablet widths, two-column sections may remain where text fits comfortably.
- At mobile widths, About details, skill groups, project tiles, and timeline items become single-column.
- The bottom navigation becomes fixed and includes safe-area padding.
- No horizontal overflow is allowed.
- Text uses the 1920 px frame's actual values as desktop targets and bounded fluid sizes for other viewports.

## Accessibility and Interaction

- Preserve semantic headings, links, buttons, dialogs, keyboard navigation, and focus-visible styles.
- Maintain WCAG AA contrast for body text and interactive controls in both themes.
- Do not rely on coral alone to communicate selection; active navigation also uses position and a line marker.
- Preserve reduced-motion behavior.
- Preserve meaningful image alternative text.
- Dialog behavior remains closable by explicit control and keyboard, with focus returned appropriately.

## Figma Handoff Preference

For future iterations, the preferred source is a view-only Figma Design file link with copying and exporting permitted. The current public link exposes the canvas, frame names, node IDs, and overall dimensions, but anonymous inspection of detailed properties prompts for a Figma account. A direct link to each selected desktop frame remains better than a PDF because signed-in inspect or Dev Mode access can preserve layer names, exact dimensions, constraints, Auto Layout, spacing, colors, text styles, and inspectable assets.

Best handoff package, in priority order:

1. View-only Figma file or frame links, ideally with Dev Mode access if available.
2. Desktop plus at least one mobile frame, with Auto Layout and constraints configured to express intended responsive behavior.
3. Named color, text, spacing, and radius variables or styles.
4. Original SVG exports for icons, logos, and vector illustrations, with PNG or WebP for raster artwork.
5. A short note identifying which measurements are fixed, fluid, minimum, or maximum.
6. PDF or high-resolution PNG only as a visual fallback and regression reference.

The current PDFs remain sufficient to complete this redesign; a Figma link would mainly remove ambiguity and allow more exact inspection.

## Testing and Visual Verification

- Extend unit tests only where component behavior or class contracts change.
- Preserve the existing navigation, metadata, analytics, localization, theme, dialog, and accessibility tests.
- Run the full Vitest suite and production build.
- Perform browser visual checks for all four views at 1920 x 1080, 1366 x 768, and a representative 390 px mobile viewport.
- Compare About, Skills, and Projects screenshots against their corresponding Figma exports for hierarchy, density, spacing, and accent usage.
- Verify light and dark themes, English and Korean content, keyboard focus, dialogs, short viewport scrolling, and absence of horizontal overflow.

## Out of Scope

- Replacing the existing content with Figma placeholders.
- Adding a CMS, server, database, or non-GitHub-Pages hosting dependency.
- Rewriting deployment, analytics, SEO, privacy, 404, or sitemap functionality unless the redesign exposes a regression.
- Adding new portfolio sections or collecting new content.
- Producing a literal fixed 1920 x 1080 canvas that breaks on other viewport shapes.

## Acceptance Criteria

- A side-by-side comparison reads as the same visual family as the supplied Figma frames without appearing copied as a static image.
- The site no longer feels card-heavy or template-driven.
- Coral is visually restrained and negative space is the dominant design element.
- The name and primary content regain clear hierarchy on desktop.
- Projects and Skills remain useful with real content while matching the reference density more closely.
- All existing functionality remains intact.
- Tests and production build pass, and browser QA shows no overflow or broken layout across the target viewports.
