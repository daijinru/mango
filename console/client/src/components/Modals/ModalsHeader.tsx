import React from 'react'

interface ModalsHeaderProps {
  close: () => void
  title: string
}
const App: React.FC<ModalsHeaderProps> = ({ title, close }) => {
  return (
    <>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h6 className='mb-0'>{title}</h6>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => close()}>
          {/* <span aria-hidden="true">&times;</span> */}
        </button>
      </div>
    </>
  )
}

export default App
