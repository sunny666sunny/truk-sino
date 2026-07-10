"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks";
import Button from "@/components/ui/Button";
import type { HomeContent } from "@/lib/homeContent";

type HeroProps = {
  content: HomeContent["hero"];
};

export default function Hero({ content }: HeroProps) {
  const slides = content.slides.length ? content.slides : [{ src: "/images/hero-banner-1.png", alt: content.title }];
  const { current, goTo, next, prev } = useCarousel(slides.length);

  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden bg-[var(--color-brand-900)]">
      {slides.map((slide, i) => (
        <div key={`${slide.src}-${i}`} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: current === i ? 1 : 0 }} aria-hidden={current !== i}>
          <Image src={slide.src} alt={slide.alt} fill sizes="100vw" className="object-cover" preload={i === 0} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,24,43,0.9) 0%, rgba(7,24,43,0.66) 44%, rgba(7,24,43,0.18) 72%, rgba(240,90,11,0.1) 100%)" }} />
        </div>
      ))}

      <div className="container-main relative z-10 flex min-h-[92vh] flex-col justify-center pt-[96px]">
        <span className="mb-6 inline-flex w-fit items-center bg-[var(--color-accent)] px-3 py-2 font-[family-name:var(--font-condensed)] text-xs font-black uppercase tracking-[0.18em] text-white sm:text-sm">
          <span className="block h-[2px] w-[40px] bg-[var(--color-accent)]" />
          {content.eyebrow}
        </span>
        <h1 className="max-w-[760px] font-[family-name:var(--font-display)] text-[length:var(--text-fluid-2xl)] uppercase leading-[1.02] text-white">
          {content.title}
        </h1>
        <p className="mt-6 max-w-[680px] text-[length:var(--text-fluid-lg)] font-bold leading-relaxed text-white/82">
          {content.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="primary" size="md" className="px-6 py-3 text-[0.78rem] sm:text-[0.82rem]" href={content.primaryHref}>{content.primaryCta}</Button>
          <Button variant="outlineLight" size="md" className="px-6 py-3 text-[0.78rem] sm:text-[0.82rem]" href={content.secondaryHref}>{content.secondaryCta}</Button>
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <button onClick={prev} aria-label="Previous slide" className="hero-arrows absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[var(--radius-brand)] border-2 border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] md:left-6 md:flex">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} aria-label="Next slide" className="hero-arrows absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[var(--radius-brand)] border-2 border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] md:right-6 md:flex">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="hero-controls absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} className={`h-1.5 w-4 rounded-[var(--radius-brand)] border transition-all duration-300 ${current === i ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-white/50 bg-white/30"}`} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}