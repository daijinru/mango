import React from 'react'
import { ModalRootConfig } from './index'
import { Button, message, Modal, Space, Table } from 'antd'
import type { Task } from '../../libs/runner/runner.types'
import { TASK } from '../../libs/runner/services'
import NewTask from "./NewTask";

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Source type',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    {
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Updated At',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Task) => (
        <Space size="middle">
          <Button size='small' onClick={() => onEdit(record.id)}>Edit</Button>
          <Button size='small' onClick={() => onDel(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const onDel = (id: number) => {
    Modal.confirm({
      title: 'Confirm Delete',
      onOk() {
        TASK.deleteById(id).then(() => {
          reload()
        })
      }
    })
  }
  const onEdit = (id: number) => {
    open(NewTask.NAME, {id})
  }

  const [data, setData] = React.useState<Task[]>([])
  const reload = async () => {
    const response = await TASK.getAll()
    if (response.status !== 200) return message.warning(response.message)
    setData(response.data)
  }
  React.useEffect(() => {
    reload()
  }, [args])

  return (
    <>
      <div>
        <Table size="small" bordered columns={columns} dataSource={data} />
      </div>
    </>
  )
}

export default {
  NAME: 'Tasks Explorer',
  component: App,
}
