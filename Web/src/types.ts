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
  kind?: "project" | "activity";
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
  externalLink?: {
    href: string;
    label: LocalizedText;
  };
};

export type TimelineMonth = `${number}-${number}`;

export type TimelineDateRange = {
  start: TimelineMonth;
  end: TimelineMonth | "present";
};

export type TimelineItem = {
  period: string;
  dateRanges: TimelineDateRange[];
  title: LocalizedText;
  category: LocalizedText;
  kind: "education" | "problem-solving" | "research" | "project" | "leadership";
  summary: LocalizedText;
  projectId?: string;
  externalLink?: {
    href: string;
    label: LocalizedText;
  };
};
