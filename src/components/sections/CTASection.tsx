import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-fluid-2xl"
      style={{ background: "linear-gradient(135deg, var(--color-accent) 0%, #c43a2b 100%)" }}
    >
      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-white/[0.03]"
        aria-hidden
      />

      {/* Content */}
      <div className="container-main relative z-10 text-center">
        <h2 className="font-display text-fluid-3xl text-white">
          Ready to Find Your Perfect Truck?
        </h2>

        <p className="mx-auto mt-4 mb-8 max-w-[540px] text-fluid-lg text-white/85">
          Get a personalized quote from our sales team or browse our complete product catalog.
          We deliver to 90+ countries with full after-sales support.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            className="bg-white !text-[var(--color-accent)] hover:!bg-[var(--color-brand-900)] hover:!text-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
            href="#contact"
          >
            Request a Quote
          </Button>

          <Button variant="outlineLight" size="lg" href="#products">
            Browse Products
          </Button>
        </div>
      </div>
    </section>
  );
}
