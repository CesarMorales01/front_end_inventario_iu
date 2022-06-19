import React from 'react'

const Cargando = () => {
  return (
    <div className='container textAlignCenter'>
      <br></br><br></br><br></br>
      
      <div className="text-center">
      <span>Cargando información...</span>
      <br></br><br></br>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
  </div>
  )
}

export default Cargando