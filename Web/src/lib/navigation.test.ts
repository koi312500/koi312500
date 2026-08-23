import { describe, expect, it } from "vitest";
import { readView, viewMeta } from "./navigation";

describe("readView", () => {
  it.each(["about", "skills", "projects", "timeline"])(
    "reads the %s view from the hash",
    (view) => {
      expect(readView(`#${view}`)).toBe(view);
    },
  );

  it("falls back to about for an empty or unknown hash", () => {
    expect(readView("")).toBe("about");
    expect(readView("#unknown")).toBe("about");
  });
});

describe("viewMeta", () => {
  it("provides unique English titles for every view", () => {
    const titles = ["about", "skills", "projects", "timeline"].map((view) =>
      viewMeta(view as Parameters<typeof viewMeta>[0], "en").title,
    );

    expect(new Set(titles).size).toBe(4);
    expect(titles[0]).toBe("About | Geonwoo Kim");
  });

  it("provides localized Korean metadata", () => {
    expect(viewMeta("projects", "ko")).toEqual({
      title: "프로젝트 | 김건우",
      description: "김건우의 주요 소프트웨어, 접근성, AI 및 연구 프로젝트입니다.",
    });
  });
});
