import React from 'react'

export interface ModalProps {
    isOpen: boolean;
    // onClose: () => void;
    args: Record<string, any>
}

export interface ModalConfig {
    name: string;
    component: React.ComponentType<any>;
}

export interface ModalsRef {
    open: (name: string, ...args: any[]) => void;
    // close: (name: string, ...args: any[]) => void;
}
interface ModalsProps {
    modals: ModalConfig[]
}

const Modals = React.forwardRef<ModalsRef, ModalsProps>((props, ref) => {
    const [modal, setModal] = React.useState<Record<string, React.ReactElement>>({})
    const openModal = (name: string, args: Record<string, any>) => {
        const modalConfig = props.modals.find(modal => modal.name === name);
        if (modalConfig) {
            args.component_name = name
            setModal(prevState => ({
                ...prevState,
                [name]: React.createElement(modalConfig.component, {
                    isOpen: true,
                    args,
                })
            }))
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
                    return modal
                }
                return null
            })}
        </>
    )
})

export default Modals;
