import React from 'react';

import { Badge, Descriptions, Tag } from 'antd';
import { Project, Agent } from '../../../libs/runner.types';
import runner from '../../../libs/runner';
import { useLoader } from '../../../components/Loader/Loader';
import moment from 'moment';

interface Props {
  project: Project
}
const App: React.FC<Props> = (props) => {
  const [agentStatus, setAgentStatus] = React.useState<string>('')
  const [Loader, setLoading] = useLoader()

  const getAgent = async () => {
    setLoading(true)
    const resp = await runner.HttpUtils.post<any, Agent>({
      url: '/v1/agent/' + props.project.agentId + '/status'
    })
    setLoading(false)
    if (resp.data) {
      setAgentStatus('running')
    } else {
      setAgentStatus('stopped')
    }
  }
  React.useEffect(() => {
    if (props.project && props.project.agentId) {
      getAgent()
    }
  }, [props])
  return (
    <>
      <Descriptions title="" bordered>
        <Descriptions.Item label="Id"><Tag color="#2db7f5">#{props.project.id}</Tag></Descriptions.Item>
        <Descriptions.Item label="Name">{props.project.name}</Descriptions.Item>
        <Descriptions.Item label="Path">{props.project.path}</Descriptions.Item>
        <Descriptions.Item label="Agent" span={1}>{props.project.agentId}</Descriptions.Item>
        <Descriptions.Item label="Agent Status" span={2}>
          <Loader />
          {agentStatus && <Badge status="processing" text={agentStatus} />}
        </Descriptions.Item>
        <Descriptions.Item label="Info" span={3}>
          created At: {moment(props.project.createdAt).format('MM-DD-YYYY hh:mm')}
          <br />
          updated At: {moment(props.project.updatedAt).format('MM-DD-YYYY hh:mm')}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
};

export default App;
