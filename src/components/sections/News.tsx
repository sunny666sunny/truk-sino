import Image from "next/image";
import Link from "next/link";
import { news } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function News() {
  return (
    <section
      id="news"
      className="bg-surface py-fluid-2xl"
    >
      <div className="container-main">
        <SectionHeader
          tag="News & Events"
          title="Latest from TrukSino"
          subtitle="Stay up to date with product launches, dealer events, and industry insights from our global network."
          center
        />

        <div className="mt-fluid-lg grid gap-fluid-md md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <ScrollReveal key={article.id}>
              <Link
                href={`/news/${article.slug}`}
                className="group block h-full overflow-hidden rounded-brand-lg bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-placeholder">
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
                  <time className="font-condensed text-xs font-semibold uppercase tracking-wider text-accent">
                    {article.date}
                  </time>

                  <h3 className="mt-2 font-condensed text-lg font-bold leading-snug text-brand-900 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 mb-4 line-clamp-2 text-sm text-ink-light">
                    {article.excerpt}
                  </p>

                  <span className="font-condensed text-sm font-semibold uppercase tracking-wider text-accent">
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
