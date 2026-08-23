# Jane Street FTTP Hong Kong Résumé Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an accurate, balanced, two-page English résumé in Typst and PDF for Geonwoo Kim's Jane Street FTTP Hong Kong application.

**Architecture:** Replace the custom cyan résumé with a single Typst document built on `@preview/modern-cv:0.8.0`, using the reference CV's restrained editorial hierarchy and explicit page control. Keep all final artifacts together in `output/pdf/`; use Poppler renders under `tmp/pdfs/janestreet_resume/` only for QA.

**Tech Stack:** Typst 0.15.1, `modern-cv` 0.8.0, Python `pypdf`, Poppler `pdfinfo` and `pdftoppm`, PowerShell.

## Global Constraints

- Preserve `C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.typ` and `C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.pdf` unchanged.
- Produce exactly two A4 pages in English.
- Use a single-column editorial layout with indigo headings and thin black rules.
- Do not add a page border, award card, sidebar, summary paragraph, metric strip, photo, or decorative background.
- Do not claim STT/TTS work or unverified gifted-education award names.
- Use ASCII hyphens in all date ranges.
- Do not split an entry across pages or leave orphaned bullets.
- Keep both pages visually balanced and ensure PDF text extraction follows reading order.

---

### Task 1: Build the editorial Typst résumé

**Files:**
- Create: `output/pdf/geonwoo_kim_janestreet_resume.typ`
- Create: `output/pdf/geonwoo_kim_janestreet_resume.pdf`
- Reference: `C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.typ`
- Reference: `tmp/pdfs/utilForever_CV.typ`

**Interfaces:**
- Consumes: verified facts from the source résumé, the six supplied evidence PDFs, the public GitHub repositories, and `docs/superpowers/specs/2026-08-13-jane-street-fttp-resume-design.md`.
- Produces: an editable Typst source that compiles to a two-page A4 PDF at the exact output paths above.

- [ ] **Step 1: Create the output directory and confirm the original files are untouched**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\koi\Coding\koi312500\output\pdf' | Out-Null
Get-FileHash 'C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.typ','C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.pdf'
```

Expected: two SHA-256 hashes are printed and neither source is modified during subsequent tasks.

- [ ] **Step 2: Write the new Typst source using `modern-cv`**

Create `output/pdf/geonwoo_kim_janestreet_resume.typ` with:

- `#import "@preview/modern-cv:0.8.0": *`
- `#show: resume.with(...)` containing Geonwoo Kim's email, phone, GitHub, South Korea location, English language, no profile picture, and colored headers.
- Page 1 sections in this order: `Education`, `Competitive Programming`, `Experience`, `Research`.
- An explicit `#pagebreak()` after the final research entry.
- Page 2 sections in this order: `Selected Projects`, `Leadership and Activities`, `Honors and Awards`, `Additional Education`, `Technical Skills`.
- No introductory profile or highlights block.

Use these content decisions:

- `Korea Olympiad in Informatics`: preserve the verified 2017-2025 results; lead with four national silver prizes and keep the later high-school results concise.
- `KimyuStory - Ep`: first bullet contains `400,000+ unique users` and `53,000+ Discord servers`; second bullet explains stateful interactions, concurrency, correctness, and fault handling; third bullet is omitted unless the page remains balanced.
- `Self-Correction Quantization`: mention Korean LLMs up to 12.8B parameters, comparison of PTQ/QAT/SCQ, and the memory-accuracy-general-reasoning trade-off without overstating statistical significance.
- `3D Gaussian Splatting`: mention 33 controlled dataset conditions and the automated PSNR/SSIM/LPIPS pipeline.
- `SnowMix`: one entry about dynamic web-page analysis, accessible descriptions, and color-blind-friendly transformations.
- `ARKit Indoor Navigation`: one entry about 3D graph construction, A* pathfinding, accessibility-aware weights, and real-world calibration.
- `Infomaker` and `DSHStack`: one or two bullets each, emphasizing community scale, problem setting, validators, adversarial tests, reviewers, and participation.
- `Information Technology Gifted Education`: one compact 2018-2020 entry showing progression from C++ typing tutor to Python/Open Korean Dictionary vocabulary tool to KoGPT2 Discord chatbot integration.
- `Technical Skills`: C++, Python, TypeScript/JavaScript, Node.js, Redis, NestJS, PostgreSQL, Docker, PyTorch, Hugging Face Transformers, Git, Polygon, and testlib.
- Use `https://github.com/KimuSoft` for Ep's public evolution, `https://github.com/koi312500/SnowMix` for SnowMix, and `https://github.com/koi312500/DJSHS_Graduation_Research` for the SCQ graduation research.

