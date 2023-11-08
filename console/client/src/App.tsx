import React from 'react';
import './App.css';

import { EllipsisOutlined } from '@ant-design/icons'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Button, Dropdown } from 'antd'


const App: React.FC = () => {
  return (
    <>
      <div
        style={{
          background: '#F5F7FA',
          width: '100%',
          height: '100%',
        }}
      >
        <PageContainer
          tabProps={{
            size: 'small',

          }}
          header={{
            title: 'Test_Project',
            ghost: true,
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: 'Projects',
                },
                {
                  path: '',
                  title: 'Test_Project',
                },
              ],
            },
            extra: [
              // <Button key="1" size='small'>Deploy</Button>,
              // <Button key="2"></Button>,
              // <Button key="3" type="primary">
              //   主要按钮
              // </Button>,
              <Dropdown
                key="dropdown"
                trigger={['click']}
                menu={{
                  items: [
                    {
                      label: 'Create Pipeline',
                      key: '1',
                    },
                    {
                      label: 'Deploy',
                      key: '3',
                    },
                  ],
                }}
              >
                <Button size="small" key="4" style={{ padding: '0 8px' }}>
                  Actions<EllipsisOutlined />
                </Button>
              </Dropdown>,
            ],
          }}
          tabBarExtraContent="Last record: 2023/11/8"
          tabList={[
            {
              tab: 'Overview',
              key: 'base',
              closable: false,
            },
            {
              tab: 'Build Log',
              key: 'info',
              closable: false,
            },
          ]}
        >
          <ProCard direction="column" ghost gutter={[0, 16]}>
            <ProCard style={{ height: '100%' }} />
          </ProCard>
        </PageContainer>
      </div>
    </>
  );
}

export default App;
