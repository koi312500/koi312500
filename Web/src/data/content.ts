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
    label: { en: "Daegu, South Korea", ko: "대한민국 대구" },
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
      ko: "DGIST · School of Undergraduate Studies",
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
      { label: "REST APIs", level: "proficient" },
      { label: "Linux", level: "proficient" },
    ],
  },
  {
    title: { en: "Frontend", ko: "Frontend" },
    items: [
      { label: "React", level: "main" },
      { label: "Vite", level: "main" },
      { label: "HTML", level: "main" },
      { label: "CSS", level: "main" },
      { label: "Browser Extensions", level: "proficient" },
    ],
  },
  {
    title: { en: "Data & AI", ko: "Data & AI" },
    items: [
      { label: "PyTorch", level: "main" },
      { label: "LLM Quantization", level: "main" },
      { label: "KoGPT2", level: "proficient" },
      { label: "Computer Vision", level: "proficient" },
      { label: "3DGS", level: "proficient" },
    ],
  },
  {
    title: { en: "Tools", ko: "Tools" },
    items: [
      { label: "Git", level: "main" },
      { label: "Docker", level: "proficient" },
      { label: "Polygon", level: "main" },
      { label: "testlib", level: "main" },
      { label: "Typst", level: "proficient" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "ep",
    title: "KimuStory - Ep",
    period: "2022 - Present",
    category: { en: "Production game service", ko: "상용 게임 서비스" },
    role: { en: "Main Developer", ko: "메인 개발자" },
    summary: {
      en: "A stateful fishing game serving 400,000+ users across 53,000+ communities.",
      ko: "40만 명 이상의 사용자가 5만 3천 개 이상의 커뮤니티에서 이용하는 상태 기반 낚시 게임입니다.",
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
    id: "snowmix",
    title: "SnowMix",
    period: "Jul - Nov 2024",
    category: { en: "AI-assisted web accessibility", ko: "AI 웹 접근성" },
    role: { en: "Team Lead & Lead Developer", ko: "팀장 · 메인 개발자" },
    summary: {
      en: "A browser extension and AI service that makes dynamic visual content navigable and color-blind friendly.",
      ko: "동적 시각 콘텐츠를 탐색 가능한 설명과 색각 보정 이미지로 변환하는 브라우저 확장 및 AI 서비스입니다.",
    },
    outcome: {
      en: "National Bronze Prize",
      ko: "전국 동상",
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
    title: "Sangsaeng-ieum",
    period: "Mar - Jun 2025",
    category: { en: "AI support platform", ko: "AI 지원 플랫폼" },
    role: { en: "Team Lead", ko: "팀장" },
    summary: {
      en: "A prototype connecting foreign workers with jobs, multilingual guidance, and safer contract workflows.",
      ko: "외국인 노동자에게 일자리 매칭, 다국어 안내, 전자 계약 및 행정 절차를 연결하는 프로토타입입니다.",
    },
    outcome: { en: "Provincial Governor's Award", ko: "도지사상" },
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
    title: "Self-Correction Quantization",
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
    title: "3D Gaussian Splatting R&E",
    period: "Mar - Dec 2024",
    category: { en: "Metaverse content research", ko: "메타버스 콘텐츠 연구" },
    role: { en: "Team Lead", ko: "팀장" },
    summary: {
      en: "A controlled study of capture conditions that affect 3D Gaussian Splatting reconstruction quality.",
      ko: "촬영 조건이 3D Gaussian Splatting 복원 품질에 미치는 영향을 통제 실험으로 분석했습니다.",
    },
    outcome: {
      en: "Grand Prize · Minister of Science and ICT Award",
      ko: "대상 · 과학기술정보통신부장관상",
    },
    details: [
      {
        en: "Designed 33 dataset conditions and automated evaluation with PSNR, SSIM, and LPIPS.",
        ko: "33개 데이터 조건을 설계하고 PSNR, SSIM, LPIPS 평가 파이프라인을 자동화했습니다.",
      },
    ],
    stack: ["Python", "3DGS", "PSNR", "SSIM", "LPIPS"],
  },
  {
    id: "arkit",
    title: "ARKit Indoor Navigation",
    period: "Jun - Sep 2024",
    category: { en: "Accessible indoor navigation", ko: "접근성 실내 내비게이션" },
    role: { en: "Developer", ko: "개발자" },
    summary: {
      en: "An iOS prototype that maps indoor anchors and provides audio routing for visually impaired users.",
      ko: "실내 공간 앵커를 지도화하고 시각장애인에게 음성 경로를 제공하는 iOS 프로토타입입니다.",
    },
    outcome: { en: "Accessibility-aware A* routing", ko: "접근성 가중 A* 경로 탐색" },
    details: [
      {
        en: "Built a 3D graph from ARKit anchors and repeatedly calibrated school-building routes to reduce sensor-induced errors.",
        ko: "ARKit 앵커로 3D 그래프를 구성하고 교내 경로를 반복 보정해 센서 오차를 줄였습니다.",
      },
    ],
    stack: ["Swift", "ARKit", "A*", "Spatial Audio"],
  },
];

export const timeline: TimelineItem[] = [
  {
    period: "Feb 2026 - Present",
    title: { en: "DGIST undergraduate studies", ko: "DGIST 학부 과정" },
    category: { en: "Education", ko: "교육" },
    summary: {
      en: "School of Undergraduate Studies; pursuing computing, mathematics, and research interests.",
      ko: "School of Undergraduate Studies에서 컴퓨팅, 수학 및 연구 관심사를 확장하고 있습니다.",
    },
  },
  {
    period: "2024 - 2026",
    title: { en: "Research, projects, and community leadership", ko: "연구·프로젝트·커뮤니티 리더십" },
    category: { en: "Building", ko: "활동" },
    summary: {
      en: "Led R&E, accessibility projects, algorithm clubs, and student programming contests.",
      ko: "R&E, 접근성 프로젝트, 알고리즘 동아리와 학생 프로그래밍 대회를 이끌었습니다.",
    },
  },
  {
    period: "Feb 2022 - Present",
    title: { en: "KimuStory - Ep", ko: "KimuStory - Ep" },
    category: { en: "Production", ko: "서비스" },
    summary: {
      en: "Developing and operating a production fishing game used by more than 400,000 people.",
      ko: "40만 명 이상이 이용하는 낚시 게임을 개발·운영하고 있습니다.",
    },
  },
  {
    period: "2017 - 2025",
    title: { en: "Korea Olympiad in Informatics", ko: "한국정보올림피아드" },
    category: { en: "Competitive programming", ko: "경쟁 프로그래밍" },
    summary: {
      en: "National and regional awards across nine years of algorithmic problem solving.",
      ko: "9년간 알고리즘 문제 해결에 참여하며 전국 및 지역 대회에서 수상했습니다.",
    },
  },
  {
    period: "2018 - 2020",
    title: { en: "Information Technology Gifted Education", ko: "정보영재교육" },
    category: { en: "Early projects", ko: "초기 프로젝트" },
    summary: {
      en: "Built a C++ typing tutor, a Python vocabulary tool, and a KoGPT2 conversational bot.",
      ko: "C++ 타자 연습, Python 어휘 학습, KoGPT2 대화형 봇을 제작했습니다.",
    },
  },
];
