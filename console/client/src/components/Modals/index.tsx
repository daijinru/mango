import React from 'react'
import Draggable from 'react-draggable'

export interface ModalRootConfig {
  NAME: string
  args: Record<string, any>
  close: (name: string) => void
  open: (name: string, args: Record<string, any>) => void
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

interface ZIndices {
  position: {x: number, y: number}
  name: string
}
interface ModalRootProps {
  modals: ModalRegisterConfig[]
}
const Modals = React.forwardRef<ModalRootRef, ModalRootProps>((props, ref) => {
  const [modal, setModal] = React.useState<Record<string, React.ReactElement>>({})
  const [zIndices, setZIndices] = React.useState<ZIndices[]>([])

  const openModal = (name: string, args: Record<string, any>) => {
    const modalConfig = props.modals.find(modal => modal.name === name)
    const position = args.position || { x: 100, y: 100 }
    if (modalConfig) {
      setModal(prevState => ({
        ...prevState,
        [name]: React.createElement(modalConfig.component, {
          NAME: name,
          args,
          close: closeModal,
        })
      }))
      setZIndices(prevZIndices => [
        ...prevZIndices,
        {
          name,
          position,
        }
      ])
    }
  }
  const closeModal = (name: string) => {
    setModal(prevState => {
      const { [name]: _, ...rest } = prevState
      return rest
    });
    setZIndices(prevZIndices => prevZIndices.filter(zIn => zIn.name !== name))
  }
  const updateZIndex = (name: string) => {
    setZIndices(prevZIndices => {
      const target = prevZIndices.find(zIn => zIn.name === name)
      if (target) {
        const filteredZIndices = prevZIndices.filter(zIn => zIn.name !== name)
        return [...filteredZIndices, target]
      }
      return prevZIndices
    })
  }
  const updatePosition = (name: string) => (event: any, data: any) => {
    const index = zIndices.findIndex(zIn => zIn.name === name)
    if (index > -1) {
      zIndices[index].position = {x: data.x, y: data.y}
    }
  }

  React.useImperativeHandle(ref, () => ({
    open: openModal,
    // close
  }))

  return (
    <>
      {Object.entries(modal).map(([name, modal]) => {
        if (modal) {
          const target = zIndices.find(zIn => zIn.name === name)
          if (!target) return null
          const zIndex = zIndices.findIndex(zIn => zIn.name === name) + 1
          return (
            <>
              <Draggable
                key={name}
                handle='.card-header'
                defaultPosition={{ x: target.position.x, y: target.position.y }}
                onStop={updatePosition(name)}
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
                        React.cloneElement(modal, { open: openModal })
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
