import React from 'react'
import { ModalRootConfig } from './index'
import { Button, Form, Input, message } from 'antd'
import type { FormProps } from 'antd/lib'
import type { Agent, AgentArgs } from '../../libs/runner/runner.types'
import { AGENT } from '../../libs/runner/services'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close,  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<Agent>['onFinish'] = (values) => {
    AGENT.save(values as AgentArgs).then(res => {
      if (res.status === 200) {
        // open(ApplicationExplorer.NAME, {position: {x: 200, y: 200}})
        // close(NAME)
      }
    }).catch(error => {
      message.warning(error)
    })
  }

  React.useEffect(() => {
    // replay data by App id
    if (!args.id) return
    AGENT.getById(args.id).then(res => {
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
          <Form.Item label="Agent Host" name="agentHost" rules={[{required: true}]}>
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
  NAME: 'New Agent',
  component: App,
}
