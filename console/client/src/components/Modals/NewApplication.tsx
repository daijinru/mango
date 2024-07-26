import React from 'react'
import { ModalRootConfig } from './index'

const App: React.FC<React.PropsWithChildren<ModalRootConfig>> = ({ args, NAME }) => {
  return (
    <>
      <div style={{width: '320px'}}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <label htmlFor={'exampleFormControlTextarea1'} className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
      </div>
      </div>
    </>
  )
}

export default {
  NAME: 'New Application',
  component: App,
}
