import { useEffect, useState } from "react";
import { CaseStudyDialog } from "../components/CaseStudyDialog";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/content";
import { readProjectId, type Language } from "../lib/navigation";
import type { Project } from "../types";

const projectGroups = [
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

const projectById = new Map(projects.map((project) => [project.id, project]));
const projectNumberById = new Map<string, number>(
  projectGroups
    .flatMap((group) => group.projectIds)
    .map((projectId, index) => [projectId, index + 1]),
);

export function ProjectsView({ language }: { language: Language }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [highlightedProjectId, setHighlightedProjectId] = useState(() =>
    readProjectId(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () =>
      setHighlightedProjectId(readProjectId(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!highlightedProjectId) return;

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(`project-${highlightedProjectId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [highlightedProjectId]);

  return (
    <section className="projects-view" aria-labelledby="projects-title">
      <h1 id="projects-title" className="sr-only">
        {language === "en" ? "Projects" : "프로젝트"}
      </h1>
      <div className="project-groups">
        {projectGroups.map((group) => {
          const groupedProjects = group.projectIds
            .map((projectId) => projectById.get(projectId))
            .filter((project): project is Project => Boolean(project));

          return (
            <section
              className="project-group"
              aria-labelledby={`project-group-${group.id}`}
              key={group.id}
            >
              <header className="project-group__header">
                <h2 id={`project-group-${group.id}`}>{group.title[language]}</h2>
                <span>
                  {String(groupedProjects.length).padStart(2, "0")} {language === "en" ? "projects" : "개 프로젝트"}
                </span>
              </header>
              <div className="project-grid">
                {groupedProjects.map((project) => (
                  <ProjectCard
                    project={project}
                    projectIndex={projectNumberById.get(project.id) ?? 0}
                    classification={group.title[language]}
                    language={language}
                    highlighted={highlightedProjectId === project.id}
                    onOpen={setSelected}
                    key={project.id}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {selected ? (
        <CaseStudyDialog
          project={selected}
          language={language}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </section>
  );
}
