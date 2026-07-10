import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutPages } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "Who We Are | About SINOTRUK",
  description:
    "Discover SINOTRUK's heritage, global reach, and commitment to innovation in commercial vehicle manufacturing.",
};

export default function WhoWeArePage() {
  const { subtitle, sections } = aboutPages["who-we-are"];

  return (
    <SubPageLayout>
      <PageHero
        title="Who We Are"
        subtitle={subtitle}
        image="/images/factory-workshop.png"
        breadcrumb={[
          { label: "About Us", href: "/about" },
          { label: "Who We Are" },
        ]}
      />

      <section className="container-main py-16 md:py-24">
        <div className="space-y-20 md:space-y-28">
          {sections.map((section, i) => {
            const isOdd = i % 2 === 0; // 0-indexed: even indices → image left
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
    </SubPageLayout>
  );
}
