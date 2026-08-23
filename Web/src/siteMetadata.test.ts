import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";
import notFoundHtml from "../public/404.html?raw";
import privacyHtml from "../public/privacy/index.html?raw";
import robots from "../public/robots.txt?raw";
import sitemap from "../public/sitemap.xml?raw";
import viteConfig from "../vite.config";

const parseHtml = (source: string) =>
  new DOMParser().parseFromString(source, "text/html");

describe("public site address", () => {
  it("builds the application for the koi3125.com root", () => {
    expect(viteConfig.base).toBe("/");
  });

  it("publishes canonical and social metadata for koi3125.com", () => {
    const document = parseHtml(indexHtml);
    const structuredData = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://koi3125.com/");
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
    ).toBe("https://koi3125.com/");
    expect(
      document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
    ).toBe("https://koi3125.com/og.png");
    expect(structuredData.url).toBe("https://koi3125.com/");
  });

  it("keeps discovery and fallback links on the custom domain root", () => {
    const notFound = parseHtml(notFoundHtml);
    const privacy = parseHtml(privacyHtml);

    expect(robots).toContain("Sitemap: https://koi3125.com/sitemap.xml");
    expect(sitemap).toContain("<loc>https://koi3125.com/</loc>");
    expect(sitemap).toContain("<loc>https://koi3125.com/privacy/</loc>");
    expect(notFound.querySelector("a")?.getAttribute("href")).toBe("/#about");
    expect(privacy.querySelector("a.back")?.getAttribute("href")).toBe(
      "/#about",
    );
  });
});
