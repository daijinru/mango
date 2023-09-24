import React from 'react'
import { Card, Tab, Form } from 'semantic-ui-react'
import qs from 'query-string'
import mango from '../../../../libs/mango'
import type { Pipeline } from '../../../../types'
import PipelineStatusLabel from '../../components/PipelineStatusLabel'

type CardItem = {
  header: string | React.ReactNode
  description: string
  meta: string | React.ReactNode
  key?: string
}
const getAsyncPipelines: (pid: string) => Promise<Pipeline[]> = async (pid) => {
  const response = await mango.api.request({url: '/api/v1/user/' + pid + '/pipelines'})  
  const out = response.map((d: any) => mango.utils.dataCharsToObj(d))
  return Promise.resolve(out)
}

const CardExampleGroupProps = () => {
  const [items, setItems] = React.useState<CardItem[]>([])
  React.useEffect(() => {
    (async function fn() {
      const queries = qs.parse(window.location.search)
      if (queries.id) {
        const result = await getAsyncPipelines(queries.id as string)
        setItems(result.map(r => ({
          header: <p>{PipelineStatusLabel(r.Status)}</p>,
          description: `${r.Source} from Project ${r.ProjectID}, Ref ${r.Ref}`,
          meta: <a href={r.WebURL}>click here</a>,
          key: r.WebURL
        })))
      }
    })()
  }, [])


  const RunPipeline = () => {
    const branchOptions = [
      { key: 'm', text: 'main', value: 'main' },
    ]
    return (
      <>
        <span>Run for branch name</span>
        <Form>
          <Form.Select style={{marginTop: '16px'}} width={2} options={branchOptions} placeholder='main'></Form.Select>
          <Form.Button>Run pipeline</Form.Button>
          {/* <Form.Group widths='equal' label="Variables">
            <Form.Input fluid label='First name' placeholder='First name' />
            <Form.Input fluid label='Last name' placeholder='Last name' />
            <Form.Select
              fluid
              label='Gender'
              options={options}
              placeholder='Gender'
            />
          </Form.Group> */}
        </Form>
      </>
    )
  }
  const panes = [
    { menuItem: 'Histories', render: () => <Tab.Pane><Card.Group items={items} /></Tab.Pane> },
    { menuItem: 'Active', render: () => <Tab.Pane><RunPipeline /></Tab.Pane> },
    // { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]
  return (
    <>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition='left'
        panes={panes}
      >
      </Tab>
    </>
  )
}

export default CardExampleGroupProps