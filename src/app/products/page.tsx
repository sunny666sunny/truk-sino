import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getProductCategories } from "@/lib/cmsData";

export const metadata: Metadata = {
  title: "Products | SINOTRUK International 鈥?Complete Range of Commercial Vehicles",
  description:
    "Explore SINOTRUK's full lineup of commercial vehicles: heavy trucks, light trucks, special vehicles, semi-trailers, and new energy vehicles built for global markets.",
};

export default async function ProductsPage() {
  const productCategories = await getProductCategories();
  return (
    <SubPageLayout>
      <PageHero
        title="Products"
        subtitle="Complete range of commercial vehicles 鈥?from heavy-duty dump trucks and tractor units to light cargo trucks, special vehicles, and zero-emission electric platforms."
        image="/images/hero-banner-1.png"
        breadcrumb={[{ label: "Products" }]}
      />

      {/* 鈹€鈹€ Category Grid 鈹€鈹€ */}
      <section className="bg-[var(--color-surface-warm)] py-20 md:py-28">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.1}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-brand-lg)] cursor-pointer"
                >
                  {/* Background image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay 鈥?default (brand-900 tones) */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(11,30,54,0.92) 0%, rgba(11,30,54,0.45) 50%, rgba(11,30,54,0.15) 100%)",
                    }}
                  />

                  {/* Gradient overlay 鈥?hover (accent tones) */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(232,88,12,0.85) 0%, rgba(11,30,54,0.50) 55%, rgba(11,30,54,0.10) 100%)",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h2 className="font-[family-name:var(--font-display)] text-lg text-white mb-1">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-white/80 leading-relaxed line-clamp-2 mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-condensed)] font-semibold uppercase tracking-wider text-white group-hover:text-white transition-colors">
                      Explore
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
