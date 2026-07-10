import Image from "next/image";
import { HardHat, Truck, Package, Anchor, Zap, Building } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HomeContent } from "@/lib/homeContent";

const iconMap: Record<string, LucideIcon> = {
  Construction: HardHat,
  Mining: Truck,
  Logistics: Package,
  "Port Operations": Anchor,
  Energy: Zap,
  Municipal: Building,
};

const gradients = [
  "linear-gradient(135deg, #78350f 0%, #b45309 100%)",
  "linear-gradient(135deg, #292524 0%, #57534e 100%)",
  "linear-gradient(135deg, #132d4f 0%, #1a6fa0 100%)",
  "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
  "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
  "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
];

export default function Applications({ content }: { content: HomeContent["industries"] }) {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--spacing-fluid-2xl)]">
      <div className="container-main">
        <SectionHeader tag={content.tag} title={content.title} subtitle={content.description} center />
        <div className="mt-[var(--spacing-fluid-xl)] grid grid-cols-1 gap-[var(--spacing-fluid-md)] md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((app, i) => {
            const Icon = iconMap[app.icon] ?? iconMap[app.title] ?? Truck;
            return (
              <ScrollReveal key={`${app.title}-${i}`} delay={i * 0.1}>
                <div className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[var(--radius-brand)] border border-[var(--color-divider)] shadow-card">
                  {app.image ? (
                    <Image src={app.image} alt={app.imageAlt || app.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.08]" />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-[600ms] group-hover:scale-[1.08]" style={{ background: gradients[i % gradients.length] }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,54,0.9)] via-[rgba(11,30,54,0.2)] to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(232,88,12,0.9)] via-[rgba(232,88,12,0.3)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl uppercase leading-none">
                      <Icon className="h-6 w-6 flex-shrink-0" strokeWidth={1.8} />
                      {app.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold opacity-82">{app.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
