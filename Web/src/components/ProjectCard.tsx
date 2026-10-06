import { ArrowUpRight, Trophy } from "lucide-react";
import type { Language } from "../lib/navigation";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  projectIndex: number;
  classification: string;
  language: Language;
  highlighted: boolean;
  onOpen: (project: Project) => void;
};

export function ProjectCard({
  project,
  projectIndex,
  classification,
  language,
  highlighted,
  onOpen,
}: ProjectCardProps) {
  const isActivity = project.kind === "activity";
  const isStudy = project.kind === "study";
  const overviewLabel = isStudy
    ? language === "en" ? "Study overview" : "학습 개요"
    : isActivity
      ? language === "en" ? "Activity overview" : "활동 개요"
      : language === "en" ? "Project overview" : "프로젝트 개요";
  const detailsLabel = isStudy
    ? language === "en" ? "Study details" : "학습 상세"
    : isActivity
      ? language === "en" ? "Activity details" : "활동 상세"
      : language === "en" ? "Project details" : "프로젝트 상세";
  const title = project.title[language];
  const outcome = project.cardOutcome?.[language] ?? project.outcome[language];
  const outcomeIsAward =
    project.award?.[language] === project.outcome[language];

  return (
    <article
      className={`project-card${highlighted ? " is-highlighted" : ""}`}
      data-project-id={project.id}
      id={`project-${project.id}`}
    >
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__index" aria-hidden="true">
            {String(projectIndex).padStart(2, "0")}
          </span>
          <span>{classification}</span>
          <span>{project.period}</span>
        </div>
        <h2>{title}</h2>
        <div className="project-card__description">
          <span>{overviewLabel}</span>
          <p className="project-card__summary">{project.summary[language]}</p>
        </div>
        <div className="project-card__result">
          <span>
            {isStudy ? (language === "en" ? "Focus" : "학습 내용") : isActivity ? (language === "en" ? "Focus" : "주요 활동") : language === "en" ? "Result" : "결과"}
          </span>
          <p>
            {outcomeIsAward ? <Trophy aria-hidden="true" /> : null}
            <span>{outcome}</span>
          </p>
        </div>
        <div className="project-card__footer">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`${title} ${detailsLabel}`}
          >
            {detailsLabel}
            <ArrowUpRight aria-hidden="true" />
          </button>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${title} GitHub`}
            >
              GitHub
            </a>
          ) : null}
          {project.externalLink ? (
            <a
              href={project.externalLink.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.externalLink.label[language]}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
