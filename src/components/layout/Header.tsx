"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { getMergedNavLinks, type EditableNavLink, type NavLinkItem } from "@/lib/navigation";

interface HeaderProps {
  onMenuToggle?: () => void;
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  editableLinks?: EditableNavLink[];
}

export default function Header({ onMenuToggle, logo, editableLinks }: HeaderProps) {
  const brandLogo = logo ?? { src: "/images/logo-sinotruk.png", alt: "SINOTRUK", width: 140, height: 56 };
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const links: NavLinkItem[] = getMergedNavLinks(editableLinks);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[72px] border-b-[4px] border-[var(--color-accent)] bg-[var(--color-brand-900)]/95 shadow-[0_8px_28px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 sm:h-[84px]">
      <div className="container-main flex h-full items-center justify-between">
        <Link href="/" className="flex h-full w-[124px] shrink-0 items-center justify-center overflow-hidden sm:w-[136px]">
          <Image
            src={brandLogo.src}
            alt={brandLogo.alt}
            width={brandLogo.width}
            height={brandLogo.height}
            className="h-[64px] w-full object-contain object-center transition-all duration-300 sm:h-[76px]"
            preload
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" role="navigation">
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
                <Link
                  href={link.href}
                  className={[
                    "flex items-center gap-1 px-3.5 py-3 rounded-[var(--radius-brand)]",
                    "font-[family-name:var(--font-condensed)] font-black text-[0.8125rem] uppercase tracking-[0.12em]",
                    "transition-colors duration-200",
                    "text-white/88 hover:bg-white/10 hover:text-[var(--color-accent-hover)]",
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
                </Link>

                {link.children && !link.mega && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 top-full z-50 mt-2 min-w-[230px] rounded-[var(--radius-brand)] border-t-[4px] border-[var(--color-accent)] bg-white p-3 shadow-card-hover"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block rounded-[var(--radius-brand)] px-3 py-2.5 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-[var(--color-ink)] transition-colors duration-150 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.mega && link.megaColumns && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 mt-2 min-w-[660px] -translate-x-1/2 rounded-[var(--radius-brand)] border-t-[4px] border-[var(--color-accent)] bg-white p-7 shadow-card-hover"
                      >
                        <div className="grid grid-cols-3 gap-8">
                          {link.megaColumns.map((col) => (
                            <div key={col.title}>
                              <h4 className="mb-3 border-b border-[var(--color-divider)] pb-2 font-[family-name:var(--font-condensed)] text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                {col.title}
                              </h4>
                              <ul className="space-y-0.5">
                                {col.links.map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      href={item.href}
                                      className="block rounded-[var(--radius-brand)] px-2 py-2 text-sm font-bold text-[var(--color-ink-light)] transition-colors duration-150 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                                    >
                                      {item.label}
                                    </Link>
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

        <button
          onClick={onMenuToggle}
          className="rounded-[var(--radius-brand)] p-2 text-white transition-colors duration-200 hover:bg-white/10 xl:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
