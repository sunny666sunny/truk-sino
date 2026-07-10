import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getHomeContent } from "@/lib/homeContent";

export const metadata: Metadata = {
  title: "About Us | SINOTRUK International",
  description:
    "Three decades of engineering excellence in commercial vehicle manufacturing. Discover SINOTRUK's heritage, facilities, and commitment to social responsibility.",
};

const cardLinks = [
  { slug: "/about/who-we-are", label: "Learn More" },
  { slug: "/about/our-facilities", label: "Learn More" },
  { slug: "/about/social-responsibility", label: "Learn More" },
];

export default async function AboutPage() {
  const content = await getHomeContent();
  const cards = content.why.items.slice(0, 3);

  return (
    <SubPageLayout>
      <PageHero title="About Us" subtitle={content.why.description} image={cards[0]?.image || "/images/factory-workshop.png"} />

      <section className="container-main py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.15}>
              <a href={cardLinks[i]?.slug || "/about/who-we-are"} className="group block overflow-hidden rounded-[var(--radius-brand-lg)] bg-white shadow-card transition-shadow hover:shadow-card-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={section.image || "/images/factory-workshop.png"} alt={section.imageAlt || section.title} className="aspect-[16/9] w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-condensed)] text-xl font-bold text-[var(--color-ink)]">{section.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-light)]">{section.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-hover)]">{cardLinks[i]?.label || "Learn More"} &rarr;</span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface-section)]">
        <div className="container-main py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {content.stats.items.slice(0, 4).map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-accent)] md:text-4xl">{stat.value}{stat.suffix}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink-light)]">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}