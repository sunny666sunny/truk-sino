import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getHomeContent } from "@/lib/homeContent";

export const metadata: Metadata = {
  title: "Service | SINOTRUK International",
  description:
    "Comprehensive after-sales support, technical training, service broadcasts, and maintenance manuals to maximize your fleet uptime and total cost of ownership.",
};

export default async function ServicePage() {
  const { service } = await getHomeContent();

  return (
    <SubPageLayout>
      <PageHero title="Service" subtitle={service.description} image={service.items[0]?.image || "/images/factory-workshop.png"} />

      <section className="bg-surface py-fluid-2xl">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.items.map((card, i) => (
              <ScrollReveal key={`${card.slug}-${card.title}`} delay={i * 0.12}>
                <Link href={`/service/${card.slug}`} className="group block overflow-hidden rounded-brand-lg bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.image || "/images/factory-workshop.png"} alt={card.imageAlt || card.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg text-brand-900">{card.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-light">{card.description}</p>
                    <span className="mt-4 inline-block font-condensed text-sm font-semibold uppercase tracking-wider text-accent transition-colors group-hover:text-accent-hover">Learn More &rarr;</span>
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