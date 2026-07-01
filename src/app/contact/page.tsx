import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | TrukSino International",
  description:
    "Get in touch with TrukSino's global sales and support team. Request a quote, ask about our products, or find your nearest regional office.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team — whether you need a single truck or a fleet of 500, our sales engineers are ready to help."
      />
      <ContactSection />
    </>
  );
}
