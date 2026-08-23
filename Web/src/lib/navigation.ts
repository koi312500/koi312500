export type ViewId = "about" | "skills" | "works" | "timeline";
export type Language = "en" | "ko";

type ViewMetadata = {
  title: string;
  description: string;
};

const viewIds: ViewId[] = ["about", "skills", "works", "timeline"];

const metadata: Record<Language, Record<ViewId, ViewMetadata>> = {
  en: {
    about: {
      title: "About | Geonwoo Kim",
      description:
        "Geonwoo Kim is an undergraduate, competitive programmer, developer, and researcher at DGIST.",
    },
    skills: {
      title: "Skills | Geonwoo Kim",
      description:
        "Languages, systems, web, data, AI, and engineering tools used by Geonwoo Kim.",
    },
    works: {
      title: "Works | Geonwoo Kim",
      description:
        "Selected software projects, research, and problem-solving work by Geonwoo Kim.",
    },
    timeline: {
      title: "Timeline | Geonwoo Kim",
      description:
        "Education, competitions, research, and leadership milestones from Geonwoo Kim.",
    },
  },
  ko: {
    about: {
      title: "소개 | 김건우",
      description: "DGIST 학부생이자 경쟁 프로그래머, 개발자, 연구자인 김건우입니다.",
    },
    skills: {
      title: "기술 | 김건우",
      description: "김건우가 사용하는 언어, 시스템, 웹, 데이터, AI 및 개발 도구입니다.",
    },
    works: {
      title: "Works | 김건우",
      description: "김건우의 주요 프로젝트, 연구 및 문제 해결 활동입니다.",
    },
    timeline: {
      title: "타임라인 | 김건우",
      description: "김건우의 교육, 대회, 연구 및 리더십 활동을 시간순으로 정리했습니다.",
    },
  },
};

export function readView(hash: string): ViewId {
  const candidate = hash.replace(/^#/, "").toLowerCase().split("/")[0];
  if (candidate === "projects") return "works";
  return viewIds.includes(candidate as ViewId) ? (candidate as ViewId) : "about";
}

export function readProjectId(hash: string): string | null {
  const [view, projectId] = hash.replace(/^#/, "").toLowerCase().split("/");
  return (view === "works" || view === "projects") && projectId ? projectId : null;
}

export function viewMeta(view: ViewId, language: Language): ViewMetadata {
  return metadata[language][view];
}
