import { AppstoreOutlined, BarChartOutlined, FileImageOutlined, FileTextOutlined, HomeOutlined, LogoutOutlined, MailOutlined, PlaySquareOutlined, SettingOutlined, TagsOutlined, TruckOutlined } from "@ant-design/icons";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { Button, Layout, Menu, Space, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router";
import type { AdminUser } from "../lib/api";

const { Header, Sider, Content } = Layout;

const items = [
  { key: "/", icon: <BarChartOutlined />, label: <Link to="/">仪表盘</Link> },
  {
    key: "/frontend",
    icon: <HomeOutlined />,
    label: "前台编辑",
    children: [
      { key: "/frontend/home", label: <Link to="/frontend/home">首页</Link> },
      { key: "/frontend/about", label: <Link to="/frontend/about">关于我们</Link> },
      { key: "/frontend/products", label: <Link to="/frontend/products">产品</Link> },
      { key: "/frontend/parts", label: <Link to="/frontend/parts">配件</Link> },
      { key: "/frontend/news", label: <Link to="/frontend/news">新闻</Link> },
      { key: "/frontend/service", label: <Link to="/frontend/service">服务</Link> },
      { key: "/frontend/contact", label: <Link to="/frontend/contact">联系我们</Link> },
    ],
  },
  { key: "/products", icon: <TruckOutlined />, label: <Link to="/products">产品管理</Link> },
  { key: "/categories", icon: <TagsOutlined />, label: <Link to="/categories">分类管理</Link> },
  { key: "/news", icon: <FileTextOutlined />, label: <Link to="/news">新闻管理</Link> },
  { key: "/videos", icon: <PlaySquareOutlined />, label: <Link to="/videos">视频管理</Link> },
  { key: "/media", icon: <FileImageOutlined />, label: <Link to="/media">媒体库</Link> },
  { key: "/inquiries", icon: <MailOutlined />, label: <Link to="/inquiries">询盘管理</Link> },
  { key: "/settings", icon: <SettingOutlined />, label: <Link to="/settings">网站设置</Link> },
];

export function AppLayout() {
  const location = useLocation();
  const { data: user } = useGetIdentity<AdminUser>();
  const { mutate: signOut } = useLogout();
  const firstSegment = location.pathname === "/" ? "/" : `/${location.pathname.split("/")[1]}`;
  const selected = location.pathname.startsWith("/frontend/") ? location.pathname : firstSegment;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={232} theme="dark">
        <div style={{ height: 64, padding: 16, color: "#fff", fontWeight: 700, letterSpacing: 0.2 }}>
          <AppstoreOutlined /> SINOTRUK 后台
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selected]} defaultOpenKeys={["/frontend"]} items={items} />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography.Text strong>管理控制台</Typography.Text>
          <Space>
            <Typography.Text type="secondary">{user?.email}</Typography.Text>
            <Button icon={<LogoutOutlined />} onClick={() => signOut()}>退出登录</Button>
          </Space>
        </Header>
        <Content style={{ padding: 24, background: "#f5f7fb" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}