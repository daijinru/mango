import React from 'react'
import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Space, Tag, message } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';
import { FileSyncOutlined } from '@ant-design/icons'
import runner from '../../../libs/runner';
import { Pipeline } from '../../../libs/runner.types';
import { useLoader } from '../../../components/Loader/Loader';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'

interface Props {}
const App =  React.forwardRef<Props, any>((props, ref) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const [pipelines, setPipelines] = useState<any>([])
  const location = useLocation()
  const [Loader, setLoaderOpen] = useLoader()
  const reload = async () => {
    setLoaderOpen(true)
    const queries = qs.parse(location.search)
    if (!queries.id) return message.warning('No empty proejct id: <url>?id=<id>')
    const response= await runner.HttpUtils.get<any, Pipeline[]>({
      url: '/v1/project/' + queries.id + '/pipelines'
    })
    setPipelines(response.data.map(item => {
      return {
        title: item.filename,
        ...item
      }
    }).reverse())
    setLoaderOpen(false)
  }

  React.useImperativeHandle(ref, () => ({
    reload,
  }), [])

  React.useEffect(() => {
    reload()
  }, [])
  return (
    <>
      <Loader />
      <ProList<{ title: string }> 
        ghost={true}
        rowKey="title"
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        dataSource={pipelines}
        metas={{
          title: {},
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  {/* <Tag color="blue">Ant Design</Tag> */}
                  <Tag color="#5BD8A6">Success</Tag>
                </Space>
              );
            },
          },
          description: {
            render: (dom, entity) => {
              return dom
            },
          },
          avatar: {},
          content: {
            render: () => (
              <div
                style={{
                  minWidth: 200,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '200px',
                  }}
                >
                  <div>Running</div>
                  <Progress percent={100} />
                </div>
              </div>
            ),
          },
          actions: {
            render: () => {
              return <Button type="text" icon={<FileSyncOutlined />}></Button>
              // return <a key="invite">Build Log</a>;
            },
          },
        }}
      ></ProList>
    </>
  );
});

export default App
