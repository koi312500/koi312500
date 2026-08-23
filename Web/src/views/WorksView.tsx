import { useEffect, useState } from "react";
import { CaseStudyDialog } from "../components/CaseStudyDialog";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/content";
import { workGroups } from "../data/workGroups";
import { readProjectId, type Language } from "../lib/navigation";
import type { Project } from "../types";

const projectById = new Map(projects.map((project) => [project.id, project]));
const projectNumberById = new Map<string, number>(
  workGroups
    .flatMap((group) => group.projectIds)
    .map((projectId, index) => [projectId, index + 1]),
);

export function WorksView({ language }: { language: Language }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [highlightedProjectId, setHighlightedProjectId] = useState(() =>
    readProjectId(window.location.pathname, window.location.hash),
  );

  useEffect(() => {
    const onRouteChange = () =>
      setHighlightedProjectId(
        readProjectId(window.location.pathname, window.location.hash),
      );
    window.addEventListener("popstate", onRouteChange);
    return () => window.removeEventListener("popstate", onRouteChange);
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
    <section className="works-view" aria-labelledby="works-title">
      <h1 id="works-title" className="sr-only">
        Works
      </h1>
      <div className="project-groups">
        {workGroups.map((group) => {
          const groupedProjects = group.projectIds
            .map((projectId) => projectById.get(projectId))
            .filter((project): project is Project => Boolean(project));

          return (
            <section
              className="project-group"
              aria-labelledby={`project-group-${group.id}`}
              key={group.id}
            >
              <header className="work-group-header">
                <h2 id={`project-group-${group.id}`}>{group.title[language]}</h2>
                <span>
                  {String(groupedProjects.length).padStart(2, "0")} {language === "en" ? "works" : "개 항목"}
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
