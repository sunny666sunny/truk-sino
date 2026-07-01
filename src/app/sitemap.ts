import type { MetadataRoute } from "next";
import { allProducts, allNews, allVideos, productCategories } from "@/lib/pageData";
import { partCategories } from "@/lib/data";

const SITE_URL = "https://sinotruk.com";

// Part-category slugs (matching toSlug() output)
const partSlugs = [
  "cabin-and-body",
  "engine",
  "gearbox",
  "axle",
  "chassis",
  "other-parts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about/who-we-are`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about/our-journey`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/our-facilities`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/social-responsibility`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/video`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/service/after-sales-service`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/service/service-broadcast`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/service/maintenance-manual`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/parts`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // ── Product category pages ──
  const categoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${SITE_URL}/products/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Product detail pages ──
  const productPages: MetadataRoute.Sitemap = allProducts.map((p) => ({
    url: `${SITE_URL}/products/${p.categorySlug}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── News article pages ──
  const newsPages: MetadataRoute.Sitemap = allNews.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Video pages ──
  const videoPages: MetadataRoute.Sitemap = allVideos.map((v) => ({
    url: `${SITE_URL}/video/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // ── Parts category pages ──
  const partsPages: MetadataRoute.Sitemap = partSlugs.map((slug) => ({
    url: `${SITE_URL}/parts/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...newsPages,
    ...videoPages,
    ...partsPages,
  ];
}
