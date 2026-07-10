import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HomeContent } from "@/lib/homeContent";

const fallbackServiceContent: HomeContent["service"] = {
  tag: "After-Sales Support",
  title: "Service That Keeps You Moving",
  description: "From preventive maintenance to emergency repairs, our global service network ensures your fleet stays on the road.",
  items: [
    { slug: "after-sales-service", icon: "Wrench", title: "After-Sales Service", description: "Scheduled maintenance programs, preventive inspections, and emergency roadside assistance through authorized service stations worldwide.", image: "/images/factory-workshop.png" },
    { slug: "service-broadcast", icon: "Radio", title: "Service Broadcast", description: "Technical repair demonstrations and diagnostic walkthroughs for dealer technicians and fleet maintenance teams.", image: "/images/hero-banner-2.png" },
    { slug: "maintenance-manual", icon: "BookOpen", title: "Maintenance Manual", description: "Operator manuals, service intervals, torque specifications, troubleshooting guides, and genuine parts catalogs.", image: "/images/product-tractor-truck.png" },
  ],
};

export default function ServiceSection({ content = fallbackServiceContent }: { content?: HomeContent["service"] }) {
  return (
    <section id="service" className="bg-surface py-fluid-2xl">
      <div className="container-main">
        <SectionHeader tag={content.tag} title={content.title} subtitle={content.description} center />

        <div className="mt-fluid-lg grid gap-fluid-md lg:grid-cols-3">
          {content.items.map((card, index) => (
            <ScrollReveal key={`${card.slug}-${card.title}`} delay={index * 0.12}>
              <Link href={`/service/${card.slug}`} className="group block overflow-hidden rounded-brand-lg bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={card.image || "/images/factory-workshop.png"}
                    alt={card.imageAlt || card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-lg text-brand-900">{card.title}</h3>
                  <p className="mb-4 mt-2.5 text-sm leading-relaxed text-ink-light">{card.description}</p>
                  <span className="font-condensed text-sm font-semibold uppercase tracking-wider text-accent">Learn More &rarr;</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}