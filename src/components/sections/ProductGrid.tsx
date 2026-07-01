import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

/** Map homepage product IDs to their category route slugs */
const categorySlugMap: Record<string, string> = {
  "dump-truck": "heavy-truck",
  "tractor-truck": "heavy-truck",
  "cargo-truck": "heavy-truck",
  "light-truck": "light-truck",
  "water-tanker": "special-vehicle",
  "mixer-truck": "special-vehicle",
  "semi-trailer": "semi-trailer",
  "electric-truck": "new-energy-vehicle",
};

export default function ProductGrid() {
  return (
    <section
      id="products"
      className="bg-[var(--color-surface-warm)] py-[var(--spacing-fluid-2xl)]"
    >
      <div className="container-main">
        <SectionHeader
          tag="Our Product Range"
          title="Vehicles Engineered for Every Mission"
          subtitle="From heavy-duty dump trucks to zero-emission electric vehicles, explore our complete lineup of commercial vehicles built for global markets."
          center
        />

        <div className="mt-[var(--spacing-fluid-xl)] grid gap-[var(--spacing-fluid-md)] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-[var(--radius-brand-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-placeholder)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
                  />
                  {product.badge && (
                    <div className="absolute left-4 top-4">
                      <Badge variant="accent">{product.badge}</Badge>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                    {product.category}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-brand-900)]">
                    {product.name}
                  </h3>
                  <p className="mb-4 mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-ink-light)]">
                    {product.excerpt}
                  </p>
                  <Link
                    href={`/products/${categorySlugMap[product.id] || "heavy-truck"}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)] transition-all duration-300 hover:gap-3"
                  >
                    View Models
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
