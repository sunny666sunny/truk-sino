"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { useScrollHeader } from "@/hooks";
import { navLinks } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface NavChild {
  label: string;
  href: string;
}

interface MegaColumn {
  title: string;
  links: NavChild[];
}

interface NavLinkItem {
  label: string;
  href: string;
  children?: NavChild[];
  mega?: boolean;
  megaColumns?: MegaColumn[];
}

interface HeaderProps {
  onMenuToggle?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Header({ onMenuToggle }: HeaderProps) {
  const scrolled = useScrollHeader(50);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const links = navLinks as NavLinkItem[];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/[0.97] h-[70px] shadow-[0_2px_20px_rgba(11,30,54,0.08)]"
          : "bg-transparent backdrop-blur-sm h-[80px]",
      ].join(" ")}
    >
      <div className="container-main flex items-center justify-between h-full">
        {/* ── Logo ── */}
        <a href="/#home" className="flex items-center shrink-0">
          <Image
            src="/images/logo-sinotruk.png"
            alt="SINOTRUK"
            width={scrolled ? 120 : 140}
            height={scrolled ? 48 : 56}
            className="object-contain"
            preload
          />
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden xl:flex items-center gap-0.5" role="navigation">
          {links.map((link) => {
            const hasDropdown = !!(link.children || link.mega);
            const isOpen = activeDropdown === link.label;

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger */}
                <a
                  href={link.href}
                  className={[
                    "flex items-center gap-1 px-3.5 py-2 rounded-[var(--radius-brand)]",
                    "font-[family-name:var(--font-condensed)] font-semibold text-sm uppercase tracking-wider",
                    "transition-colors duration-200",
                    scrolled
                      ? "text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                      : "text-white/85 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                  aria-haspopup={hasDropdown || undefined}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                >
                  {link.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </a>

                {/* ── Simple dropdown ── */}
                {link.children && !link.mega && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1.5 min-w-[210px] bg-white rounded-[var(--radius-brand-lg)] shadow-[var(--shadow-card-hover)] border-t-[3px] border-[var(--color-accent)] p-3 z-50"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-[0.8125rem] text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] rounded-[var(--radius-brand)] transition-colors duration-150"
                          >
                            {child.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* ── Mega menu ── */}
                {link.mega && link.megaColumns && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 min-w-[600px] bg-white rounded-[var(--radius-brand-lg)] shadow-[var(--shadow-card-hover)] border-t-[3px] border-[var(--color-accent)] p-6 z-50"
                      >
                        <div className="grid grid-cols-3 gap-8">
                          {link.megaColumns.map((col) => (
                            <div key={col.title}>
                              <h4 className="font-[family-name:var(--font-condensed)] font-bold text-xs uppercase tracking-wider text-[var(--color-accent)] mb-3 pb-2 border-b border-[var(--color-divider)]">
                                {col.title}
                              </h4>
                              <ul className="space-y-0.5">
                                {col.links.map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      className="block px-2 py-1.5 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] rounded-[var(--radius-brand)] transition-colors duration-150"
                                    >
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Mobile menu toggle ── */}
        <button
          onClick={onMenuToggle}
          className={[
            "xl:hidden p-2 rounded-[var(--radius-brand)] transition-colors duration-200",
            scrolled
              ? "text-[var(--color-ink)] hover:bg-gray-100"
              : "text-white hover:bg-white/10",
          ].join(" ")}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
