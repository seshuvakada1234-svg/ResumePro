import { MetadataRoute } from "next";
import { RESUME_EXAMPLES } from "@/lib/resume-examples-db";
import { CAREER_TIPS_DB } from "@/lib/career-tips-db";
import { BLOG_POSTS_DB } from "@/lib/blog-db";
import { templates } from "@/constants/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freeresume.dev";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/templates`,
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
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume-for-freshers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume-writing-guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ats-resume-format`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ats-score`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic templates pages (/templates/[slug])
  const templatePages: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${baseUrl}/templates/${template.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic examples pages (/examples/[slug])
  const examplePages: MetadataRoute.Sitemap = Object.values(RESUME_EXAMPLES).map((item) => ({
    url: `${baseUrl}/examples/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Maintain support/indexing for current resume-examples path as well
  const resumeExamplePages: MetadataRoute.Sitemap = Object.values(RESUME_EXAMPLES).map((item) => ({
    url: `${baseUrl}/resume-examples/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic career resources & tips
  const tipPages: MetadataRoute.Sitemap = Object.values(CAREER_TIPS_DB).map((item) => ({
    url: `${baseUrl}/tips/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic career blog posts paths
  const blogPages: MetadataRoute.Sitemap = Object.values(BLOG_POSTS_DB).map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Root blog directory
  const blogRootPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }
  ];

  return [
    ...staticPages,
    ...templatePages,
    ...examplePages,
    ...resumeExamplePages,
    ...tipPages,
    ...blogRootPage,
    ...blogPages,
  ];
}
