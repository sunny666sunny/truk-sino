import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
import JsonLd from "@/components/shared/JsonLd";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";
import { organizationSchema } from "@/lib/structuredData";
import { getHomeContent } from "@/lib/homeContent";


export const metadata: Metadata = {
  metadataBase: new URL("https://sinotruk.com"),
  title: "SINOTRUK International | China's Leading Heavy Truck Manufacturer & Exporter",
  description:
    "SINOTRUK International manufactures and exports heavy-duty trucks, light trucks, special vehicles, semi-trailers and new energy vehicles to 90+ countries. Request a quote today.",
  keywords: [
    "heavy truck manufacturer",
    "dump truck exporter",
    "tractor truck China",
    "commercial vehicles",
    "mining trucks",
    "construction vehicles",
    "new energy truck",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "SINOTRUK International | Heavy Truck Manufacturer & Global Exporter",
    description:
      "China's premier heavy-duty truck manufacturer exporting to 90+ countries. Dump trucks, tractor trucks, special vehicles and more.",
    images: [{ url: "/images/hero-banner-1.png", width: 1792, height: 1024 }],
    siteName: "SINOTRUK International",
  },
  twitter: {
    card: "summary_large_image",
    title: "SINOTRUK International | Heavy Truck Manufacturer",
    description:
      "China's premier heavy-duty truck manufacturer exporting to 90+ countries worldwide.",
    images: ["/images/hero-banner-1.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeContent = await getHomeContent();
  return (
    <html
      lang="en"
      className="antialiased"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0b1e36" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="min-h-screen flex flex-col">
        <ReCaptchaProvider>
          <SiteChrome logo={homeContent.logo} navLinks={homeContent.header.navLinks} />
          <main className="flex-1">{children}</main>
          <Footer content={homeContent.footer} />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}

