import { Layout } from 'antd';

import React from 'react';
import './menuProp.css'
import Siderd from './SideBar'
import Tabla from './tipoUsuario';
import SaveModal from './saveModal';

const { Header, Content, Footer, Sider } = Layout;

export default () => (
  <Layout className='layout'>
    <Sider className='sider-style'
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Siderd />
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background nav-color" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
            <SaveModal /><br></br><br></br>
            <Tabla />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  </Layout>
);