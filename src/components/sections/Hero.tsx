"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks";
import Button from "@/components/ui/Button";

const slides = [
  {
    src: "/images/hero-banner-1.png",
    alt: "SINOTRUK heavy-duty commercial vehicles on the road",
  },
  {
    src: "/images/hero-banner-2.png",
    alt: "SINOTRUK manufacturing facility and fleet",
  },
];

export default function Hero() {
  const { current, goTo, next, prev } = useCarousel(slides.length);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] overflow-hidden"
    >
      {/* ── Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: current === i ? 1 : 0 }}
          aria-hidden={current !== i}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            preload={i === 0}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,30,54,0.85) 0%, rgba(11,30,54,0.40) 55%, rgba(232,88,12,0.15) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Content ── */}
      <div className="container-main relative z-10 flex min-h-[90vh] flex-col justify-center pt-[80px]">
        {/* Tag line */}
        <span className="mb-6 inline-flex items-center gap-3 font-[family-name:var(--font-condensed)] text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          <span className="block h-[2px] w-[40px] bg-[var(--color-accent)]" />
          Established 1993 &bull; Jinan, China
        </span>

        {/* Heading */}
        <h1 className="max-w-[720px] font-[family-name:var(--font-display)] text-[var(--text-fluid-4xl)] leading-[1.05] text-white">
          Built for the World&rsquo;s Toughest Roads
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-[560px] text-[var(--text-fluid-lg)] leading-relaxed text-white/75">
          From mining sites to metropolitan logistics, SINOTRUK delivers
          heavy-duty trucks, trailers, and new-energy vehicles engineered for
          reliability across every terrain and climate.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="primary" size="lg" href="#contact">
            Request a Quote
          </Button>
          <Button variant="outlineLight" size="lg" href="#products">
            Explore Products
          </Button>
        </div>
      </div>

      {/* ── Arrow Controls ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hero-arrows absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] md:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hero-arrows absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] md:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* ── Dot Indicators ── */}
      <div className="hero-controls absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
              current === i
                ? "scale-110 border-[var(--color-accent)] bg-[var(--color-accent)]"
                : "border-white/50 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
