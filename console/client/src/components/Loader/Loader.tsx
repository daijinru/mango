import React from 'react'
import './Loader.css'

const Loader = ({ open }: any) => () => {
  return (
    <div className="loader" hidden={!open}>
      <div className="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export const useLoader = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  return [Loader({ open }), setOpen] as const
}
