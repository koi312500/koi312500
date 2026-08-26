import type {
  DetailItem,
  LocalizedText,
  Project,
  SkillBadgeData,
  SkillGroup,
  TimelineItem,
} from "../types";

export const intro: {
  role: LocalizedText;
  koreanName: string;
} = {
  role: {
    en: "University student · Competitive programmer · Developer · Researcher",
    ko: "대학생 · 경쟁 프로그래머 · 개발자 · 연구자",
  },
  koreanName: "김건우",
};

export const featuredSkills: SkillBadgeData[] = [
  { label: "C++", level: "main" },
  { label: "Python", level: "main" },
  { label: "TypeScript", level: "main" },
  { label: "Node.js", level: "main" },
  { label: "React", level: "proficient" },
  { label: "PostgreSQL", level: "proficient" },
];

export const details: DetailItem[] = [
  {
    icon: "location",
    label: { en: "Daejeon, South Korea", ko: "Daejeon, South Korea" },
  },
  {
    icon: "email",
    label: { en: "koi312500@gmail.com", ko: "koi312500@gmail.com" },
    href: "mailto:koi312500@gmail.com",
  },
  {
    icon: "birthday",
    label: { en: "18 April 2007", ko: "2007년 4월 18일" },
  },
  {
    icon: "education",
    label: {
      en: "DGIST · School of Undergraduate Studies",
      ko: "DGIST · 기초학부",
    },
  },
  {
    icon: "github",
    label: { en: "koi312500", ko: "koi312500" },
    href: "https://github.com/koi312500",
  },
  {
    icon: "website",
    label: { en: "https://koi3125.com", ko: "https://koi3125.com" },
    href: "https://koi3125.com/",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: { en: "Languages", ko: "Languages" },
    items: [
      { label: "C++", level: "main" },
      { label: "Python", level: "main" },
      { label: "TypeScript", level: "main" },
      { label: "JavaScript", level: "proficient" },
      { label: "SQL", level: "proficient" },
      { label: "Swift", level: "proficient" },
    ],
  },
  {
    title: { en: "Backend & Systems", ko: "Backend & Systems" },
    items: [
      { label: "Node.js", level: "main" },
      { label: "NestJS", level: "main" },
      { label: "PostgreSQL", level: "main" },
      { label: "Redis", level: "main" },
    ],
  },
  {
    title: { en: "Web & Mobile", ko: "Web & Mobile" },
    items: [
      { label: "React", level: "main" },
      { label: "HTML", level: "main" },
      { label: "CSS", level: "main" },
      { label: "Browser Extensions", level: "proficient" },
      { label: "ARKit", level: "proficient" },
    ],
  },
  {
    title: { en: "Data & AI", ko: "Data & AI" },
    items: [
      { label: "PyTorch", level: "main" },
      { label: "LLM Quantization", level: "main" },
      { label: "Computer Vision", level: "proficient" },
      { label: "3DGS", level: "proficient" },
      { label: "Stable Diffusion", level: "proficient" },
    ],
  },
  {
    title: { en: "Tools", ko: "Tools" },
    items: [
      { label: "Git", level: "main" },
      { label: "Linux", level: "proficient" },
      { label: "Docker", level: "proficient" },
      { label: "Typst", level: "proficient" },
    ],
  },
];

const projectOrder = [
  "ep",
  "lectio",
  "dgist-sns-supporters",
  "scq",
  "gpt-mmpi2",
  "sangsaeng",
  "dshstack",
  "3dgs",
  "snowmix",
  "arkit",
  "stable-diffusion",
];

