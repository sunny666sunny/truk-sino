import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SubPageLayout from "@/components/shared/SubPageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { partsData } from "@/lib/pageData";
import { partCategories } from "@/lib/data";

const categorySlugs = [
  "cabin-and-body",
  "engine",
  "gearbox",
  "axle",
  "chassis",
  "other-parts",
];

/** Build slug from category name (same logic as parts/page.tsx) */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const allCategories = partCategories.map((cat) => ({
  name: cat.name,
  slug: toSlug(cat.name),
}));

export async function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const data = partsData[category];
  if (!data) {
    return { title: "Parts | TrukSino International" };
  }
  return {
    title: `${data.title} | TrukSino International`,
    description: `Browse genuine OEM ${data.title.toLowerCase()} for TrukSino trucks. Quality components backed by factory warranty.`,
  };
}

export default async function PartsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = partsData[category];

  if (!data) {
    notFound();
  }

  return (
    <SubPageLayout>
      <PageHero
        title={data.title}
        breadcrumb={[
          { label: "Parts", href: "/parts" },
          { label: data.title },
        ]}
      />

      <section className="bg-surface py-fluid-2xl">
        <div className="container-main">
          {/* Category tabs */}
          <ScrollReveal>
            <nav className="mb-fluid-xl flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/parts/${cat.slug}`}
                  className={`rounded-brand px-4 py-2 text-sm font-condensed font-semibold uppercase tracking-wider transition-all duration-200 ${
                    cat.slug === category
                      ? "bg-accent text-white"
                      : "bg-surface-warm text-ink-light hover:bg-accent-soft hover:text-accent"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </ScrollReveal>

          {/* Parts grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
            {data.items.map((item, i) => (
              <ScrollReveal key={item.sku} delay={i * 0.06}>
                <div className="group flex flex-col items-center rounded-brand-lg bg-surface p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  {/* Image */}
                  <div className="mb-4 h-20 w-20 overflow-hidden rounded-full bg-placeholder">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-condensed text-base font-bold text-brand-900">
                    {item.name}
                  </h3>

                  {/* SKU */}
                  <p className="mt-1 font-mono text-xs text-ink-muted">
                    {item.sku}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
