import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { allVideos } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "Video Gallery | TrukSino International",
  description:
    "Watch TrukSino vehicles in action — factory tours, product demonstrations, field tests, and brand stories.",
};

export default function VideoPage() {
  return (
    <SubPageLayout>
      <PageHero
        title="Video Gallery"
        subtitle="Watch TrukSino vehicles in action — factory tours, product demonstrations, field tests, and brand stories."
        image="/images/hero-banner-1.png"
      />

      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allVideos.map((video, index) => (
              <ScrollReveal key={video.id} delay={index * 0.1}>
                <Link
                  href={`/video/${video.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-brand-lg)] cursor-pointer"
                >
                  {/* Thumbnail */}
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                      <svg
                        className="w-6 h-6 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-end justify-between gap-3">
                      <h2 className="font-[family-name:var(--font-condensed)] text-sm font-semibold uppercase tracking-wider text-white leading-tight">
                        {video.title}
                      </h2>
                      <span className="shrink-0 rounded bg-black/50 px-2 py-0.5 font-[family-name:var(--font-condensed)] text-xs font-medium text-white">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
