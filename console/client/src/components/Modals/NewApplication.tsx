import React from 'react'
import { ModalRootConfig } from './index'
import { Button, Form, Input, message } from 'antd'
import type { FormProps } from 'antd/lib'
import type { Application, ApplicationArgs } from '../../libs/runner/runner.types'
import ApplicationExplorer from './ApplicationsExplorer'
import { APPLICATION } from '../../libs/runner/services'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close,  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<Application>['onFinish'] = (values) => {
    console.info(values)
    APPLICATION.save(values as ApplicationArgs).then(res => {
      if (res.status === 200) {
        open(ApplicationExplorer.NAME, {position: {x: 200, y: 200}})
        close(NAME)
      }
    }).catch(error => {
      message.warning(error)
    })
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
