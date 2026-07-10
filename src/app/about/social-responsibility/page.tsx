import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutPages } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "Social Responsibility | About SINOTRUK",
  description:
    "SINOTRUK's commitment to sustainable operations, new energy transition, safety, community investment, and charitable giving.",
};

export default function SocialResponsibilityPage() {
  const { subtitle, pillars } = aboutPages["social-responsibility"];

  return (
    <SubPageLayout>
      <PageHero
        title="Social Responsibility"
        subtitle={subtitle}
        breadcrumb={[
          { label: "About Us", href: "/about" },
          { label: "Social Responsibility" },
        ]}
      />

      <section className="container-main py-16 md:py-24">
        <div className="grid gap-6">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.12}>
              <div className="rounded-[var(--radius-brand-lg)] border-l-4 border-l-[var(--color-accent)] bg-white p-8 shadow-card">
                <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                  {pillar.title}
                </h2>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-light)]">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </SubPageLayout>
  );
}
