import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Select, message } from 'antd'
import runner from "../../../libs/runner";
import { Agent, Project, ProjectArgs } from "../../../libs/runner.types";

const App: React.FC = () => {
  const navigate = useNavigate()
  const [agents, setAgents] = React.useState<Agent[]>([])
  const onFinish = async (values: ProjectArgs) => {
    const response = await runner.HttpUtils.post<ProjectArgs, Project>({
      url: '/v1/project/create',
      data: {
        name: values.name,
        path: values.path,
        agentId: values.agentId,
      }
    })
    const data = response.data
    message.success('create success: ' + data.name + ', id:' + data.id)
    if (data.id) {
      navigate('/project?id=' + data.id)
    }
  }

  const getAgents = async () => {
    const response = await runner.HttpUtils.get<any, Agent[]>({
      url: '/v1/agent/all',
    })
    const data = response.data
    setAgents(data)
  }

  const onFinishFailed = (errorInfo: any) => {
    message.warning(errorInfo.errorFields[0].errors[0])
  }

  React.useEffect(() => {
    getAgents()
  }, [])

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

        <Form.Item
          label="agent"
          name="agentId"
          rules={[{ required: true, message: 'Please select an agent for the project'}]}
        >
          <Select
            options={agents.map(ag => {
              return {
                label: ag.baseUrl,
                value: ag.baseUrl,
              }
            })}
          />
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