import { Button, Drawer, Image, Input, message, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { VideoForm } from "../components/VideoForm";
import { apiFetch, type ApiList } from "../lib/api";
import type { Video } from "../lib/types";

export function VideosPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Video | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await apiFetch<ApiList<Video>>(`/api/admin/videos?q=${encodeURIComponent(q)}`);
    setItems(data.items);
  };

  useEffect(() => {
    void apiFetch<ApiList<Video>>("/api/admin/videos").then((data) => setItems(data.items));
  }, []);

  const save = async (values: Partial<Video>) => {
    setLoading(true);
    try {
      const url = editing ? `/api/admin/videos/${editing.id}` : "/api/admin/videos";
      await apiFetch<Video>(url, { method: editing ? "PUT" : "POST", body: JSON.stringify(values) });
      message.success("保存成功");
      setOpen(false);
      setEditing(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    await apiFetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    message.success("删除成功");
    await load();
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>视频管理</Typography.Title>
        <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>新增视频</Button>
      </Space>
      <Space style={{ marginBottom: 16 }}><Input.Search placeholder="搜索视频" value={q} onChange={(e) => setQ(e.target.value)} onSearch={load} allowClear /></Space>
      <Table rowKey="id" dataSource={items} pagination={{ pageSize: 10 }} columns={[
        { title: "封面", dataIndex: "thumbnail", render: (value) => value ? <Image src={String(value)} alt="视频封面" width={96} height={54} style={{ objectFit: "cover" }} /> : "-" },
        { title: "标题", dataIndex: "title" },
        { title: "URL", dataIndex: "slug" },
        { title: "时长", dataIndex: "duration" },
        { title: "SEO", render: (_, row) => row.seoTitle ? "已设置" : "未设置" },
        { title: "操作", render: (_, row) => <Space><Button onClick={() => { setEditing(row); setOpen(true); }}>编辑</Button><Button danger onClick={() => remove(row.id)}>删除</Button></Space> },
      ]} />
      <Drawer title={editing ? "编辑视频" : "新增视频"} width={560} open={open} onClose={() => setOpen(false)} destroyOnClose>
        <VideoForm initial={editing ?? undefined} loading={loading} onCancel={() => setOpen(false)} onSubmit={save} />
      </Drawer>
    </>
  );
}