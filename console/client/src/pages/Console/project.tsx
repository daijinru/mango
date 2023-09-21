import React from 'react'
import {
  Container, Header,
  Icon, Tab,
} from 'semantic-ui-react'
import qs from 'query-string'
import mango from '../../libs/mango'
import PipelineCards from './components/PipelineCards'

// const getAsyncProjectById: (id: string) => Promise<any> = async (id) => {
//   const response = await mango.api.request({url: '/api/v1/project/' + id})  
//   const out = response.map((d: any) => mango.utils.dataCharsToObj(d))
//   return Promise.resolve(out)
// }

const Project: () => React.ReactNode = () => {
  const panes = [
    {
      menuItem: 'Pipelines',
      render: () => <Tab.Pane attached={false}><PipelineCards /></Tab.Pane>,
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
  React.useEffect(() => {
    (async function fn() {
      // const queries = qs.parse(location.search)
      // if (!queries.id) 
      // await getAsyncProjectById()
    })()
  })
  return (
    <>
      <Container>
        <Header as="h2"><Icon name='plug' /> Project</Header>
        <p>
          A container is a fixed width element that wraps your site's content. It remains a constant
          size and uses <b>margin</b> to center. Containers are the simplest way to center page
          content inside a grid.
        </p>
        <Container>
        <Tab menu={{ secondary: true }} panes={panes} />
        </Container>
      </Container>
    </>
  )
}

export default Project