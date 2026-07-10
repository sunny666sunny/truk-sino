import { prisma } from "@/lib/prisma-client";
import { advantages, applications, navLinks, partCategories, stats as defaultStats } from "@/lib/data";

export const HOME_CONTENT_KEY = "home_content";

export type HomeImage = { src: string; alt: string };
export type HomeHeroSlide = HomeImage;
export type HomeLink = { label: string; href: string; icon?: string };
export type HomeInfoCard = { icon: string; title: string; description: string; image?: string; imageAlt?: string };
export type HomeServiceCard = HomeInfoCard & { slug: string };
export type HomeStat = { icon: string; value: number; suffix: string; label: string };

export type HomeContent = {
  logo: HomeImage & { width: number; height: number };
  seo: { title: string; description: string; ogImage: string };
  header: { navLinks: HomeLink[] };
  hero: { eyebrow: string; title: string; description: string; primaryCta: string; primaryHref: string; secondaryCta: string; secondaryHref: string; slides: HomeHeroSlide[] };
  products: { tag: string; title: string; description: string };
  stats: { items: HomeStat[] };
  why: { tag: string; title: string; description: string; items: HomeInfoCard[] };
  industries: { tag: string; title: string; description: string; items: HomeInfoCard[] };
  parts: { tag: string; title: string; description: string; items: HomeInfoCard[] };
  news: { tag: string; title: string; description: string };
  video: { tag: string; title: string; description: string };
  service: { tag: string; title: string; description: string; items: HomeServiceCard[] };
  cta: { title: string; description: string; primaryCta: string; primaryHref: string; secondaryCta: string; secondaryHref: string };
  contact: { tag: string; title: string; description: string; formTitle: string; formDescription: string; headquartersTitle: string; officeLabel: string; address: string; emailLabel: string; emails: string; hoursLabel: string; hours: string; regionalTitle: string };
  footer: { logo: HomeImage & { width: number; height: number }; brandText: string; columns: { title: string; links: HomeLink[] }[]; socialLinks: HomeLink[]; copyright: string; email: string; hours: string };
};

function flattenNavLinks(): HomeLink[] {
  return navLinks.map((item) => ({ label: item.label, href: item.href }));
}

