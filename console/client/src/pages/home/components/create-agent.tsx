import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message } from 'antd'
import runner from "../../../libs/runner";
import { Agent, AgentArgs } from "../../../libs/runner.types";

const App: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (values: AgentArgs) => {
    const response = await runner.HttpUtils.post<AgentArgs, Agent>({
      url: '/v1/agent/create',
      data: {
        baseUrl: values.baseUrl,
        token: values.token,
      }
    })
    const data = response.data
    message.success('create success agent, ' + ' id:' + data.id)
    if (data.id) {
      navigate('/agents')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.warning(errorInfo.errorFields[0].errors[0])
  }

 return  (
    <>
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
          label="URL"
          name="baseUrl"
          rules={[{ required: true, message: 'Please enter url of agent: protocol:domain:port' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="token"
          name="token"
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