export const projects: Project[] = [
  {
    id: "ep",
    title: { en: "Ep - Fishing Game", ko: "이프 - 낚시게임" },
    period: "2022 - Present",
    category: { en: "Production game service", ko: "상용 게임 서비스" },
    role: { en: "Main Developer", ko: "메인 개발자" },
    summary: {
      en: "A fishing game serving 400,000+ users across 53,000+ communities.",
      ko: "40만 명 이상의 사용자가 5만 3천 개 이상의 커뮤니티에서 이용하는 낚시 게임입니다.",
    },
    outcome: {
      en: "400,000+ users · 53,000+ communities",
      ko: "사용자 40만+ · 커뮤니티 5만 3천+",
    },
    details: [
      {
        en: "Builds interaction, progression, and backend systems with an emphasis on concurrency, correctness, and fault handling.",
        ko: "동시성, 정확성, 장애 대응을 중심으로 상호작용, 성장 및 백엔드 시스템을 개발했습니다.",
      },
    ],
    stack: ["TypeScript", "Node.js", "NestJS", "Redis", "PostgreSQL"],
    github: "https://github.com/KimuSoft",
  },
  {
    id: "lectio",
    kind: "activity" as const,
    title: { en: "Lectio Reading Community", ko: "독서모임 렉티오" },
    period: "Mar 2026 - Present",
    category: { en: "Reading community & editorial content", ko: "독서모임 · 콘텐츠" },
    role: { en: "Co-founder & Content Creator", ko: "공동 설립 · 콘텐츠 제작" },
    summary: {
      en: "A reading community and Instagram channel for sharing perspectives on books and conversations around reading.",
      ko: "책에 대한 의견과 독서를 둘러싼 이야기를 나누는 독서모임이자 인스타그램 콘텐츠 채널입니다.",
    },
    outcome: {
      en: "Co-running @lectio_in_life and producing book-centered content",
      ko: "@lectio_in_life 공동 운영 및 독서 콘텐츠 제작",
    },
    details: [
      {
        en: "Co-founded Lectio in March 2026 and helps select topics, develop posts, and shape the channel's editorial direction.",
        ko: "2026년 3월 렉티오를 함께 만들고 주제 선정, 게시물 제작 및 채널의 콘텐츠 방향을 함께 정하고 있습니다.",
      },
    ],
    stack: ["Editorial Planning", "Writing", "Instagram"],
    externalLink: {
      href: "https://www.instagram.com/lectio_in_life/",
      label: { en: "Instagram", ko: "Instagram" },
    },
  },
  {
    id: "dgist-sns-supporters",
    kind: "activity" as const,
    title: { en: "2026 DGIST SNS Supporters", ko: "2026년 DGIST SNS 서포터즈" },
    period: "Mar - Nov 2026",
    category: { en: "Official social media content", ko: "공식 SNS 콘텐츠" },
    role: { en: "DGILOG Team Lead", ko: "DGILOG 팀장" },
    summary: {
      en: "An official DGIST SNS Supporters activity creating social media content that introduces the university and its stories.",
      ko: "DGIST와 학교의 다양한 이야기를 알리는 공식 SNS 콘텐츠 활동입니다.",
    },
    outcome: {
      en: "Leading content planning, production, and team coordination",
      ko: "콘텐츠 기획·제작과 팀 운영을 담당",
    },
    details: [
      {
        en: "Leads team DGILOG throughout the 2026 program, coordinating topics and production for official social media posts.",
        ko: "2026년 활동 기간 동안 DGILOG 팀을 이끌며 공식 SNS 게시물의 주제와 제작 과정을 조율하고 있습니다.",
      },
    ],
    stack: ["Content Planning", "Social Media", "Team Leadership"],
  },
  {
    id: "snowmix",
    title: {
      en: "SnowMix - AI Web Accessibility Assistant",
      ko: "SnowMix - AI 웹 접근성 도우미",
    },
    period: "Jul - Nov 2024",
    category: { en: "AI-assisted web accessibility", ko: "AI 웹 접근성" },
    role: { en: "Team Lead & Lead Developer", ko: "팀장 · 메인 개발자" },
    summary: {
      en: "A browser extension and AI service that makes dynamic visual content navigable and color-blind friendly.",
      ko: "동적 시각 콘텐츠를 탐색 가능한 설명과 색각 보정 이미지로 변환하는 브라우저 확장 및 AI 서비스입니다.",
    },
    outcome: {
      en: "Bronze Prize · National High School Club Software Competition",
      ko: "전국 고등학교 동아리 소프트웨어 경진대회 동상",
    },
    cardOutcome: { en: "Bronze Prize · National software competition" },
    award: {
      en: "Bronze Prize · National High School Club Software Competition",
      ko: "전국 고등학교 동아리 소프트웨어 경진대회 동상",
    },
    details: [
      {
        en: "Led a four-person team across product planning and implementation, combining browser-side structure analysis with a Python/PyTorch service.",
        ko: "4인 팀의 기획과 구현을 이끌며 브라우저 구조 분석과 Python/PyTorch 서비스를 결합했습니다.",
      },
    ],
    stack: ["JavaScript", "Python", "PyTorch", "Browser Extension"],
    github: "https://github.com/koi312500/SnowMix",
  },
  {
    id: "sangsaeng",
    title: {
      en: "Sangsaeng-ieum - Multilingual Worker Support Platform",
      ko: "상생이음 - 다국어 외국인 노동자 지원 플랫폼",
    },
    period: "Mar - Jun 2025",
    category: { en: "AI support platform", ko: "AI 지원 플랫폼" },
    role: { en: "Team Lead", ko: "팀장" },
    summary: {
      en: "A prototype connecting foreign workers with jobs, multilingual guidance, and safer contract workflows.",
      ko: "외국인 노동자에게 일자리 매칭, 다국어 안내, 전자 계약 및 행정 절차를 연결하는 프로토타입입니다.",
    },
    outcome: {
      en: "Honorable Mention · AI Convergence Policy Discovery Hackathon",
      ko: "인공지능 융합 정책발굴 해커톤 대회 장려상",
    },
    cardOutcome: { en: "Honorable Mention · AI policy hackathon" },
    award: {
      en: "Honorable Mention · AI Convergence Policy Discovery Hackathon",
      ko: "인공지능 융합 정책발굴 해커톤 대회 장려상",
    },
    details: [
      {
        en: "Led a four-person team in designing AI-assisted matching, a multilingual chatbot, and guided administrative workflows.",
        ko: "4인 팀을 이끌며 AI 기반 매칭, 다국어 챗봇, 행정 절차 안내 흐름을 설계했습니다.",
      },
    ],
    stack: ["AI", "Multilingual UX", "Service Design"],
  },
  {
    id: "scq",
    title: {
      en: "Self-Correction Quantization for Korean LLMs",
      ko: "한국어 LLM을 위한 Self-Correction Quantization",
    },
    period: "Mar - Nov 2025",
    category: { en: "Korean LLM graduation research", ko: "한국어 LLM 졸업연구" },
    role: { en: "Sole Researcher", ko: "개인 연구자" },
    summary: {
      en: "A quantization method that recovers Korean linguistic capability using a model's own corrections.",
      ko: "모델이 생성한 자기 교정 데이터를 활용해 양자화 후 한국어 능력을 회복하는 방법을 제안했습니다.",
    },
    outcome: {
      en: "2.75x grammar-sensitivity score over 4-bit PTQ",
      ko: "4-bit PTQ 대비 문법 민감도 점수 2.75배",
    },
    details: [
      {
        en: "Compared PTQ, generic QAT, and SCQ on Korean models up to 12.8B parameters while measuring memory and reasoning trade-offs.",
        ko: "최대 12.8B 한국어 모델에서 PTQ, 일반 QAT, SCQ의 메모리와 추론 성능을 비교했습니다.",
      },
    ],
    stack: ["Python", "PyTorch", "LLM", "Quantization"],
  },
  {
    id: "3dgs",
    title: {
      en: "3D Gaussian Splatting Capture Quality Study",
      ko: "3D Gaussian Splatting 촬영 품질 연구",
    },
    period: "Mar - Dec 2024",
    category: { en: "Metaverse content research", ko: "메타버스 콘텐츠 연구" },
    role: { en: "Team Lead", ko: "팀장" },
    summary: {
      en: "A controlled study of capture conditions that affect 3D Gaussian Splatting reconstruction quality.",
      ko: "촬영 조건이 3D Gaussian Splatting 복원 품질에 미치는 영향을 통제 실험으로 분석했습니다.",
    },
    outcome: {
      en: "Reconstruction quality declined as brightness and contrast moved away from the source distribution.",
      ko: "밝기와 대비가 원본 데이터 분포에서 벗어날수록 3D 복원 품질이 하락함을 확인했습니다.",
    },
    cardOutcome: {
      en: "Quality declined with larger brightness and contrast shifts",
      ko: "밝기·대비 변화가 클수록 복원 품질 하락",
    },
    award: {
      en: "Top Excellence Award · 2024 Science Gifted Creative Research (R&E) Project Presentation · Minister of Science and ICT Award",
      ko: "2024년 과학영재 창의연구(R&E) 연구과제 발표대회 최우수상 · 과학기술정보통신부장관상",
    },
    details: [
      {
        en: "Across 33 dataset conditions, 1.2x and 1/1.2x brightness shifts retained quality better than 1.8x and 1/1.8x shifts, while larger contrast changes reduced overall reconstruction quality.",
        ko: "33개 데이터 조건에서 1.2배와 1/1.2배 밝기 변화가 1.8배와 1/1.8배 변화보다 품질을 잘 유지했으며, 대비 변화가 커질수록 전반적인 복원 품질이 하락했습니다.",
      },
      {
        en: "The final fruit-fly reconstruction reached PSNR 26.5961, SSIM 0.9233, and LPIPS 0.1868.",
        ko: "최종 초파리 복원에서는 PSNR 26.5961, SSIM 0.9233, LPIPS 0.1868을 기록했습니다.",
      },
    ],
    stack: ["Python", "3DGS", "PSNR", "SSIM", "LPIPS"],
  },
  {
    id: "arkit",
    title: {
      en: "Accessible Indoor Navigation for Visually Impaired Users",
      ko: "시각장애인을 위한 실내 내비게이션",
    },
    period: "Jun - Sep 2024",
    category: { en: "Accessible indoor navigation", ko: "접근성 실내 내비게이션" },
    role: { en: "Developer", ko: "개발자" },
    summary: {
      en: "A mobile platform designed to help visually impaired users navigate complex buildings without GPS or installed beacons.",
      ko: "GPS나 별도 비콘 없이 시각장애인이 복잡한 실내 공간을 이동할 수 있도록 설계한 모바일 내비게이션 플랫폼입니다.",
    },
    outcome: {
      en: "Implemented image-based positioning, AR arrows, audio directions, and elevator-prioritized accessible routes.",
      ko: "이미지 기반 위치 인식, AR 화살표, 음성 안내와 엘리베이터 우선 접근성 경로를 구현했습니다.",
    },
    cardOutcome: {
      en: "Image positioning · AR/audio guidance · accessible routes",
      ko: "이미지 위치 인식 · AR/음성 안내 · 접근성 경로",
    },
    details: [
      {
        en: "Users can photograph indoor landmarks to build and edit a multi-floor map without specialist equipment; the map and image anchors are then distributed through a web server.",
        ko: "사용자가 실내 표지물을 촬영해 전문 장비 없이 다층 지도를 만들고 수정할 수 있으며, 지도와 이미지 앵커는 웹 서버를 통해 배포됩니다.",
      },
      {
        en: "During navigation, the app recognizes the current position, calculates a route, displays AR arrows with distance and direction, provides spoken guidance, and signals arrival.",
        ko: "내비게이션 실행 중 현재 위치를 인식하고 경로를 계산한 뒤 거리·방향과 AR 화살표, 음성 길안내를 제공하고 도착을 알립니다.",
      },
    ],
    stack: ["Swift", "SwiftUI", "ARKit", "Node.js", "Next.js"],
  },
  {
    id: "gpt-mmpi2",
    title: {
      en: "Automated MMPI-2 Response Analysis with LLMs",
      ko: "LLM 기반 MMPI-2 응답 자동 분석",
    },
    period: "2025",
    category: { en: "LLM behavior research", ko: "LLM 행동 분석 연구" },
    role: { en: "Sole Researcher", ko: "개인 연구자" },
    summary: {
      en: "Applied MMPI-2 to several language models and compared recurring scale patterns and response biases across models.",
      ko: "여러 언어 모델에 MMPI-2 검사를 적용해 모델마다 반복해서 나타나는 심리 척도와 응답 편향을 비교한 연구입니다.",
    },
    outcome: {
      en: "Comparison of MMPI-2 scale patterns across language models",
      ko: "언어 모델별 MMPI-2 척도와 응답 경향 비교",
    },
    cardOutcome: { en: "MMPI-2 patterns across language models" },
    details: [
      {
        en: "Automated all 567 responses for each model and used OCR to organize the resulting report into scores for each MMPI-2 scale.",
        ko: "각 모델이 567개 문항에 답하도록 검사 과정을 자동화하고, 결과지는 OCR로 읽어 척도별 점수로 정리했습니다.",
      },
      {
        en: "Compared how results changed across models and question formats, then documented the limits of applying a human psychological assessment to language models.",
        ko: "모델과 질문 방식을 바꿨을 때 결과가 어떻게 달라지는지 비교하고, 사람을 위한 심리검사를 언어 모델에 적용할 때의 한계도 정리했습니다.",
      },
    ],
    stack: ["Python", "OpenAI API", "Selenium", "EasyOCR", "PyTorch"],
  },
  {
    id: "dshstack",
    title: {
      en: "DSHStack - Student-Run Programming Contests",
      ko: "DSHStack - 학생 주도 프로그래밍 대회",
    },
    period: "2024 - 2025",
    category: { en: "Contest engineering", ko: "프로그래밍 대회 제작" },
    role: { en: "Organizer · Problem Setter · Reviewer", ko: "운영 · 출제 · 검수" },
    summary: {
      en: "A student-run contest series created to give every grade hands-on algorithm experience and build a lasting contest culture at DSHS.",
      ko: "전교생이 알고리즘 문제 해결을 경험하고 학생 주도 대회가 이어질 수 있도록 만든 교내 프로그래밍 대회 시리즈입니다.",
    },
    outcome: {
      en: "Led planning, problem setting, review, and BOJ contest operations.",
      ko: "기획·출제·검수·BOJ 대회 운영 전 과정을 총괄했습니다.",
    },
    cardOutcome: {
      en: "Led planning, problem setting, review, and BOJ operations",
      ko: "기획·출제·검수·BOJ 운영 전 과정 총괄",
    },
    details: [
      {
        en: "Proposed the contest, secured school approval, designed its rules and schedule, recruited participants, and operated both the school round and its BOJ open contest.",
        ko: "대회를 제안해 학교 승인을 받고, 규정·일정·모집을 설계한 뒤 교내 본선과 BOJ 오픈 콘테스트를 운영했습니다.",
      },
      {
        en: "Created and reviewed problems across multiple difficulty levels, prepared test data and model solutions, and coordinated seven external reviewers.",
        ko: "여러 난이도의 문제를 출제·검토하고 테스트 데이터와 정답 코드를 준비했으며, 외부 검수진 7명을 조율했습니다.",
      },
      {
        en: "Each contest brought together 40-60 students at school and about 180 participants in the external open contest.",
        ko: "회차마다 교내 40~60명과 외부 오픈 콘테스트 약 180명이 참가했습니다.",
      },
    ],
    stack: ["BOJ", "C++", "Problem Setting", "Contest Operations"],
  },
  {
    id: "stable-diffusion",
    title: {
      en: "Cultural Heritage Image Restoration",
      ko: "문화유산 이미지 복원",
    },
    period: "2023 - 2024",
    category: { en: "Generative AI research", ko: "생성형 AI 연구" },
    role: { en: "Researcher · Club Developer", ko: "연구 · 동아리 개발" },
    summary: {
      en: "An experimental pipeline using diffusion models to restore damaged cultural heritage imagery with structural control.",
      ko: "확산 모델과 구조 제어를 활용해 훼손된 문화유산 이미지를 복원하는 실험 파이프라인입니다.",
    },
    outcome: {
      en: "Bronze Prize · 30th Daejeon Student Science Exploration Olympiad, Science Club Activity Presentation · Superintendent of Education Award",
      ko: "제30회 대전광역시 학생과학탐구올림픽대회 과학동아리활동발표회 동상 · 교육감상",
    },
    cardOutcome: { en: "Bronze Prize · Daejeon Science Olympiad" },
    award: {
      en: "Bronze Prize · 30th Daejeon Student Science Exploration Olympiad, Science Club Activity Presentation · Superintendent of Education Award",
      ko: "제30회 대전광역시 학생과학탐구올림픽대회 과학동아리활동발표회 동상 · 교육감상",
    },
    details: [
      {
        en: "Compared img2img, inpainting, and ControlNet workflows for reconstructing fronts, backs, body regions, and missing structures.",
        ko: "정면·후면·신체 영역과 결손 구조를 복원하기 위해 img2img, inpainting, ControlNet 방식을 비교했습니다.",
      },
      {
        en: "Proposed the research direction and built a reproducible Colab experiment pipeline later used by the Pineapple computer club.",
        ko: "연구 주제를 제안하고 재현 가능한 Colab 실험 파이프라인을 구축해 파인애플 정보동아리 활동으로 확장했습니다.",
      },
    ],
    stack: ["Python", "Stable Diffusion", "ControlNet", "Inpainting", "Colab"],
  },
].sort(
  (left, right) =>
    projectOrder.indexOf(left.id) - projectOrder.indexOf(right.id),
);

