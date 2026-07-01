import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const serviceCards = [
  {
    slug: "after-sales-service",
    title: "After-Sales Service",
    description:
      "Scheduled maintenance programs, preventive inspections, and emergency roadside assistance through 520+ authorized service stations worldwide. All backed by our 12-month / 100,000 km warranty.",
    image: "/images/factory-workshop.png",
  },
  {
    slug: "service-broadcast",
    title: "Service Broadcast",
    description:
      "Live technical repair demonstrations and diagnostic walkthroughs for dealer technicians. Regional training centers cover engine overhaul, gearbox servicing, and ADAS calibration.",
    image: "/images/hero-banner-2.png",
  },
  {
    slug: "maintenance-manual",
    title: "Maintenance Manual",
    description:
      "Comprehensive operator and maintenance manuals for every model. Service intervals, torque specifications, troubleshooting guides, and genuine parts catalogs with OEM reference numbers.",
    image: "/images/product-tractor-truck.png",
  },
];

export default function ServiceSection() {
  return (
    <section
      id="service"
      className="bg-surface py-fluid-2xl"
    >
      <div className="container-main">
        <SectionHeader
          tag="After-Sales Support"
          title="Service That Keeps You Moving"
          subtitle="From preventive maintenance to emergency repairs, our global service network ensures your fleet stays on the road — not in the workshop."
          center
        />

        <div className="mt-fluid-lg grid gap-fluid-md lg:grid-cols-3">
          {serviceCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.12}>
              <Link href={`/service/${card.slug}`} className="group block overflow-hidden rounded-brand-lg bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                {/* Image container with accent bar */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Accent bar at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
                </div>

                {/* Body */}
                <div className="p-7">
                  <h3 className="font-display text-2xl text-brand-900">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 mb-4 text-sm leading-relaxed text-ink-light">
                    {card.description}
                  </p>

                  <span className="font-condensed text-sm font-semibold uppercase tracking-wider text-accent">
                    Learn More &rarr;
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
