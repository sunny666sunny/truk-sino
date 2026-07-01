"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ── Variant styles ── */
const variants = {
  primary: [
    "bg-[var(--color-accent)]",
    "text-white",
    "hover:-translate-y-0.5",
    "hover:shadow-[0_8px_24px_rgba(232,88,12,0.45)]",
  ].join(" "),

  outline: [
    "bg-transparent",
    "border-2 border-[var(--color-brand-900)]",
    "text-[var(--color-brand-900)]",
    "hover:bg-[var(--color-brand-900)] hover:text-white",
  ].join(" "),

  outlineLight: [
    "bg-transparent",
    "border-2 border-white/60",
    "text-white",
    "hover:bg-white hover:text-[var(--color-brand-900)]",
  ].join(" "),

  ghost: [
    "bg-transparent",
    "text-[var(--color-ink-light)]",
    "hover:text-[var(--color-accent)]",
  ].join(" "),
} as const;

/* ── Size styles ── */
const sizes = {
  sm: "py-2.5 px-6 text-sm",
  md: "py-3.5 px-8 text-base",
  lg: "py-4 px-10 text-lg",
} as const;

/* ── Props ── */
type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

type ButtonProps = ButtonBaseProps &
  (
    | { href: string; target?: string; rel?: string }
    | { href?: never; target?: never; rel?: never; type?: "button" | "submit" | "reset"; onClick?: React.MouseEventHandler<HTMLButtonElement> }
  );

/* ── Shared classes ── */
const baseClasses = [
  "inline-flex items-center justify-center",
  "font-[family-name:var(--font-condensed)]",
  "font-semibold",
  "uppercase tracking-[0.1em]",
  "transition-all duration-300 ease-in-out",
  "cursor-pointer",
  "disabled:opacity-50 disabled:pointer-events-none",
  "rounded-[var(--radius-brand)]",
].join(" ");

/* ── Component ── */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    className,
    disabled,
    ...rest
  } = props;

  const combined = cn(baseClasses, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, target, rel, ...anchorRest } = rest;
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={combined}
        aria-disabled={disabled || undefined}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  const { type = "button", onClick, ...buttonRest } = rest as {
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combined}
      {...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
