import React from 'react'
import {
  Container, Header,
  Icon, Tab,
} from 'semantic-ui-react'

const Project: () => React.ReactNode = () => {
  const panes = [
    {
      menuItem: 'Pipelines',
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
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