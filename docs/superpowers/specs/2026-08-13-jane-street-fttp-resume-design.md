# Jane Street FTTP Hong Kong Résumé Design

## Objective

Create a polished, English-language, two-page PDF résumé for Geonwoo Kim's application to Jane Street's First-year Trading and Technology Program in Hong Kong. The résumé should demonstrate mathematical and algorithmic problem solving, technical depth, curiosity, and the ability to build reliable systems without implying prior finance experience.

## Deliverables

- `geonwoo_kim_janestreet_resume.typ`: editable Typst source.
- `geonwoo_kim_janestreet_resume.pdf`: final, visually verified A4 PDF.
- Both files will be written to `output/pdf/`; the original files in Downloads remain unchanged.

## Visual Direction

- Use the restrained editorial language of `utilForever/CV`, based on Typst's `modern-cv` package.
- Use a single-column layout across two A4 pages.
- Use an indigo accent only for the first name and section headings.
- Continue each section heading with a thin black horizontal rule.
- Keep entry titles on the left and dates or locations on a consistent right-hand axis.
- Use typography, weight, spacing, and alignment for hierarchy; do not use a page border, award card, sidebar, summary paragraph, metric strip, or decorative background.
- Keep links readable as text and suitable for PDF/ATS extraction. Do not use a photo.
- Balance both pages deliberately. Do not allow orphaned bullets, split entries, or a mostly empty second page.

## Page Structure

### Page 1

1. Header and contact details
2. Education
3. Competitive Programming
4. Experience
5. Research

### Page 2

1. Selected Projects
2. Leadership and Activities
3. Honors and Awards
4. Additional Education
5. Technical Skills

The exact page break may be adjusted during rendering, but the two pages must remain balanced and preserve this narrative order.

## Content Priorities

### Core evidence

- Korea Olympiad in Informatics: sustained participation and verified prizes from 2017 through 2025, including four national silver prizes in earlier divisions and later high-school-division results.
- Nexon Youth Programming Challenge: 2024 finalist in the 15-19 division.
- KimyuStory Ep: main developer of a production Discord game serving more than 400,000 unique users across more than 53,000 servers; emphasize stateful systems, concurrency, correctness, and the TypeScript/Node.js/Redis/NestJS stack.
- Self-Correction Quantization research: proposed and evaluated SCQ for Korean LLMs, including models up to 12.8B parameters; emphasize experimental comparison and the memory/accuracy/general-reasoning trade-off.
- 3D Gaussian Splatting research: led the design of 33 controlled dataset conditions and an automated PSNR/SSIM/LPIPS evaluation pipeline; connect the work to the Minister of Science and ICT Award without repeating the same claim in multiple sections.

### Selected projects

- SnowMix: AI-assisted web accessibility for visually impaired and color-blind users; describe dynamic page analysis and accessible transformation in one concise entry.
- ARKit Indoor Navigation: combined spatial mapping, graph construction, A* pathfinding, accessibility-aware weighting, and real-world calibration/error reduction.
- Do not create a separate résumé entry for the Infomaker solved.ac practice utility; it may be mentioned only as supporting evidence within the Infomaker leadership entry.
- Do not include repositories that currently appear incomplete, template-only, or redundant with stronger work, including StellaNavis, bookshelf, and Koi_Bot_Discord as standalone projects.

### Leadership

- Infomaker: founder and president of the school's first algorithm problem-solving club; focus on building a community of about 20 students and adapting learning to different skill levels.
- DSHStack: organizer, problem setter, and reviewer; focus on contest design, adversarial tests, validators, external reviewers, and participation scale.

### Additional education

- Include the 2018-2020 information-technology gifted education sequence as one compact entry.
- Show technical progression through a C++ Korean typing tutor, a Python vocabulary-learning application using the Open Korean Dictionary API, and a KoGPT2 conversational feature integrated into a Discord bot.
- Do not claim STT/TTS work because it is not represented in the surviving public project materials.
- Do not include the elementary/intermediate/advanced course awards until their exact official names and levels are verified.

## Writing Rules

- Write in concise, idiomatic English.
- Lead bullets with the technical action or measurable result.
- Use one or two bullets per entry; retain a third only for Ep if page balance permits.
- Prefer concrete scale, algorithms, experimental variables, evaluation metrics, and engineering constraints over broad claims.
- Avoid first-person language, adjectives such as "innovative" or "passionate," and claims that cannot be independently supported.
- Avoid repeating the same award, metric, or project description in multiple sections.
- Use a consistent date style with ASCII hyphens.

## Links

- Keep the GitHub profile in the header.
- Add concise repository links for Ep, SnowMix, the graduation research repository, and other selected projects only when the link helps substantiate the entry.
- Do not let long URLs disturb the right-hand alignment or page balance.

## Verification

- Compile the Typst source successfully with no missing-glyph or overflow errors.
- Confirm that text extraction preserves the reading order and all URLs.
- Render both pages to PNG and inspect them at full-page and readable zoom.
- Confirm consistent margins, baselines, section spacing, right-column alignment, and line wrapping.
- Confirm there are no clipped elements, orphaned bullets, split entries, excessive blank areas, or decorative elements rejected during design.
- Preserve the original résumé source and PDF in Downloads unchanged.
