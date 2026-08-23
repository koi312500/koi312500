import { afterEach, beforeEach, describe, expect, it } from "vitest";
import styles from "./styles.css?inline";

describe("Figma-proportioned adaptive layout", () => {
  let styleElement: HTMLStyleElement;

  beforeEach(() => {
    styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.append(styleElement);
  });

  afterEach(() => {
    styleElement.remove();
    document.body.replaceChildren();
  });

  it("uses Pretendard consistently for Latin and Korean text", () => {
    document.body.innerHTML = `
      <main>
        <h1>GEONWOO KIM</h1>
        <div class="name-line"><span>김건우</span></div>
      </main>
    `;

    const expected = '"Pretendard Variable", Pretendard, system-ui, sans-serif';
    expect(getComputedStyle(document.body).fontFamily).toBe(expected);
    expect(
      getComputedStyle(document.querySelector(".name-line span")!).fontFamily,
    ).toBe(expected);
  });

  it("publishes the 1920 by 1080 Figma reference tokens", () => {
    const root = getComputedStyle(document.documentElement);

    expect(root.getPropertyValue("--reference-width").trim()).toBe("120rem");
    expect(root.getPropertyValue("--reference-height").trim()).toBe("67.5rem");
    expect(root.getPropertyValue("--reference-nav-width").trim()).toBe(
      "42.125rem",
    );
    expect(root.getPropertyValue("--reference-coral").trim()).toBe("#fd806a");
  });

  it("matches the Frame 1 identity geometry", () => {
    document.body.innerHTML = `
      <section class="about-view">
        <div class="identity-row">
          <div class="avatar-wrap"></div>
          <div class="identity-copy">
            <div class="name-line"><h1>KIM GEON WOO</h1></div>
            <p class="role-line">University student · Competitive programmer · Developer · Researcher</p>
          </div>
        </div>
        <div class="featured-skills"></div>
        <div class="detail-grid">
          <div class="detail-item"><span>DGIST · School of Undergraduate Studies</span></div>
        </div>
      </section>
    `;

    expect(
      getComputedStyle(document.querySelector(".about-view")!).maxWidth,
    ).toBe("650px");
    expect(
      getComputedStyle(document.querySelector(".avatar-wrap")!).width,
    ).toBe("93px");
    expect(getComputedStyle(document.querySelector("h1")!).fontSize).toBe(
      "48px",
    );
    expect(
      getComputedStyle(document.querySelector(".role-line")!).fontSize,
    ).toBe("13px");
    expect(
      getComputedStyle(document.querySelector(".role-line")!).whiteSpace,
    ).toBe("nowrap");
    expect(
      getComputedStyle(document.querySelector(".featured-skills")!).marginLeft,
    ).toBe("0px");
    expect(
      getComputedStyle(document.querySelector(".featured-skills")!).marginTop,
    ).toBe("16px");
    expect(
      getComputedStyle(document.querySelector(".featured-skills")!)
        .marginBottom,
    ).toBe("24px");
    expect(
      getComputedStyle(document.querySelector(".detail-grid")!).marginLeft,
    ).toBe("0px");
    expect(
      getComputedStyle(document.querySelector(".detail-grid")!).columnGap,
    ).toBe("48px");
    expect(
      getComputedStyle(document.querySelector(".detail-grid")!)
        .gridTemplateColumns,
    ).toBe("minmax(0, 0.9fr) minmax(0, 1.1fr)");
    expect(
      getComputedStyle(document.querySelector(".detail-item span")!)
        .whiteSpace,
    ).toBe("nowrap");
  });

  it("matches the Frame 6 skills width and badge scale", () => {
    document.body.innerHTML = `
      <section class="skills-view">
        <div class="skill-legend"></div>
        <div class="skill-groups">
          <section class="skill-group">
            <div class="skill-list"><span class="skill-badge">C++</span></div>
          </section>
        </div>
      </section>
    `;

    expect(
      getComputedStyle(document.querySelector(".skills-view")!).maxWidth,
    ).toBe("860px");
    expect(
      getComputedStyle(document.querySelector(".skill-legend")!).justifyContent,
    ).toBe("center");
    expect(
      getComputedStyle(document.querySelector(".skills-view .skill-badge")!)
        .fontSize,
    ).toBe("16px");
  });

  it("preserves each desktop view's vertical anchor", () => {
    document.body.innerHTML = `
      <div class="page-shell page-shell--skills">
        <main class="main-stage"></main>
      </div>
    `;

    expect(
      getComputedStyle(document.querySelector(".main-stage")!).paddingTop,
    ).not.toBe("0px");
  });

  it("matches the Frame 7 tile grid", () => {
    document.body.innerHTML = `
      <section class="projects-view">
        <div class="project-grid"><article class="project-card"></article></div>
      </section>
    `;

    expect(
      getComputedStyle(document.querySelector(".projects-view")!).maxWidth,
    ).toBe("548px");
    expect(
      getComputedStyle(document.querySelector(".project-grid")!).columnGap,
    ).toBe("28px");
    expect(
      getComputedStyle(document.querySelector(".project-grid")!).rowGap,
    ).toBe("24px");
    expect(
      getComputedStyle(document.querySelector(".project-card")!).height,
    ).toBe("130px");
  });

  it("contains independent width and height adaptations", () => {
    expect(styles).toContain("@media (max-width: 680px)");
    expect(styles).toContain(
      "@media (max-height: 800px) and (min-width: 681px)",
    );
    expect(styles).toContain("grid-template-columns: 1fr");
    expect(styles).toContain(
      "padding: 1rem 1rem calc(7rem + env(safe-area-inset-bottom))",
    );
    expect(styles).not.toContain("transform: scale(");
  });

  it("keeps the desktop brand lockup subordinate to page content", () => {
    document.body.innerHTML = `
      <a class="brand-lockup">
        <span class="brand-avatar"></span>
        <strong>KIM GEON WOO</strong>
        <span>Developer portfolio</span>
      </a>
      <button class="icon-action"><svg></svg></button>
    `;

    expect(getComputedStyle(document.querySelector("strong")!).fontSize).toBe(
      "17.6px",
    );
    expect(
      getComputedStyle(document.querySelector(".brand-lockup span:last-child")!)
        .fontSize,
    ).toBe("11.2px");
    expect(
      getComputedStyle(document.querySelector(".brand-avatar")!).width,
    ).toBe("27px");
    expect(
      getComputedStyle(document.querySelector(".icon-action svg")!).width,
    ).toBe("24px");
  });
});
