import { Globe2, Languages, Moon, Sun } from "lucide-react";
import type { Language } from "../lib/navigation";
import type { ViewId } from "../lib/navigation";
import profileImage from "../../kyungsol_KOI3125_Paint23.png";

type BrandHeaderProps = {
  language: Language;
  theme: "light" | "dark";
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
  activeView: ViewId;
};

export function BrandHeader({
  language,
  theme,
  onLanguageToggle,
  onThemeToggle,
  activeView,
}: BrandHeaderProps) {
  return (
    <header className="topbar">
      {activeView !== "about" ? (
        <a className="brand-lockup" href="/about" aria-label="About Geonwoo Kim">
          <span className="brand-avatar" aria-hidden="true">
            <img src={profileImage} alt="" />
          </span>
          <strong>KIM GEON WOO</strong>
          <span>{language === "en" ? "Developer portfolio" : "김건우 개발자 포트폴리오"}</span>
        </a>
      ) : (
        <span />
      )}
      <div className="top-actions">
        <a
          className="icon-action"
          href="https://github.com/koi312500"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <img
            className="github-icon"
            src={`${import.meta.env.BASE_URL}github-mark.svg`}
            alt=""
          />
        </a>
        <a
          className="icon-action"
          href="/sitemap"
          aria-label={language === "en" ? "Site map" : "사이트 맵"}
        >
          <Globe2 aria-hidden="true" />
        </a>
        <button
          className="icon-action"
          type="button"
          onClick={onLanguageToggle}
          aria-label={language === "en" ? "한국어로 보기" : "View in English"}
        >
          <Languages aria-hidden="true" />
        </button>
        <button
          className="icon-action"
          type="button"
          onClick={onThemeToggle}
          aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
        >
          {theme === "light" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
