import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutPages } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "Our Journey | About SINOTRUK",
  description:
    "Key milestones that shaped SINOTRUK into a global commercial vehicle leader — from 1993 founding to 2 million cumulative exports.",
};

export default function OurJourneyPage() {
  const { subtitle, milestones } = aboutPages["our-journey"];

  return (
    <SubPageLayout>
      <PageHero
        title="Our Journey"
        subtitle={subtitle}
        breadcrumb={[
          { label: "About Us", href: "/about" },
          { label: "Our Journey" },
        ]}
      />

      <section className="container-main py-16 md:py-24">
        {/* Timeline container */}
        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-[var(--color-accent)] lg:block" />

          {/* Left-edge vertical line (mobile) */}
          <div className="absolute left-4 top-0 block h-full w-[2px] bg-[var(--color-accent)] lg:hidden" />

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0; // even → left side
              return (
                <ScrollReveal key={milestone.year} delay={i * 0.08}>
                  {/* Desktop: two-column grid */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12">
                    {/* Left column */}
                    <div
                      className={`flex ${
                        isLeft ? "justify-end" : "justify-end"
                      }`}
                    >
                      {isLeft ? (
                        <MilestoneCard milestone={milestone} />
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Right column */}
                    <div
                      className={`flex ${
                        !isLeft ? "justify-start" : "justify-start"
                      }`}
                    >
                      {!isLeft ? (
                        <MilestoneCard milestone={milestone} />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  {/* Mobile: single column with left padding */}
                  <div className="pl-12 lg:hidden">
                    <MilestoneCard milestone={milestone} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}

function MilestoneCard({
  milestone,
}: {
  milestone: { year: string; title: string; description: string };
}) {
  return (
    <div className="max-w-md rounded-[var(--radius-brand-lg)] bg-white p-6 shadow-card">
      <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-accent)]">
        {milestone.year}
      </p>
      <h3 className="mt-2 font-[family-name:var(--font-condensed)] text-xl font-bold text-[var(--color-ink)]">
        {milestone.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-light)]">
        {milestone.description}
      </p>
    </div>
  );
}
