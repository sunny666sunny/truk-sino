import CTASection from "@/components/sections/CTASection";

interface SubPageLayoutProps {
  children: React.ReactNode;
}

export default function SubPageLayout({ children }: SubPageLayoutProps) {
  return (
    <>
      {children}
      <CTASection />
    </>
  );
}
