import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import ApplicationCreate from './components/Modals/ApplicaitonCreate'
import Modals, { ModalConfig, ModalsRef } from './components/Modals/index'

import './App.css';
// import Project from './pages/project'
// import Pipeline from './pages/pipeline'
// import Home from './pages/home'
// import Agents from './pages/agents'
// import Projects from './pages/projects'

// const menuConfig = [
//   {path: '/', title: 'home', active: 'home', component: Home},
//   // {path: '/pipelines', tilte: 'pipelines', active: 'pipelines', component: Pipeline},
//   {path: '/project', title: 'projects', active: 'project', component: Project},
//   {path: '/pipeline', title: 'pipeline', active: 'pipeline', component: Pipeline},
//   {path: '/agents', title: 'agents', active: 'agents', component: Agents},
//   {path: '/projects', title: 'projects', active: 'projects', component: Projects},
// ]

export default () => {
  const modalsRef = React.useRef<ModalsRef>(null)
  const modals: ModalConfig[] = [
    { name: ApplicationCreate.NAME, component: ApplicationCreate.component }
  ]
  const openApplicationCreateModal = () => {
    modalsRef.current?.open(ApplicationCreate.NAME, {})
  }

  return (
    <>
      <Modals ref={modalsRef} modals={modals}></Modals>
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light" style={{ borderBottom: '1px solid #d9d9d9' }}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  Application
                </a>
                <div className="dropdown-menu sm-menu">
                  <a className="dropdown-item" href="javascript:void(0)" onClick={() => openApplicationCreateModal()}>create application</a>
                  {/* <a className="dropdown-item" href="https://github.com/daijinru/mango-runner" target='_blank'>mango-runner</a> */}
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Artifact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Agent</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Task</a>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  Supports
                </a>
                <div className="dropdown-menu sm-menu">
                  <a className="dropdown-item" href="https://github.com/daijinru/mango" target='_blank'>mango</a>
                  <a className="dropdown-item" href="https://github.com/daijinru/mango-runner" target='_blank'>mango-runner</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div style={{ padding: '16px' }}>
        {/* <Routes>
            {
              menuConfig.map(menu => {
                const Component = menu.component
                return (
                  <Route key={menu.path} path={menu.path} element={<Component />}></Route>
                )
              })
            }
          </Routes> */}
      </div>
    </>
  );
};
