import { afterEach, describe, expect, it } from "vitest";
import { initAnalytics } from "./analytics";

declare global {
  interface Window {
    dataLayer?: unknown[][];
  }
}

afterEach(() => {
  document.querySelectorAll("script[data-ga-loader]").forEach((node) => node.remove());
  delete window.dataLayer;
});

describe("initAnalytics", () => {
  it("does not load analytics without a valid GA4 measurement ID", () => {
    expect(initAnalytics()).toBe(false);
    expect(initAnalytics("UA-1234")).toBe(false);
    expect(document.querySelector("script[data-ga-loader]")).toBeNull();
  });

  it("loads a valid measurement ID only once", () => {
    expect(initAnalytics("G-ABCD1234")).toBe(true);
    expect(initAnalytics("G-ABCD1234")).toBe(true);

    const scripts = document.querySelectorAll("script[data-ga-loader]");
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute(
      "src",
      "https://www.googletagmanager.com/gtag/js?id=G-ABCD1234",
    );
    expect(window.dataLayer).toHaveLength(2);
  });
});
