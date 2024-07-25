import React from 'react'

export interface ModalRootConfig {
  NAME: string
  isOpen: boolean
  close: () => void
  args: Record<string, any>
}
/**
 * the methods exposed of the Modal Ref
 */
export interface ModalRootRef {
  open: (name: string, ...args: any[]) => void;
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

  const openModal = (name: string, args: Record<string, any>) => {
    const modalConfig = props.modals.find(modal => modal.name === name)
    if (modalConfig) {
      setModal(prevState => ({
        ...prevState,
        [name]: React.createElement(modalConfig.component, {
          NAME: name,
          isOpen: true,
          args,
          close: () => closeModal(name),
        })
      }))
    }
  }
  const closeModal = (name: string) => {
    setModal(prevState => {
      const {[name]: _, ...rest } = prevState
      return rest
    });
  }

  React.useImperativeHandle(ref, () => ({
    open: openModal,
    // close
  }))

  return (
    <>
      {Object.entries(modal).map(([name, modal]) => {
        if (modal) {
          return modal
        }
        return null
      })}
    </>
  )
})

export default Modals;
