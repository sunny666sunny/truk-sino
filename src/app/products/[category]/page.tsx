import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { allProducts, productCategories } from "@/lib/pageData";

/* ── Types ── */
type Props = {
  params: Promise<{ category: string }>;
};

/* ── Static Params ── */
export function generateStaticParams() {
  return productCategories.map((cat) => ({ category: cat.slug }));
}

/* ── Dynamic Metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = productCategories.find((c) => c.slug === category);

  if (!cat) {
    return { title: "Category Not Found | TrukSino International" };
  }

  return {
    title: `${cat.name} | TrukSino International — Products`,
    description: cat.description,
  };
}

/* ── Page ── */
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = productCategories.find((c) => c.slug === category);

  if (!cat) notFound();

  const products = allProducts.filter((p) => p.categorySlug === category);

  return (
    <SubPageLayout>
      <PageHero
        title={cat.name}
        subtitle={cat.description}
        image={cat.image}
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: cat.name },
        ]}
      />

      {/* ── Category Tabs ── */}
      <section className="bg-white border-b border-[var(--color-divider)]">
        <div className="container-main">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {productCategories.map((c) => {
              const isActive = c.slug === category;
              return (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className={[
                    "shrink-0 rounded-[var(--radius-brand)] px-5 py-2.5 text-sm font-[family-name:var(--font-condensed)] font-semibold uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-ink-light)] hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-ink)]",
                  ].join(" ")}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--color-ink-light)] text-lg font-[family-name:var(--font-body)]">
                No products in this category yet. Please check back later.
              </p>
              <Link
                href="/products"
                className="inline-block mt-6 text-[var(--color-accent)] font-[family-name:var(--font-condensed)] font-semibold uppercase tracking-wider hover:underline"
              >
                &larr; Back to All Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.08}>
                  <Link
                    href={`/products/${product.categorySlug}/${product.slug}`}
                    className="group block bg-white rounded-[var(--radius-brand-lg)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-[family-name:var(--font-condensed)] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <p className="text-xs font-[family-name:var(--font-condensed)] font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-1">
                        {product.subCategory}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-light)] leading-relaxed line-clamp-2">
                        {product.excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}
