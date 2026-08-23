import { ArrowRight } from "lucide-react";
import { timeline } from "../data/content";
import type { Language } from "../lib/navigation";

export function TimelineView({ language }: { language: Language }) {
  return (
    <section className="timeline-view" aria-labelledby="timeline-title">
      <h1 id="timeline-title" className="sr-only">
        {language === "en" ? "Timeline" : "타임라인"}
      </h1>
      <ol className="timeline-list">
        {timeline.map((item) => (
          <li key={`${item.period}-${item.title.en}`}>
            <time>{item.period}</time>
            <div className="timeline-marker" aria-hidden="true" />
            <article>
              <span>{item.category[language]}</span>
              <h2>{item.title[language]}</h2>
              <p>{item.summary[language]}</p>
              {item.projectId ? (
                <a
                  className="timeline-project-link"
                  href={`#projects/${item.projectId}`}
                >
                  {language === "en" ? "View project" : "프로젝트 보기"}
                  <ArrowRight aria-hidden="true" />
                </a>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
