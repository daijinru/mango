import React from 'react'
import { ModalRootConfig } from './index'
import { Button, Form, Input, message } from 'antd'
import type { FormProps } from 'antd/lib'
import type { Task, TaskArgs } from '../../libs/runner/runner.types'
import { TASK } from '../../libs/runner/services'
import TasksExplorer from "./TasksExplorer";

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close,  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<Task>['onFinish'] = (values) => {
    TASK.save(values as TaskArgs).then(res => {
      if (res.status === 200) {
        open(TasksExplorer.NAME, {})
        close(NAME)
      }
    }).catch(error => {
      message.warning(error)
    })
  }

  React.useEffect(() => {
    // replay data by App id
    if (!args.id) return
    TASK.getById(args.id).then(res => {
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
          <Form.Item hidden label="id" name="id">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{required: true}]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Command" name="command" rules={[{required: true}]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="SourceType" name="sourceType">
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
  NAME: 'New Task',
  component: App,
}
