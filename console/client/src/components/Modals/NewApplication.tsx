import React from 'react'
import { ModalRootConfig } from './index'
import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd/lib'
import type { Application } from '../../libs/runner/runner.types'
import ApplicationExplorer from './ApplicationsExplorer'

const App: React.FC<React.PropsWithChildren<ModalRootConfig>> = ({ args, NAME, open, close,  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<Application>['onFinish'] = (values) => {
    console.info(values)
    open(ApplicationExplorer.NAME, {position: {x: 200, y: 200}})
    close(NAME)
  }
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
          <Form.Item label="Git BranchName" name="gitBranchName">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Agent Host" name="agentHost" rules={[{required: true}]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Artifact Rule" name="artifactRule">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Username" name="user" rules={[{required: true}]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Password" name="pwd" rules={[{required: true}]}>
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
