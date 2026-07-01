import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { videos } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function VideoSection() {
  return (
    <section
      id="video"
      className="bg-brand-900 py-fluid-2xl"
    >
      <div className="container-main">
        {/* SectionHeader with white overrides for dark background */}
        <div className="mb-fluid-lg [&_h2]:!text-white [&_.section-subtitle]:!text-white/60 [&_.section-tag]:!text-white/80">
          <SectionHeader
            tag="Video Gallery"
            title="See SINOTRUK in Action"
            subtitle="From factory tours to field tests — watch our trucks perform in real-world conditions across every continent."
            center
          />
        </div>

        <div className="grid gap-fluid-md md:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => (
            <ScrollReveal key={video.title} delay={index * 0.1}>
              <Link href={`/video/${video.slug}`} className="group relative block aspect-[16/10] cursor-pointer overflow-hidden rounded-brand-lg">
                {/* Thumbnail */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Overlay — default state */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent transition-all duration-500 group-hover:from-accent/85 group-hover:via-accent/20" />

                {/* Play button */}
                <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-accent group-hover:bg-accent">
                  <Play className="h-6 w-6 fill-white text-white" />
                </div>

                {/* Title */}
                <span className="absolute bottom-5 left-5 font-condensed text-sm font-semibold uppercase tracking-wider text-white">
                  {video.title}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
