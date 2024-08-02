import React from 'react'
import { ModalRootConfig } from './index'
import { Button, Form, Input, message, Select } from 'antd'
import type { FormProps } from 'antd/lib'
import type {Application, Pipeline, PipelineArgs, Task} from '../../libs/runner/runner.types'
import {APPLICATION, PIPELINE, TASK} from '../../libs/runner/services'
import PipelineConsole from "./PipelineConsole";
import { compact, keyBy, map } from 'lodash-es'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close,  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<{applicationId: number, tasks: number[]}>['onFinish'] = (values) => {
    // console.info(values.ids, )
    const data: PipelineArgs = {
      applicationId: values.applicationId,
      tasks: compact(map(values.tasks, id => keyBy(tasks, 'id')[id]))
    }
    // open(PipelineConsole.NAME, {})
    PIPELINE.create(data).then(res => {
      if (res.status === 200) {
        message.info(res.message)
        message.info(res.data.stdout)
        open(PipelineConsole.NAME, {})
        close(NAME)
      }
    }).catch(error => {
      message.warning(error)
    })
  }

  const [apps, setApps] = React.useState<Application[]>([])
  const [tasks, setTasks] = React.useState<Task[]>([])
  React.useEffect(() => {
    // replay data by App id
    APPLICATION.getAll().then(res => {
      setApps(res.data)
    })
    TASK.getAll().then(res => {
      setTasks(res.data)
    })
  }, [])

  return (
    <>
      <div style={{width: '320px'}}>
        <Form
          size='small'
          layout={'vertical'}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item hidden label="id" name="id">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Applications" name="applicationId" rules={[{required: true}]}>
            <Select
              placeholder="Select a Application"
              allowClear
            >
              {
                apps.map(app => <Select.Option value={app.id}>{app.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item label="Tasks" name="tasks" rules={[{required: true}]}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // onChange={onChangeTask}
              // defaultValue={}
            >
              {
                tasks.map(task => <Select.Option value={task.id}>{task.name}</Select.Option>)
              }
            </Select>
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
  NAME: 'New Pipeline',
  component: App,
}
