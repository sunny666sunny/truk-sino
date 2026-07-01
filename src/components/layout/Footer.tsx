import { navLinks } from "@/lib/data";
import NewsletterForm from "@/components/forms/NewsletterForm";

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

/* ------------------------------------------------------------------ */
/*  Social SVG icons (brand icons removed from lucide-react v1+)       */
/* ------------------------------------------------------------------ */
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */
const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: YouTubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

function getNavColumn(label: string): NavChild[] {
  const link = (navLinks as NavLinkItem[]).find((l) => l.label === label);
  if (!link) return [];
  if (link.children) return link.children;
  if (link.mega && link.megaColumns) {
    return link.megaColumns.flatMap((col) => col.links);
  }
  return [];
}

const footerColumns = [
  { title: "About Us", links: getNavColumn("About Us") },
  { title: "Products", links: getNavColumn("Products") },
  { title: "Parts", links: getNavColumn("Parts") },
  { title: "Service", links: getNavColumn("Service") },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-brand-900)]">
      {/* ── Main grid ── */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column (wider) */}
          <div className="lg:col-span-2 sm:col-span-2">
            {/* Logo */}
            <a href="#home" className="inline-flex items-center gap-3 mb-5">
              <div className="flex flex-col items-center leading-none">
                <div
                  className="w-10 h-9 rounded-[var(--radius-brand)] flex items-center justify-center text-white font-bold text-xs tracking-widest"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  TS
                </div>
                <div
                  className="w-10 h-1 rounded-b-[var(--radius-brand)]"
                  style={{ backgroundColor: "var(--color-brand-800)" }}
                />
              </div>
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.08em] text-white leading-none select-none">
                TRUK<span className="text-[var(--color-accent)]">SINO</span>
              </span>
            </a>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              TrukSino is a leading manufacturer and exporter of heavy-duty commercial vehicles,
              delivering reliable trucking solutions to over 90 countries worldwide since 1998.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-[var(--radius-brand)] bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-[family-name:var(--font-condensed)] font-bold text-xs uppercase tracking-[0.12em] text-white mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/55 text-sm hover:text-[var(--color-accent)] pl-0 hover:pl-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="border-t border-white/[0.08]">
        <div className="container-main py-10">
          <div className="max-w-xl">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.08]">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {year} TrukSino. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <a
              href="mailto:info@truksino.com"
              className="hover:text-white/70 transition-colors"
            >
              info@truksino.com
            </a>
            <span>Mon – Sat: 8:00 AM – 6:00 PM (CST)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
