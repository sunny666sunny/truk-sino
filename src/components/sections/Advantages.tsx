import Image from "next/image";
import { Cog, Shield, Brain, Thermometer, Leaf, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HomeContent } from "@/lib/homeContent";

const iconMap: Record<string, LucideIcon> = { Cog, Shield, Brain, Thermometer, Leaf, Headset };

export default function Advantages({ content }: { content: HomeContent["why"] }) {
  return (
    <section className="bg-[var(--color-surface-warm)] py-[var(--spacing-fluid-2xl)]">
      <div className="container-main">
        <SectionHeader tag={content.tag} title={content.title} subtitle={content.description} center />
        <div className="mt-[var(--spacing-fluid-xl)] grid grid-cols-1 gap-[var(--spacing-fluid-md)] md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((adv, i) => {
            const Icon = iconMap[adv.icon] ?? Cog;
            return (
              <ScrollReveal key={`${adv.title}-${i}`} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-[var(--radius-brand)] border border-[var(--color-divider)] bg-[var(--color-surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100" />
                  {adv.image ? (
                    <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[var(--radius-brand)]">
                      <Image src={adv.image} alt={adv.imageAlt || adv.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[var(--radius-brand)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                  )}
                  <h3 className="mb-2 font-[family-name:var(--font-condensed)] text-xl font-black text-[var(--color-brand-900)]">{adv.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">{adv.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
