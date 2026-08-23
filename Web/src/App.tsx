import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import {
  canonicalPortfolioPath,
  readView,
  viewMeta,
  type Language,
  type ViewId,
} from "./lib/navigation";
import { AboutView } from "./views/AboutView";
import { WorksView } from "./views/WorksView";
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
  const [view, setView] = useState<ViewId>(() =>
    readView(window.location.pathname, window.location.hash),
  );
  const [language, setLanguage] = useState<Language>(storedLanguage);
  const [theme, setTheme] = useState<Theme>(storedTheme);

  useEffect(() => {
    const syncRoute = () => {
      const canonicalPath = canonicalPortfolioPath(
        window.location.pathname,
        window.location.hash,
      );
      if (canonicalPath && `${window.location.pathname}${window.location.hash}` !== canonicalPath) {
        window.history.replaceState(null, "", canonicalPath);
      }
      setView(readView(window.location.pathname, window.location.hash));
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const canonicalPath = canonicalPortfolioPath(destination.pathname, destination.hash);
      if (!canonicalPath) return;

      event.preventDefault();
      window.history.pushState(null, "", canonicalPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    syncRoute();
    window.addEventListener("popstate", syncRoute);
    document.addEventListener("click", onDocumentClick);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      document.removeEventListener("click", onDocumentClick);
    };
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
      {view === "works" ? <WorksView language={language} /> : null}
      {view === "timeline" ? <TimelineView language={language} /> : null}
    </AppShell>
  );
}
