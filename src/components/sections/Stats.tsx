"use client";

import { Globe, Truck, Handshake, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { stats } from "@/lib/data";
import { useCountUp, useIntersection } from "@/hooks";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Truck,
  Handshake,
  Wrench,
};

/* Cross-hatch SVG pattern at 3 % white opacity */
const crossHatchBg = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23ffffff' stroke-opacity='0.03' stroke-width='1' fill='none'/%3E%3C/svg%3E")`;

function StatCard({
  value,
  suffix,
  label,
  icon,
  isVisible,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, 2000, isVisible);
  const Icon = iconMap[icon] ?? Globe;

  return (
    <div className="group flex flex-col items-center rounded-[var(--radius-brand-lg)] border border-white/[0.08] bg-white/[0.05] p-[var(--spacing-fluid-lg)] text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>

      {/* Number */}
      <span className="font-[family-name:var(--font-display)] text-[var(--text-fluid-4xl)] leading-none text-white">
        {count.toLocaleString()}
        {suffix}
      </span>

      {/* Label */}
      <span className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/60 font-[family-name:var(--font-condensed)]">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useIntersection({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-brand-900)] py-[var(--spacing-fluid-2xl)]"
      style={{ backgroundImage: crossHatchBg }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 gap-[var(--spacing-fluid-md)] md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
