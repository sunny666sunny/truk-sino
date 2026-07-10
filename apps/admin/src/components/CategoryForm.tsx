import { Button, Checkbox, Form, Input, InputNumber, Space } from "antd";
import type { Category } from "../lib/types";

type Props = {
  initial?: Partial<Category>;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: Partial<Category>) => void;
};

export function CategoryForm({ initial, loading, onCancel, onSubmit }: Props) {
  return (
    <Form layout="vertical" initialValues={initial ?? { active: true, order: 0 }} onFinish={onSubmit}>
      <Form.Item name="name" label="分类名称" rules={[{ required: true, message: "请输入分类名称" }]}><Input /></Form.Item>
      <Form.Item name="slug" label="URL 别名"><Input placeholder="heavy-truck" /></Form.Item>
      <Form.Item name="icon" label="图标标识"><Input placeholder="Truck" /></Form.Item>
      <Form.Item name="order" label="排序值"><InputNumber style={{ width: "100%" }} /></Form.Item>
      <Form.Item name="active" valuePropName="checked"><Checkbox>启用分类</Checkbox></Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
        <Button onClick={onCancel}>取消</Button>
      </Space>
    </Form>
  );
}