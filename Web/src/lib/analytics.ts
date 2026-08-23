declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementPattern = /^G-[A-Z0-9]{6,}$/;

export function initAnalytics(measurementId?: string): boolean {
  if (!measurementId || !measurementPattern.test(measurementId)) return false;

  if (document.querySelector("script[data-ga-loader]")) return true;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gaLoader = "true";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
  return true;
}
