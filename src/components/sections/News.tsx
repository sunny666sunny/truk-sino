import Image from "next/image";
import Link from "next/link";
import { news } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HomeContent } from "@/lib/homeContent";

export default function News({ content }: { content: HomeContent["news"] }) {
  return (
    <section
      id="news"
      className="bg-[var(--color-surface)] py-fluid-2xl"
    >
      <div className="container-main">
        <SectionHeader
          tag={content.tag}
          title={content.title}
          subtitle={content.description}
          center
        />

        <div className="mt-fluid-lg grid gap-fluid-md md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <ScrollReveal key={article.id}>
              <Link
                href={`/news/${article.slug}`}
                className="group block h-full overflow-hidden rounded-[var(--radius-brand)] border border-[var(--color-divider)] bg-[var(--color-surface)] shadow-card transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-card-hover"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-placeholder)]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Body */}
                <div className="p-6">
                  <time className="font-[family-name:var(--font-condensed)] text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    {article.date}
                  </time>

                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg uppercase leading-[1] text-[var(--color-brand-900)] transition-colors group-hover:text-[var(--color-accent)]">
                    {article.title}
                  </h3>

                  <p className="mb-5 mt-3 line-clamp-2 text-sm font-semibold text-[var(--color-ink-light)]">
                    {article.excerpt}
                  </p>

                  <span className="font-[family-name:var(--font-condensed)] text-sm font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    Read Article &rarr;
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
