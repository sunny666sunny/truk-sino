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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <Stats />
      <Advantages />
      <Applications />
      <Parts />
      <News />
      <VideoSection />
      <ServiceSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
