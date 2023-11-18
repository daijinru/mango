import React from 'react';

import { ProList } from '@ant-design/pro-components'
import { Tag, } from 'antd'
import { SyncOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Agent } from '../../libs/runner.types';
import runner, { HttpStatus } from '../../libs/runner';
import { useLoader } from '../../components/Loader/Loader';

const AgentStatus = ({ id }: any) => {
  const [running, setRunning] = React.useState<boolean>(false)
  React.useEffect(() => {
    runner.HttpUtils.post<any, Agent>({
      url: '/v1/agent/' + id + '/status'
    }).then(res => {
      if (res.data) {
        setRunning(true)
      }
    })
  }, [])
  return (
    <>
      {
        running ? <Tag icon={<CheckCircleOutlined />} color="success">running</Tag>
        : <Tag icon={<SyncOutlined spin />} color="processing">status: in progress</Tag>
      }
    </>
  )
}
export default () => {
  const [dataSource, setDataSource] = React.useState<any>()
  const [Loader, setLoaderOpen] = useLoader()

  const getAgents = async () => {
    const resp = await runner.HttpUtils.get<any, Agent[]>({
      url: '/v1/agent/all',
    })
    if (resp.status === HttpStatus.OK) {
      setDataSource(resp.data.map(item => {
        return {
          title: item.id,
          data: item,
          subTitle: <Tag color="#5BD8A6">{item.baseUrl}</Tag>,
          // actions: [<a key="run">Run</a>, <a key="delete">Remove</a>],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          content: (
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 200,
                }}
              >
                <AgentStatus id={item.id} />
              </div>
            </div>
          ),
        }
      }))
    }
  }
  React.useEffect(() => {
    getAgents()
  }, [])

  return (
    <>
      <Loader />
      <div
        style={{
          backgroundColor: 'transparent',
          margin: -24,
          padding: 24,
        }}
      >
        <ProList<any>
          ghost={true}
          itemCardProps={{
            ghost: true,
          }}
          showActions="hover"
          grid={{ gutter: 16, column: 2 }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
            actions: {
              cardActionProps: 'extra',
            },
          }}
          headerTitle="Agents"
          dataSource={dataSource}
        />
    </div>
    </>
  );
}
