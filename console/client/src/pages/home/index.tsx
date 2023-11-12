import React from 'react'

import { CheckCard } from '@ant-design/pro-components'
import { Divider } from 'antd'

import ListProjects from './components/list-projects'
import CreateProject from './components/create-project'

export default () => {

  const [actionVisible, setActionVisible] = React.useState<string>('')

  return (
    <>
      <CheckCard.Group
        onChange={(value) => {
          if (value) {
            setActionVisible(value as string)
          }
        }}
        defaultValue="A"
      >
        <CheckCard title="Create a Project" description="To create a project from a directory." value="action_create" />
        <CheckCard title="Go to projects" description="Go to see the projects." value="action_list_projects" />
        {/* <CheckCard
          title="Card C"
          disabled
          description="选项三，这是一个不可选项"
          value="C"
        /> */}
      </CheckCard.Group>
      <div>
        { actionVisible === 'action_create'
          && <CreateProject />
        }
        {
          actionVisible === 'action_list_projects'
          && (
            <>
              <Divider></Divider>
              <ListProjects />
            </>
          )
        }
      </div>

    </>
  )
}