export const defaultHomeContent: HomeContent = {
  logo: { src: "/images/logo-sinotruk.png", alt: "SINOTRUK logo", width: 140, height: 56 },
  seo: {
    title: "SINOTRUK International | China's Leading Heavy Truck Manufacturer & Exporter",
    description: "SINOTRUK International manufactures and exports heavy-duty trucks, light trucks, special vehicles, semi-trailers and new energy vehicles to 90+ countries. Request a quote today.",
    ogImage: "/images/hero-banner-1.png",
  },
  header: { navLinks: flattenNavLinks() },
  hero: {
    eyebrow: "Established 1993 鈥?Jinan, China",
    title: "Built for the World's Toughest Roads",
    description: "From mining sites to metropolitan logistics, SINOTRUK delivers heavy-duty trucks, trailers, and new-energy vehicles engineered for reliability across every terrain and climate.",
    primaryCta: "Request a Quote",
    primaryHref: "#contact",
    secondaryCta: "Explore Products",
    secondaryHref: "#products",
    slides: [
      { src: "/images/hero-banner-1.png", alt: "SINOTRUK heavy-duty commercial vehicles on the road" },
      { src: "/images/hero-banner-2.png", alt: "SINOTRUK manufacturing facility and fleet" },
    ],
  },
  products: {
    tag: "Our Product Range",
    title: "Vehicles Engineered for Every Mission",
    description: "From heavy-duty dump trucks to zero-emission electric vehicles, explore our complete lineup of commercial vehicles built for global markets.",
  },
  stats: { items: defaultStats },
  why: {
    tag: "Why SINOTRUK",
    title: "Engineering Advantages That Deliver Results",
    description: "Six core pillars that set SINOTRUK vehicles apart - from proprietary powertrains to a worldwide support network that keeps your fleet moving.",
    items: advantages.map((item) => ({ icon: item.icon, title: item.title, description: item.description })),
  },
  industries: {
    tag: "Industry Solutions",
    title: "Purpose-Built for Your Industry",
    description: "Whatever your sector demands, SINOTRUK engineers vehicles to match - from construction sites to clean-city logistics.",
    items: applications.map((item) => ({ icon: item.title, title: item.title, description: item.description })),
  },
  parts: {
    tag: "Genuine Parts",
    title: "Your Source for OEM Truck Parts",
    description: "Direct from the manufacturer - genuine SINOTRUK parts shipped worldwide with full traceability, OEM warranty, and dealer pricing for fleets of any size.",
    items: partCategories.map((item) => ({ icon: item.icon, title: item.name, description: item.description })),
  },
  news: {
    tag: "News & Events",
    title: "Latest from SINOTRUK",
    description: "Stay up to date with product launches, dealer events, and industry insights from our global network.",
  },
  video: {
    tag: "Video Gallery",
    title: "See SINOTRUK in Action",
    description: "From factory tours to field tests - watch our trucks perform in real-world conditions across every continent.",
  },
  service: {
    tag: "After-Sales Support",
    title: "Service That Keeps You Moving",
    description: "From preventive maintenance to emergency repairs, our global service network ensures your fleet stays on the road.",
    items: [
      { slug: "after-sales-service", icon: "Wrench", title: "After-Sales Service", description: "Scheduled maintenance programs, preventive inspections, and emergency roadside assistance through authorized service stations worldwide.", image: "/images/factory-workshop.png" },
      { slug: "service-broadcast", icon: "Radio", title: "Service Broadcast", description: "Technical repair demonstrations and diagnostic walkthroughs for dealer technicians and fleet maintenance teams.", image: "/images/hero-banner-2.png" },
      { slug: "maintenance-manual", icon: "BookOpen", title: "Maintenance Manual", description: "Operator manuals, service intervals, torque specifications, troubleshooting guides, and genuine parts catalogs.", image: "/images/product-tractor-truck.png" },
    ],
  },
  cta: {
    title: "Ready to Find Your Perfect Truck?",
    description: "Get a personalized quote from our sales team or browse our complete product catalog. We deliver to 90+ countries with full after-sales support.",
    primaryCta: "Request a Quote",
    primaryHref: "#contact",
    secondaryCta: "Browse Products",
    secondaryHref: "#products",
  },
  contact: {
    tag: "Get in Touch",
    title: "Let's Talk About Your Fleet Needs",
    description: "Whether you need a single truck or a fleet of 500, our sales engineers are ready to design the right solution for your operation.",
    formTitle: "Send Us an Inquiry",
    formDescription: "Fill out the form and our sales team will respond within 24 hours.",
    headquartersTitle: "Headquarters",
    officeLabel: "Main Office",
    address: "No. 777, Jing Shi Road, High-Tech Development Zone, Jinan, Shandong Province, China 250101",
    emailLabel: "Email",
    emails: "info@sinotruk.com\nsales@sinotruk.com",
    hoursLabel: "Business Hours",
    hours: "Monday - Saturday, 8:00 AM - 5:30 PM (CST)",
    regionalTitle: "Regional Offices",
  },
  footer: {
    logo: { src: "/images/sinotruk-icon.png", alt: "SINOTRUK footer logo", width: 48, height: 48 },
    brandText: "SINOTRUK is a leading manufacturer and exporter of heavy-duty commercial vehicles, delivering reliable trucking solutions to over 90 countries worldwide since 1998.",
    columns: [
      { title: "About Us", links: [{ label: "Who We Are", href: "/about/who-we-are" }, { label: "Our Journey", href: "/about/our-journey" }, { label: "Our Facilities", href: "/about/our-facilities" }] },
      { title: "Products", links: [{ label: "Heavy Truck", href: "/products/heavy-truck" }, { label: "Light Truck", href: "/products/light-truck" }, { label: "Special Vehicle", href: "/products/special-vehicle" }] },
      { title: "Parts", links: [{ label: "Cabin & Body", href: "/parts/cabin-and-body" }, { label: "Engine", href: "/parts/engine" }, { label: "Gearbox", href: "/parts/gearbox" }] },
      { title: "Service", links: [{ label: "After-Sales Service", href: "/service/after-sales-service" }, { label: "Service Broadcast", href: "/service/service-broadcast" }, { label: "Maintenance Manual", href: "/service/maintenance-manual" }] },
    ],
    socialLinks: [{ label: "Facebook", icon: "facebook", href: "https://facebook.com" }, { label: "YouTube", icon: "youtube", href: "https://youtube.com" }, { label: "TikTok", icon: "tiktok", href: "https://tiktok.com" }, { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" }],
    copyright: "漏 {year} SINOTRUK. All rights reserved.",
    email: "info@sinotruk.com",
    hours: "Mon - Sat: 8:00 AM - 6:00 PM (CST)",
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function mergeObject<T extends Record<string, unknown>>(fallback: T, value: unknown): T {
  if (!isObject(value)) return fallback;
  const output: Record<string, unknown> = { ...fallback };
  for (const [key, nextValue] of Object.entries(value)) {
    const oldValue = fallback[key];
    if (Array.isArray(oldValue)) output[key] = Array.isArray(nextValue) ? nextValue : oldValue;
    else if (isObject(oldValue)) output[key] = mergeObject(oldValue, nextValue);
    else output[key] = nextValue ?? oldValue;
  }
  return output as T;
}

export function normalizeHomeContent(value: unknown): HomeContent {
  return mergeObject(defaultHomeContent as unknown as Record<string, unknown>, value) as unknown as HomeContent;
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: HOME_CONTENT_KEY } });
    return normalizeHomeContent(setting?.value);
  } catch {
    return defaultHomeContent;
  }
}
