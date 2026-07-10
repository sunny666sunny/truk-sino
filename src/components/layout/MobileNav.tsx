"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { getMergedNavLinks, type EditableNavLink, type NavChild, type NavLinkItem } from "@/lib/navigation";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  editableLinks?: EditableNavLink[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function flattenChildren(link: NavLinkItem): NavChild[] {
  if (link.children) return link.children;
  if (link.mega && link.megaColumns) {
    return link.megaColumns.flatMap((col) => col.links);
  }
  return [];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function MobileNav({ isOpen, onClose, editableLinks }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);


  const toggleExpand = useCallback((label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const links = getMergedNavLinks(editableLinks);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.nav
            key="mobile-nav-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[360px] z-50 bg-[var(--color-brand-900)] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between h-[70px] px-6 border-b border-white/[0.08] shrink-0">
              <span className="font-[family-name:var(--font-display)] text-2xl text-white tracking-[0.08em] select-none">
                SINOTRUK
              </span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-white/50 hover:text-white rounded-[var(--radius-brand)] hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable links */}
            <ul className="flex-1 overflow-y-auto overscroll-contain py-2">
              {links.map((link) => {
                const children = flattenChildren(link);
                const hasChildren = children.length > 0;
                const expanded = expandedItems.has(link.label);

                return (
                  <li key={link.label}>
                    <div className="flex items-stretch border-b border-white/[0.08]">
                      {/* Main link */}
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="flex-1 px-6 py-4 font-[family-name:var(--font-condensed)] font-black text-[0.9375rem] uppercase tracking-[0.13em] text-white hover:text-[var(--color-accent)] transition-colors duration-150"
                      >
                        {link.label}
                      </a>

                      {/* Expand toggle */}
                      {hasChildren && (
                        <button
                          onClick={() => toggleExpand(link.label)}
                          className="px-5 text-white/30 hover:text-white/70 transition-colors flex items-center"
                          aria-expanded={expanded}
                          aria-label={`Toggle ${link.label} submenu`}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion submenu */}
                    <AnimatePresence initial={false}>
                      {hasChildren && expanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden bg-black/10"
                        >
                          {children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                onClick={onClose}
                                className="block pl-10 pr-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-white/62 hover:text-[var(--color-accent)] transition-colors duration-150 border-b border-white/[0.04]"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Bottom info */}
            <div className="shrink-0 px-6 py-5 border-t border-white/[0.08] text-xs text-white/30 space-y-1">
              <a
                href="mailto:info@sinotruk.com"
                className="block hover:text-white/60 transition-colors"
              >
                info@sinotruk.com
              </a>
              <p>Mon鈥揝at: 8:00 AM 鈥?6:00 PM (CST)</p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
