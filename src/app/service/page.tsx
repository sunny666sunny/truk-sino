import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Service | TrukSino International",
  description:
    "Comprehensive after-sales support, technical training, service broadcasts, and maintenance manuals to maximize your fleet uptime and total cost of ownership.",
};

const serviceCards = [
  {
    href: "/service/after-sales-service",
    title: "After-Sales Service",
    description:
      "Preventive maintenance programs, technical training, and genuine parts supply through 520+ authorized service stations worldwide.",
    image: "/images/factory-workshop.png",
  },
  {
    href: "/service/service-broadcast",
    title: "Service Broadcast",
    description:
      "Live technical demonstrations and diagnostic walkthroughs delivered to authorized dealer technicians across the globe.",
    image: "/images/hero-banner-2.png",
  },
  {
    href: "/service/maintenance-manual",
    title: "Maintenance Manual",
    description:
      "Comprehensive warranty coverage, operator manuals, and service documentation for every TrukSino vehicle model.",
    image: "/images/product-tractor-truck.png",
  },
] as const;

export default function ServicePage() {
  return (
    <SubPageLayout>
      <PageHero
        title="Service"
        subtitle="Comprehensive after-sales support to keep your fleet running at peak performance — from preventive maintenance to live technical training."
        image="/images/factory-workshop.png"
      />

      <section className="bg-surface py-fluid-2xl">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card, i) => (
              <ScrollReveal key={card.href} delay={i * 0.12}>
                <Link
                  href={card.href}
                  className="group block overflow-hidden rounded-brand-lg bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h2 className="font-display text-2xl text-brand-900">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-light">
                      {card.description}
                    </p>
                    <span className="mt-4 inline-block font-condensed text-sm font-semibold uppercase tracking-wider text-accent transition-colors group-hover:text-accent-hover">
                      Learn More &rarr;
                    </span>
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
