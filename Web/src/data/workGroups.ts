import type { LocalizedText, TimelineItem } from "../types";

export const workGroups = [
  {
    id: "project",
    title: { en: "Project", ko: "Project" },
    projectIds: ["ep", "sangsaeng", "snowmix", "arkit"],
  },
  {
    id: "research",
    title: { en: "Research", ko: "Research" },
    projectIds: ["scq", "gpt-mmpi2", "3dgs", "stable-diffusion"],
  },
  {
    id: "problem-solving",
    title: { en: "Problem Solving", ko: "Problem Solving" },
    projectIds: ["dshstack"],
  },
] as const;

export const timelineGroups: Array<{
  id: TimelineItem["kind"];
  title: LocalizedText;
}> = [
  { id: "education", title: { en: "Education", ko: "Education" } },
  {
    id: "problem-solving",
    title: { en: "Problem Solving", ko: "Problem Solving" },
  },
  { id: "research", title: { en: "Research", ko: "Research" } },
  { id: "project", title: { en: "Project", ko: "Project" } },
  { id: "leadership", title: { en: "Leadership", ko: "Leadership" } },
];
