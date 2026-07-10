import { Button, Card, Collapse, Form, Input, InputNumber, message, Select, Space, Typography } from "antd";
import type { NamePath } from "antd/es/form/interface";
import { useEffect, useState } from "react";
import { ImageUploadField } from "../../components/ImageUploadField";
import { apiFetch } from "../../lib/api";

const DEFAULT_HOME_CONTENT = {
  logo: { src: "/images/logo-sinotruk.png", alt: "SINOTRUK logo", width: 140, height: 56 },
  seo: {
    title: "SINOTRUK International | China's Leading Heavy Truck Manufacturer & Exporter",
    description: "SINOTRUK International manufactures and exports heavy-duty trucks, light trucks, special vehicles, semi-trailers and new energy vehicles to 90+ countries. Request a quote today.",
    ogImage: "/images/hero-banner-1.png",
  },
  header: {
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Parts", href: "/parts" },
      { label: "News", href: "/news" },
      { label: "Video", href: "/video" },
      { label: "Service", href: "/service" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  hero: {
    eyebrow: "Established 1993 - Jinan, China",
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
  products: { tag: "Our Product Range", title: "Vehicles Engineered for Every Mission", description: "Explore our complete lineup of commercial vehicles built for global markets." },
  stats: { items: [{ icon: "Globe", value: 90, suffix: "+", label: "Export Countries" }] },
  why: { tag: "Why SINOTRUK", title: "Engineering Advantages That Deliver Results", description: "Six core pillars that set SINOTRUK vehicles apart.", items: [{ icon: "Cog", title: "Advanced Powertrain", description: "In-house engines from 240 to 540 HP." }] },
  industries: { tag: "Industry Solutions", title: "Purpose-Built for Your Industry", description: "Whatever your sector demands, SINOTRUK engineers vehicles to match.", items: [{ icon: "Construction", title: "Construction", description: "Dump trucks and mixers for building infrastructure" }] },
  parts: { tag: "Genuine Parts", title: "Your Source for OEM Truck Parts", description: "Genuine SINOTRUK parts shipped worldwide.", items: [{ icon: "Car", title: "Cabin & Body", description: "Cabin, body and exterior parts" }] },
  news: { tag: "News & Events", title: "Latest from SINOTRUK", description: "Stay up to date with product launches, dealer events, and industry insights." },
  video: { tag: "Video Gallery", title: "See SINOTRUK in Action", description: "Watch our trucks perform in real-world conditions." },
  service: {
    tag: "After-Sales Support",
    title: "Service That Keeps You Moving",
    description: "From preventive maintenance to emergency repairs, our global service network keeps your fleet on the road.",
    items: [
      { slug: "after-sales-service", icon: "Wrench", title: "After-Sales Service", description: "Scheduled maintenance and support through authorized service stations.", image: "/images/factory-workshop.png" },
      { slug: "service-broadcast", icon: "Radio", title: "Service Broadcast", description: "Technical repair demonstrations and diagnostic walkthroughs.", image: "/images/hero-banner-2.png" },
      { slug: "maintenance-manual", icon: "BookOpen", title: "Maintenance Manual", description: "Operator manuals, service intervals, and troubleshooting guides.", image: "/images/product-tractor-truck.png" },
    ],
  },
  cta: { title: "Ready to Find Your Perfect Truck?", description: "Get a personalized quote from our sales team or browse our complete product catalog.", primaryCta: "Request a Quote", primaryHref: "#contact", secondaryCta: "Browse Products", secondaryHref: "#products" },
  contact: {
    tag: "Get in Touch",
    title: "Let's Talk About Your Fleet Needs",
    description: "Whether you need a single truck or a fleet of 500, our sales engineers are ready.",
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
    brandText: "SINOTRUK is a leading manufacturer and exporter of heavy-duty commercial vehicles.",
    columns: [{ title: "About Us", links: [{ label: "Who We Are", href: "/about/who-we-are" }] }],
    socialLinks: [
      { label: "Facebook", icon: "facebook", href: "https://facebook.com" },
      { label: "YouTube", icon: "youtube", href: "https://youtube.com" },
      { label: "TikTok", icon: "tiktok", href: "https://tiktok.com" },
      { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
    ],
    copyright: "© {year} SINOTRUK. All rights reserved.",
    email: "info@sinotruk.com",
    hours: "Mon - Sat: 8:00 AM - 6:00 PM (CST)",
  },
};

type SettingsResponse = { home_content?: typeof DEFAULT_HOME_CONTENT };

const SOCIAL_ICON_OPTIONS = [
  { label: "Facebook", value: "facebook" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Instagram", value: "instagram" },
  { label: "X", value: "x" },
  { label: "WhatsApp", value: "whatsapp" },
];

function TextArea({ rows = 3, placeholder }: { rows?: number; placeholder?: string }) {
  return <Input.TextArea rows={rows} placeholder={placeholder} />;
}

function ImageField({ name, label, altName, hint }: { name: NamePath; label: string; altName?: NamePath; hint?: string }) {
  return (
    <>
      <Form.Item name={name} label={hint ? `${label} (${hint})` : label}>
        <ImageUploadField />
      </Form.Item>
      {altName ? (
        <Form.Item name={altName} label="Image alt text">
          <Input maxLength={120} showCount />
        </Form.Item>
      ) : null}
    </>
  );
}

function SectionText({ name, titleLabel }: { name: string; titleLabel: string }) {
  return (
    <>
      <Form.Item name={[name, "tag"]} label="Section tag"><Input /></Form.Item>
      <Form.Item name={[name, "title"]} label={titleLabel}><Input /></Form.Item>
      <Form.Item name={[name, "description"]} label="Description"><TextArea /></Form.Item>
    </>
  );
}

function LinkList({ name, title }: { name: NamePath; title: string }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <Space direction="vertical" style={{ width: "100%" }}>
          {fields.map((field, index) => (
            <Space key={field.key} align="start" wrap>
              <Form.Item name={[field.name, "label"]} label={`${title} text ${index + 1}`}><Input /></Form.Item>
              <Form.Item name={[field.name, "href"]} label="Link"><Input /></Form.Item>
              <Button danger onClick={() => remove(field.name)}>Delete</Button>
            </Space>
          ))}
          <Button onClick={() => add({ label: "", href: "" })}>Add link</Button>
        </Space>
      )}
    </Form.List>
  );
}

function SocialLinkList({ name }: { name: NamePath }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <Space direction="vertical" style={{ width: "100%" }}>
          {fields.map((field, index) => (
            <Card key={field.key} size="small" title={`Social ${index + 1}`} extra={<Button danger onClick={() => remove(field.name)}>Delete</Button>}>
              <Space align="start" wrap>
                <Form.Item name={[field.name, "icon"]} label="Icon" rules={[{ required: true, message: "Please select an icon" }]}>
                  <Select style={{ width: 160 }} options={SOCIAL_ICON_OPTIONS} placeholder="Select icon" />
                </Form.Item>
                <Form.Item name={[field.name, "label"]} label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
                  <Input placeholder="Facebook" />
                </Form.Item>
                <Form.Item name={[field.name, "href"]} label="Link" rules={[{ required: true, message: "Please enter a link" }]}>
                  <Input placeholder="https://facebook.com/your-page" style={{ width: 320 }} />
                </Form.Item>
              </Space>
            </Card>
          ))}
          <Button onClick={() => add({ label: "Facebook", icon: "facebook", href: "https://facebook.com" })}>Add social link</Button>
        </Space>
      )}
    </Form.List>
  );
}

