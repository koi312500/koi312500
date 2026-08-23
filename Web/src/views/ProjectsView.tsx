import { useState } from "react";
import { CaseStudyDialog } from "../components/CaseStudyDialog";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/content";
import type { Language } from "../lib/navigation";
import type { Project } from "../types";

export function ProjectsView({ language }: { language: Language }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="projects-view" aria-labelledby="projects-title">
      <h1 id="projects-title" className="sr-only">
        {language === "en" ? "Projects" : "프로젝트"}
      </h1>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            projectIndex={index + 1}
            language={language}
            onOpen={setSelected}
            key={project.id}
          />
        ))}
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
