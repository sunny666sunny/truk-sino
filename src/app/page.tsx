import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import Stats from "@/components/sections/Stats";
import Advantages from "@/components/sections/Advantages";
import Applications from "@/components/sections/Applications";
import Parts from "@/components/sections/Parts";
import News from "@/components/sections/News";
import VideoSection from "@/components/sections/VideoSection";
import ServiceSection from "@/components/sections/ServiceSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import { getHomeContent } from "@/lib/homeContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      images: [{ url: content.seo.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [content.seo.ogImage],
    },
  };
}

export default async function HomePage() {
  const content = await getHomeContent();
  return (
    <>
      <Hero content={content.hero} />
      <ProductGrid content={content.products} />
      <Stats content={content.stats} />
      <Advantages content={content.why} />
      <Applications content={content.industries} />
      <Parts content={content.parts} />
      <News content={content.news} />
      <VideoSection content={content.video} />
      <ServiceSection content={content.service} />
      <CTASection content={content.cta} />
      <ContactSection content={content.contact} />
    </>
  );
}
