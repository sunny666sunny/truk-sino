export type Stats = {
  products: number;
  articles: number;
  inquiries: number;
  inquiriesNew: number;
  subscribers: number;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  icon?: string | null;
  order?: number;
  active?: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  status: string;
  subCategory?: string | null;
  excerpt?: string | null;
  heroImage?: string | null;
  gallery?: unknown;
  content?: unknown;
  specifications?: unknown;
  features?: unknown;
  brochure?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sortOrder: number;
  categoryId: string;
  category?: Category;
  updatedAt: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  status: string;
  author?: string | null;
  excerpt?: string | null;
  featuredImage?: string | null;
  content?: unknown;
  tags?: string[];
  faqs?: unknown;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishDate: string;
};

export type Video = {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  videoUrl?: string | null;
  duration?: string | null;
  sortOrder: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt: string;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size?: number | null;
  alt?: string | null;
  caption?: string | null;
  createdAt: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  company?: string | null;
  productInterest?: string | null;
  message: string;
  status: string;
  createdAt: string;
};