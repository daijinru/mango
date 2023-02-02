
import './App.css';
import {ProjectsColumnList} from './components/projects';
import { PipelinesColumnList } from './components/pipelines';
import { getState } from './hooks/useSP';
import { useEffect } from 'react';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">
            <span className="h1-title">🥭 Mango</span>
          </h1>
          <p className="lead">
            <span className="sub-title">Developing...</span>
          </p>
           {ProjectsColumnList().render()}
           {PipelinesColumnList().render()}
        </div>
      </main>
      <footer className="footer mt-auto py-3 bg-light" >
        <div className="container">
          <span className="text-muted">Do you like it? <a href="mailto:jeocat@163.com">Feedback</a></span>
        </div>
      </footer>
    </div>
  )
}

export default App;
