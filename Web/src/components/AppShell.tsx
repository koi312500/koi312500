import type { PropsWithChildren } from "react";
import type { Language, ViewId } from "../lib/navigation";
import { BottomNav } from "./BottomNav";
import { BrandHeader } from "./BrandHeader";

type AppShellProps = PropsWithChildren<{
  activeView: ViewId;
  language: Language;
  theme: "light" | "dark";
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
}>;

export function AppShell({
  activeView,
  language,
  theme,
  onLanguageToggle,
  onThemeToggle,
  children,
}: AppShellProps) {
  return (
    <div className={`page-shell page-shell--${activeView}`}>
      <BrandHeader
        activeView={activeView}
        language={language}
        theme={theme}
        onLanguageToggle={onLanguageToggle}
        onThemeToggle={onThemeToggle}
      />
      <main className="main-stage">{children}</main>
      <BottomNav activeView={activeView} language={language} />
      <footer><nav aria-label={language === "ko" ? "서비스 정책" : "Service policies"}><a href="/privacy">{language === "ko" ? "개인정보처리방침" : "Privacy policy"}</a>{" · "}<a href="/terms">{language === "ko" ? "이용약관" : "Terms of use"}</a></nav>© 2026 KOI3125. All rights reserved.</footer>
    </div>
  );
}
