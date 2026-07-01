import type { Metadata } from "next";
import Link from "next/link";
import { Car, Cog, Settings, Circle, Square, Package } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { partCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Genuine Parts | SINOTRUK International",
  description:
    "Your source for OEM truck parts — cabin and body, engine, gearbox, axle, chassis, and more. Genuine components backed by SINOTRUK warranty.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  Cog,
  Settings,
  Circle,
  Square,
  Package,
};

/** Convert "Cabin & Body" → "cabin-body", "Other Parts" → "other", etc. */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PartsPage() {
  return (
    <SubPageLayout>
      <PageHero
        title="Genuine Parts"
        subtitle="Your source for OEM truck parts — every component manufactured to SINOTRUK specifications and backed by our quality warranty."
        image="/images/product-dump-truck.png"
      />

      <section className="bg-surface py-fluid-2xl">
        <div className="container-main">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              const slug = toSlug(cat.name);

              return (
                <ScrollReveal key={cat.name} delay={i * 0.08}>
                  <Link
                    href={`/parts/${slug}`}
                    className="group flex flex-col items-center rounded-brand-lg border border-divider bg-surface p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-card-hover"
                  >
                    {/* Icon circle */}
                    {Icon && (
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Icon className="h-7 w-7" />
                      </div>
                    )}

                    <h2 className="font-display text-xl text-brand-900">
                      {cat.name}
                    </h2>
                    <p className="mt-2 text-sm text-ink-light">
                      {cat.description}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
