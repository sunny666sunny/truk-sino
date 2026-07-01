import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { allNews } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "News & Events | SINOTRUK International",
  description:
    "Latest updates from SINOTRUK — product launches, industry events, partnerships, and company milestones.",
};

export default function NewsPage() {
  return (
    <SubPageLayout>
      <PageHero
        title="News & Events"
        subtitle="Latest updates from SINOTRUK — product launches, industry events, partnerships, and company milestones."
        image="/images/hero-banner-1.png"
      />

      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allNews.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.1}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group block h-full rounded-[var(--radius-brand-lg)] bg-white shadow-[var(--shadow-card)] overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="font-[family-name:var(--font-condensed)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-2">
                      {article.date}
                    </p>
                    <h2 className="font-[family-name:var(--font-condensed)] text-lg font-bold text-[var(--color-ink)] mb-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[var(--color-ink-light)] line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-condensed)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                      Read Article
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
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
