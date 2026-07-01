import type { Metadata } from "next";
import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";
import { organizationSchema } from "@/lib/structuredData";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  variable: "--font-condensed",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0b1e36" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="min-h-screen flex flex-col">
        <ReCaptchaProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
