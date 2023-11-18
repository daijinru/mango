import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Project from './pages/project'
import Pipeline from './pages/pipeline'
import Home from './pages/home'
import Agent from './pages/agent'

const menuConfig = [
  {path: '/', title: 'home', active: 'home', component: Home},
  {path: '/pipelines', tilte: 'pipelines', active: 'pipelines', component: Pipeline},
  {path: '/project', title: 'projects', active: 'project', component: Project},
  {path: '/pipeline', title: 'pipeline', active: 'pipeline', component: Pipeline},
  {path: '/agents', title: 'agents', active: 'agents', component: Agent}
]

export default () => {

  return (
    <>
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light" style={{ borderBottom: '1px solid #d9d9d9' }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#"><Link to={'/'}>Home</Link></a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#"><Link to={'/pipelines'}>Pipelines</Link></a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="#"><Link to={'/agents'}>Agents</Link></a>
            </li>
            <li className="nav-item dropdown dmenu">
              <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                Helper
              </a>
              <div className="dropdown-menu sm-menu">
                <a className="dropdown-item" href="https://github.com/daijinru/mango" target='_blank'>mango</a>
                <a className="dropdown-item" href="https://github.com/daijinru/mango-runner" target='_blank'>mango-runner</a>
              </div>
            </li>
          </ul>
          <div className="social-part">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </div>
        </div>
      </nav>
    </div>
    <div style={{ padding: '16px' }}>
      <Routes>
          {
            menuConfig.map(menu => {
              const Component = menu.component
              return (
                <Route key={menu.path} path={menu.path} element={<Component />}></Route>
              )
            })
          }
        </Routes>
    </div>
    </>
  );
};
