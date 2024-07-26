import React from 'react';
import ApplicationCreate from './components/Modals/NewApplication'
import ApplicationList from './components/Modals/ApplicationsExplorer';
import Modals, { ModalRegisterConfig, ModalRootRef } from './components/Modals/index'

import './App.css';

const modals: ModalRegisterConfig[] = [
  { name: ApplicationCreate.NAME, component: ApplicationCreate.component },
  { name: ApplicationList.NAME, component: ApplicationList.component }
]

export default () => {
  const modalsRef = React.useRef<ModalRootRef>(null)
  const openApplicationCreateModal = () => {
    modalsRef.current?.open(ApplicationCreate.NAME, {})
  }
  const openApplicationListModal = () => {
    modalsRef.current?.open(ApplicationList.NAME, {position: {x: 200, y: 200}})
  }

  return (
    <>
      <Modals ref={modalsRef} modals={modals}></Modals>
      <div>
        <nav className="navbar navbar-expand-sm bg-light" style={{ borderBottom: '1px solid #d9d9d9' }}>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  About
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="https://github.com/daijinru/mango" target='_blank'>Mango</a>
                  <a className="dropdown-item" href="https://github.com/daijinru/mango-runner" target='_blank'>Mango Runner</a>
                </div>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  New
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => openApplicationCreateModal()}>New Application</a>
                  <a className="dropdown-item" href="#" onClick={() => openApplicationCreateModal()}>New Task</a>
                  <a className="dropdown-item" href="#" onClick={() => openApplicationCreateModal()}>New Pipeline</a>
                </div>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  Explorer
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => openApplicationListModal()} >Applications Explorer</a>
                  <a className="dropdown-item" href="#" onClick={() => openApplicationListModal()} >Tasks Explorer</a>
                </div>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  Agent
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => openApplicationCreateModal()}>New Agent</a>
                  <a className="dropdown-item" href="#" onClick={() => openApplicationListModal()} >Show Agents</a>
                </div>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  Artifact
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => openApplicationListModal()} >Show Artifacts</a>
                </div>
              </li>
            </ul>
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
