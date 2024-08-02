import React from 'react';
import NewApplication from './components/Modals/NewApplication'
import ApplicationExplorer from './components/Modals/ApplicationsExplorer'
import NewAgent from './components/Modals/NewAgent'
import AgentsMonitor from "./components/Modals/AgentsMonitor"
import NewTask from './components/Modals/NewTask'
import TasksExplorer from "./components/Modals/TasksExplorer";
import Modals, { ModalRegisterConfig, ModalRootRef } from './components/Modals/index'

import './App.css';

const modals: ModalRegisterConfig[] = [
  { name: NewApplication.NAME, component: NewApplication.component },
  { name: ApplicationExplorer.NAME, component: ApplicationExplorer.component },
  { name: NewAgent.NAME, component: NewAgent.component },
  { name: AgentsMonitor.NAME, component: AgentsMonitor.component },
  { name: NewTask.NAME, component: NewTask.component },
  { name: TasksExplorer.NAME, component: TasksExplorer.component },
]

export default () => {
  const modalsRef = React.useRef<ModalRootRef>(null)
  const openApplicationCreateModal = () => {
    modalsRef.current?.open(NewApplication.NAME, {})
  }
  const openApplicationListModal = () => {
    modalsRef.current?.open(ApplicationExplorer.NAME, {position: {x: 200, y: 200}})
  }

  return (
    <>
      <Modals ref={modalsRef} modals={modals}></Modals>
      <div>
        <nav className="navbar navbar-expand-sm bg-light" style={{ borderBottom: '1px solid #d9d9d9' }}>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#"><img style={{width: '28px'}} src="/mango.png" alt="logo"/></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/daijinru/mango" target="_blank">About</a>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  New
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => openApplicationCreateModal()}>New Application</a>
                  <a className="dropdown-item" href="#" onClick={() => modalsRef.current?.open(NewTask.NAME, {})}>New Task</a>
                  <a className="dropdown-item" href="#" onClick={() => openApplicationCreateModal()}>New Pipeline</a>
                </div>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  Explorer
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => openApplicationListModal()} >Applications Explorer</a>
                  <a className="dropdown-item" href="#" onClick={() => modalsRef.current?.open(TasksExplorer.NAME, {})} >Tasks Explorer</a>
                </div>
              </li>
              <li className="nav-item dropdown dmenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                  Agent
                </a>
                <div className="dropdown-menu sm-menu" aria-labelledby="navbardrop">
                  <a className="dropdown-item" href="#" onClick={() => modalsRef.current?.open(NewAgent.NAME, {})}>New Agent</a>
                  <a className="dropdown-item" href="#" onClick={() => modalsRef.current?.open(AgentsMonitor.NAME, {})} >Show Agents</a>
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
