import React from 'react'
import { ModalRootConfig } from './index'
import Draggable from 'react-draggable'

const App: React.FC<React.PropsWithChildren<ModalRootConfig>> = ({ isOpen, close, args, NAME }) => {
  const origTit = args.title || NAME
  const [title,] = React.useState<string>(origTit)

  return (
    <>
      {isOpen && (
        <Draggable
          handle='.card-header'
          defaultPosition={{x: 100, y: 100}}
        >
          <div className='draggable-modal' style={{position: 'fixed'}}>
            <div className="card" style={{width: '320px'}}>
              <div className='card-header'>
                {title}
                <button type="button" className="close" aria-label="Close" onClick={() => close()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="card-body">
                {/* <h5 className="card-title">{title}</h5> */}
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  )
}

export default {
  NAME: 'application_create',
  component: App,
}
