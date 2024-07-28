import React from 'react'
import { ModalRootConfig } from './index'
import {Descriptions, message, Button, Space, Modal} from 'antd'
import type {Agent} from '../../libs/runner/runner.types'
import { AGENT } from '../../libs/runner/services'
import NewAgent from "./NewAgent";

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close }) => {
  const [data, setData] = React.useState<Agent[]>([])
  const reload = async (): Promise<Agent[]> => {
    const response = await AGENT.getAll()
    if (response.status !== 200) {
      message.warning(response.message)
      return []
    }
    setData(response.data)
    return response.data
  }
  const timeFunc = async (data: Agent[]) => {
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
      }, 7500)
    }
    next()
  }

  const time = React.useRef<any>()
  React.useEffect(() => {
    (async function() {
      const data = await reload()
      await timeFunc(data)
    })()
    return () => {
      clearTimeout(time.current)
    }
  }, [args])

  const onDel = (id: number) => {
    Modal.confirm({
      title: 'Confirm Delete',
      onOk() {
        AGENT.deleteById(id).then(async () => {
          clearTimeout(time.current)
          const data = await reload()
          await timeFunc(data)
        })
      }
    })
  }

  return (
    <>
      {
        data.map(item => {
          return <div className="d-flex flex-wrap mb-4">
            <Descriptions
             style={{width: '700px'}}
              title={item.name}
              bordered
              // size="middle"
              column={3}
              extra={[
                <Space>
                  <Button size="small" onClick={() => open(NewAgent.NAME, { id: item.id })}>Edit</Button>
                  <Button size="small" onClick={() => onDel(item.id)}>Delete</Button>
                </Space>
              ]}
            >
              <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
              <Descriptions.Item label="Agent Host" span={3}>{item.agentHost}</Descriptions.Item>
              <Descriptions.Item label="Cpu Percent" span={1}><span style={{color: 'var(	--bs-success-border-subtle)'}}>{item.monitor?.CpuPercent || '0'}</span></Descriptions.Item>
              <Descriptions.Item label="Mem Percent" span={2}><span style={{color: 'var(	--bs-success-border-subtle)'}}>{item.monitor?.MemPercent || '0'}</span></Descriptions.Item>
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
