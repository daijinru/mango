import React, { useState } from 'react';
import {
  Grid,
  Menu,
  MenuItemProps,
  Segment,
  Container,
} from 'semantic-ui-react'

import Projects from '../../components/Projects';
import Pipelines from '../../components/Pipelines';
import mango from '../../libs/mango';

const getAsyncProjects: () => Promise<any> = async () => {
  const response = await mango.api.request({url: '/api/v1/user/projects'})
  const out = response.map((d: any) => mango.utils.dataCharsToObj(d))
  return Promise.resolve(out)
}

const getAysyncPipelines: (id: string) => Promise<any> = async (id: string) => {
  const response = await mango.api.request({url: `/api/v1/user/${id}/pipelines`})
  const out = response.map((d: any) => mango.utils.dataCharsToObj(d))
  return Promise.resolve(out)
}

const Console: () => React.ReactNode = () => {
  const [activeItem, setActiveItem] = React.useState<string>('')
  const handleItemClick = (e: any, data: MenuItemProps) => {
    const name: string = data.name as string
    setActiveItem(name)
  }
  const [projects, setProjects] = useState<any[]>([])
  const [pipelines, setPipelines] = useState<any[]>([])
  React.useEffect(() => {
    (async function fn() {
      setActiveItem('projects')
      const asyncProjects = await getAsyncProjects()
      setProjects(asyncProjects)
    })()
  }, [])
  React.useEffect(() => {
    if (projects.length < 1) return
    (async function fn() {
      const pipelineReqQueue: any[] = projects.map(async (project) => {
        const out = await getAysyncPipelines(project.ID)
        if (out && out.length > 0) {
          out.forEach((o: any) => {
            o.Project = project.Name
          })
          return Promise.resolve(out)
        }
        return Promise.resolve([])
      })
      const pipelines = await Promise.all(pipelineReqQueue)
      setPipelines(pipelines)
      // console.info(pipelines)
    })()
  }, [projects])
  return (
    <>
    <div>
      <Container>
        <Grid>
          <Grid.Column width={4}>
            <Menu
              fluid
              vertical
              tabular
              defaultActiveIndex={'projects'}
            >
              <Menu.Item
                name='projects'
                active={activeItem === 'projects'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='pipelines'
                active={activeItem === 'pipelines'}
                onClick={handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              {
                activeItem === 'projects'
                  ? <Projects list={projects} />
                  : <Pipelines list={pipelines} />
              }
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
    </>
  );
}

export default Console;
