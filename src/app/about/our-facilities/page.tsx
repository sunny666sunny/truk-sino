import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutPages } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "Our Facilities | About SINOTRUK",
  description:
    "World-class manufacturing infrastructure across eight production bases in China, with advanced workshop lines and precision equipment.",
};

export default function OurFacilitiesPage() {
  const { subtitle, sections, workshops, equipment } =
    aboutPages["our-facilities"];

  return (
    <SubPageLayout>
      <PageHero
        title="Our Facilities"
        subtitle={subtitle}
        breadcrumb={[
          { label: "About Us", href: "/about" },
          { label: "Our Facilities" },
        ]}
      />

      {/* ── Content Sections (alternating layout) ── */}
      <section className="container-main py-16 md:py-24">
        <div className="space-y-20 md:space-y-28">
          {sections.map((section, i) => {
            const isOdd = i % 2 === 0;
            return (
              <ScrollReveal key={section.heading}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    !isOdd ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-[var(--radius-brand-lg)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)] md:text-xl">
                      {section.heading}
                    </h2>
                    <p className="mt-4 leading-relaxed text-[var(--color-ink-light)]">
                      {section.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── Workshop Lines ── */}
      <section className="bg-[var(--color-surface-section)]">
        <div className="container-main py-16 md:py-24">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)] md:text-xl">
              Workshop Lines
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((name, i) => (
              <ScrollReveal key={name} delay={i * 0.1}>
                <div className="rounded-[var(--radius-brand-lg)] bg-[var(--color-surface-warm)] p-6 text-center">
                  {/* Icon placeholder */}
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]">
                    <span className="font-[family-name:var(--font-display)] text-lg text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-condensed)] text-lg font-bold text-[var(--color-ink)]">
                    {name}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Machinery & Equipment ── */}
      <section>
        <div className="container-main py-16 md:py-24">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)] md:text-xl">
              Machinery &amp; Equipment
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((name, i) => (
              <ScrollReveal key={name} delay={i * 0.1}>
                <div className="rounded-[var(--radius-brand-lg)] bg-[var(--color-surface-warm)] p-6 text-center">
                  {/* Icon placeholder */}
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-900)]">
                    <span className="font-[family-name:var(--font-display)] text-lg text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-condensed)] text-lg font-bold text-[var(--color-ink)]">
                    {name}
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
