import React, { useState } from 'react';

import { EllipsisOutlined } from '@ant-design/icons'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Button, Dropdown, message, Modal } from 'antd'
import ListPipelines from './components/list-pipelines'
import { Pipeline, PipelineArgs, Project } from '../../libs/runner.types';
import runner from '../../libs/runner';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'

export default () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [tabKey, setTabKey] = useState<string>('overview')
  const [project, setProject] = useState<Project>({} as Project)
  const pipelinesRef = React.useRef<any>()

  const location = useLocation()
  const queries = qs.parse(location.search)

  const onExtraAction = async (info: any) => {
    if (info.key === '1') {
      Modal.confirm({
        title: 'tips',
        content: 'are you sure want to create a new Pipeline?',
        onOk() {
          if (!queries.id) return message.warning('No empty project id for create pipeline!')
          messageApi.open({
            type: 'loading',
            content: 'new pipeline is now being created',
            duration: 0,
          });
          runner.HttpUtils.post<PipelineArgs, Pipeline>({
            url: '/v1/pipeline/create',
            data: {
              pid: queries.id as string,
            }
          }).then(response => {
            if (!response.data) {
              message.warning(response.message)
            }
            if (response.data.id) {
              message.success(`id: ` + response.data.id + ' was created')
              messageApi.destroy()
              pipelinesRef.current.reload()
            }
          })
        }
      })
    }
  }

  React.useEffect(() => {
    (async function fn() {
      if (!queries.id) return message.warning('No empty proejct id: <url>?id=<id>')
      const response = await runner.HttpUtils.get<any, Project>({
        url: '/v1/project/' + queries.id
      })
      setProject(response.data)
    })()
  }, [])
  return (
    <>
     {contextHolder}
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
                  onClick: onExtraAction,
                  items: [
                    {
                      label: 'Create Pipeline',
                      key: '1',
                    },
                    {
                      label: 'Deploy',
                      key: '2',
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
                && <ListPipelines ref={pipelinesRef}/>
              }
            </ProCard>
          </ProCard>
        </PageContainer>
      </div>
    </>
  );
}

// export default App;
