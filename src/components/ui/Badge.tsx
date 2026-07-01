"use client";

import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "dark";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  accent: "bg-[var(--color-accent)] text-white",
  dark: "bg-[var(--color-brand-900)] text-white",
};

export default function Badge({
  children,
  variant = "accent",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block",
        "px-3 py-1",
        "rounded",
        "text-xs",
        "font-[family-name:var(--font-condensed)]",
        "uppercase tracking-[0.1em] font-bold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
