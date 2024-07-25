import React from 'react'

export interface ModalRootConfig {
  NAME: string

  isOpen: boolean
  close: () => void

  args: Record<string, any>
  position: {x: number, y: number}
  zIndex: number
  focus: () => void
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
          isOpen: true,
          args,
          position: args.positon || {x: 100, y: 100},
          // zIndex: zIndices.length + 1,
          close: () => closeModal(name),
          focus: () => updateZIndex(name),
        })
      }))
      setZIndices(prevZIndices => [...prevZIndices, name])
    }
  }
  const closeModal = (name: string) => {
    setModal(prevState => {
      const {[name]: _, ...rest } = prevState
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
          return React.cloneElement(modal, {
            zIndex,
          })
        }
        return null
      })}
    </>
  )
})

export default Modals;
