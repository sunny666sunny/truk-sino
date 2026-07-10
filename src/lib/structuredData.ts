const SITE_URL = "https://sinotrukteam.com";

/**
 * Organization schema — appears on every page via root layout.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SINOTRUK International",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "China's leading heavy truck manufacturer and exporter, serving 90+ countries with HOWO series trucks, special vehicles, and semi-trailers.",
    foundingDate: "1993",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 777, Jing Shi Road, High-Tech Development Zone",
      addressLocality: "Jinan",
      addressRegion: "Shandong",
      postalCode: "250101",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@sinotruk.com",
        telephone: "+86-531-8888-8888",
        availableLanguage: ["English", "French", "Spanish"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/sinotruk",
      "https://www.youtube.com/@sinotruk",
      "https://www.linkedin.com/company/sinotruk",
    ],
  };
}

/**
 * Product schema — used on product detail pages.
 */
export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  category: string;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http")
      ? product.image
      : `${SITE_URL}${product.image}`,
    brand: {
      "@type": "Brand",
      name: "SINOTRUK",
    },
    model: product.name,
    category: product.category,
    ...(product.sku ? { sku: product.sku } : {}),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/contact`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      price: "0",
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

/**
 * Article schema — used on news article pages.
 */
export function articleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image}`,
    datePublished: article.datePublished,
    author: {
      "@type": article.author ? "Person" : "Organization",
      name: article.author ?? "SINOTRUK International",
    },
    publisher: {
      "@type": "Organization",
      name: "SINOTRUK International",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_URL,
    },
  };
}

/**
 * BreadcrumbList schema — used on any page with breadcrumbs.
 */
export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}` }
        : {}),
    })),
  };
}

/**
 * FAQPage schema — used on pages with FAQ sections.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
