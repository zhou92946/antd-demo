import React, { useState,useMemo } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,UserSwitchOutlined,SettingOutlined,FundOutlined} from '@ant-design/icons';
import type { MenuProps, TableProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Table,Space } from 'antd';
import axios from 'axios';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['机构经纪','投资交易', '行情资讯','关于我们'].map((key) => ({
  key,
  label: `${key}`,
}));

const nav = ['机构管理', '柜台管理',  '代客下单', '资金划转', '消息管理', '系统设置'];

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, FundOutlined,UserSwitchOutlined,  NotificationOutlined, SettingOutlined].map(
  (icon, index) => {
    const key = nav[index];

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

function GetBrokers(): DataType[] {
  const [data2, setBroker] = useState<DataType[]>([]);
  axios.get('/api').then(response=>{
      console.log(response);
     
      setBroker(response.data as DataType[]);
      
    }).catch(error=>{
      console.log(error);
      return []
    });
    return data2
}

const App: React.FC = () => {
 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const content = GetContent();
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

interface DataType {
  key: string;
  broker_id: number;
  name: string;
  register_time: string;
  address: string;

}
const columns: TableProps<DataType>['columns'] = [
  {
    title: '机构ID',
    dataIndex: 'broker_id',
    key: 'broker_id',
  },
  {
    title: '机构名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '注册时间',
    dataIndex: 'register_time',
    key: 'register_time',
  },
  {
    title: '机构地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

function GetContent() {
  const brokers = GetBrokers();
  return (<Table dataSource={brokers} columns={columns} />);
}
export default App;