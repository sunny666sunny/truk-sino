import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/pageData";

export const metadata: Metadata = {
  title: "After-Sales Service | TrukSino International",
  description:
    "Comprehensive after-sales support including preventive maintenance, technical training, and genuine parts supply through 520+ authorized service stations.",
};

const sidebarLinks = [
  { href: "/service/after-sales-service", label: "After-Sales Service" },
  { href: "/service/service-broadcast", label: "Service Broadcast" },
  { href: "/service/maintenance-manual", label: "Maintenance Manual" },
];

export default function AfterSalesServicePage() {
  const data = servicePages["after-sales-service"];

  return (
    <SubPageLayout>
      <PageHero
        title={data.title}
        subtitle={data.subtitle}
        image="/images/factory-workshop.png"
        breadcrumb={[
          { label: "Service", href: "/service" },
          { label: "After-Sales Service" },
        ]}
      />

      <section className="bg-surface py-fluid-2xl">
        <div className="container-main">
          <div className="grid gap-fluid-xl lg:grid-cols-[1fr_260px]">
            {/* Main content */}
            <div className="space-y-fluid-xl">
              {data.sections.map((section, i) => (
                <ScrollReveal key={section.heading} delay={i * 0.1}>
                  <div
                    className={`grid gap-8 items-center md:grid-cols-2 ${
                      i % 2 === 1 ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                      <h2 className="font-display text-2xl text-brand-900 md:text-3xl">
                        {section.heading}
                      </h2>
                      <p className="mt-4 leading-relaxed text-ink-light">
                        {section.text}
                      </p>
                    </div>
                    <div
                      className={`overflow-hidden rounded-brand-lg ${
                        i % 2 === 1 ? "md:[direction:ltr]" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Sidebar */}
            <ScrollReveal delay={0.2}>
              <aside className="rounded-brand-lg border border-divider bg-surface-warm p-6 lg:sticky lg:top-[100px]">
                <h3 className="mb-4 font-condensed text-sm font-semibold uppercase tracking-wider text-brand-900">
                  Service
                </h3>
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-brand px-3 py-2.5 text-sm transition-colors ${
                        link.href === "/service/after-sales-service"
                          ? "bg-accent-soft font-semibold text-accent"
                          : "text-ink-light hover:bg-surface hover:text-brand-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
