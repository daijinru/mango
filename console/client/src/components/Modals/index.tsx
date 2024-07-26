import React from 'react'
import Draggable from 'react-draggable'

export interface ModalRootConfig {
  NAME: string
  args: Record<string, any>
}
/**
 * the methods exposed of the Modal Ref
 */
export interface ModalRootRef {
  open: (name: string, args: Record<string, any>) => void;
  // close: (name: string, ...args: any[]) => void;
}
/**
 * A modal should register for the Modal Ref which should ger ready!
 */
export interface ModalRegisterConfig {
  name: string;
  component: React.ComponentType<any>;
}

interface ModalRootProps {
  modals: ModalRegisterConfig[]
}
const Modals = React.forwardRef<ModalRootRef, ModalRootProps>((props, ref) => {
  const [modal, setModal] = React.useState<Record<string, React.ReactElement>>({})
  const [zIndices, setZIndices] = React.useState<string[]>([])

  const openModal = (name: string, args: Record<string, any>) => {
    const modalConfig = props.modals.find(modal => modal.name === name)
    if (modalConfig) {
      setModal(prevState => ({
        ...prevState,
        [name]: React.createElement(modalConfig.component, {
          NAME: name,
          args,
        })
      }))
      setZIndices(prevZIndices => [...prevZIndices, name])
    }
  }
  const closeModal = (name: string) => {
    setModal(prevState => {
      const { [name]: _, ...rest } = prevState
      return rest
    });
    setZIndices(prevZIndices => prevZIndices.filter(zIndexName => zIndexName !== name))
  }
  const updateZIndex = (name: string) => {
    setZIndices(prevZIndices => {
      const filteredZIndices = prevZIndices.filter(zIndexName => zIndexName !== name)
      return [...filteredZIndices, name]
    })
  }

  React.useImperativeHandle(ref, () => ({
    open: openModal,
    // close
  }))

  return (
    <>
      {Object.entries(modal).map(([name, modal]) => {
        if (modal) {
          const zIndex = zIndices.indexOf(name) + 1
          return (
            <>
              <Draggable
                handle='.card-header'
                defaultPosition={{ x: 100, y: 100 }}
              >
                <div className='draggable-modal' style={{ position: 'fixed', zIndex }} onClick={() => updateZIndex(name)}>
                  <div className="card">
                    <div className='card-header d-flex justify-content-between align-items-center'>
                      <h6 className='mb-0'>{name}</h6>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => closeModal(name)}>
                        {/* <span aria-hidden="true">&times;</span> */}
                      </button>
                    </div>
                    <div className="card-body">
                      {
                        React.cloneElement(modal, { zIndex })
                      }
                    </div>
                  </div>
                </div>
              </Draggable>
            </>
          )
        }
        return null
      })}
    </>
  )
})

export default Modals;
