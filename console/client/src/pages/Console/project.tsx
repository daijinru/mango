import React from 'react'
import {
  Container, Header,
  Icon, Tab,
} from 'semantic-ui-react'
import qs from 'query-string'
import mango from '../../libs/mango'
import ProjectPipelines from './components/ProjectPipelines'
import type { Project as ProjectType } from '../../types'
import { useLocation } from 'react-router-dom'

const getAsyncProjectById: (id: string) => Promise<ProjectType[]> = async (id) => {
  const response = await mango.api.request({url: '/api/v1/project/' + id})  
  const out = response.map((d: any) => mango.utils.dataCharsToObj(d))
  return Promise.resolve(out)
}

const Project: () => React.ReactNode = () => {
  const panes = [
    {
      menuItem: 'Pipelines',
      render: () => <Tab.Pane attached={false}><ProjectPipelines /></Tab.Pane>,
    },
    {
      menuItem: 'Overview',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: 'Members',
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
  ]

  const location = useLocation()
  const [projectInfo, setProjectInfo] = React.useState<ProjectType>()
  React.useEffect(() => {
    (async function fn() {
      const queries = qs.parse(location.search)
      if (queries.id) {
        const result = await getAsyncProjectById(queries.id as string)
        setProjectInfo(result[0])
      }
    })()
  }, [location])
  return (
    <>
      <Container>
        <Header as="h2"><Icon name='plug' />{projectInfo?.Name}</Header>
        <p>
          {projectInfo?.Description || 'Sorry. Here did not provide any information yet!😂'}
        </p>
        <Container>
        <Tab menu={{ secondary: true }} panes={panes} />
        </Container>
      </Container>
    </>
  )
}

export default Project