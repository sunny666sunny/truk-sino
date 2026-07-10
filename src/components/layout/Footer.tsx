import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import type { HomeContent } from "@/lib/homeContent";

type SocialIconId = "facebook" | "youtube" | "tiktok" | "linkedin" | "instagram" | "x" | "whatsapp";

type SocialLink = HomeContent["footer"]["socialLinks"][number] & { icon?: string };

const SOCIAL_ICONS: Record<SocialIconId, { label: string; path: string }> = {
  facebook: {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4h-4V7a1 1 0 0 1 1-1h3V2z",
  },
  youtube: {
    label: "YouTube",
    path: "M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 1 12a31 31 0 0 0 .1 4.5 3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0 0-4.5zM10 15.5v-7l6 3.5-6 3.5z",
  },
  tiktok: {
    label: "TikTok",
    path: "M16 2c.4 3 2.1 4.8 5 5v3.7a8 8 0 0 1-5-1.7v6.3A6.7 6.7 0 1 1 9.3 8.6c.4 0 .8 0 1.2.1v3.8a2.9 2.9 0 1 0 2 2.8V2h3.5z",
  },
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4v14h-4V8zm7 0h3.8v1.9h.1c.5-1 1.9-2.2 4-2.2 4.2 0 5 2.8 5 6.4V22h-4v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V22h-4V8z",
  },
  instagram: {
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm6.1-.6a1.1 1.1 0 1 0-1.1 1.1 1.1 1.1 0 0 0 1.1-1.1zM12 9.2A2.8 2.8 0 1 1 12 14.8 2.8 2.8 0 0 1 12 9.2z",
  },
  x: {
    label: "X",
    path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7-5.7 7H3.1l7.3-8.4L2.8 2h6.5l4.5 6.5L18.9 2zm-1.1 17.8h1.7L8.4 4.1H6.6l11.2 15.7z",
  },
  whatsapp: {
    label: "WhatsApp",
    path: "M12 2a9.8 9.8 0 0 0-8.4 14.9L2.5 22l5.2-1.4A9.9 9.9 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.9 1-.2.2-.3.2-.6.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.5 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 4.9 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .2-1.1-.1-.1-.3-.2-.6-.3z",
  },
};

function normalizeIcon(link: SocialLink): SocialIconId | null {
  const raw = String(link.icon || link.label || "").toLowerCase().replace(/[^a-z]/g, "");
  if (raw === "twitter") return "x";
  if (raw === "whatapp") return "whatsapp";
  if (raw in SOCIAL_ICONS) return raw as SocialIconId;
  return null;
}

function SocialIcon({ link }: { link: SocialLink }) {
  const icon = normalizeIcon(link);
  if (!icon) return <span className="text-xs font-bold">{link.label.slice(0, 2)}</span>;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d={SOCIAL_ICONS[icon].path} />
    </svg>
  );
}

function FooterLogo({ logo }: { logo: HomeContent["footer"]["logo"] }) {
  return (
    <span
      aria-label={logo.alt}
      role="img"
      className="block shrink-0 bg-[var(--color-accent)]"
      style={{
        width: logo.width,
        height: logo.height,
        WebkitMaskImage: `url(${logo.src})`,
        maskImage: `url(${logo.src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export default function Footer({ content }: { content: HomeContent["footer"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-brand-900)]">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/#home" className="mb-5 inline-flex items-center gap-3">
              <FooterLogo logo={content.logo} />
              <span className="select-none font-[family-name:var(--font-display)] text-2xl leading-none tracking-[0.08em] text-white">
                SINO<span className="text-[var(--color-accent)]">TRUK</span>
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/50">{content.brandText}</p>
            <div className="flex items-center gap-3">
              {content.socialLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-brand)] bg-white/[0.06] text-white/65 transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white"
                >
                  <SocialIcon link={link} />
                </a>
              ))}
            </div>
          </div>

          {content.columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 font-[family-name:var(--font-condensed)] text-xs font-bold uppercase tracking-[0.12em] text-white">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link href={link.href} className="inline-block pl-0 text-sm text-white/55 transition-all duration-200 hover:pl-1 hover:text-[var(--color-accent)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.08]">
        <div className="container-main py-10">
          <div className="max-w-xl"><NewsletterForm /></div>
        </div>
      </div>
      <div className="border-t border-white/[0.08]">
        <div className="container-main flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/40 sm:flex-row">
          <p>{content.copyright.replace("{year}", String(year))}</p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <a href={`mailto:${content.email}`} className="transition-colors hover:text-white/70">{content.email}</a>
            <span>{content.hours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
