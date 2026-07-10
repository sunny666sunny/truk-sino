import { Button, DatePicker, Form, Input, message, Select, Space } from "antd";
import dayjs from "dayjs";
import { ImageUploadField } from "./ImageUploadField";
import { suggestSeo } from "../lib/api";
import type { Article } from "../lib/types";

type Props = {
  initial?: Partial<Article>;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: Record<string, unknown>) => void;
};

const statusOptions = [
  { value: "draft", label: "草稿" },
  { value: "published", label: "已发布" },
];

function toText(value: unknown) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value.join(", ");
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

export function ArticleForm({ initial, loading, onCancel, onSubmit }: Props) {
  const [form] = Form.useForm();
  const values = initial
    ? {
        ...initial,
        publishDate: initial.publishDate ? dayjs(initial.publishDate) : undefined,
        content: toText(initial.content),
        tags: toText(initial.tags),
        faqs: toText(initial.faqs),
      }
    : { status: "draft" };

  const applySeo = async () => {
    const current = form.getFieldsValue();
    const suggestion = await suggestSeo({ ...current, type: "article" });
    form.setFieldsValue({
      seoTitle: suggestion.seoTitle,
      seoDescription: suggestion.seoDescription,
      tags: current.tags || suggestion.tags.join(", "),
    });
    message.success("已生成 SEO 建议");
  };

  return (
    <Form form={form} layout="vertical" initialValues={values} onFinish={onSubmit}>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={applySeo}>AI 优化 SEO</Button>
      </Space>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]}><Input /></Form.Item>
      <Form.Item name="slug" label="URL 别名"><Input placeholder="留空会自动生成，建议使用英文短横线" /></Form.Item>
      <Form.Item name="status" label="状态"><Select options={statusOptions} /></Form.Item>
      <Form.Item name="author" label="作者"><Input /></Form.Item>
      <Form.Item name="publishDate" label="发布日期"><DatePicker style={{ width: "100%" }} /></Form.Item>
      <Form.Item name="featuredImage" label="封面图"><ImageUploadField /></Form.Item>
      <Form.Item name="excerpt" label="摘要"><Input.TextArea rows={4} /></Form.Item>
      <Form.Item name="content" label="正文内容"><Input.TextArea rows={8} placeholder="支持 HTML 或普通文字" /></Form.Item>
      <Form.Item name="tags" label="标签"><Input placeholder="用英文逗号分隔，例如 Trucks, Export, Service" /></Form.Item>
      <Form.Item name="faqs" label="FAQ JSON"><Input.TextArea rows={4} placeholder='[{"question":"...","answer":"..."}]' /></Form.Item>
      <Form.Item name="seoTitle" label="SEO 标题"><Input maxLength={70} showCount /></Form.Item>
      <Form.Item name="seoDescription" label="SEO 描述"><Input.TextArea rows={3} maxLength={160} showCount /></Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
        <Button onClick={onCancel}>取消</Button>
      </Space>
    </Form>
  );
}