import { Button, Drawer, Input, message, Space, Switch, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { CategoryForm } from "../components/CategoryForm";
import { apiFetch, type ApiList } from "../lib/api";
import type { Category } from "../lib/types";

export function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await apiFetch<ApiList<Category>>(`/api/admin/categories?q=${encodeURIComponent(q)}`);
    setItems(data.items);
  };

  useEffect(() => {
    void apiFetch<ApiList<Category>>("/api/admin/categories").then((data) => setItems(data.items));
  }, []);

  const save = async (values: Partial<Category>) => {
    setLoading(true);
    try {
      const url = editing ? `/api/admin/categories/${editing.id}` : "/api/admin/categories";
      await apiFetch<Category>(url, { method: editing ? "PUT" : "POST", body: JSON.stringify(values) });
      message.success("保存成功");
      setOpen(false);
      setEditing(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    await apiFetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    message.success("删除成功");
    await load();
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>分类管理</Typography.Title>
        <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>新增分类</Button>
      </Space>
      <Space style={{ marginBottom: 16 }}><Input.Search placeholder="搜索分类" value={q} onChange={(e) => setQ(e.target.value)} onSearch={load} allowClear /></Space>
      <Table rowKey="id" dataSource={items} pagination={{ pageSize: 10 }} columns={[
        { title: "名称", dataIndex: "name" },
        { title: "URL", dataIndex: "slug" },
        { title: "排序", dataIndex: "order" },
        { title: "启用", dataIndex: "active", render: (value) => <Switch checked={Boolean(value)} disabled /> },
        { title: "操作", render: (_, row) => <Space><Button onClick={() => { setEditing(row); setOpen(true); }}>编辑</Button><Button danger onClick={() => remove(row.id)}>删除</Button></Space> },
      ]} />
      <Drawer title={editing ? "编辑分类" : "新增分类"} width={480} open={open} onClose={() => setOpen(false)} destroyOnClose>
        <CategoryForm initial={editing ?? undefined} loading={loading} onCancel={() => setOpen(false)} onSubmit={save} />
      </Drawer>
    </>
  );
}