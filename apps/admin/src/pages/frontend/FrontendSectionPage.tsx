import { Button, Card, Form, Input, InputNumber, message, Space, Typography } from "antd";
import type { NamePath } from "antd/es/form/interface";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ImageUploadField } from "../../components/ImageUploadField";
import { apiFetch } from "../../lib/api";

const DEFAULT_HOME_CONTENT: Record<string, any> = {
  products: { tag: "Our Product Range", title: "Vehicles Engineered for Every Mission", description: "Explore our complete lineup of commercial vehicles built for global markets." },
  stats: { items: [{ icon: "Globe", value: 90, suffix: "+", label: "Export Countries" }] },
  why: { tag: "Why SINOTRUK", title: "Engineering Advantages That Deliver Results", description: "Core pillars that set SINOTRUK vehicles apart.", items: [{ icon: "Cog", title: "Advanced Powertrain", description: "In-house engines and proven drivetrains for demanding work." }] },
  industries: { tag: "Industry Solutions", title: "Purpose-Built for Your Industry", description: "Vehicles engineered for construction, logistics, mining, and clean-city applications.", items: [{ icon: "Construction", title: "Construction", description: "Dump trucks and mixers for infrastructure projects." }] },
  parts: { tag: "Genuine Parts", title: "Your Source for OEM Truck Parts", description: "Genuine SINOTRUK parts shipped worldwide.", items: [{ icon: "Car", title: "Cabin & Body", description: "Cabin, body and exterior parts." }] },
  news: { tag: "News & Events", title: "Latest from SINOTRUK", description: "Stay up to date with product launches, dealer events, and industry insights." },
  service: { tag: "After-Sales Support", title: "Service That Keeps You Moving", description: "From preventive maintenance to emergency repairs, our global service network keeps your fleet on the road.", items: [{ slug: "after-sales-service", icon: "Wrench", title: "After-Sales Service", description: "Scheduled maintenance and support through authorized service stations.", image: "/images/factory-workshop.png" }] },
  contact: { tag: "Get in Touch", title: "Let's Talk About Your Fleet Needs", description: "Our sales engineers are ready to design the right solution.", formTitle: "Send Us an Inquiry", formDescription: "Fill out the form and our sales team will respond within 24 hours.", headquartersTitle: "Headquarters", officeLabel: "Main Office", address: "No. 777, Jing Shi Road, Jinan, Shandong Province, China", emailLabel: "Email", emails: "info@sinotruk.com\nsales@sinotruk.com", hoursLabel: "Business Hours", hours: "Monday - Saturday, 8:00 AM - 5:30 PM (CST)", regionalTitle: "Regional Offices" },
};

type SettingsResponse = { home_content?: Record<string, any> };
type SectionKey = "about" | "products" | "parts" | "news" | "service" | "contact";

const sectionMeta: Record<SectionKey, { title: string; desc: string; manageHref?: string; manageLabel?: string }> = {
  about: { title: "关于我们编辑", desc: "编辑首页关于/优势/行业解决方案相关内容。" },
  products: { title: "产品栏目编辑", desc: "编辑首页产品区块文案；具体产品资料请进入产品管理。", manageHref: "/products", manageLabel: "打开产品管理" },
  parts: { title: "配件栏目编辑", desc: "编辑首页配件区块和配件分类卡片。" },
  news: { title: "新闻栏目编辑", desc: "编辑首页新闻区块文案；具体新闻文章请进入新闻管理。", manageHref: "/news", manageLabel: "打开新闻管理" },
  service: { title: "服务栏目编辑", desc: "编辑首页服务区块和服务卡片。" },
  contact: { title: "联系我们编辑", desc: "编辑首页和联系页使用的联系信息。" },
};

function TextArea({ rows = 3 }: { rows?: number }) {
  return <Input.TextArea rows={rows} />;
}

function SectionText({ name, titleLabel = "标题" }: { name: string; titleLabel?: string }) {
  return (
    <>
      <Form.Item name={[name, "tag"]} label="小标签"><Input /></Form.Item>
      <Form.Item name={[name, "title"]} label={titleLabel}><Input /></Form.Item>
      <Form.Item name={[name, "description"]} label="描述"><TextArea /></Form.Item>
    </>
  );
}

