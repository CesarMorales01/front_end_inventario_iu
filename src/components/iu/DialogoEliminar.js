import React from 'react'

const DialogoEliminar = (params) => {
  return (
    <div className="modal fade" id="dialogoEliminar" tabIndex="-1" aria-labelledby="exampleModalLabel"   aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Eliminar {params.titulo}!</h5>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          >
          </button>
        </div>
        <div className="modal-body"> 
               <div className="modal-body">
                  <p>Deseas eliminar {params.titulo}?</p>
              </div>  
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                id='btnCloseModal'
              >
                Cerrar
              </button>
              <button type="submit" onClick={params.borrar} className="btn btn-primary">Eliminar</button>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DialogoEliminar