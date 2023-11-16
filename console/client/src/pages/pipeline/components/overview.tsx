import React from 'react';

import { Badge, Descriptions, Tag } from 'antd';
import { Pipeline } from '../../../libs/runner.types';

interface Props {
  pipeline: Pipeline
}
const App: React.FC<Props> = (props) => {
  return (
    <>
      <Descriptions title="" bordered>
        <Descriptions.Item label="Id"><Tag color="#2db7f5">#{props.pipeline.id}</Tag></Descriptions.Item>
        <Descriptions.Item label="Start Time">{props.pipeline.startTime}</Descriptions.Item>
        <Descriptions.Item label="End Time">{props.pipeline.endTime}</Descriptions.Item>
        <Descriptions.Item label="stages" span={1}>{props.pipeline.stages}</Descriptions.Item>
        <Descriptions.Item label="Agent Status" span={2}>
          {/* <Badge status="processing" text={props.pipeline.status} /> */}
        </Descriptions.Item>
        <Descriptions.Item label="Info" span={3}>
          Created At: {props.pipeline.createdAt}
          <br />
          Project Id: {props.pipeline.projectId}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
};

export default App;
