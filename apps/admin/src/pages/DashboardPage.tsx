import { Card, Col, Row, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Stats } from "../lib/types";

export function DashboardPage() {
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    apiFetch<Stats>("/api/admin/stats").then(setStats);
  }, []);

  return (
    <>
      <Typography.Title level={2} style={{ marginTop: 0 }}>仪表盘</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8} xl={4}><Card><Statistic title="产品数量" value={stats?.products ?? 0} /></Card></Col>
        <Col xs={24} md={8} xl={4}><Card><Statistic title="已发布新闻" value={stats?.articles ?? 0} /></Card></Col>
        <Col xs={24} md={8} xl={4}><Card><Statistic title="询盘总数" value={stats?.inquiries ?? 0} /></Card></Col>
        <Col xs={24} md={8} xl={4}><Card><Statistic title="新询盘" value={stats?.inquiriesNew ?? 0} /></Card></Col>
        <Col xs={24} md={8} xl={4}><Card><Statistic title="订阅用户" value={stats?.subscribers ?? 0} /></Card></Col>
      </Row>
    </>
  );
}
