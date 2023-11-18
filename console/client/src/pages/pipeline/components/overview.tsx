import React from 'react'

import { Descriptions, Tag } from 'antd'
import { Pipeline } from '../../../libs/runner.types'
import moment from 'moment'
import { CheckCircleOutlined } from '@ant-design/icons'

interface Props {
  pipeline: Pipeline
}
const App: React.FC<Props> = (props) => {
  return (
    <>
      <Descriptions title="" bordered>
        <Descriptions.Item label="Id"><Tag color="#2db7f5">#{props.pipeline.id}</Tag></Descriptions.Item>
        <Descriptions.Item label="Start Time">{props.pipeline.startTime || '-'}</Descriptions.Item>
        <Descriptions.Item label="End Time">{props.pipeline.endTime || '-'}</Descriptions.Item>
        <Descriptions.Item label="Id" span={1}>{props.pipeline.projectId}</Descriptions.Item>
        <Descriptions.Item label="Agent Completed" span={2}>
          <Tag icon={<CheckCircleOutlined />} color="success">success</Tag>
          {/* <Badge status="processing" text={props.pipeline.status} /> */}
        </Descriptions.Item>
        <Descriptions.Item label="Info" span={3}>
          created at: {moment(props.pipeline.createdAt).format('MM-DD-YYYY hh:mm')}
          <br />
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default App
