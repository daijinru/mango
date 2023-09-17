import React from 'react'
import { Icon, Table, Button } from 'semantic-ui-react'
import Loader from './Loader/Loader'

export type Props = {
  list: any[]
}
const Projects: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    if (props.list && props.list.length > 0) {
      setLoading(false)
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
              <Table.HeaderCell colSpan='3'>Projects</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              props.list?.map((item: any) => {
                return (
                  <Table.Row key={item.ID}>
                    <Table.Cell collapsing>
                      <Icon name='tag' /> {item.ID}
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Icon name='gitlab' /> <a href={item.WebURL} target="_blank">{item.Name}</a>
                    </Table.Cell>
                    <Table.Cell>
                      <Button animated size='mini'>
                        <Button.Content visible>pipelines</Button.Content>
                        <Button.Content hidden>
                          <Icon name='hand point right' />
                        </Button.Content>
                      </Button>
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

export default Projects