- [ ] **Step 3: Compile the Typst source**

Run:

```powershell
& 'C:\Users\koi\AppData\Local\Microsoft\WinGet\Packages\Typst.Typst_Microsoft.Winget.Source_8wekyb3d8bbwe\typst-x86_64-pc-windows-msvc\typst.exe' compile `
  'C:\Users\koi\Coding\koi312500\output\pdf\geonwoo_kim_janestreet_resume.typ' `
  'C:\Users\koi\Coding\koi312500\output\pdf\geonwoo_kim_janestreet_resume.pdf'
```

Expected: exit code 0; the first run may download `modern-cv:0.8.0` from the Typst package registry.

- [ ] **Step 4: Confirm the PDF has exactly two A4 pages**

Run:

```powershell
& 'C:\Users\koi\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdfinfo.exe' `
  'C:\Users\koi\Coding\koi312500\output\pdf\geonwoo_kim_janestreet_resume.pdf'
```

Expected: `Pages: 2` and `Page size: 595.276 x 841.89 pts (A4)`.

- [ ] **Step 5: Commit the first compilable artifact**

```powershell
git -C 'C:\Users\koi\Coding\koi312500' add -- output/pdf/geonwoo_kim_janestreet_resume.typ output/pdf/geonwoo_kim_janestreet_resume.pdf
git -C 'C:\Users\koi\Coding\koi312500' commit -m 'feat: draft FTTP resume'
```

---

### Task 2: Verify content accuracy and PDF semantics

**Files:**
- Modify: `output/pdf/geonwoo_kim_janestreet_resume.typ`
- Regenerate: `output/pdf/geonwoo_kim_janestreet_resume.pdf`

**Interfaces:**
- Consumes: the compiled artifacts from Task 1.
- Produces: a résumé whose extracted text contains every required fact, excludes rejected claims, and exposes valid readable links.

- [ ] **Step 1: Extract the PDF text using `pypdf`**

Run:

```powershell
$py='C:\Users\koi\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
@'
from pathlib import Path
from pypdf import PdfReader
p = Path(r'C:\Users\koi\Coding\koi312500\output\pdf\geonwoo_kim_janestreet_resume.pdf')
text = '\n'.join(page.extract_text() or '' for page in PdfReader(str(p)).pages)
Path(r'C:\Users\koi\Coding\koi312500\tmp\pdfs\janestreet_resume_text.txt').write_text(text, encoding='utf-8')
print(text)
'@ | & $py -
```

Expected: English text appears in header-to-footer reading order across two pages.

- [ ] **Step 2: Check required and forbidden content**

Run:

```powershell
$text='C:\Users\koi\Coding\koi312500\tmp\pdfs\janestreet_resume_text.txt'
rg -n '400,000\+|53,000\+|12\.8B|33 controlled|A\*|KoGPT2|Information Technology Gifted|Minister of Science and ICT' $text
rg -n 'STT|TTS|metric strip|summary|Elementary project evaluation|Intermediate coursework|Advanced Program.*(Silver|Bronze)' $text
```

Expected: the first command finds every required concept; the second command returns no matches.

- [ ] **Step 3: Inspect PDF link annotations**

Run:

```powershell
$py='C:\Users\koi\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
@'
from pypdf import PdfReader
p = r'C:\Users\koi\Coding\koi312500\output\pdf\geonwoo_kim_janestreet_resume.pdf'
reader = PdfReader(p)
links=[]
for page_no, page in enumerate(reader.pages, 1):
    for annot_ref in page.get('/Annots', []):
        annot = annot_ref.get_object()
        action = annot.get('/A')
        if action and action.get('/URI'):
            links.append((page_no, action.get('/URI')))
for item in links:
    print(item)
