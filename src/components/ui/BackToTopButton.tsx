"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 420;

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
      onClick={scrollToTop}
      className={[
        "fixed z-40 flex h-11 w-11 items-center justify-center rounded-full",
        "bottom-5 right-4 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12",
        "border border-white/20 bg-accent text-white shadow-[0_10px_28px_rgba(11,30,54,0.24)]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_34px_rgba(11,30,54,0.3)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
