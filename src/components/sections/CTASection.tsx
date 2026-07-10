import Button from "@/components/ui/Button";
import type { HomeContent } from "@/lib/homeContent";

const fallbackCtaContent: HomeContent["cta"] = {
  title: "Ready to Find Your Perfect Truck?",
  description: "Talk to our experts about model selection, financing options, and after-sales support for your market.",
  primaryCta: "Request a Quote",
  primaryHref: "/contact",
  secondaryCta: "Browse Products",
  secondaryHref: "/products",
};

export default function CTASection({ content = fallbackCtaContent }: { content?: HomeContent["cta"] }) {
  return (
    <section className="relative overflow-hidden py-fluid-2xl" style={{ background: "linear-gradient(135deg, #f05a0b 0%, #a93616 100%)" }}>
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-[var(--radius-brand)] bg-white/5" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-[var(--radius-brand)] bg-white/[0.03]" aria-hidden />
      <div className="container-main relative z-10 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-fluid-xl)] uppercase leading-[1.05] text-white">{content.title}</h2>
        <p className="mx-auto mb-8 mt-5 max-w-[680px] text-[length:var(--text-fluid-lg)] font-bold text-white/86">{content.description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" className="bg-white !text-[var(--color-accent)] hover:!bg-[var(--color-brand-900)] hover:!text-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]" href={content.primaryHref}>{content.primaryCta}</Button>
          <Button variant="outlineLight" size="lg" href={content.secondaryHref}>{content.secondaryCta}</Button>
        </div>
      </div>
    </section>
  );
}