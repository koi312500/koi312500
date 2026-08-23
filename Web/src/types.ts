import type { Language } from "./lib/navigation";

export type LocalizedText = Record<Language, string>;

export type SkillBadgeData = {
  label: string;
  level: "main" | "proficient";
};

export type DetailItem = {
  icon: "location" | "birthday" | "github" | "email" | "education" | "website";
  label: LocalizedText;
  href?: string;
};

export type SkillGroup = {
  title: LocalizedText;
  items: SkillBadgeData[];
};

export type Project = {
  id: string;
  title: LocalizedText;
  period: string;
  category: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  outcome: LocalizedText;
  cardOutcome?: Partial<LocalizedText>;
  award?: LocalizedText;
  details: LocalizedText[];
  stack: string[];
  github?: string;
  website?: string;
};

export type TimelineItem = {
  period: string;
  title: LocalizedText;
  category: LocalizedText;
  kind: "project" | "research" | "problem-solving" | "leadership" | "education";
  sortOrder: number;
  summary: LocalizedText;
  projectId?: string;
};
