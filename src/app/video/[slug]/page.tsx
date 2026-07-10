import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getVideo, getVideos } from "@/lib/cmsData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allVideos = await getVideos();
  return allVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) return {};
  return {
    title: video.seoTitle ?? `${video.title} | SINOTRUK Video`,
    description: video.seoDescription ?? video.description,
    openGraph: {
      title: video.seoTitle ?? video.title,
      description: video.seoDescription ?? video.description,
      images: [{ url: video.thumbnail }],
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const [allVideos, video] = await Promise.all([getVideos(), getVideo(slug)]);

  if (!video) notFound();

  const otherVideos = allVideos.filter((v) => v.slug !== slug).slice(0, 3);

  return (
    <SubPageLayout>
      <PageHero title={video.title} subtitle={video.description} breadcrumb={[{ label: "Video", href: "/video" }, { label: video.title }]} />
      <section className="bg-[var(--color-surface-warm)] py-16 md:py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-[1000px]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-brand-lg)] bg-[var(--color-brand-900)]">
                {video.videoUrl ? (
                  <iframe src={video.videoUrl} title={video.title} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                ) : (
                  <>
                    <Image src={video.thumbnail} alt={`${video.title} video thumbnail`} fill className="object-cover opacity-60" sizes="(max-width: 1000px) 100vw, 1000px" />
                    <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40"><svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div></div>
                  </>
                )}
                {video.duration ? <div className="absolute bottom-4 right-4 rounded bg-black/60 px-3 py-1 font-[family-name:var(--font-condensed)] text-sm font-medium text-white">{video.duration}</div> : null}
              </div>
              <div className="mt-8 max-w-[800px]"><p className="text-[var(--color-ink-light)] leading-relaxed text-lg">{video.description}</p></div>
            </div>
          </ScrollReveal>
          <div className="mx-auto max-w-[1000px] my-16 border-t border-[var(--color-divider)]" />
          {otherVideos.length > 0 && (
            <div>
              <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-lg md:text-xl text-[var(--color-ink)] mb-8 text-center">More Videos</h2></ScrollReveal>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherVideos.map((other, index) => (
                  <ScrollReveal key={other.id} delay={index * 0.1}>
                    <Link href={`/video/${other.slug}`} className="group relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-brand-lg)] cursor-pointer">
                      <Image src={other.thumbnail} alt={`${other.title} video thumbnail`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4"><h3 className="font-[family-name:var(--font-condensed)] text-sm font-semibold uppercase tracking-wider text-white leading-tight">{other.title}</h3></div>
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
