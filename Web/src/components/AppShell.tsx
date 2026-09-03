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
      <footer>© 2026 KOI3125. All rights reserved.</footer>
    </div>
  );
}
