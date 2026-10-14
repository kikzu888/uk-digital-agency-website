import { afterEach, describe, expect, it, vi } from "vitest";

import { newsArticles, portfolioProjects, services } from "../lib/content";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("sitemap", () => {
  it("contains static and dynamic public routes", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
    const { default: sitemap } = await import("../app/sitemap");
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("http://localhost:3000");
    expect(urls).toContain("http://localhost:3000/privacy-policy");

    for (const service of services) {
      expect(urls).toContain(`http://localhost:3000/services/${service.slug}`);
    }

    for (const article of newsArticles) {
      expect(urls).toContain(`http://localhost:3000/news/${article.slug}`);
    }

    for (const project of portfolioProjects) {
      expect(urls).toContain(`http://localhost:3000/portfolio/${project.slug}`);
    }
  });
});
