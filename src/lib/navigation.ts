import { navLinks } from "@/lib/data";

export type NavChild = {
  label: string;
  href: string;
};

export type MegaColumn = {
  title: string;
  links: NavChild[];
};

export type NavLinkItem = {
  label: string;
  href: string;
  children?: NavChild[];
  mega?: boolean;
  megaColumns?: MegaColumn[];
};

export type EditableNavLink = {
  label: string;
  href: string;
};

const baseNavLinks = navLinks as NavLinkItem[];

export function getMergedNavLinks(editableLinks?: EditableNavLink[] | null): NavLinkItem[] {
  if (!editableLinks?.length) return baseNavLinks;

  return editableLinks.map((link, index) => {
    const base = baseNavLinks[index];
    if (!base) return { label: link.label, href: link.href };

    return {
      ...base,
      label: link.label || base.label,
      href: link.href || base.href,
    };
  });
}