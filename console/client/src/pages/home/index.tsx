import React from 'react'

import { CheckCard } from '@ant-design/pro-components'
import { Divider } from 'antd'

import CreateProject from './components/create-project'
import CreateAgent from './components/create-agent'

export default () => {

  const [actionVisible, setActionVisible] = React.useState<string>('action_create_agent')

  return (
    <>
      <CheckCard.Group
        onChange={(value) => {
          if (value) {
            setActionVisible(value as string)
          }
        }}
        defaultValue="action_create_agent"
      >
        <CheckCard title="Create an Agent" description="To create an agent for execution tasks." value="action_create_agent" />
        <CheckCard title="Create a Project" description="To create a project from a directory." value="action_create_project" />
      </CheckCard.Group>
      <div>
        {
          actionVisible === 'action_create_agent'
          && (
            <>
              <Divider></Divider>
              <CreateAgent />
            </>
          )
        }
        { actionVisible === 'action_create_project'
          && (
            <>
              <Divider></Divider>
              <CreateProject />
            </>
          )
        }
      </div>

    </>
  )
}
