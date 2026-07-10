import { Button, Drawer, Input, message, Space, Table, Tag, Typography } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { ArticleForm } from "../components/ArticleForm";
import { apiFetch, type ApiList } from "../lib/api";
import type { Article } from "../lib/types";

const statusText: Record<string, string> = {
  draft: "草稿",
  published: "已发布",
};

export function NewsPage() {
  const [items, setItems] = useState<Article[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Article | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await apiFetch<ApiList<Article>>(`/api/admin/news?page=1&per_page=50&q=${encodeURIComponent(q)}`);
    setItems(data.items);
  };

  useEffect(() => {
    void apiFetch<ApiList<Article>>("/api/admin/news?page=1&per_page=50").then((data) => {
      setItems(data.items);
    });
  }, []);

  const save = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      const publishDate = values.publishDate ? (values.publishDate as Dayjs).toISOString() : undefined;
      const body = JSON.stringify({ ...values, publishDate });
      const url = editing ? `/api/admin/news/${editing.id}` : "/api/admin/news";
      await apiFetch<Article>(url, { method: editing ? "PUT" : "POST", body });
      message.success("保存成功");
      setOpen(false);
      setEditing(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    await apiFetch(`/api/admin/news/${id}`, { method: "DELETE" });
    message.success("删除成功");
    await load();
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>新闻管理</Typography.Title>
        <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>新增新闻</Button>
      </Space>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="搜索新闻" value={q} onChange={(e) => setQ(e.target.value)} onSearch={load} allowClear />
      </Space>
      <Table rowKey="id" dataSource={items} pagination={{ pageSize: 10 }} columns={[
        { title: "标题", dataIndex: "title" },
        { title: "状态", dataIndex: "status", render: (value) => <Tag>{statusText[String(value)] ?? String(value)}</Tag> },
        { title: "发布日期", dataIndex: "publishDate", render: (value) => new Date(value).toLocaleDateString() },
        { title: "操作", render: (_, row) => <Space><Button onClick={() => { setEditing(row); setOpen(true); }}>编辑</Button><Button danger onClick={() => remove(row.id)}>删除</Button></Space> },
      ]} />
      <Drawer title={editing ? "编辑新闻" : "新增新闻"} width={520} open={open} onClose={() => setOpen(false)} destroyOnClose>
        <ArticleForm initial={editing ?? undefined} loading={loading} onCancel={() => setOpen(false)} onSubmit={save} />
      </Drawer>
    </>
  );
}
