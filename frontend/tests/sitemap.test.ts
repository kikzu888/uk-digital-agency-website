import { describe, expect, it } from "vitest";

import sitemap from "../app/sitemap";
import { newsArticles, portfolioProjects, services } from "../lib/content";

describe("sitemap", () => {
  it("contains static and dynamic public routes", () => {
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