function ItemList({ name, title, withImage = true }: { name: string; title: string; withImage?: boolean }) {
  return (
    <Form.List name={[name, "items"]}>
      {(fields, { add, remove }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={16}>
          {fields.map((field, index) => (
            <Card key={field.key} size="small" title={`${title} ${index + 1}`} extra={<Button danger onClick={() => remove(field.name)}>Delete</Button>}>
              <Form.Item name={[field.name, "title"]} label="Title"><Input /></Form.Item>
              <Form.Item name={[field.name, "description"]} label="Description"><TextArea /></Form.Item>
              <Form.Item name={[field.name, "icon"]} label="Icon key"><Input placeholder="Cog / Truck / Globe / Construction" /></Form.Item>
              {withImage ? (
                <>
                  <Form.Item name={[field.name, "image"]} label="Image"><ImageUploadField /></Form.Item>
                  <Form.Item name={[field.name, "imageAlt"]} label="Image alt text"><Input maxLength={120} showCount /></Form.Item>
                </>
              ) : null}
            </Card>
          ))}
          <Button onClick={() => add({ icon: "Cog", title: "", description: "" })}>Add item</Button>
        </Space>
      )}
    </Form.List>
  );
}

export function FrontendHomePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void apiFetch<SettingsResponse>("/api/admin/settings").then((data) => {
      form.setFieldsValue(data.home_content ?? DEFAULT_HOME_CONTENT);
    });
  }, [form]);

  const save = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await apiFetch("/api/admin/settings", { method: "PUT", body: JSON.stringify({ home_content: values }) });
      message.success("Homepage content saved");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <Typography.Title level={2} style={{ margin: 0 }}>Homepage Editor</Typography.Title>
          <Typography.Text type="secondary">Edit homepage copy, images, footer links, and social icons.</Typography.Text>
        </div>
        <Button type="primary" loading={loading} onClick={save}>Save homepage</Button>
      </Space>

      <Form form={form} layout="vertical" initialValues={DEFAULT_HOME_CONTENT}>
        <Collapse defaultActiveKey={["header", "hero", "footer"]} items={[
          { key: "header", label: "Header: logo and navigation", children: <><ImageField name={["logo", "src"]} label="Header logo" altName={["logo", "alt"]} hint="Transparent PNG/SVG recommended" /><Space><Form.Item name={["logo", "width"]} label="Width"><InputNumber min={60} max={320} /></Form.Item><Form.Item name={["logo", "height"]} label="Height"><InputNumber min={24} max={160} /></Form.Item></Space><LinkList name={["header", "navLinks"]} title="Nav" /></> },
          { key: "seo", label: "Homepage SEO", children: <><Form.Item name={["seo", "title"]} label="SEO title"><Input maxLength={70} showCount /></Form.Item><Form.Item name={["seo", "description"]} label="SEO description"><TextArea rows={3} /></Form.Item><ImageField name={["seo", "ogImage"]} label="OG image" hint="1200x630 recommended" /></> },
          { key: "hero", label: "Hero", children: <><Form.Item name={["hero", "eyebrow"]} label="Eyebrow"><Input /></Form.Item><Form.Item name={["hero", "title"]} label="H1"><Input /></Form.Item><Form.Item name={["hero", "description"]} label="Description"><TextArea /></Form.Item><Space wrap><Form.Item name={["hero", "primaryCta"]} label="Primary button"><Input /></Form.Item><Form.Item name={["hero", "primaryHref"]} label="Primary link"><Input /></Form.Item><Form.Item name={["hero", "secondaryCta"]} label="Secondary button"><Input /></Form.Item><Form.Item name={["hero", "secondaryHref"]} label="Secondary link"><Input /></Form.Item></Space><Form.List name={["hero", "slides"]}>{(fields, { add, remove }) => <Space direction="vertical" style={{ width: "100%" }}>{fields.map((field, index) => <Card key={field.key} size="small" title={`Slide ${index + 1}`} extra={<Button danger onClick={() => remove(field.name)}>Delete</Button>}><ImageField name={[field.name, "src"]} label="Slide image" altName={[field.name, "alt"]} hint="1920x1080 recommended" /></Card>)}<Button onClick={() => add({ src: "", alt: "" })}>Add slide</Button></Space>}</Form.List></> },
          { key: "products", label: "Products section", children: <SectionText name="products" titleLabel="Products H2" /> },
          { key: "stats", label: "Stats section", children: <ItemList name="stats" title="Stat card" withImage={false} /> },
          { key: "why", label: "Why SINOTRUK", children: <><SectionText name="why" titleLabel="Why H2" /><ItemList name="why" title="Why item" /></> },
          { key: "industries", label: "Industry Solutions", children: <><SectionText name="industries" titleLabel="Industry H2" /><ItemList name="industries" title="Industry item" /></> },
          { key: "parts", label: "Genuine Parts", children: <><SectionText name="parts" titleLabel="Parts H2" /><ItemList name="parts" title="Parts item" withImage={false} /></> },
          { key: "news", label: "News section", children: <SectionText name="news" titleLabel="News H2" /> },
          { key: "video", label: "Video section", children: <SectionText name="video" titleLabel="Video H2" /> },
          { key: "service", label: "Service section", children: <><SectionText name="service" titleLabel="Service H2" /><ItemList name="service" title="Service item" /></> },
          { key: "cta", label: "CTA section", children: <><Form.Item name={["cta", "title"]} label="CTA title"><Input /></Form.Item><Form.Item name={["cta", "description"]} label="CTA description"><TextArea /></Form.Item><Space wrap><Form.Item name={["cta", "primaryCta"]} label="Primary button"><Input /></Form.Item><Form.Item name={["cta", "primaryHref"]} label="Primary link"><Input /></Form.Item><Form.Item name={["cta", "secondaryCta"]} label="Secondary button"><Input /></Form.Item><Form.Item name={["cta", "secondaryHref"]} label="Secondary link"><Input /></Form.Item></Space></> },
          { key: "contact", label: "Contact section", children: <><SectionText name="contact" titleLabel="Contact H2" /><Form.Item name={["contact", "formTitle"]} label="Form title"><Input /></Form.Item><Form.Item name={["contact", "formDescription"]} label="Form description"><TextArea /></Form.Item><Form.Item name={["contact", "headquartersTitle"]} label="Headquarters title"><Input /></Form.Item><Form.Item name={["contact", "officeLabel"]} label="Office label"><Input /></Form.Item><Form.Item name={["contact", "address"]} label="Address"><TextArea /></Form.Item><Form.Item name={["contact", "emailLabel"]} label="Email label"><Input /></Form.Item><Form.Item name={["contact", "emails"]} label="Email list"><TextArea /></Form.Item><Form.Item name={["contact", "hoursLabel"]} label="Hours label"><Input /></Form.Item><Form.Item name={["contact", "hours"]} label="Hours"><Input /></Form.Item><Form.Item name={["contact", "regionalTitle"]} label="Regional offices title"><Input /></Form.Item></> },
          { key: "footer", label: "Footer: logo, columns, social icons", children: <><ImageField name={["footer", "logo", "src"]} label="Footer logo" altName={["footer", "logo", "alt"]} hint="Transparent PNG/SVG recommended; rendered in site orange" /><Space><Form.Item name={["footer", "logo", "width"]} label="Width"><InputNumber min={24} max={160} /></Form.Item><Form.Item name={["footer", "logo", "height"]} label="Height"><InputNumber min={24} max={160} /></Form.Item></Space><Form.Item name={["footer", "brandText"]} label="Brand intro"><TextArea /></Form.Item><Form.List name={["footer", "columns"]}>{(fields, { add, remove }) => <Space direction="vertical" style={{ width: "100%" }}>{fields.map((field, index) => <Card key={field.key} size="small" title={`Footer column ${index + 1}`} extra={<Button danger onClick={() => remove(field.name)}>Delete</Button>}><Form.Item name={[field.name, "title"]} label="Column title"><Input /></Form.Item><LinkList name={[field.name, "links"]} title="Column link" /></Card>)}<Button onClick={() => add({ title: "", links: [] })}>Add column</Button></Space>}</Form.List><Typography.Title level={5}>Social links</Typography.Title><SocialLinkList name={["footer", "socialLinks"]} /><Form.Item name={["footer", "copyright"]} label="Copyright text (use {year})"><Input /></Form.Item><Form.Item name={["footer", "email"]} label="Footer email"><Input /></Form.Item><Form.Item name={["footer", "hours"]} label="Footer hours"><Input /></Form.Item></> },
        ]} />
      </Form>
    </>
  );
}