assert any('github.com/koi312500' in uri for _, uri in links)
assert any(uri.startswith('mailto:') for _, uri in links)
'@ | & $py -
```

Expected: GitHub and email links are present, and the Ep organization, SnowMix, and graduation-research URLs are all represented by annotations.

- [ ] **Step 4: Correct any wording or link failures and recompile**

Edit only the affected entries, then rerun Task 1 Steps 3-4 and Task 2 Steps 1-3.

Expected: every required check passes and no rejected claim appears.

- [ ] **Step 5: Commit the verified content**

```powershell
git -C 'C:\Users\koi\Coding\koi312500' add -- output/pdf/geonwoo_kim_janestreet_resume.typ output/pdf/geonwoo_kim_janestreet_resume.pdf
git -C 'C:\Users\koi\Coding\koi312500' commit -m 'fix: verify FTTP resume content'
```

---

### Task 3: Render and visually balance both pages

**Files:**
- Modify: `output/pdf/geonwoo_kim_janestreet_resume.typ`
- Regenerate: `output/pdf/geonwoo_kim_janestreet_resume.pdf`
- Create for QA only: `tmp/pdfs/janestreet_resume/page-1.png`
- Create for QA only: `tmp/pdfs/janestreet_resume/page-2.png`

**Interfaces:**
- Consumes: semantically verified PDF from Task 2.
- Produces: a visually polished two-page PDF with no overflow, orphaning, excessive blank space, or rejected decoration.

- [ ] **Step 1: Render both pages at 180 DPI**

Run:

```powershell
$qa='C:\Users\koi\Coding\koi312500\tmp\pdfs\janestreet_resume'
New-Item -ItemType Directory -Force -Path $qa | Out-Null
& 'C:\Users\koi\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe' `
  -png -r 180 `
  'C:\Users\koi\Coding\koi312500\output\pdf\geonwoo_kim_janestreet_resume.pdf' `
  "$qa\page"
```

Expected: `page-1.png` and `page-2.png` are generated.

- [ ] **Step 2: Inspect both full pages**

Use the image viewer on both PNGs and check:

- name/contact block alignment;
- consistent section-heading baselines and rules;
- title/date and title/location right-axis alignment;
- readable body size and line spacing;
- no split entry or orphaned bullet;
- no missing glyph, clipping, overlap, or black square;
- no page border, card, summary, metric strip, or sidebar;
- both pages occupy comparable visual depth without a large empty lower half.

Expected: every check passes. If a page is unbalanced, adjust entry wording and local vertical spacing rather than shrinking the entire document.

- [ ] **Step 3: Inspect dense entries at readable zoom**

Use the image viewer at original detail for the Ep, KOI, SCQ, 3DGS, DSHStack, and gifted-education entries.

Expected: punctuation, wrapping, bullets, bold emphasis, dates, and repository labels remain clear at normal reading size.

- [ ] **Step 4: Recompile and rerender after each meaningful layout correction**

Repeat Task 1 Steps 3-4 and Task 3 Steps 1-3 until the latest render has no visible defects.

- [ ] **Step 5: Commit the balanced layout**

```powershell
git -C 'C:\Users\koi\Coding\koi312500' add -- output/pdf/geonwoo_kim_janestreet_resume.typ output/pdf/geonwoo_kim_janestreet_resume.pdf
git -C 'C:\Users\koi\Coding\koi312500' commit -m 'style: polish FTTP resume layout'
```

---

### Task 4: Run final delivery verification

**Files:**
- Verify: `output/pdf/geonwoo_kim_janestreet_resume.typ`
- Verify: `output/pdf/geonwoo_kim_janestreet_resume.pdf`

**Interfaces:**
- Consumes: final rendered artifacts from Task 3.
- Produces: delivery evidence that the PDF is two-page A4, readable, linked, accurate, and reproducible from the Typst source.

- [ ] **Step 1: Rebuild from the final source**

Run the Task 1 Step 3 compile command once more from a clean terminal invocation.

Expected: exit code 0 and no warning or error output.

- [ ] **Step 2: Repeat structural and semantic checks**

Run Task 1 Step 4 and every command from Task 2.

Expected: two A4 pages, all required facts present, all rejected claims absent, and email/GitHub annotations valid.

- [ ] **Step 3: Render and inspect the final PDF**

Run Task 3 Step 1 again and inspect the newly generated PNGs rather than relying on earlier renders.

Expected: the final render passes every Task 3 visual criterion.

- [ ] **Step 4: Confirm original file hashes are unchanged**

Run:

```powershell
Get-FileHash 'C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.typ','C:\Users\koi\Downloads\geonwoo_kim_janestreet_resume.pdf'
git -C 'C:\Users\koi\Coding\koi312500' status --short
```

Expected: original hashes match Task 1 Step 1; no final-artifact changes remain unstaged or uncommitted. QA-only `.superpowers/` and `tmp/` files may remain untracked.
