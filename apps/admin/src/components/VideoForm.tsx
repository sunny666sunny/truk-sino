import { Button, Form, Input, InputNumber, message, Space } from "antd";
import { ImageUploadField } from "./ImageUploadField";
import { suggestSeo } from "../lib/api";
import type { Video } from "../lib/types";

type Props = {
  initial?: Partial<Video>;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: Partial<Video>) => void;
};

export function VideoForm({ initial, loading, onCancel, onSubmit }: Props) {
  const [form] = Form.useForm();
  const applySeo = async () => {
    const current = form.getFieldsValue();
    const suggestion = await suggestSeo({ ...current, type: "video" });
    form.setFieldsValue({ seoTitle: suggestion.seoTitle, seoDescription: suggestion.seoDescription });
    message.success("已生成 SEO 建议");
  };

  return (
    <Form form={form} layout="vertical" initialValues={initial ?? { sortOrder: 0 }} onFinish={onSubmit}>
      <Space style={{ marginBottom: 12 }}><Button onClick={applySeo}>AI 优化 SEO</Button></Space>
      <Form.Item name="title" label="视频标题" rules={[{ required: true, message: "请输入视频标题" }]}><Input /></Form.Item>
      <Form.Item name="slug" label="URL 别名"><Input placeholder="brand-film" /></Form.Item>
      <Form.Item name="thumbnail" label="封面图"><ImageUploadField /></Form.Item>
      <Form.Item name="videoUrl" label="视频地址"><Input placeholder="YouTube/Vimeo embed URL 或 MP4 地址" /></Form.Item>
      <Form.Item name="duration" label="时长"><Input placeholder="5:30" /></Form.Item>
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