import {
  HardHat,
  Truck,
  Package,
  Anchor,
  Zap,
  Building,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { applications } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Construction: HardHat,
  Mining: Truck,
  Logistics: Package,
  "Port Operations": Anchor,
  Energy: Zap,
  Municipal: Building,
};

/**
 * Map Tailwind gradient class strings from data to inline gradient CSS.
 * This avoids purging issues and keeps things runtime-safe.
 */
const gradientMap: Record<string, string> = {
  "from-amber-900 to-amber-700":
    "linear-gradient(135deg, #78350f 0%, #b45309 100%)",
  "from-stone-800 to-stone-600":
    "linear-gradient(135deg, #292524 0%, #57534e 100%)",
  "from-brand-800 to-brand-600":
    "linear-gradient(135deg, #132d4f 0%, #1a6fa0 100%)",
  "from-blue-900 to-blue-700":
    "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
  "from-red-900 to-red-700":
    "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
  "from-emerald-900 to-emerald-700":
    "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
};

export default function Applications() {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--spacing-fluid-2xl)]">
      <div className="container-main">
        <SectionHeader
          tag="Industry Solutions"
          title="Purpose-Built for Your Industry"
          subtitle="Whatever your sector demands, TrukSino engineers vehicles to match — from construction sites to clean-city logistics."
          center
        />

        <div className="mt-[var(--spacing-fluid-xl)] grid grid-cols-1 gap-[var(--spacing-fluid-md)] md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, i) => {
            const Icon = iconMap[app.title] ?? Truck;
            const gradientBg =
              gradientMap[app.gradient] ??
              "linear-gradient(135deg, #132d4f 0%, #1a6fa0 100%)";

            return (
              <ScrollReveal key={app.title} delay={i * 0.1}>
                <div className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[var(--radius-brand-lg)]">
                  {/* Coloured background */}
                  <div
                    className="absolute inset-0 transition-transform duration-[600ms] group-hover:scale-[1.08]"
                    style={{ background: gradientBg }}
                  />

                  {/* Dark overlay — default state */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,54,0.9)] via-[rgba(11,30,54,0.2)] to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                  {/* Accent overlay — hover state */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(232,88,12,0.9)] via-[rgba(232,88,12,0.3)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-2xl">
                      <Icon className="h-6 w-6 flex-shrink-0" strokeWidth={1.8} />
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm opacity-80">
                      {app.description}
                    </p>
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
