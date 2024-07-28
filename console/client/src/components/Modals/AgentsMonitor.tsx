import React from 'react'
import { ModalRootConfig } from './index'
import {Descriptions, message, Button, Space,} from 'antd'
import type {Agent} from '../../libs/runner/runner.types'
import { AGENT } from '../../libs/runner/services'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close }) => {
  const reload = async (): Promise<Agent[]> => {
    const response = await AGENT.getAll()
    if (response.status !== 200) {
      message.warning(response.message)
      return []
    }
    setData(response.data)
    return response.data
  }
  const [data, setData] = React.useState<Agent[]>([])

  const time = React.useRef<any>()
  React.useEffect(() => {
    (async function() {
      const data = await reload()
      const next = () => {
        time.current = setTimeout(async () => {
          const promises = data.map(item => {
            return new Promise(async resolve => {
              const resp = await AGENT.getMonitor(item.id)
              item.monitor = (typeof resp.data === 'string' && JSON.parse(resp.data)) || {}
              return resolve(item)
            })
          })
          const nextData = await Promise.all(promises)
          setData(nextData as Agent[])
          next()
          // default 5sec for monitoring
        }, 5000)
      }
      next()
    })()
    return () => {
      clearTimeout(time.current)
    }
  }, [args])


  return (
    <>
      {
        data.map(item => {
          return <div>
            <Descriptions
              title={item.name}
              bordered
              // size="middle"
              column={3}
              extra={[
                <Space>
                  <Button size="small">Edit</Button>
                  <Button size="small">Delete</Button>
                </Space>
              ]}
            >
              <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
              <Descriptions.Item label="Agent Host" span={3}>{item.agentHost}</Descriptions.Item>
              <Descriptions.Item label="Cpu Percent"><span style={{color: 'var(	--bs-success-border-subtle)'}}>{item.monitor?.CpuPercent || '0'}</span></Descriptions.Item>
              <Descriptions.Item label="Cpu Count"><span style={{color: 'var(	--bs-success-border-subtle)'}}>{item.monitor?.CpuCount || '0'}</span></Descriptions.Item>
              <Descriptions.Item label="Mem Percent"><span style={{color: 'var(	--bs-success-border-subtle)'}}>{item.monitor?.MemPercent || '0'}</span></Descriptions.Item>
              <Descriptions.Item label="Created At" span={3}>{item.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Updated At" span={3}>{item.updatedAt || '-'}</Descriptions.Item>
            </Descriptions>
          </div>
        })
      }
    </>
  )
}

export default {
  NAME: 'Agents Monitor',
  component: App,
}
