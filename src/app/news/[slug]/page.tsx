import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { allNews } from "@/lib/pageData";
import JsonLd from "@/components/shared/JsonLd";
import { articleSchema } from "@/lib/structuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allNews.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = allNews.find((n) => n.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | SINOTRUK News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = allNews.find((n) => n.slug === slug);

  if (!article) notFound();

  const relatedArticles = allNews
    .filter((n) => n.slug !== slug)
    .slice(0, 3);

  return (
    <SubPageLayout>
      {/* ── Article Structured Data ── */}
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.excerpt,
          image: article.image,
          datePublished: article.date,
        })}
      />

      <PageHero
        title={article.title}
        subtitle={article.date}
        image={article.image}
        breadcrumb={[
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />

      {/* Article Body */}
      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-[800px]">
              {/* Article content */}
              <article
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-[var(--radius-brand)] bg-[var(--color-accent-soft)] px-3 py-1 font-[family-name:var(--font-condensed)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div className="mx-auto max-w-[800px] my-16 border-t border-[var(--color-divider)]" />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <ScrollReveal>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-ink)] mb-8 text-center">
                  More News
                </h2>
              </ScrollReveal>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related, index) => (
                  <ScrollReveal key={related.id} delay={index * 0.1}>
                    <Link
                      href={`/news/${related.slug}`}
                      className="group block h-full rounded-[var(--radius-brand-lg)] bg-white shadow-[var(--shadow-card)] overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <p className="font-[family-name:var(--font-condensed)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-2">
                          {related.date}
                        </p>
                        <h3 className="font-[family-name:var(--font-condensed)] text-lg font-bold text-[var(--color-ink)] mb-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-[var(--color-ink-light)] line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </SubPageLayout>
  );
}
