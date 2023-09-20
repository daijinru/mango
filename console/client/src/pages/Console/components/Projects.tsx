import React from 'react'
import { Icon, Table, Button } from 'semantic-ui-react'
import { useHistory } from '../../../hooks/router'
import Loader from '../../../components/Loader/Loader'

export type MenuItem = {
  ID: string
  WebURL: string
  Name: string
}
export type Props = {
  list: MenuItem[]
}
const Projects: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    if (props.list && props.list.length > 0) {
      setLoading(false)
    }
  }, [props.list])

  const history  = useHistory()
  const gotoProject = (record: MenuItem) => {
    history.push(`/project?id=${record.ID}`)
  }
  return (
    <>
      {
        loading
        ? <Loader />
        : <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>All Projects</Table.HeaderCell>
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
                      <Button animated size='mini' onClick={() => gotoProject(item)}>
                        <Button.Content visible>info</Button.Content>
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