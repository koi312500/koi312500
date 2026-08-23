(() => {
  const languageKey = "portfolio-language";
  const themeKey = "portfolio-theme";

  const readLanguage = () =>
    window.localStorage.getItem(languageKey) === "ko" ? "ko" : "en";
  const readTheme = () =>
    window.localStorage.getItem(themeKey) === "dark" ? "dark" : "light";

  function applyPreferences(language = readLanguage(), theme = readTheme()) {
    const root = document.documentElement;
    root.lang = language;
    root.dataset.theme = theme;
    window.localStorage.setItem(languageKey, language);
    window.localStorage.setItem(themeKey, theme);

    document.querySelectorAll("[data-language]").forEach((element) => {
      element.hidden = element.dataset.language !== language;
    });

    const page = document.body;
    const title = language === "ko" ? page?.dataset.titleKo : page?.dataset.titleEn;
    const description =
      language === "ko" ? page?.dataset.descriptionKo : page?.dataset.descriptionEn;
    if (title) document.title = title;
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.setAttribute(
        "aria-label",
        language === "en" ? "한국어로 보기" : "View in English",
      );
    });

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.querySelectorAll("[data-theme-icon]").forEach((icon) => {
        icon.toggleAttribute("hidden", icon.dataset.themeIcon !== theme);
      });
      button.setAttribute(
        "aria-label",
        language === "en"
          ? theme === "light"
            ? "Switch to dark mode"
            : "Switch to light mode"
          : theme === "light"
            ? "다크 모드로 전환"
            : "라이트 모드로 전환",
      );
    });

    window.dispatchEvent(
      new CustomEvent("utilitypreferenceschange", { detail: { language, theme } }),
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyPreferences();

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = document.documentElement.lang === "en" ? "ko" : "en";
        applyPreferences(next, readTheme());
      });
    });

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyPreferences(readLanguage(), next);
      });
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === languageKey || event.key === themeKey) applyPreferences();
  });
})();
