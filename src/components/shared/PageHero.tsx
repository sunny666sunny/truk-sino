import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumb?: { label: string; href?: string }[];
  className?: string;
}

export default function PageHero({ title, subtitle, image, breadcrumb, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", image ? "min-h-[340px] md:min-h-[400px]" : "min-h-[280px]", className)}>
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,30,54,0.88) 0%, rgba(11,30,54,0.55) 50%, rgba(11,30,54,0.30) 100%)" }} />
        </>
      ) : (
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--color-brand-900) 0%, var(--color-brand-800) 60%, var(--color-brand-700) 100%)" }} />
      )}
      <div className="container-main relative z-10 flex min-h-[inherit] flex-col justify-center pt-[100px] pb-12">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm font-[family-name:var(--font-condensed)] uppercase tracking-wider">
              <li><Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-white/30">/</span>
                  {item.href ? <Link href={item.href} className="text-white/60 hover:text-white transition-colors">{item.label}</Link> : <span className="text-white">{item.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-fluid-xl)] text-white leading-[1.15]">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-[640px] text-[length:var(--text-fluid-base)] text-white/70 leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}