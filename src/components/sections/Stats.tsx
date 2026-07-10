"use client";

import { Globe, Truck, Handshake, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCountUp, useIntersection } from "@/hooks";
import type { HomeContent } from "@/lib/homeContent";

const iconMap: Record<string, LucideIcon> = { Globe, Truck, Handshake, Wrench };
const crossHatchBg = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23ffffff' stroke-opacity='0.03' stroke-width='1' fill='none'/%3E%3C/svg%3E")`;

function StatCard({ value, suffix, label, icon, isVisible }: { value: number; suffix: string; label: string; icon: string; isVisible: boolean }) {
  const count = useCountUp(value, 2000, isVisible);
  const Icon = iconMap[icon] ?? Globe;
  return (
    <div className="group flex flex-col items-center rounded-[var(--radius-brand)] border border-white/[0.10] bg-white/[0.06] p-[var(--spacing-fluid-lg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white"><Icon className="h-6 w-6" strokeWidth={1.8} /></div>
      <span className="font-[family-name:var(--font-display)] text-[length:var(--text-fluid-2xl)] leading-[0.9] text-white">{count.toLocaleString()}{suffix}</span>
      <span className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-white/60 font-[family-name:var(--font-condensed)]">{label}</span>
    </div>
  );
}

export default function Stats({ content }: { content: HomeContent["stats"] }) {
  const { ref, isVisible } = useIntersection({ threshold: 0.2 });
  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-brand-900)] py-[var(--spacing-fluid-2xl)]" style={{ backgroundImage: crossHatchBg }}>
      <div className="container-main"><div className="grid grid-cols-1 gap-[var(--spacing-fluid-md)] md:grid-cols-2 lg:grid-cols-4">
        {content.items.map((stat, index) => <StatCard key={`${stat.icon}-${stat.label}-${index}`} value={stat.value} suffix={stat.suffix} label={stat.label} icon={stat.icon} isVisible={isVisible} />)}
      </div></div>
    </section>
  );
}
