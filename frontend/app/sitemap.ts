import type { MetadataRoute } from "next";

import { newsArticles, portfolioProjects, services } from "../lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/news",
    "/contact",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-and-conditions",
    "/accessibility-statement",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...newsArticles.map((article) => ({
      url: `${siteUrl}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...portfolioProjects.map((project) => ({
      url: `${siteUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
