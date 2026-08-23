import { CircleDot } from "lucide-react";
import { SkillBadge } from "../components/SkillBadge";
import { skillGroups } from "../data/content";
import type { Language } from "../lib/navigation";

export function SkillsView({ language }: { language: Language }) {
  return (
    <section className="skills-view" aria-labelledby="skills-title">
      <h1 id="skills-title" className="sr-only">
        {language === "en" ? "Skills" : "기술"}
      </h1>
      <div
        className="skill-legend"
        aria-label={language === "en" ? "Skill level legend" : "기술 수준 범례"}
      >
        <span>
          <i className="legend-dot legend-dot--filled" />
          {language === "en" ? "Main workflow" : "주요 워크플로"}
        </span>
        <span>
          <i className="legend-dot" />
          {language === "en" ? "Proficient / in use" : "활용 가능 / 사용 중"}
        </span>
      </div>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <section className="skill-group" key={group.title.en}>
            <h2>
              <CircleDot aria-hidden="true" />
              {group.title[language]}
            </h2>
            <div className="skill-list">
              {group.items.map((skill) => (
                <SkillBadge {...skill} key={skill.label} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
