import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { readView, viewMeta, type Language, type ViewId } from "./lib/navigation";
import { AboutView } from "./views/AboutView";
import { ProjectsView } from "./views/ProjectsView";
import { SkillsView } from "./views/SkillsView";
import { TimelineView } from "./views/TimelineView";

type Theme = "light" | "dark";

function storedLanguage(): Language {
  return window.localStorage.getItem("portfolio-language") === "ko" ? "ko" : "en";
}

function storedTheme(): Theme {
  return window.localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
}

export default function App() {
  const [view, setView] = useState<ViewId>(() => readView(window.location.hash));
  const [language, setLanguage] = useState<Language>(storedLanguage);
  const [theme, setTheme] = useState<Theme>(storedTheme);

  useEffect(() => {
    const onHashChange = () => setView(readView(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const metadata = viewMeta(view, language);
    document.title = metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", metadata.description);
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-language", language);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [language, theme, view]);

  return (
    <AppShell
      activeView={view}
      language={language}
      theme={theme}
      onLanguageToggle={() => setLanguage((current) => (current === "en" ? "ko" : "en"))}
      onThemeToggle={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
    >
      {view === "about" ? <AboutView language={language} /> : null}
      {view === "skills" ? <SkillsView language={language} /> : null}
      {view === "projects" ? <ProjectsView language={language} /> : null}
      {view === "timeline" ? <TimelineView language={language} /> : null}
    </AppShell>
  );
}
