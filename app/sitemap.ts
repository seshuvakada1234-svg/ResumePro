import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freeresume.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/builder`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/ats-checker`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/ats-score`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/ats-format`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resume-guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resume-examples`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resume-score`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/preview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/template-preview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}