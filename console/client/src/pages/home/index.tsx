import React from 'react'

import { CheckCard } from '@ant-design/pro-components'
import { Button, Checkbox, Divider, Form, Input } from 'antd'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  };

  const [actionVisible, setActionVisible] = React.useState<string>('')

  return (
    <>
      <CheckCard.Group
        onChange={(value) => {
          if (value) {
            setActionVisible(value as string)
          }
        }}
        defaultValue="A"
      >
        <CheckCard title="Create a Project" description="To create a project from a directory." value="action_create" />
        <CheckCard title="Go to projects" description="Go to see the projects." value="action_projects" />
        {/* <CheckCard
          title="Card C"
          disabled
          description="选项三，这是一个不可选项"
          value="C"
        /> */}
      </CheckCard.Group>
      <div>
        { actionVisible === 'action_create'
          && (
            <>
              <Divider></Divider>
              <Form
                name="basic"
                size="small"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

              >
                <Form.Item
                  label="name"
                  name="name"
                  rules={[{ required: true, message: 'Please enter name of project' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="path"
                  name="path"
                  rules={[{ required: true, message: 'Please enter path of project' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </>
          )
        }
      </div>

    </>
  )
}

export default App
