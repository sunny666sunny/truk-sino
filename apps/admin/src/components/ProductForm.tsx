import { Button, Form, Input, InputNumber, message, Select, Space } from "antd";
import { ImageUploadField } from "./ImageUploadField";
import { suggestSeo } from "../lib/api";
import type { Category, Product } from "../lib/types";

type Props = {
  categories: Category[];
  initial?: Partial<Product>;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: Partial<Product>) => void;
};

const statusOptions = [
  { value: "active", label: "已上架" },
  { value: "draft", label: "草稿" },
  { value: "upcoming", label: "即将发布" },
];

function toText(value: unknown) {
  if (value === undefined || value === null) return undefined;
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

export function ProductForm({ categories, initial, loading, onCancel, onSubmit }: Props) {
  const [form] = Form.useForm();
  const values = initial
    ? {
        ...initial,
        gallery: toText(initial.gallery),
        content: toText(initial.content),
        specifications: toText(initial.specifications),
        features: toText(initial.features),
      }
    : { status: "active", sortOrder: 0 };

  const applySeo = async () => {
    const current = form.getFieldsValue();
    const suggestion = await suggestSeo({ ...current, type: "product" });
    form.setFieldsValue({
      seoTitle: suggestion.seoTitle,
      seoDescription: suggestion.seoDescription,
      gallery: current.heroImage && !current.gallery ? JSON.stringify([{ src: current.heroImage, alt: suggestion.imageAlt }], null, 2) : current.gallery,
    });
    message.success("已生成 SEO 建议");
  };

  return (
    <Form form={form} layout="vertical" initialValues={values} onFinish={onSubmit}>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={applySeo}>AI 优化 SEO</Button>
      </Space>
      <Form.Item name="name" label="产品名称" rules={[{ required: true, message: "请输入产品名称" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="slug" label="URL 别名">
        <Input placeholder="留空会自动生成，建议使用英文短横线" />
      </Form.Item>
      <Form.Item name="categoryId" label="产品分类" rules={[{ required: true, message: "请选择产品分类" }]}>
        <Select options={categories.map((item) => ({ value: item.id, label: item.name }))} />
      </Form.Item>
      <Form.Item name="subCategory" label="子分类"><Input /></Form.Item>
      <Form.Item name="status" label="状态"><Select options={statusOptions} /></Form.Item>
      <Form.Item name="heroImage" label="主图"><ImageUploadField /></Form.Item>
      <Form.Item name="excerpt" label="简介"><Input.TextArea rows={3} /></Form.Item>
      <Form.Item name="content" label="详情正文"><Input.TextArea rows={6} placeholder="支持 HTML 或普通文字" /></Form.Item>
      <Form.Item name="specifications" label="规格参数 JSON"><Input.TextArea rows={5} placeholder='[{"label":"Engine","value":"400 HP"}]' /></Form.Item>
      <Form.Item name="features" label="产品亮点 JSON"><Input.TextArea rows={5} placeholder='[{"title":"Reliable","description":"Built for heavy duty work."}]' /></Form.Item>
      <Form.Item name="gallery" label="图库 JSON"><Input.TextArea rows={4} placeholder='[{"src":"/uploads/admin/example.webp","alt":"Product view"}]' /></Form.Item>
      <Form.Item name="brochure" label="资料链接"><Input placeholder="PDF 或资料 URL" /></Form.Item>
      <Form.Item name="seoTitle" label="SEO 标题"><Input maxLength={70} showCount /></Form.Item>
      <Form.Item name="seoDescription" label="SEO 描述"><Input.TextArea rows={3} maxLength={160} showCount /></Form.Item>
      <Form.Item name="sortOrder" label="排序值"><InputNumber style={{ width: "100%" }} /></Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
        <Button onClick={onCancel}>取消</Button>
      </Space>
    </Form>
  );
}