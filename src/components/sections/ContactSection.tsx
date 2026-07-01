"use client";

import { MapPin, Mail, Clock } from "lucide-react";
import { regionalOffices } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import InquiryForm from "@/components/forms/InquiryForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-surface-warm py-fluid-2xl"
    >
      <div className="container-main">
        <SectionHeader
          tag="Get in Touch"
          title="Let's Talk About Your Fleet Needs"
          subtitle="Whether you need a single truck or a fleet of 500, our sales engineers are ready to design the right solution for your operation."
          center
        />

        <div className="mt-fluid-lg grid gap-fluid-xl lg:grid-cols-2">
          {/* LEFT — Contact form */}
          <ScrollReveal>
            <div className="rounded-brand-lg bg-surface p-10 shadow-card">
              <h3 className="font-display text-3xl text-brand-900">
                Send Us an Inquiry
              </h3>
              <p className="mb-7 text-sm text-ink-light">
                Fill out the form and our sales team will respond within 24 hours.
              </p>

              <InquiryForm />
            </div>
          </ScrollReveal>

          {/* RIGHT — Contact info */}
          <div className="space-y-10">
            {/* Headquarters */}
            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="mb-4 font-display text-2xl text-brand-900">
                  Headquarters
                </h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-accent-soft text-accent">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">
                        Main Office
                      </p>
                      <p className="text-sm text-ink-light">
                        No. 777, Jing Shi Road, High-Tech Development Zone,
                        Jinan, Shandong Province, China 250101
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-accent-soft text-accent">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">
                        Email
                      </p>
                      <p className="text-sm text-ink-light">
                        info@truksino.com
                        <br />
                        sales@truksino.com
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-accent-soft text-accent">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">
                        Business Hours
                      </p>
                      <p className="text-sm text-ink-light">
                        Monday &ndash; Saturday, 8:00 AM &ndash; 5:30 PM (CST)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Regional Offices */}
            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="mb-4 font-display text-2xl text-brand-900">
                  Regional Offices
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {regionalOffices.map((office) => (
                    <div
                      key={office.region}
                      className="rounded-brand border border-divider bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
                    >
                      <p className="mb-2 font-condensed text-sm font-bold uppercase tracking-wider text-brand-900">
                        {office.region}
                      </p>
                      <p className="text-xs text-ink-light">
                        Sales: {office.sales}
                        <br />
                        Support: {office.support}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
