import React from 'react'
import { Card } from 'semantic-ui-react'
import qs from 'query-string'
import mango from '../../../libs/mango'
import type { Pipeline } from '../../../types'
import PipelineStatusLabel from './PipelineStatusLabel'

type CardItem = {
  header: string | React.ReactNode
  description: string
  meta: string | React.ReactNode
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
          meta: <a href={r.WebURL}>click here</a>
        })))
      }
    })()
  })
  return (
    <>
      <Card.Group items={items} />
    </>
  )
}

export default CardExampleGroupProps