export const timeline: TimelineItem[] = [
  {
    period: "Feb 2026 - Present",
    dateRanges: [{ start: "2026-02", end: "present" }],
    title: { en: "DGIST undergraduate studies", ko: "DGIST 학부 과정" },
    category: { en: "Education", ko: "교육" },
    kind: "education",
    summary: {
      en: "School of Undergraduate Studies; GPA 4.21 / 4.30, with interests across computing, mathematics, and research.",
      ko: "DGIST 기초학부에서 GPA 4.21 / 4.30을 기록하며 컴퓨팅, 수학 및 연구 관심사를 확장하고 있습니다.",
    },
    externalLink: {
      href: "https://college.dgist.ac.kr/",
      label: { en: "School of Undergraduate Studies", ko: "기초학부 공식 사이트" },
    },
  },
  {
    period: "Jul 2026",
    dateRanges: [{ start: "2026-07", end: "2026-07" }],
    title: { en: "UCPC 2026 Final Round", ko: "UCPC 2026 본선" },
    category: { en: "Problem Solving", ko: "Problem Solving" },
    kind: "problem-solving",
    summary: {
      en: "Placed 28th of 60 finalist teams after advancing from a 149-team preliminary field.",
      ko: "149개 예선 참가 팀 중 본선에 진출해 60개 본선 팀 가운데 28위를 기록했습니다.",
    },
  },
  {
    period: "Feb 2022 - Present",
    dateRanges: [{ start: "2022-02", end: "present" }],
    title: { en: "Ep - Fishing Game", ko: "이프 - 낚시게임" },
    category: { en: "Project", ko: "Project" },
    kind: "project",
    summary: {
      en: "Developing and operating a production fishing game used by 400,000+ people across 53,000+ communities.",
      ko: "40만 명 이상이 5만 3천 개 이상의 커뮤니티에서 이용하는 낚시 게임을 개발·운영하고 있습니다.",
    },
    projectId: "ep",
  },
  {
    period: "Mar 2024 - Jan 2026",
    dateRanges: [{ start: "2024-03", end: "2026-01" }],
    title: { en: "Daejeon Science High School", ko: "대전과학고등학교" },
    category: { en: "Education", ko: "교육" },
    kind: "education",
    summary: {
      en: "Completed high school with a 3.70 / 4.30 GPA while pursuing research, software, and competitive programming.",
      ko: "GPA 3.70 / 4.30으로 졸업하며 연구, 소프트웨어 및 경쟁 프로그래밍 활동을 수행했습니다.",
    },
    externalLink: {
      href: "https://djshs.djsch.kr/",
      label: { en: "Official website", ko: "대전과학고등학교 공식 사이트" },
    },
  },
  {
    period: "Mar - Nov 2026",
    dateRanges: [{ start: "2026-03", end: "2026-11" }],
    title: { en: "2026 DGIST SNS Supporters", ko: "2026년 DGIST SNS 서포터즈" },
    category: { en: "Leadership & Activities", ko: "Leadership & Activities" },
    kind: "leadership",
    summary: {
      en: "Leading team DGILOG in planning and producing official social media content for the 2026 DGIST SNS Supporters program.",
      ko: "DGILOG 팀장으로 2026년 DGIST SNS 서포터즈의 공식 SNS 콘텐츠를 기획하고 제작하고 있습니다.",
    },
    projectId: "dgist-sns-supporters",
  },
  {
    period: "Mar 2026 - Present",
    dateRanges: [{ start: "2026-03", end: "present" }],
    title: { en: "Lectio Reading Community", ko: "독서모임 렉티오" },
    category: { en: "Leadership & Activities", ko: "Leadership & Activities" },
    kind: "leadership",
    summary: {
      en: "Co-founded Lectio and operate @lectio_in_life, creating content that shares perspectives on books and broader conversations around reading.",
      ko: "독서모임 렉티오를 공동 설립하고 @lectio_in_life를 운영하며, 책에 대한 의견과 독서를 둘러싼 다양한 이야기를 콘텐츠로 만들고 있습니다.",
    },
    projectId: "lectio",
    externalLink: {
      href: "https://www.instagram.com/lectio_in_life/",
      label: { en: "@lectio_in_life", ko: "@lectio_in_life" },
    },
  },
  {
    period: "Apr 2023 - Aug 2025",
    dateRanges: [{ start: "2023-04", end: "2025-08" }],
    title: { en: "Pineapple Computer Club", ko: "파인애플 정보동아리" },
    category: { en: "Leadership & Activities", ko: "Leadership & Activities" },
    kind: "leadership",
    summary: {
      en: "Served as president in 2024 and revitalized the long-running school computer club through broader projects and activities.",
      ko: "2024년 회장을 맡아 오랜 역사의 교내 정보동아리를 다양한 프로젝트와 활동 중심으로 활성화했습니다.",
    },
  },
  {
    period: "Mar - Nov 2025",
    dateRanges: [{ start: "2025-03", end: "2025-11" }],
    title: {
      en: "Self-Correction Quantization for Korean LLMs",
      ko: "한국어 LLM을 위한 Self-Correction Quantization",
    },
    category: { en: "Research", ko: "Research" },
    kind: "research",
    summary: {
      en: "Proposed SCQ and evaluated Korean LLM quantization up to 12.8B parameters, including memory and reasoning trade-offs.",
      ko: "SCQ를 제안하고 최대 12.8B 한국어 LLM에서 메모리 절감과 추론 성능의 균형을 평가했습니다.",
    },
    projectId: "scq",
  },
  {
    period: "2017 - 2020; 2023 - 2025",
    dateRanges: [
      { start: "2017-01", end: "2020-12" },
      { start: "2023-01", end: "2025-12" },
    ],
    title: { en: "Korea Olympiad in Informatics", ko: "한국정보올림피아드" },
    category: { en: "Problem Solving", ko: "Problem Solving" },
    kind: "problem-solving",
    summary: {
      en: "Earned four consecutive National Silver Prizes, two Regional Grand Prizes, and additional high-school division awards.",
      ko: "전국 은상 4회 연속 수상, 지역 대상 2회 및 고등부 본선·1차 대회 수상 기록을 쌓았습니다.",
    },
  },
  {
    period: "Mar - Dec 2024",
    dateRanges: [{ start: "2024-03", end: "2024-12" }],
    title: { en: "Infomaker", ko: "Infomaker" },
    category: { en: "Leadership & Activities", ko: "Leadership & Activities" },
    kind: "leadership",
    summary: {
      en: "Founded and led the school's first algorithm problem-solving club, teaching and supporting about 20 students.",
      ko: "교내 최초 알고리즘 문제 해결 동아리를 창립하고 약 20명의 학생을 대상으로 교육과 활동을 이끌었습니다.",
    },
  },
  {
    period: "Mar 2024 - Nov 2025",
    dateRanges: [{ start: "2024-03", end: "2025-11" }],
    title: {
      en: "DSHStack - Student-Run Programming Contests",
      ko: "DSHStack - 학생 주도 프로그래밍 대회",
    },
    category: { en: "Problem Solving", ko: "Problem Solving" },
    kind: "problem-solving",
    summary: {
      en: "Created a repeatable student-run contest series and led its planning, problem setting, review, and BOJ operations.",
      ko: "지속 가능한 학생 주도 대회 시리즈를 만들고 기획·출제·검수·BOJ 운영을 총괄했습니다.",
    },
    projectId: "dshstack",
  },
  {
    period: "Mar - Jun 2025",
    dateRanges: [{ start: "2025-03", end: "2025-06" }],
    title: {
      en: "Sangsaeng-ieum - Multilingual Worker Support Platform",
      ko: "상생이음 - 다국어 외국인 노동자 지원 플랫폼",
    },
    category: { en: "Project", ko: "Project" },
    kind: "project",
    summary: {
      en: "Led a multilingual support platform for foreign workers; received an Honorable Mention at an AI convergence hackathon.",
      ko: "외국인 노동자를 위한 다국어 지원 플랫폼을 이끌어 AI 융합 정책 발굴 해커톤 장려상을 수상했습니다.",
    },
    projectId: "sangsaeng",
  },
  {
    period: "2025",
    dateRanges: [{ start: "2025-01", end: "2025-12" }],
    title: {
      en: "Automated MMPI-2 Response Analysis with LLMs",
      ko: "LLM 기반 MMPI-2 응답 자동 분석",
    },
    category: { en: "Research", ko: "Research" },
    kind: "research",
    summary: {
      en: "Applied MMPI-2 to several language models and compared their scale scores and response biases.",
      ko: "여러 언어 모델에 MMPI-2를 적용해 모델별 척도 점수와 응답 편향을 비교했습니다.",
    },
    projectId: "gpt-mmpi2",
  },
  {
    period: "Mar 2024 - Jan 2025",
    dateRanges: [{ start: "2024-03", end: "2025-01" }],
    title: {
      en: "3D Gaussian Splatting Capture Quality Study",
      ko: "3D Gaussian Splatting 촬영 품질 연구",
    },
    category: { en: "Research", ko: "Research" },
    kind: "research",
    summary: {
      en: "Led 33 controlled reconstruction experiments; received the Grand Prize and Minister of Science and ICT Award.",
      ko: "33개 통제 조건의 복원 실험을 이끌어 대상 및 과학기술정보통신부장관상을 수상했습니다.",
    },
    projectId: "3dgs",
  },
  {
    period: "Jul - Nov 2024",
    dateRanges: [{ start: "2024-07", end: "2024-11" }],
    title: {
      en: "SnowMix - AI Web Accessibility Assistant",
      ko: "SnowMix - AI 웹 접근성 도우미",
    },
    category: { en: "Project", ko: "Project" },
    kind: "project",
    summary: {
      en: "Led an AI-assisted browser accessibility project that received a Bronze Prize in a national software competition.",
      ko: "AI 기반 브라우저 접근성 프로젝트를 이끌어 전국 고등학교 동아리 소프트웨어 경진대회 동상을 수상했습니다.",
    },
    projectId: "snowmix",
  },
  {
    period: "Jun - Sep 2024",
    dateRanges: [{ start: "2024-06", end: "2024-09" }],
    title: {
      en: "Accessible Indoor Navigation for Visually Impaired Users",
      ko: "시각장애인을 위한 실내 내비게이션",
    },
    category: { en: "Project", ko: "Project" },
    kind: "project",
    summary: {
      en: "Built a mobile indoor navigation program that guides visually impaired users with spoken directions and elevator-prioritized accessible routes.",
      ko: "시각장애인에게 음성 길안내와 엘리베이터 우선 접근성 경로를 제공하는 모바일 실내 내비게이션 프로그램을 개발했습니다.",
    },
    projectId: "arkit",
  },
  {
    period: "2023 - 2024",
    dateRanges: [{ start: "2023-01", end: "2024-12" }],
    title: {
      en: "Cultural Heritage Image Restoration",
      ko: "문화유산 이미지 복원",
    },
    category: { en: "Research", ko: "Research" },
    kind: "research",
    summary: {
      en: "Explored img2img, inpainting, and ControlNet for structurally guided cultural-heritage restoration.",
      ko: "img2img, inpainting, ControlNet을 활용한 구조 보존 문화유산 복원 방식을 탐구했습니다.",
    },
    projectId: "stable-diffusion",
  },
  {
    period: "Oct 2024",
    dateRanges: [{ start: "2024-10", end: "2024-10" }],
    title: { en: "Nexon Youth Programming Challenge", ko: "넥슨 청소년 프로그래밍 챌린지" },
    category: { en: "Problem Solving", ko: "Problem Solving" },
    kind: "problem-solving",
    summary: {
      en: "Reached the finals in the NYPC 15-19 Division.",
      ko: "NYPC 15-19세 부문 본선에 진출했습니다.",
    },
  },
  {
    period: "2018 - 2020",
    dateRanges: [{ start: "2018-01", end: "2020-12" }],
    title: { en: "Information Technology Gifted Education", ko: "정보영재교육" },
    category: { en: "Project", ko: "Project" },
    kind: "project",
    summary: {
      en: "Built a C++ typing tutor, a Python vocabulary tool, and a KoGPT2 conversational bot.",
      ko: "C++ 타자 연습, Python 어휘 학습, KoGPT2 대화형 봇을 제작했습니다.",
    },
  },
];
