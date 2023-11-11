import React from "react";
import { Button, Divider, Form, Input } from 'antd'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

 return  (
    <>
      <Divider></Divider>
      <Form
        name="basic"
        size="small"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
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

export default App