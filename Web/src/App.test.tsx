import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("App shell and About view", () => {
  beforeEach(() => {
    window.location.hash = "#about";
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the identity and all four navigation destinations", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /kim geon woo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/university student/i)).toBeInTheDocument();
    expect(screen.getByText(/daegu, south korea/i)).toBeInTheDocument();
    expect(screen.getByText("18 April 2007")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "koi312500@gmail.com" }),
    ).toHaveAttribute("href", "mailto:koi312500@gmail.com");
    const githubLink = screen.getByRole("link", { name: "koi312500" });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/koi312500",
    );
    expect(githubLink.querySelector(".detail-github-mark")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "https://koi3125.com" }),
    ).toHaveAttribute("href", "https://koi3125.com/");
    expect(screen.queryByText(/view résumé/i)).not.toBeInTheDocument();

    expect(
      [...document.querySelectorAll(".detail-item > span")].map(
        (item) => item.textContent,
      ),
    ).toEqual([
      "Daegu, South Korea",
      "koi312500@gmail.com",
      "18 April 2007",
      "DGIST · School of Undergraduate Studies",
      "koi312500",
      "https://koi3125.com",
    ]);

    for (const label of ["About", "Skills", "Projects", "Timeline"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("switches language and theme without exposing a phone number", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "한국어로 보기" }));
    expect(
      screen.getByText("대학생 · 경쟁 프로그래머 · 개발자 · 연구자"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "다크 모드로 전환" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.body).not.toHaveTextContent(/\+82|010[- ]?\d{4}/);
  });
});

describe("portfolio views", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders grouped skills from the skills hash", () => {
    window.location.hash = "#skills";
    render(<App />);

    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Languages" }),
    ).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders featured projects with verified external links", () => {
    window.location.hash = "#projects";
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "SnowMix" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /snowmix github/i }),
    ).toHaveAttribute("href", "https://github.com/koi312500/SnowMix");

    const snowMixCard = screen
      .getByRole("heading", { name: "SnowMix" })
      .closest("article");

    expect(snowMixCard).toHaveAttribute("data-project-id", "snowmix");
    expect(within(snowMixCard!).getByText("02")).toHaveClass(
      "project-card__index",
    );
    expect(
      snowMixCard!.querySelector(".project-card__accent"),
    ).not.toBeInTheDocument();
  });

  it("opens and dismisses an accessible project case study", async () => {
    const user = userEvent.setup();
    window.location.hash = "#projects";
    const appRoot = document.createElement("div");
    appRoot.id = "root";
    document.body.append(appRoot);
    render(<App />, { container: appRoot });

    const trigger = screen.getByRole("button", { name: "SnowMix case study" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "SnowMix" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/national bronze prize/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close case study" }),
    ).toHaveFocus();
    expect(appRoot).toHaveAttribute("inert");

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(within(dialog).getByRole("link", { name: "GitHub" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(appRoot).not.toHaveAttribute("inert");
    expect(trigger).toHaveFocus();
  });

  it("renders the chronological timeline", () => {
    window.location.hash = "#timeline";
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Timeline" }),
    ).toBeInTheDocument();
    expect(screen.getByText("DGIST undergraduate studies")).toBeInTheDocument();
    expect(screen.getByText("2017 - 2025")).toBeInTheDocument();
  });
});
