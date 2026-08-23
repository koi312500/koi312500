import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { timeline } from "../data/content";
import { timelineGroups } from "../data/workGroups";
import type { Language } from "../lib/navigation";
import type { TimelineItem } from "../types";

type TimelineMode = "grouped" | "all";

function WorkLink({ item, language }: { item: TimelineItem; language: Language }) {
  if (!item.projectId) return null;

  return (
    <a className="timeline-project-link" href={`#works/${item.projectId}`}>
      {language === "en" ? "View work" : "Works에서 보기"}
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function GroupedTimeline({ language }: { language: Language }) {
  return (
    <div className="timeline-groups">
      {timelineGroups.map((group) => {
        const items = timeline
          .filter((item) => item.kind === group.id)
          .sort((left, right) => right.sortOrder - left.sortOrder);

        if (items.length === 0) return null;

        return (
          <section
            className="timeline-group"
            aria-labelledby={`timeline-group-${group.id}`}
            key={group.id}
          >
            <header className="work-group-header">
              <h2 id={`timeline-group-${group.id}`}>{group.title[language]}</h2>
              <span>
                {String(items.length).padStart(2, "0")} {language === "en" ? "entries" : "개 항목"}
              </span>
            </header>
            <ol className="timeline-list timeline-list--grouped">
              {items.map((item) => (
                <li key={`${item.period}-${item.title.en}`}>
                  <time>{item.period}</time>
                  <div className="timeline-marker" aria-hidden="true" />
                  <article>
                    <h3>{item.title[language]}</h3>
                    <p>{item.summary[language]}</p>
                    <WorkLink item={item} language={language} />
                  </article>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

function AllTimeline({ language, items }: { language: Language; items: TimelineItem[] }) {
  return (
    <ol className="timeline-list">
      {items.map((item) => (
        <li key={`${item.period}-${item.title.en}`}>
          <time>{item.period}</time>
          <div className="timeline-marker" aria-hidden="true" />
          <article>
            <span>{item.category[language]}</span>
            <h2>{item.title[language]}</h2>
            <p>{item.summary[language]}</p>
            <WorkLink item={item} language={language} />
          </article>
        </li>
      ))}
    </ol>
  );
}

export function TimelineView({ language }: { language: Language }) {
  const [mode, setMode] = useState<TimelineMode>("grouped");
  const sortedTimeline = useMemo(
    () => [...timeline].sort((left, right) => right.sortOrder - left.sortOrder),
    [],
  );

  return (
    <section className="timeline-view" aria-labelledby="timeline-title">
      <h1 id="timeline-title" className="sr-only">
        {language === "en" ? "Timeline" : "타임라인"}
      </h1>
      <nav
        className="timeline-toolbar"
        aria-label={language === "en" ? "Timeline view" : "타임라인 보기"}
      >
        <button
          className={mode === "grouped" ? "is-active" : undefined}
          type="button"
          aria-pressed={mode === "grouped"}
          onClick={() => setMode("grouped")}
        >
          Grouped
        </button>
        <button
          className={mode === "all" ? "is-active" : undefined}
          type="button"
          aria-pressed={mode === "all"}
          onClick={() => setMode("all")}
        >
          All
        </button>
      </nav>
      <div className="timeline-scroll-area">
        {mode === "grouped" ? (
          <GroupedTimeline language={language} />
        ) : (
          <AllTimeline language={language} items={sortedTimeline} />
        )}
      </div>
    </section>
  );
}
