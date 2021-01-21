import React from 'react';
import { Layout } from 'antd';
import Sidebar from '@ql/containers/Sidebar/Sidebar';
import ThemeSwitcher from '@ql/containers/ThemeSwitcher/ThemeSwitcher';
import Topbar from '@ql/containers/Topbar/Topbar';
import siteConfig from '@ql/config/site.config';
import AppHolder from '@ql/styles/DashboardLayout.styles';

const { Content, Footer } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <AppHolder>
      <Layout style={{ height: '100vh' }}>
        <Topbar />

        <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: '100vh',
            }}
          >
            <Content
              className="isomorphicContent"
              style={{
                padding: '70px 0 0',
                flexShrink: '0',
                width: '100%',
              }}
            >
              {children}
            </Content>
            <Footer
              style={{
                background: '#ffffff',
                textAlign: 'center',
                borderTop: '1px solid #ededed',
              }}
            >
              {siteConfig.footerText}
            </Footer>
          </Layout>
        </Layout>
        <ThemeSwitcher />
      </Layout>
    </AppHolder>
  );
}
