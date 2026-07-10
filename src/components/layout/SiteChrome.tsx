"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import BackToTopButton from "@/components/ui/BackToTopButton";
import type { EditableNavLink } from "@/lib/navigation";

type SiteChromeProps = {
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  navLinks?: EditableNavLink[];
};

export default function SiteChrome({ logo, navLinks }: SiteChromeProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Header logo={logo} editableLinks={navLinks} onMenuToggle={() => setMobileOpen(true)} />
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} editableLinks={navLinks} />
      <BackToTopButton />
    </>
  );
}
