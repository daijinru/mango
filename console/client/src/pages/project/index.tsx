import React, { useState } from 'react';

import { EllipsisOutlined } from '@ant-design/icons'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Button, Dropdown, message } from 'antd'
import ListPipelines from './components/list-pipelines'
import { Project } from '../../libs/runner.types';
import runner from '../../libs/runner';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'

const App: React.FC = () => {
  const [tabKey, setTabKey] = useState<string>('overview')
  const [project, setProject] = useState<Project>({} as Project)
  const location = useLocation()
  React.useEffect(() => {
    (async function fn() {
      const queries = qs.parse(location.search)
      if (!queries.id) return message.warning('No empty proejct id: <url>?id=<id>')
      const project = await runner.HttpUtils.get<any, Project>({
        url: '/v1/project/' + queries.id
      })
      if (project) {
        setProject(project)
      }
    })()
  }, [])
  return (
    <>
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      >
        <PageContainer
          onTabChange={key => {
            console.info('changeto: ', key)
            setTabKey(key)
          }}
          tabProps={{
            size: 'small',

          }}
          header={{
            title: project.name,
            ghost: true,
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: 'Projects',
                },
                {
                  path: '',
                  title: project.name,
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
              key: 'overview',
              closable: false,
            },
            {
              tab: 'Build Log',
              key: 'log',
              closable: false,
            },
          ]}
        >
          <ProCard direction="column" ghost gutter={[0, 16]}>
            <ProCard style={{ height: '100%' }}>
              {
                tabKey === 'overview'
                && <ListPipelines />
              }
            </ProCard>
          </ProCard>
        </PageContainer>
      </div>
    </>
  );
}

export default App;
