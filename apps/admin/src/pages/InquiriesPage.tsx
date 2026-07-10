import { Button, Descriptions, Drawer, Input, message, Select, Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiFetch, type ApiList } from "../lib/api";
import type { Inquiry } from "../lib/types";

const statuses = [
  { value: "new", label: "新询盘" },
  { value: "in-progress", label: "跟进中" },
  { value: "replied", label: "已回复" },
  { value: "closed", label: "已关闭" },
];

const statusText = Object.fromEntries(statuses.map((item) => [item.value, item.label]));

export function InquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<Inquiry | null>(null);

  const load = async () => {
    const data = await apiFetch<ApiList<Inquiry>>(`/api/admin/inquiries?page=1&per_page=50&q=${encodeURIComponent(q)}`);
    setItems(data.items);
  };

  useEffect(() => {
    void apiFetch<ApiList<Inquiry>>("/api/admin/inquiries?page=1&per_page=50").then((data) => {
      setItems(data.items);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await apiFetch("/api/admin/inquiries", { method: "PATCH", body: JSON.stringify({ ids: [id], status }) });
    message.success("状态已更新");
    await load();
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>询盘管理</Typography.Title>
      </Space>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="搜索姓名、邮箱、公司或内容" value={q} onChange={(e) => setQ(e.target.value)} onSearch={load} allowClear />
      </Space>
      <Table rowKey="id" dataSource={items} pagination={{ pageSize: 10 }} columns={[
        { title: "姓名", dataIndex: "name" },
        { title: "邮箱", dataIndex: "email" },
        { title: "国家", dataIndex: "country" },
        { title: "状态", dataIndex: "status", render: (value, row) => <Select value={value} style={{ width: 130 }} onChange={(next) => updateStatus(row.id, next)} options={statuses} /> },
        { title: "日期", dataIndex: "createdAt", render: (value) => new Date(value).toLocaleDateString() },
        { title: "操作", render: (_, row) => <Button onClick={() => setDetail(row)}>查看</Button> },
      ]} />
      <Drawer title="询盘详情" width={560} open={!!detail} onClose={() => setDetail(null)}>
        {detail && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="姓名">{detail.name}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{detail.email}</Descriptions.Item>
            <Descriptions.Item label="电话">{detail.phone ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="国家">{detail.country ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="公司">{detail.company ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="意向产品">{detail.productInterest ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="状态"><Tag>{statusText[detail.status] ?? detail.status}</Tag></Descriptions.Item>
            <Descriptions.Item label="留言内容">{detail.message}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
}
