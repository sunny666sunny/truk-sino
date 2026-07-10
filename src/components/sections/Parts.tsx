import { Car, Cog, Settings, Circle, Square, Package, type LucideIcon } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HomeContent } from "@/lib/homeContent";

const iconMap: Record<string, LucideIcon> = { Car, Cog, Settings, Circle, Square, Package };
function toSlug(name: string): string { return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export default function Parts({ content }: { content: HomeContent["parts"] }) {
  return (
    <section id="parts" className="bg-[var(--color-surface-section)] py-fluid-2xl"><div className="container-main">
      <SectionHeader tag={content.tag} title={content.title} subtitle={content.description} center />
      <div className="mt-fluid-lg grid grid-cols-2 gap-fluid-md md:grid-cols-3 xl:grid-cols-6">
        {content.items.map((part, index) => { const Icon = iconMap[part.icon] ?? Package; const slug = toSlug(part.title); return (
          <ScrollReveal key={part.title} delay={index * 0.08}><Link href={`/parts/${slug}`} className="group flex flex-col items-center rounded-[var(--radius-brand)] border border-[var(--color-divider)] bg-[var(--color-surface)] p-8 py-8 text-center transition-all hover:-translate-y-1.5 hover:border-[var(--color-accent)] hover:shadow-card-hover">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-brand)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white"><Icon className="h-7 w-7" /></div>
            <h3 className="font-[family-name:var(--font-condensed)] text-sm font-black uppercase leading-tight text-[var(--color-brand-900)]">{part.title}</h3><p className="mt-2 text-xs font-bold leading-snug text-[var(--color-ink-muted)]">{part.description}</p>
          </Link></ScrollReveal>
        ); })}
      </div>
    </div></section>
  );
}
