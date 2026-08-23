#let slate = rgb("#0AB1C2")
#let icon-teal = rgb("#087F8C")
#let charcoal = rgb("#202A33")
#let muted = rgb("#52616B")
#let rule-gray = rgb("#B8C2CC")

#let page-decoration = context {
  place(top + right, dx: 0mm, dy: 0mm)[
    #rect(
      width: 90mm,
      height: 2.0mm,
      fill: gradient.linear(
        (slate.transparentize(100%), 0%),
        (slate, 100%),
        angle: 0deg,
      ),
    )
  ]
  place(top + right, dx: -11.5mm, dy: 0mm)[
    #rect(width: 2.0mm, height: 32.5mm, fill: slate.transparentize(40%))
  ]
  if counter(page).get().first() == 1 {
    place(top + left, dx: 0.8mm, dy: 344.5mm)[
      #line(length: 104mm, angle: -60deg, stroke: (paint: slate.transparentize(86%), thickness: 1.45mm, cap: "round"))
    ]
    place(top + left, dx: -3.6mm, dy: 330.2mm)[
      #line(length: 101mm, angle: -60deg, stroke: (paint: slate.transparentize(69%), thickness: 1.45mm, cap: "round"))
    ]
    place(top + left, dx: -6.7mm, dy: 313.6mm)[
      #line(length: 70mm, angle: -60deg, stroke: (paint: slate.transparentize(80%), thickness: 1.45mm, cap: "round"))
    ]
  }
}

#set document(author: "Geonwoo Kim", title: "Resume")
#set page(
  paper: "a4",
  margin: (left: 16mm, right: 16mm, top: 11mm, bottom: 11mm),
  background: page-decoration,
  footer-descent: 0pt,
  footer: context align(right)[
    #text(size: 7pt, fill: rule-gray)[#counter(page).display()]
  ],
)
#set text(font: "Segoe UI", size: 9.4pt, fill: charcoal, fallback: true)
#set par(leading: 0.42em, justify: false)

#let section(title, first: false) = {
  v(if first { 9pt } else { 6.2pt })
  grid(
    columns: (auto, 1fr),
    gutter: 8pt,
    align: horizon,
    text(size: 10.8pt, weight: "bold", tracking: 0.45pt, fill: slate)[#title],
    line(length: 100%, stroke: (paint: rule-gray, thickness: 0.55pt)),
  )
  v(4pt)
}

#let entry(
  title,
  aside: none,
  role: none,
  subtitle: none,
  date: none,
  body: none,
  gap: 13.5pt,
) = block(breakable: false, below: gap)[
  #grid(
    columns: (1fr, auto),
    gutter: 8mm,
    align: (left + top, right + top),
    stack(
      dir: ttb,
      spacing: 3.2pt,
      text(size: 10.25pt, weight: "bold")[#title],
      if subtitle != none {
        block(
          inset: (left: 4pt),
          stroke: (left: (paint: slate.transparentize(42%), thickness: 0.65pt)),
        )[
          #text(size: 8.45pt, weight: "regular", style: "normal", fill: muted)[#subtitle]
        ]
      } else { none },
    ),
    stack(
      dir: ttb,
      spacing: 4.3pt,
      if role != none { text(size: 8.8pt, fill: muted)[#role] }
      else if aside != none { text(size: 8.8pt, fill: muted)[#aside] }
      else { none },
      if date != none { text(size: 8.35pt, fill: muted)[#date] } else { none },
    ),
  )
  #if body != none {
    v(-1.5pt)
    body
  }
]

#let bullets(items) = {
  set text(size: 9.1pt)
  grid(
    columns: (4pt, 1fr),
    column-gutter: 5pt,
    row-gutter: 5.2pt,
    align: top,
    ..items.map(item => ([•], item)).flatten(),
  )
}

#let details(program, outcome) = stack(
  dir: ttb,
  spacing: 4.3pt,
  program,
  outcome,
)

#let award(outcome) = text(weight: "bold", fill: icon-teal)[#outcome]

#let award-title(outcome, subject) = [#text(weight: "bold", fill: icon-teal)[#outcome] #h(2.5pt) #text(fill: charcoal)[#raw("-") #subject]]

#let contact(icon, body) = box[
  #text(font: "Segoe Fluent Icons", size: 7.7pt, fill: icon-teal)[#icon]
  #h(3pt)
  #body
]

#let github-mark(size: 7.2pt, baseline: 0.13em) = box(
  width: size,
  height: size,
  baseline: baseline,
  image("github-mark.svg", width: size, height: size),
)

#let linked-title(title, url) = [
  #title
  #h(3.2pt)
  #link(url)[#github-mark(size: 7.8pt, baseline: 0.02em)]
]

