import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { allVideos } from "@/lib/pageData";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = allVideos.find((v) => v.slug === slug);
  if (!video) return {};
  return {
    title: `${video.title} | SINOTRUK Video`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [{ url: video.thumbnail }],
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = allVideos.find((v) => v.slug === slug);

  if (!video) notFound();

  const otherVideos = allVideos
    .filter((v) => v.slug !== slug)
    .slice(0, 3);

  return (
    <SubPageLayout>
      <PageHero
        title={video.title}
        subtitle={video.description}
        breadcrumb={[
          { label: "Video", href: "/video" },
          { label: video.title },
        ]}
      />

      {/* Video Player Area */}
      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-[1000px]">
              {/* Video placeholder */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-brand-lg)] bg-[var(--color-brand-900)]">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
                {/* Center play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 transition-all duration-300 hover:bg-white/30 hover:scale-110 cursor-pointer">
                    <svg
                      className="w-10 h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 rounded bg-black/60 px-3 py-1 font-[family-name:var(--font-condensed)] text-sm font-medium text-white">
                  {video.duration}
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 max-w-[800px]">
                <p className="text-[var(--color-ink-light)] leading-relaxed text-lg">
                  {video.description}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div className="mx-auto max-w-[1000px] my-16 border-t border-[var(--color-divider)]" />

          {/* Other Videos */}
          {otherVideos.length > 0 && (
            <div>
              <ScrollReveal>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-ink)] mb-8 text-center">
                  More Videos
                </h2>
              </ScrollReveal>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherVideos.map((other, index) => (
                  <ScrollReveal key={other.id} delay={index * 0.1}>
                    <Link
                      href={`/video/${other.slug}`}
                      className="group relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-brand-lg)] cursor-pointer"
                    >
                      <Image
                        src={other.thumbnail}
                        alt={other.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="font-[family-name:var(--font-condensed)] text-sm font-semibold uppercase tracking-wider text-white leading-tight">
                            {other.title}
                          </h3>
                          <span className="shrink-0 rounded bg-black/50 px-2 py-0.5 font-[family-name:var(--font-condensed)] text-xs font-medium text-white">
                            {other.duration}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}
