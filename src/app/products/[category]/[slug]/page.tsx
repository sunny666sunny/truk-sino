import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { allProducts, productCategories } from "@/lib/pageData";
import JsonLd from "@/components/shared/JsonLd";
import { productSchema } from "@/lib/structuredData";

/* ── Types ── */
type Props = {
  params: Promise<{ category: string; slug: string }>;
};

/* ── Static Params ── */
export function generateStaticParams() {
  return allProducts.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

/* ── Dynamic Metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found | TrukSino International" };
  }

  return {
    title: `${product.name} | TrukSino International`,
    description: product.excerpt,
  };
}

/* ── Page ── */
export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const product = allProducts.find((p) => p.slug === slug && p.categorySlug === category);

  if (!product) notFound();

  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === category && p.slug !== slug)
    .slice(0, 3);

  return (
    <SubPageLayout>
      {/* ── Product Structured Data ── */}
      <JsonLd
        data={productSchema({
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category,
        })}
      />

      <PageHero
        title={product.name}
        subtitle={product.excerpt}
        image={product.image}
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: product.category, href: `/products/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* ── Main Content: Gallery + Specs ── */}
      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ── Left: Gallery ── */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                {/* Main image */}
                <div className="rounded-[var(--radius-brand-lg)] overflow-hidden bg-white shadow-[var(--shadow-card)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>

                {/* Thumbnail strip — stacked vertically */}
                {product.gallery.length > 1 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-[var(--radius-brand)] overflow-hidden bg-white shadow-[var(--shadow-card)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ScrollReveal>

              {/* ── Description ── */}
              <ScrollReveal delay={0.15}>
                <div className="mt-12">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] mb-6">
                    Overview
                  </h2>
                  <p className="text-[var(--color-ink-light)] leading-relaxed text-base md:text-lg">
                    {product.description}
                  </p>
                </div>
              </ScrollReveal>

              {/* ── Features ── */}
              {product.features.length > 0 && (
                <ScrollReveal delay={0.2}>
                  <div className="mt-12">
                    <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] mb-8">
                      Key Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {product.features.map((feat) => (
                        <div
                          key={feat.title}
                          className="bg-white rounded-[var(--radius-brand)] p-6 shadow-[var(--shadow-card)]"
                        >
                          <h3 className="font-[family-name:var(--font-condensed)] font-bold text-lg text-[var(--color-ink)] mb-2">
                            {feat.title}
                          </h3>
                          <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* ── Right: Specs Sidebar ── */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={0.1}>
                <div className="sticky top-28 bg-white rounded-[var(--radius-brand-lg)] shadow-[var(--shadow-card)] p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mb-6">
                    Specifications
                  </h3>

                  <dl className="divide-y divide-[var(--color-divider)]">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="py-3 first:pt-0 last:pb-0">
                        <dt className="text-xs font-[family-name:var(--font-condensed)] font-semibold uppercase tracking-wider text-[var(--color-ink-light)] mb-0.5">
                          {spec.label}
                        </dt>
                        <dd className="text-base text-[var(--color-ink)] font-medium">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8">
                    <Button href={`/contact?product=${encodeURIComponent(product.name)}`} variant="primary" size="lg" className="w-full">
                      Request Quote
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container-main">
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] mb-10">
                Related Products
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rp, i) => (
                <ScrollReveal key={rp.id} delay={i * 0.1}>
                  <Link
                    href={`/products/${rp.categorySlug}/${rp.slug}`}
                    className="group block bg-[var(--color-surface-warm)] rounded-[var(--radius-brand-lg)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {rp.badge && (
                        <span className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-[family-name:var(--font-condensed)] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {rp.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-[family-name:var(--font-condensed)] font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-1">
                        {rp.subCategory}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                        {rp.name}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </SubPageLayout>
  );
}
