"use client";
import {
  DeploymentUnitOutlined,
  HeartTwoTone,
  PieChartOutlined,
  SlidersOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import NavLink from "./nav-link";

import "antd/dist/reset.css";

const { Sider, Content, Footer } = Layout;

import { Typography } from "antd";
import { HeaderComponent } from "../components/Header";

const { Link } = Typography;

export default function RootLayout({ children }: { children: any }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html>
      <head />
      <body>
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null}>
            <Menu
              theme="dark"
              mode="inline"
              style={{ marginTop: "3rem" }}
              items={[
                {
                  key: "1",
                  icon: <PieChartOutlined />,
                  label: <NavLink href="/">Dashboard</NavLink>,
                },
                {
                  key: "2",
                  icon: <SlidersOutlined />,
                  label: <NavLink href="/stockrules">Regra de estoque</NavLink>,
                },
                {
                  key: "3",
                  icon: <TeamOutlined />,
                  label: <NavLink href="/stock">Estoque atual</NavLink>,
                },
                {
                  key: "4",
                  icon: <DeploymentUnitOutlined />,
                  label: <NavLink href="/import">Importar planilha</NavLink>,
                },
              ]}
            />
          </Sider>
          <Layout className="site-layout">
            <HeaderComponent />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                height: "52rem",
                background: colorBgContainer,
                overflow: "auto",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
