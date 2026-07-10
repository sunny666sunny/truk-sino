"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ tag, title, subtitle, center = false }: SectionHeaderProps) {
  return (
    <div className={cn("reveal mb-10 sm:mb-12", center ? "text-center" : "text-left")}>
      <span className={cn("inline-flex items-center gap-3 mb-4", "font-[family-name:var(--font-condensed)]", "text-xs sm:text-sm uppercase tracking-[0.18em] font-black", "text-[var(--color-accent)]")}>
        {!center && <span style={{ display: "inline-block", width: 46, height: 4, backgroundColor: "var(--color-accent)", flexShrink: 0 }} />}
        {tag}
      </span>
      <h2 className={cn("font-[family-name:var(--font-display)]", "text-[length:var(--text-fluid-xl)]", "text-[var(--color-brand-900)]", "leading-[1.05] tracking-normal uppercase")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4", "font-[family-name:var(--font-body)]", "text-[length:var(--text-fluid-lg)]", "text-[var(--color-ink-light)]", "leading-relaxed font-semibold", "max-w-[760px]", center && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}