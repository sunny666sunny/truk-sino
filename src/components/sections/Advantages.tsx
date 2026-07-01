import {
  Cog,
  Shield,
  Brain,
  Thermometer,
  Leaf,
  Headset,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { advantages } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Cog,
  Shield,
  Brain,
  Thermometer,
  Leaf,
  Headset,
};

export default function Advantages() {
  return (
    <section className="bg-[var(--color-surface-warm)] py-[var(--spacing-fluid-2xl)]">
      <div className="container-main">
        <SectionHeader
          tag="Why SINOTRUK"
          title="Engineering Advantages That Deliver Results"
          subtitle="Six core pillars that set SINOTRUK vehicles apart — from proprietary powertrains to a worldwide support network that keeps your fleet moving."
          center
        />

        <div className="mt-[var(--spacing-fluid-xl)] grid grid-cols-1 gap-[var(--spacing-fluid-md)] md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv, i) => {
            const Icon = iconMap[adv.icon] ?? Cog;

            return (
              <ScrollReveal key={adv.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-[var(--radius-brand-lg)] border border-[var(--color-divider)] bg-[var(--color-surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                  {/* Top accent line */}
                  <div className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100" />

                  {/* Icon */}
                  <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[var(--radius-brand)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-[family-name:var(--font-condensed)] text-xl font-bold text-[var(--color-brand-900)]">
                    {adv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                    {adv.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
