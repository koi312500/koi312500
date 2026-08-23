import { Box, CalendarClock, Hammer, UserRound } from "lucide-react";
import type { Language, ViewId } from "../lib/navigation";

type BottomNavProps = {
  activeView: ViewId;
  language: Language;
};

const items: Array<{
  id: ViewId;
  icon: typeof UserRound;
  label: Record<Language, string>;
}> = [
  { id: "about", icon: UserRound, label: { en: "About", ko: "About" } },
  { id: "skills", icon: Hammer, label: { en: "Skills", ko: "Skills" } },
  { id: "works", icon: Box, label: { en: "Works", ko: "Works" } },
  { id: "timeline", icon: CalendarClock, label: { en: "Timeline", ko: "Timeline" } },
];

export function BottomNav({ activeView, language }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Portfolio">
      {items.map(({ id, icon: Icon, label }) => (
        <a
          className={`nav-link${activeView === id ? " is-active" : ""}`}
          href={`/${id}`}
          aria-current={activeView === id ? "page" : undefined}
          key={id}
        >
          <Icon aria-hidden="true" />
          <span>{label[language]}</span>
        </a>
      ))}
    </nav>
  );
}