#align(center)[
  #text(font: "Century Gothic", size: 29pt, weight: "regular", tracking: -0.2pt, fill: charcoal)[Geonwoo Kim]
  #v(1.5pt)
  #text(size: 8.7pt, weight: "regular", tracking: 0.35pt, fill: slate)[
    UNDERGRADUATE #h(5pt)|#h(5pt) COMPETITIVE PROGRAMMER #h(5pt)|#h(5pt) DEVELOPER #h(5pt)|#h(5pt) RESEARCHER
  ]
  #v(3.5pt)
  #text(size: 8.5pt, fill: muted)[
    #contact("\u{E715}", link("mailto:koi@dgist.ac.kr")[koi\@dgist.ac.kr])
    #h(10pt) #link("https://github.com/koi312500")[#github-mark(size: 7.7pt) #h(3pt) github.com/koi312500]
    #h(10pt) #contact("\u{E707}", [South Korea])
  ]
]

#section("EDUCATION", first: true)

#entry(
  [Daegu Gyeongbuk Institute of Science and Technology (DGIST)],
  aside: [Daegu, South Korea],
  subtitle: details(
    [School of Undergraduate Studies],
    [GPA: 4.21 / 4.30],
  ),
  date: [Feb 2026 - Present],
)

#entry(
  [Daejeon Science High School for the Gifted],
  aside: [Daejeon, South Korea],
  subtitle: details(
    [High School Diploma],
    [GPA: 3.70 / 4.30],
  ),
  date: [Mar 2024 - Jan 2026],
)

#section("COMPETITIVE PROGRAMMING")

#entry(
  [UCPC 2026 Final Round],
  aside: [Finalist - 28th of 60 teams; 149 preliminary teams],
  subtitle: [Collegiate Team Programming Contest],
  date: [2026],
)

#entry(
  [Korea Olympiad in Informatics (KOI)],
  aside: [National Competition],
  subtitle: [Algorithms and Data Structures],
  date: [2017 - 2025],
  body: bullets((
    [National Silver Prize in four consecutive years (2017-2020) and Regional Grand Prize in 2017 and 2018.],
    [In the High School Division: Silver and Bronze in the 2024 rounds; Bronze and Honorable Mention in both 2023 and 2025.],
    [Completed the 33rd KOI Summer School (2024) and the 34th KOI Winter School (2025).],
  )),
)

#entry(
  [Nexon Youth Programming Challenge (NYPC)],
  aside: [Finalist, Ages 15-19],
  subtitle: [National Programming Competition],
  date: [2024],
)

#section("EXPERIENCE")

#entry(
  linked-title([KimuStory - Ep], "https://github.com/KimuSoft"),
  role: [Main Developer],
  subtitle: details(
    [Production Discord Fishing Game],
    [400,000+ users across 53,000+ Discord servers],
  ),
  date: [Feb 2022 - Present],
  body: bullets((
    [Build and maintain a stateful game service used by 400,000+ unique users across 53,000+ Discord servers.],
    [Engineer interaction, progression, and backend systems with TypeScript, Node.js, discord.js, Redis, NestJS, REST APIs, and PostgreSQL, emphasizing concurrency, correctness, and fault handling.],
  )),
)

#section("RESEARCH")

#entry(
  [Self-Correction Quantization for Korean Large Language Models],
  role: [Sole Researcher],
  subtitle: details(
    [Daejeon Science High School Graduation Research Program],
    [Proposed Self-Correction Quantization (SCQ)],
  ),
  date: [Mar 2025 - Nov 2025],
  body: bullets((
    [Proposed Self-Correction Quantization (SCQ), which fine-tunes a quantized model on self-generated corrections to recover Korean linguistic capability without an external correction corpus.],
    [Compared PTQ, generic QAT, and SCQ on Korean LLMs up to 12.8B parameters: 4-bit PTQ reduced memory by about 84%, while SCQ improved the grammar-sensitivity score by 2.75x over PTQ with less general-reasoning degradation than generic QAT.],
  )),
)

#entry(
  [3D Gaussian Splatting for Metaverse Content Development],
  role: [Team Lead],
  subtitle: details(
    [Science Gifted Creative Research (R&E)],
    award([Grand Prize and Minister of Science and ICT Award]),
  ),
  date: [Mar 2024 - Dec 2024],
  body: bullets((
    [Designed 33 controlled dataset conditions varying image count, brightness, and contrast; built a Python pipeline that automated training-data generation and evaluation with PSNR, SSIM, and LPIPS.],
    [Used frequency-energy and local-contrast analyses to explain reconstruction-quality degradation and identify robust capture conditions.],
  )),
)

#pagebreak()

#section("PROJECTS", first: true)

