import { Button, Drawer, Input, message, Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { apiFetch, type ApiList } from "../lib/api";
import type { Category, Product } from "../lib/types";

const statusText: Record<string, string> = {
  active: "已上架",
  draft: "草稿",
  upcoming: "即将发布",
};

export function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await apiFetch<ApiList<Product> & { categories: Category[] }>(`/api/admin/products?page=1&per_page=50&q=${encodeURIComponent(q)}`);
    setItems(data.items);
    setCategories(data.categories);
  };

  useEffect(() => {
    void apiFetch<ApiList<Product> & { categories: Category[] }>("/api/admin/products?page=1&per_page=50").then((data) => {
      setItems(data.items);
      setCategories(data.categories);
    });
  }, []);

  const save = async (values: Partial<Product>) => {
    setLoading(true);
    try {
      const url = editing ? `/api/admin/products/${editing.id}` : "/api/admin/products";
      await apiFetch<Product>(url, { method: editing ? "PUT" : "POST", body: JSON.stringify(values) });
      message.success("保存成功");
      setOpen(false);
      setEditing(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    await apiFetch(`/api/admin/products/${id}`, { method: "DELETE" });
    message.success("删除成功");
    await load();
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>产品管理</Typography.Title>
        <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>新增产品</Button>
      </Space>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="搜索产品" value={q} onChange={(e) => setQ(e.target.value)} onSearch={load} allowClear />
      </Space>
      <Table rowKey="id" dataSource={items} pagination={{ pageSize: 10 }} columns={[
        { title: "产品名称", dataIndex: "name" },
        { title: "分类", render: (_, row) => row.category?.name ?? "-" },
        { title: "状态", dataIndex: "status", render: (value) => <Tag>{statusText[String(value)] ?? String(value)}</Tag> },
        { title: "更新时间", dataIndex: "updatedAt", render: (value) => new Date(value).toLocaleDateString() },
        { title: "操作", render: (_, row) => <Space><Button onClick={() => { setEditing(row); setOpen(true); }}>编辑</Button><Button danger onClick={() => remove(row.id)}>删除</Button></Space> },
      ]} />
      <Drawer title={editing ? "编辑产品" : "新增产品"} width={520} open={open} onClose={() => setOpen(false)} destroyOnClose>
        <ProductForm categories={categories} initial={editing ?? undefined} loading={loading} onCancel={() => setOpen(false)} onSubmit={save} />
      </Drawer>
    </>
  );
}
