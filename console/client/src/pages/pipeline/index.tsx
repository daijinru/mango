import React from 'react';

import { PageContainer, ProCard } from '@ant-design/pro-components'
import { message } from 'antd'
import BuildLog from './components/build-log'
import Overview from './components/overview'
import { Pipeline, Project } from '../../libs/runner.types';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'
import runner from '../../libs/runner';
import { useLoader } from '../../components/Loader/Loader';

export default () => {
  const [tabKey, setTabKey] = React.useState<string>('overview')
  const [pipeline, setPipeline] = React.useState<Pipeline>({} as Pipeline)
  const [project, setProject] = React.useState<Project>({} as Project)
  const [Loader, setLoaderOpen] = useLoader()

  const location = useLocation()
  const queries = qs.parse(location.search)
  const getPipeline = async () => {
    setLoaderOpen(true)

    if (!queries.pid) return message.warning('No empty pid for project')
    const projectResp = await runner.HttpUtils.get<any, Project>({
      url: '/v1/project/' + queries.pid
    })
    if (projectResp.data) {
      setProject(projectResp.data)
    } else {
      return message.warning('No valid project info')
    }
    if (!queries.id) return message.warning('No empty id for pipeline')
    const pipelineResp = await runner.HttpUtils.get<any, Pipeline>({
      url: '/v1/pipeline/' + queries.id
    })
    if (pipelineResp.data) {
      setPipeline(pipelineResp.data)
    }
    setLoaderOpen(false)
  }
  React.useEffect(() => {
    getPipeline()
  }, [])

  return (
    <>
      <Loader />
      <div
        style={{
          background: '#F5F7FA',
          width: '100%',
          height: '100%',
        }}
      >
        <PageContainer
          onTabChange={key => {
            setTabKey(key)
          }}
          tabProps={{
            size: 'small',

          }}
          header={{
            title: pipeline.filename,
            ghost: true,
          }}
          tabBarExtraContent={pipeline.createdAt}
          tabList={[
            {
              tab: 'Overview',
              key: 'overview',
              closable: false,
            },
            {
              tab: 'Build Log',
              key: 'build-log',
              closable: false,
            },
          ]}
        >
          <ProCard direction="column" ghost gutter={[0, 16]}>
            <ProCard style={{ height: '100%' }}>
              {
                tabKey === 'build-log'
                && <BuildLog />
              }
              {
                tabKey === 'overview'
                && <Overview pipeline={pipeline} />
              }
            </ProCard>
          </ProCard>
        </PageContainer>
      </div>
    </>
  );
}