#entry(
  [Sangsaeng-ieum - AI Support Platform for Foreign Workers],
  role: [Team Lead],
  subtitle: details(
    [AI Convergence Policy Discovery Hackathon],
    award([Honorable Mention]),
  ),
  date: [Mar 2025 - Jun 2025],
  body: bullets((
    [Led a four-person team in prototyping AI-assisted worker matching, a multilingual support chatbot, and guided electronic contract and administrative workflows.],
  )),
)

#entry(
  linked-title([SnowMix - AI-Assisted Web Accessibility], "https://github.com/koi312500/SnowMix"),
  role: [Team Lead and Lead Developer],
  subtitle: details(
    [Web Accessibility Project],
    award([National Bronze Prize]),
  ),
  date: [Jul 2024 - Nov 2024],
  body: bullets((
    [Built a browser extension and AI service that analyzes visual structure and dynamic content, produces navigable descriptions, and transforms images for color-blind users.],
    [Led a four-person team across planning and implementation using JavaScript, Python, and PyTorch.],
  )),
)

#entry(
  [ARKit Indoor Navigation for Visually Impaired Users],
  role: [Developer],
  subtitle: details(
    [iOS Prototype for Spatial Mapping and Audio Route Guidance],
    [Accessibility-Aware Indoor Navigation],
  ),
  date: [Jun 2024 - Sep 2024],
  body: bullets((
    [Constructed a 3D graph from ARKit spatial anchors and implemented #raw("A*") pathfinding with accessibility-aware edge weights for step-by-step audio navigation.],
    [Mapped and repeatedly tested dozens of points in a school building, refining coordinate handling and calibration to reduce sensor-induced routing errors.],
  )),
)

#section("LEADERSHIP AND ACTIVITIES")

#entry(
  [Pineapple Computer Club],
  role: [President (2024)],
  subtitle: details(
    [Information Technology Club],
    [Revitalized a long-running school club],
  ),
  date: [Apr 2023 - Aug 2025],
  body: bullets((
    [Revitalized a long-running information technology club by organizing regular activities across programming, software projects, and broader computing topics.],
  )),
)

#entry(
  [Infomaker],
  role: [Founder and President],
  subtitle: details(
    [Algorithm Problem-Solving Club],
    [Led about 20 students],
  ),
  date: [Mar 2024 - Dec 2025],
  body: bullets((
    [Founded the school's first algorithm problem-solving club and led about 20 students through lessons, contest practice, and peer solution reviews.],
    [Built a solved.ac-integrated practice and ranking system that generated workbooks by topic and adapted problem selection to different skill levels.],
  )),
)

#entry(
  [DSHStack Programming Contests],
  role: [Organizer, Problem Setter, and Reviewer],
  subtitle: details(
    [Student-Led Algorithm Competitions],
    [Up to 180 external participants],
  ),
  date: [2024 - 2025],
  body: bullets((
    [Organized contests for roughly 40-60 in-school participants and about 180 external participants per event.],
    [Coordinated problem setting, generators, validators, adversarial tests, seven external reviewers, editorials, and live solution sessions using Polygon and testlib.],
  )),
)

#section("HONORS AND AWARDS")

#entry(
  [National and Regional Awards - Korea Olympiad in Informatics (KOI)],
  aside: [2017 - 2025],
  gap: 8pt,
)

#entry(
  award-title([Honorable Mention], [AI Convergence Policy Discovery Hackathon]),
  aside: [Jun 2025],
  subtitle: [Sangsaeng-ieum: An AI-Based Support Platform for Foreign Workers],
  date: [Provincial Governor's Award],
  gap: 8pt,
)

#entry(
  award-title([Grand Prize], [Science Gifted Creative Research (R&E)]),
  aside: [Jan 2025],
  subtitle: [Developing Metaverse Content through 3D Gaussian Splatting],
  date: [Minister of Science and ICT Award],
  gap: 8pt,
)

#entry(
  award-title([Bronze Prize], [9th National High School Club Software Competition]),
  aside: [Nov 2024],
  subtitle: [SnowMix: An AI Web Accessibility System for Visually Impaired Users],
  date: [University President's Award],
  gap: 8pt,
)

#entry(
  award-title([Bronze Prize], [30th Daejeon Student Science Exploration Olympiad]),
  aside: [Sep 2024],
  subtitle: [Exploring Applications of Stable Diffusion],
  date: [Superintendent of Education Award],
  gap: 8pt,
)

#section("ADDITIONAL EDUCATION")

#entry(
  [Information Technology Gifted Education Program],
  aside: [Daejeon Metropolitan Office of Education],
  subtitle: [Elementary, Intermediate, and Advanced Courses],
  date: [2018 - 2020],
  body: bullets((
    [Progressed from a C++ Korean typing tutor (2018) to a Python/Qt vocabulary-learning application using the Open Korean Dictionary API (2019), then integrated a KoGPT2 conversational model into a Discord bot (2020).],
  )),
)
