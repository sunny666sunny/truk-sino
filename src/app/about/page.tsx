import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutPages } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "About Us | SINOTRUK International",
  description:
    "Three decades of engineering excellence in commercial vehicle manufacturing. Discover SINOTRUK's heritage, facilities, and commitment to social responsibility.",
};

const stats = [
  { value: "1993", label: "Founded" },
  { value: "8,200+", label: "Engineers" },
  { value: "1,600+", label: "Patents" },
  { value: "90+", label: "Countries" },
];

const cardLinks = [
  { slug: "/about/who-we-are", label: "Learn More" },
  { slug: "/about/our-facilities", label: "Learn More" },
  { slug: "/about/social-responsibility", label: "Learn More" },
];

export default function AboutPage() {
  const { sections } = aboutPages["who-we-are"];

  return (
    <SubPageLayout>
      <PageHero
        title="About Us"
        subtitle="Three decades of engineering excellence in commercial vehicle manufacturing."
        image="/images/factory-workshop.png"
      />

      {/* ── Card Grid ── */}
      <section className="container-main py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <ScrollReveal key={section.heading} delay={i * 0.15}>
              <a
                href={cardLinks[i].slug}
                className="group block overflow-hidden rounded-[var(--radius-brand-lg)] bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image}
                  alt={section.heading}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-condensed)] text-xl font-bold text-[var(--color-ink)]">
                    {section.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-light)]">
                    {section.text}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-hover)]">
                    {cardLinks[i].label} &rarr;
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Quick Stats Strip ── */}
      <section className="bg-[var(--color-surface-section)]">
        <div className="container-main py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-accent)] md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-ink-light)]">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
