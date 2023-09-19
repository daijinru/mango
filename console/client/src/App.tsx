import React from 'react';
import './App.css';

import {
  Menu,
  Container,
  Image,
  MenuItemProps,
} from 'semantic-ui-react'

import { Routes, Route, Link } from 'react-router-dom'
import Console from './pages/Console'
import Statistic from './pages/Statistic';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('')
  const toggleMenuItem = (e: React.MouseEvent, payload: MenuItemProps) => {
    setActiveItem(payload.name as string)
  }
  const menuConfig = [
    {path: '/', title: 'Console', active: 'console'},
    {path: '/statistic', title: 'Statistic', active: 'statistic'}
  ]
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
            menuConfig.map(menu => {
              return (
                <Menu.Item
                  key={menu.active}
                  active={activeItem === menu.active}
                  onClick={toggleMenuItem}
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
        <Route path="/" element={Console()}></Route>
        <Route path="/statistic" element={Statistic()}></Route>
      </Routes>
    </div>
    </>
  );
}

export default App;
