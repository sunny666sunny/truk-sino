import { Button, Form, Image, Input, message, Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiFetch, type ApiList } from "../lib/api";
import type { MediaItem } from "../lib/types";

export function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const data = await apiFetch<ApiList<MediaItem>>(`/api/admin/media?q=${encodeURIComponent(q)}`);
    setItems(data.items);
  };

  useEffect(() => {
    void apiFetch<ApiList<MediaItem>>("/api/admin/media").then((data) => setItems(data.items));
  }, []);

  const openEdit = (item: MediaItem) => {
    setEditing(item);
    form.setFieldsValue(item);
  };

  const save = async () => {
    if (!editing) return;
    setLoading(true);
    try {
      const values = await form.validateFields();
      await apiFetch<MediaItem>(`/api/admin/media/${editing.id}`, { method: "PUT", body: JSON.stringify(values) });
      message.success("保存成功");
      setEditing(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>媒体库</Typography.Title>
        <Typography.Text type="secondary">上传图片会自动进入这里，建议补齐 alt 文本</Typography.Text>
      </Space>
      <Space style={{ marginBottom: 16 }}><Input.Search placeholder="搜索图片、alt、说明" value={q} onChange={(e) => setQ(e.target.value)} onSearch={load} allowClear /></Space>
      <Table rowKey="id" dataSource={items} pagination={{ pageSize: 12 }} columns={[
        { title: "图片", dataIndex: "url", render: (value, row) => <Image src={String(value)} alt={row.alt || row.name} width={120} height={72} style={{ objectFit: "cover" }} /> },
        { title: "文件名", dataIndex: "name" },
        { title: "Alt 文本", dataIndex: "alt", render: (value) => value || <Typography.Text type="danger">未设置</Typography.Text> },
        { title: "说明", dataIndex: "caption", render: (value) => value || "-" },
        { title: "操作", render: (_, row) => <Button onClick={() => openEdit(row)}>编辑 SEO</Button> },
      ]} />
      <Modal title="编辑图片 SEO" open={Boolean(editing)} onCancel={() => setEditing(null)} onOk={save} confirmLoading={loading} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="文件名" rules={[{ required: true, message: "请输入文件名" }]}><Input /></Form.Item>
          <Form.Item name="alt" label="Alt 文本" rules={[{ required: true, message: "请输入图片 alt 文本" }]}><Input maxLength={120} showCount /></Form.Item>
          <Form.Item name="caption" label="图片说明"><Input.TextArea rows={3} maxLength={180} showCount /></Form.Item>
        </Form>
      </Modal>
    </>
  );
}