import React from 'react';
import { Layout } from 'antd';

import ThemeSwitcher from '@iso/containers/ThemeSwitcher/ThemeSwitcher';

import siteConfig from '@iso/config/site.config';
import AppHolder from './ExcelLayout.styles';

const { Content, Footer } = Layout;

export default function ExcelLayout({ children }) {
  return (
    <AppHolder>
      <Layout style={{ height: '100vh' }}>
        <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
          <Layout
            className="isoContentMainLayout"
            style={{
              height: '100vh'
            }}
          >
            <Content
              className="isomorphicContent"
              style={{
                padding: '0px 0 0',
                flexShrink: '0',
                width: '100%'
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        {/* <ThemeSwitcher /> */}
      </Layout>
    </AppHolder>
  );
}
