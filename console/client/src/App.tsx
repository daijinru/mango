import React from 'react';
import './App.css';

import {
  Menu,
  Container,
  Image,
  MenuItemProps,
} from 'semantic-ui-react'

import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Console from './pages/Console'
import Statistic from './pages/Statistic';
import Project from './pages/Console/project'

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('')
  const menuConfig = [
    {path: '/', title: 'Console', active: 'console', component: Console},
    {path: '/project', title: 'Project', active: 'project', component: Project, hideInMenu: true},
    {path: '/statistic', title: 'Statistic', active: 'statistic', component: Statistic}
  ]

  const location = useLocation()
  React.useEffect(() => {
    const item = menuConfig.find(menu => menu.path === location.pathname)
    if (item) {
      setActiveItem(item.active)
    }
  }, [location])
  return (
    <>
    <div>
      <Menu
        borderless
        style={{marginBottom: '36px'}}
        className='header-wrapper-shadow'
      >
        <Container>
          <Menu.Item>
            <Image size='mini' src='/mango.png' />
          </Menu.Item>
          <Menu.Item header>Mango Console</Menu.Item>
          {
            menuConfig
            .filter(menu => !menu.hideInMenu)
            .map(menu => {
              return (
                <Menu.Item
                  key={menu.active}
                  active={activeItem === menu.active}
                  // onClick={toggleMenuItem}
                  name={menu.active}
                >
                  <Link to={menu.path}>{menu.title}</Link>
                </Menu.Item>
              )
            })
          }
        </Container>
      </Menu>

      <Routes>
        {
          menuConfig.map(menu => {
            return (
              <Route key={menu.path} path={menu.path} element={menu.component()}></Route>
            )
          })
        }
      </Routes>
    </div>
    </>
  );
}

export default App;
