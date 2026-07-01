"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  center = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "reveal mb-10",
        center ? "text-center" : "text-left"
      )}
    >
      {/* Tag */}
      <span
        className={cn(
          "inline-flex items-center gap-3 mb-4",
          "font-[family-name:var(--font-condensed)]",
          "text-sm uppercase tracking-[0.15em] font-semibold",
          "text-[var(--color-accent)]"
        )}
      >
        {/* Decorative line — omitted when centered */}
        {!center && (
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 2,
              backgroundColor: "var(--color-accent)",
              flexShrink: 0,
            }}
          />
        )}
        {tag}
      </span>

      {/* Title */}
      <h2
        className={cn(
          "font-[family-name:var(--font-display)]",
          "text-[length:var(--text-fluid-3xl)]",
          "text-[var(--color-brand-900)]",
          "leading-[1.1] tracking-wide"
        )}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "mt-3",
            "font-[family-name:var(--font-body)]",
            "text-[length:var(--text-fluid-base)]",
            "text-[var(--color-ink-light)]",
            "leading-relaxed",
            "max-w-[640px]",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
