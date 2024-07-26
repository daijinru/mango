import React from 'react'
import { ModalRootConfig } from './index'
import { Button, message, Modal, Space, Table, Tag } from 'antd'
import type { Application } from '../../libs/runner/runner.types'
import { APPLICATION } from '../../libs/runner/services'
import NewApplication from '../Modals/NewApplication'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Git Repository',
      dataIndex: 'gitRepository',
      key: 'gitRepository',
    },
    {
      title: 'Git Branch Name',
      dataIndex: 'gitBranchName',
      key: 'gitBranchName',
    },
    {
      title: 'Artifact Version',
      key: 'artifactVersion',
      dataIndex: 'artifactVersion',
    },
    {
      title: 'Agent Host',
      key: 'agentHost',
      dataIndex: 'agentHost',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Application) => (
        <Space size="middle">
          <Button size='small'>Pipelines</Button>
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
        APPLICATION.deleteById(id).then(() => {
          reload()
        })
      }
    })
  }
  const onEdit = (id: number) => {
    open(NewApplication.NAME, {id})
    // close(NAME)
  }
  
  const [data, setData] = React.useState<Application[]>([])
  const reload = async () => {
    const response = await APPLICATION.getAll()
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
  NAME: 'Applications Explorer',
  component: App,
}
