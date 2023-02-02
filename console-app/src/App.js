
import './App.css';
import {ProjectsColumnList} from './components/projects';

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
        </div>

        <div className="modal">
          <div className="modal-dialog modal-xl">
            <div className="modal-conent">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                pacman
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
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