function ItemList({ name, title, withImage = false, withSlug = false, numericValue = false }: { name: NamePath; title: string; withImage?: boolean; withSlug?: boolean; numericValue?: boolean }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={16}>
          {fields.map((field, index) => (
            <Card key={field.key} size="small" title={`${title} ${index + 1}`} extra={<Button danger onClick={() => remove(field.name)}>删除</Button>}>
              {withSlug ? <Form.Item name={[field.name, "slug"]} label="链接 slug"><Input placeholder="after-sales-service" /></Form.Item> : null}
              {numericValue ? (
                <Space wrap>
                  <Form.Item name={[field.name, "value"]} label="数字"><InputNumber /></Form.Item>
                  <Form.Item name={[field.name, "suffix"]} label="后缀"><Input /></Form.Item>
                  <Form.Item name={[field.name, "label"]} label="说明"><Input /></Form.Item>
                  <Form.Item name={[field.name, "icon"]} label="图标键"><Input /></Form.Item>
                </Space>
              ) : (
                <>
                  <Form.Item name={[field.name, "title"]} label="标题"><Input /></Form.Item>
                  <Form.Item name={[field.name, "description"]} label="描述"><TextArea /></Form.Item>
                  <Form.Item name={[field.name, "icon"]} label="图标键"><Input placeholder="Cog / Car / Wrench" /></Form.Item>
                </>
              )}
              {withImage ? (
                <>
                  <Form.Item name={[field.name, "image"]} label="图片"><ImageUploadField /></Form.Item>
                  <Form.Item name={[field.name, "imageAlt"]} label="图片说明"><Input maxLength={120} showCount /></Form.Item>
                </>
              ) : null}
            </Card>
          ))}
          <Button onClick={() => add(withSlug ? { slug: "", icon: "Wrench", title: "", description: "", image: "" } : numericValue ? { icon: "Globe", value: 0, suffix: "+", label: "" } : { icon: "Cog", title: "", description: "" })}>新增</Button>
        </Space>
      )}
    </Form.List>
  );
}

function setByPath(target: Record<string, any>, path: string[], value: unknown) {
  let cursor = target;
  for (let i = 0; i < path.length - 1; i += 1) {
    cursor[path[i]] = cursor[path[i]] && typeof cursor[path[i]] === "object" ? cursor[path[i]] : {};
    cursor = cursor[path[i]];
  }
  cursor[path[path.length - 1]] = value;
}

function renderFields(section: SectionKey) {
  if (section === "about") {
    return <><Typography.Title level={4}>数据数字</Typography.Title><ItemList name={["stats", "items"]} title="数字" numericValue /><Typography.Title level={4}>优势内容</Typography.Title><SectionText name="why" /><ItemList name={["why", "items"]} title="优势" withImage /><Typography.Title level={4}>行业方案</Typography.Title><SectionText name="industries" /><ItemList name={["industries", "items"]} title="行业" withImage /></>;
  }
  if (section === "products") return <SectionText name="products" titleLabel="产品区块标题" />;
  if (section === "parts") return <><SectionText name="parts" titleLabel="配件区块标题" /><ItemList name={["parts", "items"]} title="配件分类" /></>;
  if (section === "news") return <SectionText name="news" titleLabel="新闻区块标题" />;
  if (section === "service") return <><SectionText name="service" titleLabel="服务区块标题" /><ItemList name={["service", "items"]} title="服务卡片" withImage withSlug /></>;
  return <><SectionText name="contact" titleLabel="联系区块标题" /><Form.Item name={["contact", "formTitle"]} label="表单标题"><Input /></Form.Item><Form.Item name={["contact", "formDescription"]} label="表单说明"><TextArea /></Form.Item><Form.Item name={["contact", "headquartersTitle"]} label="总部标题"><Input /></Form.Item><Form.Item name={["contact", "officeLabel"]} label="办公室标签"><Input /></Form.Item><Form.Item name={["contact", "address"]} label="地址"><TextArea /></Form.Item><Form.Item name={["contact", "emailLabel"]} label="邮箱标签"><Input /></Form.Item><Form.Item name={["contact", "emails"]} label="邮箱列表"><TextArea /></Form.Item><Form.Item name={["contact", "hoursLabel"]} label="营业时间标签"><Input /></Form.Item><Form.Item name={["contact", "hours"]} label="营业时间"><Input /></Form.Item><Form.Item name={["contact", "regionalTitle"]} label="区域办公室标题"><Input /></Form.Item></>;
}

export function FrontendSectionPage({ section }: { section: SectionKey }) {
  const [form] = Form.useForm();
  const [content, setContent] = useState<Record<string, any>>(DEFAULT_HOME_CONTENT);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const meta = sectionMeta[section];

  useEffect(() => {
    void apiFetch<SettingsResponse>("/api/admin/settings").then((data) => {
      const next = { ...DEFAULT_HOME_CONTENT, ...(data.home_content ?? {}) };
      setContent(next);
      form.setFieldsValue(next);
    });
  }, [form]);

  const save = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const next = { ...content };
      Object.entries(values).forEach(([key, value]) => setByPath(next, [key], value));
      await apiFetch("/api/admin/settings", { method: "PUT", body: JSON.stringify({ home_content: next }) });
      setContent(next);
      message.success("已保存");
    } finally {
      setLoading(false);
    }
  };

  const extra = useMemo(() => meta.manageHref ? <Button onClick={() => navigate(meta.manageHref!)}>{meta.manageLabel}</Button> : null, [meta.manageHref, meta.manageLabel, navigate]);

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div><Typography.Title level={2} style={{ margin: 0 }}>{meta.title}</Typography.Title><Typography.Text type="secondary">{meta.desc}</Typography.Text></div>
        <Space>{extra}<Link to="/frontend/home"><Button>首页总编辑</Button></Link><Button type="primary" loading={loading} onClick={save}>保存</Button></Space>
      </Space>
      <Card>
        <Form form={form} layout="vertical" initialValues={DEFAULT_HOME_CONTENT}>{renderFields(section)}</Form>
      </Card>
    </>
  );
}