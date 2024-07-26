import React from 'react'
import { ModalRootConfig } from './index'
import Draggable from 'react-draggable'
import ModalsHeader from './ModalsHeader'

const App: React.FC<React.PropsWithChildren<ModalRootConfig>> = ({ isOpen, close, args, NAME, position, zIndex, focus }) => {
  const origTit = args.title || NAME
  const [title,] = React.useState<string>(origTit)

  return (
    <>
      {isOpen && (
        <Draggable
          handle='.card-header'
          defaultPosition={{x: position.x, y: position.y}}
        >
          <div className='draggable-modal' style={{position: 'fixed', zIndex}} onClick={() => focus()}>
            <div className="card" style={{width: '320px'}}>
              <ModalsHeader title={title} close={close} />
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
  NAME: 'New Application',
  component: App,
}
