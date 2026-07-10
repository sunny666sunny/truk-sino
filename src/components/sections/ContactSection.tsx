"use client";

import { MapPin, Mail, Clock } from "lucide-react";
import { regionalOffices } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import InquiryForm from "@/components/forms/InquiryForm";
import type { HomeContent } from "@/lib/homeContent";

const fallbackContactContent: HomeContent["contact"] = {
  tag: "Get in Touch",
  title: "Ready to Start Your Project?",
  description: "Our international sales team will help you select the right SINOTRUK model, configuration, and support plan.",
  formTitle: "Send an Inquiry",
  formDescription: "Tell us what you need and we will respond within one business day.",
  headquartersTitle: "Headquarters",
  officeLabel: "Main Office",
  address: "No. 777 Hua'ao Road, Jinan, Shandong, China",
  emailLabel: "Email",
  emails: "sales@sinotruk.com\nsupport@sinotruk.com",
  hoursLabel: "Business Hours",
  hours: "Monday - Friday, 9:00 - 18:00 CST",
  regionalTitle: "Regional Support",
};

export default function ContactSection({ productInterest, content = fallbackContactContent }: { productInterest?: string; content?: HomeContent["contact"] }) {
  return (
    <section id="contact" className="bg-surface-warm py-fluid-2xl"><div className="container-main">
      <SectionHeader tag={content.tag} title={content.title} subtitle={content.description} center />
      <div className="mt-fluid-lg grid gap-fluid-xl lg:grid-cols-2">
        <ScrollReveal><div className="rounded-brand-lg bg-surface p-10 shadow-card">
          <h3 className="font-display text-xl text-brand-900">{content.formTitle}</h3>
          <p className="mb-7 text-sm text-ink-light">{content.formDescription}</p>
          <InquiryForm productInterest={productInterest} />
        </div></ScrollReveal>
        <div className="space-y-10">
          <ScrollReveal delay={0.15}><div><h3 className="mb-4 font-display text-lg text-brand-900">{content.headquartersTitle}</h3><div className="space-y-5">
            <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-accent-soft text-accent"><MapPin className="h-5 w-5" /></div><div><p className="font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">{content.officeLabel}</p><p className="text-sm text-ink-light">{content.address}</p></div></div>
            <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-accent-soft text-accent"><Mail className="h-5 w-5" /></div><div><p className="font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">{content.emailLabel}</p><p className="whitespace-pre-line text-sm text-ink-light">{content.emails}</p></div></div>
            <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-accent-soft text-accent"><Clock className="h-5 w-5" /></div><div><p className="font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">{content.hoursLabel}</p><p className="text-sm text-ink-light">{content.hours}</p></div></div>
          </div></div></ScrollReveal>
          <ScrollReveal delay={0.3}><div><h3 className="mb-4 font-display text-lg text-brand-900">{content.regionalTitle}</h3><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {regionalOffices.map((office) => <div key={office.region} className="rounded-brand border border-divider bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card"><p className="mb-2 font-condensed text-sm font-bold uppercase tracking-wider text-brand-900">{office.region}</p><p className="text-xs text-ink-light">Sales: {office.sales}<br />Support: {office.support}</p></div>)}
          </div></div></ScrollReveal>
        </div>
      </div>
    </div></section>
  );
}
