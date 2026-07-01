export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  image: string;
  excerpt: string;
  specs: { label: string; value: string; unit?: string }[];
  features: { title: string; description: string; icon?: string }[];
  badge?: string;
  brochure?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subCategories: { name: string; slug: string }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  videoUrl?: string;
}

export interface PartCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  country: string;
  company?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
}

export interface OfficeLocation {
  region: string;
  salesEmail: string;
  supportEmail: string;
}
