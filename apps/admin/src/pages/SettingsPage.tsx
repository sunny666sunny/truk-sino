import { Button, Card, Form, Input, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

type Settings = Record<string, string>;

const fields = [
  ["contact_email", "销售邮箱"],
  ["contact_phone", "销售电话"],
  ["whatsapp", "WhatsApp"],
  ["company_address", "公司地址"],
];

export function SettingsPage() {
  const [form] = Form.useForm<Settings>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch<Record<string, unknown>>("/api/admin/settings").then((data) => {
      const values: Settings = {};
      for (const [key] of fields) values[key] = typeof data[key] === "string" ? data[key] : "";
      form.setFieldsValue(values);
    });
  }, [form]);

  const save = async (values: Settings) => {
    setLoading(true);
    try {
      await apiFetch("/api/admin/settings", { method: "PUT", body: JSON.stringify(values) });
      message.success("保存成功");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography.Title level={2} style={{ marginTop: 0 }}>网站设置</Typography.Title>
      <Card style={{ maxWidth: 720 }}>
        <Form form={form} layout="vertical" onFinish={save}>
          {fields.map(([name, label]) => (
            <Form.Item key={name} name={name} label={label}>
              <Input />
            </Form.Item>
          ))}
          <Button type="primary" htmlType="submit" loading={loading}>保存设置</Button>
        </Form>
      </Card>
    </>
  );
}
