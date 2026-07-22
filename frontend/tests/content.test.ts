import { describe, expect, it } from "vitest";

import { newsArticles, portfolioProjects, services } from "../lib/content";

describe("frontend content contracts", () => {
  it("keeps analytics disabled by default", () => {
    expect(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none").toBe("none");
  });

  it("includes all required service pages", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "digital-marketing",
      "web-development",
      "ai-automation-processes",
      "crm-solutions",
      "cybersecurity-services",
    ]);
  });

  it("marks demo portfolio projects as placeholders", () => {
    expect(portfolioProjects.length).toBeGreaterThan(0);
    expect(portfolioProjects.every((project) => project.isPlaceholder)).toBe(true);
  });

  it("keeps news articles published with SEO-friendly slugs", () => {
    expect(newsArticles.length).toBeGreaterThan(0);
    expect(newsArticles.every((article) => article.status === "published")).toBe(true);
    expect(newsArticles.every((article) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug))).toBe(
      true,
    );
  });
});
