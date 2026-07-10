import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactSection from "@/components/sections/ContactSection";
import { getHomeContent } from "@/lib/homeContent";

export const metadata: Metadata = {
  title: "Contact Us | SINOTRUK International",
  description:
    "Get in touch with SINOTRUK's global sales and support team. Request a quote, ask about our products, or find your nearest regional office.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const [{ product }, content] = await Promise.all([searchParams, getHomeContent()]);

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle={content.contact.description}
      />
      <ContactSection productInterest={product} content={content.contact} />
    </>
  );
}