import React from 'react'
import { ModalRootConfig } from './index'
import { Space, Table, Tag } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'repository',
    dataIndex: 'gitRepository',
    key: 'gitRepository',
  },
  {
    title: 'branchname',
    dataIndex: 'gitBranchName',
    key: 'gitBranchName',
  },
  {
    title: 'artifact',
    key: 'artifactVersion',
    dataIndex: 'artifactVersion',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>details</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data: any[] = [
];


const App: React.FC<React.PropsWithChildren<ModalRootConfig>> = ({ args, NAME, }) => {
  return (
    <>
      <div style={{width: '520px'}}>
        <Table size="small" bordered columns={columns} dataSource={data} />
      </div>
    </>
  )
}

export default {    
  NAME: 'Application Explorer',
  component: App,
}
