import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'

import './App.css';
import Project from './pages/project'
import Pipeline from './pages/pipeline'

const menuConfig = [
  {path: '/project/:id', title: 'Projects', active: 'project', component: Project},
  {path: '/pipeline/:id', title: 'Pipeline', active: 'pipeline', component: Pipeline, },
]

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {
          menuConfig.map(menu => {
            return (
              <Route key={menu.path} path={menu.path} element={menu.component({})}></Route>
            )
          })
        }
      </Routes>
    </>
  );
}

export default App;
