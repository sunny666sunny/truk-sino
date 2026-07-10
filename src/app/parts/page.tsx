import type { Metadata } from "next";
import Link from "next/link";
import { Car, Cog, Settings, Circle, Square, Package, type LucideIcon } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getHomeContent } from "@/lib/homeContent";

export const metadata: Metadata = {
  title: "Genuine Parts | SINOTRUK International",
  description:
    "Your source for OEM truck parts, genuine components backed by SINOTRUK warranty.",
};

const iconMap: Record<string, LucideIcon> = { Car, Cog, Settings, Circle, Square, Package };

function toSlug(name: string): string {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function PartsPage() {
  const { parts } = await getHomeContent();

  return (
    <SubPageLayout>
      <PageHero title="Genuine Parts" subtitle={parts.description} image="/images/product-dump-truck.png" />

      <section className="bg-surface py-fluid-2xl">
        <div className="container-main">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parts.items.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? Package;
              const slug = toSlug(cat.title);

              return (
                <ScrollReveal key={cat.title} delay={i * 0.08}>
                  <Link href={`/parts/${slug}`} className="group flex flex-col items-center rounded-brand-lg border border-divider bg-surface p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-card-hover">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h2 className="font-display text-xl text-brand-900">{cat.title}</h2>
                    <p className="mt-2 text-sm text-ink-light">{cat.description}</p>
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