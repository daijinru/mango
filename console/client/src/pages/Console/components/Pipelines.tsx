import React from 'react'
import { Icon, Table, Label } from 'semantic-ui-react'
import Loader from '../../../components/Loader/Loader'
import PipelineStatusLabel from './PipelineStatusLabel'
import type { Pipeline } from '../../../types'
export type Props = {
  list: Pipeline[]
}
const Pipelines: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [data, setData] = React.useState<Pipeline[]>([])
  React.useEffect(() => {
    if (props.list && props.list.length > 0) {
      setLoading(false)
      const out = props.list.reduce((acc, curr) => {
        acc = acc.concat(curr)
        return acc
      }, [] as Pipeline[])
      setData(out)
    }
  }, [props.list])
  return (
    <>
      {
        loading
        ? <Loader />
        : <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>All Pipelines</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              data.map((item: any) => {
                return (
                  <Table.Row key={item.Project + item.ID}>
                    <Table.Cell collapsing>
                      <Icon name='folder' /> {item.Project}
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Icon name='gitlab' /> <a href={item.WebURL} target="_blank">{item.ID}</a>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Icon name='code branch' /> {item.Ref}
                    </Table.Cell>
                    <Table.Cell collapsing>
                      {
                        PipelineStatusLabel(item.Status)
                      }
                    </Table.Cell>
                </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      }

    </>
  )
}

export default Pipelines