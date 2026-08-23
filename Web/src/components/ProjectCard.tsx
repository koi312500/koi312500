import { ArrowUpRight } from "lucide-react";
import type { Language } from "../lib/navigation";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  projectIndex: number;
  language: Language;
  onOpen: (project: Project) => void;
};

export function ProjectCard({
  project,
  projectIndex,
  language,
  onOpen,
}: ProjectCardProps) {
  return (
    <article className="project-card" data-project-id={project.id}>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__index" aria-hidden="true">
            {String(projectIndex).padStart(2, "0")}
          </span>
          <span>{project.category[language]}</span>
          <span>{project.period}</span>
        </div>
        <h2>{project.title}</h2>
        <p className="project-card__summary">{project.summary[language]}</p>
        <div className="project-card__footer">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={
              language === "en"
                ? `${project.title} case study`
                : `${project.title} 자세히 보기`
            }
          >
            {language === "en" ? "Case study" : "자세히 보기"}
            <ArrowUpRight aria-hidden="true" />
          </button>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} GitHub`}
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
