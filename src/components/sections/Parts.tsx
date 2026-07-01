import { Car, Cog, Settings, Circle, Square, Package, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { partCategories } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Car,
  Cog,
  Settings,
  Circle,
  Square,
  Package,
};

/** Convert "Cabin & Body" → "cabin-body" */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Parts() {
  return (
    <section
      id="parts"
      className="bg-surface-section py-fluid-2xl"
    >
      <div className="container-main">
        <SectionHeader
          tag="Genuine Parts"
          title="Your Source for OEM Truck Parts"
          subtitle="Direct from the manufacturer — genuine TrukSino parts shipped worldwide with full traceability, OEM warranty, and dealer pricing for fleets of any size."
          center
        />

        <div className="mt-fluid-lg grid grid-cols-2 gap-fluid-md md:grid-cols-3 xl:grid-cols-6">
          {partCategories.map((part, index) => {
            const Icon = iconMap[part.icon] ?? Package;
            const slug = toSlug(part.name);
            return (
              <ScrollReveal key={part.name} delay={index * 0.08}>
                <Link href={`/parts/${slug}`} className="group flex flex-col items-center rounded-brand-lg border border-divider bg-surface p-8 py-8 text-center transition-all hover:-translate-y-1.5 hover:border-accent hover:shadow-card-hover">
                  {/* Icon container */}
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-condensed text-base font-bold text-brand-900">
                    {part.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-xs text-ink-muted">{part.description}</p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
