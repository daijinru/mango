import React from 'react'
import { ModalRootConfig } from './index'
import { Button, Form, Input, message, Select } from 'antd'
import type { FormProps } from 'antd/lib'
import type { Application, ApplicationArgs, Agent } from '../../libs/runner/runner.types'
import ApplicationExplorer from './ApplicationsExplorer'
import { APPLICATION, AGENT } from '../../libs/runner/services'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close,  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<Application>['onFinish'] = (values) => {
    APPLICATION.save(values as ApplicationArgs).then(res => {
      if (res.status === 200) {
        open(ApplicationExplorer.NAME, {position: {x: 200, y: 200}})
        close(NAME)
      }
    }).catch(error => {
      message.warning(error)
    })
  }

  const [agents, setAgents] = React.useState<Agent[]>([])
  React.useEffect(() => {
    AGENT.getAll().then(res => {
      if (res.status !== 200) return
      setAgents(res.data)
    })
  }, [])

  const onAgentHostChange = (value: string) => {
    console.info(value)
  }

  React.useEffect(() => {
    // replay data by App id
    if (!args.id) return
    APPLICATION.getById(args.id).then(res => {
      if (res.status === 200) {
        form.setFieldsValue(res.data)
      }
    })
  }, [args.id])

  return (
    <>
      <div style={{width: '320px'}}>
        <Form
          size='small'
          layout={'vertical'}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name" rules={[{required: true}]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Git Repository" name="gitRepository">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Git Branch Name" name="gitBranchName">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Agent Host" name="agentHost" rules={[{required: true}]}>
            <Select
              placeholder="Select a Agent Host"
              onChange={onAgentHostChange}
              allowClear
            >
              {
                agents.map(agent => <Select.Option value={agent.agentHost}>{agent.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item label="Artifact Rule" name="artifactRule">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Username" name="user">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Password" name="pwd">
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default {
  NAME: 'New Application',
  component: App,
}
