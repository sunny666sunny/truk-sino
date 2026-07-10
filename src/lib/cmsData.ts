import { prisma } from "@/lib/prisma-client";
import {
  allNews as staticNews,
  allProducts as staticProducts,
  allVideos as staticVideos,
  productCategories as staticCategories,
  type NewsArticleData,
  type ProductCategoryData,
  type ProductData,
  type VideoData,
} from "@/lib/pageData";

type JsonObject = Record<string, unknown>;

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function formatSpec(item: unknown) {
  const spec = item as JsonObject;
  const label = asText(spec.label, "Specification");
  const value = asText(spec.value);
  const unit = asText(spec.unit);
  return { label, value: unit ? `${value} ${unit}`.trim() : value };
}

function formatGallery(item: unknown, fallbackAlt: string) {
  const image = item as JsonObject;
  const src = asText(image.src, asText(image.url));
  if (!src) return null;
  return { src, alt: asText(image.alt, fallbackAlt) };
}

function formatFeature(item: unknown) {
  const feature = item as JsonObject;
  return {
    title: asText(feature.title, "Feature"),
    description: asText(feature.description),
  };
}

function contentToHtml(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim()) return value;
  const blocks = asArray(value)
    .map((block) => {
      if (typeof block === "string") return `<p>${block}</p>`;
      const data = block as JsonObject;
      const text = asText(data.text, asText(data.content));
      return text ? `<p>${text}</p>` : "";
    })
    .filter(Boolean)
    .join("\n");
  return blocks || `<p>${fallback}</p>`;
}

function htmlToText(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function mergeBySlug<T extends { slug: string }>(fallback: T[], records: T[]) {
  const map = new Map(fallback.map((item) => [item.slug, item]));
  for (const item of records) map.set(item.slug, item);
  return [...map.values()];
}

export async function getProductCategories(): Promise<ProductCategoryData[]> {
  try {
    const categories = await prisma.productCategory.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: { products: { where: { status: { not: "draft" } }, take: 1 } },
    });

    const records = categories.map((cat) => {
      const fallback = staticCategories.find((item) => item.slug === cat.slug);
      const firstProduct = cat.products[0];
      return {
        name: cat.name,
        slug: cat.slug,
        description: fallback?.description ?? `${cat.name} products and solutions.`,
        image: firstProduct?.heroImage ?? fallback?.image ?? "/images/hero-banner-1.png",
      };
    });

    return mergeBySlug(staticCategories, records);
  } catch {
    return staticCategories;
  }
}

export async function getProducts(): Promise<ProductData[]> {
  try {
    const products = await prisma.product.findMany({
      where: { status: { not: "draft" } },
      include: { category: true },
      orderBy: [{ sortOrder: "desc" }, { updatedAt: "desc" }],
    });

    const records = products.map((product) => {
      const fallback = staticProducts.find((item) => item.slug === product.slug);
      const categorySlug = product.category.slug;
      const category = product.category.name;
      const image = product.heroImage ?? fallback?.image ?? "/images/hero-banner-1.png";
      const gallery = asArray(product.gallery)
        .map((item) => formatGallery(item, product.name))
        .filter((item): item is { src: string; alt: string } => Boolean(item));
      const specs = asArray(product.specifications).map(formatSpec).filter((spec) => spec.value);
      const features = asArray(product.features).map(formatFeature).filter((feature) => feature.description);
      const contentHtml = contentToHtml(product.content, product.excerpt ?? fallback?.description ?? "");

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category,
        categorySlug,
        subCategory: product.subCategory ?? fallback?.subCategory ?? category,
        image,
        gallery: gallery.length ? gallery : fallback?.gallery ?? [{ src: image, alt: product.name }],
        excerpt: product.excerpt ?? fallback?.excerpt ?? "",
        badge: product.status === "upcoming" ? "New" : fallback?.badge,
        seoTitle: product.seoTitle ?? fallback?.seoTitle,
        seoDescription: product.seoDescription ?? fallback?.seoDescription,
        specs: specs.length ? specs : fallback?.specs ?? [],
        description: htmlToText(contentHtml),
        features: features.length ? features : fallback?.features ?? [],
      } satisfies ProductData;
    });

    return mergeBySlug(staticProducts, records);
  } catch {
    return staticProducts;
  }
}

export async function getProductBySlug(category: string, slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug && product.categorySlug === category);
}

export async function getNewsArticles(): Promise<NewsArticleData[]> {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: { status: "published" },
      orderBy: { publishDate: "desc" },
    });

    const records = articles.map((article) => {
      const fallback = staticNews.find((item) => item.slug === article.slug);
      const excerpt = article.excerpt ?? fallback?.excerpt ?? "";
      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        date: article.publishDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        excerpt,
        image: article.featuredImage ?? fallback?.image ?? "/images/hero-banner-1.png",
        content: contentToHtml(article.content, fallback?.content ?? excerpt),
        tags: article.tags.length ? article.tags : fallback?.tags ?? [],
        seoTitle: article.seoTitle ?? fallback?.seoTitle,
        seoDescription: article.seoDescription ?? fallback?.seoDescription,
      } satisfies NewsArticleData;
    });

    return mergeBySlug(staticNews, records);
  } catch {
    return staticNews;
  }
}

export async function getNewsArticle(slug: string) {
  const articles = await getNewsArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getVideos(): Promise<VideoData[]> {
  try {
    const videos = await prisma.video.findMany({
      orderBy: [{ sortOrder: "desc" }, { updatedAt: "desc" }],
    });

    const records = videos.map((video) => {
      const fallback = staticVideos.find((item) => item.slug === video.slug);
      return {
        id: video.id,
        title: video.title,
        slug: video.slug,
        thumbnail: video.thumbnail ?? fallback?.thumbnail ?? "/images/hero-banner-1.png",
        description: video.seoDescription ?? fallback?.description ?? "SINOTRUK product and brand video.",
        duration: video.duration ?? fallback?.duration ?? "",
        videoUrl: video.videoUrl ?? fallback?.videoUrl,
        seoTitle: video.seoTitle ?? fallback?.seoTitle,
        seoDescription: video.seoDescription ?? fallback?.seoDescription,
      } satisfies VideoData;
    });

    return mergeBySlug(staticVideos, records);
  } catch {
    return staticVideos;
  }
}

export async function getVideo(slug: string) {
  const videos = await getVideos();
  return videos.find((video) => video.slug === slug);
}